import _ from 'lodash';
import config from '../config';

export default function GuestFilter(req, res, next) {
  const authList = config.authList || [];
  const guestList = config.guestList || [];

  // if(_.includes(authList,), req.url) {}
  console.log(req.path.toLowerCase());
  next();
}