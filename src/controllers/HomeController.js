import path from 'path';
import fs from 'fs';
import * as Errors from './errors_constant';
import WE from './exception';
import User from '../data/models/User';
import ContactUs from '../data/models/ContactUs';
import UserProfile from '../data/models/UserProfile';

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
  if (!files[0].originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return Errors.MUST_BE_IMAGE;
  }
  return null;
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
    const {
      organization,
      industry,
      mobile,
      phone,
      email,
      description,
    } = req.body;
    await ContactUs.createNewRecord(
      organization,
      industry,
      email,
      mobile,
      phone,
      description,
    );

    res.json({ info: 'success', status: 10000, data: null });
  });
};

HomeController.ApplyProfile = (req, res) => {
  tryErrors(req, res, async () => {
    const { user } = req;
    if (!req.files) throw new WE(Errors.PASSPORT_IMAGE_EMPTY);
    let err = checkUploadFiles(req.files.passport_01);
    if (err) throw new WE(err);
    err = checkUploadFiles(req.files.passport_02);
    if (err) throw new WE(err);

    const uploadPath = path.resolve(`${__dirname}../../uploads`);
    let file = req.files.passport_01[0];
    let ext = file.mimetype.split('/')[1];
    await saveFile(file.buffer, `${uploadPath}/${user.id}_01.${ext}`);

    file = req.files.passport_02[0];
    ext = file.mimetype.split('/')[1];
    await saveFile(file.buffer, `${uploadPath}/${user.id}_02.${ext}`);
    const {
      username,
      firstname,
      lastname,
      gender,
      birthday,
      country,
      city,
      location,
      passport,
    } = req.body;
    UserProfile.insertNewRecord(
      user.id,
      username,
      firstname,
      lastname,
      gender,
      birthday,
      country,
      city,
      location,
      passport,
    );
    res.json({ info: 'success', status: 10000, data: null });
  });
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
    const err = checkEthAddress(address);
    if (err) throw new WE(Errors.ETH_ADDR_INVALID);
    if (!user) throw new WE(Errors.MUST_LOGIN);

    await User.saveEthAddress(user.id, address);
    res.json({ info: 'success', status: 10000, data: null });
  });
};

export default HomeController;
