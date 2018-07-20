import React from 'react';
import TweenMax, { Power2 } from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

class Brand extends React.Component {
  constructor(...args) {
    super(...args);

    this.easeEl = React.createRef();
    this.animated = false;
    this.logos = {};
    this.lang = $.noop;
    this.s = {};
    this.anchor = '';
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
    TweenMax.to(
      $(this.easeEl.current).find('[data-logo]'),
      1,
      { opacity: 1, y: 0, ease: Power2.easeOut },
      0.5,
    );
  };

  leaveHandle = () => {};

  render() {
    const dict = this.lang();
    const { title } = dict;
    const keys = Object.keys(this.logos);
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="20%"
      >
        <div>
          <div className={this.s.container} ref={this.easeEl} id={this.id}>
            <h2>{title}</h2>
            <div className={this.s.logos} data-logo>
              {keys.map(key => (
                <div className={this.s.unit} key={key}>
                  <img src={this.logos[key]} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Waypoint>
    );
  }
}

export default Brand;
