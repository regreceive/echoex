import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TweenMax, { Power2 } from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import * as logos from './assets';
import lang from './locales';
import s from './Organization.scss';

const data = Object.keys(logos);
class Organization extends React.Component {
  constructor(...args) {
    super(...args);

    this.easeEl = React.createRef();
    this.animated = false;
  }

  componentDidMount() {
    TweenMax.set($(this.easeEl.current).find('[data-logo]'), {
      y: 200,
      opacity: 0,
    });
  }

  enterHandle = () => {
    if (this.animated) {
      return;
    }
    this.animated = true;
    TweenMax.staggerTo(
      $(this.easeEl.current).find('[data-logo]'),
      1,
      { opacity: 1, y: 0, ease: Power2.easeOut },
      0.5,
    );
  };

  leaveHandle = () => {};

  render() {
    const dict = lang();
    const { title } = dict;
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="50%"
      >
        <div className={s.root}>
          <div className={s.container} ref={this.easeEl}>
            <h2>{title}</h2>
            <div className={s.logos} data-logo>
              {data.map(name => <Logo img={logos[name]} key={name} />)}
            </div>
          </div>
        </div>
      </Waypoint>
    );
  }
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

export default withStyles(s)(Organization);
