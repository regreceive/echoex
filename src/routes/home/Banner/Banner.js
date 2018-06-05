import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Banner.scss';
import lang from './locales';

function Banner() {
  const dict = lang();
  const { title, whitePaper, link } = dict;

  return (
    <div className={s.banner}>
      <div className={s.container}>
        <div className={s.slogan} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={s.btnWrap}>
          <a href={link}>{whitePaper}</a>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Banner);
