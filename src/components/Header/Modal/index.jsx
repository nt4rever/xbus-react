import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../apis/user";
import { authActions } from "../../../store/auth/slice";
import { modalActions } from "../../../store/modal/slice";

const LoginModal = () => {
  const { modalLogin } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = async () => {
    const { username, password } = form.getFieldsValue([
      "username",
      "password",
    ]);

    const user = await getUser(username);
    if (user) {
      if (user.password === password) {
        form.resetFields();
        dispatch(
          authActions.login({
            isLogged: true,
            user,
          })
        );
        dispatch(
          modalActions.setModalLogin({
            modalLogin: false,
          })
        );
      } else message.error("Tên người dùng hoặc mật khẩu không đúng!");
    } else message.error("Tên người dùng không tồn tại!");
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
