import React, { useState, useEffect } from 'react';
import { BaseUrl } from '../../constants';
import axios from 'axios'
import Toast from '../../UIModules/Toast/Toast';

const RegistrationPage = () => {

    const [roles, setRoles] = useState([])
    const [formData, setFormData] = useState({});


useEffect(() => {
    ((async () => {
        try {
            const response = await axios.get(BaseUrl + '/getRoles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles :', error);
            throw error;
        }
    })())
}, [])


const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role' && value === '--select--') {
        Toast('Please Select role', 'info')
    }
    setFormData({ ...formData, [name]: value, });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // try {
    //     const response = await axios.post(BaseUrl + '/RegisterUser', formData)
    //     if (response.data.success) {
    //         Toast(`${response.data.message}`)
    //     } else {
    //         Toast(`${response.data.message}`)
    //     }
    // } catch (error) {
    //         Toast(`catch Error`);
    // console.log(error)

    // }
};

return (
    <div id="full-content" style={{ width: '500px' }} className="container mt-4">
        <h2 className="mb-4">Register User</h2>
        <form onSubmit={handleSubmit} id='content'>
        <div className="form-group">
                <select
                    name="role_id"
                    id='role_id'
                    className="form-control"
                    value={formData.role_id}
                    onChange={handleChange}
                >
                    <option value='--select--'  style={{color:'grey'}}>Select Role</option>
                    {roles.map((role) => {
                        return <option value={role.role_id}>{role.role_name}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <input
                    type="number"
                    inputmode="numeric"
                    id="emp_id"
                    placeholder='Employee ID'
                    name="emp_id"
                    className="form-control"
                    value={formData.emp_id}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    placeholder='Username'
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    placeholder='Password'
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
           
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
    </div>
);
};

export default RegistrationPage;
