import React, { Component } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';

import history from '../../../history';
import { KycType } from '../../App';
import s from './User.css';

function decorateEmail(email) {
  return email.length >= 7
    ? `${email.slice(0, 3)}****${email.slice(-3)}`
    : email;
}

class User extends Component {
  static contextTypes = {
    login: PropTypes.object.isRequired,
    kyc: PropTypes.shape(KycType),
  };

  state = { kyc: 0 };

  componentWillMount() {
    this.context.kyc.sync().then(kyc => {
      this.setState({ kyc });
    });
  }

  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    history.replace('/');
  };

  render() {
    const email = this.context.login.check();
    const { kyc } = this.state;
    let bs = 'info';
    let kycMsg = '';

    switch (kyc) {
      case 3:
        bs = 'info';
        kycMsg = intl.get('KYC_AUTH_WAITING');
        break;
      case 1:
        bs = 'success';
        kycMsg = intl.get('KYC_AUTH_SUCCESS');
        break;
      case 2:
        bs = 'danger';
        kycMsg = intl.get('KYC_AUTH_FAILURE');
        break;
      default:
        bs = 'info';
        kycMsg = '';
    }

    return (
      <div className={s.user}>
        <span className="glyphicon glyphicon-user" />
        <span className={s.email}>{decorateEmail(email)}</span>
        <Button
          bsStyle={bs}
          bsSize="xsmall"
          title={kycMsg}
          onClick={this.handleClick}
        >
          KYC
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(User);
