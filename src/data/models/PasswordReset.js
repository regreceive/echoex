/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import DataType from 'sequelize';
import Model from '../sequelize';

const PasswordReset = Model.define(
  'PasswordReset',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },

    code: {
      type: DataType.CHAR,
      length: 64,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

PasswordReset.insertNewRecord = async (email, code) =>
  Model.query(
    'INSERT IGNORE INTO `PasswordReset` (`email`,`code`,`createdAt`,`updatedAt`) values(:email,:code,:date,:date)',
    { replacements: { email, code, date: new Date() } },
  );

PasswordReset.Count = async email => {
  const c = await Model.query(
    'select count(*) as count from `PasswordReset` where email=:email AND createdAt > :c AND createdAt < :e',
    {
      replacements: {
        email,
        c: new Date(new Date() - 24 * 3600 * 1000),
        e: new Date(),
      },
      type: DataType.QueryTypes.SELECT,
    },
  );

  return c[0] ? c[0].count : 0;
};

PasswordReset.findRecord = async code => {
  const c = await Model.query(
    'select * from `PasswordReset` where code=:code AND createdAt > :c AND createdAt < :e',
    {
      replacements: {
        code,
        c: new Date(new Date() - 24 * 3600 * 1000),
        e: new Date(),
      },
      type: DataType.QueryTypes.SELECT,
    },
  );

  return c[0] ? c[0] : null;
};


export default PasswordReset;
