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

  _captcha = function (){
    fetch('http://localhost:3000/api/captcha/send', {
      credentials: "same-origin",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'caotinghan@echo.center',
        scenario: 'reg',
      })
    })
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post" action="/api/register">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                邮箱:
                <input
                  className={s.input}
                  id="email"
                  type="text"
                  name="email"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  defaultValue="straysh@qq.com"
                />
              </label>
            </div>
            {/* 验证码 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="captcha">
                验证码:
                <input
                  className={s.input}
                  id="captcha"
                  type="text"
                  name="captcha"
                  defaultValue="D3f5"
                  onClick={this._captcha}
                />
              </label>
            </div>
            {/* 密码 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                密码:
                <input
                  className={s.input}
                  id="password"
                  type="password"
                  name="password"
                  defaultValue="123456"
                />
              </label>
            </div>
            {/* 密码2 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password_confirm">
                确认密码:
                <input
                  className={s.input}
                  id="password_confirm"
                  type="password"
                  name="password_confirm"
                  defaultValue="123456"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
