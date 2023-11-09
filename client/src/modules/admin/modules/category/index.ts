// import CategoryManager from './CategoryManager';

import CategoryManager from './CategoryManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const categoryManagerModule: Modules = {
  routeProps: {
    key: 'category-manager',
    path: 'category-manager',
  },
  component: CategoryManager,
};

export default categoryManagerModule;
