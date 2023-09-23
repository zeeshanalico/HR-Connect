CREATE DEFINER=`root`@`localhost` PROCEDURE `markAttendance`()
begin 
	INSERT INTO attendance (emp_id, attendance_date, status)
	SELECT emp_id, Date(NOW()), "Absent" FROM employee WHERE emp_id NOT IN (
		SELECT emp_id FROM attendance WHERE attendance_date = DATE(NOW())
	);
end