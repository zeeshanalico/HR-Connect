import React, { useState, useEffect } from 'react';
import Toast from '../../UIModules/Toast/Toast';
import { BaseUrl } from '../../constants';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './LoginPage.css'; // Import your custom CSS
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // Import withRouter

const LoginPage = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

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
            navigate('/hrdash');
            window.location.reload()
          }, 500);
          console.log(response.data.role_id);
          Toast(`${response.data.message} as HR`, 'success')
        }
        else if (response.data.role_id === 2) {
          setTimeout(() => {
            navigate('/empdash');
            window.location.reload()
          }, 500);
          Toast(`${response.data.message} as Employee`, 'success')
         
        }
      } else {
        Toast(`${response.data.message}`, 'error')
      }
      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error);
      Toast('Login error:', "error");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="login-form">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="user_email">
                <Form.Label>Username :</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  placeholder='Please Enter Username or Email here!'
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="user_password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="user_password"
                  placeholder='Please Enter Password here!'
                  value={formData.user_password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
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
