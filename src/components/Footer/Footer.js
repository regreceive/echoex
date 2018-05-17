/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';
import logoUrl from '../assets/logo.png';
import gg from '../assets/sns/gg.png'

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.firstRow}>
            <div className={s.logo}>
              <img src={logoUrl} width="184" height="60" alt="echo" />
            </div>
            <div className={s.sns}>
              <a href="https://discord.gg/FKvngzE">
                <img src={gg} width="45" height="45" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
