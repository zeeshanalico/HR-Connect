import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../../constants';
import { Button } from 'react-bootstrap';
import Toast from '../../../../UIModules/Toast/Toast';
function ViewResume(props) {
    const [pdfUrl, setPdfUrl] = useState('');
    
    const handleDownloadClick = async () => {
        try {
            console.log(props.application_id,props.applicant_name);
            console.log(BaseUrl + '/pdf');
            const response = await axios.post(BaseUrl+ "/pdf",{ responseType: 'blob',application_id:props.application_id,applicant_name:props.applicant_name,job_id:props.job_id});
            if (response.status === 200) {
                const pdfBlob = response.data;
                const pdfObjectURL = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfObjectURL);
            } else {
                Toast('Failed to fetch PDF','error');
            }
        } catch (error) {
            Toast(`${error.message}`,'error');
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <Button
                variant="link"
                onClick={handleDownloadClick}
            >
                Download Resume
            </Button>
            {pdfUrl && <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />}
        </div>
    );
}

export default ViewResume;
