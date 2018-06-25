// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FieldGroup from '../../components/Form/FieldGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import { login } from '../api';
import history from '../../history';
import Section from '../../components/Section';
import type { LoginFlowType } from '../../components/App';
import s from './Login.css';

export const expireHandle = (
  loginProvider: LoginFlowType,
  cb: void,
) => status => {
  if (status === 40001) {
    loginProvider.out();
    try {
      history.replace('/login');
    } catch(e) {}
  }

  try {
    if (typeof cb === 'function') {
      cb(status);
    }
  } catch (error) {
    if (__DEV__) {
      throw error;
    } else {
      console.warn(error);
    }
  }
};

const loginHandle = (loginProvider: LoginFlowType, email: string) => () => {
  loginProvider.in(email);
  history.replace('/');
};

class Login extends React.Component {
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
    const password = this.password.value;
    return login(this.context.fetch, { email, password })
      .then(loginHandle(this.context.login, this.email.value))
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
          <FieldGroup
            id="email"
            type="email"
            label={intl.get('EMAIL_DESCRIPTION')}
            inputRef={ref => {
              this.email = ref;
            }}
          />
          <FieldGroup
            id="password"
            type="password"
            label={intl.get('PASSWORD_DESCRIPTION')}
            inputRef={ref => {
              this.password = ref;
            }}
          />
          <SubmitGroup
            block
            title={intl.get('LOGIN_TITLE')}
            onSubmit={() => this.submitHandle()}
          />
          <Row>
            <Col xs={4}>
              <a href="/password/reset-link">{intl.get('FORGOT_PASSWORD')}</a>
            </Col>
            {help && (
              <Col xs={8} className="text-right text-danger">
                {help}
              </Col>
            )}
          </Row>
        </Form>
      </Section>
    );
  }
}

export default withStyles(s)(Login);
