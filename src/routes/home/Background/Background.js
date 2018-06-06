import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';

import lang from './locales';
import { start, stop } from './Canvas';

import s from './Background.scss';
import canvas from './assets/canvas.png';

class Background extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    this.visibilitychangeHandle = this.visibilitychangeHandle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.visibilitychangeHandle);
  }

  componentWillUnmount() {
    stop();
    document.removeEventListener(
      'visibilitychange',
      this.visibilitychangeHandle,
    );
  }

  visibilitychangeHandle() {
    if (document.hidden) {
      stop();
    } else {
      start(this.canvas);
    }
  }

  render() {
    const dict = lang();
    const { title, content } = dict;
    return (
      <div className={s.container}>
        <h2>{title}</h2>
        <div className={s.canvas}>
          <Waypoint
            topOffset="10%"
            bottomOffset="10%"
            onEnter={() => start(this.canvas)}
            onLeave={() => stop()}
          >
            <canvas ref={ref => (this.canvas = ref)} width="800" height="800" />
          </Waypoint>
        </div>
        <div className={s.descr}>
          <ul dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Background);
