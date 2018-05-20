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

const ContactUs = Model.define(
  'ContactUs',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    organization: {
      type: DataType.STRING(255),
    },

    industry: {
      type: DataType.STRING(255),
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },

    mobile: {
      type: DataType.STRING(255),
    },

    phone: {
      type: DataType.STRING(255),
    },

    description: {
      type: DataType.TEXT,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

ContactUs.createNewRecord = async (organization, industry, email, mobile, phone, description) => {
  return Model.query(
    'INSERT IGNORE INTO `ContactUs` (`organization`,`industry`,`email`,`mobile`,`phone`,`description`,`createdAt`,`updatedAt`) values(:organization, :industry, :email, :mobile, :phone, :description,:date,:date)',
    { replacements: { organization, industry, email, mobile, phone, description, date: new Date() } },
  );
};

export default ContactUs;
