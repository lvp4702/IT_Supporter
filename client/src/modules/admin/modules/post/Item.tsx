import React, { useState } from 'react';
import Icon from '../../../../atoms/icon';
import moment from 'moment';
import { setAvatar } from 'src/common/utils';

interface props {
  data: any;
  isChecked: number;
  onCheck: () => void;
  value: number;
  index: number;
}

const Item = ({ data, isChecked, onCheck, value, index }: props) => {
  return (
    <div
      className={`flex items-center justify-between px-[16px] bg-white hover:bg-[#E5F9FF] py-[8px] border-b-[1px] ${
        index === 0 ? 'border-t-[1px]' : 'border-t-0'
      } border-l-0 border-r-0 border-solid border-[#CAD8E6] cursor-pointer`}
      onClick={onCheck}
    >
      <div className="flex items-center">
        <div className="mr-[8px] flex items-center">
          {isChecked === value ? <Icon name="checked" /> : <Icon name="unChecked" />}
        </div>
        <img
          src={setAvatar(data.image)}
          alt=""
          className="w-[50px] h-[50px] object-cover m-[0_16px_0_0]"
        />
        <div>
          <div className="text-[16px] font-[700] text-[#333333] ">{data.title}</div>
          <div className="flex gap-[8px] m-[4px_0_0_0]">
            <p className="m-0 text-[#9F9F9F] text-[12px] font-[400]">Đăng bởi:</p>
            <p className="m-0 text-[#9F9F9F] text-[12px] font-[700]">{data?.author?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[#00aded] font-[700] text-[16px] leading-[18px]">
          {data.category.name}
        </div>
        <div className="flex gap-[8px] m-[4px_0_0_0]">
          <p className="m-0 text-[#9F9F9F] text-[12px] font-[400]">Đăng lúc:</p>
          <p className="m-0 text-[#9F9F9F] text-[12px] font-[700]">
            {moment(data.created_at).format('DD/MM/YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
