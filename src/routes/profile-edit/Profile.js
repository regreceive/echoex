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
import s from './Profile.css';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form method="post" action="/api/profile">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                姓名:
                <input
                  className={s.input}
                  id="username"
                  type="text"
                  name="username"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  defaultValue="曹庭汉"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="firstname">
                名:
                <input
                  className={s.input}
                  id="firstname"
                  type="text"
                  name="firstname"
                  defaultValue="庭汉"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="lastname">
                姓:
                <input
                  className={s.input}
                  id="lastname"
                  type="text"
                  name="lastname"
                  defaultValue="曹"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="gender">
                性别:
                <input
                  className={s.input}
                  type="radio"
                  name="gender"
                  value="0"
                />男
                <input
                  className={s.input}
                  type="radio"
                  name="gender"
                  value="1"
                />女
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="birthday">
                出生日期:
                <input
                  className={s.input}
                  id="birthday"
                  type="text"
                  name="birthday"
                  defaultValue="1987.12.31"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="country">
                国家:
                <input
                  className={s.input}
                  id="country"
                  type="text"
                  name="country"
                  defaultValue="中国"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="city">
                城市:
                <input
                  className={s.input}
                  id="city"
                  type="text"
                  name="city"
                  defaultValue="北京市"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="location">
                街道信息:
                <input
                  className={s.input}
                  id="location"
                  type="text"
                  name="location"
                  defaultValue="Shiloh, IL 3140 Green Mt Crossing Dr Shiloh, IL 62269 (618) 624-5454 "
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="passport">
                护照id:
                <input
                  className={s.input}
                  id="passport"
                  type="text"
                  name="passport"
                  defaultValue="北京市"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="passport_01">
                护照正面:
                <input
                  className={s.input}
                  id="passport_01"
                  type="file"
                  name="passport_01"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="passport_02">
                护照反面:
                <input
                  className={s.input}
                  id="passport_02"
                  type="file"
                  name="passport_02"
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

export default withStyles(s)(Login);
