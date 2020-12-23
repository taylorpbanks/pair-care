import { Types } from './actionTypes';

export const ActionCreators = {
  addWithMe: (people) => ({ type: Types.WITH_ME, people }),
}