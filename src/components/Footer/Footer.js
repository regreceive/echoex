// @flow

import React from 'react';
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
  componentDidMount() {}

  render() {
    return (
      <footer className={cs('container-fluid', s.root)}>
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
