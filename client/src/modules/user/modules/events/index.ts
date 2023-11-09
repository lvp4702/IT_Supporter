import EventsPage from './EventsPage';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const eventsPageModules: Modules = {
  routeProps: {
    key: '/events',
    path: '/events',
  },
  component: EventsPage,
};

export default eventsPageModules;
