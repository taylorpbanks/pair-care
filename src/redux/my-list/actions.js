import { Types } from './actionTypes';

export const ActionCreators = {
  addMyList: (list, listId) => ({ type: Types.ADD_MY_LIST, payload: { list }, listId }),
  addItem: (item, listId) => ({ type: Types.ADD_ITEM, item, listId }),
  updateItem: (content, listId, itemId) => ({ type: Types.UPDATE_ITEM, content, listId, itemId }),
  deleteItem: (itemId, listId) => ({ type: Types.DELETE_ITEM, itemId, listId }),
}