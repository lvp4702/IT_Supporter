import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { toast } from 'react-toastify';
import { categoryApis, postApis } from 'src/apis/admin';
import { AuthContext } from 'src/context/authContext/AuthContext';
import LayoutFullUser from '../../component/layout';

const CreateNewsPage = () => {
  const [form] = Form.useForm();
  const postTypeRef = useRef(false);
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState<any>();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await categoryApis.findAll();
      setCategories(res.data?.data || []);

      // check if have id
    })();
  }, [form]);

  const handleSubmit = async (data: any) => {
    try {
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

      formData.append('author', user.id);
      await postApis.create(formData);
      toast.success('Tạo thành công');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };
  return (
    <LayoutFullUser>
      <div className=" px-[20%] py-[20px]">
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

            <Editor
              wrapperClassName="rich-editor demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={setContent}
            />
          </div>
        </Form>
        <div className="text-right mt-[20px]">
          <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
            Tạo bài
          </Button>
        </div>
      </div>
    </LayoutFullUser>
  );
};

export default CreateNewsPage;
