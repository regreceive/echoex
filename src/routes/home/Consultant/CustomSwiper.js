import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Swiper from 'swiper';
import cs from 'classnames';

import autotype from './autotype';
import lang from './locales';
import s from './Consultant.scss';

const params = {
  slidesPerView: 5,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
    922: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
};

class CustomSwiper extends Component {
  constructor(...args) {
    super(...args);

    // swiper容器
    this.el = null;
    // 简历容器
    this.resume = null;

    this.arrow = null;
  }
  componentDidMount() {
    // this.swiper = new Swiper(this.el, params);
  }

  componentWillUnmount() {
    // this.swiper.destroy();
  }

  clickHandle = intro => e => {
    const el = e.currentTarget;
    autotype(this.resume, intro);
    this.arrow.style.left = `${el.offsetLeft + el.offsetWidth / 2}px`;
  };

  render() {
    const dict = lang();
    const { persons } = dict;
    return (
      <div
        className="swiper-container"
        ref={el => {
          this.el = el;
        }}
      >
        <div className="swiper-wrapper" style={{justifyContent: 'center'}}>
          {persons.map(person => (
            <div
              className="swiper-slide"
              key={person.name}
              onClick={this.clickHandle(person.intro)}
              style={{width: '200px', marginRight: '40px'}}
            >
              <div className={s.person}>
                <img src={person.avatar} alt={person.name} />
                <dl>
                  <dt>{person.name}</dt>
                  <dd>{person.duty}</dd>
                </dl>
              </div>
            </div>
          ))}
        </div>
        <div className={s.resume}>
          <span
            ref={ref => {
              this.resume = ref;
            }}
          >
            {persons[0].intro}
          </span>
          <div
            className={s.arrow}
            ref={ref => {
              this.arrow = ref;
            }}
          />
        </div>
        <div className={cs('swiper-pagination', s.customPagination)} />
      </div>
    );
  }
}

export default withStyles(s)(CustomSwiper);
