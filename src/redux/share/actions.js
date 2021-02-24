import { Types } from './actionTypes';

export const ActionCreators = {
  addWithMe: (people) => ({ type: Types.WITH_ME, people }),
  addWithThem: (people) => ({ type: Types.WITH_THEM, people }),
  addThem: (person) => ({type: Types.ADD_THEM, person}),
  deleteThem: (person) => ({type: Types.DELETE_THEM, person}),
}