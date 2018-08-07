import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Effect from '../Effect';
import Bezier from '../Effect/Bezier';
import Star from '../Effect/Star';
import Smog from '../Effect/Smog';

import s from './Banner.scss';
import lang from './locales';

class Banner extends React.Component {
  render() {
    const dict = lang();
    const { title, whitePaper, link } = dict;

    return (
      <div className={s.root}>
        <Effect control={[Bezier, Star, Smog]}>
          <div className={s.planet}>
            <div className={s.container}>
              <div
                className={s.slogan}
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div className={s.btnWrap}>
                {/*<a href={link}>{whitePaper}</a>*/}
              </div>
            </div>
          </div>
        </Effect>
      </div>
    );
  }
}

export default withStyles(s)(Banner);
