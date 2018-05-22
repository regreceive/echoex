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

import errors from "../controllers/errors"
import * as Constant from "../controllers/errors_constant"

export default {
  LOGIN: '登录',
  LOGIN_TITLE: '登录',
  REGISTER: '注册',
  REGISTER_TITLE: '注册',
  EMAIL_DESCRIPTION: '邮箱',
  PASSWORD_DESCRIPTION: '密码',
  PASSWORD_CONFIRM_DESCRIPTION: '确认密码',
  CAPTCHA: '验证码',
  REFRESH_CAPTCHA: '更换验证码',
  FORGOT_PASSWORD: '忘记密码？',

  // error messages
  30001: '邮箱地址为空',
  30002: '不是有效的邮箱格式',
  30003: '不是有效的以太地址',
  30004: '错误的图片格式',
  30005: '缺少护照照片',

  30101: '验证码为空',
  30102: '错误的验证码',

  30201: '密码为空',
  30202: '确认密码为空',
  30203: '密码格式错误',
  30204: '前后密码不匹配',
  30205: '密码长度太短或超出限制',

  30301: '用户已存在',
  30302: '用户不存在',

  30401: '邮件发送失败',
  30402: '邮件发送过于频繁',
  30403: '密码重置链接失效',
  30404: '违规的密码重置链接',

  40001: '必须登录',
  40002: 'must be guest',
  40003: 'passport saving failed',
};
