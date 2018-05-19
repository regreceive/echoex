// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import s from './Header.css';
import logoUrl from '../../assets/logo.png';
import history from '../../history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
class Header extends React.Component {
  onSelect(eventKey: number, event: Event) {
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    let to: string;
    switch (eventKey) {
      case 1:
        to = '/login';
        break;
      case 2:
        to = '/register';
        break;
      default:
        return;
    }
    history.push(to);
    event.preventDefault();
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <span>
              <img src={logoUrl} width="99" height="32" alt="echo" />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight onSelect={this.onSelect}>
            <NavItem eventKey={1} href="/login">
              登录
            </NavItem>
            <NavItem eventKey={2} href="/register">
              注册
            </NavItem>
            <NavDropdown eventKey={3} title="Language" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>中文</MenuItem>
              <MenuItem eventKey={3.2}>English</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
