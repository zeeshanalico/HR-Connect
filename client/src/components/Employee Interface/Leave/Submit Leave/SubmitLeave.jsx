import { useState, useEffect } from 'react';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl, config } from '../../../../constants';
import Cookies from 'js-cookie';

import axios from 'axios'

export default function SubmitLeave() {
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        reason: '',
        reasonDetail: '',
    });
    const todayDate = new Date().toISOString().split('T')[0];
    console.log(todayDate);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the current date in the format 'YYYY-MM-DD'

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
                            toDate:formData.toDate,
                            reason: formData.reason,
                        };
                        const response = await axios.put(BaseUrl + "/leaverequest", data, config);
                        if (response.data.success) {
                            Toast(`${response.data.message}`);
                            setFormData({
                                fromDate: '',
                                toDate: '',
                                reason: '',
                            });
                        } else {
                            Toast(`${response.data.message}`, "error");
                        }
                    } catch (error) {
                        Toast(`An error occurred while marking attendance: ${error}`, "error");
                    }
                    setFormData({});
                } else {
                    Toast(`Please enter a 'to Date' greater than 'from Date'`);
                }
            } else {
                Toast(`Please enter a 'from Date' greater than today's date (${todayDate})`);
            }
        } else {
            Toast("Please fill in all the fields", "info");
        }

    };
    return (
        <div id="full-content">
            <h2 className="mb-4">Submit Leave</h2>
            <div id="content">
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
            </div>
        </div>
    );
}
