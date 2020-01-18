// const url = process.env.API_URL;
const url = 'http://localhost:4000'

export const makeRequest = (path: string, method: 'GET' | 'POST', body?: any) => {
  const token = localStorage.getItem('token');

  const options: RequestInit = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(!!token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    ...(!!body ? { body: JSON.stringify(body) } : {}),
  };

  return fetch(`${url}${path}`, options).then(res => res.json());
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface CreateUserBody {
  role: string;
  username: string;
}

export interface AddUserRestaurantBody {
  name: string;
}

const api = {
  login: (body: LoginBody) => makeRequest('/login', 'POST', body)
    .then((res) => {
      const { token } = res;
      localStorage.setItem('token', token);
      return res;
    }),

  createUser: (body: CreateUserBody) => makeRequest('/user', 'POST', body)
    .then((res) => {
      const { token } = res;
      localStorage.setItem('token', token);
      return res;
    }),
  userRestaurants: () => makeRequest('/user/restaurants', 'GET'),
  addUserRestaurant: (body: AddUserRestaurantBody) => makeRequest('/user/restaurant', 'POST', body), 
  allRestaurants: () => makeRequest('/restaurants', 'GET'),
}

export default api;
