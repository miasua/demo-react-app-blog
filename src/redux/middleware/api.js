import fetch from 'isomorphic-fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const callApi = (method, endpoint, options) => {
  const body = (options) ? JSON.stringify(options) : null;

  const headers = {
    'Content-Type': 'application/json'
  };

  let params = {
    method,
    headers
  };

  if (body) {
    params.body = body;
  }

  let url = `${BASE_URL}${endpoint}`;

  return fetch(url, params).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
};

export default callApi;
