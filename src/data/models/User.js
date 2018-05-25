/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import crypto from 'crypto';
import DataType from 'sequelize';
import Model from '../sequelize';
import * as Errors from '../../controllers/errors_constant';
import WE from '../../controllers/exception';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },

    address: {
      type: DataType.CHAR,
      length: 42,
      unique: true,
      default: null,
    },

    status: {
      type: DataType.TINYINT,
      defaultValue: 0,
    },

    code: {
      type: DataType.CHAR,
      length: 32,
    },

    password: {
      type: DataType.STRING,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

User.createNewUser = async (email, password, activateCode) => {
  await Model.query(
    'INSERT IGNORE INTO `User` (`email`,`password`, `code`, `createdAt`,`updatedAt`) values(:email,:password,:code,:date,:date)',
    { replacements: { email, password, code:activateCode, date: new Date() } },
  );
  const user = await User.findOne({ where: { email } });
  return user;
};

User.changePwd = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new WE(Errors.USER_NOT_EXISTS);
  }

  user.updateAttributes({ password });
  return true;
};

User.saveEthAddress = async (uid, address) =>
  User.update(
    {
      address,
    },
    { where: { id: uid } },
  );

User.encryptPassword = function(pwd, s) {
  return new Promise((resolve, reject) => {
    let salt = s || 'power-chain-kyc';
    salt = salt.toString('base64');
    crypto.pbkdf2(pwd, salt, 2048, 64, 'sha512', (err, hash) => {
      if (err) return reject(err);
      return resolve(hash.toString('hex').slice(0, 64));
    });
  });
};

export default User;
