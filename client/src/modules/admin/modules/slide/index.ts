import SlideManager from './SlideManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const slideManagerModule: Modules = {
  routeProps: {
    key: 'slides',
    path: 'slides',
  },
  component: SlideManager,
};

export default slideManagerModule;
