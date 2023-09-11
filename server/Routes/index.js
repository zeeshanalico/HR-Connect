const express = require('express');
const router = express.Router();

const mysql = require('../connection');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" })

const multer = require('multer');
//------------------------------------------------------hiring/post a job---------------------------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getCurrentDate = require('./../Utils/dateUtils.js')
const current_date = getCurrentDate();


router.get('/getDepartment', (req, res) => {
    console.log('/getDepartment');
    mysql.query('select * from department', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})


router.get('/getRoles', (req, res) => {
    console.log('/getRoles');
    mysql.query('select * from roles', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})
router.get('/getAttendence', (req, res) => {
    console.log('/getAttendence');
    mysql.query('select * from attendance', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})

// get jobs by hr and employee
router.get('/getJobs', (req, res) => {
    console.log('/getJobs');
    mysql.query('select * from jobs j inner join department d on d.dep_id=j.dep_id', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})
router.get('/getJobPositions', (req, res) => {
    console.log('/getJobPositons');
    mysql.query('SELECT * FROM jobpositions', (err, results) => {
        if (err) {
            console.error('Error fetching job positions:', err);
            res.json({ success: false, message: error.sqlMessage });
        } else {
            res.json(results);
        }
    });
});
router.get('/getDepInfo', (req, res) => {
    console.log('/getDepInfo');
    mysql.query(`call GetDepartmentsWithTotalEmployees()`, (err, results) => {
        if (err) {
            console.error('Error fetching dep info for dep module:', err);
            res.json({ success: false, message: error.sqlMessage });
        } else {
            res.json(results);
        }
    });
});

router.get('/getEmployees', (req, res) => {
    console.log('/getEmployees');
    mysql.query('SELECT * FROM employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id;', (err, results) => {
        if (err) {
            console.error('Error fetching job emp info:', err);
            res.json({ message: error.sqlMessage });
        } else {
            res.json(results);
        }
    });
});

// delete job by hr 
router.post('/deleteJob', (req, res) => {
    console.log('/deleteJob');
    const { job_id } = req.body;
    mysql.query('delete from jobs where job_id= ?;', [job_id], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            res.json({ success: true });
        }
    })
})

// job post by hr
router.post('/jobPost', (req, res) => {
    console.log('/jobPost');

    const { title, experience, expiry_date, description, dep_id } = req.body;
    mysql.query('insert into jobs(title,experience,date_posted,expiry_date,description,dep_id) values(?,?,?,?,?,?);', [title, experience, current_date, expiry_date, description, dep_id], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            res.json({ success: true });
        }
    })
});
//------------------------------------------job application submission api's-----------------------------------------
const fs = require('fs');
const uploadDirectory = `${__dirname}/../uploads`; // Replace 'uploads' with your desired directory name

// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

router.post('/submitJobApplication', upload.single('cv_file'), (req, res) => {
    console.log('/submitJobApplication');
    const {
        applicant_name,
        email,
        city,
        cnic,
        phone_number,
        desired_salary,
        address,
        job_id
    } = req.body;
    const cv_file = req.file.buffer; // Use req.file.buffer to access the file data

    console.log(
        applicant_name,
        email,
        city,
        cnic,
        phone_number,
        desired_salary,
        cv_file,
        address,
        current_date,
        job_id
    );

    // Save the file to the backend server using fs.writeFile
    const fileName = `${job_id}_${applicant_name}.pdf`; // Generate a unique file name
    const filePath = `${uploadDirectory}/${fileName}`; // Full path to the file

    fs.writeFile(filePath, cv_file, (err) => {
        if (err) {
            console.error('Error saving file to server:', err);
            res.json({ message: 'Error saving file to server', error: err, success: false });
        } else {
            console.log('File saved to server successfully.');
            mysql.query('insert into applications(applicant_name, email,city,cnic,cv_file,applying_date,phone_number,desired_salary,address,job_id) values (?,?,?,?,?,?,?,?,?,?);'[applicant_name, email, city, cnic, cv_file, current_date, phone_number, desired_salary, address, job_id], (error, result) => {
                if (error) {
                    res.json({ message: error.sqlMessage, error, success: false });
                    console.log(error);
                } else {
                    res.json(result);
                }
            })
        }
    });

});
//----------------------------------------------hiring/view job applications------------------------------------------------------------------------
router.get('/getJobApplications', (req, res) => {
    console.log('/getJobApplications');
    mysql.query('select application_id, applicant_name, email,phone_number, status,j.job_id,title from applications a inner join jobs j on a.job_id=j.job_id;', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            res.json(result);
        }
    })
})
router.post('/rejectApplication', (req, res) => {
    console.log('/rejectApplication');
    const { rejectedApplicationId } = req.body;
    console.log(rejectedApplicationId);
    mysql.query('delete from applications where application_id =?', [rejectedApplicationId], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            res.json({ success: true });
        }
    })
})

router.post('/callForInterview', (req, res) => {
    console.log('callForInterview');
    const { callForInterviewId } = req.body;
    console.log(callForInterviewId);
    mysql.query('update applications set status="interview" where application_id=?;', [callForInterviewId], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            console.log("candidate called for interview");
            res.json({ success: true });
        }
    })
})

// ------------------------------------------------------------Departments--------------------------------------------------------------------------------------------
router.post('/addDepartment', (req, res) => {
    console.log('/addDepartment');
    const { newDepartmentName } = req.body;

    if (!newDepartmentName) {
        return res.json({ success: false, message: 'Department name is required.' });
    }
    const query = 'INSERT INTO Department (dep_name) VALUES (?)';
    mysql.query(query, [newDepartmentName], (error, results) => {
        if (error) {
            console.error('Error adding department:', error);
            return res.json({ success: false, message: 'Error adding department.' });
        }
        res.json({ success: true, message: 'Department added successfully.' });
    });
});

//// -----------------------------------------------------emplyees/addemployees---------------------------------------------------------------------------------------
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const axios = require('axios')
router.post('/registerEmployee', async (req, res) => {
    console.log('/registerEmployee');
    try {
        const employees = await axios.get('http://localhost:3002/getEmployees');
        const findEmployee = Array.isArray(employees.data) ? employees.data.find((u) => u.login_email === req.body.login_email) : null;

        if (findEmployee && findEmployee.login_email === req.body.login_email) {
            res.json({ success: false, message: "User Already Exists with this Login Email" });
        } else {
            const { name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, login_password } = req.body;
            const hash_Password = await bcrypt.hash(login_password, 10);

            const employee = [name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, hash_Password];

            mysql.query('INSERT INTO employee (name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, login_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', employee,
                (err, result) => {
                    if (err) {
                        console.error('Error inserting personal data:', err);
                        res.json({ message: err.sqlMessage, success: false, error: 'Error inserting personal data' });
                    } else {
                        res.json({ success: true, message: 'Data inserted successfully' });
                    }
                }
            );
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/removeEmployee', (req, res) => {
    console.log('/removeEmployee');
    const { emp_id } = req.body;
    console.log(emp_id);
    mysql.query('delete from employee where emp_id = ?;', [emp_id], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            console.log("candidate called for interview");
            res.json({ success: true });
        }
    })
})


// --------------------------------------------------------------------------emp/attendence---------------------------------------------------------------------------------
router.post('/getAttendencebyEmp', (req, res) => {
    console.log('getAttendencebyEmp');
    const { emp_id, todayDate } = req.body;
    mysql.query('select status from attendance where emp_id=? and attendance_date=?;', [emp_id, todayDate], (err, result) => {
        if (err) {
            res.json({ success: false, message: "error in fetching attendace status" })
        }
        // if (results.length === 0) {
        //     res.json({ status: 'absent' });
        //   } 
          else {
            res.json(result)
        }
    });
})

router.put('/updateAttendance', async (req, res) => {
    console.log('/updateAttendance');
    const { emp_id, att_status } = req.body;
    // const allAttendance=await axios.get('http://localhost:3002/getAttendence');
    // const findAttendance=allAttendance.data((attendance)=>{ emp_id===attendance.emp_id && current_date===attendance.attendance_date})
    mysql.query('INSERT INTO attendance (emp_id, status, attendance_date) VALUES (?, ?, ?)',
        [emp_id, att_status, current_date],
        (error, result) => {
            if (error) {
                console.error(error);
                res.json({ success: false, message: "An error occurred" });
            } else {
                res.json({ success: true, message: "Attendance marked" });
            }
        }
    );
});

router.put('/leaverequest', async (req, res) => {
    console.log('/leaverequest');
    const { emp_id, reason, leave_date } = req.body;
    console.log('/leaverequest');
    console.table({emp_id,  reason, leave_date})
    mysql.query(
        'INSERT INTO leaverequest (emp_id, reason, leave_date, applying_date) VALUES (?,  ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE reason = VALUES(reason), leave_date = VALUES(leave_date), applying_date = VALUES(applying_date)',
        [emp_id, reason, leave_date, current_date],
        (error, result) => {
            if (error) {
                console.error(error);
                res.json({ success: false, message: "An error occurred" });
            } else {
                res.json({ success: true, message: "Leave request has been sented." });
            }
        }
    );
});


// --------------------------------------------------------------------------emp/myprofile---------------------------------------------------------------------------------
router.post('/getEmpInfobyEmpId', (req, res) => {
    console.log('/getEmpInfobyEmpId');
    const { emp_id } = req.body;
    mysql.query('select * from employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id where emp_id=? ;', [emp_id], (err, result) => {
        if (err) {
            res.json({ success: false, message: "error in fetching attendace status", err })
        } else {
            res.json(result)
        }
    });
})

router.put('/updateEmployeeInfo', async (req, res) => {
    console.log('/updateEmployeeInfo');
    try {
        const { emp_id, email, phone_number, city, address, zipcode } = req.body;
        const updateQuery = `UPDATE employee SET email = ?, phone_number = ?, city = ?, address = ?, zipcode = ? WHERE emp_id = ?;`;

        mysql.query(
            updateQuery,
            [email, phone_number, city, address, zipcode, emp_id],
            (error, results) => {
                if (error) {
                    console.error('Error updating employee information:', error);
                    res.json({ success: false, message: 'Internal server error.' });
                } else {
                    res.json({ success: true, message: 'Employee information updated successfully.' });
                }
            }
        );
    } catch (error) {
        console.error('Error updating employee information:', error);
        res.json({ success: false, message: 'Internal server error.' });
    }
});
// --------------------------------------------------------------------------hr/leaveapplication---------------------------------------------------------------------------------


router.get('/getApplications', (req, res) => {
    console.log('/getApplications');
    mysql.query('call getLeaveApplication();', (err, results) => {
        if (err) {
            console.error('Error fetching job leave Applications:', err);
            res.json({ message: err.sqlMessage });
        } else {
            res.json(results);
        }
    });
});


router.put('/leaveApproved', (req, res) => {
    console.log('/leaveApproved');
    const { emp_id, attendance_date} = req.body;
    const status='Leave';
    mysql.query(`call attendanceApproval(${emp_id},'${status}','${attendance_date}')`,(error, result) => {
            if (error) {
                console.error(error);
                res.json({ success: false, message: "An error occurred" });
            } else {
                res.json({ success: true, message: "Attendence Approved" });
            }
        }
    );
});

router.put('/leaveRejected', (req, res) => {
    console.log('/leaveRejected');
    const { emp_id, } = req.body;
    mysql.query(`call attendanceRejected(${emp_id})`,(error, result) => {
            if (error) {
                console.error(error);
                res.json({ success: false, message: "An error occurred" });
            } else {
                res.json({ success: true, message: "Attendence Rejected" });
            }
        }
    );
});

module.exports = router;
