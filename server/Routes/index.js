const dotenv = require("dotenv");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const axios = require("axios");
const path = require('path');
const nodemailer = require("nodemailer");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const mysql = require("../connection");
dotenv.config({ path: "./config.env" });
const getCurrentDate = require("./../Utils/dateUtils.js");
const { verifyToken, checkUserRole } = require('./../Middleware/verifyToken.js')


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadDirectory = `${__dirname}/../uploads`;
const current_date = getCurrentDate();


function increaseDateByOneDay(dateString) {
  const currentDate = new Date(dateString);
  currentDate.setDate(currentDate.getDate() + 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

//------------------------------------------------------hiring/post a job---------------------------------------------------------------------------

router.get("/getDepartment", (req, res) => {
  console.log("/getDepartment");
  mysql.query("select * from department", (error, result) => {
    if (error) {
      res.json({ message: error.sqlMessage });
    } else {
      res.json(result);
    }
  });
});

router.get("/getRoles", (req, res) => {
  console.log("/getRoles");
  mysql.query("select * from roles", (error, result) => {
    if (error) {
      res.json({ message: error.sqlMessage });
    } else {
      res.json(result);
    }
  });
});
router.get("/getAttendence", (req, res) => {
  console.log("/getAttendence");
  mysql.query("select * from attendance", (error, result) => {
    if (error) {
      res.json({ message: error.sqlMessage });
    } else {
      res.json(result);
    }
  });
});

// get jobs by hr and employee
router.get("/getJobs", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getJobs");
  mysql.query(
    "select * from jobs j inner join department d on d.dep_id=j.dep_id",
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage });
      } else {
        // const data = result.map((obj) => { return { ...obj, expiry_date: increaseDateByOneDay(obj.expiry_date), date_posted:increaseDateByOneDay(obj.date_posted) } });
        res.json(result);
      }
    }
  );
});
router.get("/getJobsforApply", (req, res) => {
  console.log("/getJobs");
  mysql.query(
    "select * from jobs j inner join department d on d.dep_id=j.dep_id",
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage });
      } else {
        res.json(result);
      }
    }
  );
});
router.get("/getJobPositions", (req, res) => {
  console.log("/getJobPositons");
  mysql.query("SELECT * FROM jobpositions", (err, results) => {
    if (err) {
      console.error("Error fetching job positions:", err);
      res.json({ success: false, message: error.sqlMessage });
    } else {
      res.json(results);
    }
  });
});

///////------------------------hr-----------------------------
router.get("/getDepInfo", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getDepInfo");
  mysql.query(`call GetDepartmentsWithTotalEmployees()`, (err, results) => {
    if (err) {
      console.error("Error fetching dep info for dep module:", err);
      res.json({ success: false, message: error.sqlMessage });
    } else {
      res.json(results);
    }
  });
});

///////------------------------hr-----------------------------

router.get("/getEmployees", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getEmployees");
  mysql.query(
    "SELECT * FROM employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id;",
    (err, results) => {
      if (err) {
        console.error("Error fetching job emp info:", err);
        res.json({ message: error.sqlMessage });
      } else {
        res.json(results);
      }
    }
  );
});

// delete job by hr
router.post("/deleteJob", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/deleteJob");
  const { job_id } = req.body;
  mysql.query(
    "DELETE FROM jobs WHERE job_id = ?;",
    [job_id],
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// job post by hr
router.post("/jobPost", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/jobPost");

  const {
    title,
    experience,
    expiry_date,
    description,
    dep_id,
    salary,
    location,
  } = req.body;
  mysql.query(
    "insert into jobs(title,experience,date_posted,expiry_date,description,dep_id,salary,location) values(?,?,?,?,?,?,?,?);",
    [
      title,
      experience,
      current_date,
      expiry_date,
      description,
      dep_id,
      salary,
      location,
    ],
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});
//------------------------------------------job application submission api's-----------------------------------------


if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

router.post("/submitJobApplication", upload.single("cv_file"), (req, res) => {
  console.log("/submitJobApplication");
  const {
    applicant_name,
    email,
    city,
    cnic,
    phone_number,
    desired_salary,
    address,
    job_id,
    university,
    degree,
    major,
    gender,
    zipcode,
    experience,
    linkedin_profile_url,
    github_profile_url,
    dob,
    cgpa,
  } = req.body;
  const fileName = `${job_id}_${applicant_name}.pdf`; // Generate a unique file name
  const cv_file = req.file.buffer; // Use req.file.buffer to access the file data
  const dataArray = [
    applicant_name,
    email,
    cnic,
    city,
    phone_number,
    desired_salary,
    fileName,
    address,
    job_id,
    university,
    degree,
    major,
    gender,
    zipcode,
    experience,
    linkedin_profile_url,
    github_profile_url,
    dob,
    cgpa,
  ];
  const filePath = `${uploadDirectory}/${fileName}`; // Full path to the file
  console.log(dataArray);

  fs.writeFile(filePath, cv_file, (err) => {
    if (err) {
      console.error("Error saving file to server:", err);
      res.json({
        message: "Error saving file to server",
        error: err,
        success: false,
      });
    } else {
      mysql.query(
        "INSERT INTO applications (applicant_name, email, cnic, city, phone_number, desired_salary, cv_pdf, address, job_id,university,degree,major,gender,zipcode,experience,linkedin_profile_url,github_profile_url,dob,cgpa) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)",
        dataArray,
        (error, result) => {
          if (error) {
            res.json({ message: error.sqlMessage, error, success: false });
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Application submitted successfully.",
            });
          }
        }
      );
    }
  });
});

router.post("/getResume", (req, res) => {
  const { applicationId } = req.body;
  const job_id = req.query.job_id; // Assuming job_id is available in the request
  const applicant_name = req.query.applicant_name; // Assuming applicant_name is available in the request

  const fileName = `${job_id}_${applicant_name}.pdf`;
  const filePath = `${uploadDirectory}/${fileName}`; // Full path to the file

  if (fs.existsSync(filePath)) {
    res.contentType("application/pdf");
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } else {
    res.status(404).send("File not found");
  }
});

//---------------------------------------------hiring/view job applications------------------------------------------------------------------------
router.get("/getJobApplications", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getJobApplications");
  mysql.query(
    "select application_id,a.gender,a.zipcode,a.university,a.degree,a.major,a.experience,desired_salary,a.linkedin_profile_url,a.github_profile_url,a.cgpa,a.dob, a.applicant_name, a.email,a.phone_number, a.status,j.job_id,title from applications a inner join jobs j on a.job_id=j.job_id;",
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        res.json(result);
      }
    }
  );
});
router.post("/rejectApplication", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/rejectApplication");
  const { rejectedApplicationId, email, applicantName, applicantJobName } = req.body;

  mysql.query(
    "delete from applications where application_id =?",
    [rejectedApplicationId],
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          // to: 'muhammadihtisham60@gmail.com',
          to: email,
          to: "hmic828@gmail.com",
          subject: " Update on Your Application",
          text: `Dear ${applicantName},  
          I hope this message finds you well. We appreciate your interest in the ${applicantJobName} position at HRConnect and the time you invested in your application. 
          After careful consideration and a thorough review of all applicants, we regret to inform you that we have chosen to move forward with another candidate for this role. We understand that this may be disappointing news, and we want to assure you that our decision was not made lightly.
          We received a large number of applications from highly qualified individuals, which made the selection process quite competitive. While your qualifications and experience are impressive, we ultimately found another candidate whose skills and background more closely align with the specific needs of the role and our organization at this time.
          Please understand that this decision does not diminish the value of your skills and experience. We encourage you to continue exploring opportunities that match your career goals and expertise. We will keep your application on file for future openings, and we welcome you to apply for any positions that align with your qualifications in the future.
          Thank you once again for your interest in HRConnect, and we wish you every success in your job search. 
          We appreciate your understanding and hope you find the perfect opportunity that matches your career aspirations.`,
        };

        transporter.sendMail(mailOptions, (emailError, info) => {
          if (emailError) {
            console.error("Error sending email:", emailError);
            res
              .status(500)
              .json({
                success: false,
                message: "Failed to send reject application letter via email",
              });
          } else {
            console.log("Email sent:", info.response);
            res
              .status(200)
              .json({
                success: true,
                message: "application rejected successfully successfully",
              });
          }
        });
      }
    }
  );
});

router.post("/callForInterview", (req, res) => {
  console.log("callForInterview");
  const { callForInterviewId, interviewDate, interviewTime, email, applicantName, applicantJobName, location } = req.body;

  console.log(callForInterviewId);
  mysql.query(
    'update applications set status="interview" where application_id=?;',
    [callForInterviewId],
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          // to: 'muhammadihtisham60@gmail.com',
          to: email,
          // to: "hmic828@gmail.com",
          subject: ": Invitation for Interview ",
          text: `Dear ${applicantName},
          I hope this message finds you well. We appreciate your interest in the ${applicantJobName} position at HRConnect and your recent application. After a thorough review of all applicants, we are pleased to inform you that you have been selected for an interview.
          We would like to invite you to interview for the  ${applicantJobName} position on:
          Date:  ${interviewDate} Time:  ${interviewTime} Location: HRConnect, Lahore, Pakistan
          During the interview, you will have the opportunity to discuss your qualifications, learn more about our company, and meet with members of our team. Please be prepared to talk about your relevant experience and how it aligns with the requirements of the position.
          Prior to the interview, we kindly ask that you review our website and research our company to familiarize yourself with our values, mission, and goals. This will help facilitate a productive discussion during the interview.
          We look forward to meeting you in person and learning more about your qualifications and how you could contribute to [Company Name]. If you have any questions or need any further information, please don't hesitate to reach out.
          Thank you for considering a career with us, and congratulations once again on being selected for an interview. We wish you the best of luck and look forward to the opportunity to get to know you better.
          `,
        };

        transporter.sendMail(mailOptions, (emailError, info) => {
          if (emailError) {
            console.error("Error sending email:", emailError);
            res.status(500).json({ success: false, message: "Failed to send  Inteview call letter via email", });
          } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ success: true, message: "Interview Call Letter sended successfully", });
          }
        });
      }
    }
  );
});


router.post('/pdf', (req, res) => {
  console.log('/pdf');
  console.log(req.body);
  const job_id = req.body.job_id;
  const applicant_name = req.body.applicant_name;
  console.log(job_id, applicant_name);
  const fileName = `${job_id}_${applicant_name}.pdf`;
  const filePath = path.join(__dirname, '../uploads', fileName);

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).json({ error: `Error reading PDF file at ${filePath}` });
      } else {
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.contentType('application/pdf');
        res.send(data);
      }
    });
  } else {
    res.status(404).json({ error: `PDF file not found at ${filePath}` });
  }
});
// -------------------------------------------------------------------------
const storageImage = multer.diskStorage({
  destination: 'ImgUploads/',
  filename: function (req, file, callback) {
    const { emp_id } = req.user
    const fileExtension = path.extname(file.originalname);
    callback(null, emp_id + String(fileExtension));
  },
});

const uploadImage = multer({ storage: storageImage });

router.post('/upload', verifyToken, uploadImage.single('image'), (req, res) => {
  // const {emp_id}=user
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const { filename } = req.file;
  mysql.query('INSERT INTO images (image_file_name) VALUES (?)', [filename], (err) => {
    if (err) throw err;
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});

router.get('/images', verifyToken, (req, res) => {
  const { emp_id } = req.user;
  const imagePath = path.join(__dirname, '..', 'ImgUploads', `${emp_id}.png`);
  if (!imagePath || !fs.existsSync(imagePath)) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }
  res.setHeader('Content-Type', 'image/png')
  res.sendFile(imagePath);
  // res.sendFile(path.resolve(path.resolve(__dirname,'/imagepath.png')));
  // res.json({imagePath});

});
// ------------------------------------------------------------Departments--------------------------------------------------------------------------------------------
router.post("/addDepartment", (req, res) => {
  console.log("/addDepartment");
  const { newDepartmentName } = req.body;

  if (!newDepartmentName) {
    return res.json({
      success: false,
      message: "Department name is required.",
    });
  }
  const query = "INSERT INTO Department (dep_name) VALUES (?)";
  mysql.query(query, [newDepartmentName], (error, results) => {
    if (error) {
      console.error("Error adding department:", error);
      return res.json({ success: false, message: "Error adding department." });
    }
    res.json({ success: true, message: "Department added successfully." });
  });
});

router.post('/registerEmployee', verifyToken, checkUserRole(1), async (req, res) => {
  try {

    const {
      address,
      applicant_name,
      cgpa,
      city,
      cnic,
      degree,
      dep_id,
      dob,
      email,
      emp_id,
      gender,
      github_profile_url,
      hire_date,
      job_id,
      linkedin_profile_url,
      major,
      phone_number,
      role_id,
      salary,
      university,
      zipcode
    } = req.body;
    // const requiredFields = [address,
    //   applicant_name,
    //   cgpa,
    //   city,
    //   cnic,
    //   degree,
    //   dep_id,
    //   dob,
    //   email,
    //   emp_id,
    //   gender,
    //   github_profile_url,
    //   hire_date,
    //   job_id,
    //   linkedin_profile_url,
    //   major,
    //   phone_number,
    //   role_id,
    //   salary,
    //   university,
    //   zipcode]
    // for (const field of requiredFields) {
    //   if (req.body[field] === undefined || req.body[field].trim() === '') {
    //     return res.status(400).json({ success: false, message: `Field '${field}' is required.` });
    //   }
    // }
    const DOB = dob?.toString()?.slice(0, 10)
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(cnic?.toString(), salt);

    mysql.query('CALL registerEmployee(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        address,
        applicant_name,
        cgpa,
        city,
        cnic,
        degree,
        dep_id,
        DOB,
        email,
        hashed_password,
        emp_id,
        gender,
        github_profile_url,
        hire_date,
        job_id,
        linkedin_profile_url,
        major,
        phone_number,
        role_id,
        salary,
        university,
        zipcode], (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Failed to Register employee" });
          } else {
            const mailOptions = {
              from: process.env.EMAIL_USERNAME,
              to: email,
              subject: "Welcome to HRConnect",
              text: `Dear ${applicant_name},
              I hope this email finds you well. We are thrilled to officially welcome you to the HRConnect team as our newest [${job_id}]. Your acceptance of our offer is a significant milestone, and we are excited to have you on board.
              As part of our onboarding process, we are delighted to provide you with access to our Employee Dashboard, a centralized platform where you can manage your employment-related information and access various resources.
              Employee Dashboard Access Details:
              Dashboard URL: http://localhost:3001/Login
              Email:${email}
              Temporary Password: [Your CNIC Number]
              Note: For security reasons, please reset your password immediately after your first login. We have set your initial password as your CNIC number.
              Steps to Access Your Employee Dashboard:
              Visit the provided Dashboard URL.
              Enter your email and the temporary password (your CNIC number).
              Should you encounter any difficulties while logging in or if you have any questions about the Employee Dashboard, please do not hesitate to reach out to our HR department at below mention details. We are here to assist you and ensure a smooth transition into our organization.
              Please remember that your initial password is your CNIC number, but we strongly recommend rest it to a more secure password as soon as possible after your first login.
              Once again, welcome to the HRConnect family! We believe that your skills and expertise will make a positive impact, and we are looking forward to your contributions.
              `,
            };

            transporter.sendMail(mailOptions, (emailError, info) => {
              if (emailError) {
                console.error("Error sending email:", emailError);
                return res.status(500).json({ success: false, message: "Failed to send the Hiring Offer letter via email", });
              } else {
                console.log("Email sent:", info.response);
                return res.status(200).json({ success: true, message: "Employee Data inserted successfully & Offer Letter sent", });
              }
            })
          }
        })
  } catch (error) {
    console.log(error);
    res.json({ message: 'catch error', error, success: false })
  }
});

router.post('/sendOfferLetter', (req, res) => {
  const { application_id, offerLetter } = req.body;

  // Query the database for the applicant's email
  mysql.query('SELECT email FROM applications WHERE application_id = ?', [application_id], (err, result) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ success: false, message: 'Error querying the database' });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }
      const recipientEmail = result[0].email;
      console.log(recipientEmail);
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        // to: recipientEmail, 
        to: 'hmic828@gmail.com',
        subject: "Job Offer Letter",
        text: offerLetter,
      };

      transporter.sendMail(mailOptions, (emailError, info) => {
        if (emailError) {
          console.error("Error sending email:", emailError);
          return res.status(500).json({ success: false, message: "Failed to send the Offer letter via email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ success: true, message: "Offer Letter sent" });
        }
      });
    }
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/removeEmployee", verifyToken, checkUserRole(1), async (req, res) => {
  console.log("/removeEmployee");
  try {
    const { emp_id } = req.body;

    const response = await axios.post(
      "http://localhost:3002/getOneEmp",
      { emp_id }
    );
    const employee = response.data;

    mysql.query(
      "delete from employee where emp_id = ?;",
      [emp_id],
      (error, result) => {
        if (error) {
          console.error("Error removing employee:", error);
          res.status(500).json({ success: false, message: "Failed to remove employee" });
        } else {
          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            // to: "muhammadihtisham60@gmail.com",
            to: employee.email,
            subject: "Offer Letter",
            text: `Subject: Job Offer - HR Connect

          [Date]
          
          Dear ${employee.name},          
          Position:${employee.job_name}
          Start Date: ${employee.hire_date}
         
I am writing to inform you that your employment with HrConnect is terminated, effective [Termination Date]. This decision has been made after a careful review of your performance and other relevant factors.

Summary of Prior Discussions:
Your final paycheck, including any accrued but unused vacation or leave days, will be issued on ${current_date}.
You will receive information regarding your benefits continuation and any other relevant details separately.
Please return all company-owned property, including [List specific items such as keys, access cards, equipment, etc.], to the HR department by [Date]. Failure to return company property may result in deductions from your final paycheck.

Access to Company Premises:
Effective immediately, your access to company premises and systems will be revoked. Please return any company access cards or keys promptly.
include details about it here. You are expected to maintain confidentiality regarding any company information, clients, and colleagues, even after your employment ends.

Questions and Clarifications:
If you have any questions or require clarification regarding this termination, please do not hesitate to reach out to [HR Contact Name] at [HR Contact Email] or [HR Contact Phone Number].

We understand that this may be a challenging time, and we wish you the best in your future endeavors.

Sincerely,
Zeeshan Ali
HR 
TECHNOHUB
03021055932`,
          };
          transporter.sendMail(mailOptions, (emailError, info) => {
            if (emailError) {
              console.error("Error sending email:", emailError);
              res.status(500).json({ success: false, message: "Failed to send offer letter via email", });
            } else {
              console.log("Email sent:", info.response);
              res.status(200).json({ success: true, message: "Employee removed and Experience sent successfully", });
            }
          });
        }
      }
    );
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

// --------------------------------------------------------------------------emp/attendence---------------------------------------------------------------------------------
router.post("/getAttendencebyEmp", verifyToken, checkUserRole(2), (req, res) => {
  console.log("getAttendencebyEmp");
  const { todayDate } = req.body;
  const { emp_id } = req.user;
  mysql.query(
    "select status from attendance where emp_id=? and attendance_date=?;",
    [emp_id, todayDate],
    (err, result) => {
      if (err) {
        res.json({
          success: false,
          message: "error in fetching attendace status",
        });
      }
      else {
        res.json(result);
      }
    }
  );
});

router.put("/updateAttendance", verifyToken, checkUserRole(2), async (req, res) => {
  console.log("/updateAttendance");
  const { att_status } = req.body;
  const { emp_id } = req.user;
  mysql.query(
    "INSERT INTO attendance (emp_id, status, attendance_date) VALUES (?, ?, ?)",
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

router.put("/leaverequest", verifyToken, checkUserRole(2), async (req, res) => {
  console.log("/leaverequest");
  const { reason, leave_date, toDate } = req.body;
  const { emp_id } = req.user;
  console.log("/leaverequest");
  console.table({ emp_id, reason, leave_date, toDate });
  mysql.query(
    "INSERT INTO leaverequest (emp_id, reason, leave_date, applying_date,toDate ) VALUES (  ?, ?, ?, ?, ?) " +
    "ON DUPLICATE KEY UPDATE reason = VALUES(reason), leave_date = VALUES(leave_date), applying_date = VALUES(applying_date)",
    [emp_id, reason, leave_date, current_date, toDate],
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
router.put("/oneDayLeaveRequest", verifyToken, checkUserRole(2), async (req, res) => {
  console.log("/oneDayLeaveRequest");
  const { reason, leave_date } = req.body;
  const { emp_id } = req.user;
  console.table({ emp_id, reason, leave_date });
  mysql.query(
    "INSERT INTO leaverequest (emp_id, reason, leave_date, applying_date) VALUES ( ?, ?, ?, ?) " +
    "ON DUPLICATE KEY UPDATE reason = VALUES(reason), leave_date = VALUES(leave_date), applying_date = VALUES(applying_date)",
    [emp_id, reason, leave_date, current_date],
    (error, result) => {
      if (error) {
        console.error(error);
        res.json({ error, success: false, message: "An error occurred" });
      } else {
        res.json({ success: true, message: "Leave request has been sented." });
      }
    }
  );
});

router.post('/markAbsent', verifyToken, checkUserRole(1), (req, res) => {
  console.log('mark attendance');
  const query = `CALL markAbsentIntoAttendance()`

  mysql.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      console.log(result);
      res.json(result);
    }
  })
})

// --------------------------------------------------------------------------emp/myprofile---------------------------------------------------------------------------------
router.post("/getEmpInfobyEmpId", verifyToken, checkUserRole(2), (req, res) => {
  console.log("/getEmpInfobyEmpId");
  const { emp_id } = req.user;
  console.log("getEmpInfobyEmpId emp Id", emp_id);
  mysql.query(
    "select * from employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id where emp_id=? ;",
    [emp_id],
    (err, result) => {
      if (err) {
        res.json({
          success: false,
          message: "error in fetching attendace status",
          err,
        });
      } else {
        res.json(result[0]);
      }
    }
  );
});
router.post("/getempdashStats", verifyToken, checkUserRole(2), (req, res) => {
  console.log("/getempdashStats");
  const { emp_id } = req.user;
  mysql.query(
    "SELECT emp_id, SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS present_count, SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS absent_count,SUM(CASE WHEN status = 'Leave' THEN 1 ELSE 0 END) AS leave_count FROM attendance WHERE emp_id = ? AND MONTH(attendance_date) = MONTH(CURDATE()) AND YEAR(attendance_date) = YEAR(CURDATE()) GROUP BY emp_id;", [emp_id], (err, result) => {
      if (err) {
        res.json({ success: false, message: "error in fetching attendace status", err, });
      } else {
        res.json(result[0]);
      }
    }
  );
});
router.post("/getOneEmp", (req, res) => {
  console.log("/getOneEmp");
  const { emp_id } = req.body;
  mysql.query(
    "select * from employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id where emp_id=? ;",
    [emp_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "error in fetching Employee", err, });
      } else {
        res.json(result[0]);
      }
    }
  );
});
router.post("/getOneApplicant", (req, res) => {
  console.log("/  ");
  const { application_id } = req.body;
  mysql.query(
    "select * from applications where application_id = ?;",
    [application_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "error in fetching Applicant", err });
      } else {
        res.json(result[0]);
      }
    }
  );
});

router.put("/updateEmployeeInfo", verifyToken, checkUserRole(2), async (req, res) => {
  console.log("/updateEmployeeInfo");
  try {
    const { emp_id } = req.user;
    const { email, phone_number, city, address, zipcode } = req.body;
    // if (!phone_number || !city || !address || !zipcode || phone_number=='' || city==="" || address==="" || zipcode=="") {
    //   return res.status(400).json({ success:false,message: 'All fields are required' });""
    // }
    // const phoneRegex = /^\d{11}$/;
    // if (!phoneRegex.test(phone_number)) {
    //   return res.status(400).json({ success:false, message: 'Phone Number must be 11 digits' });
    // }
    // const zipCode = /^\d{5}$/;
    // if (!zipCode.test(zipcode)) {
    //   return res.status(400).json({ success:false, message: 'Zip-Code must 5 digits' });
    // }

    const updateQuery = `UPDATE employee SET email = ?, phone_number = ?, city = ?, address = ?, zipcode = ? WHERE emp_id = ?; `;

    mysql.query(
      updateQuery,
      [email, phone_number, city, address, zipcode, emp_id],
      (error, results) => {
        if (error) {
          console.error("Error updating employee information:", error);
          res.json({ success: false, message: "Internal server error." });
        } else {
          res.json({
            success: true,
            message: "Employee information updated successfully.",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error updating employee information:", error);
    res.json({ success: false, message: "Internal server error." });
  }
});

router.get("/empLeaveHistory", verifyToken, checkUserRole(2), (req, res) => {
  console.log("/employeeLeaveHistory");
  const { emp_id } = req.user;

  console.log("Employee ID: " + emp_id);

  mysql.query(`CALL employeeLeaveHistory(${emp_id})`, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      res.json(result[0]);
    }
  });
});

router.get("/getAttendance/:id", (req, res) => {
  console.log("/getAttendance");
  const { id } = req.params;

  console.log("Employee ID: " + id);

  mysql.query(`CALL getAttendance(${id})`, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      console.log(result[0]);
      res.json(result[0]);
    }
  });
});

router.get("/getApplicant/:id", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getApplicant");
  const { id } = req.params;

  mysql.query(
    `SELECT * FROM applications WHERE application_id = ${id}; `,
    (err, result) => {
      if (err) {
        console.error("Internal server erro:", err);
        res.json({ success: false, message: "Internal server error." });
      } else {
        res.json(result);
      }
    }
  );
});

// --------------------------------------------------------------------------hr/leaveapplication---------------------------------------------------------------------------------

router.get("/getApplications", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/getApplications");
  mysql.query("call getLeaveApplication();", (err, results) => {
    if (err) {
      console.error("Error fetching job leave Applications:", err);
      res.json({ message: err.sqlMessage });
    } else {
      res.json(results);
    }
  });
});

router.get("/getTodayAttendance", verifyToken, checkUserRole(1), (req, res) => {
  mysql.query(
    "SELECT * FROM attendance WHERE attendance_date = DATE(NOW());",
    (err, result) => {
      if (err) {
        console.error(err);
        res.json({ success: false, message: "An error occurred" });
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

router.put("/leaveApproved", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/leaveApproved");

  const { emp_id, attendance_date, toDate } = req.body;
  console.log(emp_id, attendance_date, toDate);
  if (toDate == null || toDate === 'NaN-NaN-NaN' || toDate === "") {
    const status = "Leave";
    mysql.query(
      `call attendanceApproval(${emp_id}, '${status}', '${attendance_date}')`,
      (error, result) => {
        if (error) {
          console.error(error);
          res.json({ success: false, message: "An error occurred" });
        } else {
          res.json({ success: true, message: "Attendence Approved" });
        }
      }
    );
  } else {
    const status = "Leave";
    mysql.query(
      `call multipleAttendanceApproval(${emp_id}, '${status}', '${attendance_date}','${toDate}')`,
      (error, result) => {
        if (error) {
          console.error(error);
          res.json({ success: false, message: "An error occurred" });
        } else {
          res.json({ success: true, message: "Attendence Approved" });
        }
      }
    );
  }
});


router.put("/leaveRejected", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/leaveRejected");
  const { req_id } = req.body;
  console.log(req_id);
  mysql.query(`call attendanceRejected(${req_id})`, (error, result) => {
    if (error) {
      console.error(error);
      res.json({ success: false, message: "An error occurred" });
    } else {
      res.json({ success: true, message: "Leave Rejected" });
    }
  });
});

router.get("/empLeaveHistory/:id", verifyToken, checkUserRole(1), (req, res) => {
  console.log("/employeeLeaveHistory");
  // const { id } = req.params;

  console.log("Employee ID: " + id);

  mysql.query(`CALL employeeLeaveHistory(${id})`, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      res.json(result[0]);
    }
  });
});


// -------------------------------- Dashboard/hr -----------------------------
router.get("/getDashboardData", verifyToken, checkUserRole(1), (req, res) => {
  const { emp_id, role_id } = req.user;
  console.log("/getDashboardData", emp_id, role_id);
  mysql.query(`CALL getDashboardTotals(); `, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      console.log(result[0][0]);
      res.json(result[0][0]);
    }
  });
});
// ---------------------------------------------get today attendce/hr---------------------------------------
router.get("/getTodayAllAttendance", verifyToken, checkUserRole(1), (req, res) => {
  const query = `CALL getTodayAttendance()`;

  mysql.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err, message: err.message });
      return;
    }
    res.json(results[0]);
  });
});

router.get("/getattendancehistory", verifyToken, checkUserRole(1), (req, res) => {
  const query = `CALL getattendancehistory()`;

  mysql.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err, message: err.message });
      return;
    }
    res.json(results[0]);
  });
});

// ----------------------------------------------------authentication----------------------------------------------------------------------


router.get("/logout", (req, res) => {
  console.log("/logout");
  return res.clearCookie("token").json({
    success: true,
    message: "Ready to move on",
  });
});

async function getUserByEmail(email) {

  const user = await mysql.query('SELECT * FROM users WHERE user_email = ?', [email]);
  return user[0];
}

async function updateUserPassword(userId, newPassword) {
  await db.query('', [newPassword, userId]);
}

router.post('/resetPassword', verifyToken, checkUserRole(2), async (req, res) => {
  const { email, currentPassword, password } = req.body;
  const { user_id } = req.user;
  console.log(user_id);
  try {
    mysql.query('select * from users where user_id=?;', [user_id], async (err, result) => {
      if (err) {
        res.json({ success: false, err, message: 'Their is an issue' });
        console.log(err);
      } else {
        user = result[0];
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.user_password);
        if (!passwordMatch) {
          return res.status(401).json({ success: false, message: 'Incorrect current password' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(password, salt);
        mysql.query('UPDATE users SET user_password = ? WHERE user_id = ?', [hashedNewPassword, user_id], (error, result) => {
          if (error) {
            res.json({ success: false, error, message: 'Their is an issue' });
            console.log(error);
          } else {
            res.status(200).json({ success: true, message: 'Password reset successfully' });
          }
        })

      }
    })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, error, message: 'Catch Issue' });
  }
})

router.put("/resetPassword", verifyToken, checkUserRole(2), (req, res) => {
  console.log("/reset password");
  const { user_id } = req.user;
  const q = `update users set user_password = ? where user_id = ? `;

  console.log("ID: " + req.id)
  console.log("Password : " + req.hashed_password)

  mysql.query(q, [req.hashed_password, req.id], (err, result) => {
    if (err) {
      console.log("last step failed");
      console.log(err);
      return res.json({
        success: false,
        message: "Last step failed",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Password Reset Successfully"
      })
    }
  });
});

// -----------------------------------


router.post('/login', async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    mysql.query(
      'SELECT * FROM users WHERE user_email = ?',
      [user_email],
      async (error, results) => {
        if (error) {
          console.error('Login error:', error);
          res.status(500).json({ success: false, message: 'Login failed' });
        } else if (results.length === 0) {
          res.status(401).json({ success: false, message: 'User not found' });
        } else {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(user_password, user.user_password);
          if (passwordMatch) {
            const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id, emp_id: user.emp_id }, process.env.SECRET_KEY, {
              expiresIn: '3h',
            });
            res.cookie('jwtToken', token);
            res.status(200).json({ success: true, message: 'Login successful', token, role_id: user.role_id });
          } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        }
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});


router.get('/decodeToken', verifyToken, (req, res) => {
  const { user_id, role_id, emp_id } = req.user;
  res.json({ success: true, user_id, role_id, emp_id });
});


module.exports = router;
