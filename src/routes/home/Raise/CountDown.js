import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Raise.scss';

class CountDown extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  };

  render() {
    const { start, end } = this.props;
    const diff = getTimeDif(end - start);

    return (
      <div className={s.elapse}>
        <span>{diff.day}</span>
        <span>天</span>
        <span>{diff.hour}</span>
        <span>:</span>
        <span>{diff.minute}</span>
        <span>:</span>
        <span>{diff.second}</span>
      </div>
    );
  }
}

function fill(num) {
  return num > 9 ? num.toString() : `0${num}`;
}

function getTimeDif(timeStamp) {
  let time = timeStamp / 1000;
  const second = fill(Math.floor(time % 60));
  time = Math.floor(time / 60);
  const minute = fill(time % 60);
  time = Math.floor(time / 60);
  const hour = fill(time % 60);
  const day = fill(Math.floor(time / 24));

  return { day, hour, minute, second };
}

export default withStyles(s)(CountDown);
