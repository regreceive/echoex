import _ from 'lodash';
import config from '../config';
import * as Errors from './errors_constant';

// /api/captcha/send
// /register
// /api/captcha/send
// /login
// /api/captcha/send
// /profile
// /profile
// /api/captcha/send
export default function GuestFilter(req, res, next) {
  const authList = config.authList || [];
  const guestList = config.guestList || [];

  const session = req.session;
  if(_.includes(authList, req.path.toLowerCase())) {
    if(!session || !session.passport || !session.passport.user) {
      return req.xhr ? res.json({
        info: 'must logon',
        status: Errors.MUST_LOGIN,
        data: null,
      }) : res.redirect(config.authRedirectUrl);
    }
  }

  if(_.includes(guestList, req.path.toLowerCase())) {
    if(session && session.passport && session.passport.user) {
      return req.xhr ? res.json({
        info: 'must be guest',
        status: Errors.MUST_BE_GUEST,
        data: null,
      }) : res.redirect(config.guestRedirectUrl);
    }
  }
  next();
}