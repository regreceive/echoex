import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TweenMax, { Power2 } from 'gsap';
import Waypoint from 'react-waypoint';
import { CSSTransition } from 'react-transition-group';
import $ from 'jquery';

import Effect from '../Effect';
import Meteor from '../Effect/Meteor';
import lang from './locales';
import { Default, Mobile } from '../../../deviceSwith';
import s from './Principle.scss';

let dict;
const meteor = Meteor();

class Principle extends React.Component {
  constructor(...args) {
    super(...args);
    this.el = React.createRef();
    this.animated = false;
  }

  state = { selectedIndex: 0 };

  componentDidMount() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      TweenMax.set($(this.el.current).find('li'), { opacity: 0, x: '-200' });
      TweenMax.set($(this.el.current).find('.content'), {
        scale: 2.5,
        opacity: 0,
      });
    } else {
      TweenMax.set($(this.el.current).find('dl'), { opacity: 0, y: '200' });
      TweenMax.set($(this.el.current).find('dd'), { opacity: 0 });
    }
  }

  enterHandle = () => {
    if (this.animated) {
      return;
    }
    this.animated = true;

    if (window.matchMedia('(min-width: 768px)').matches) {
      TweenMax.staggerTo(
        $(this.el.current).find('li'),
        1,
        { opacity: 1, x: 0, ease: Power2.easeOut },
        0.2,
      );

      TweenMax.to($(this.el.current).find('.content'), 0.5, {
        scale: 1,
        opacity: 1,
        delay: 2,
        onComplete() {
          $(this.el.current)
            .find('.content')
            .removeAttr('style');
        },
        onCompleteScope: this,
      });
    } else {
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
    }
  };

  leaveHandle = () => {};

  menuClickHandle = i => () => {
    this.setState({ selectedIndex: i });
  };

  render() {
    dict = lang();
    const { title, menus } = dict;
    const { selectedIndex } = this.state;
    return (
      <Waypoint
        onEnter={this.enterHandle}
        onLeave={this.leaveHandle}
        bottomOffset="50%"
      >
        <div className={s.root}>
          <Effect control={[meteor]}>
            <div className={s.container} ref={this.el}>
              <h2>{title}</h2>

              <div className={s.table}>
                <Default>
                  <div className={s.menu}>
                    <ul>
                      {menus.map((menu, i) => (
                        <li
                          key={menu}
                          className={i === selectedIndex ? s.active : ''}
                          onClick={this.menuClickHandle(i)}
                        >
                          <span>{menu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.section}>
                    <Section selectedIndex={selectedIndex} />
                  </div>
                </Default>

                <Mobile>
                  <div className={s.section}>
                    <SectionForM />
                  </div>
                </Mobile>
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
  return (
    <React.Fragment>
      {sections.map((section, index) => (
        <CSSTransition
          in={props.selectedIndex === index}
          timeout={1200}
          classNames="fade"
          key={section.id}
          unmountOnExit
        >
          <div className="content">
            <dl className={s[`icon_${index + 1}`]}>
              <dt>{section.t1}</dt>
              <dd>{section.d1}</dd>
            </dl>
            {section.t2 && (
              <dl className={s[`icon_${index + 1}_impl`]}>
                <dt>{section.t2}</dt>
                <dd>{section.d2}</dd>
              </dl>
            )}
          </div>
        </CSSTransition>
      ))}
    </React.Fragment>
  );
}

Section.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
};

function SectionForM() {
  const { sections } = dict;
  return (
    <React.Fragment>
      {sections.map((section, index) => (
        <div key={section.id}>
          <dl className={s[`icon_${index + 1}`]}>
            <dt>{section.t1}</dt>
            <dd>{section.d1}</dd>
          </dl>
          {section.t2 && (
            <dl className={s[`icon_${index + 1}_impl`]}>
              <dt>{section.t2}</dt>
              <dd>{section.d2}</dd>
            </dl>
          )}
        </div>
      ))}
    </React.Fragment>
  );
}

export default withStyles(s)(Principle);
