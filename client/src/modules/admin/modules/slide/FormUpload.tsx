import { useState, useEffect } from 'react';
import { Form, Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { slideApis } from 'src/apis/admin';

interface props {
  isOpen: boolean;
  handleCancel: () => void;
  onSave: (formData: any) => void;
  onSubmit: (data: any) => void;
}

const FormUpload = ({ isOpen, handleCancel, onSubmit }: props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('image', values.image?.fileList[0]?.originFileObj);

    onSubmit(formData);
    handleCancel();
  };

  useEffect(() => {
    form.resetFields();
    setFileList([]);
  }, [isOpen]);

  return (
    <Modal
      width={360}
      title="Upload ảnh"
      open={isOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="image"
          name="image"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Upload listType="picture-card" onChange={({ fileList }) => setFileList(fileList)}>
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormUpload;
