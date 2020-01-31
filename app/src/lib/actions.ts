import { Action } from './reducer';
import { GetRestaurantByIdResult, GetAllUsersResult } from '../../generated/restTypes';

export enum ActionTypes {
  SAVE_USER_PENDING_REVIEWS = 'save-user-pending-reviews',
  SAVE_USER_RESTAURANTS = 'save-user-restaurants',
  SAVE_RESTAURANTS = 'save-restaurants',
  SAVE_USER = 'save-user',
  SAVE_RESTAURANT_DETAILED = 'save-restaurant-detailed',
  SAVE_ALL_USERS = 'save-all-users',
  CLEAR_STORE = 'clear-store',
}

export const Actions = {
  saveUserPendingReviews: (data): Action<any> => ({
    type: ActionTypes.SAVE_USER_PENDING_REVIEWS,
    payload: data,
  }),
  saveUserRestaurants: (data): Action<any> => ({
    type: ActionTypes.SAVE_USER_RESTAURANTS,
    payload: data,
  }),
  saveRestaurants: (data): Action<any> => ({
    type: ActionTypes.SAVE_RESTAURANTS,
    payload: data,
  }),
  saveUser: (data): Action<any> => ({
    type: ActionTypes.SAVE_USER,
    payload: data,
  }),
  saveRestaurantDetailed: (data: GetRestaurantByIdResult): Action<GetRestaurantByIdResult> => ({
    type: ActionTypes.SAVE_RESTAURANT_DETAILED,
    payload: data,
  }),
  saveAllUsers: (data: GetAllUsersResult): Action<GetAllUsersResult> => ({
    type: ActionTypes.SAVE_ALL_USERS,
    payload: data,
  }),
  clearStore: (): Action<{}> => ({
    type: ActionTypes.CLEAR_STORE,
  })
}
