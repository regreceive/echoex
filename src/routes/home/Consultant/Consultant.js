import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Swiper from 'react-id-swiper/lib/custom';

import vm from './assets/vm.png';
import dqz from './assets/dqz.png';
import dz from './assets/dz.png';
import wyh from './assets/wyh.png';

import lang from './locales';
import s from './Consultant.scss';

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

function Consultant() {
  const dict = lang();
  const { title, persons } = dict;
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <Swiper {...params}>
          <Person
            portrait={vm}
            name={persons[0].name}
            duty={persons[0].duty}
            intro={persons[0].intro}
          />

          <Person
            portrait={dqz}
            name={persons[1].name}
            duty={persons[1].duty}
            intro={persons[1].intro}
          />

          <Person
            portrait={dz}
            name={persons[2].name}
            duty={persons[2].duty}
            intro={persons[2].intro}
          />

          <Person
            portrait={wyh}
            name={persons[3].name}
            duty={persons[3].duty}
            intro={persons[3].intro}
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

export default withStyles(s)(Consultant);
