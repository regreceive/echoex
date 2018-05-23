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
  "PHOTO": "You have {photoNum, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}",
  "MESSAGE_NOT_IN_COMPONENT": "react-intl-universal is able to internationalize message not in React.Component"
}
*/

import * as Constant from '../controllers/errors_constant';

export default {
  LOGIN: '登录',
  LOGIN_TITLE: '登录',
  REGISTER: '注册',
  REGISTER_TITLE: '注册',
  EMAIL: '邮箱',
  EMAIL_DESCRIPTION: '邮箱',
  PASSWORD_DESCRIPTION: '密码',
  PASSWORD_CONFIRM_DESCRIPTION: '确认密码',
  CAPTCHA: '验证码',
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
  SUBMIT: '提交',
  ADDRESS_STATEMENT:
    '我在此確認，我不是禁止參與令牌銷售（ICO）的任何司法管轄區的居民。',

  // error messages
  [Constant.EMAIL_EMPTY]: '邮箱地址为空',
  [Constant.EMAIL_INVALID_FORMAT]: '不是有效的邮箱格式',
  [Constant.ETH_ADDR_INVALID]: '不是有效的以太地址',
  [Constant.MUST_BE_IMAGE]: '错误的图片格式',
  [Constant.PASSPORT_IMAGE_EMPTY]: '缺少护照照片',
  [Constant.INCOMPLETE_FORM]: '强填写完整表单',

  [Constant.CAPTCHA_EMPTY]: '验证码为空',
  [Constant.CAPTCHA_INVALID]: '错误的验证码',

  [Constant.PASSWORD_EMPTY]: '密码为空',
  [Constant.PASSWORD_CONFIRM_EMPTY]: '确认密码为空',
  [Constant.PASSWORD_INVALID]: '密码格式错误',
  [Constant.PASSWORD_INCONSIST]: '前后密码不匹配',
  [Constant.PASSWORD_TOO_SHORT_OR_LONG]: '密码长度太短或超出限制',

  [Constant.USER_EXISTS]: '用户已存在',
  [Constant.USER_NOT_EXISTS]: '用户名或密码错误',

  [Constant.MAIL_SEND_FAILED]: '邮件发送失败',
  [Constant.MAIL_SENT_FREQUENT]: '邮件发送过于频繁',
  [Constant.PWD_RESET_LINK_EXPIRED]: '密码重置链接失效',
  [Constant.PWD_RESET_LINK_INVALID]: '违规的密码重置链接',

  [Constant.MUST_LOGIN]: '必须登录',
  [Constant.MUST_BE_GUEST]: 'must be guest',
  [Constant.PASSPORT_SAVE_FAILED]: 'passport saving failed',
};
