import MajorManager from './MajorManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const majorManagerModule: Modules = {
  routeProps: {
    key: 'major-manager',
    path: 'major-manager',
  },
  component: MajorManager,
};

export default majorManagerModule;
