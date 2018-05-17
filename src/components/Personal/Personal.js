import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Personal.css';

class Personal extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={this.props.className}>
        <Link className={s.link} to="/login">
          登录
        </Link>
        <span className={s.spacer}>|</span>
        <Link className={s.link} to="/register">
          注册
        </Link>
        <span>
          [
          <a className={s.link} href="#">
            中
          </a>
          /
          <a className={s.link} href="#">
            EN
          </a>
          ]
        </span>
      </div>
    );
  }
}

export default withStyles(s)(Personal);
