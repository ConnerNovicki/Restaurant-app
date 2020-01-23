import { ActionTypes } from './actions';
import {
  GetRestaurantByIdResult,
  GetUserRestaurantsResult,
  GetRestaurantsResult,
  GetUserResult,
  GetAllUsersResult
} from '../../../api/Shared/restTypes';

export interface Action<TData> {
  type: ActionTypes;
  payload?: any
}

export interface State {
  userRestaurants: GetUserRestaurantsResult;
  restaurants: GetRestaurantsResult;
  user: GetUserResult;
  allUsers: GetAllUsersResult;
  restaurantsById: { [key: string]: GetRestaurantByIdResult }
}

export const initialState: State = {
  userRestaurants: [],
  restaurants: [],
  user: null,
  allUsers: [],
  restaurantsById: {},
};

export default (state: State = initialState, action: Action<any>): State => {
  console.log(state, action);
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
    case ActionTypes.SAVE_RESTAURANT_DETAILED: {
      const payload = action.payload as GetRestaurantByIdResult;
      return {
        ...state,
        restaurantsById: {
          ...state.restaurantsById,
          [payload.id]: payload,
        }
      }
    }
    case ActionTypes.SAVE_ALL_USERS: {
      return { ...state, allUsers: action.payload };
    }
    case ActionTypes.CLEAR_STORE: {
      return initialState;
    }
    default:
      return state;
  }
};
