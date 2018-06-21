import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Label from 'react-bootstrap/lib/Label';

import { KycType } from '../../App';
import s from './User.css';

class User extends Component {
  static contextTypes = {
    login: PropTypes.object.isRequired,
    kyc: PropTypes.shape(KycType),
  };

  render() {
    const email = this.context.login.check();
    const kyc = this.context.kyc.check();
    let bs = 'success';
    if (kyc === 0 || kyc === 1) {
      bs = 'danger';
    } else {
      bs = 'success';
    }

    return (
      <div className={s.user}>
        <span className="glyphicon glyphicon-user" />
        <span className={s.email}>{email}</span>
        <Label bsStyle={bs} className={s.kyc} title="kyc">
          KYC
        </Label>
      </div>
    );
  }
}

export default withStyles(s)(User);
