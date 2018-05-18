/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import Personal from '../Personal';
import logoUrl from '../assets/logo.png';

class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              <img src={logoUrl} width="99" height="32" alt="echo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">首页</NavItem>
            <NavItem eventKey={2} href="#">ECHO介绍</NavItem>
            <NavItem eventKey={3} href="#">创始团队</NavItem>
            <NavItem eventKey={3} href="#">视点</NavItem>

          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">登录</NavItem>
            <NavItem eventKey={1} href="#">注册</NavItem>
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
