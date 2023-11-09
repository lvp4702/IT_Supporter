import AboutUs from './AboutUs';

interface Modules {
  routeProps: {
    key: string;
    path: string;
  };
  component: () => JSX.Element;
}

const aboutUsModules: Modules = {
  routeProps: {
    key: '/about-us',
    path: '/about-us',
  },
  component: AboutUs,
};

export default aboutUsModules;
