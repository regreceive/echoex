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
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import Personal from '../Personal';
import logoUrl from '../assets/logo.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <img src={logoUrl} width="99" height="32" alt="echo" />
          </Link>
          <Navigation className={s.navigation} />
        </div>
        <Personal className={s.personal} />
      </div>
    );
  }
}

export default withStyles(s)(Header);
