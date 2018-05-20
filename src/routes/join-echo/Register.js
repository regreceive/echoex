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
          <form method="post">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="organization">
                机构名:
                <input
                  className={s.input}
                  id="organization"
                  type="text"
                  name="organization"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  defaultValue="XX联盟"
                />
              </label>
            </div>
            {/* 验证码 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="industry">
                行业:
                <input
                  className={s.input}
                  id="industry"
                  type="text"
                  name="industry"
                  defaultValue="区块链"
                />
              </label>
            </div>
            {/* 机构名 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="mobile">
                移动电话:
                <input
                  className={s.input}
                  id="mobile"
                  type="text"
                  name="mobile"
                  defaultValue="15879654352"
                />
              </label>
            </div>
            {/* 密码2 */}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="phone">
                座机:
                <input
                  className={s.input}
                  id="phone"
                  type="text"
                  name="phone"
                  defaultValue="110100001"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                邮箱:
                <input
                  className={s.input}
                  id="email"
                  type="text"
                  name="email"
                  defaultValue="123456@qq.com"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="description">
                请提供您的机构简介以及合作计划:
                <textarea
                  className={s.input}
                  id="description"
                  name="description"
                  rows="5"
                  defaultValue="计算机系统的技术发展几乎都集中在中心化的解决上,包括互联网,大数据,云计算,移动通
信,等等。因为中心化的架构可以很好的模拟大部分的用户需求,更由于中心化的思想一直贯穿
着计算机技术的发展过程,所以选择中心化的架构是非常自然的结果"
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
