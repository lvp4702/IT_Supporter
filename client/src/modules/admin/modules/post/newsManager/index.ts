import NewManager from './NewManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const newManagerModule: Modules = {
  routeProps: {
    key: 'news-manager',
    path: 'news-manager',
  },
  component: NewManager,
};

export default newManagerModule;
