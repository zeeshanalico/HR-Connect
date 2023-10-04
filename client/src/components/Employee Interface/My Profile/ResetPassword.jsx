import React from "react";
import { useState } from "react";
import { Field, Formik, Form } from "formik";
import { object, string, ref } from "yup";
import styles from "./ResetPassword.module.css"; // Import your CSS module
import axios from "axios";
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { BaseUrl, config } from "../../../constants";
import Toast from "../../../UIModules/Toast/Toast";

const ResetPassword = () => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const getCharacterValidationError = (str) => {
        return `Your password must have at least 1 ${str} character`;
    };

    const passwordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        currentPassword: Yup.string()
            .required('Please Enter Current Password'),
        // password: Yup.string()
        //     .required("Please enter a password")
        //     .min(8, "Password must have at least 8 characters")
        //     .matches(/[0-9]/, getCharacterValidationError("digit"))
        //     .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        //     .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
        password: Yup.string()
            .required("Please enter a password")
            .min(8, "Password must have at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
            ),
        confirmPassword: Yup.string()
            .required("Please re-type your password")
            .oneOf([ref("password")], "Passwords do not match"),
    });

    return (
        <Formik
            initialValues={{ email: "", currentPassword: "", password: "", confirmPassword: "" }}
            onSubmit={async (values, { resetForm }) => {
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
                    <Form className={`${styles.container} `} style={{ position: 'relative' }}>
                        <h3 style={{ margin: '0 auto -30px auto ', }}>Reset Password</h3>
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
                            type={showNewPassword ? "text" : "password"}

                            placeholder='New Password'
                            className={`${styles.input} ${styles.pasin} input input-bordered`}
                        />
                        <span className={styles.passpan} style={{ top: '262px' }} onClick={toggleNewPasswordVisibility}>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {touched.password && errors.password && (
                            <p className={styles["text-error"]}>{errors.password}</p>
                        )}
                        <Field
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${styles.input} ${styles.pasin} input input-bordered`}
                        />
                        <span style={{ top: '343px' }} className={styles.passpan} onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
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
