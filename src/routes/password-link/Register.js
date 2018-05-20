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
    };

    this.subLogin = this.subLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  subLogin = function(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/password/reset-link', {
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
