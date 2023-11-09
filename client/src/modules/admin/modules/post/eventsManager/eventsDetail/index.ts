import NewDetail from './NewDetail';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: any;
}

const NewDetailModule: Modules = {
  routeProps: {
    key: 'new-detail',
    path: 'new-detail',
  },
  component: NewDetail,
};

export default NewDetailModule;
