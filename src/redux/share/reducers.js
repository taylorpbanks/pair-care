import { Types } from './actionTypes';

const pairCareContact = {
  fromEmail: 'paircarecontact@gmail.com',
  fromName: 'Pair Care',
  fromSub: '512bfff3-eb83-4645-864f-1e1f5f5b87fe',
  isPairCare: true,
};

const initialState = {
  withMe: [pairCareContact],
  withThem: [],
};

const share = (state = initialState, action) => {
  switch (action.type) {
    case Types.WITH_ME:
      let newList = [pairCareContact];
      newList = newList.concat(action.people);
      return {
        ...state,
        withMe: newList
      }
    case Types.LOGOUT:
      return {
        withMe: [],
        withThem: [],
      }
    default:
      return state;
  }
}

export default share;