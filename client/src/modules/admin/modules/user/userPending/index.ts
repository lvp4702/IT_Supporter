import UserPending from './UserPending';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const userPendingModule: Modules = {
  routeProps: {
    key: 'user-pending',
    path: 'user-pending',
  },
  component: UserPending,
};

export default userPendingModule;
