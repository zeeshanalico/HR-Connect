import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link as RouterLink, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../BasicStyle.css";
import "./LoginPage.css";
import axios from 'axios'
import { BaseUrl } from "../../constants";
import Toast from "../../UIModules/Toast/Toast";

export default function LoginPage({setter}) {

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(BaseUrl + "/checkAuth");

        if (response.data.success) {
          switch (response.data.role) {
            case 1:
              setter(1)
              navigate("/hrdash");
              break;

            case 2:
              setter(2)
              navigate("/empdash");
              break;

            default:
              break;
          }
        } else {
          console.log("Not logged in");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  axios.defaults.withCredentials = true;

  const [role_no, setRole] = useState(2)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee");
  const [loginFields, setLoginFields] = useState({
    usernameLabel: "Employee Email",
    passwordLabel: "Employee Password",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      `Logging in as ${userType} with username: ${username} and password: ${password}`
    );


      console.log("Employee Log : "+username, password)

      if (userType === 'employee') {
        setRole(2)
      }
      else {
        setRole(1)
      }

      const response = await axios.post(BaseUrl+'/loginUser', {email: username, password: password, role: role_no});

      console.log("Message : "+response.data.message);
      console.log("Token : "+response.data.token);

      if (response.data.success) {
        switch(userType) {
          case 'hr': 
            setter({emp: false, hr: true})
            navigate('/hrdash')
            break;
            
            case 'employee':
              setter({emp: true, hr: false})
              navigate('/empdash')
              break;

            default: 
              navigate('/')
        }
      }
      else {
        Toast("Not such a user exist")
      }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (type === "employee") {
      setLoginFields({
        usernameLabel: "Employee Email",
        passwordLabel: "Employee Password",
      });
    } else if (type === "hr") {
      setLoginFields({
        usernameLabel: "HR Email",
        passwordLabel: "HR Password",
      });
    }
  };

  return (
    <Wrapper id="wrapper">
      <RouterLink to="/">
        <i id="back-arrow" className="fa fa-arrow-left" aria-hidden="true"></i>
      </RouterLink>
      <LoginForm id="content" style={{ textAlign: "center" }}>
        <div>
          <h1 className="mb-4">Login</h1>
          <div>
            <ButtonGroup>
              <Button
                active={userType === "employee"}
                onClick={() => handleUserTypeChange("employee")}
              >
                Employee Login
              </Button>
              <Button
                active={userType === "hr"}
                onClick={() => handleUserTypeChange("hr")}
              >
                HR Login
              </Button>
            </ButtonGroup>
          </div>
          <form className="pt-3" onSubmit={handleLogin}>
            <FormGroup>
              <Label>{loginFields.usernameLabel}:</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>{loginFields.passwordLabel}:</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" >
              Log in
            </SubmitButton>

            {/* {userType === "hr" ? (
              <RouterLink to="/hrdash">
                <SubmitButton type="submit">Log In</SubmitButton>
              </RouterLink>
            ) : (
              <RouterLink to="/empdash">
                <SubmitButton type="submit">Log In</SubmitButton>
              </RouterLink>
            )} */}
          </form>
        </div>
      </LoginForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginForm = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e5e5e5")};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 94%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0056b3;
  }
`;
