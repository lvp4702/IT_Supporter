import { Tabs } from 'antd';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { valueRole } from 'src/modules/admin/constant/roleUser';
import LayoutFull from '../../../components/LayoutFull';
import PostApprover from './PostApprover';
import PostPending from './PostPending';

const NewManager = () => {
  const { user } = useContext(AuthContext);

  const isRoleValid = () =>
    user?.role === valueRole.ADMIN ||
    user?.role === valueRole.CADRES ||
    user?.role === valueRole.COLLABORATOR;

  return isRoleValid() ? (
    <>
      <LayoutFull>
        <Tabs
          className="py-[20px] "
          defaultActiveKey="1"
          type="card"
          size="large"
          items={[
            {
              label: 'Đã duyệt',
              key: '1',
              children: <PostApprover />,
            },
            {
              label: 'Chưa duyệt',
              key: '2',
              children: <PostPending />,
            },
          ]}
        />
      </LayoutFull>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default NewManager;
