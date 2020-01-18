import { Action } from './reducer';

export enum ActionTypes {
  SAVE_USER_RESTAURANTS = 'save-user-restaurants',
  SAVE_RESTAURANTS = 'save-restaurants',
}

export const Actions = {
  saveUserRestaurants: (data): Action<any> => ({
    type: ActionTypes.SAVE_USER_RESTAURANTS,
    payload: data,
  }),
  saveRestaurants: (data): Action<any> => ({
    type: ActionTypes.SAVE_RESTAURANTS,
    payload: data,
  })
}
