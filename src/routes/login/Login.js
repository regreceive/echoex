// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FieldGroup from '../../components/Form/FieldGroup';
import { login } from '../api';
import history from '../../history';
import Section from '../../components/Section';
import s from './Login.css';

class Login extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { help: '' };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const email = this.email.value;
    const password = this.password.value;
    login(this.context.fetch, { email, password })
      .then(data => history.replace('/home'))
      .catch(status => {
        this.setState({ help: intl.get(status) });
      });
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <Form horizontal>
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
          <FormGroup>
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              onClick={this.submit}
            >
              {intl.get('LOGIN_TITLE')}
            </Button>
          </FormGroup>
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
