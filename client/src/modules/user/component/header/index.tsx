import { Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../../../atoms/images/bg-header.png';
import Icon from '../../../../atoms/icon';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { setAvatar } from 'src/common/utils';
import { logout } from 'src/context/authContext/apiCall';
import { valueRole } from 'src/modules/admin/constant/roleUser';

const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin, dispatch } = useContext(AuthContext);
  const [openDropDown, setOpenDropdown] = useState<boolean>(false);
  const handleOpenDroDown = () => setOpenDropdown(!openDropDown);
  console.log({ isLogin });
  const configDropDown = () => {
    let arr = [
      {
        value: 1,
        icon: 'log-out',
        label: 'Thoát',
        onClick: async () => {
          await logout(dispatch);
          navigate('/');
        },
      },
    ];

    if (user.role === valueRole.CADRES)
      return [
        {
          value: 0,
          icon: 'slide',
          label: 'Trang quản lý',
          onClick: async () => {
            navigate('/admin/user-approve');
          },
        },
        ...arr,
      ];
    if (user.role === valueRole.COLLABORATOR)
      return [
        {
          value: 0,
          icon: 'slide',
          label: 'Trang quản lý',
          onClick: async () => {
            navigate('/admin/news-manager');
          },
        },
        ...arr,
      ];
    return arr;
  };

  const listMenu = [
    {
      value: 0,
      text: 'Giới thiệu',
      link: '/about-us',
      display: true,
    },
    {
      value: 1,
      text: 'Tin tức',
      link: '/news',
      display: true,
    },
    {
      value: 2,
      text: 'Sự kiện',
      link: '/events',
      display: true,
    },
    {
      value: 3,
      text: 'Thành viên',
      link: '/user',
      // display: user,
      display: true,
    },
    {
      value: 4,
      text: 'Tạo bài viết',
      link: '/create-news',
      display: isLogin,
      // display: true,
    },
  ];
  return (
    <div className="relative">
      <img src={logo} alt="" className="w-[100%] h-[130px] object-cover" />
      <div className="absolute top-0 right-[20%] ">
        {!isLogin ? (
          <div className="flex gap-[10px] items-center mt-[0.4vw]">
            <Avatar size="small" icon={<UserOutlined />} className="xl:block hidden" />
            <Link to="/login" className="font-[700] text-[0.8vw] text-[#663399]">
              Đăng nhập
            </Link>
            <span className="font-[700] text-[0.8vw]">/</span>
            <Link to="/register" className="font-[700] text-[0.8vw] text-[#663399]">
              Đăng ký
            </Link>
          </div>
        ) : (
          <div
            className="group flex items-center gap-[14px] cursor-pointer relative hover:bg-[#ecebeb] py-[4px] px-[8px] rounded-[8px]"
            onClick={handleOpenDroDown}
          >
            <img
              src={setAvatar(user?.avatar)}
              alt=""
              className="w-[36px] h-[36px] rounded-full object-cover "
            />
            <div className="font-[700] text-[16px] leading-[18px] text-[#333333]">
              {user?.fullName}
            </div>
            <Icon name="arrow-drop-down" width={12} />
            {openDropDown && (
              <div className="absolute -bottom-[0px] left-0 translate-y-[100%] z-20 bg-[#ffffff] w-full shadow-xl rounded-[8px] overflow-hidden ">
                {configDropDown().map((item) => (
                  <div
                    className="group flex items-center gap-[8px] hover:bg-[#E5F9FF] w-full py-[8px] px-[12px]"
                    onClick={item.onClick}
                    key={item.value}
                  >
                    <Icon name={item.icon} width={12} />
                    <div className="text-[#616161] text-[16px] leading-[20px] font-[400] group-hover:text-[#2EA2C7]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bg-[#0c4ca3]">
        <div className="flex ml-[18%]">
          <Link
            to="/"
            className="h-[50px] flex items-center border-r border-t-[0] border-b-0 border-l-0 border-solid border-[#ffffff] last:border-r-0 pr-[20px]"
          >
            <Button shape="circle" icon={<HomeOutlined />} />
          </Link>
          {listMenu.map(
            (item) =>
              item.display && (
                <Link
                  key={item.value}
                  to={item.link}
                  className="h-[50px] flex items-center px-[20px] text-[#ffffff] uppercase font-[500] text-[16px] cursor-pointer hover:bg-[#0b4492] border-r border-t-[0] border-b-0 border-l-0 border-solid border-[#ffffff] last:border-r-0"
                >
                  {item.text}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
