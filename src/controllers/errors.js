import * as Constant from './errors_constant';

const errors = {};
errors[Constant.FAILS] = 'whoops';
errors[Constant.EMAIL_EMPTY] = 'empty email';
errors[Constant.EMAIL_INVALID_FORMAT] = 'invalid email format';
errors[Constant.ETH_ADDR_INVALID] = 'invalid ethereum address';
errors[Constant.MUST_BE_IMAGE] = 'invalid image type, jpg|jpeg|png';
errors[Constant.PASSPORT_IMAGE_EMPTY] = 'passport image missing';
errors[Constant.INCOMPLETE_FORM] = 'incomplete form';
errors[Constant.ACTIVATE_LINK_INVALID] = 'invalid activate email';

errors[Constant.CAPTCHA_EMPTY] = 'empty captcha';
errors[Constant.CAPTCHA_INVALID] = 'invalid captcha';

errors[Constant.PASSWORD_EMPTY] = 'password empty';
errors[Constant.PASSWORD_CONFIRM_EMPTY] = 'password_confirm empty';
errors[Constant.PASSWORD_INVALID] = 'password format invalid';
errors[Constant.PASSWORD_INCONSIST] = 'password mismatch';
errors[Constant.PASSWORD_TOO_SHORT_OR_LONG] = 'password too short or long';

errors[Constant.USER_EXISTS] = 'user already exists';
errors[Constant.USER_NOT_EXISTS] = 'user not exists';

errors[Constant.MAIL_SEND_FAILED] = 'mail send failed';
errors[Constant.MAIL_SENT_FREQUENT] = 'mail sent frequent';
errors[Constant.PWD_RESET_LINK_EXPIRED] = 'password reset link expired';
errors[Constant.PWD_RESET_LINK_INVALID] = 'password reset link invalid';

errors[Constant.MUST_LOGIN] = 'must login';
errors[Constant.MUST_BE_GUEST] = 'must be guest';
errors[Constant.PASSPORT_SAVE_FAILED] = 'passport saving failed';
errors[Constant.ACCOUNT_NOT_ACTIVATED] = 'account not activate';
errors[Constant.KYC_UNAUTHORIZED] = 'kyc unauthorized';

export default errors;
