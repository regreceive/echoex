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

const UserEthAddress = Model.define('UserEthAddress', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataType.INTEGER,
    unsigned: true,
    unique: true,
  },

  address: {
    type: DataType.CHAR(42),
  },
});

export default UserEthAddress;
