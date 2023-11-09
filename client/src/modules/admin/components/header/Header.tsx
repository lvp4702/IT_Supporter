import React, { useContext, useState } from 'react';
import logo from '../../../../atoms/images/logo.png';
import Icon from '../../../../atoms/icon';
import avatar from '../../../../atoms/images/anh nen.png';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { logout } from 'src/context/authContext/apiCall';
import { setAvatar } from 'src/common/utils';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [openDropDown, setOpenDropdown] = useState<boolean>(false);
  const handleOpenDroDown = () => setOpenDropdown(!openDropDown);
  const configDropDown = [
    {
      value: 0,
      icon: 'log-out',
      label: 'Thoát',
      onClick: async () => {
        await logout(dispatch);
        navigate('/');
      },
    },
  ];
  return (
    <div className="flex justify-between items-center bg-[#ffffff] pl-[12px] pr-[24px] shadow-lg relative z-10">
      <div className="flex items-center gap-2 py-[12px]">
        <img src={logo} alt="" className="h-[32px] object-cover" />
        <p className="text-orange-500 font-bold text-xl m-0">IT Supporter</p>
      </div>
      <div
        className="group flex items-center gap-[14px] cursor-pointer relative hover:bg-[#ecebeb] py-[4px] px-[8px] rounded-[8px]"
        onClick={handleOpenDroDown}
      >
        <img
          src={setAvatar(user?.avatar)}
          alt=""
          className="w-[36px] h-[36px] rounded-full object-cover "
        />
        <div className="font-[700] text-[16px] leading-[18px] text-[#333333]">{user?.fullName}</div>
        <Icon name="arrow-drop-down" width={12} />
        {openDropDown && (
          <div className="absolute -bottom-[0px] left-0 translate-y-[100%] z-20 bg-[#ffffff] w-full shadow-xl rounded-[8px] overflow-hidden ">
            {configDropDown.map((item) => (
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
    </div>
  );
};

export default Header;
