import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import FieldGroup from './FieldGroup';

class FieldInlineGroup extends FieldGroup {
  render() {
    const { id, label, ...props } = this.props;
    return (
      <FormGroup controlId={id} validationState={this.getValidationState()}>
        <Col componentClass={ControlLabel} sm={3}>
          {label}
        </Col>
        <Col sm={9}>
          <FormControl
            {...props}
            name={id}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </Col>
      </FormGroup>
    );
  }
}

export default FieldInlineGroup;
