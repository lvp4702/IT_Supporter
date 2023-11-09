import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  RollbackOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApis } from 'src/apis/admin';
import Icon from 'src/atoms/icon';

const NewDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<any>();
  const postId = window.location.href.split('id=')[1];
  const [mainContent, setMainContent] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const postRes = await postApis.findOne(+postId);
        setPost(postRes.data.data);
        const content = JSON.parse(postRes.data?.data?.content);
        setMainContent(content);
      } catch (error) {
        console.log(error);
        toast.error('kết nối lỗi');
      }
    })();
  }, []);
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
          <h2 className="block text-2xl font-semibold text-gray-700 font-roboto">{post?.title}</h2>
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
    </div>
  );
};

export default NewDetail;
