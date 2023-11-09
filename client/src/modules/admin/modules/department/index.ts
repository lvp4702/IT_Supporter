// import CategoryManager from './CategoryManager';

import DepartmentManager from './DepartmentManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const departmentManagerModule: Modules = {
  routeProps: {
    key: 'department-manager',
    path: 'department-manager',
  },
  component: DepartmentManager,
};

export default departmentManagerModule;
