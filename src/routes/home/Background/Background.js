import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TweenMax from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import Effect from '../Effect';
import Meteor from '../Effect/Meteor';
import preview from './assets/preview.png';
import lang from './locales';

import s from './Background.scss';

const meteor = Meteor();
class Background extends React.Component {
  constructor(...args) {
    super(...args);
    this.el = React.createRef();
    this.animated = false;
  }

  componentDidMount() {
    TweenMax.set($('dl', this.el.current), { opacity: 0 });
  }

  enterHandle = () => {
    if (this.animated) {
      return;
    }
    this.animated = true;
    TweenMax.staggerFromTo(
      $('dl', this.el.current),
      1,
      { opacity: 0, y: 200, delay: 0.5 },
      { opacity: 1, y: 0 },
      0.3,
    );
  };

  leaveHandle = () => {};

  render() {
    const dict = lang();
    const { title, contents } = dict;
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="80%"
      >
        <div className={s.root}>
          <Effect control={[meteor]}>
            <div className={s.container}>
              <h2
                ref={ref => {
                  this.headline = ref;
                }}
              >
                {title}
              </h2>
              <div className={s.table} ref={this.el}>
                <div className={s.descr}>
                  {contents.map(content => (
                    <dl key={content.dt}>
                      <dt>{content.dt}</dt>
                      <dd>{content.dd}</dd>
                    </dl>
                  ))}
                </div>
                <div className={s.demo}>
                  <img src={preview} />
                </div>
              </div>
            </div>
          </Effect>
        </div>
      </Waypoint>
    );
  }
}

export default withStyles(s)(Background);
