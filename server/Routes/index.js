const express = require("express");
const router = express.Router();

const mysql = require("../connection");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const multer = require("multer");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ------------------------------------------ Verify MiddleWare ----------------------------------------

const verify = (req, res, next) => {
  console.log("Verify");
  const { token } = req.cookies;

  if (token === undefined) {
    res.status(401).json({
      success: false,
      message: `You're not a authorized user`,
    });
  }

  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.json({
        success: false,
        message: `Some error occurred`,
      });
    }

    req.id = decode.user_id;
    console.log("User id in jwt : " + req.id);
    next();
  });
};

const getEmpID = (req, res, next) => {
  mysql.query(
    `SELECT * FROM users WHERE user_id = ${req.id}`,
    (err, result) => {
      if (err) {
        res.json({
          sucess: false,
          message: "Employee ID not fetched",
        });
      } else {
        console.log("Emp ID into else : " + result[0].emp_id);
        req.emp = result[0].emp_id;
        next();
      }
    }
  );
};

//------------------------------------------------------hiring/post a job---------------------------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getCurrentDate = require("./../Utils/dateUtils.js");
const current_date = getCurrentDate();

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
router.get("/getJobs", (req, res) => {
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
router.get("/getDepInfo", (req, res) => {
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

router.get("/getEmployees", (req, res) => {
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

router.get("/getEmployee/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Get Employee @ ${id}`);

  mysql.query(
    `SELECT * FROM hr.employee WHERE emp_id = ${id};`,
    (error, result) => {
      if (error) {
        res.json({
          message: "Database or Backend error occured",
          success: false,
        });
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

// delete job by hr
router.post("/deleteJob", (req, res) => {
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
router.post("/jobPost", (req, res) => {
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

const uploadDirectory = `${__dirname}/../uploads`; // Replace 'uploads' with your desired directory name

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
  const extra = "nofil";

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
router.get("/getJobApplications", (req, res) => {
  console.log("/getJobApplications");
  mysql.query(
    "select application_id, applicant_name, email,phone_number, status,j.job_id,title from applications a inner join jobs j on a.job_id=j.job_id;",
    (error, result) => {
      if (error) {
        res.json({ message: error.sqlMessage, error, success: false });
      } else {
        res.json(result);
      }
    }
  );
});
router.post("/rejectApplication", (req, res) => {
  console.log("/rejectApplication");
  const { rejectedApplicationId } = req.body;
  console.log(rejectedApplicationId);
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
          // to: email,
          to: "hmic828@gmail.com",
          subject: "Job Application Rejected",
          text: `Better luck next time! Your Job Application Rejected.

                    Sincerely,
                    Zeeshan Ali(HR) 
                    TECHNOHUB  
                `,
        };

        transporter.sendMail(mailOptions, (emailError, info) => {
          if (emailError) {
            console.error("Error sending email:", emailError);
            res.status(500).json({
              success: false,
              message: "Failed to send reject application letter via email",
            });
          } else {
            console.log("Email sent:", info.response);
            res.status(200).json({
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
  const { callForInterviewId, interviewDate, interviewTime, email } = req.body;

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
          // to: email,
          to: "hmic828@gmail.com",
          subject: "Call For Interview",
          text: `Congrats! We are calling you for interview at TecnoHub.
                    Interview Date: ${interviewDate}
                    Interview Time:${interviewTime}

                    Sincerely,
                    Zeeshan Ali(HR) 
                    TECHNOHUB  
                `,
        };

        transporter.sendMail(mailOptions, (emailError, info) => {
          if (emailError) {
            console.error("Error sending email:", emailError);
            res.status(500).json({
              success: false,
              message: "Failed to send  Inteview call letter via email",
            });
          } else {
            console.log("Email sent:", info.response);
            res.status(200).json({
              success: true,
              message: "Interview Call Letter sended successfully",
            });
          }
        });
      }
    }
  );
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

//// -----------------------------------------------------emplyees/addemployees---------------------------------------------------------------------------------------
const { log } = require("console");

// Verifying that email is not used before
const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE user_email = ?";

  console.log(query);

  mysql.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error occurred during verifying email",
      });
    }

    console.log(result);

    if (result.length > 0) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    // return res.json({
    //   success: true,
    //   message: 'Email is available for registration.',
    // })

    console.log("Email is available for registration");

    next();
  });
};

router.post("/registerEmployee", verifyEmail, async (req, res) => {
  console.log("/registerEmployee");
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
    zipcode,
  } = req.body;

  mysql.query(
    "CALL registerEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
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
      zipcode,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.json({
          message: err.sqlMessage,
          success: false,
          error: "Error inserting  data",
        });
      } else {
        console.log(result);
        //   const mailOptions = {
        //     from: process.env.EMAIL_USERNAME,
        //     // to: 'muhammadihtisham60@gmail.com',
        //     // to: email,
        //     to: "hmic828@gmail.com",
        //     subject: "Job Offer Letter",
        //     text: `Congratulations you are hired and TechoHub! You can join us from date.

        //                       Sincerely,
        //                       Zeeshan Ali(HR)
        //                       TECHNOHUB
        //                   `,
        //   };

        //   transporter.sendMail(mailOptions, (emailError, info) => {
        //     if (emailError) {
        //       console.error("Error sending email:", emailError);
        //       res
        //         .status(500)
        //         .json({
        //           success: false,
        //           message: "Failed to send Hiring Offer letter via email",
        //         });
        //     } else {
        //       console.log("Email sent:", info.response);
        //       res
        //         .status(200)
        //         .json({
        //           success: true,
        //           message:
        //             "Employee Data inserted successfully & Offer Letter Sended",
        //         });
        //     }
        //   });
      }
    }
  );

  // Inserting into Users
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(cnic, salt);

  console.log(email, hashed_password, emp_id, role_id);

  mysql.query(
    "INSERT INTO users (user_email, user_password, role_id, emp_id) VALUES (?,?,?,?);",
    [email, hashed_password, role_id, emp_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          message: "Sign Up Error",
          success: false,
        });
      }

      console.log("Inserting Into USers");
      console.log(result);
    }
  );

  return res.json({
    message: "Good to go",
  });
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/removeEmployee", async (req, res) => {
  try {
    console.log("/removeEmployee");
    const { emp_id } = req.body;
    const response = await axios.post(
      "http://localhost:3002/getEmpInfobyEmpId",
      { emp_id }
    );
    const employee = response.data[0];

    mysql.query(
      "delete from employee where emp_id = ?;",
      [emp_id],
      (error, result) => {
        if (error) {
          console.error("Error removing employee:", error);
          res
            .status(500)
            .json({ success: false, message: "Failed to remove employee" });
        } else {
          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "muhammadihtisham60@gmail.com",
            subject: "Offer Letter",
            text: `Subject: Job Offer - [Your Company Name]

          [Date]
          
          Dear ${employee.name},          
          Position:${employee.job_name}
          Start Date: ${employee.hire_date}
         
I am writing to inform you that your employment with [Your Company Name] is terminated, effective [Termination Date]. This decision has been made after a careful review of your performance and other relevant factors.

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
03021055932
                    `,
          };

          transporter.sendMail(mailOptions, (emailError, info) => {
            if (emailError) {
              console.error("Error sending email:", emailError);
              res.status(500).json({
                success: false,
                message: "Failed to send offer letter via email",
              });
            } else {
              console.log("Email sent:", info.response);
              res.status(200).json({
                success: true,
                message: "Employee removed and offer letter sent successfully",
              });
            }
          });
        }
      }
    );
  } catch (e) {
    response.json({ success: false, message: e });
  }
});

// --------------------------------------------------------------------------emp/attendence---------------------------------------------------------------------------------
router.post("/getAttendencebyEmp", verify, getEmpID, (req, res) => {
  console.log("getAttendencebyEmp");
  const { todayDate } = req.body;
  const emp_id = req.emp;
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
      // if (results.length === 0) {
      //     res.json({ status: 'absent' });
      //   }
      else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

router.put("/updateAttendance", verify, getEmpID, async (req, res) => {
  console.log("/updateAttendance");
  const { att_status } = req.body;
  const emp_id = req.emp;
  // const allAttendance=await axios.get('http://localhost:3002/getAttendence');
  // const findAttendance=allAttendance.data((attendance)=>{ emp_id===attendance.emp_id && current_date===attendance.attendance_date})
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

router.put("/leaverequest", verify, getEmpID, async (req, res) => {
  console.log("/leaverequest");
  const { reason, leave_date } = req.body;
  const emp_id = req.emp;
  console.log("/leaverequest");
  console.table({ emp_id, reason, leave_date });
  mysql.query(
    "INSERT INTO leaverequest (emp_id, reason, leave_date, applying_date) VALUES (?,  ?, ?, ?) " +
      "ON DUPLICATE KEY UPDATE reason = VALUES(reason), leave_date = VALUES(leave_date), applying_date = VALUES(applying_date)",
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

router.get("/getTodayAttendance", (req, res) => {
  mysql.query(
    "SELECT * FROM hr.attendance WHERE attendance_date = DATE(NOW());",
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

router.post("/markAbsent", (req, res) => {
  console.log("mark attendance");
  const query = `CALL markAbsentIntoAttendance()`;

  mysql.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// --------------------------------------------------------------------------emp/myprofile---------------------------------------------------------------------------------
router.post("/getEmpInfobyEmpId", verify, getEmpID, (req, res) => {
  console.log("/getEmpInfobyEmpId");
  // const { emp_id } = req.body;

  const emp_id = req.emp;

  mysql.query(
    "select * from employee ei join roles r on ei.role_id=r.role_id join department d on ei.dep_id=d.dep_id join jobpositions jp on ei.job_id=jp.job_id where emp_id=? ;",
    [emp_id],
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: "error in fetching attendace status",
          err,
        });
      } else {
        return res.json(result);
      }
    }
  );
});

router.put("/updateEmployeeInfo", async (req, res) => {
  console.log("/updateEmployeeInfo");
  try {
    const { emp_id, email, phone_number, city, address, zipcode } = req.body;
    const updateQuery = `UPDATE employee SET email = ?, phone_number = ?, city = ?, address = ?, zipcode = ? WHERE emp_id = ?;`;

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

router.get("/getApplicant/:id", (req, res) => {
  console.log("/getApplicant");

  const { id } = req.params;

  mysql.query(
    `SELECT * FROM hr.applications WHERE application_id = ${id};`,
    (err, result) => {
      if (err) {
        console.error("Error updating employee information:", err);
        res.json({ success: false, message: "Internal server error." });
      } else {
        res.json(result);
      }
    }
  );
});

// --------------------------------------------------------------------------hr/leaveapplication---------------------------------------------------------------------------------

router.get("/getApplications", (req, res) => {
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

router.put("/leaveApproved", (req, res) => {
  console.log("/leaveApproved");
  const { emp_id, attendance_date } = req.body;
  const status = "Leave";
  mysql.query(
    `call attendanceApproval(${emp_id},'${status}','${attendance_date}')`,
    (error, result) => {
      if (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred" });
      } else {
        res.json({ success: true, message: "Attendence Approved" });
      }
    }
  );
});
router.put("/leaveRejected", (req, res) => {
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

router.get("/empLeaveHistory/:id", (req, res) => {
  console.log("/employeeLeaveHistory");
  const { id } = req.params;

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

router.get("/empLeaveHistory", verify, getEmpID, (req, res) => {
  console.log("/employeeLeaveHistory");
  const id = req.emp;

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

// -------------------------------- Dashboard -----------------------------

router.get("/getDashboardData", (req, res) => {
  console.log("/getDashboardData");

  mysql.query(`CALL getDashboardStats();`, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "An error occurred" });
    } else {
      console.log(result);
      res.json(result[0]);
    }
  });
});
// ---------------------------------------------get today attendce/hr---------------------------------------
router.get("/getTodayAllAttendance", (req, res) => {
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

router.get("/getattendancehistory", (req, res) => {
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
// router.get("/users", (req, res) => {
//   mysql.query("SELECT user_id, username FROM users", (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ err, message: err.message });
//       return;
//     }
//     res.json(results);
//   });
// });

// router.post("/RegisterUser", async (req, res) => {
//   try {
//     const users = await axios.get("http://localhost:3002/users");
//     finduser = users.data.find((u) => {
//       return u.username == req.body.username;
//     });
//     if (finduser.useremail === req.body.username) {
//       res.json({
//         success: false,
//         message: "user Already exist with this username/email",
//       });
//     } else {
//       const { user_name, user_password, role_id, emp_id } = req.body;
//       const hashed_password = await bcrypt.hash(user_password, 10);
//       const values = [user_name, hashed_password, role_id, emp_id];

//       mysql.query(
//         "insert into user(username,hashed_password,role_id,emp_id) values (?,?,?,?) ",
//         values,
//         (err, result) => {
//           if (err) {
//             console.error("Error in registration", err);
//             res.json({ message: err.sqlMessage });
//           } else {
//             res.json({ success: true, message: "Registration successful" });
//           }
//         }
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

// ------------------------------------ Auth Middleware --------------------------------------
const authMiddleware = (req, res, next) => {
  // const {token} = req.cookies;

  // console.log("Token : "+token);

  // const {user_id} = jwt.verify(token, process.env.SECRET_KEY);

  // console.log(user_id)

  // const {email, password, role} = req.body;

  // console.log(email, password, role);

  // mysql.query('select * from users where user_email = ? and role_id = ?', [email, role], (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return res.json({
  //       success: false,
  //       message: "Connectivity issue"
  //     })
  //   }

  //   if(result.length > 0) {
  //     console.log("such a user exist")
  //     return res.json({
  //       success: true,
  //       message: "User Found"
  //     })
  //   }
  //   else {
  //     console.log("Not such a user found");
  //     return res.json({
  //       success: false,
  //       message: "User Not Found"
  //     })
  //   }
  // })

  next();
};

router.post("/verifyEmail", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE user_email = ?";

  console.log(query);

  mysql.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error occurred during verifying email",
      });
    }

    console.log(result);

    if (result.length > 0) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    res.json({
      success: true,
      message: "Email is available for registration.",
    });
  });
});

router.post("/loginUser", async (req, res) => {
  console.log("Login user is in process");
  const { email, password, role } = req.body;

  console.log(email, password, role);

  mysql.query(
    "select * from users where user_email = ? and role_id = ?",
    [email, role],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Some Issue Occurred",
        });
      }

      console.log("heelo");

      if (result.length > 0) {
        console.log(result[0].user_id);
        console.log(result[0].user_password);

        const isMatch = await bcrypt.compare(password, result[0].user_password);

        if (isMatch) {
          const token = jwt.sign(
            { user_id: result[0].user_id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );

          console.log(token);

          // return res.json({
          //   success: true,
          //   message: "You're Logged In",
          //   token: token,
          // });

          res.cookie("token", token);
        } else {
          return res.json({
            success: false,
            message: "Incorrect",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Not exist",
        });
      }

      return res.json({
        success: true,
        message: "Here we go now",
      });
    }
  );
});

router.get("/logout", (req, res) => {
  console.log("This is logout place");
  return res.clearCookie("token").json({
    success: true,
    message: "Ready to move on",
  });
});

router.get("/checkAuth", verify, (req, res) => {
  console.log("/checkAuth");

  console.log("Cookie : " + req.cookies.token);

  console.log("Check Auth USER ID : " + req.id);

  mysql.query(
    "select * from users where user_id = ?",
    [req.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Query not executed well",
        });
      }

      console.log(result);

      return res.json({
        success: true,
        role: result[0].role_id,
      });
    }
  );
});

const verifyPassword = async (req, res, next) => {
  console.log("Verify Password");
  const { current, confirm, newPass } = req.body;
  const salt = await bcrypt.genSalt(10);

  mysql.query("SELECT * FROM users WHERE user_id = ? ",[req.id], async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Users table not processed",
        });
      }

      console.log("User Password : " + result[0].user_password);

      const isMatch = bcrypt.compare(current, result[0].user_password);

      if (isMatch) {
        console.log("Matched");
        req.hashed_password = await bcrypt.hash(newPass, salt);
        next();
      } else {
        console.log(" no Matched");
        return res.json({
          success: false,
          message: "Cannot change password",
        });
      }
    }
  );
};

router.put("/resetPassword", verify, verifyPassword, (req, res) => {
  console.log("reset password");

  const q = `update users set user_password = ? where user_id = ?`;

  console.log("ID: "+req.id)
  console.log("Password : "+req.hashed_password)

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

module.exports = router;
