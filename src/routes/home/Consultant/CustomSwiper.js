import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Swiper from 'swiper';
import cs from 'classnames';
import { CSSTransition } from 'react-transition-group';
import TweenMax, { Power2, Bounce } from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

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

    this.easeEl = React.createRef();
    this.animated = false;
  }

  state = { showResume: false };

  componentDidMount() {
    // this.swiper = new Swiper(this.el, params);
    const el = $(this.el).find('.swiper-slide')[0];
    this.arrow.style.left = `${el.offsetLeft + el.offsetWidth / 2}px`;

    TweenMax.set($(this.easeEl.current).find('[data-person]'), {
      y: 200,
      opacity: 0,
    });

    $('body').on('click', this.bodyClickHandle);
  }

  componentWillUnmount() {
    // this.swiper.destroy();
    $('body').off('click', this.bodyClickHandle);
  }

  bodyClickHandle = e => {
    const { length } = $(e.target).closest('.swiper-wrapper');
    if (length === 0) {
      this.setState({
        showResume: false,
      });
    }
  };

  clickHandle = intro => e => {
    const el = e.currentTarget;
    this.arrow.style.left = `${el.offsetLeft + el.offsetWidth / 2}px`;
    autotype(this.resume, intro);
    this.setState({ showResume: true });
  };

  enterHandle = () => {
    if (this.animated) {
      return;
    }
    this.animated = true;
    TweenMax.staggerTo(
      $(this.easeEl.current).find('[data-person]'),
      1,
      { opacity: 1, y: 0, ease: Power2.easeOut },
      0.5,
    );
  };

  leaveHandle = () => {};

  render() {
    const dict = lang();
    const { persons } = dict;
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="20%"
      >
        <div
          className="swiper-container"
          ref={el => {
            this.el = el;
          }}
        >
          <div
            className="swiper-wrapper"
            style={{ justifyContent: 'center' }}
            ref={this.easeEl}
          >
            {persons.map(person => (
              <div
                className="swiper-slide"
                key={person.name}
                onClick={this.clickHandle(person.intro)}
                style={{ width: '200px', marginRight: '40px' }}
              >
                <div className={s.person} data-person>
                  <img src={person.avatar} alt={person.name} />
                  <dl>
                    <dt>{person.name}</dt>
                    <dd>{person.duty}</dd>
                  </dl>
                </div>
              </div>
            ))}
          </div>
          <CSSTransition
            in={this.state.showResume}
            timeout={500}
            classNames="fade"
          >
            <div className={cs(s.resume, 'fade-exit-done')}>
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
          </CSSTransition>
          <div className={cs('swiper-pagination', s.customPagination)} />
        </div>
      </Waypoint>
    );
  }
}

export default withStyles(s)(CustomSwiper);
