CREATE DEFINER=`root`@`localhost` PROCEDURE `getAttendanceHistory`()
BEGIN
SELECT
    e.emp_id,
    e.name,
    a.attendance_date,
    a.status
FROM
    employee e
LEFT JOIN
    attendance a ON e.emp_id = a.emp_id
ORDER BY
    e.emp_id, a.attendance_date;

END