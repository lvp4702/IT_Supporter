import DetailPage from './DetailPage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const detailPageModules: Modules = {
  routeProps: {
    key: '/news/:id',
    path: '/news/:id',
  },
  component: DetailPage,
};

export default detailPageModules;
