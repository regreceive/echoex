// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cs from 'classnames';
import Wechat from './Wechat';
import logoUrl from '../../assets/logo.png';
import sns from '../../assets/sns';

import s from './Footer.scss';

const renderSns = () =>
  sns.map((row, key) => (
    <li key={key}>
      <a href={row.url}>
        <img src={row.icon} width="45" height="45" />
      </a>
    </li>
  ));

class Footer extends React.Component {
  static propTypes = {
    home: PropTypes.bool,
  };

  static defaultProps = {
    home: false,
  };

  render() {
    const { home } = this.props;
    return (
      <footer id="contact" className={cs(s.root, home && s.homeFooter)}>
        <div className={s.container}>
          <div className={s.logo}>
            <img src={logoUrl} alt="echo" />
          </div>
          <ul className={s.sns}>
            {renderSns()}
            <Wechat />
          </ul>
          <div className={s.copyright}>
            Copyright © ECHO Team 2014-2018 ECHO Contributors www.echo.com
          </div>
        </div>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
