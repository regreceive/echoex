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

import * as Constant from "../controllers/errors_constant";

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
  [Constant.EMAIL_EMPTY]: 'empty email',
  [Constant.EMAIL_INVALID_FORMAT]: 'invalid email format',
  [Constant.ETH_ADDR_INVALID]: 'invalid ethereum address',
  [Constant.MUST_BE_IMAGE]: 'invalid image type',
  [Constant.PASSPORT_IMAGE_EMPTY]: 'passport image missing',

  [Constant.CAPTCHA_EMPTY]: 'empty captcha',
  [Constant.CAPTCHA_INVALID]: 'invalid captcha',

  [Constant.PASSWORD_EMPTY]: 'password empty',
  [Constant.PASSWORD_CONFIRM_EMPTY]: 'password_confirm empty',
  [Constant.PASSWORD_INVALID]: 'password format invalid',
  [Constant.PASSWORD_INCONSIST]: 'password mismatch',
  [Constant.PASSWORD_TOO_SHORT_OR_LONG]: 'password too short or long',

  [Constant.USER_EXISTS]: 'user already exists',
  [Constant.USER_NOT_EXISTS]: 'user not exists',

  [Constant.MAIL_SEND_FAILED]: 'mail send failed',
  [Constant.MAIL_SENT_FREQUENT]: 'mail sent frequent',
  [Constant.PWD_RESET_LINK_EXPIRED]: 'password reset link expired',
  [Constant.PWD_RESET_LINK_INVALID]: 'password reset link invalid',

  [Constant.MUST_LOGIN]: 'must login',
  [Constant.MUST_BE_GUEST]: 'must be guest',
  [Constant.PASSPORT_SAVE_FAILED]: 'passport saving failed',
};
