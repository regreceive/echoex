import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Section from '../../components/Section';
import EmailFieldGroup from '../../components/Form/EmailFieldGroup';
import PasswordGroup from '../../components/Form/PasswordGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import Captcha from '../../components/Form/Captcha';
import { recover } from '../api';

import s from './PasswordRecover.css';
import history from '../../history';

const Reply = () => {
  return <h5>{intl.get('JOIN_ECHO_REPLY')}</h5>;
};

class PasswordRecover extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func,
    query: PropTypes.object,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.email = null;
    this.captcha = null;
    this.password = null;
    this.passwordConfirm = null;
  }

  state = { help: '', sent: false };

  submitHandle() {
    const email = this.email.value;
    const captcha = this.captcha.value;
    const password = this.password.value;
    const passwordConfirm = this.passwordConfirm.value;
    const { code } = this.context.query;

    return recover(this.context.fetch, {
      code,
      email,
      captcha,
      password,
      password_confirm: passwordConfirm,
    })
      .then(() => {
        this.setState({ sent: true });
      })
      .catch(status => {
        try {
          this.setState({ help: intl.get(status) });
        } catch (error) {
          if (__DEV__) {
            throw error;
          } else {
            console.warn(error);
          }
        }
      });
  }

  edit() {
    const { help } = this.state;
    return (
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
          title={intl.get('SUBMIT')}
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
    );
  }

  render() {
    const { sent } = this.state;
    const title = sent ? '' : this.props.title;

    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={title}
      >
        {!sent && this.edit()}
        {sent && <Reply />}
      </Section>
    );
  }
}

export default withStyles(s)(PasswordRecover);
