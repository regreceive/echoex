import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import TweenMax, { Power2 } from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import lang from './locales';
import s from './Ecology.scss';

class Ecology extends Component {
  constructor(...args) {
    super(...args);
    this.el = React.createRef();
    this.animated = false;
  }

  componentDidMount() {
    TweenMax.set($(this.el.current).find('dl'), { opacity: 0, y: '200' });
    TweenMax.set($(this.el.current).find('dd'), { opacity: 0 });
  }

  enterHandle = () => {
    if (this.animated) {
      return;
    }
    this.animated = true;
    TweenMax.staggerTo(
      $(this.el.current).find('dl'),
      1,
      { opacity: 1, y: 0, ease: Power2.easeOut },
      1,
    );

    TweenMax.staggerTo(
      $(this.el.current).find('dd'),
      3,
      { opacity: 1, delay: 1 },
      1,
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
        bottomOffset="50%"
      >
        <div className={s.root}>
          <div className={s.container} ref={this.el}>
            <h2>{title}</h2>
            <Grid>
              <Row>
                {contents.map(content => (
                  <dl className="col-sm-4 col-xs-12" key={content.label}>
                    <dt>{content.label}</dt>
                    <dd>{content.descr}</dd>
                  </dl>
                ))}
              </Row>
            </Grid>
          </div>
        </div>
      </Waypoint>
    );
  }
}

export default withStyles(s)(Ecology);
