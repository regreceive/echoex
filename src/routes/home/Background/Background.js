import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import preview from './assets/preview.png';
import lang from './locales';

import s from './Background.scss';

class Background extends React.Component {
  render() {
    const dict = lang();
    const { title, contents } = dict;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>{title}</h2>
          <div className={s.table}>
            <div className={s.descr}>
              {contents.map(content => (
                <dl key={content.dt}>
                  <dt>{content.dt}</dt>
                  <dd>{content.dd}</dd>
                </dl>
              ))}
            </div>
            <div className={s.demo}>
              <img src={preview} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Background);
