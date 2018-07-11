import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';
import throttle from 'lodash/throttle';

import s from './Effect.scss';

class Effect extends Component {
  static propTypes = {
    control: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        updateCanvas: PropTypes.func.isRequired,
        init: PropTypes.func.isRequired,
        start: PropTypes.func.isRequired,
        stop: PropTypes.func.isRequired,
      }),
    ).isRequired,
    children: PropTypes.element.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.canvas = [];
    this.isWayStop = true;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandle);
    document.addEventListener('visibilitychange', this.visibilityChangeHandle);
    this.resizeHandle();
    this.props.control.forEach((c, index) => {
      c.updateCanvas(this.canvas[index]);
      c.init();
    });
  }

  componentWillUnmount() {
    this.resizeHandle.cancel();
    window.removeEventListener('resize', this.resizeHandle);
    document.removeEventListener(
      'visibilitychange',
      this.visibilitychangeHandle,
    );
  }

  resizeHandle = throttle(() => {
    this.props.control.forEach((c, index) => {
      this.canvas[index].width = this.canvas[index].clientWidth;
      this.canvas[index].height = this.canvas[index].clientHeight;
      c.updateCanvas(this.canvas[index]);
      c.resize();
    });
  }, 300);

  visibilityChangeHandle = () => {
    if (document.hidden) {
      this.props.control.forEach(c => {
        c.stop();
      });
    } else if (!this.isWayStop) {
      this.props.control.forEach(c => {
        c.start();
      });
    }
  };

  enterHandle = () => {
    console.log('start');
    this.isWayStop = false;
    this.props.control.forEach(c => {
      c.start();
    });
  };

  leaveHandle = () => {
    console.log('stop');
    this.isWayStop = true;
    this.props.control.forEach(c => {
      c.stop();
    });
  };

  render() {
    this.canvas.length = 0;
    return (
      <Waypoint onEnter={this.enterHandle} onLeave={this.leaveHandle}>
        <div className={s.container}>
          {this.props.control.map(c => (
            <canvas
              key={c.name}
              ref={ref => {
                this.canvas.push(ref);
              }}
            />
          ))}
          {this.props.children}
        </div>
      </Waypoint>
    );
  }
}

export default withStyles(s)(Effect);
