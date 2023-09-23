CREATE DEFINER=`root`@`localhost` PROCEDURE `attendanceApproval`(IN id INT, IN p_att_status VARCHAR(10), IN p_date DATE)
BEGIN
	-- inserting into attendance
    INSERT INTO attendance (emp_id, attendance_date, status) VALUES (id, p_date, p_att_status);
    -- updating leave request
    UPDATE leaverequest
    SET att_status = 'Approved'
    WHERE emp_id = id AND leave_date = p_date;
END