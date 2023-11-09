import { toast } from 'react-toastify';
import { findOneUser, loginApi } from 'src/apis/admin';
import { USER_KEY } from '../const';

import {
  fetchUser as fetchUserAction,
  loginFailure,
  loginStart,
  loginSuccess,
  logout as logoutAction,
} from './AuthActions';

export const fetchUser = async (userId: number, dispatch: any) => {
  try {
    const { data } = await findOneUser(userId);
    const prevLocalUser = JSON.parse(localStorage.getItem(USER_KEY) || '');

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        ...prevLocalUser,
        ...data.data,
      })
    );

    dispatch(fetchUserAction(data.data));
  } catch (error) {
    console.error(error);
  }
};

export const login = async (body: any, dispatch: any, cb: (user: any) => void) => {
  dispatch(loginStart());
  try {
    const { data } = await loginApi(body);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        access_token: data.access_token || null,
        refresh_token: data.refresh_token || null,
        ...data.data,
      })
    );

    dispatch(loginSuccess(data?.data));
    cb(data?.data);
    toast.success('Success');
  } catch (error: any) {
    dispatch(loginFailure());
    toast.error(error.response.data.message || 'Có lỗi xảy ra');
  }
};

export const logout = async (dispatch: any) => {
  dispatch(logoutAction());
  localStorage.removeItem(USER_KEY);
  toast.success('Đăng xuất thành công');
};
