import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';

import lang from './locales';
import s from './Ecology.scss';

function Ecology() {
  const dict = lang();
  const { title, images } = dict;

  return (
    <div className={s.container}>
      <h2>{title}</h2>
      <Row>
        <Col sm={4}>
          <div className={s.wrap}>
            <Image src={images.e1} responsive />
            <Image src={images.e1active} responsive />
          </div>
        </Col>
        <Col sm={4}>
          <div className={s.wrap}>
            <Image src={images.e2} responsive />
            <Image src={images.e2active} responsive />
          </div>
        </Col>
        <Col sm={4}>
          <div className={s.wrap}>
            <Image src={images.e3} responsive />
            <Image src={images.e3active} responsive />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default withStyles(s)(Ecology);
