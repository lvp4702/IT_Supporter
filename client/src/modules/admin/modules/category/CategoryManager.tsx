import { Button, Input, Tooltip, Modal, Table, Select, Upload, Form } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import type { ColumnsType } from 'antd/es/table';
import LayoutFull from '../../components/LayoutFull';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  addMajor,
  categoryApis,
  deleteMajor,
  editMajor,
  getAllMajor,
} from '../../../../apis/admin';
import { toast } from 'react-toastify';
import { replace, searchMember } from 'src/common/utils';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { valueRole } from '../../constant/roleUser';
import { Navigate } from 'react-router-dom';
interface DataType {
  id: React.Key;
  name: React.ReactNode;
  major: any;
}

const CategoryManager = () => {
  const { user } = useContext(AuthContext);
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [majorEdit, setMajorEdit] = useState<any>({});
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const destroyAll = () => {
    Modal.destroyAll();
  };

  const showModal = () => {
    setIsOpenModalAdd(true);
  };

  const handleOk = () => {
    setIsOpenModalAdd(false);
  };

  const handleCancel = () => {
    setIsOpenModalAdd(false);
  };

  useEffect(() => {
    formEdit.setFieldsValue(majorEdit);
  }, [majorEdit]);

  const fetchAllMajors = async () => {
    try {
      const res = await categoryApis.findAll();
      if (res) {
        setData(res.data.data);
      }
    } catch (error) {
      toast.error('Kết nối bị lỗi');
    }
  };

  useEffect(() => {
    fetchAllMajors();
  }, []);

  const resultSearchMajor = () => {
    return data.filter((item: any) => searchMember(replace(item.name), replace(keyword)));
  };

  const returnContentTable = () => {
    const newArray: any = [];
    resultSearchMajor().map((item: any, index: number) => {
      newArray.push({
        ...item,
        index: index + 1,
        key: item.id,
      });
    });

    return newArray;
  };

  const handleSearchMajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleAddMajor = async () => {
    try {
      const res = await categoryApis.create(form.getFieldsValue());
      if (res) {
        toast.success('Thêm thể loại thành công');
        fetchAllMajors();
        handleOk();
      }
    } catch (error) {
      toast.error('Thêm thể loại thất bại');
    }
  };

  const handleDeleteMajor = async (id: any) => {
    try {
      const res = await categoryApis.remove(id);
      if (res) {
        toast.success('Xóa thể loại thành công');
        setData(data.filter((item: any) => item.id !== id));
      }
    } catch (error) {
      toast.error('Xóa thể loại thất bại');
    }
  };

  const handleEditMajor = async () => {
    try {
      const res = await categoryApis.update(formEdit.getFieldsValue(), majorEdit.id);
      if (res) {
        toast.success('Sửa thành công');
        fetchAllMajors();
        setIsOpenModalEdit(false);
      }
    } catch (error) {
      toast.error('Sửa thành công');
    }
  };

  const isRoleValid = () => user?.role === valueRole.ADMIN || user?.role === valueRole.CADRES;

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      width: '10%',
      dataIndex: 'index',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'Tên thể loại',
      dataIndex: 'name',
      key: 'major',
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
            <Tooltip title="Xóa">
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  confirm({
                    icon: <ExclamationCircleOutlined />,
                    content: <Button onClick={destroyAll}>Bạn có muốn xóa thể loại này?</Button>,
                    onOk() {
                      handleDeleteMajor(item.id);
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return isRoleValid() ? (
    <>
      <LayoutFull>
        <div className="mx-[16px] my-[8px]">
          <div className="w-full flex justify-between mb-[10px]">
            <Input placeholder="Nhập tên ngành" className="w-[25%]" onChange={handleSearchMajor} />;
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => showModal()}>
              Thêm thể loại
            </Button>
          </div>
          <div className="h-[500px]">
            <Table columns={columns} dataSource={returnContentTable()} />
          </div>
        </div>
      </LayoutFull>
      <Modal
        title="Thêm chuyên ngành"
        open={isOpenModalAdd}
        onOk={() => {
          handleAddMajor();
        }}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} labelAlign="left" form={form}>
          <Form.Item label="Tên chuyên ngành" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa chuyên ngành"
        open={isOpenModalEdit}
        onOk={() => {
          handleEditMajor();
        }}
        onCancel={() => setIsOpenModalEdit(false)}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} labelAlign="left" form={formEdit}>
          <Form.Item label="Tên chuyên ngành" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default CategoryManager;
