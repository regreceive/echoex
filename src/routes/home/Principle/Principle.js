import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TweenMax from 'gsap';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import Effect from '../Effect';
import Meteor from '../Effect/Meteor';
import lang from './locales';
import { Default, Mobile } from '../../../deviceSwith';
import s from './Principle.scss';

let dict;
const meteor = Meteor();
class Principle extends React.Component {
  state = { index: 0 };

  constructor(...args) {
    super(...args);
    this.el = React.createRef();
    this.animated = false;
  }

  componentDidMount() {
   // TweenMax.set($('dl', this.el.current), { opacity: 0 });
  }

  enterHandle = () => {

  };

  leaveHandle = () => {};

  menuClickHandle = i => () => {
    this.setState({ index: i });
  };

  render() {
    dict = lang();
    const { title, menus } = dict;
    const { index } = this.state;
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="80%"
      >
        <div className={s.root}>
          <Effect control={[meteor]}>
            <div className={s.container} ref={this.el}>
              <h2>{title}</h2>

              <div className={s.table}>
                <div className={s.menu}>
                  <ul>
                    {menus.map((menu, i) => (
                      <li
                        key={menu}
                        className={i === index ? s.active : ''}
                        onClick={this.menuClickHandle(i)}
                      >
                        <span>{menu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.section}>
                  <Section index={index} />
                </div>
              </div>
            </div>
          </Effect>
        </div>
      </Waypoint>
    );
  }
}

function Section(props) {
  const { sections } = dict;
  const section = sections[props.index];
  return (
    <React.Fragment>
      <dl className={s[`icon_${props.index + 1}`]}>
        <dt>{section.t1}</dt>
        <dd>{section.d1}</dd>
      </dl>
      {section.t2 && (
        <dl className={s[`icon_${props.index + 1}_impl`]}>
          <dt>{section.t2}</dt>
          <dd>{section.d2}</dd>
        </dl>
      )}
    </React.Fragment>
  );
}

Section.propTypes = {
  index: PropTypes.number.isRequired,
};

export default withStyles(s)(Principle);
