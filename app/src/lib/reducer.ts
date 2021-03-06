import { ActionTypes } from './actions';
import {
  GetRestaurantByIdResult,
  GetUserRestaurantsResult,
  GetRestaurantsResult,
  GetUserResult,
  GetAllUsersResult,
  GetUserPendingReviews
} from '../../generated/restTypes';

export interface Action<TData> {
  type: ActionTypes;
  payload?: any
}

export interface State {
  userRestaurants: GetUserRestaurantsResult;
  restaurants: GetRestaurantsResult;
  user: GetUserResult;
  allUsers: GetAllUsersResult;
  restaurantsById: { [key: string]: GetRestaurantByIdResult };
  userPendingReviews: GetUserPendingReviews;
}

export const initialState: State = {
  userRestaurants: [],
  restaurants: [],
  user: null,
  allUsers: [],
  restaurantsById: {},
  userPendingReviews: [],
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
    case ActionTypes.SAVE_USER_PENDING_REVIEWS: {
      return { ...state, userPendingReviews: action.payload };
    }
    default:
      return state;
  }
};
