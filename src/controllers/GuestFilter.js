import _ from 'lodash';
import config from '../config';

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
      return res.redirect(config.authRedirectUrl);
    }
  }

  if(_.includes(guestList, req.path.toLowerCase())) {
    if(session && session.passport && session.passport.user) {
      return res.redirect(config.guestRedirectUrl);
    }
  }
  next();
}