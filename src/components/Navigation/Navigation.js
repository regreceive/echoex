/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="/about">
          首页
        </Link>
        <Link className={s.link} to="/contact">
          ECHO介绍
        </Link>
        <Link className={s.link} to="/login">
          创始团队
        </Link>
        <Link className={s.link} to="/register">
          视点
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
