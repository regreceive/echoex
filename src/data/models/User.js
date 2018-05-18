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

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    password: {
      type: DataType.STRING,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

User.createNewUser = async (email, password) => {
  await Model.query(
    'INSERT IGNORE INTO `User` (`email`,`password`,`createdAt`,`updatedAt`) values(:email,:password,:date,:date)',
    { replacements: { email, password, date: new Date() } },
  );
  const user = await User.findOne({ where: { email } });
  return user;
};

export default User;
