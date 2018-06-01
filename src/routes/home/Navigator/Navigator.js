import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import logo from '../../../assets/logo.png';
import lang from './locales';
import s from './Navigator.scss';

function Navigator() {
  const dict = lang();
  const { anchors, switcher, login } = dict;

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
          <a href="/login">{login}</a>
          <a href={switcher.link}>{switcher.label}</a>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Navigator);
