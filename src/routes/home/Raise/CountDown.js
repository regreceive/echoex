import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Raise.scss';

function fill(num) {
  return num > 9 ? num.toString() : `0${num}`;
}

function timeDiff(timeStamp) {
  if (timeStamp <= 0) {
    return { day: '00', hour: '00', minute: '00', second: '00' };
  }
  let time = Math.floor(timeStamp / 1000);
  const second = fill(time % 60);
  time = Math.floor(time / 60);
  const minute = fill(time % 60);
  time = Math.floor(time / 60);
  const hour = fill(time % 24);
  const day = fill(Math.floor(time / 24));

  return { day, hour, minute, second };
}

function sleep(dely) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), dely);
  });
}

class CountDown extends Component {
  static propTypes = {
    deadline: PropTypes.number.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.allowDida = false;
  }

  state = { now: Date.now() };

  componentDidMount() {
    this.allowDida = true;
    this.dida();
  }

  componentWillUnmount() {
    this.allowDida = false;
  }

  async dida() {
    if (this.props.deadline <= this.state.now) {
      return;
    }

    while (1) {
      await sleep(1000);
      if (!this.allowDida) {
        return;
      }
      this.setState({ now: Date.now() });
    }
  }

  render() {
    const { deadline } = this.props;
    const { now } = this.state;
    const diff = timeDiff(deadline - now);

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

export default withStyles(s)(CountDown);
