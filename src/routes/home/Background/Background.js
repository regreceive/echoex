import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import lang from './locales';
import s from './Background.scss';
import canvas from './assets/canvas.png';

function Background() {
  const dict = lang();
  const { title, content } = dict;

  return (
    <div className={s.container}>
      <div className={s.canvas}><img src={canvas} /></div>
      <div className={s.descr}>
        <h2>{title}</h2>
        <ul dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default withStyles(s)(Background);
