import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Toast from '../../UIModules/Toast/Toast';
import { BaseUrl } from '../../constants';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import hrconnect from "../../assets/img/HR_Connect.jpg.jpg"
import './LoginPage.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // Import withRouter
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Typography from 'antd/es/typography/Typography';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(BaseUrl + '/login', formData);
      if (response.data.success) {
        console.log(response.data);
        const jwtToken = response.data.token;
        localStorage.clear();
        localStorage.setItem('jwtToken', jwtToken);

        if (response.data.role_id === 1) {
          setTimeout(() => {
            navigate('/hrdash',{state:{roleId:response.data.role_id}});
            window.location.reload()
          }, 500);
          console.log(response.data.role_id);
          Toast(`${response.data.message} as HR`, 'success')
        }
        else if (response.data.role_id === 2) {
          setTimeout(() => {
            navigate('/empdash',{state:{roleId:response.data.role_id}});
            window.location.reload()
          }, 500);
          Toast(`${response.data.message} as Employee`, 'success')

        }
      } else {
        // Toast(`${response.data.message}`, 'error')
        console.log(`${response.data.message}`, 'error')
      }
      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error);
      Toast('Login error:', "error");
    }
  };

  return (
    <Container className='justify-content-center align-items-center d-flex whiteBg loginbg'>
      <RouterLink to="/">
        <i id="back-arrow" style={{ position: 'absolute', color: 'white', top: '35px', left: '40px', }} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      <Row className="w-100 justify-content-center align-items-center login-container">
        <Col md={6}>
          <div className="login-form">
          <img src={hrconnect} alt="logo" height={100} width={100}  className="font20 mb-4 extraBold" />
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="user_email">
                <Form.Label ><h3 className='form-text-y mb-2'>Username</h3></Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  placeholder='Enter Username or Email here!'
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className={'password-input'} controlId="user_password">
              <Form.Label ><h3 className='form-text-y mb-2 mt-4'>Password</h3></Form.Label>

                <Form.Control
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  // style={{position: "relative"}}
                  style={{paddingRight:'30px'}}
                  name="user_password"
                  placeholder='Enter Password here!'
                  value={formData.user_password}
                  onChange={handleInputChange}
                  required
                />
                <span className='spanPass' style={{paddingBottom: '15px'}} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>
              <Button className="mt-2" variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
