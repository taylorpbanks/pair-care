import { Types } from './actionTypes';

const initialState = {
  0: [],
  1: [],
  2: [],
  all: [],
};

const myList = (state = initialState, action) => {
  const { itemId, listId, item, content } = action;
  const currentList = state[listId];

  switch (action.type) {
    case Types.ADD_MY_LIST:
      return {
        ...state,
        [action.listId]: action.payload.list,
      }
    case Types.ADD_ITEM:
      currentList.push(item);
      return {
        ...state,
        [listId]: currentList
      };
    case Types.DELETE_ITEM:
      const list = currentList.filter(item => item.id !== itemId);
      return {
        ...state,
        [listId]: list
      };
    case Types.UPDATE_ITEM:
      const index = currentList.findIndex(listItem => listItem.id === itemId);
      currentList[index] = content;

      return {
        ...state,
        [listId]: currentList
      }
    case Types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default myList;