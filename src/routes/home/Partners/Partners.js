import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as logos from './assets';
import lang from './locales';
import s from './Partners.scss';

const data = Object.keys(logos);

function Partners() {
  const dict = lang();
  const { title } = dict;
  return (
    <div id="partners" className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <div className={s.logos}>
          {data.map(name => <Logo img={logos[name]} key={name} />)}
        </div>
      </div>
    </div>
  );
}

const Logo = props => {
  const { img } = props;
  return (
    <div className={s.unit}>
      <img src={img} alt="" />
    </div>
  );
};

Logo.propTypes = {
  img: PropTypes.string.isRequired,
};

export default withStyles(s)(Partners);
