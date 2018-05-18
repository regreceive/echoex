import * as Constant from './errors_constant';

const errors = {};
errors[Constant.EMAIL_EMPTY] = 'empty email';
errors[Constant.EMAIL_INVALID_FORMAT] = 'invalid email format';
errors[Constant.CAPTCHA_EMPTY] = 'empty captcha';
errors[Constant.CAPTCHA_INVALID] = 'invalid captcha';
errors[Constant.PASSWORD_EMPTY] = 'password empty';
errors[Constant.PASSWORD_CONFIRM_EMPTY] = 'password_confirm empty';
errors[Constant.PASSWORD_TOO_SHORT_OR_LONG] = 'password too short or long';

errors[Constant.USER_EXISTS] = 'user already exists';
errors[Constant.USER_NOT_EXISTS] = 'user not exists';

export default errors;
