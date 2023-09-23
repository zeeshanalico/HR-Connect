CREATE DEFINER=`root`@`localhost` PROCEDURE `getTodayAttendance`()
BEGIN

SELECT
    e.emp_id,
    e.name ,
    e.dep_id,
    e.email,
    e.gender,
    e.phone_number,
    a.status,
    d.dep_name
FROM
    employee e
LEFT JOIN
    attendance a ON e.emp_id = a.emp_id
inner join 
	department d on d.dep_id=e.dep_id
WHERE
    DATE(a.attendance_date) = CURDATE();
END