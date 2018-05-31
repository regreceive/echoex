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
import cs from 'classnames';

// external-global styles must be imported in your JS.
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';

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
        <Header home={home} />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
