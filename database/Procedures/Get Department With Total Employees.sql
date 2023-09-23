CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDepartmentsWithTotalEmployees`()
BEGIN
    SELECT
        d.dep_id,
        d.dep_name,
        COUNT(e.emp_id) AS total_employees
    FROM
        Department d
    LEFT JOIN
        employee e ON d.dep_id = e.dep_id
    GROUP BY
        d.dep_id, d.dep_name;
END