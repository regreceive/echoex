import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
    start(this.canvas);
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
        <div className={s.canvas}>
          <canvas ref={ref => (this.canvas = ref)} width="800" height="800" />
        </div>
        <div className={s.descr}>
          <h2>{title}</h2>
          <ul dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Background);
