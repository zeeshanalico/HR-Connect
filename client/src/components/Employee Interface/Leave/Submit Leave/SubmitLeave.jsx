import React, { useState, useEffect } from 'react';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl, config } from '../../../../constants';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default function SubmitLeave() {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        reason: '',
        reasonDetail: '',
    });
    const [leaveInfo, setLeaveInfo] = useState({});
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const todayDate = new Date().toISOString().split('T')[0];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOneLeaveChange = (e) => {
        const { name, value } = e.target;
        setLeaveInfo((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const handleLeave = async (att_status) => {
        try {
            console.log(att_status);
            console.log(leaveInfo);
                if (leaveInfo.leave_date && leaveInfo.reason) {
                if (leaveInfo.leave_date > todayDate) {
                    try {
                        const response = await axios.put(BaseUrl + "/oneDayLeaveRequest", { ...leaveInfo }, config);
                        if (response.data.success) {
                            Toast(`${response.data.message}`);
                        } else {
                            Toast(`${response.data.message}`, "error");
                            console.log(response.data.error);
                        }
                    } catch (error) {
                        Toast(`an error occured while Marking attendance: ${error}`, "error");
                    }
                    setShowLeaveModal(false);
                    setLeaveInfo({});
                } else {
                    Toast(`Please enter Date above than ${todayDate}`);
                }
            } else {
                Toast("Please mention both date and reason. ", "info");
            }
            setShowLeaveModal(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            formData.toDate &&
            formData.fromDate &&
            formData.reason.trim() !== ''
        ) {
            if (formData.fromDate > todayDate) {
                if (formData.toDate > formData.fromDate) {
                    try {
                        const data = {
                            leave_date: formData.fromDate,
                            toDate: formData.toDate,
                            reason: formData.reason,
                        };
                        const response = await axios.put(BaseUrl + '/leaverequest', data, config);
                        if (response.data.success) {
                            Toast(`${response.data.message}`);
                            setFormData({
                                fromDate: '',
                                toDate: '',
                                reason: '',
                            });
                        } else {
                            Toast(`${response.data.message}`, 'error');
                        }
                    } catch (error) {
                        Toast(
                            `An error occurred while marking attendance: ${error}`,
                            'error'
                        );
                    }
                    setFormData({});
                } else {
                    Toast(`Please enter a 'to Date' greater than 'from Date'`);
                }
            } else {
                Toast(
                    `Please enter a 'from Date' greater than today's date (${todayDate})`
                );
            }
        } else {
            Toast('Please fill in all the fields', 'info');
        }
    };

    return (
        <div id="full-content">
            <h2 className="mb-4">Submit Leave</h2>
            <div id="content">
                {/* Form for submitting leave for a specific date range */}
                <div className="mt-3">
                    <button
                        style={{ marginLeft: '80%' }}
                        className="btn btn-primary"
                        onClick={() => {
                            setShowLeaveModal(true);
                        }}
                    >
                        Apply for One Day Leave
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fromDate">From Date:</label>
                        <input
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="toDate">To Date:</label>
                        <input
                            type="date"
                            id="toDate"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Reason:</label>
                        <textarea
                            type="text"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>


                {/* One-day leave modal */}
                <Modal
                    show={showLeaveModal}
                    onHide={() => setShowLeaveModal(false)}
                    className="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Leave Application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I want leave for the date
                        <input
                            type="date"
                            name="leave_date"
                            onChange={handleOneLeaveChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                outline: 'none',
                            }}
                        />
                        <label>
                            Mention Reason here!
                            <input
                                type="textarea"
                                name="reason"
                                onChange={handleOneLeaveChange}
                                style={{
                                    width: '127%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    outline: 'none',
                                }}
                            />
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowLeaveModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleLeave('leave')}>
                            Sent
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
