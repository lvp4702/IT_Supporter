import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApis } from 'src/apis/admin';
import { replace, searchMember } from 'src/common/utils';
import LayoutFull from '../../../components/LayoutFull';
import Item from '../Item';

const EventManager = () => {
  const navigate = useNavigate();

  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postSelected, setPostSelected] = useState<number>(0);
  const [keyword, setKeyword] = useState('');

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (reload) {
      (async () => {
        const postRes = await postApis.findAll({ type: '1' });
        setPosts(postRes.data?.data || []);
      })();

      setReload(false);
    }
  }, [reload]);

  const onChange = (e: number) => {
    setPostSelected(e);
  };

  const handleDelete = async (id: number) => {
    await postApis.remove(id);
    setReload(true);
  };

  const resultSearchUser = () => {
    return posts.filter((item: any) =>
      searchMember(replace(item.author.fullName), replace(keyword))
    );
  };

  return (
    <>
      <LayoutFull>
        <div className="mx-[16px] mt-[10px]">
          <div className="w-full flex justify-between mb-[10px]">
            <Input
              placeholder="Nhập tên tác giả cần tìm kiếm"
              className="w-[25%]"
              onChange={handleSearchUser}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate('/admin/form-create?type=1')}
            >
              Tạo sự kiện
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
              onClick={() => navigate(`/admin/form-create?id=${postSelected}&type=1`)}
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
        {resultSearchUser()?.map((item: any, index: number) => (
          <Item
            data={item}
            isChecked={postSelected}
            onCheck={() => onChange(item.id)}
            value={item.id}
            index={index}
          />
        ))}
      </LayoutFull>
    </>
  );
};

export default EventManager;
