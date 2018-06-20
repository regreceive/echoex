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
  LOGOUT: 'Log out',
  REGISTER: 'Register',
  REGISTER_TITLE: 'Register',
  EMAIL: 'Email',
  EMAIL_DESCRIPTION: 'Email address',
  PASSWORD_DESCRIPTION: 'Password',
  PASSWORD_CONFIRM_DESCRIPTION: 'Confirm password',
  CAPTCHA: 'Captcha',
  REFRESH_CAPTCHA: 'Change CAPTCHA',
  FORGOT_PASSWORD: 'Forget password？',

  PASSWORD_LINK: 'please enter your registered email address',
  SEND_EMAIL: 'send email',
  PASSWORD_LINK_SENT_TITLE: 'Sent successfully',
  PASSWORD_LINK_SENT:
    'Email of resetting password has been sent to your mailbox, please check it',

  PASSWORD_RECOVER: 'Password recover',
  PASSWORD_RECOVER_SENT_TITLE: 'Success!',
  PASSWORD_RECOVER_SENT: 'Reset password successfully. Please login again.',

  PROFILE_TITLE: 'personal information',
  PROFILE_SUBMIT: 'Submit information',
  ACCOUNT: 'Account information',
  KYC_TITLE: 'KYC information',
  KYC_AUTH: 'authentication',
  KYC_AUTH_FAILURE: 'unauthenticated',
  KYC_AUTH_SUCCESS: 'Authenticated',
  KYC_AUTH_WAITING: 'Under review',
  NAME: 'Name',
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  GENDER: 'Gender',
  MALE: 'Male',
  FEMALE: 'Female',
  BIRTHDAY: 'Date of birth',
  INTERNATIONAL_INFORMATION: 'International Information',
  COUNTRY: 'Country',
  CITY: 'City',
  LOCATION: 'Location',
  PASSPORT_ID: 'Passport ID',
  PASSPORT_TITLE: 'passport picture',
  PASSPORT_FULL_FACE: 'Front side of passport ',
  PASSPORT_BACK: 'Back side of passport',

  APPLY_ADDRESS_TITLE: 'Fill in ETH wallet address to purchase ECHO token',
  ETH_ADDRESS: 'your ETH address',
  SUBMIT: 'Submit',
  ADDRESS_STATEMENT:
    ' I hereby confirm that I am not the resident of any area where ICO is forbidden  ',

  SUBSCRIBE_TITLE: 'How to purchase ECHO token',
  SUBSCRIBE_DESCRIPTION:
    'To obtain Echo token, please transfer ETH to the wallet address below',
  COPY: 'Copy',
  SUBSCRIBE_DOWNLOAD_EXCEL:
    'please fill in a Excel form to Echo Official email after your successful token transferring ',
  COPIED: 'Copied',
  DOWNLOAD_TABLE: 'download forms',

  REGACTIVATE_TITLE: 'Activate Account',
  REGACTIVATE_SUCCESS: "Your email has' been activated, LOGIN now!",

  REG_VALIDATION_TITLE: 'mailbox verification',
  REG_VALIDATION_DESCRIPTION:
    'Information has been sent to your mailbox <em>{email}</em>, Please make verification on mailbox ',

  JOIN_ECHO:
    'Join Echo to co-build the new generation of distributed supply chain ecosystem ',
  JOIN_ECHO_ORGANIZATION: 'Institution name',
  JOIN_ECHO_INDUSTRY: 'Industry',
  JOIN_ECHO_TEXTAREA: 'Please provide company profile and cooperation plan',
  JOIN_ECHO_REPLY:
    'Once successful submit, Echo Official will get in touch with you',

  MOBILE: 'MOBILE',
  PHONE: 'TEL',

  // error messages
  [Constant.FAILS]: 'whoops ...',
  [Constant.EMAIL_EMPTY]: 'empty email',
  [Constant.EMAIL_INVALID_FORMAT]: 'invalid email format',
  [Constant.ETH_ADDR_INVALID]: 'invalid ethereum address',
  [Constant.MUST_BE_IMAGE]: 'invalid image type',
  [Constant.PASSPORT_IMAGE_EMPTY]: 'passport image missing',
  [Constant.INCOMPLETE_FORM]: 'incomplete form',
  [Constant.ACTIVATE_LINK_INVALID]: 'invalid activate email',

  [Constant.CAPTCHA_EMPTY]: 'empty captcha',
  [Constant.CAPTCHA_INVALID]: 'invalid captcha',

  [Constant.PASSWORD_EMPTY]: 'password empty',
  [Constant.PASSWORD_CONFIRM_EMPTY]: 'password_confirm empty',
  [Constant.PASSWORD_INVALID]: 'password format invalid',
  [Constant.PASSWORD_INCONSIST]: 'password mismatch',
  [Constant.PASSWORD_TOO_SHORT_OR_LONG]: 'password too short or long',

  [Constant.USER_EXISTS]: 'user already exists',
  [Constant.USER_NOT_EXISTS]: 'username or password mistake',

  [Constant.MAIL_SEND_FAILED]: 'mail send failed',
  [Constant.MAIL_SENT_FREQUENT]: 'mail sent frequent',
  [Constant.PWD_RESET_LINK_EXPIRED]: 'password reset link expired',
  [Constant.PWD_RESET_LINK_INVALID]: 'password reset link invalid',
  [Constant.ACCOUNT_NOT_ACTIVATED]: 'account not activate',
  [Constant.KYC_UNAUTHORIZED]: 'KYC_UNAUTHORIZED',

  [Constant.MUST_LOGIN]: 'must login',
  [Constant.MUST_BE_GUEST]: 'must be guest',
  [Constant.PASSPORT_SAVE_FAILED]: 'passport saving failed',
};
