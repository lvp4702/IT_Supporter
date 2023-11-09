import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApis } from 'src/apis/admin';
import { replace, searchMember } from 'src/common/utils';
import Item from '../Item';

const PostApprover = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postSelected, setPostSelected] = useState<number>(0);

  const [postTypeFilter, setPostTypeFilter] = useState<any>(0);

  useEffect(() => {
    if (reload) {
      (async () => {
        const postRes = await postApis.findAll();
        setPosts(postRes.data?.data || []);
      })();

      setReload(false);
    }
  }, [reload]);

  const resultSearchUser = () => {
    return posts.filter(
      (item: any) =>
        searchMember(replace(item.author.fullName), replace(keyword)) &&
        (postTypeFilter === 0 || item.author.role === postTypeFilter)
    );
  };

  const onChange = (e: number) => {
    setPostSelected(e);
  };

  const handleDelete = async (id: number) => {
    await postApis.remove(id);
    setReload(true);
  };

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <div>
      <div className="mx-[16px] mt-[10px]">
        <div className="w-full flex justify-between mb-[10px]">
          <div className="flex items-center">
            <Input
              placeholder="Nhập tên tác giả cần tìm kiếm"
              className="w-[200px]"
              onChange={handleSearchUser}
            />

            <div className="mx-4 flex items-center">
              <span>Bài viết: </span>

              <Select
                className="w-[120px] ml-2"
                defaultValue={postTypeFilter}
                onChange={(value: number) => setPostTypeFilter(value)}
              >
                {[
                  { id: 0, name: 'Tất cả' },
                  { id: 'r4', name: 'Thành viên' },
                ].map((item: any) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate('/admin/form-create')}
          >
            Tạo tin tức
          </Button>
        </div>
      </div>
      {postSelected !== 0 && (
        <div className="flex gap-[12px] items-center mx-[16px] my-[12px]">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/new-detail?id=${postSelected}`)}
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/form-create?id=${postSelected}`)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: <Button>Bạn có muốn xóa bài đăng này?</Button>,
                onOk() {
                  handleDelete(+postSelected);
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }}
          >
            Gỡ xuất bản
          </Button>
        </div>
      )}
      {resultSearchUser()?.map((item: any, index) => (
        <Item
          index={index}
          data={item}
          isChecked={postSelected}
          onCheck={() => onChange(item.id)}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default PostApprover;
