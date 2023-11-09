import UserPage from './UserPage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const userPageModules: Modules = {
  routeProps: {
    key: '/user',
    path: '/user',
  },
  component: UserPage,
};

export default userPageModules;
