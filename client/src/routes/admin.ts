import majorManagerModule from '../modules/admin/modules/major';
import newManagerModule from '../modules/admin/modules/post/newsManager';
import userApproveModule from '../modules/admin/modules/user/userApprove';
import userPendingModule from '../modules/admin/modules/user/userPending';
import NewDetailModule from 'src/modules/admin/modules/post/newsManager/newsDetail';
import eventManagerModule from 'src/modules/admin/modules/post/eventsManager';
import categoryManagerModule from 'src/modules/admin/modules/category';
import formCreateModule from 'src/modules/admin/modules/post/formCreate';
import slideManagerModule from 'src/modules/admin/modules/slide';
import fundManagerModule from 'src/modules/admin/modules/fund';
import departmentManagerModule from 'src/modules/admin/modules/department';

export const AdminRouter = [
  userPendingModule,
  userApproveModule,
  newManagerModule,
  eventManagerModule,
  majorManagerModule,
  formCreateModule,
  NewDetailModule,
  categoryManagerModule,
  slideManagerModule,
  fundManagerModule,
  departmentManagerModule,
];
