// @flow

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Section from '../../components/Section';
import { profile } from '../api';
import PanelGroup from '../../components/Form/PanelGroup';
import { expireHandle } from '../login/Login';
import Edit from './Edit';
import View from './View';

import s from './Profile.css';

class Profile extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    profile(this.context.fetch)
      .then(data => {
        this.setState({ profile: data || {} });
      })
      .catch(expireHandle(this.context.login));
  }

  onSubmittedHandle() {
    profile(this.context.fetch)
      .then(data => {
        this.setState({ profile: data || {} });
      })
      .catch(expireHandle(this.context.login));
  }

  render() {
    const { status } = this.state.profile;
    this.email = this.email || this.context.login.check();
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <PanelGroup header={intl.get('ACCOUNT')}>
          <Row>
            <Col xs={3}>{intl.get('EMAIL')}</Col>
            <Col xs={9}>{this.email}</Col>
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
              {status === 0 && intl.get('KYC_AUTH_WAITING')}
              {status === 1 && intl.get('KYC_AUTH_SUCCESS')}
              {status === 2 && intl.get('KYC_AUTH_FAILURE')}
            </Col>
          </Row>
        </PanelGroup>

        {(status === 0 || status === 2) && (
          <Edit onSubmitted={data => this.onSubmittedHandle(data)} />
        )}
        {(status === 3 || status === 1) && (
          <View profile={this.state.profile} />
        )}
      </Section>
    );
  }
}

export default withStyles(s)(Profile);
