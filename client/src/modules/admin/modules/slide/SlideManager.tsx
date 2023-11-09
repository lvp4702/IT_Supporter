import { useState, useEffect, useContext } from 'react';

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Image, Modal, Row, Tooltip } from 'antd';
import LayoutFull from '../../components/LayoutFull';
import FormUpload from './FormUpload';
import { slideApis } from 'src/apis/admin';
import { toast } from 'react-toastify';
import { valueRole } from '../../constant/roleUser';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { Navigate } from 'react-router-dom';

export default function SlideManager() {
  const { user } = useContext(AuthContext);
  const [slides, setSlides] = useState([]);
  const [reload, setReload] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isFormCreate, setIsFormCreate] = useState<true | number>(true);

  const handleSave = () => {};

  useEffect(() => {
    if (reload) {
      (async () => {
        const { data } = await slideApis.findAll();
        setSlides(data.data || []);
      })();

      setReload(false);
    }
  }, [reload]);

  const handleUpload = async (formData: any) => {
    try {
      if (isFormCreate === true) {
        await slideApis.create(formData);
      } else {
        await Promise.all([await slideApis.remove(isFormCreate), await slideApis.create(formData)]);
      }

      setIsShowModal(false);
      setReload(true);
      toast.success('Thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  const isRoleValid = () => user?.role === valueRole.ADMIN || user?.role === valueRole.CADRES;

  return isRoleValid() ? (
    <LayoutFull>
      <div className="mx-[16px] my-[8px] overflow-hidden">
        <Button
          className="mb-4"
          type="primary"
          onClick={() => {
            setIsShowModal(true);
            setIsFormCreate(true);
          }}
        >
          Thêm slide
        </Button>

        <Row gutter={[16, 16]}>
          {slides.map((item: any) => (
            <Col span={8}>
              <div className="">
                <Image className="w-full" src={`${process.env.REACT_APP_DOMAIN}/${item.image}`} />

                <div className="mt-2 flex justify-center gap-4">
                  <Tooltip title="Sửa">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setIsShowModal(true);
                        setIsFormCreate(+item.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <Button
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          icon: <ExclamationCircleOutlined />,
                          content: 'Bạn có muốn xóa?',
                          async onOk() {
                            try {
                              await slideApis.remove(item.id);

                              setReload(true);
                              toast.success('Thành công!');
                            } catch (error) {
                              toast.error('Có lỗi xảy ra!');
                            }
                          },
                        });
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <FormUpload
        isOpen={isShowModal}
        handleCancel={() => setIsShowModal(false)}
        onSave={handleSave}
        onSubmit={handleUpload}
      />
    </LayoutFull>
  ) : (
    <Navigate replace to="/" />
  );
}
