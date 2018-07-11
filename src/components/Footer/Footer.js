// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Wechat from './Wechat';
import logoUrl from '../../assets/foot_logo.png';
import sns from '../../assets/sns';

import s from './Footer.scss';

function SNSList() {
  return (
    <React.Fragment>
      {sns.map(row => (
        <li key={row.url}>
          <a href={row.url}>
            <img src={row.icon} alt="" />
          </a>
        </li>
      ))}
    </React.Fragment>
  );
}

class Footer extends React.Component {
  static defaultProps = {
    home: false,
  };

  render() {
    return (
      <footer id="contact" className={s.root}>
        <div className={s.container}>
          <div className={s.logo}>
            <img src={logoUrl} alt="echo" />
          </div>
          <ul className={s.sns}>
            <SNSList />
            <Wechat />
          </ul>
          <div className={s.copyright}>
            Copyright © ECHO Team 2014-2018 ECHO Contributors www.echo.com
            <br />
            <a href="https://github.com/echochain/">github</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
