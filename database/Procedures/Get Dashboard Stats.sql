CREATE DEFINER=`root`@`localhost` PROCEDURE `getDashboardStats`()
BEGIN
    DECLARE totalEmployees INT;
    DECLARE presentEmployees INT;
    DECLARE absentEmployees INT;
    DECLARE leaveEmployees INT;

    -- Get the total number of employees
    SELECT COUNT(*) INTO totalEmployees FROM employee;

    -- Get the number of present employees
    SELECT COUNT(*) INTO presentEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Present';

    -- Get the number of absent employees
    SELECT COUNT(*) INTO absentEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Late';

    -- Get the number of employees on leave
    SELECT COUNT(*) INTO leaveEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Leave';

    -- Return the results
    SELECT totalEmployees AS no_of_employees,
           presentEmployees AS no_of_present_employees,
           absentEmployees AS no_of_absent_employees,
           leaveEmployees AS no_of_leave_employees;
END