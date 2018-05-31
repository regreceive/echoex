import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import lang from './locales';
import s from './Background.scss';

function Background() {
  const dict = lang();
  const { title, content } = dict;

  return (
    <div className={s.container}>
      <div className={s.canvas}>123</div>
      <div className={s.descr}>
        <h2>{title}</h2>
        <ul dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default withStyles(s)(Background);
