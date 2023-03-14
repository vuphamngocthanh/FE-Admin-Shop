import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal,Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.PNG"



const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");

  const onSubmit = (values) => {
    setLoading(true);
    axios.post('http://localhost:8080/auth/login', values)
      .then((response) => {
        console.log(response);
        setToken(response.data.accessToken);
        console.log(token);
        localStorage.setItem('accessToken', response.data.accessToken);
       navigate('/home');
      }
      )
      .catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Login failed',
          content: 'Your login credentials are incorrect. Please try again.',
        });
      });
  };
  

  return (
    <Form
      style={{ maxWidth: 400,
        margin: 'auto',
        marginTop: '5%',
        padding: 20,
        border: 1, 
        borderStyle: 'groove',
        height: 'auto'
      }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
    ><div style={{ display: 'flex', justifyContent: 'center', alignItems: "center"}}>
              <img
                alt="logo GMS"
                src={logo}
                style={{ marginBottom: 20, borderRadius:20}}
                width={150}
              />
              </div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a style={{'float': 'right', color: "rgb(28, 28, 52)", fontWeight: 'bold', textDecoration: "underline"}} className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
        <Form.Item>
              <Button
                loading={loading}
                style={{width: '100%', backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} type="primary" htmlType="submit" className="login-form-button "
              >
                Sign in
              </Button>
            </Form.Item>
        <Form.Item style={{textAlign:'center'}}>
        <p style={{color: "rgb(28, 28, 52)", fontWeight: 'bold', textDecoration: "underline"}}>Fresh Stars @2023</p>
        </Form.Item>
    </Form>

  );
};
export default LoginForm;


