import { FETCH_USER_SUCCESS, LOGIN_SUCCESS } from "./action";

const initialState = {
  users: [],
  userlogined: {}
};

const rootReducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, userlogined: action.payload };
    case FETCH_USER_SUCCESS:
      return { ...state, users: action.payload };
  }

  return state;
};

export default rootReducer;