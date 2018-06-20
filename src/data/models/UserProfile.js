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

  status: {
    type: DataType.TINYINT,
    defaultValue: 0,
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

  passport_01: {
    type: DataType.STRING(255),
  },

  passport_02: {
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
  passport_01,
  passport_02,
) =>
  Model.query(
    'INSERT INTO `UserProfile` (userId, username, firstname, lastname, gender, birthday, country, city, location, passport,passport_01,passport_02,`createdAt`,`updatedAt`) values(:userId, :username, :firstname, :lastname, :gender, :birthday, :country, :city, :location, :passport,:passport_01,:passport_02,:date,:date) ' +
      'ON DUPLICATE KEY UPDATE username=:username,firstname=:firstname, lastname=:lastname, gender=:gender, birthday=:birthday, country=:country, city=:city, location=:location, passport=:passport,passport_01=:passport_01,passport_02=:passport_02,updatedAt=:date,status=0',
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
        passport_01,
        passport_02,
        date: new Date(),
      },
    },
  );

export default UserProfile;
