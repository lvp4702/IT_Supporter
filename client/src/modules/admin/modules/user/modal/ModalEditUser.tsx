import { Form, Input, Modal, Select, Upload } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { roleUser } from '../../../constant/roleUser';
import { setAvatar } from 'src/common/utils';

const KHOA = ['k10', 'k11', 'k12', 'k13', 'k14', 'k15', 'k16', 'k17'];
interface props {
  isOpen: boolean;
  handleCancel: () => void;
  user: any;
  handleEditUser: (form: any, id: any) => void;
  listMajors: any;
  listDepartments: any;
}

const ModalEditUser = ({
  isOpen,
  handleCancel,
  user,
  handleEditUser,
  listMajors,
  listDepartments,
}: props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <Modal
      title="Sửa thông tin thành viên"
      open={isOpen}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <div className="flex justify-between bg-white items-center p-[12px] border border-solid border-[#CAD8E6] rounded-[4px] mb-[16px] px-[16px]">
        <div className="flex items-center">
          <img
            src={setAvatar(user?.avatar)}
            alt=""
            className="h-[60px] w-[60px] rounded-full mr-[12px] object-cover"
          />
          <div>
            <p className="font-[700] text-[16px] leading-[18px] uppercase text-[#333333] mb-0">
              {user?.fullName}
            </p>
            <div className="flex font-[400] text-[12px] leading-[14px] text-[#797979] mt-[8px] mb-0">
              <p className="m-[0_5px_0_0]">Ngày tạo</p>
              <p>12/12/2022</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="font-[400] text-[14px] leading-[16px] text-[#797979]">Vai trò</p>
          <p className={`font-[400] text-[14px] leading-[16px] mt-[8px] text-[#208B33]`}>
            {roleUser[user?.role]}
          </p>
        </div>
      </div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        className="px-[20px]"
        form={form}
        onFinish={() => handleEditUser(form, user.id)}
      >
        <Form.Item label="Họ và tên" name="fullName">
          <Input />
        </Form.Item>
        <Form.Item label="Tên tài khoản" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone" labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item
          label="Khóa"
          name="age"
          labelAlign="left"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Select>
            {KHOA?.map((item: any) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngành học"
          name="major"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Select>
            {listMajors.current.map((item: any) => (
              <Select.Option value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Thuộc ban"
          name="department"
          rules={[{ required: true, message: 'Không được để trống!' }]}
        >
          <Select>
            {listDepartments.map((item: any) => (
              <Select.Option value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Vai trò" name="role">
          <Select>
            <Select.Option value="r1">{roleUser.r1}</Select.Option>
            <Select.Option value="r2">{roleUser.r2}</Select.Option>
            <Select.Option value="r3">{roleUser.r3}</Select.Option>
            <Select.Option value="r4">{roleUser.r4}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Avatar" name="avatar">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;
