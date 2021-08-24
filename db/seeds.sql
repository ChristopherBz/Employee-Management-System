INSERT into
  department (department_name)
VALUES
  ('Management'),
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Marketing'),
  ('IT'),
  ('HR');
  
  
INSERT into
  role (title, salary, department_id)
VALUES 
('CEO', 500000, 1),
('COO', 450000, 1),
('CFO', 400000, 1),
('Head of HR', 300000, 7),
('Head of Sales', 300000, 1),
('Marketing Manager', 300000, 5),
('General Counsel', 300000, 4),
('Executive Assistant', 250000, 1),
('Sales Director', 100000, 2),
('Sales Manager', 100000, 2),
('Salesperson', 60000, 2),
('Sales Assistant', 50000, 3),
("Frontend Developer", 95000, 6),
("Backend Developer", 95000, 6),
("Project Manager", 99000, 6),
("Computer Engineer", 110000, 6),
("Account Executive", 90000, 5),
('HR Rep', 35000, 7);
  
  
INSERT into
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Steve", "Brown", 1, 1),
  ("Matt", "Black", 2, 1),
  ("Dean", "Evans", 3, 1),
  ("Ace", "Green", 4, 1),
  ("Alan", "Wagner", 5, 1),
  ("Tango", "Let", 5, 1),
  ("Michael", "Kane", 6, 1),
  ("Sarah", "King", 6, 1),
  ("Tobby", "Lumbergh", 7, 1),
  ("Vlad", "Smykowski", 8, 2),
  ("Nina", "Ramon", 9, 2),
  ("Brian", "Duffey", 10, 2),
  ("Adam", "Quiter", 10, 2),
  ("Elliot", "Fans", 11, 2),
  ("Stacey", "Yousen", 12, 2),
  ("Peter", "Mask", 13, 2),
  ("Leo", "Put", 14, 3);
