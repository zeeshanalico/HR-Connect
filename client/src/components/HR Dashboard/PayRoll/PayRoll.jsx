import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BaseUrl, config } from '../../../constants';
import Toast from '../../../UIModules/Toast/Toast';
import axios from 'axios';

const PayRoll = () => {

    const [employees, setEmployees] = useState([]);
    const [showApproveSalaryModal, setShowApproveSalaryModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [empDetail, setEmpDetail] = useState({})
    const [empSal, setEmpSal] = useState('')
    const [incrementAmount, setIncrementAmount] = useState('');

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

    useEffect(() => {
        fetchData()
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

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Payroll Management</h2>
            {/* <button className="btn btn-primary mb-3" onClick={handleApproveAllClick}>
        Approve All Salaries
      </button> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Job Position</th>
                        <th>Basic Salary</th>
                        <th>Performance Score (%)</th>
                        <th>Bonus</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
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
                                {employee?.performanceScore === 100
                                    ? `${(employee.salary + (employee.salary * 0.02)).toString().slice(0, -3)} PKR`
                                    : `${(employee?.salary ? employee.salary.toString().slice(0, -3) : 'N/A')} PKR`}
                            </td>
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
