CREATE DEFINER=`root`@`localhost` PROCEDURE `getLeaveApplication`()
BEGIN
    SELECT
        lr.emp_id,
        lr.att_status,
        lr.leave_date,
        lr.reason,
        lr.applying_date,
        lr.leave_req_id,
        e.name AS emp_name,
        d.dep_name,
        d.dep_id
    FROM
        leaverequest lr
    INNER JOIN
        employee e ON lr.emp_id = e.emp_id
    LEFT JOIN
        Department d ON e.dep_id = d.dep_id;
END