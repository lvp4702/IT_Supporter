import { useState, useContext, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';

import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { categoryApis, postApis } from 'src/apis/admin';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/authContext/AuthContext';

export default function FormCreate() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState<any>();
  const [formType, setFormType] = useState<'create' | 'update'>('create');
  const postIdRef = useRef<string>('0');
  const postTypeRef = useRef(false);

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const res = await categoryApis.findAll();
      setCategories(res.data?.data || []);

      // check if have id
      const query = new URLSearchParams(search);
      const postId = query.get('id');
      const postType = query.get('type');
      if (postType) postTypeRef.current = true;

      if (postId) {
        postIdRef.current = postId;
        setFormType('update');
        const postRes = await postApis.findOne(+postId);
        const data = postRes.data?.data || {};

        form.setFieldsValue(data);
        setContent(JSON.parse(data.content));
      }
    })();
  }, [form, search]);

  const handleSubmit = async (data: any) => {
    try {
      if (!user.id) navigate('/login');

      if (!content.blocks || content.blocks.filter((item: any) => item.text).length === 0) {
        toast.error('Hãy nhập nội dung bài đăng!');
        return;
      }

      const formData = new FormData();
      formData.append('content', JSON.stringify(content));

      Object.keys(data).forEach((item) => {
        if (item === 'image' && data[item]?.fileList?.[0])
          formData.append(item, data[item].fileList[0].originFileObj);
        else formData.append(item, data[item]);
      });

      if (postTypeRef.current) {
        formData.append('type', '1');
      } else {
        formData.append('type', '0');
      }

      if (formType === 'create') {
        formData.append('author', user.id);
        await postApis.create(formData);
        toast.success('Tạo thành công');
      } else {
        await postApis.update(formData, +postIdRef.current);
        toast.success('Sửa thành công');
      }

      if (postTypeRef.current) {
        navigate('/admin/event-manager');
      } else {
        navigate('/admin/news-manager');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

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

        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          Submit
        </Button>
      </div>

      <Form labelAlign="left" form={form} onFinish={handleSubmit} layout="vertical">
        <Row>
          <Col span={6}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="category"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Select>
                {categories?.map((item: any) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div>
          <p>
            <span style={{ color: 'red' }}>*</span> Nội dung:
          </p>
          {formType === 'create' ? (
            <Editor
              wrapperClassName="rich-editor demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={setContent}
            />
          ) : (
            content && (
              <Editor
                wrapperClassName="rich-editor demo-wrapper"
                editorClassName="demo-editor"
                onContentStateChange={setContent}
                initialContentState={content}
              />
            )
          )}
        </div>
      </Form>
    </div>
  );
}
