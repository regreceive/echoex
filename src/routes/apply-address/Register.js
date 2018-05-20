/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../login/Login.css';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post" action="/api/profile/address">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="address">
                您的以太坊地址:
                <input
                  className={s.input}
                  id="address"
                  type="text"
                  name="address"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  defaultValue="0x512210A27677616436F05BF0394C6e5068E9e9c6"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                提交
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
