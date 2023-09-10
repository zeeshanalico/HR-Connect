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
    mysql.query('select * from department', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})


router.get('/getRoles', (req, res) => {
    mysql.query('select * from roles', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})
router.get('/getAttendence', (req, res) => {
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
    mysql.query('select * from jobs j inner join department d on d.dep_id=j.dep_id', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage });
        } else {
            res.json(result);
        }
    })
})
router.get('/getJobPositions', (req, res) => {
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
    mysql.query('SELECT * FROM employeeinformation ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id;', (err, results) => {
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

    const { title, experience, expiry_date, description, dep_id } = req.body;
    console.log(title, experience, current_date, expiry_date, description, dep_id);
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
    mysql.query('select application_id, applicant_name, email,phone_number, status,j.job_id,title from applications a inner join jobs j on a.job_id=j.job_id;', (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            res.json(result);
        }
    })
})
router.post('/rejectApplication', (req, res) => {
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
    try {
        const employees = await axios.get('http://localhost:3002/getEmployees');
        const findEmployee = Array.isArray(employees.data) ? employees.data.find((u) => u.login_email === req.body.login_email) : null;

        if (findEmployee && findEmployee.login_email === req.body.login_email) {
            res.json({ success: false, message: "User Already Exists with this Login Email" });
        } else {
            const { name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, login_password } = req.body;
            const hash_Password = await bcrypt.hash(login_password, 10);

            const employeeInformation = [name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, hash_Password];

            mysql.query('INSERT INTO employeeinformation (name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role_id, job_id, dep_id, login_email, login_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', employeeInformation,
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
    const { emp_id } = req.body;
    console.log(emp_id);
    mysql.query('delete from employeeinformation where emp_id = ?;', [emp_id], (error, result) => {
        if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
        } else {
            console.log("candidate called for interview");
            res.json({ success: true });
        }
    })
})


// --------------------------------------------------------------------------emp/attendenc---------------------------------------------------------------------------------
router.post('/getAttendencebyEmp', (req, res) => {
    const { emp_id,todayDate } = req.body;
    mysql.query('select status from attendance where emp_id=? and attendance_date=?;', [emp_id, todayDate], (err, result) => {
        if (err) {
            res.json({ success: false, message: "error in fetching attendace status" })
        } else {
            res.json(result)
        }
    });
})

router.put('/updateAttendance', async (req, res) => {
    const { emp_id, att_status } = req.body;
    const current_date = new Date().toISOString().split('T')[0];

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


// router.put('/updateAttendance', (req, res) => {
//     const employeeId = req.body.employeeId;
//     const status = req.body.status;
//     const currentTime = new Date();

//     if (currentTime.getHours() === 23 && currentTime.getMinutes() >= 59) {
//         const attendanceData = {
//             employee_id: employeeId,
//             attendance_date: currentTime.toISOString().split('T')[0],
//             status: status
//         };

//         // Insert a new attendance record
//         mysql.query('INSERT INTO Attendance SET ?', attendanceData, (err, result) => {
//             if (err) {
//                 console.error('Error updating attendance: ', err);
//                 res.status(500).json({ message: 'Internal server error.' });
//                 return;
//             }
//             res.status(200).json({ message: 'Attendance updated successfully.' });
//         });
//     } else {
//         // Reject the update if it's before 11:59 PM
//         res.status(400).json({ message: 'Attendance update allowed after 11:59 PM.' });
//     }
// });




// router.put('/updateAttendance', (req, res) => {
//     const employeeId = req.body.emp_id;
//     const status = req.body.status;
//     const currentTime = new Date();
//     const currentDate = currentTime.toISOString().split('T')[0];

//     // Check if there's an existing attendance record for the employee for the current date
//     mysql.query('SELECT * FROM Attendance WHERE employee_id = ? AND attendance_date = ?', [employeeId, currentDate], (err, rows) => {
//         if (err) {
//             console.error('Error checking attendance: ', err);
//             res.status(500).json({ message: 'Internal server error.' });
//             return;
//         }

//         if (rows.length === 0) {
//             // No existing attendance record, insert a new one
//             if (currentTime.getHours() === 23 && currentTime.getMinutes() >= 59) {
//                 const attendanceData = {
//                     employee_id: employeeId,
//                     attendance_date: currentDate,
//                     status: status
//                 };

//                 // Insert a new attendance record
//                 mysql.query('INSERT INTO Attendance SET ?', attendanceData, (insertErr, result) => {
//                     if (insertErr) {
//                         console.error('Error updating attendance: ', insertErr);
//                         res.status(500).json({ message: 'Internal server error.' });
//                         return;
//                     }
//                     res.status(200).json({ message: 'Attendance updated successfully.' });
//                 });
//             } else {
//                 res.status(400).json({ message: 'Attendance update allowed after 11:59 PM.' });
//             }
//         } else {
//             // Existing attendance record found, reject the update
//             res.json({ message: 'Attendance already updated for today.' });
//         }
//     });
// });

module.exports = router;
