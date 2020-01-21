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
