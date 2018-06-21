import React, { Component } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Label from 'react-bootstrap/lib/Label';

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

  render() {
    const email = this.context.login.check();
    const kyc = this.context.kyc.check();
    let bs = '';
    let kycMsg = '';

    switch (kyc) {
      case 0:
        bs = 'info';
        kycMsg = intl.get('KYC_AUTH_WAITING');
        break;
      case 1:
        bs = 'danger';
        kycMsg = intl.get('KYC_AUTH_FAILURE');
        break;
      case 2:
        bs = 'success';
        kycMsg = intl.get('KYC_AUTH_SUCCESS');
        break;
      default:
        bs = '';
        kycMsg = '';
    }

    return (
      <div className={s.user}>
        <span className="glyphicon glyphicon-user" />
        <span className={s.email}>{decorateEmail(email)}</span>
        <Label bsStyle={bs} className={s.kyc} title={kycMsg}>
          KYC
        </Label>
      </div>
    );
  }
}

export default withStyles(s)(User);
