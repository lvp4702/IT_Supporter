import aboutUsModules from 'src/modules/user/modules/AboutUs';
import createNewPageModules from 'src/modules/user/modules/createnews';
import detailEventPageModules from 'src/modules/user/modules/DetailEventPage';
import detailPageModules from 'src/modules/user/modules/DetailPage';
import eventsPageModules from 'src/modules/user/modules/events';
import userPageModules from 'src/modules/user/modules/userPage';
import homeModules from '../modules/user/modules/home';
import loginModule from '../modules/user/modules/login';
import newsModule from '../modules/user/modules/news';
import registerModule from '../modules/user/modules/register';

export const UserRouter = [
  loginModule,
  registerModule,
  homeModules,
  newsModule,
  userPageModules,
  detailPageModules,
  aboutUsModules,
  eventsPageModules,
  detailEventPageModules,
  createNewPageModules,
];
