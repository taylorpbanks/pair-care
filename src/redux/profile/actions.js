import { Types } from './actionTypes';

export const ActionCreators = {
  addProfile: (user) => ({ type: Types.ADD_USER, payload: { user } }),
  updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),
  logout: () => ({ type: Types.LOGOUT }),
}