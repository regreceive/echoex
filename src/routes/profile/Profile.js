// @flow

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
import serialize from './serialize';
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
    this.email = this.context.login.check();
  }

  submitHandle(): Promise {
    const fd = serialize(this.profileForm);
    return profilePost(this.context.fetch, fd)
      .then(data => {
        this.profile = data || {};
      })
      .catch(status => {
        if (status === 40001) {
          this.context.login.out();
          history.replace('/login');
        }
        console.log(status);
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

        <form
          ref={ref => {
            this.profileForm = ref;
          }}
        >
          <FieldGroup id="name" type="text" label={intl.get('NAME')} />
          <FieldGroup
            id="firstname"
            type="text"
            label={intl.get('FIRST_NAME')}
          />
          <FieldGroup id="lastname" type="text" label={intl.get('LAST_NAME')} />
          <RadioGroup label={intl.get('GENDER')}>
            <Row>
              <Col xs={12}>
                <Radio name="gender" value="1" inline>
                  {intl.get('MALE')}
                </Radio>
                <Radio name="gender" value="0" inline>
                  {intl.get('FEMALE')}
                </Radio>
              </Col>
            </Row>
          </RadioGroup>
          <FieldGroup id="birthday" label={intl.get('BIRTHDAY')} type="date" />
          <h3>{intl.get('INTERNATIONAL_INFORMATION')}</h3>
          <FieldGroup
            id="country"
            type="text"
            label={intl.get('COUNTRY')}
          />{' '}
          <FieldGroup id="city" type="text" label={intl.get('CITY')} />{' '}
          <FieldGroup id="location" type="text" label={intl.get('LOCATION')} />
          <FieldGroup
            id="passport_id"
            type="text"
            label={intl.get('PASSPORT_ID')}
          />
          <FieldGroup
            id="passport01"
            type="file"
            label={intl.get('PASSPORT_FULL_FACE')}
          />
          <FieldGroup
            id="passport02"
            type="file"
            label={intl.get('PASSPORT_BACK')}
          />
          <SubmitGroup
            title={intl.get('PROFILE_SUBMIT')}
            onClick={() => this.submitHandle()}
          />
          <Row>
            {help && (
              <Col xs={12} className="text-right text-danger">
                {help}
              </Col>
            )}
          </Row>
        </form>
      </Section>
    );
  }
}

export default withStyles(s)(Login);
