import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApis } from 'src/apis/admin';
import { replace, searchMember } from 'src/common/utils';
import Item from '../Item';

const PostPending = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postSelected, setPostSelected] = useState<number>(0);

  const fetchNewPostPending = () => {
    if (reload) {
      (async () => {
        const postRes = await postApis.findAllPending();
        setPosts(postRes.data?.data || []);
      })();

      setReload(false);
    }
  };

  useEffect(() => {
    fetchNewPostPending();
  }, [reload]);

  const resultSearchUser = () => {
    return posts.filter((item: any) =>
      searchMember(replace(item.author.fullName), replace(keyword))
    );
  };

  const approverPost = async () => {
    try {
      const res = await postApis.approveNews(postSelected);
      if (res) {
        fetchNewPostPending();
        toast.success('Duyệt tin tức thành công');
      }
    } catch (error) {
      toast.success('Duyệt tin tức thất bại');
    }
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
          <Input
            placeholder="Nhập tên tác giả cần tìm kiếm"
            className="w-[25%]"
            onChange={handleSearchUser}
          />
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
          <Button icon={<EditOutlined />} onClick={approverPost}>
            Duyệt
          </Button>
          {/* <Button
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
          </Button> */}
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

export default PostPending;
