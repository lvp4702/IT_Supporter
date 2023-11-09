import NewPage from './NewPage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const newsModule: Modules = {
  routeProps: {
    key: 'news',
    path: '/news',
  },
  component: NewPage,
};

export default newsModule;
