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

import * as Constant from '../controllers/errors_constant';

export default {
  LOGIN: 'Login',
  LOGIN_TITLE: 'Login In',
  LOGOUT: '退出',
  REGISTER: 'Register',
  REGISTER_TITLE: 'Register',
  EMAIL: 'Email',
  EMAIL_DESCRIPTION: 'Email address',
  PASSWORD_DESCRIPTION: 'Password',
  PASSWORD_CONFIRM_DESCRIPTION: 'Confirm password',
  CAPTCHA: 'Captcha',
  REFRESH_CAPTCHA: '更换验证码',
  FORGOT_PASSWORD: '忘记密码？',
  PROFILE_TITLE: '个人信息',
  PROFILE_SUBMIT: '提交信息',
  ACCOUNT: '账号信息',
  KYC_TITLE: 'KYC信息',
  KYC_AUTH: 'KYC认证',
  KYC_AUTH_NONE: '未认证',
  KYC_AUTH_DONE: '已认证',
  KYC_AUTH_WAITING: '审核中',
  NAME: '姓名',
  FIRST_NAME: '名',
  LAST_NAME: '姓',
  GENDER: '性别',
  MALE: '男',
  FEMALE: '女',
  BIRTHDAY: '出生日期',
  INTERNATIONAL_INFORMATION: '国际信息',
  COUNTRY: '国家',
  CITY: '城市',
  LOCATION: '街道信息',
  PASSPORT_ID: '护照ID',
  PASSPORT_FULL_FACE: '护照正面',
  PASSPORT_BACK: '护照北面',

  APPLY_ADDRESS_TITLE: '填写以太坊钱包地址才能购买ECHO令牌',
  ETH_ADDRESS: '您的以太坊地址',
  SUBMIT: 'Submit',
  ADDRESS_STATEMENT:
    '我在此確認，我不是禁止參與令牌銷售（ICO）的任何司法管轄區的居民。',

  SUBSCRIBE_TITLE: '如何购买ECHO的令牌？',
  SUBSCRIBE_DESCRIPTION: '要获得ECHO的令牌，清将ETH转移到下方钱包地址',
  COPY: 'Copy',
  SUBSCRIBE_DOWNLOAD_EXCEL: '打币后需要填写Excel表格信息到ECHO官方邮箱',
  COPIED: 'Copied',
  DOWNLOAD_TABLE: '下载表格',

  // error messages
  [Constant.EMAIL_EMPTY]: 'empty email',
  [Constant.EMAIL_INVALID_FORMAT]: 'invalid email format',
  [Constant.ETH_ADDR_INVALID]: 'invalid ethereum address',
  [Constant.MUST_BE_IMAGE]: 'invalid image type',
  [Constant.PASSPORT_IMAGE_EMPTY]: 'passport image missing',
  [Constant.INCOMPLETE_FORM]: 'incomplete form',

  [Constant.CAPTCHA_EMPTY]: 'empty captcha',
  [Constant.CAPTCHA_INVALID]: 'invalid captcha',

  [Constant.PASSWORD_EMPTY]: 'password empty',
  [Constant.PASSWORD_CONFIRM_EMPTY]: 'password_confirm empty',
  [Constant.PASSWORD_INVALID]: 'password format invalid',
  [Constant.PASSWORD_INCONSIST]: 'password mismatch',
  [Constant.PASSWORD_TOO_SHORT_OR_LONG]: 'password too short or long',

  [Constant.USER_EXISTS]: 'user already exists',
  [Constant.USER_NOT_EXISTS]: '用户名或密码错误',

  [Constant.MAIL_SEND_FAILED]: 'mail send failed',
  [Constant.MAIL_SENT_FREQUENT]: 'mail sent frequent',
  [Constant.PWD_RESET_LINK_EXPIRED]: 'password reset link expired',
  [Constant.PWD_RESET_LINK_INVALID]: 'password reset link invalid',

  [Constant.MUST_LOGIN]: 'must login',
  [Constant.MUST_BE_GUEST]: 'must be guest',
  [Constant.PASSPORT_SAVE_FAILED]: 'passport saving failed',
};
