import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../data/models/User';
import * as Errors from './errors_constant';
import WE from './exception';
import config from '../config';
import PasswordReset from '../data/models/PasswordReset';

function validEmail(email) {
  if (/^\s*$/.test(email)) return Errors.EMAIL_EMPTY;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email))
    return Errors.EMAIL_INVALID_FORMAT;
  return null;
}
function validCaptcha(req, captcha) {
  if (!captcha || /^\s*&/.test(captcha)) return Errors.CAPTCHA_EMPTY;
  if (captcha !== req.session.captcha) return Errors.CAPTCHA_INVALID;
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
        console.error(err);
        res.json({
          info: 'unknown',
          status: -1,
          data: null,
        });
      }
    });
  } catch (err) {
    console.error(err);
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
      return res.json({ info: 'success', status: 10000, data: req.user.id });
    });
  });
};

AuthController.Register = (req, res) => {
  const { email, captcha, password, password_confirm: password2 } = req.body;
  tryErrors(req, res, async () => {
    let err;
    // validate username rules
    err = validEmail(email);
    if (err) throw new WE(err);
    // validate catpcha rules
    validCaptcha(req, captcha);
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
    const encryptedPassword = await User.encryptPassword(password, null);
    const newuser = await User.createNewUser(email, encryptedPassword);
    return res.json({
      info: 'success',
      status: 10000,
      data: newuser.id,
    });
  });
};

AuthController.SendCaptcha = (req, res) => {
  tryErrors(req, res, async () => {
    const { email } = req.query;
    const err = validEmail(email);
    if (err) throw new WE(err);

    const captcha = crypto.randomBytes(4).toString('hex').slice(0,6).toUpperCase();
    req.session.captcha = captcha;
    res.json({
      info: 'success',
      status: 10000,
      data: captcha,
    });
  });
};

AuthController.ResetLink = (req, res) => {
  tryErrors(req, res, async () => {
    const { email } = req.body;
    const err = validEmail(email);
    if (err) throw new WE(err);

    const authUser = await User.findOne({ where: { email } });
    if (!authUser) {
      throw new WE(Errors.USER_NOT_EXISTS);
    }

    const mailCount = await PasswordReset.Count(email);
    console.info(mailCount);
    if (mailCount >= config.mailer.qq.maxPwdReset) {
      throw new WE(Errors.MAIL_SENT_FREQUENT);
    }

    const code = crypto.randomBytes(32).toString('hex');
    const link = `${config.api.serverUrl}/password/recover?code=${code}`;
    await PasswordReset.insertNewRecord(email, code);

    // send mail
    const { host, port, secure, user, pass, from } = config.mailer.qq;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true for 465, false for other ports
      auth: {
        user, // generated ethereal user
        pass, // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from, // sender address
      to: email, // list of receivers
      subject: '测试邮件', // Subject line
      text: '这是一封测试邮件', // plain text body
      html: `
      尊敬的Echochain用户：<br /><br />
请点击以下链接，完成密码重设。<br /><br />
<a href="${link}">密码重设</a><br /><br />
或复制以下链接到浏览器中以完成验证：<br /><br />
${link}<br /><br />
 
此致<br />
Echochain团队
      `, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, error => {
      if (error) {
        console.error(error);
        res.json(err);
        throw new WE(Errors.MAIL_SEND_FAILED, error.toString());
      }
      return res.json({
        info: 'success',
        status: 10000,
        data: null,
      });
    });
  });
};

AuthController.Recoverpwd = (req, res) => {
  res.json({ message: 'OK' });
};

export default AuthController;
