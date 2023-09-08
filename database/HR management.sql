create database HR;
use HR;
-- CREATE TABLE Users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role ENUM('HR', 'Employee') NOT NULL
-- );
create table Department(
	dep_id int auto_increment primary key,
    dep_name varchar(30)
);
select * from department;
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
truncate table jobs;
INSERT INTO Jobs (title, experience, date_posted, expiry_date, description, dep_id)
VALUES
    ('Software Engineer', '3 years', '2023-08-01', '2023-09-30', 'Develop software applications', 1),
    ('Sales Manager', '5 years', '2023-07-15', '2023-10-15', 'Manage sales team', 2),
    ('Marketing Coordinator', '2 years', '2023-08-10', '2023-09-25', 'Coordinate marketing efforts', 2),
    ('Financial Analyst', '4 years', '2023-08-05', '2023-11-05', 'Analyze financial data', 2);

insert into department(dep_name) values('HR'),('Engineering');

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
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 

-- CREATE TABLE Employees (
--     employee_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     contact_number VARCHAR(20) NOT NULL,
--     address TEXT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );
-- CREATE TABLE Attendance (
--     attendance_id INT AUTO_INCREMENT PRIMARY KEY,
--     employee_id INT NOT NULL,
--     date DATE NOT NULL,
--     time_in TIME NOT NULL,
--     time_out TIME NOT NULL,
--     FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
-- );

-- -- Create the Salaries table to store salary information
-- CREATE TABLE Salaries (
--     salary_id INT AUTO_INCREMENT PRIMARY KEY,
--     employee_id INT NOT NULL,
--     month INT NOT NULL,
--     year INT NOT NULL,
--     amount DECIMAL(10, 2) NOT NULL,
--     FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
-- );

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
