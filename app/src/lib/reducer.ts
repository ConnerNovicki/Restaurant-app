import { ActionTypes } from './actions';

export interface Action<TData> {
  type: ActionTypes;
  payload?: any
}

export interface State {
  userRestaurants: any;
  restaurants: any;
  user: {
    id: string;
    role: 'OWNER' | 'ADMIN' | 'USER';
    username: string;
  };
}

export const initialState: State = {
  userRestaurants: [],
  restaurants: [],
  user: null,
};

export default (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
    case ActionTypes.SAVE_USER_RESTAURANTS: {
      return { ...state, userRestaurants: action.payload };
    }
    case ActionTypes.SAVE_RESTAURANTS: {
      return { ...state, restaurants: action.payload };
    }
    case ActionTypes.SAVE_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
