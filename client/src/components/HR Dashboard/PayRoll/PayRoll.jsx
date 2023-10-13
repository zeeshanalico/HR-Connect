import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BaseUrl, config, inputStyle } from '../../../constants';
import Toast from '../../../UIModules/Toast/Toast';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const PayRoll = () => {

    const [employees, setEmployees] = useState([]);
    const [showApproveSalaryModal, setShowApproveSalaryModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [empDetail, setEmpDetail] = useState({})
    const [empSal, setEmpSal] = useState('')
    const [incrementAmount, setIncrementAmount] = useState('');
    const [dep, setDep] = useState([])
    const [jobPositions, setJobPositions] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(BaseUrl + '/getEmployeesforPayRoll', config);
            console.log(response.data);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching roles :', error);
            Toast('Error catch :', 'error');
        }
    };

    const fetchData1 = async () => {
        try {
            const response = await axios.get(BaseUrl + '/getJobPositions', config);
            setJobPositions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data jobpositons:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const response = await axios.get(BaseUrl + '/getDepartment');
            setDep(response.data);
        } catch (error) {
            console.error('Error fetching data dep :', error);

        }
    };
    useEffect(() => {
        fetchData();
        fetchData1();
        fetchData2();
    }, [])

    const handleSalaryApprove = async () => {
        console.log(empSal);
        console.log(empDetail.emp_id);
        const response = await axios.post(BaseUrl + '/approveSalary', { empId: empDetail.emp_id, empSal }, config);
        if (response.data.success) {
            Toast(`${response.data.message}`)
        } else {
            Toast(`${response.data.message}`, 'error')
        }
        await fetchData();
        setShowApproveSalaryModal(false)
    }

    const handlePromotion = async (updatedSalary) => {
        console.log(updatedSalary, empDetail.emp_id);
        const response = await axios.post(BaseUrl + '/updateSalary', { updatedSalary, empId: empDetail.emp_id }, config)
        if (response.data.success) {
            Toast(`${response.data.message}`)
        } else {
            Toast(`${response.data.message}`, 'error')
        }
        await fetchData();
        setIncrementAmount('')
        setShowPromotionModal(false);
    };

    const calculateTax = (salary) => {
        let tax = 0;

        if (salary >= 300000) {
            tax = salary * 0.15;
        } else if (salary >= 200000 && salary < 300000) {
            tax = salary * 0.12;
        } else if (salary >= 100000 && salary < 200000) {
            tax = salary * 0.10;
        } else if (salary >= 50000 && salary < 100000) {
            tax = salary * 0.08;
        } else {
            tax = salary * 0.05;
        }
        // Ensure tax is an integer (ignore decimal points)
        // console.log(typeof tax)
        tax = Math.floor(tax);
        return tax;
    };

    const calculateCellValue = (employee) => {
        console.log("calculated tax ", calculateTax(employee.salary));
        if (employee?.performanceScore === 100) {
            const updatedSalary = employee.salary - (calculateTax(employee.salary)) + (employee.salary * 0.02);
            return `${updatedSalary.toString().slice(0, -3)} PKR`;
        } else {
            return employee?.salary ? (Number(employee.salary)-(calculateTax(employee.salary)) ) : 'N/A';
        }
    };

    // ------------------------------------------------------------------------------------------------

    const [filters, setFilters] = useState({
        employeeName: '',
        department: '',
        jobPosition: '',
        empId: '',
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredEmployees = employees
        .filter((emp) => emp?.name?.toLowerCase()?.includes(filters.employeeName.toLowerCase()))
        .filter((emp) => emp?.job_name?.toLowerCase()?.includes(filters.jobPosition.toLowerCase()))
        .filter((emp) => emp?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
    const offset = currentPage * itemsPerPage;
    const currentEmployees = filteredEmployees.slice(offset, offset + itemsPerPage);
    console.log('filteredEmployee ', filteredEmployees);
    const handleFilter = (filterType, value) => {
        console.log(filterType, value);
        setFilters({ ...filters, [filterType]: value });
        setCurrentPage(0);
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0);

    };
    // ------------------------------------------------------------------------------------------------

    return (
        <div className="container mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="mb-4">Payroll Management</h2>
            {/* <button className="btn btn-primary mb-3" onClick={handleApproveAllClick}>
        Approve All Salaries
      </button> */}
            <div style={{ display: 'flex', flex: '1', gap: '20px', width: "100%", margin: '10px auto' }}>
                <input
                    type="text"
                    style={{ ...inputStyle, WebkitAppearance: 'none' }}
                    id="employeeNameFilter"
                    placeholder="Search by Employee Name"
                    className="form-control round"
                    value={filters.employeeName}
                    onChange={(e) => handleFilter('employeeName', e.target.value)}
                />
                <select
                    value={filters.department}
                    className="form-control round"
                    onChange={(e) => handleFilter('department', e.target.value)}
                >
                    <option value={''} style={{ display: 'none' }}>Department</option>
                    <option value={''}>All</option>
                    {dep.map((department) => (
                        <option value={department.dep_name} key={department.dep_name}>
                            {department.dep_name}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.jobPosition}
                    autoComplete='off'
                    className={`form-control round`}
                    onChange={(e) => handleFilter('jobPosition', e.target.value)}
                >
                    <option value={''} style={{ display: 'none' }}>Job Position</option>
                    <option value={''}>All</option>

                    {jobPositions.map((job) => (
                        <option value={job.job_name} key={job.job_name}>
                            {job.job_name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Job Position</th>
                        <th>Basic Salary</th>
                        <th>Performance Score (%)</th>
                        <th>Bonus</th>
                        <th>Tax</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.emp_id}>
                            <td>{employee?.name}</td>
                            <td>{employee?.dep_name}</td>
                            <td>{employee?.job_name}</td>
                            <td>{employee?.salary ? `${employee.salary.toString().slice(0, -3)} PKR` : 'N/A'}</td>
                            <td>{employee?.performanceScore}</td>
                            <td>
                                {employee?.performanceScore === 100 ? `$${(employee.salary * 0.02)}` : 'N/A'}
                            </td>
                            <td>
                                {employee?.salary ? calculateTax(employee.salary) : 'N/A'}
                            </td>
                            <td>{calculateCellValue(employee)}</td>


                            <td>
                                {employee?.salaryStatus === 'Paid' ? (
                                    <span className="badge bg-success">Paid</span>
                                ) : (
                                    <span className="badge bg-warning">Not Paid</span>
                                )}
                            </td>

                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => {
                                        setShowPromotionModal(true)
                                        setEmpDetail({ ...employee });
                                    }}
                                    style={{ marginBottom: '5px' }}
                                >
                                    Increase Salary
                                </button>
                                {employee.salaryStatus === 'Not Paid' && <button
                                    className="btn btn-success btn-sm"
                                    //   disabled={employee.salaryStatus === 'Paid'}
                                    onClick={() => {
                                        setShowApproveSalaryModal(true);
                                        setEmpDetail({ ...employee });
                                        setEmpSal(employee.performanceScore === 100
                                            ? (employee.salary + (employee.salary * 0.02))
                                            : (employee.salary))
                                    }}
                                >
                                    Approve Salary
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', margin: '10px auto', gap: '5px' }}>
                <select
                    name="itemsPerPage"
                    id="itemsPerPage"
                    className="form-control round"
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                >
                    <optgroup label='Items/Page'></optgroup>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)} // Use filteredApplications.length
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                />
            </div>

            {/* Promotion Modal */}
            <Modal show={showPromotionModal} onHide={() => setShowPromotionModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Promote Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="currentSalary" className="form-label">Employee Name:</label>
                        <input
                            type="name  "
                            className="form-control"
                            id="name"
                            value={empDetail.name}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="currentSalary" className="form-label">Current Basic Salary:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="currentSalary"
                            value={empDetail && empDetail.salary ? empDetail.salary.toString().slice(0, -3) + " PKR" : ''}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="currentJobPosition" className="form-label">Current Job Position:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={empDetail.job_name}
                            id="currentJobPosition"
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="incrementAmount" className="form-label">Increment Amount:</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="incrementAmount"
                            value={incrementAmount}
                            onChange={(e) => setIncrementAmount(e.target.value)}
                        />
                    </div>
                    {incrementAmount && <div>
                        Updated Salary= {empDetail.salary.toString().slice(0, -3)}+{incrementAmount}= {Number(empDetail.salary) + Number(incrementAmount)} PKR
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowPromotionModal(false) }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handlePromotion(Number(empDetail.salary) + Number(incrementAmount)) }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Approve All Modal */}
            <Modal show={showApproveSalaryModal} onHide={() => setShowApproveSalaryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Approve All Salaries</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to approve the salary of {empDetail.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowApproveSalaryModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleSalaryApprove}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    );
};

export default PayRoll;
