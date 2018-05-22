import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class FieldGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = { value: '' };

  getValidationState() {
    return this.state.value.length > 0 ? 'success' : null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { id, label, ...props } = this.props;
    return (
      <FormGroup controlId={id} validationState={this.getValidationState()}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          {...props}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </FormGroup>
    );
  }
}

export default FieldGroup;
