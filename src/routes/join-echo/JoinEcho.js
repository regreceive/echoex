import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import FieldGroup from '../../components/Form/FieldGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import HelpGroup from '../../components/Form/HelpGroup';
import Section from '../../components/Section';

import s from './JoinEcho.css';
import { joinEcho } from '../api';

class JoinEcho extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = { help: '', sent: false };

  submitHandle() {
    const organization = this.organization.value;
    const industry = this.industry.value;
    const mobile = this.mobile.value;
    const phone = this.phone.value;
    const email = this.email.value;
    const description = this.description.value;
    return joinEcho(this.context.fetch, {
      organization,
      industry,
      mobile,
      phone,
      email,
      description,
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

  reply() {
    return <h5>{intl.get('JOIN_ECHO_REPLY')}</h5>;
  }

  edit() {
    const { help } = this.state;
    return (
      <Form>
        <Row>
          <Col sm={6}>
            <FieldGroup
              className="col-sm-6"
              id="organization"
              type="text"
              label={intl.get('JOIN_ECHO_ORGANIZATION')}
              inputRef={ref => {
                this.organization = ref;
              }}
            />
          </Col>

          <Col sm={6}>
            <FieldGroup
              id="industry"
              type="text"
              label={intl.get('JOIN_ECHO_INDUSTRY')}
              inputRef={ref => {
                this.industry = ref;
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FieldGroup
              id="mobile"
              type="tel"
              label={intl.get('MOBILE')}
              inputRef={ref => {
                this.mobile = ref;
              }}
            />
          </Col>
          <Col sm={6}>
            <FieldGroup
              id="phone"
              type="tel"
              label={intl.get('PHONE')}
              inputRef={ref => {
                this.phone = ref;
              }}
            />
          </Col>
        </Row>

        <FieldGroup
          id="email"
          type="email"
          label={intl.get('EMAIL')}
          inputRef={ref => {
            this.email = ref;
          }}
        />

        <FieldGroup
          id="description"
          componentClass="textarea"
          label={intl.get('JOIN_ECHO_TEXTAREA')}
          inputRef={ref => {
            this.description = ref;
          }}
        />

        <SubmitGroup
          title={intl.get('SUBMIT')}
          onSubmit={() => this.submitHandle()}
        />
        <HelpGroup help={help} />
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
        {!sent ? this.edit() : this.reply()}
      </Section>
    );
  }
}

export default withStyles(s)(JoinEcho);
