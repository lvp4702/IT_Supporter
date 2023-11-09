import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApis } from 'src/apis/admin';
import Icon from 'src/atoms/icon';
import LayoutFullUser from '../../component/layout';

export default function DetailPage() {
  let { id } = useParams();
  const [post, setPost] = useState<any>();
  const [listPosts, setListPosts] = useState<any[]>([]);
  const [mainContent, setMainContent] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const postRes = await postApis.findOne(Number(id));
        setPost(postRes.data.data);
        const content = JSON.parse(postRes.data?.data?.content);
        setMainContent(content);
      } catch (error) {
        console.log(error);
        toast.error('kết nối lỗi');
      }
    })();
    (async () => {
      try {
        const postRes = await postApis.findAll();
        setListPosts(postRes.data.data);
      } catch (error) {
        console.log(error);
        toast.error('kết nối lỗi');
      }
    })();
  }, []);

  const renderSeeMoreNews = () => {
    let arr = [];
  };

  return (
    <LayoutFullUser>
      <div className="mx-[20%] py-[20px]">
        <div className="rounded-sm overflow-hidden bg-white shadow-sm">
          <div className="">
            <img
              src={`${process.env.REACT_APP_DOMAIN}/${post?.image}`}
              className="w-full h-96 object-cover p-[20px]"
            />
          </div>
          <div className="p-4 pb-5">
            <h2 className="block text-2xl font-semibold text-gray-700 font-roboto">
              {post?.title}
            </h2>
            <div className="mt-2 flex space-x-4">
              <div className="flex text-gray-400 text-sm items-center">
                <Icon name="user-pending" width={14} className="mr-[10px]" />
                {post?.author?.username}
              </div>
              <div className="flex text-gray-400 text-sm items-center">
                <Icon name="time" width={14} className="mr-[10px]" />
                {new Date(post?.created_at)?.toLocaleDateString('en-US')}
              </div>
            </div>

            {mainContent && (
              <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                initialContentState={mainContent}
                readOnly
                toolbarHidden
              />
            )}

            <div className="mt-5 pt-5 border-t border-gray-200 flex gap-2">
              <Button icon={<FacebookOutlined />} />
              <Button icon={<TwitterOutlined />} />
              <Button icon={<InstagramOutlined />} />
              <Button icon={<LinkedinOutlined />} />
            </div>
          </div>
        </div>
        <div className="flex bg-white px-3 py-2 justify-between items-center rounded-sm mt-8">
          <h5 className="text-base uppercase font-semibold font-roboto">Tin Tức</h5>
          <Link
            to="/news"
            className="text-white py-1 px-3 rounded-sm uppercase text-sm bg-blue-500 border border-blue-500 hover:text-blue-500 hover:bg-transparent transition"
          >
            Xem thêm
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {listPosts.map(
            (item) =>
              item.id !== Number(id) && (
                <div className="rounded-sm bg-white p-3 pb-5 shadow-sm">
                  <Link to={`/news/${item.id}`} className="block rounded-md overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_DOMAIN}/${item?.image}`}
                      className="w-full h-40 object-cover transform hover:scale-110 transition duration-500"
                    />
                  </Link>
                  <div className="mt-3">
                    <Link to={`/news/${item.id}`}>
                      <h2 className="block text-base font-semibold text-gray-700 hover:text-blue-500 transition font-roboto">
                        {item.title}
                      </h2>
                    </Link>
                    <div className="mt-2 flex space-x-3">
                      <div className="flex text-gray-400 text-xs items-center">
                        <Icon name="user-pending" width={14} className="mr-[10px]" />
                        {item?.author?.username}
                      </div>
                      <div className="flex text-gray-400 text-xs items-center">
                        <Icon name="time" width={14} className="mr-[10px]" />
                        {new Date(item?.created_at)?.toLocaleDateString('en-US')}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </LayoutFullUser>
  );
}
