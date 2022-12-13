import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Form, Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { modalActions } from "../../../store/modal/slice";
import styles from "./index.module.scss";

const LoginModal = () => {
  const { modalLogin } = useSelector((state) => state.modal);
  const { login, googleLogin, isLoading } = useAuth();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const clearFormLogin = () => {
    form.resetFields();
    dispatch(
      modalActions.setModalLogin({
        modalLogin: false,
      })
    );
  };

  const onFinish = async (values) => {
    await login({
      values,
      onSuccess: () => {
        message.success("Sign in successfully!");
        clearFormLogin();
      },
      onError: (err) => {
        const data = err.response.data;
        message.error(data.message);
      },
    });
  };

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const token = credentialResponse.access_token;
        await googleLogin({
          token,
          onSuccess: () => {
            message.success("Sign in successfully!");
            clearFormLogin();
          },
          onError: () => {
            message.error("Error!");
          },
        });
      } catch (err) {
        message.error("Error!");
      }
    },
  });

  const onCancel = () => {
    clearFormLogin();
  };

  return (
    <Modal
      title="Đăng nhập"
      open={modalLogin}
      onOk={() => {
        form.submit();
      }}
      okText="Login"
      onCancel={onCancel}
      confirmLoading={isLoading}
    >
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
      <div className={styles.divider}>or</div>
      <div className={styles.socialSignUp}>
        <div className={styles.item} onClick={() => onGoogleLogin()}>
          <span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_121)">
                <path
                  d="M7.09188 19.3378L5.978 23.4961L1.90681 23.5822C0.690125 21.3255 0 18.7436 0 15.9999C0 13.3467 0.64525 10.8447 1.789 8.6416H1.78988L5.41437 9.3061L7.00212 12.9089C6.66981 13.8777 6.48869 14.9177 6.48869 15.9999C6.48881 17.1743 6.70156 18.2997 7.09188 19.3378Z"
                  fill="#FBBB00"
                />
                <path
                  d="M31.7203 13.0107C31.904 13.9786 31.9998 14.9782 31.9998 15.9997C31.9998 17.1452 31.8794 18.2626 31.6499 19.3404C30.8711 23.0081 28.8359 26.2107 26.0166 28.4771L26.0157 28.4762L21.4504 28.2433L20.8043 24.2099C22.6751 23.1127 24.1371 21.3958 24.9072 19.3404H16.3516V13.0107H25.032H31.7203Z"
                  fill="#518EF8"
                />
                <path
                  d="M26.0162 28.4763L26.0171 28.4772C23.2752 30.6811 19.792 31.9998 16.0004 31.9998C9.90723 31.9998 4.60966 28.5941 1.90723 23.5823L7.09229 19.3379C8.44348 22.944 11.9222 25.5111 16.0004 25.5111C17.7533 25.5111 19.3956 25.0372 20.8048 24.21L26.0162 28.4763Z"
                  fill="#28B446"
                />
                <path
                  d="M26.2128 3.6835L21.0295 7.927C19.5711 7.01538 17.8471 6.48875 16.0001 6.48875C11.8295 6.48875 8.28575 9.17356 7.00225 12.909L1.78994 8.64175H1.78906C4.45194 3.50769 9.81631 0 16.0001 0C19.8822 0 23.4418 1.38287 26.2128 3.6835Z"
                  fill="#F14336"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_121">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          Login with Google
        </div>
      </div>
      <div className={styles.signUpBox}>
        {`Don't have an account?`} <Link to={"/signup"}>Sign up</Link>
      </div>
    </Modal>
  );
};

export default LoginModal;
