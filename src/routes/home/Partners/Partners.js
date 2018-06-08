import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import * as logos from './assets';
import lang from './locales';
import s from './Partners.scss';

const partners = [
  { img: logos.block },
  { img: logos.yl },
  { img: logos.sm },
  { img: logos.inc },
  { img: logos.csl },
  { img: logos.wj },
  { img: logos.gvc },
  { img: logos.pusu },
  { img: logos.bam },
  { img: logos.dfj },
  { img: logos.zh },
  { img: logos.zy },
  { img: logos.zhsy },
  { img: logos.ztny },
  { img: logos.zhy },
  { img: logos.czb },
];

function Partners() {
  const dict = lang();
  const { title } = dict;
  return (
    <div id="partners" className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <Grid>
          <Row className={s.logos}>
            {partners.map((p, key) => <Logo img={p.img} key={key} />)}
          </Row>
        </Grid>
      </div>
    </div>
  );
}

const Logo = props => {
  const { img } = props;
  return (
    <Col xs={4} md={3}>
      <img src={img} />
    </Col>
  );
};

Logo.propTypes = {
  img: PropTypes.string.isRequired,
};

export default withStyles(s)(Partners);
