// @flow

import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Radio from 'react-bootstrap/lib/Radio';

import FieldGroup from '../../components/Form/FieldGroup';
import RadioGroup from '../../components/Form/RadioGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import FileGroup from '../../components/Form/FileGroup';
import serialize from './serialize';
import { profilePost } from '../api';
import { expireHandle } from '../login/Login';

class Edit extends React.Component {
  static propTypes = {
    onSubmitted: PropTypes.func.isRequired,
  };

  state = { help: '' };

  submitHandle(): Promise {
    const fd = serialize(this.formEl);
    return profilePost(this.context.fetch, fd)
      .then(data => {
        this.props.onSubmitted(data);
      })
      .catch(
        expireHandle(this.context.login, status => {
          this.setState({ help: intl.get(status) });
        }),
      );
  }

  render() {
    const { help } = this.state;
    return (
      <form
        ref={ref => {
          this.formEl = ref;
        }}
      >
        <FieldGroup id="username" type="text" label={intl.get('NAME')} />
        <FieldGroup id="firstname" type="text" label={intl.get('FIRST_NAME')} />
        <FieldGroup id="lastname" type="text" label={intl.get('LAST_NAME')} />
        <RadioGroup label={intl.get('GENDER')}>
          <Row>
            <Col xs={12}>
              <Radio name="gender" value="1" inline defaultChecked>
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
        <FieldGroup id="country" type="text" label={intl.get('COUNTRY')} />{' '}
        <FieldGroup id="city" type="text" label={intl.get('CITY')} />{' '}
        <FieldGroup id="location" type="text" label={intl.get('LOCATION')} />
        <FieldGroup id="passport" type="text" label={intl.get('PASSPORT_ID')} />
        <Row>
          <Col sm={6}>
            <FileGroup
              id="passport_01"
              label={intl.get('PASSPORT_FULL_FACE')}
            />
          </Col>
          <Col sm={6}>
            <FileGroup id="passport_02" label={intl.get('PASSPORT_BACK')} />
          </Col>
        </Row>
        <SubmitGroup
          title={intl.get('PROFILE_SUBMIT')}
          onSubmit={() => this.submitHandle()}
        />
        <Row>
          {help && (
            <Col xs={12} className="text-right text-danger">
              {help}
            </Col>
          )}
        </Row>
      </form>
    );
  }
}

export default Edit;
