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
import intl from 'react-intl-universal';
import s from './Login.css';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: 'caotinghan@echo.center',
      password: '123456',
    };

    this.subLogin = this.subLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  subLogin = function(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/login', {
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
        console.log(result);
        if (result.status !== 10000) {
          return window.alert(result.info);
        }
        window.location.href = '/password/reset-link';
      });

    return false;
  };

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post" action="/api/login" onSubmit={this.subLogin}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                {intl.get('EMAIL_DESCRIPTION')}
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
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                {intl.get('PASSWORD_DESCRIPTION')}
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
            <div className={s.captcha}><img src="http://localhost:3000/api/captcha/send?email=a@qq.com&scenario=reg" alt=""/></div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>

            <div>
              <a href="/password/reset-link">忘记密码?</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
