import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import * as Errors from './errors_constant';
import WE from './exception';
import User from '../data/models/User';
import ContactUs from '../data/models/ContactUs';
import UserProfile from '../data/models/UserProfile';
import config from "../config";

function checkEthAddress(address) {
  const addr = address.toLowerCase();
  const prefix = addr.slice(0, 2);
  if (!address) return Errors.ETH_ADDR_INVALID;
  if (prefix !== '0x') return Errors.ETH_ADDR_INVALID;
  if (address.length !== 42) return Errors.ETH_ADDR_INVALID;
  return null;
}
function checkUploadFiles(files) {
  if (!files || !files.length) return Errors.PASSPORT_IMAGE_EMPTY;
  if (!files[0]['originalname'].match(/\.(jpg|jpeg|png)$/)) {
    return Errors.MUST_BE_IMAGE;
  }
  return null;
}
function isEmptyString(s) {
  if(!s) return true;
  if(/^\s*$/.test(s)) return true;
  return false;
}
function getFileName(f) {
  return crypto.createHash('md5').update(`${f}_powerchain`).digest("hex");
}
async function saveFile(data, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        console.error(err);
        return reject(Errors.PASSPORT_SAVE_FAILED);
      }
      return resolve(true);
    });
  });
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
function HomeController() {}

HomeController.JoinEcho = (req, res) => {
  tryErrors(req, res, async () => {
    const {organization, industry, mobile, phone, email, description} = req.body;
    await ContactUs.createNewRecord(organization, industry, email, mobile, phone, description);

    res.json({ info: 'success', status: 10000, data: null });
  });
};

HomeController.ApplyProfile = (req, res) => {
  tryErrors(req, res, async () => {
    const { user } = req;
    if (!user) throw new WE(Errors.MUST_LOGIN);

    let {username, firstname, lastname, gender, birthday, country, city, location, passport} = req.body;
    if(isEmptyString(username, firstname, lastname, birthday, country, city, location, passport) || (gender!=="0"&&gender!=="1")) {
      throw new WE(Errors.INCOMPLETE_FORM);
    }
    if (!req.files) throw new WE(Errors.PASSPORT_IMAGE_EMPTY);
    let err = checkUploadFiles(req.files['passport_01']);
    if (err) throw new WE(err);
    err = checkUploadFiles(req.files['passport_02']);
    if (err) throw new WE(err);

    const uploadPath = config.upload_path || path.resolve(`${__dirname}../../public/uploads/`)
    let file = req.files['passport_01'][0];
    let ext = file['mimetype'].split('/')[1];
    let passport_01 = getFileName(`${user.id}_01`) + '.' + ext;
    await saveFile(file.buffer, `${uploadPath}/${passport_01}`);

    file = req.files['passport_02'][0];
    ext = file['mimetype'].split('/')[1];
    let passport_02 = getFileName(`${user.id}_02`) + '.' + ext;
    await saveFile(file.buffer, `${uploadPath}/${passport_02}`);
    await UserProfile.insertNewRecord( user.id, username, firstname, lastname, gender, birthday, country, city, location, passport, passport_01, passport_02);
    res.json({ info: 'success', status: 10000, data: null });
  });
};

HomeController.getProfile = (req, res) => {
  tryErrors(req, res, async () => {
    const { user } = req;
    if (!user) throw new WE(Errors.MUST_LOGIN);

    const profile = await UserProfile.findOne({ where: { userId: user.id } });
    if(!profile) {
      return res.json({
        info: "success",
        status: 10000,
        data: null,
      })
    }
    profile.passport_01 = `${config.api.serverUrl}/uploads/${profile.passport_01}`;
    profile.passport_02 = `${config.api.serverUrl}/uploads/${profile.passport_02}`;
    const result = {
      status: profile.status,
      userId: profile.userId,
      username: profile.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      gender: profile.gender,
      birthday: profile.birthday,
      country: profile.country,
      city: profile.city,
      location: profile.location,
      passport: profile.passport,
      passport_01: profile.passport_01,
      passport_02: profile.passport_02,
    };

    res.json({
      info: 'success',
      status: 10000,
      data: result,
    });
  })
};

HomeController.Test = (req, res) => {
  const result = {
    user: req.user,
    cookie: req.cookies,
    session: req.session,
  };
  res.json(result);
};

HomeController.SubmitEthAddress = (req, res) => {
  tryErrors(req, res, async () => {
    const { address } = req.body;
    const { user } = req;
    if (!user) throw new WE(Errors.MUST_LOGIN);
    const err = checkEthAddress(address);
    if (err) throw new WE(Errors.ETH_ADDR_INVALID);
    if (!user) throw new WE(Errors.MUST_LOGIN);

    await User.saveEthAddress(user.id, address);
    res.json({ info: 'success', status: 10000, data: null });
  });
};

export default HomeController;
