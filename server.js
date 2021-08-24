const consoleTable = require("console.table");
const util = require("util");
const mysql = require("mysql2");
const connection = require("./config/connection");
const inquirer = require("inquirer");

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
  if (err) throw err;
  start();
});

// Welcome Note
const displayTitle = () => {
  console.log(`======================================`);
  console.log(``);
  console.log('Welcome to your Company CMS');
  console.log(``);
  console.log(`======================================`);
};
displayTitle(); 


// Initial questions.
const start = async () => {
  try {
    let question = await inquirer.prompt({
      name: "initial",
      type: "list",
      message: "Please select an option:",
      choices: [
        "View Departments",
        "View Employees",
        "View Roles",
        "Add Departments",
        "Add Employees",
        "Add Roles",
        "Update Employee Role",
        "Exit",
      ],
    });
    switch (question.initial) {
      case "View Employees":
        employeeView();
        break;
      case "View Departments":
        departmentView();
        break;
      case "View Roles":
        roleView();
        break;
      case "Add Employees":
        employeeAdd();
        break;
      case "Add Departments":
        departmentAdd();
        break;
      case "Add Roles":
        roleAdd();
        break;
      case "Update Employee Role":
        employeeUpdate();
        break;
      case "Exit":
        connection.end();
        break;
      }
  } catch (err) {
    console.log(err);
    start();
  }
};

// View all departments.

const departmentView = async () => {
  console.log("View Department");
try {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
} catch (err) {
  console.log(err);
  start();
}
};
// View all employees.

const employeeView = async () => {
  console.log("View Employee");
  try {
    let query = `SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name,
    employee.manager_id AS employee_id_of_manager,
    role.department_id,
    department.department_name,
    role.title, 
    role.id,
    role.salary
    FROM role
    LEFT JOIN employee
    ON role.id = employee.role_id
    LEFT JOIN department
    ON department.id = role.department_id
    WHERE employee.id IS NOT NULL`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  } catch (err) {
    console.log(err);
    start();
  }
};


// View all roles.
const roleView = async () => {
    console.log("View Role");
  try {
    let query = `SELECT department.department_name, department.id, role.title, role.id, role.salary
    FROM department
    LEFT JOIN role
    ON department.id = role.department_id
    WHERE role.id IS NOT NULL`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  } catch (err) {
    console.log(err);
    start();
  }
};

// Add a department.

const departmentAdd = async () => {
  try {
    console.log("Add a Department");
    let question = await inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "Name of new department?",
      },
    ]);
    let output = await connection.query("INSERT INTO department SET ?", {
      department_name: question.deptName,
    });
    console.log(`${question.deptName} added successfully to departments.\n`);
    start();
  } catch (err) {
    console.log(err);
    start();
  }
};

// Add an employee.
const employeeAdd = async () => {
  try {
    console.log("Add an Employee");
    let roles = await connection.query("SELECT * FROM role");
    let managers = await connection.query("SELECT * FROM employee");
    let question = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "First name of this Employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "Last name of this Employee?",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
        message: "Employee's role id?",
      },
      {
        name: "employeeManagerId",
        type: "list",
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          };
        }),
        message: "Employee's Manager's Id?",
      },
    ]);
    let output = await connection.query("INSERT INTO employee SET ?", {
      first_name: question.firstName,
      last_name: question.lastName,
      role_id: question.employeeRoleId,
      manager_id: question.employeeManagerId,
    });
    console.log(`${question.firstName} ${question.lastName} added successfully.\n`);
    start();
    } catch (err) {
    console.log(err);
    start();
  }
};


// Add a role.
const roleAdd = async () => {
  try {
    console.log("Add a Role");
    let departments = await connection.query("SELECT * FROM department");
    let question = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Name of your new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "departmentId",
        type: "list",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
        message: "What is the department ID?",
      },
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === question.choice) {
        chosenDepartment = departments[i];
      }
    }
    let output = await connection.query("INSERT INTO role SET ?", {
      title: question.title,
      salary: question.salary,
      department_id: question.departmentId,
    });

    console.log(`${question.title} role added successfully.\n`);
    start();
  } catch (err) {
    console.log(err);
    start();
  }
};

// update an employee.

const employeeUpdate = async () => {
  try {
    console.log("Update an Employee");;
    let employees = await connection.query("SELECT * FROM employee");
    let employeeSelection = await inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id,
          };
        }),
        message: "Choose employee to update.",
      },
    ]);
    let roles = await connection.query("SELECT * FROM role");
    let roleSelection = await inquirer.prompt([
      {
        name: "role",
        type: "list",
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id,
          };
        }),
        message: "Please select the role for the employee.",
      },
    ]);
    let output = await connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleSelection.role },
      { id: employeeSelection.employee },
    ]);
    console.log(`The role was successfully updated.\n`);
    start();
  } catch (err) {
    console.log(err);
    start();
  }
};