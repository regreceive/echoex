import User from '../data/models/User';
import * as Errors from './errors_constant';
import WE from './exception';

function validUser(email) {
  if (/^\s*$/.test(email)) return Errors.EMAIL_EMPTY;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return Errors.EMAIL_INVALID_FORMAT;
  return null;
}
function validCaptcha(captcha) {
  if (/^\s*&/.test(captcha)) return Errors.CAPTCHA_EMPTY;
  if (captcha !== '000000') return Errors.CAPTCHA_INVALID;
  return null;
}
function validPassword(p1, p2) {
  if (/^\s*$/.test(p1)) return Errors.PASSWORD_EMPTY;
  if (/^\s*$/.test(p2)) return Errors.PASSWORD_CONFIRM_EMPTY;
  if (p1.length < 6 || p1.length > 20 || p2.length < 6 || p2.length > 20)
    return Errors.PASSWORD_TOO_SHORT_OR_LONG;
  return null;
}
const tryErrors = function tryErrors(req, res, fn) {
  try {
    fn().catch(err => {
      if (err instanceof WE) {
        res.json(err.ToJSON());
      } else {
        res.json({
          info: 'unknown',
          status: -1,
          data: null,
        });
      }
    });
  } catch (err) {
    res.json({
      info: 'unknown',
      status: -1,
      data: null,
    });
  }
};
function AuthController() {}

AuthController.Login = (req, res, next) => {
  tryErrors(req, res, async () => {
    if (!req.user) {
      throw new WE(Errors.USER_NOT_EXISTS);
    }
    req.logIn(req.user, err => {
      if (err) {
        return next(err);
      }
      res.json({ info: 'success', status: 10000, data: req.user.id });
    });
  });
};

AuthController.LoginWithError = (req, res, next) => {
  tryErrors(req, res, async () => {
    if (!req.user) {
      throw new WE(Errors.USER_NOT_EXISTS);
    }
    req.logIn(req.user, err => {
      if (err) {
        return next(err);
      }
      return res.json({ info: 'success', status: 10000, data: req.user.id });
    });
  });
};

AuthController.Register = (req, res) => {
  const { email, captcha, password, password_confirm: password2 } = req.body;
  tryErrors(req, res, async () => {
    let err;
    // validate username rules
    err = validUser(email);
    if (err) throw new WE(err);
    // validate catpcha rules
    validCaptcha(captcha);
    if (err) throw new WE(err);
    // validate password rules
    err = validPassword(password, password2);
    if (err) throw new WE(err);
    // make sure use not exits in database
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new WE(Errors.USER_EXISTS);
    }

    // construct user
    // write user into databse
    const newuser = await User.createNewUser(email, password);
    return res.json({
      info: 'success',
      status: 10000,
      data: newuser.id,
    });
  });
};

AuthController.Resetpwd = (req, res) => {
  res.json({ message: 'Reset Password' });
};

export default AuthController;
