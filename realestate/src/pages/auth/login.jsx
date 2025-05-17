// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/login.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [role, setRole] = React.useState('admin');

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      // Make sure your backend expects the payload in this format
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: username,
        password: password,
        role: role.toUpperCase(), 
      });

      if (response.data) { 
        localStorage.setItem('username', username); // Saving username to localStorage
        // Navigating based on the role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'agent') {
          navigate('/agent-dashboard');
        } else if (role === 'client') {
          navigate('/client-dashboard');
        }
      } else {
        message.error('Login failed. Please try again.', error);
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid username, password, or role.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 className="title">Login</h2>
        
        <Form.Item
          label="Role"
          name="role"
          wrapperCol={{ offset: 8, span: 16 }}
          className='op'
        >
          <Radio.Group onChange={onRoleChange} value={role}>
            <Radio value="admin">Admin</Radio>
            <Radio value="agent">Agent</Radio>
            <Radio value="client">Client</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          className="user"
          rules={[{ required: true, message: 'Please input your username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="sub">
            Login
          </Button>
          <Button type="link" onClick={() => navigate('/signup')} className="sub">
            Sign Up
          </Button>

          <Button type="link" onClick={() => navigate('/forgot-password')} className="sub">
            Forgot Password?
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
