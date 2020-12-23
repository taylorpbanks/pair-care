import { Types } from './actionTypes';

const initialState = {
  'custom:childGender': '',
  'sub': '',
  'custom:childBirthday': '',
  'email_verified': '',
  'custom:parentType': '',
  'custom:firstName': '',
  'custom:yearOfBirth': '',
  'custom:zipcode': '',
  'custom:lastName': '',
  'custom:pic': '',
  email: '',
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_USER:
      const attributes = action.payload && action.payload.user ? action.payload.user.attributes : initialState;
      return {
        ...state,
        ...attributes,
      }
    case Types.UPDATE_USER:
      console.log(state);
      console.log(state.profile);
      console.log(action);
      return {
        ...state,
        ...action.payload.user,
      }
    case Types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default profile;