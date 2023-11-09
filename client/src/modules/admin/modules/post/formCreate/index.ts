import FormCreate from './FormCreate';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: any;
}

const formCreateModule: Modules = {
  routeProps: {
    key: 'form-create',
    path: 'form-create',
  },
  component: FormCreate,
};

export default formCreateModule;
