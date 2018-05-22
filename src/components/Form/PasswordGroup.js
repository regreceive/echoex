import PropTypes from 'prop-types';
import React from 'react';
import intl from 'react-intl-universal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class PasswordGroup extends React.Component {
  static propTypes = {
    passwordRef: PropTypes.func.isRequired,
    passwordConfirmRef: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.getPwdValidationState = this.getPwdValidationState.bind(this);
    this.getPwdConfirmValidationState = this.getPwdConfirmValidationState.bind(this);
    this.pwdHandleChange = this.pwdHandleChange.bind(this);
    this.pwdConfirmHandleChange = this.pwdConfirmHandleChange.bind(this);
  }

  state = { pwd: '', pwdConfirm: '' };

  getPwdValidationState() {
    if (this.state.pwd === '') return null;
    return 'success';
  }

  getPwdConfirmValidationState() {
    if (this.state.pwdConfirm === '') return null;
    return this.state.pwd === this.state.pwdConfirm ? 'success' : 'error';
  }

  pwdHandleChange(e) {
    this.setState({ pwd: e.target.value });
  }

  pwdConfirmHandleChange(e) {
    this.setState({ pwdConfirm: e.target.value });
  }

  render() {
    const { passwordRef, passwordConfirmRef } = this.props;
    return (
      <div>
        <FormGroup validationState={this.getPwdValidationState()}>
          <ControlLabel>{intl.get('PASSWORD_DESCRIPTION')}</ControlLabel>
          <FormControl
            type="password"
            onChange={this.pwdHandleChange}
            value={this.state.pwd}
            inputRef={passwordRef}
          />
        </FormGroup>

        <FormGroup validationState={this.getPwdConfirmValidationState()}>
          <ControlLabel>
            {intl.get('PASSWORD_CONFIRM_DESCRIPTION')}
          </ControlLabel>
          <FormControl
            type="password"
            onChange={this.pwdConfirmHandleChange}
            value={this.state.pwdConfirm}
            inputRef={passwordConfirmRef}
          />
        </FormGroup>
      </div>
    );
  }
}

export default PasswordGroup;
