create database HR;
use HR;

create table Department(
	dep_id int auto_increment primary key,
    dep_name varchar(30)
);
select * from employeesInformation where emp_id=3;
create table roles(
  `role_id` int NOT NULL AUTO_INCREMENT primary key,
  `role_name` varchar(50) DEFAULT NULL
);

CREATE TABLE `jobpositions` (
  `job_id` int NOT NULL AUTO_INCREMENT primary key,
  `job_name` varchar(50) DEFAULT NULL
);

CREATE TABLE Jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    experience varchar(20),
    date_posted date,
    expiry_date date,
    description TEXT NOT NULL,
    dep_id int,
    foreign key (dep_id) references Department(dep_id)
);

CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_name varchar(30) not null,
    email varchar(50) not null,
    cnic varchar(13) not null,
    city varchar(50),
    phone_number varchar(20),
    desired_salary varchar(20),
    cv_pdf VARCHAR(255) NOT NULL,
    status ENUM('Pending', 'Rejected', 'Interview', 'Hired') NOT NULL DEFAULT 'Pending',
    address text,    
    job_id INT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);

CREATE TABLE employeeinformation (
  `emp_id` int NOT NULL primary key,
  `name` varchar(255) ,
  `email` varchar(255),
  `phone_number` varchar(15),
  `city` varchar(100) ,
  `address` varchar(255) ,
  `zipcode` varchar(10) ,
  `DOB` date ,
  `cnic` varchar(15) ,
  `gender` enum('Male','Female') ,
  `hire_date` date ,
  `salary` decimal(10,2) ,
  `login_email` varchar(255) ,
  `login_password` varchar(255) , 
 `role_id` int  ,
  `job_id` int,
  `dep_id` int,
  FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  FOREIGN KEY (`job_id`) REFERENCES `jobpositions` (`job_id`)
);
CREATE TABLE Attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  emp_id INT,
  attendance_date DATE,
  status ENUM('Present', 'Absent', 'Late','Leave') NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES employeeinformation(emp_id),
  UNIQUE KEY (emp_id, attendance_date)
);

insert into attendance(emp_id,attendance_date,status) values(3,'2023-9-9','present');

-- CREATE TABLE LeaveRequests (
--     leave_request_id INT AUTO_INCREMENT PRIMARY KEY,
--     employee_id INT NOT NULL,
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL,
--     status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
--     FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
-- );

-- CREATE TABLE AttendanceHistory (
--     attendance_history_id INT AUTO_INCREMENT PRIMARY KEY,
--     employee_id INT NOT NULL,
--     date DATE NOT NULL,
--     time_in TIME NOT NULL,
--     time_out TIME NOT NULL,
--     FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
-- );

INSERT INTO Jobs (title, experience, date_posted, expiry_date, description, dep_id)
VALUES
    ('Software Engineer', '3 years', '2023-08-01', '2023-09-30', 'Develop software applications', 1),
    ('Sales Manager', '5 years', '2023-07-15', '2023-10-15', 'Manage sales team', 2),
    ('Marketing Coordinator', '2 years', '2023-08-10', '2023-09-25', 'Coordinate marketing efforts', 2),
    ('Financial Analyst', '4 years', '2023-08-05', '2023-11-05', 'Analyze financial data', 2);
    
  -- Insert dummy data into employeeinformation table with Muslim names
INSERT INTO employeeinformation (
    emp_id,
    name,
    email,
    phone_number,
    city,
    address,
    zipcode,
    DOB,
    cnic,
    gender,
    hire_date,
    salary,
    login_email,
    login_password,
    role_id,
    job_id,
    dep_id
) VALUES
    (3, 'Muhammad Ali', 'muhammad.ali@example.com', '1234567890', 'Karachi', '789 Crescent Rd', '74000', '1985-03-10', '3456789123456', 'Male', '2023-09-01', 60000.00, 'muhammad_login', 'hashed_password', 1, 3, 3),
    (4, 'Fatima Khan', 'fatima.khan@example.com', '9876543210', 'Lahore', '456 Garden St', '54000', '1990-07-15', '2345678912345', 'Female', '2023-08-20', 55000.00, 'fatima_login', 'hashed_password', 1, 4, 4),
    (5, 'Ahmed Hassan', 'ahmed.hassan@example.com', '5678901234', 'Islamabad', '321 Park Ave', '44000', '1992-11-25', '4567890123456', 'Male', '2023-09-05', 62000.00, 'ahmed_login', 'hashed_password', 2, 1, 5),
    (6, 'Aisha Malik', 'aisha.malik@example.com', '1234890765', 'Rawalpindi', '123 Oak St', '46000', '1994-02-12', '5678901234567', 'Female', '2023-08-10', 58000.00, 'aisha_login', 'hashed_password', 2, 1, 6),
    (7, 'Hassan Abbas', 'hassan.abbas@example.com', '9087654321', 'Faisalabad', '567 Maple Rd', '38000', '1988-06-30', '6789012345678', 'Male', '2023-09-12', 59000.00, 'hassan_login', 'hashed_password', 2,2, 7),
    (8, 'Sara Ahmed', 'sara.ahmed@example.com', '2345678901', 'Multan', '789 Pine St', '60000', '1991-05-18', '7890123456789', 'Female', '2023-08-08', 56000.00, 'sara_login', 'hashed_password', 2, 2, 8),
    (9, 'Ali Khan', 'ali.khan@example.com', '3456789012', 'Peshawar', '890 Redwood Rd', '25000', '1993-09-22', '8901234567890', 'Male', '2023-09-10', 63000.00, 'ali_login', 'hashed_password', 2, 2, 9),
    (10, 'Zainab Akhtar', 'zainab.akhtar@example.com', '4567890123', 'Quetta', '123 Cedar St', '86000', '1987-12-05', '9012345678901', 'Female', '2023-08-15', 57000.00, 'zainab_login', 'hashed_password', 2, 4, 10)
    ;
select * from jobPositions;