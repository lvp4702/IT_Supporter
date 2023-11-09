import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  RollbackOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'src/atoms/icon';

const NewDetail = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Button
          // type="primary"
          shape="round"
          icon={<RollbackOutlined />}
          size="middle"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="px-[21%]">
        <div className="p-4 pb-5">
          <h2 className="block text-2xl font-semibold text-gray-700 font-roboto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iddo loremque, totam
            architecto odit pariatur Lorem ips dolor.
          </h2>
          <div className="mt-2 flex space-x-4">
            <div className="flex text-gray-400 text-sm items-center">
              <Icon name="user-pending" width={14} className="mr-[10px]" />
              Blogging Tips
            </div>
            <div className="flex text-gray-400 text-sm items-center">
              <Icon name="time" width={14} className="mr-[10px]" />
              June 11, 2021
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et sunt saepe
            accusamus eum ex sint est neque provident tempore, minus laborum repudiandae vitae
            temporibus nesciunt, sed enim quo harum a id, alias maiores! Incidunt iusto minus
            explicabo itaque iure recusandae
          </p>

          <p className="bg-green-50 border border-green-500 p-3 text-sm  mt-5">
            <span className="text-xl mr-1 text-gray-400">
              <i className="fas fa-quote-left"></i>
            </span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus blanditiis earum
            nam, quisquam magnam aut odio aliquam inventore quibusdam mollitia! Alias, mollitia
            eveniet iure quidem natus quis assumenda consectetur beatae. Lorem, ipsum dolor
            quibusdam.
            <span className="text-xl ml-1 text-gray-400">
              <i className="fas fa-quote-right"></i>
            </span>
          </p>

          <p className="text-gray-500 text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et sunt saepe
            accusamus eum ex sint est neque provident tempore, minus laborum repudiandae vitae
            temporibus nesciunt, sed enim quo harum a id, alias maiores! Incidunt iusto minus
            explicabo itaque iure recusandae
          </p>

          <ul className="mt-6 pl-5  space-y-2">
            <li className="text-sm">
              <span className="mr-1">
                <i className="fas fa-angle-right"></i>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.
            </li>
            <li className="text-sm">
              <span className="mr-1">
                <i className="fas fa-angle-right"></i>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.
            </li>
            <li className="text-sm">
              <span className="mr-1">
                <i className="fas fa-angle-right"></i>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.
            </li>
            <li className="text-sm">
              <span className="mr-1">
                <i className="fas fa-angle-right"></i>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.
            </li>
          </ul>

          <p className="text-gray-500 text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et sunt saepe
            accusamus eum ex sint est neque provident tempore, minus laborum repudiandae vitae
            temporibus nesciunt, sed enim quo harum a id, alias maiores! Incidunt iusto minus
            explicabo itaque iure recusandae
          </p>

          <p className="text-gray-500 text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis et sunt saepe
            accusamus eum ex sint est neque provident tempore, minus laborum repudiandae vitae
            temporibus nesciunt, sed enim quo harum a id, alias maiores! Incidunt iusto minus
            explicabo itaque iure recusandae
          </p>

          <div className="mt-5 pt-5 border-t border-gray-200 flex gap-2">
            <Button icon={<FacebookOutlined />} />
            <Button icon={<TwitterOutlined />} />
            <Button icon={<InstagramOutlined />} />
            <Button icon={<LinkedinOutlined />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetail;
