import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Waypoint from 'react-waypoint';
import cs from 'classnames';

import s from './Banner.scss';
import lang from './locales';

class Banner extends React.Component {
  render() {
    const dict = lang();
    const { title, whitePaper, link } = dict;

    return (
      <div className={cs(s.banner, s.init)} ref="banner">
        <div className={s.container}>
          <div
            className={s.slogan}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={s.btnWrap}>
            <Waypoint
              onEnter={props => {
                this.refs.banner.className = s.banner;
              }}
            >
              <a href={link}>{whitePaper}</a>
            </Waypoint>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Banner);
