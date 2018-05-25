import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default function HelpGroup(props) {
  const { help, children } = props;
  return (
    <Row>
      {children && <Col xs={6}>{children}</Col>}
      {help && (
        <Col xs={children ? 6 : 12} className="text-right text-danger">
          {help}
        </Col>
      )}
    </Row>
  );
}

HelpGroup.propTypes = {
  help: PropTypes.string.isRequired,
  children: PropTypes.element,
};
