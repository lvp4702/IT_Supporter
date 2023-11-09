import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { replace, searchMember } from 'src/common/utils';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { valueRole } from 'src/modules/admin/constant/roleUser';
import { approveUser, getAllUserPending } from '../../../../../apis/admin';
import avatar from '../../../../../atoms/images/anh nen.png';
import LayoutFull from '../../../components/LayoutFull';
import { getMajor } from '../../../constant/majorUser';

interface DataType {
  key: React.Key;
  name: React.ReactNode;
  age: number;
  address: string;
}

const UserPending = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchDataUser = async () => {
    try {
      const res = await getAllUserPending();
      if (res) setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approve = async (id: any) => {
    try {
      const res = await approveUser(id);
      if (res) {
        fetchDataUser();
        toast.success('Duyệt tài khoản thành công');
      }
    } catch (error) {
      toast.success('Duyệt tài khoản thất bại');
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      width: 20,
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
    },
    {
      title: 'Họ và tên',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Tên tài khoản',
      width: 100,
      dataIndex: 'username',
      key: 'username',
      fixed: 'left',
    },
    {
      title: 'Khóa',
      dataIndex: 'age',
      key: 'age',
      width: 150,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: '2',
      width: 150,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'formatCreated_at',
      key: 'created_at',
      width: 150,
    },
    {
      title: 'Ngành',
      dataIndex: 'major',
      key: '2',
      width: 150,
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (item) => (
        <div className="flex gap-[12px]">
          <Tooltip title="Duyệt">
            <Button
              shape="circle"
              icon={<CheckCircleOutlined />}
              onClick={() => approve(item.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const returnContentTable = () => {
    const newArray: any = [];
    resultSearchUser().map((item: any, index: number) => {
      newArray.push({
        ...item,
        index: index + 1,
        key: item.id,
        name: (
          <div className="flex items-center gap-[12px]">
            <img src={avatar} alt="" className="w-[36px] h-[36px] rounded-full object-cover" />
            <div>{item.fullName}</div>
          </div>
        ),
        username: item.username,
        age: item.age,
        phone: item.phone,
        formatCreated_at: item.created_at
          ? new Date(item.created_at)?.toLocaleDateString('en-US')
          : '',
        major: item.major.name,
      });
    });

    return newArray;
  };

  const isRoleValid = () => user?.role === valueRole.ADMIN || user?.role === valueRole.CADRES;

  const resultSearchUser = () => {
    return data.filter((item: any) => searchMember(replace(item.fullName), replace(keyword)));
  };
  return isRoleValid() ? (
    <LayoutFull>
      <div className="mx-[16px] my-[8px]">
        <div className="w-full flex justify-between mb-[10px] " style={{ height: '40px' }}>
          <Input
            placeholder="Nhập tên thành viên"
            className="w-[25%] "
            onChange={handleSearchUser}
          />
          ;
        </div>
        <div className="h-[500px]">
          <Table columns={columns} dataSource={returnContentTable()} />
        </div>
      </div>
    </LayoutFull>
  ) : (
    <Navigate replace to="/" />
  );
};

export default UserPending;
