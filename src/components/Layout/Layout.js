/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MediaQuery from 'react-responsive';

// external-global styles must be imported in your JS.
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';

// 首页有自己的导航条，但在小屏幕下，会隐藏自己，使用bootstrap的导航条
const MobileForHome = props => {
  const { home, ...mProps } = props;
  return home ? <MediaQuery {...mProps} maxWidth={992} /> : props.children;
};

MobileForHome.propTypes = {
  home: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    home: PropTypes.bool,
  };

  static defaultProps = {
    home: false,
  };

  render() {
    const { home } = this.props;
    return (
      <div className={s.root}>
        <MobileForHome home={home}>
          <Header home={home} />
        </MobileForHome>
        <main className={s.main}>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
