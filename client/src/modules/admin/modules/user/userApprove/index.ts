import UserApprove from './UserApprove';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const userApproveModule: Modules = {
  routeProps: {
    key: 'user-approve',
    path: 'user-approve',
  },
  component: UserApprove,
};

export default userApproveModule;
