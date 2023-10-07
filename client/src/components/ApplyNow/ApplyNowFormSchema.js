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
    job_id: '',
    dep_id: '',
    qualification: '',
    university: '',
    degree: '',
    desired_salary: '',
    dob: '',
    cv_file: '', // You may set this to null or an empty string if needed
};


const validationSchema = Yup.object().shape({
    applicant_name: Yup.string()
        .matches(/^[A-Za-z ]+$/, 'In Name Only alphabets are allowed')
        .required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_number: Yup.string()
        .matches(/^[0-9]{10,11}$/, 'Phone number must be 11 or 12 digits')
        .required('Phone number is required'),
    cnic: Yup.string()
        .matches(/^\d{5}-\d{7}-\d{1}$/, 'Format : XXXXX-XXXXXXX-X')
        .required('CNIC is required'),
    city: Yup.string().required('City is required'),
    github_profile_url: Yup.string()
        .matches(/(github\.com)/, 'Invalid GitHub URL format, it must contain ".com"')
        .url('Invalid GitHub URL format'),
    linkedin_profile_url: Yup.string()
        .matches(/(linkedin\.com)/, 'Invalid LinkedIn URL format, it must contain ".com"')
        .url('Invalid LinkedIn URL format'),
    experience: Yup.string().required('Experience is required'),
    // cgpa: Yup.number()
    //     .typeError('CGPA must be a number')
    //     .min(0, 'CGPA cannot be negative')
    //     .max(4, 'CGPA cannot be greater than 4')
    //     .required('CGPA is required'),
    cgpa: Yup.number()
        .typeError('CGPA must be a number')
        .min(0, 'CGPA cannot be negative')
        .max(4, 'CGPA cannot be greater than 4')
        .test('is-four-digits', 'CGPA must have maximun 4 digits e.g. 2.34', (value) => {
            if (value === undefined || value === null) {
                return true;
            }
            const cgpaString = value.toString();
            return cgpaString.length <= 4;
        })
        .required('CGPA is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string()
        .matches(/[a-zA-Z]/, 'Address must contain alphabetic characters')
        .required('Address is required'),
    zipcode: Yup.string()
        .required("Zipcode is required")
        .matches(/^\d{5}$/, "Zip must be 5 digits"),
    job_id: Yup.string().required('Job ID is required'),
    job_name: Yup.string(),
    university: Yup.string()
        .matches(/^[A-Za-z\s]{1,50}$/, 'University can only contain alphabets and have a max length of 50 characters')
        .required('University is required'),
    qualification: Yup.string()
        .required('Qualification is required'),
    degree: Yup.string()
        .required('Degree is required'),
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
