import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "../../../apis/auth/login";
import { authActions } from "../../../store/auth/slice";
import { modalActions } from "../../../store/modal/slice";

const LoginModal = () => {
  const { modalLogin } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "top",
    });
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    loginService(values)
      .then((res) => {
        if (res.status === 200) {
          const { access_token, user } = res.data;
          dispatch(
            authActions.login({
              isLogged: true,
              user,
              access_token,
            })
          );
          dispatch(
            modalActions.setModalLogin({
              modalLogin: false,
            })
          );
          form.resetFields();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        const data = err.response.data;
        openNotification(data.message);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(
      modalActions.setModalLogin({
        modalLogin: false,
      })
    );
  };

  return (
    <Modal
      title="Đăng nhập"
      open={modalLogin}
      onOk={handleOk}
      okText="Login"
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      {contextHolder}

      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              message: "Password length between 6 to 16 character!",
              min: 6,
              max: 16,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
