// @flow

import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const profileType = {
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  gender: PropTypes.number.isRequired,
  birthday: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  passport: PropTypes.string.isRequired,
  passport_01: PropTypes.string.isRequired,
  passport_02: PropTypes.string.isRequired,
};

function Field(props) {
  return (
    <Row>
      <Col xs={3}>{props.item}</Col>
      <Col xs={9}>{props.value}</Col>
    </Row>
  );
}

Field.propTypes = {
  item: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function ImageField(props) {
  return (
    <div>
      <Row>
        <Col xs={12}>{props.item}</Col>
      </Row>
      <Row>
        <Col xs={12}>
          <image src={props.front} />
        </Col>
        <Col xs={12}>
          <image src={props.verso} />
        </Col>
      </Row>
    </div>
  );
}
ImageField.propTypes = {
  item: PropTypes.string.isRequired,
  front: PropTypes.string.isRequired,
  verso: PropTypes.string.isRequired,
};

class View extends React.Component {
  static propTypes = {
    profile: PropTypes.shape(profileType).isRequired,
  };

  render() {
    const {
      username,
      firstname,
      lastname,
      gender,
      birthday,
      country,
      city,
      location,
      passport,
      passport_01,
      passport_02,
    } = this.props.profile;
    return (
      <div>
        <Field item={intl.get('NAME')} value={username} />
        <Field item={intl.get('FIRST_NAME')} value={firstname} />
        <Field item={intl.get('LAST_NAME')} value={lastname} />
        <Field
          item={intl.get('GENDER')}
          value={gender ? intl.get('MALE') : intl.get('FEMALE')}
        />
        <Field item={intl.get('BIRTHDAY')} value={birthday} />
        <Field item={intl.get('COUNTRY')} value={country} />
        <Field item={intl.get('CITY')} value={city} />
        <Field item={intl.get('LOCATION')} value={location} />
        <Field item={intl.get('PASSPORT_ID')} value={passport} />
        <ImageField item={intl.get('PASSPORT_TITLE')} front={passport_01} verso={passport_02} />
      </div>
    );
  }
}

export default View;
