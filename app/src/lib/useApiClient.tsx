import { useContext } from "react";
import { IStoreContext, StoreContext } from "./context";
import { makeRequest } from "./api-utils";
import { useHistory } from "react-router-dom";
import { Actions } from "./actions";
import {
  PostUserArgs,
  PostUserResult,
  PostLoginArgs,
  PostLoginResult,
  GetUserRestaurantsResult,
  GetRestaurantsResult,
  PostUserRestaurantArgs,
  PostUserRestaurantResult,
  GetUserResult,
  GetRestaurantByIdArgs,
  GetRestaurantByIdResult,
  PostRestaurantReviewArgs
} from '../../../api/Shared/restTypes';

export default () => {
  const history = useHistory();
  const { dispatch } = useContext<IStoreContext>(StoreContext);

  const saveTokenInLocalStorage = (res) => {
    const { token } = res;
    localStorage.setItem('token', token);
    return res;
  }

  const navigateAfterLogin = (res) => {
    if (res.user.role === 'OWNER') {
      history.push('/owner');
    } else if (res.user.role === 'ADMIN') {
      history.push('/admin');
    } else {
      history.push('/home');
    }
    return res;
  }

  const saveUserFromAuthPayload = (res) => {
    dispatch(Actions.saveUser(res.user))
    return res;
  }

  return {
    fetchAllRestaurants: (): Promise<GetRestaurantsResult> => {
      return makeRequest('/restaurants', 'GET')
        .then(res => {
          dispatch(Actions.saveRestaurants(res));
          return res;
        });
    },
    fetchUserRestaurants: (): Promise<GetUserRestaurantsResult> => {
      return makeRequest('/user/restaurants', 'GET')
        .then((res) => {
          dispatch(Actions.saveUserRestaurants(res))
          return res;
        })
    },
    login: (body: PostLoginArgs): Promise<PostLoginResult> => {
      return makeRequest('/login', 'POST', body)
        .then(saveTokenInLocalStorage)
        .then(navigateAfterLogin)
        .then(saveUserFromAuthPayload)
    },
    createUser: (body: PostUserArgs): Promise<PostUserResult> => {
      return makeRequest('/user', 'POST', body)
        .then(saveTokenInLocalStorage)
        .then(navigateAfterLogin)
        .then(saveUserFromAuthPayload)
    },
    addUserRestaurant: (body: PostUserRestaurantArgs): Promise<PostUserRestaurantResult> => {
      return makeRequest('/user/restaurant', 'POST', body)
    },
    fetchUser: (): Promise<GetUserResult> => {
      return makeRequest('/user', 'GET')
        .then(res => {
          dispatch(Actions.saveUser(res));
          return res;
        });
    },
    fetchRestaurantById: (body: GetRestaurantByIdArgs): Promise<GetRestaurantByIdResult> => {
      return makeRequest(`/restaurants/${body.id}`, 'GET')
        .then(res => {
          dispatch(Actions.saveRestaurantDetailed(res))
          return res;
        })
    },
    addReview: (body: PostRestaurantReviewArgs, restaurantId: string): Promise<void> => {
      return makeRequest(`/restaurants/${restaurantId}/review`, 'POST', body)
    }
  }
};
