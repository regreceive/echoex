/*
{
  "SIMPLE": "Simple Sentence",
  "HELLO": "Hello, {name}. Welcome to {where}!",
  "TIP": "This is <span style='color:red'>HTML</span>",
  "TIP_VAR": "This is <span style='color:red'>{message}</span>",
  "SALE_START": "Sale begins {start, date}",
  "SALE_END": "Sale ends {end, date, long}",
  "COUPON": "Coupon expires at {expires, time, medium}",
  "SALE_PRICE": "The price is {price, number, USD}",
  "PHOTO": "You have {photoNum, plural,:0 {no photos.}:1 {one photo.} other {# photos.}}",
  "MESSAGE_NOT_IN_COMPONENT": "react-intl-universal is able to internationalize message not in React.Component"
}
*/

export default {
  LOGIN: 'Login',
  LOGIN_TITLE: 'Login In',
  REGISTER: 'Register',
  REGISTER_TITLE: 'Register',
  EMAIL_DESCRIPTION: 'Email address',
  PASSWORD_DESCRIPTION: 'Password',
  PASSWORD_CONFIRM_DESCRIPTION: 'Confirm password',
  CAPTCHA: 'Captcha',
  REFRESH_CAPTCHA: '更换验证码',
  FORGOT_PASSWORD: '忘记密码？',

  // error messages
  30001: 'empty email',
  30002: 'invalid email format',
  30003: 'invalid ethereum address',
  30004: 'invalid image type',
  30005: 'passport image missing',

  30101: 'empty captcha',
  30102: 'invalid captcha',

  30201: 'password empty',
  30202: 'password_confirm empty',
  30203: 'password format invalid',
  30204: 'password mismatch',
  30205: 'password too short or long',

  30301: 'user already exists',
  30302: 'user not exists',

  30401: 'mail send failed',
  30402: 'mail sent frequent',
  30403: 'password reset link expired',
  30404: 'password reset link invalid',

  40001: 'must login',
  40002: 'must be guest',
  40003: 'passport saving failed',
};
