// @flow

const serverUrl = 'http://localhost:3000';

async function post(fetch, serviceName, body) {
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

async function get(fetch, serviceName) {
  let result;
  try {
    const text = await fetch(serverUrl + serviceName, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
  return post(fetch, '/api/login', JSON.stringify(payload));
}

// 注册
function register(fetch, payload: object): Promise<object | number> {
  return post(fetch, '/api/register', JSON.stringify(payload));
}

// 个人信息
function profile(fetch): Promise {
  return get(fetch, '/api/profile');
}

export { login, register, profile };
