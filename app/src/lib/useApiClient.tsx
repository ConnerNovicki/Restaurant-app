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
  PostRestaurantReviewArgs,
  GetAllUsersResult,
  DeleteUserResult,
  DeleteRestaurantResult,
  DeleteCommentResult,
  DeleteReviewResult,
  PostReviewCommentArgs,
  PostReviewCommentResult,
  PutUserArgs,
  PutRestaurantArgs,
  PutCommentArgs,
  PutReviewArgs,
  GetUserPendingReviews,
} from '../../generated/restTypes';

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
      history.push('/restaurants');
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
    fetchUserPendingReviews: (): Promise<GetUserPendingReviews> => {
      return makeRequest('/user/pendingReviews', 'GET')
        .then((res) => {
          dispatch(Actions.saveUserPendingReviews(res))
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
    },
    fetchAllUsers: (): Promise<GetAllUsersResult> => {
      return makeRequest('/admin/users', 'GET')
        .then(res => {
          dispatch(Actions.saveAllUsers(res));
          return res;
        })
    },
    deleteUser: (userId: string): Promise<DeleteUserResult> => {
      return makeRequest(`/user/${userId}`, 'DELETE')
    },
    deleteRestaurant: (restaurantId: string): Promise<DeleteRestaurantResult> => {
      return makeRequest(`/restaurant/${restaurantId}`, 'DELETE')
    },
    deleteComment: (commentId: string): Promise<DeleteCommentResult> => {
      return makeRequest(`/comment/${commentId}`, 'DELETE')
    },
    deleteReview: (reviewId: string): Promise<DeleteReviewResult> => {
      return makeRequest(`/review/${reviewId}`, 'DELETE')
    },
    createCommentOnReview: (data: PostReviewCommentArgs, reviewId: string): Promise<PostReviewCommentResult> => {
      return makeRequest(`/review/${reviewId}/comment`, 'POST', data)
    },
    editUser: (userId: string, data: PutUserArgs): Promise<DeleteUserResult> => {
      return makeRequest(`/user/${userId}`, 'PUT', data)
    },
    editRestaurant: (restaurantId: string, data: PutRestaurantArgs): Promise<DeleteRestaurantResult> => {
      return makeRequest(`/restaurant/${restaurantId}`, 'PUT', data)
    },
    editComment: (commentId: string, data: PutCommentArgs): Promise<DeleteCommentResult> => {
      return makeRequest(`/comment/${commentId}`, 'PUT', data)
    },
    editReview: (reviewId: string, data: PutReviewArgs): Promise<DeleteReviewResult> => {
      return makeRequest(`/review/${reviewId}`, 'PUT', data)
    },
  }
};
