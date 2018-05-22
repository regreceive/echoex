import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Radio from 'react-bootstrap/lib/Radio';
import Section from '../../components/Section';
import { profile, profilePost } from '../api';
import history from '../../history';
import PanelGroup from '../../components/Form/PanelGroup';
import FieldGroup from '../../components/Form/FieldGroup';
import RadioGroup from '../../components/Form/RadioGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
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

  submit() {
    profilePost(this.context.fetch)
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
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <PanelGroup header={intl.get('ACCOUNT')}>
          <Row>
            <Col xs={3}>{intl.get('EMAIL')}</Col>
            <Col xs={9}>{this.email || this.context.login.check()}</Col>
          </Row>
          <Row>
            <Col xs={3}>{intl.get('PASSWORD_DESCRIPTION')}</Col>
            <Col xs={9}>******</Col>
          </Row>
        </PanelGroup>

        <PanelGroup header={intl.get('KYC_TITLE')}>
          <Row>
            <Col xs={3}>{intl.get('KYC_AUTH')}</Col>
            <Col xs={9}>
              {1 ? intl.get('KYC_AUTH_DONE') : intl.get('KYC_AUTH_WAITING')}
            </Col>
          </Row>
        </PanelGroup>

        <form>
          <FieldGroup id="name" label={intl.get('NAME')} />
          <FieldGroup id="firstname" label={intl.get('FIRST_NAME')} />
          <FieldGroup id="lastname" label={intl.get('LAST_NAME')} />
          <RadioGroup label={intl.get('GENDER')}>
            <Row>
              <Col xs={12}>
                <Radio name="gender" inline>
                  {intl.get('MALE')}
                </Radio>
                <Radio name="gender" inline>
                  {intl.get('FEMALE')}
                </Radio>
              </Col>
            </Row>
          </RadioGroup>
          <FieldGroup id="birthday" label={intl.get('BIRTHDAY')} type="date" />
          <h3>{intl.get('INTERNATIONAL_INFORMATION')}</h3>
          <FieldGroup id="country" label={intl.get('COUNTRY')} />{' '}
          <FieldGroup id="city" label={intl.get('CITY')} />{' '}
          <FieldGroup id="location" label={intl.get('LOCATION')} />
          <FieldGroup id="passport_id" label={intl.get('PASSPORT_ID')} />
          <FieldGroup id="passport01" type="file" label="护照正面" />
          <FieldGroup id="passport02" type="file" label="护照背面" />
          <SubmitGroup title={intl.get('PROFILE_SUBMIT')} />
        </form>
      </Section>
    );
  }
}

export default withStyles(s)(Login);
