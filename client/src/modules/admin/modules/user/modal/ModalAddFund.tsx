import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface props {
  isOpen: boolean;
  handleCancel: () => void;
  onSave: (id: any, key: any, cb: () => void) => void;
  user: any;
}

const ModalAddFund = ({ isOpen, handleCancel, onSave, user }: props) => {
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    setKeyword('')
  }, [isOpen])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <Modal
      title="Tiền quỹ"
      open={isOpen}
      onOk={() => onSave(user?.id, keyword, () => setKeyword(''))}
      onCancel={handleCancel}
    >
      <div>Số tiền: </div>
      <Input placeholder="Nhập số tiền" onChange={onChange} value={keyword} />
    </Modal>
  );
};

export default ModalAddFund;
