import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import btnJ from './assets/jsbp.png';
import btnY from './assets/yybp.png';
import s from './Banner.scss';
import lang from './locales';

function Banner() {
  const dict = lang();
  const { title, btn1, btn2, link1, link2 } = dict;

  return (
    <div className={s.banner}>
      <div className={s.container}>
        <div className={s.slogan} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={s.btnWrap}>
          <a href={link1}>
            <img src={btn1} alt="" />
          </a>
          <a href={link2}>
            <img src={btn2} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Banner);
