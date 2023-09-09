const express = require('express');
const router = express.Router();

const mysql = require('../connection');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" })

const multer = require('multer');
//------------------------------------------------------hiring/post a job---------------------------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0' if needed.
const day = String(currentDate.getDate() + 1).padStart(2, '0');
const current_date = `${year}-${month}-${day}`;


router.get('/getDepartment', (req, res) => {
    mysql.query('select * from department', (error, result) => {
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

//// -----------------------------------------------------emplyees/addemployees---------------------------------------------------------------------------------------

router.post('/registerEmployee', (req, res) => {
    const { name, email, phone_number, city, address, zipcode, DOB, cnic, gender, emp_id, hire_date, salary, role, job_id, dep_id, login_email, login_password } = req.body;
    persoonalInformation = [name, email, phone_number, city, address, zipcode, DOB, cnic, gender];
    professionalInformation = [emp_id, hire_date, salary, role, job_id, dep_id, login_email, login_password];
    console.table(persoonalInformation);
    console.table(professionalInformation)
    mysql.query(
        'INSERT INTO PersonalInformation (name,email,phone_number,city,address,zipcode,DOB,cnic,gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', persoonalInformation,
        (err, personalResults) => {
            if (err) {
                console.error('Error inserting personal data:', err);
                res.json({ message: err.sqlMessage, success: false, error: 'Error inserting personal data' });
            } else {
                mysql.query(
                    'INSERT INTO ProfessionalInformation (emp_id, hire_date, salary, role, job_id, dep_id, login_email, login_password) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)', professionalInformation,
                    (err, result) => {
                        if (err) {
                            console.error('Error inserting professional data:', err);
                            res.json({ message: err.sqlMessage, success: false, error: 'Error inserting professional data' });
                        } else {

                            res.json({ success: true, message: 'Data inserted successfully' });
                        }
                    }
                );
            }
        }
    );
});

module.exports = router;
