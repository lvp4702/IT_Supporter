import React, { useState, useEffect } from 'react';
import LayoutFullUser from '../../component/layout';
import type { ColumnsType } from 'antd/es/table';
import { Input, Table } from 'antd';
import { roleUser } from 'src/modules/admin/constant/roleUser';
import { replace, searchMember, setAvatar } from 'src/common/utils';
import { getAllUserApprove } from 'src/apis/admin';

interface DataType {
  key: React.Key;
  name: React.ReactNode;
  age: number;
  phone: any;
  valueRole: any;
  formatCreated_at: any;
}

const UserPage = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchDataUser = async () => {
    try {
      const res = await getAllUserApprove();
      if (res) setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const resultSearchUser = () => {
    return data.filter((item: any) => searchMember(replace(item.fullName), replace(keyword)));
  };

  const columns: ColumnsType<DataType> = [
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
      key: '2',
      width: 150,
    },
    {
      title: 'Vai trò',
      dataIndex: 'valueRole',
      key: '2',
      width: 150,
    },
    {
      title: 'Ngành',
      dataIndex: 'majorName',
      key: '2',
      width: 150,
    },
  ];
  const returnContentTable = () => {
    const newArray: any = [];
    resultSearchUser().map((item: any) => {
      const created_at = item?.created_at;
      if (item.role !== 'r1')
        newArray.push({
          ...item,
          key: item.id,
          name: (
            <div className="flex items-center gap-[12px]">
              <img
                src={setAvatar(item.avatar)}
                alt=""
                className="w-[36px] h-[36px] rounded-full object-cover"
              />
              <div>{item.fullName}</div>
            </div>
          ),
          valueRole: roleUser[item.role],
          majorName: item?.major?.name,
          major: item?.major?.id,
          formatCreated_at: created_at ? new Date(created_at)?.toLocaleDateString('en-US') : '',
        });
    });

    return newArray;
  };
  return (
    <LayoutFullUser>
      <div className="mx-[20%] pt-[20px]">
        <Input
          placeholder="Nhập tên thành viên"
          className="w-[25%] mb-[20px]"
          onChange={handleSearchUser}
        />
        <div className="min-h-[500px]">
          <Table columns={columns} dataSource={returnContentTable()} />
        </div>
      </div>
    </LayoutFullUser>
  );
};

export default UserPage;
