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

  constructor(props) {
    super(props);
    this.state = {
      email: 'caotinghan@echo.center',
      captcha: 'AF34D9',
      password: '123456',
      password_confirm: '123456',
    };

    this.subLogin = this.subLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
    this.handleCaptchaEnter = this.handleCaptchaEnter.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handlePasswordConfirm(event) {
    this.setState({ password_confirm: event.target.value });
  }
  handleCaptchaEnter(event) {
    this.setState({ captcha: event.target.value });
  }
  handleCaptcha = function() {
    fetch('http://localhost:3000/api/captcha/send', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        scenario: 'reset',
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 10000) {
          this.setState({ captcha: result.data });
        } else {
          global.alert(result.info);
          console.log(result);
        }
      });
  };

  subLogin = function(e) {
    e.preventDefault();

    fetch(window.location.href, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(result => {
        if (result.status !== 10000) {
          window.alert(result.info);
        }
        console.log(result);
      });

    return false;
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form
            method="post"
            action="/api/password/recover"
            onSubmit={this.subLogin}
          >
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                邮箱:
                <input
                  className={s.input}
                  id="email"
                  type="text"
                  name="email"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  value={this.state.email}
                  onChange={this.handleEmail}
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
                  value={this.state.captcha}
                  onClick={this.handleCaptcha}
                  onChange={this.handleCaptchaEnter}
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
                  value={this.state.password}
                  onChange={this.handlePassword}
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
                  value={this.state.password_confirm}
                  onChange={this.handlePasswordConfirm}
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
