/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize, { Op } from 'sequelize';
import config from '../config';

const { db, user, pass, host, port } = config.database;
const sequelize = new Sequelize(db, user, pass, {
  host,
  port,
  operatorsAliases: Op,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
