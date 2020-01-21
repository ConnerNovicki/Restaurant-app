import { ActionTypes } from './actions';
import {
  GetRestaurantByIdResult,
  GetUserRestaurantsResult,
  GetRestaurantsResult,
  GetUserResult
} from '../../../api/Shared/restTypes';

export interface Action<TData> {
  type: ActionTypes;
  payload?: any
}

export interface State {
  userRestaurants: GetUserRestaurantsResult;
  restaurants: GetRestaurantsResult;
  user: GetUserResult;
  restaurantDetailed: GetRestaurantByIdResult;
}

export const initialState: State = {
  userRestaurants: [],
  restaurants: [],
  user: null,
  restaurantDetailed: null,
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
      return { ...state, restaurantDetailed: action.payload }
    }
    default:
      return state;
  }
};
