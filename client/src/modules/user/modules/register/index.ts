import Register from './Register';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const registerModule: Modules = {
  routeProps: {
    key: 'register',
    path: 'register',
  },
  component: Register,
};

export default registerModule;
