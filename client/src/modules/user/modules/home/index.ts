import HomePage from './HomePage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const homeModules: Modules = {
  routeProps: {
    key: '/',
    path: '/',
  },
  component: HomePage,
};

export default homeModules;
