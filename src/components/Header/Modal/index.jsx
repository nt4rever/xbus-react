import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/slice";
import { modalActions } from "../../../store/modal/slice";

const LoginModal = () => {
  const { modalLogin } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    // const value = form.getFieldsValue(["username", "password"]);
    dispatch(
      authActions.login({
        isLogged: true,
        user: {
          name: "tan",
        },
      })
    );
    dispatch(
      modalActions.setModalLogin({
        modalLogin: false,
      })
    );
  };

  const handleCancel = () => {
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
      onCancel={handleCancel}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
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
