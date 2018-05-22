import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Section from '../../components/Section';
import { profile } from '../api';
import history from '../../history';
import FieldGroup from '../../components/Form/FieldGroup';
import s from './Profile.css';

class Login extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { help: '' };
  }

  componentDidMount() {
    profile(this.context.fetch)
      .then(data => {
        this.profile = data || {};
      })
      .catch(status => {
        if (status === 40001) {
          this.context.login.out();
          history.replace('/login');
        }
        this.setState({ help: intl.get(status) });
      });
    this.email = this.context.login.check();
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <h2>{intl.get('ACCOUNT')}</h2>
        <Row>
          <Col xs={3}>{intl.get('EMAIL')}</Col>
          <Col xs={9}>{this.email || this.context.login.check()}</Col>
        </Row>
        <Row>
          <Col xs={3}>{intl.get('PASSWORD_DESCRIPTION')}</Col>
          <Col xs={9}>******</Col>
        </Row>

        <h2>{intl.get('KYC_TITLE')}</h2>
        <Row>
          <Col xs={3}>{intl.get('KYC_AUTH')}</Col>
          <Col xs={9}>
            {1 ? intl.get('KYC_AUTH_DONE') : intl.get('KYC_AUTH_WAITING')}
          </Col>
        </Row>

        <form>
          <FieldGroup id="name" label={intl.get('NAME')} />
          <FieldGroup id="firstname" label={intl.get('FIRST_NAME')} />
          <FieldGroup id="lastname" label={intl.get('LAST_NAME')} />
        </form>
      </Section>
    );
  }
}

export default withStyles(s)(Login);
