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
  }

  componentDidMount() {
    start(this.canvas);
  }

  componentWillUnmount() {
    stop();
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
