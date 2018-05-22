// @flow

const serverUrl = 'http://localhost:3000';

async function request(fetch, serviceName, body) {
  let result;
  try {
    const text = await fetch(serverUrl + serviceName, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    result = await text.json();
  } catch (error) {
    if (__DEV__) {
      throw error;
    }
  }

  if (result.status === 10000) {
    return Promise.resolve(result.data);
  }
  return Promise.reject(result.status);
}

// 登录
function login(fetch, payload: object): Promise<object | number> {
  return request(fetch, '/api/login', JSON.stringify(payload));
}

// 注册
function register(fetch, payload: object): Promise<object | number> {
  return request(fetch, '/api/register', JSON.stringify(payload));
}

export { login, register };
