CREATE DEFINER=`root`@`localhost` PROCEDURE `employeeLeaveHistory`(IN id INT)
BEGIN
	SELECT * FROM leaverequest 
	WHERE emp_id = id
	ORDER BY leave_date DESC;
END