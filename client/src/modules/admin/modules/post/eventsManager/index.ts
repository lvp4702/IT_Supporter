import EventManager from './EventManager';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const eventManagerModule: Modules = {
  routeProps: {
    key: 'event-manager',
    path: 'event-manager',
  },
  component: EventManager,
};

export default eventManagerModule;
