import { SET_MONGODB_DATA } from './action';
import { LOGIN_SUCCESS, LOGOUT, GOOGLE_DATA } from './action';

const initialState1 = {
  user: null,
  isAuthenticated: false,

  user: null,
};

export function authReducer(state = initialState1, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,

      };
    case LOGOUT:
      return {
        ...state,
        user: null,

      };
    default:
      return state;
  }
}


const initialState = {
  mongodbData: [],
};

export function mongodbReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MONGODB_DATA:
      return {
        ...state,
        mongodbData: action.payload,
      }; 
      case LOGOUT:
      return {
        ...state,
        mongodbData:[],

      };
    default:
      return state;
  }
}

const initialState2 = {
  googleData: [],
  };
  
  export function googleReducer(state = initialState2, action) {
    switch (action.type) {
      case GOOGLE_DATA:
        return {
          ...state,
          googleData: action.payload,
        };
        case LOGOUT:
          return {
            ...state,
            googleData: [],
    
          };
     
      default:
        return state;
    }
  }
 
  
