import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import { connect } from "react-redux";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    // login(username, password)
    //   .then((data) => {
    //     message.success("登录成功");
    //     handleUserInfo(data.token);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     message.error(error);
    //   });

    message.success("登录成功");
    props.history.push('/familyManagement/index');
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {

      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    setLoading(true);
    message.success("登录成功");
    props.history.push('/familyManagement/index');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // if (token) {
  //   return <Redirect to="/dashboard" />;
  // }
  return (
    <div className="login-container">
      <Form
        className="content"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="title">
          <h2>用户登录</h2>
        </div>
        <Spin spinning={loading} tip="登录中...">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              prefix={
                <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Spin>
      </Form>
    </div>
  );
};

// const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(Login);
