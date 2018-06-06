import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Swiper from 'react-id-swiper/lib/custom';

import fl from './assets/fl.png';
import zn from './assets/zn.png';
import jw from './assets/jw.png';
import xp from './assets/xp.png';
import lw from './assets/lw.png';
import lk from './assets/lk.png';
import dy from './assets/dy.png';

import lang from './locales';
import s from './Team.scss';

const params = {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
};

function Team() {
  const dict = lang();
  const { title, persons } = dict;
  return (
    <div id="team" className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <Swiper {...params}>
          <Person
            portrait={fl}
            name={persons[0].name}
            duty={persons[0].duty}
            intro={persons[0].intro}
          />

          <Person
            portrait={zn}
            name={persons[1].name}
            duty={persons[1].duty}
            intro={persons[1].intro}
          />

          <Person
            portrait={jw}
            name={persons[2].name}
            duty={persons[2].duty}
            intro={persons[2].intro}
          />

          <Person
            portrait={xp}
            name={persons[3].name}
            duty={persons[3].duty}
            intro={persons[3].intro}
          />

          <Person
            portrait={lw}
            name={persons[4].name}
            duty={persons[4].duty}
            intro={persons[4].intro}
          />

          <Person
            portrait={lk}
            name={persons[5].name}
            duty={persons[5].duty}
            intro={persons[5].intro}
          />

          <Person
            portrait={dy}
            name={persons[6].name}
            duty={persons[6].duty}
            intro={persons[6].intro}
          />
        </Swiper>
      </div>
    </div>
  );
}

const Person = props => {
  const { portrait, name, duty, intro, ...swipeProps } = props;
  return (
    <div {...swipeProps}>
      <div className={s.person}>
        <img src={portrait} alt={name} />
        <span>{name}</span>
        <em>{duty}</em>
        <p>{intro}</p>
      </div>
    </div>
  );
};

Person.propTypes = {
  portrait: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  duty: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};

export default withStyles(s)(Team);
