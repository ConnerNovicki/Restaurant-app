import { useContext } from "react";
import { IStoreContext, StoreContext } from "./context";
import { makeRequest, LoginBody, CreateUserBody, AddUserRestaurantBody } from "./api";
import { useHistory } from "react-router-dom";
import { Actions } from "./actions";

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
  }

  const saveUser = (res) => {
    dispatch(Actions.saveUser(res.user))
  }

  return {
    fetchAllRestaurants: () => {
      return makeRequest('/user/restaurants', 'GET')
        .then(res => {
          dispatch(Actions.saveRestaurants(res));
        });
    },
    fetchUserRestaurants: () => {
      return makeRequest('/user/restaurants', 'GET')
        .then((res) => {
          dispatch(Actions.saveUserRestaurants(res))
        })
    },
    login: (body: LoginBody) => {
      return makeRequest('/login', 'POST', body)
        .then(saveTokenInLocalStorage)
        .then(navigateAfterLogin)
        .then(saveUser)
    },
    createUser: (body: CreateUserBody) => {
      return makeRequest('/user', 'POST', body)
        .then(saveTokenInLocalStorage)
        .then(navigateAfterLogin)
        .then(saveUser)
    },
    addUserRestaurant: (body: AddUserRestaurantBody) => {
      return makeRequest('/user/restaurant', 'POST', body)
    }
  }
};
