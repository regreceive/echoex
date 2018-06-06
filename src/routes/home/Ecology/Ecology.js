import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import cs from 'classnames';

import { Mobile, Default } from '../../../deviceSwith';
import lang from './locales';
import s from './Ecology.scss';

const ForPC = () => {
  const dict = lang();
  const { images } = dict;
  return (
    <Row>
      <Col xs={12} sm={4}>
        <div className={s.wrap}>
          <Image src={images.e1} responsive />
          <Image src={images.e1active} responsive />
        </div>
      </Col>
      <Col xs={12} sm={4}>
        <div className={s.wrap}>
          <Image src={images.e2} responsive />
          <Image src={images.e2active} responsive />
        </div>
      </Col>
      <Col xs={12} sm={4}>
        <div className={s.wrap}>
          <Image src={images.e3} responsive />
          <Image src={images.e3active} responsive />
        </div>
      </Col>
    </Row>
  );
};

const ForMobile = () => {
  const dict = lang();
  const { collection, p2p, echain } = dict;
  return (
    <Row>
      <Col xs={12} className={s.m}>
        <div className={cs(s.icon, s.icon1)} />
        <h3>{collection.label}</h3>
        <p>{collection.descr}</p>
      </Col>
      <Col xs={12} className={s.m}>
        <div className={cs(s.icon, s.icon2)} />
        <h3>{p2p.label}</h3>
        <p>{p2p.descr}</p>
      </Col>
      <Col xs={12} className={s.m}>
        <div className={cs(s.icon, s.icon3)} />
        <h3>{echain.label}</h3>
        <p>{echain.descr}</p>
      </Col>
    </Row>
  );
};

function Ecology() {
  const dict = lang();
  const { title } = dict;

  return (
    <div className={s.container}>
      <h2>{title}</h2>
      <Grid>
        <Default>
          <ForPC />
        </Default>

        <Mobile>
          <ForMobile />
        </Mobile>
      </Grid>
    </div>
  );
}

export default withStyles(s)(Ecology);
