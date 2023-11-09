import FundManager from './FundManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const fundManagerModule: Modules = {
  routeProps: {
    key: 'fund-manager',
    path: 'fund-manager',
  },
  component: FundManager,
};

export default fundManagerModule;
