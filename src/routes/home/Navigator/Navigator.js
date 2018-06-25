import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import history from '../../../history';
import User from '../../../components/Header/user';
import logo from '../../../assets/logo.png';
import lang from './locales';
import s from './Navigator.scss';

let dict;

class Navigator extends Component {
  static contextTypes = {
    login: PropTypes.object,
  };

  UserCenter = email => {
    const { login } = dict;
    return email ? (
      this.Kyc()
    ) : (
      <a
        href="#"
        className={s.login}
        onClick={e => {
          e.preventDefault();
          history.push('/login');
        }}
      >
        {login}
      </a>
    );
  };

  Kyc = () => {
    const { logout } = dict;
    return (
      <div className={s.user}>
        <User />
        <button className={s.btn}>
          <span className="caret" />
        </button>
        <div className={s.drop}>
          <a
            href="/logout"
            onClick={() => {
              this.context.login.out();
            }}
          >
            {logout}
          </a>
        </div>
      </div>
    );
  };

  render() {
    const email = this.context.login.check();
    dict = lang();
    const { anchors, switcher } = dict;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.logo}>
            <a href="http://www.echoex.io/">
              <img src={logo} alt="ECHO" />
            </a>
          </div>

          <div className={s.nav}>
            <a className={s.active}>{anchors[0]}</a>
            <a href="#team">{anchors[1]}</a>
            <a href="#partners">{anchors[2]}</a>
            <a href="#contact">{anchors[3]}</a>
            {this.UserCenter(email)}
            <a href={switcher.link}>{switcher.label}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navigator);
