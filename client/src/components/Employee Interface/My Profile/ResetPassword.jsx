import React from "react";
import { Field, Formik, Form } from "formik";
import { object, string, ref } from "yup";
import styles from "./ResetPassword.module.css"; // Import your CSS module
import axios from "axios";
import * as Yup from 'yup';
import { BaseUrl, config } from "../../../constants";
import Toast from "../../../UIModules/Toast/Toast";

const ResetPassword = () => {
    const getCharacterValidationError = (str) => {
        return `Your password must have at least 1 ${str} character`;
    };

    const passwordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        currentPassword: Yup.string()
            .required('Please Enter Current Password'),
        password: Yup.string()
            .required("Please enter a password")
            .min(8, "Password must have at least 8 characters")
            .matches(/[0-9]/, getCharacterValidationError("digit"))
            .matches(/[a-z]/, getCharacterValidationError("lowercase"))
            .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
        confirmPassword: Yup.string()
            .required("Please re-type your password")
            .oneOf([ref("password")], "Passwords do not match"),
    });

    return (
        <Formik
            initialValues={{ email: "", currentPassword: "", password: "", confirmPassword: "" }}
            onSubmit={async (values,{resetForm}) => {
                console.log(values);
                try {
                    const response = await axios.post(BaseUrl + '/resetPassword', values, config);
                    Toast(`${response.data.message}`);
                } catch (error) {
                    console.error(error)
                }
            }}
            validationSchema={passwordSchema}
            validateOnChange={false} // Disable validation on change
            validateOnBlur={true}    // Enable validation on blur
        >
            {({ errors, setFieldTouched, touched }) => {
                return (
                    <Form className={styles.container}>
                        <h3 style={{margin:'0 auto -30px auto ',}}>Reset Password</h3>
                        <Field
                            style={{ marginTop: '20px' }}
                            name="email"
                            placeholder='Enter Email'
                            className={`${styles.input} input input-bordered`}
                        />
                        {touched.email && errors.email && (
                            <p className={styles["text-error"]}>{errors.email}</p>
                        )}
                        <Field
                            name="currentPassword"
                            placeholder='Current Password'
                            className={`${styles.input} input input-bordered`}
                        />
                        {touched.currentPassword && errors.currentPassword && (
                            <p className={styles["text-error"]}>{errors.currentPassword}</p>
                        )}
                        <Field
                            name="password"
                            placeholder='New Password'
                            className={`${styles.input} input input-bordered`}
                        />
                        {touched.password && errors.password && (
                            <p className={styles["text-error"]}>{errors.password}</p>
                        )}
                        <Field
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            className={`${styles.input} input input-bordered`}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className={styles["text-error"]}>{errors.confirmPassword}</p>
                        )}
                        <button type="submit" className={`${styles.btn} btn btn-accent`}>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ResetPassword;
