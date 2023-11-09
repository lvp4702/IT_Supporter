import Login from './Login';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const loginModule: Modules = {
  routeProps: {
    key: 'login',
    path: 'login',
  },
  component: Login,
};

export default loginModule;
