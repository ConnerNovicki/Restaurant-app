import { Action } from './reducer';
import { GetRestaurantByIdResult } from '../../../api/Shared/restTypes';

export enum ActionTypes {
  SAVE_USER_RESTAURANTS = 'save-user-restaurants',
  SAVE_RESTAURANTS = 'save-restaurants',
  SAVE_USER = 'save-user',
  SAVE_RESTAURANT_DETAILED = 'save-restaurant-detailed'
}

export const Actions = {
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
  })
}
