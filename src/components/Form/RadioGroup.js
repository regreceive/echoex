import React from 'react';
import Proptypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class RadioGroup extends React.Component {
  static propTypes = {
    label: Proptypes.string.isRequired,
    children: Proptypes.node.isRequired,
  };

  render() {
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        {this.props.children}
      </FormGroup>
    );
  }
}

export default RadioGroup;
