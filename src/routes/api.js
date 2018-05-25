// @flow

const serverUrl = '';

async function post(fetch, serviceName, body) {
  const text = await fetch(serverUrl + serviceName, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  });

  const result = await text.json();
  if (result.status === 10000) {
    return Promise.resolve(result.data);
  }
  // 服务器未捕获的系统错误
  if (!result.status) {
    console.warn(result);
    return Promise.reject('-1');
  }
  return Promise.reject(result.status);
}

async function filePost(fetch, serviceName, body) {
  const text = await window.fetch(serverUrl + serviceName, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  });

  const result = await text.json();

  if (result.status === 10000) {
    return Promise.resolve(result.data);
  }
  // 服务器未捕获的系统错误
  if (!result.status) {
    console.warn(result);
  }
  return Promise.reject(result.status);
}

async function get(fetch, serviceName) {
  const text = await fetch(serverUrl + serviceName, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const result = await text.json();

  if (result.status === 10000) {
    return Promise.resolve(result.data);
  }
  // 服务器未捕获的系统错误
  if (!result.status) {
    console.warn(result);
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

// 拿个人信息
function profile(fetch): Promise {
  return get(fetch, '/api/profile');
}

// 改个人信息
function profilePost(fetch, payload: object): Promise {
  return filePost(fetch, '/api/profile', payload);
}

// 以太地址
function postAddress(fetch, payload: object): Promise<object | number> {
  return post(fetch, '/api/profile/address', JSON.stringify(payload));
}

// 激活账号
function regActivate(fetch, payload: {}): Promise<object | number> {
  return post(fetch, '/api/user/activate', JSON.stringify(payload));
}

export { login, register, profile, profilePost, postAddress, regActivate };
