import CreateNewsPage from './CreateNews';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const createNewPageModules: Modules = {
  routeProps: {
    key: '/create-news',
    path: '/create-news',
  },
  component: CreateNewsPage,
};

export default createNewPageModules;
