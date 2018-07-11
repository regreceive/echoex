import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cs from 'classnames';
import Swiper from 'react-id-swiper';

import lang from './locales';
import { Default, Mobile } from '../../../deviceSwith';
import s from './Principle.scss';

let dict;
const params = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

class Principle extends React.Component {
  state = { index: 0 };

  menuClickHandle = i => () => {
    this.setState({ index: i });
  };

  render() {
    dict = lang();
    const { title, menus } = dict;
    const { index } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
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
      </div>
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
