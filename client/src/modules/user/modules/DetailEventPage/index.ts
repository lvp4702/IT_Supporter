import DetailEventPage from './DetailEventPage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const detailEventPageModules: Modules = {
  routeProps: {
    key: '/events/:id',
    path: '/events/:id',
  },
  component: DetailEventPage,
};

export default detailEventPageModules;
