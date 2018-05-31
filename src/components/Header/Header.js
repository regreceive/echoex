// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import queryString from 'query-string';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import logoUrl from '../../assets/logo.png';
import history from '../../history';
import { mapLocalesName } from '../../locales';

import s from './Header.css';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Header extends React.Component {
  static contextTypes = {
    query: PropTypes.object,
    pathname: PropTypes.string,
    login: PropTypes.object.isRequired,
  };

  static propTypes = {
    home: PropTypes.bool,
  };

  static defaultProps = {
    home: false,
  };

  constructor(props, context) {
    super(props, context);
    this.selectHandle = this.selectHandle.bind(this);
  }

  selectHandle(eventKey: number, event: Event) {
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    const { pathname } = event.target;
    if (pathname === '/logout') {
      // 退出,直接走链接
      this.context.login.out();
      return;
    }
    let query = queryString.stringify(
      Object.assign(
        {},
        this.context.query,
        queryString.parse(event.target.search),
      ),
    );
    query = query ? `?${query}` : query;
    const to = `${pathname}${query}`;

    if (this.context.pathname !== pathname) {
      history.push(to);
    } else {
      history.replace(to);
    }
    event.preventDefault();
  }

  toIndex() {
    let query = queryString.stringify(this.context.query);
    query = query ? `?${query}` : query;
    return `http://echoex.io/${query}`;
  }

  render() {
    const email = this.context.login.check();
    const { home } = this.props;
    return (
      <Navbar inverse collapseOnSelect className={home && s.absoluteBanner}>
        <Navbar.Header>
          <Navbar.Brand>
            <span>
              <img src={logoUrl} width="99" height="32" alt="echo" />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight onSelect={this.selectHandle}>
            {email && (
              <NavDropdown title={email} id="personal-center">
                <MenuItem href="/profile">{intl.get('PROFILE_TITLE')}</MenuItem>
                <MenuItem href="/logout">{intl.get('LOGOUT')}</MenuItem>
              </NavDropdown>
            )}
            {!email && <NavItem href="/login">{intl.get('LOGIN')}</NavItem>}
            {!email && (
              <NavItem href="/register">{intl.get('REGISTER')}</NavItem>
            )}
            <NavDropdown title={mapLocalesName()} id="language-you-choose">
              <MenuItem href="?lang=en-US">English</MenuItem>
              <MenuItem href="?lang=zh-CN">中文</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
