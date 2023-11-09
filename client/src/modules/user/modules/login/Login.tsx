import { Button, Form, Input } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { login } from 'src/context/authContext/apiCall';
import { AuthContext } from 'src/context/authContext/AuthContext';
import image from '../../../../atoms/images/background.png';
import logo from '../../../../atoms/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { valueRole } from 'src/modules/admin/constant/roleUser';

const Login = () => {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  //

  const onFinish = async (values: any) => {
    await login(values, dispatch, (user) => {
      if (user.role === valueRole.ADMIN) navigate('/admin/user-approve');
      else navigate('/');
    });
  };

  return (
    <div className="flex items-center w-[100vw] h-[100vh] relative">
      <div className="w-[50vw] flex flex-col items-center ">
        <Link to="/" className="w-[120px] mb-10">
          <img src={logo} alt="" className="w-[120px] absolute top-[20vh]" />
        </Link>
        <div className="font-[700] text-[32px] text-[#333333] mb-[20px] mt-20">Đăng nhập</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="w-[50%] px-[40px]"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            labelAlign="left"
            rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            labelAlign="left"
            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="text-right">
            <Button htmlType="submit">Đăng nhập</Button>
          </Form.Item>
        </Form>
        <div className="flex gap-[12px] items-center">
          <div className="font-[500] text-[16px]">Bạn chưa có tài khoản?</div>
          <Link to="/register" className="font-[500] text-[16px]">
            Đăng ký
          </Link>
        </div>
      </div>
      <div className="flex-1 h-[100vh]">
        <img src={image} alt="" className="flex-1 object-cover w-full h-full " />
      </div>
    </div>
  );
};

export default Login;
