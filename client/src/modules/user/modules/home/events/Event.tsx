import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../../atoms/icon';

interface props {
  events: any;
}

const Event = ({ events }: props) => {
  return (
    <>
      <div className="flex justify-between items-center border-b-[1px] border-t-0 border-l-0 border-r-0 border-solid border-[#CAD8E6]">
        <div className="uppercase font-[400] text-[25px] leading-[52px] text-[#024da1] border-b-[2px] border-t-0 border-l-0 border-r-0 border-solid border-[#024da1] pr-[20px]">
          Sự kiện
        </div>
        <Link
          to="/events"
          className="text-[14px] leading-[16px] text-[#939597] hover:text-[#333333]"
        >
          Xem thêm {'>>'}
        </Link>
      </div>
      {events.map(
        (item: any, index: number) =>
          index < 5 && (
            <div className="pt-[20px] bg-white">
              <Link
                to={`/${item.id}`}
                className="flex group p-[10px] hover:bg-[#E5F9FF] border-t-0 border-l-0 border-r-0 border-solid border-[#CAD8E6] border-b-[1px]"
              >
                <div className="flex-shrink-0">
                  <img
                    src={`${process.env.REACT_APP_DOMAIN}/${item?.image}`}
                    className="h-[80px] w-[80px] rounded object-cover"
                  />
                </div>
                <div className="flex-grow pl-3">
                  <h5 className="text-[18px] pt-[10px] leading-5 block font-roboto font-semibold transition group-hover:text-[#2EA2C7]">
                    {item?.title}
                  </h5>
                  <div className="flex text-gray-400 text-sm items-center">
                    <span className="mr-1 text-xs">
                      <Icon name="time" width={14} />
                    </span>
                    {new Date(item?.created_at)?.toLocaleDateString('en-US')}
                  </div>
                </div>
              </Link>
            </div>
          )
      )}
    </>
  );
};

export default Event;
