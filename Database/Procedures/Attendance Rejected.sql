CREATE DEFINER=`root`@`localhost` PROCEDURE `attendanceRejected`(IN req_id_param INT)
BEGIN
UPDATE leaverequest
    SET att_status = 'Rejected'
    WHERE leave_req_id = req_id_param;
END