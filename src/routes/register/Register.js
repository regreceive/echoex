import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import EmailFieldGroup from '../../components/Form/EmailFieldGroup';
import PasswordGroup from '../../components/Form/PasswordGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import { register } from '../api';
import history from '../../history';
import Section from '../../components/Section';
import Captcha from './Captcha';
import { expireHandle } from '../login/Login';
import s from './Register.css';

class Register extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = { help: '' };

  submitHandle() {
    const email = this.email.value;
    const captcha = this.captcha.value;
    const password = this.password.value;
    const passwordConfirm = this.passwordConfirm.value;

    return register(this.context.fetch, {
      email,
      captcha,
      password,
      password_confirm: passwordConfirm,
    })
      .then(() => history.replace('/register/validation', { email }))
      .catch(
        expireHandle(this.context.login, status => {
          this.setState({ help: intl.get(status) });
        }),
      );
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <Form>
          <EmailFieldGroup
            id="email"
            type="email"
            label={intl.get('EMAIL_DESCRIPTION')}
            inputRef={ref => {
              this.email = ref;
            }}
          />

          <Captcha
            label={intl.get('CAPTCHA')}
            inputRef={ref => {
              this.captcha = ref;
            }}
            btnClassName={s.btn}
            addonClassName={s.addon}
            captchaClassName={s.captcha}
            refreshCaptcha={() => {
              this.captchaImg.src = `/api/captcha/send?scenario=reg&${Math.random()}`;
            }}
            imgRef={ref => {
              this.captchaImg = ref;
            }}
          />

          <PasswordGroup
            passwordRef={ref => {
              this.password = ref;
            }}
            passwordConfirmRef={ref => {
              this.passwordConfirm = ref;
            }}
          />

          <SubmitGroup
            block
            title={intl.get('REGISTER_TITLE')}
            onSubmit={() => this.submitHandle()}
          />
          <Row>
            {help && (
              <Col xs={12} className="text-right text-danger">
                {help}
              </Col>
            )}
          </Row>
        </Form>
      </Section>
    );
  }
}

export default withStyles(s)(Register);
