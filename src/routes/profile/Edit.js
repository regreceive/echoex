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
import serialize from './serialize';
import { profilePost } from '../api';
import { expireHandle } from '../login/Login';

class Edit extends React.Component {
  static propTypes = {
    onSubmitted: PropTypes.func.isRequired,
  };

  state = { help: '', front: '', verso: '' };

  frontOnChangeHandle(event) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ front: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  versoOnChangeHandle(event) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ verso: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

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
    const { help, front, verso } = this.state;
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
        <FieldGroup
          id="passport_01"
          type="file"
          label={intl.get('PASSPORT_FULL_FACE')}
          onChange={e => {
            this.frontOnChangeHandle(e);
          }}
        />
        <div>
          <img src={front} alt="" />
        </div>
        <FieldGroup
          id="passport_02"
          type="file"
          label={intl.get('PASSPORT_BACK')}
          onChange={e => {
            this.versoOnChangeHandle(e);
          }}
        />
        <div>
          <img src={verso} alt="" />
        </div>
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
    );
  }
}

export default Edit;
