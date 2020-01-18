import { ActionTypes } from './actions';

export interface Action<TData> {
  type: ActionTypes;
  payload?: {
    data: TData;
  };
}

export interface State {
  userRestaurants: any;
  restaurants: any;
}

export const initialState: State = {
  userRestaurants: [],
  restaurants: [],
};

export default (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
    case ActionTypes.SAVE_USER_RESTAURANTS: {
      return { ...state, userRestaurants: action.payload };
    }
    case ActionTypes.SAVE_RESTAURANTS: {
      return { ...state, restaurants: action.payload };
    }
    default:
      return state;
  }
};
