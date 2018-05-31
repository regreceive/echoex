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
    <a href={row.url} key={key}>
      <img src={row.icon} width="45" height="45" />
    </a>
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
      <footer
        id="contact"
        className={cs('container-fluid', s.root, home && s.homeFooter)}
      >
        <Grid>
          <Row className={s.firstRow}>
            <Col className={s.logoContainer}>
              <img src={logoUrl} width="184" height="60" alt="echo" />
            </Col>
            <Col className={s.sns}>
              {renderSns()}
              <Wechat />
            </Col>
          </Row>
          <Row className={s.copyright}>
            Copyright © ECHO Team 2014-2018 ECHO Contributors <br />
            www.echo.com
          </Row>
        </Grid>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
