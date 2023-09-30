import * as Yup from 'yup';
const initialValues = {
    applicant_name: '',
    email: '',
    phone_number: '',
    cnic: '',
    city: '',
    github_profile_url: '',
    linkedin_profile_url: '',
    experience: '',
    cgpa: '',
    gender: '',
    address: '',
    zipcode: '',
    job_id: '', // You may set this to the job title if needed
    university: '',
    degree: '',
    major: '',
    desired_salary: '',
    dob: '',
    cv_file: '', // You may set this to null or an empty string if needed
};


const validationSchema = Yup.object().shape({
    applicant_name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_number: Yup.string()
        .matches(/^\d{11}$/, 'Phone number must be 11 digits')
        .required('Phone number is required'),
    cnic: Yup.string()
        .matches(/^\d{5}-\d{7}-\d{1}$/, 'Format : XXXXX-XXXXXXX-X')
        .required('CNIC is required'),
    city: Yup.string().required('City is required'),
    github_profile_url: Yup.string().url('Invalid GitHub URL format'),
    linkedin_profile_url: Yup.string().url('Invalid LinkedIn URL format'),
    experience: Yup.string().required('Experience is required'),
    cgpa: Yup.number()
        .typeError('CGPA must be a number')
        .min(0, 'CGPA cannot be negative')
        .max(4, 'CGPA cannot be greater than 4')
        .required('CGPA is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    zipcode: Yup.number()
        .typeError('Zip Code must be a number')
        .min(0, 'Zip Code cannot be negative')
        .required('Zip Code is required'),
    job_id: Yup.string().required('Job ID is required'),
    job_name: Yup.string(),
    university: Yup.string().required('University is required'),
    degree: Yup.string().required('Degree is required'),
    major: Yup.string().required('Major is required'),
    desired_salary: Yup.number()
        .typeError('Desired Salary must be a number')
        .min(0, 'Desired Salary cannot be negative')
        .required('Desired Salary is required'),
    dob: Yup.date()
        .max(new Date(), 'Date of Birth cannot be in the future')
        .required('Date of Birth is required'),
    cv_file: Yup.mixed()
        // .test('fileFormat', 'Only PDF files are allowed', (value) => {
        //     if (!value) return true; // No file selected is considered valid
        //     return value.type === 'application/pdf';
        // })
        // .required('CV/Resume is required'),
});

export { initialValues, validationSchema };
