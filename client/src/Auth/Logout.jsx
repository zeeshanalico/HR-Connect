import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiCallGet } from '../CoreModule/ApiCall';
import {Loading} from './../UIModules/Loading/Loading.jsx'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            const result = await ApiCallGet('/logout');
            if (result.error) {
                navigate('/error');
            } else if (result.status === 201) {
                navigate('/login-oric');
            } else {
                navigate('/');
            }
        };
        logout();
    }, [navigate]);

    return (
        <>
            <Loading />
        </>
    );
}

export default Logout;
