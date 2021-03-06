import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../data/models/User';
import * as Errors from './errors_constant';
import WE from './exception';
import config from '../config';
import PasswordReset from '../data/models/PasswordReset';
import Canvas from './canvas';
import UserProfile from "../data/models/UserProfile";

function validEmail(email) {
  if (/^\s*$/.test(email)) return Errors.EMAIL_EMPTY;
  if (!/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/i.test(email))
    return Errors.EMAIL_INVALID_FORMAT;
  return null;
}
function validCaptcha(captcha, originInSession) {
  if(!originInSession) return Errors.CAPTCHA_EMPTY;
  const {captcha:code, expired_at} = originInSession;
  if (!captcha || /^\s*&/.test(captcha)) return Errors.CAPTCHA_EMPTY;
  if (!originInSession || captcha.toLowerCase() !== code.toLowerCase() || new Date().getTime() > expired_at)
    return Errors.CAPTCHA_INVALID;
  return null;
}
function validPassword(p1, p2) {
  if (/^\s*$/.test(p1)) return Errors.PASSWORD_EMPTY;
  if (/^\s*$/.test(p2)) return Errors.PASSWORD_CONFIRM_EMPTY;
  if (p1.length < 6 || p1.length > 20 || p2.length < 6 || p2.length > 20)
    return Errors.PASSWORD_TOO_SHORT_OR_LONG;
  if (p1 !== p2) throw new WE(Errors.PASSWORD_INCONSIST);
  return null;
}
async function sendRegSuccessEmail(email, code) {
  const s = crypto.createHash('sha256').update(email).digest('hex').slice(0,32);
  const link = `${config.api.serverUrl}/activate?s=${s}&code=${code}`;

  // send mail
  const { host, port, secure, user, pass, from } = config.mailer.qq;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from, // sender address
    to: email, // list of receivers
    subject: '注册成功', // Subject line
    text: '这是一封测试邮件', // plain text body
    html: `
      感谢您注册 <b>EchoChain</b><br /><br />
为了保证您正常接收到我们的通知，请验证您的邮件地址。<br /><br />
<a href="${link}">立即验证邮箱</a><br /><br />
或复制以下链接到浏览器中以完成验证：<br /><br />
${link}<br /><br />
 
此致<br />
Echochain团队
      `, // html body
  };

  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, error => {
      if (error) {
        console.error(error);
        throw new WE(Errors.MAIL_SEND_FAILED, error.toString());
      }
      resolve(true);
    });
  })
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

AuthController.Logout = (req, res, next) => {
  const backURL=req.header('Referer') || '/';
  try{
    if(!req.user) return res.redirect(backURL);
    req.logOut();
    let host = req.hostname.split('.');
    host = host.slice(host.length-2).join('.')
    res.clearCookie("kycd");
    res.clearCookie("username", {maxAge: -1, domain: host});
    res.clearCookie("username", {maxAge: -1});
    res.redirect(config.logoutRedirectUrl);
  }catch (e) {
    console.error(e);
    return res.redirect(backURL);
  }
}

AuthController.Login = (req, res, next) => {
  tryErrors(req, res, async () => {
    if (!req.user) {
      throw new WE(Errors.USER_NOT_EXISTS);
    }

    if(req.user.status != 1) {
      throw new WE(Errors.ACCOUNT_NOT_ACTIVATED);
    }

    const user_id = req.user.id;
    let kyc_status = 0;
    const profile = await UserProfile.findOne({ where: { userId: user_id } });
    if (profile && profile.status == 1) kyc_status = 1;
    req.logIn(req.user, err => {
      if (err) {
        return next(err);
      }
      let host = req.hostname.split('.');
      host = host.slice(host.length-2).join('.')
      res.cookie('username', req.body.email, {domain: host});
      return res.json({ info: 'success', status: 10000, data: {user_id, kyc_status} });
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
    err = validCaptcha(captcha, req.session&&req.session.captcha ? req.session.captcha.reg : null,);
    if (err) throw new WE(err);
    // validate password rules
    err = validPassword(password, password2);
    if (err) throw new WE(err);
    // make sure use not exits in database
    const user = await User.findOne({ where: { email } });
    if (user) throw new WE(Errors.USER_EXISTS);

    // construct user
    // write user into databse
    const code = crypto.randomBytes(32).toString('hex');
    const encryptedPassword = await User.encryptPassword(password, null);
    const newuser = await User.createNewUser(email, encryptedPassword, code);
    delete req.session.captcha.reg;
    await sendRegSuccessEmail(email, code);
    return res.json({
      info: 'success',
      status: 10000,
      data: newuser.id,
    });
  });
};

AuthController.RegisterActivate = (req, res) => {
  tryErrors(req, res, async ()=>{
    const {s, code} = req.body;
    const record = await User.findOne({ where: {code} });
    if(!record) throw new WE(Errors.ACTIVATE_LINK_INVALID);
    const {email:originEmail} = record;
    if(s !== crypto.createHash('sha256').update(originEmail).digest('hex').slice(0,32)) {
      throw new WE(Errors.ACTIVATE_LINK_INVALID);
    }

    await User.setActivate(originEmail);
    res.json({
      info: 'success',
      status: 10000,
      data: null,
    });
  })
};

AuthController.SendCaptcha = (req, res) => {
  tryErrors(req, res, async () => {
    const { scenario } = req.query;
    if (scenario !== 'reg' && scenario !== 'reset') {
      throw new WE(Errors.CAPTCHA_INVALID);
    }

    const captcha = crypto.randomBytes(4).toString('hex').slice(0, 4).toUpperCase();
    req.session.captcha = req.session.captcha || {};
    req.session.captcha[scenario] = {captcha, expired_at: new Date().getTime()+5*60*1000}; //验证码过期实时间5分钟
    Canvas({
      text: captcha,
      size: 5,
      fileMode: 2,
      height: 100,
      width: 250,
      complexity:2,
    }, (text, data)=>{
      res.end(data);
    })
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
        user,
        pass,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from, // sender address
      to: email, // list of receivers
      subject: '修改密码', // Subject line
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
  tryErrors(req, res, async () => {
    const { code } = req.body;
    if (!code || code.length !== 64) {
      throw new WE(Errors.PWD_RESET_LINK_INVALID);
    }

    const record = await PasswordReset.findRecord(code);
    if (!record) {
      throw new WE(Errors.PWD_RESET_LINK_EXPIRED);
    }

    const { email, captcha = '', password, password_confirm: password2 } = req.body;
    let err;
    // validate username rules
    err = validEmail(email);
    if (err) throw new WE(err);
    // validate catpcha rules
    err = validCaptcha(captcha, req.session&&req.session.captcha&&req.session.captcha.reset ? req.session.captcha.reset : null);
    if (err) throw new WE(err);
    // validate password rules
    err = validPassword(password, password2);
    if (err) throw new WE(err);
    // make sure use not exits in database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new WE(Errors.USER_NOT_EXISTS);
    }

    if (user.email !== record.email) {
      throw new WE(Errors.PWD_RESET_LINK_INVALID);
    }

    const encryptedPassword = await User.encryptPassword(password, null);
    // @should use transaction, but here's 2 simple SQL query, we just call them sequencially.
    // 修改密码
    await User.changePwd(email, encryptedPassword);
    // 删除 reset links
    await PasswordReset.destroy({ where: { email } });
    delete req.session.captcha.reset;
    res.json({
      info: 'success',
      status: 10000,
      data: null,
    });
  });
};

export default AuthController;
