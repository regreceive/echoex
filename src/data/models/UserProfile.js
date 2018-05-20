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
import User from './User';

const UserProfile = Model.define('UserProfile', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataType.INTEGER,
    unique: true,
  },

  username: {
    type: DataType.STRING(255),
  },

  firstname: {
    type: DataType.STRING(255),
  },

  lastname: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.INTEGER,
  },

  birthday: {
    type: DataType.STRING(20),
  },

  country: {
    type: DataType.STRING(100),
  },

  city: {
    type: DataType.STRING(100),
  },

  location: {
    type: DataType.STRING(255),
  },

  passport: {
    type: DataType.STRING(255),
  },
});

UserProfile.insertNewRecord = async (
  userId,
  username,
  firstname,
  lastname,
  gender,
  birthday,
  country,
  city,
  location,
  passport,
) =>
  Model.query(
    'INSERT IGNORE INTO `UserProfile` (userId, username, firstname, lastname, gender, birthday, country, city, location, passport,`createdAt`,`updatedAt`) values(:userId, :username, :firstname, :lastname, :gender, :birthday, :country, :city, :location, :passport,:date,:date)',
    {
      replacements: {
        userId,
        username,
        firstname,
        lastname,
        gender,
        birthday,
        country,
        city,
        location,
        passport,
        date: new Date(),
      },
    },
  );

export default UserProfile;
