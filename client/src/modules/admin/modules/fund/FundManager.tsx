import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Tooltip } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from 'src/context/authContext/AuthContext';
import LayoutFull from '../../components/LayoutFull';
import { valueRole } from '../../constant/roleUser';
import type { ColumnsType } from 'antd/es/table';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fundApis, getAllMajor, getAllUserApprove } from 'src/apis/admin';
import { replace, searchMember } from 'src/common/utils';
import confirm from 'antd/lib/modal/confirm';
interface DataType {
  id: React.Key;
  name: React.ReactNode;
  major: any;
}
const FundManager = () => {
  const { user } = useContext(AuthContext);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [majorEdit, setMajorEdit] = useState<any>({});
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  useEffect(() => {
    console.log({ majorEdit });
    formEdit.setFieldsValue(majorEdit);
  }, [majorEdit]);

  const fetchAllMajors = async () => {
    try {
      const res = await fundApis.findAll();
      if (res) {
        setData(res.data.data);
      }
    } catch (error) {
      toast.error('Kết nối bị lỗi');
    }
  };

  const fetchDataUser = async () => {
    try {
      const res = await getAllUserApprove();
      if (res) setDataUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMajors();
    fetchDataUser();
  }, []);

  const totalMoney = () => {
    const totalPaid = data
      .filter((item: any) => item.totalPaid)
      .reduce((total: number, item: any) => total + Number(item.totalPaid), 0);
    console.log({ totalPaid });
    return (
      dataUser
        .filter((item: any) => item.fund)
        .reduce((total: number, item: any) => total + Number(item.fund), 0) - totalPaid
    );
  };

  const showModal = () => {
    setIsOpenModalAdd(true);
  };

  const handleSearchMajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleOk = () => {
    setIsOpenModalAdd(false);
  };

  const handleCancel = () => {
    setIsOpenModalAdd(false);
  };

  const resultSearchMajor = () => {
    return data.filter((item: any) => searchMember(replace(item.event), replace(keyword)));
  };

  const returnContentTable = () => {
    const newArray: any = [];
    resultSearchMajor().map((item: any, index: number) => {
      newArray.push({
        ...item,
        index: index + 1,
        key: item.id,
        event: item.event,
        totalPaidTable: Number(item.totalPaid).toLocaleString('vi-VN'),
      });
    });

    return newArray;
  };

  const handleAddMajor = async () => {
    try {
      const res = await fundApis.create(form.getFieldsValue());
      if (res) {
        toast.success('Thêm chi tiêu thành công');
        fetchAllMajors();
        handleOk();
      }
    } catch (error) {
      toast.error('Thêm chi tiêu thất bại');
    }
  };

  const handleEditMajor = async () => {
    try {
      const res = await fundApis.update(formEdit.getFieldsValue(), majorEdit.id);
      if (res) {
        toast.success('Sửa thành công');
        fetchAllMajors();
        setIsOpenModalEdit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Sửa thất bại');
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      width: '10%',
      dataIndex: 'index',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'Tên khoản chi tiêu',
      dataIndex: 'event',
      key: 'event',
      fixed: 'left',
    },
    {
      title: 'Số tiền (VNĐ)',
      dataIndex: 'totalPaidTable',
      key: 'totalPaid',
      fixed: 'left',
    },

    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '10%',
      render: (item) => {
        return (
          <div className="flex gap-[12px]">
            <Tooltip title="Sửa">
              <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsOpenModalEdit(true);
                  setMajorEdit(item);
                }}
              />
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <Button
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => {
                  setIsOpenModalDetail(true);
                  setMajorEdit(item);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const isRoleValid = () => user?.role === valueRole.ADMIN || user?.role === valueRole.CADRES;
  return isRoleValid() ? (
    <>
      <LayoutFull>
        <div className="mx-[16px] my-[8px]">
          <div className="w-full flex justify-between mb-[10px]">
            <Input
              placeholder="Nhập tên chi tiêu"
              className="w-[25%]"
              onChange={handleSearchMajor}
            />
            ;
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => showModal()}>
              Thêm chi tiêu
            </Button>
          </div>
          <div className="text-right font-[700] leading-[20px] text-[18px] py-[20px]">
            Tổng tiền: {totalMoney().toLocaleString('vi-VN')} VNĐ
          </div>
          <div className="h-[500px]">
            <Table columns={columns} dataSource={returnContentTable()} />
          </div>
        </div>
      </LayoutFull>
      <Modal
        title="Thêm chi tiêu"
        open={isOpenModalAdd}
        onOk={() => {
          handleAddMajor();
        }}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} labelAlign="left" form={form}>
          <Form.Item label="Tên sự kiện" name="event">
            <Input />
          </Form.Item>
          <Form.Item label="Số tiền" name="totalPaid">
            <Input />
          </Form.Item>
          <Form.Item name="desc" label="Chi tiết">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa sự kiện"
        open={isOpenModalEdit}
        onOk={() => {
          handleEditMajor();
        }}
        onCancel={() => setIsOpenModalEdit(false)}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} labelAlign="left" form={formEdit}>
          <Form.Item label="Tên sự kiện" name="event">
            <Input />
          </Form.Item>
          <Form.Item label="Số tiền" name="totalPaid">
            <Input />
          </Form.Item>
          <Form.Item name="desc" label="Chi tiết">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xem chi tiết"
        open={isOpenModalDetail}
        onOk={() => setIsOpenModalDetail(false)}
        onCancel={() => setIsOpenModalDetail(false)}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} labelAlign="left" form={formEdit}>
          <Form.Item name="desc" label="Chi tiết">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default FundManager;
