import React from 'react';
import Proptypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

class SubmitGroup extends React.Component {
  static propTypes = {
    title: Proptypes.string.isRequired,
  };

  render() {
    const { title, ...props } = this.props;
    return (
      <FormGroup>
        <Button bsStyle="primary" bsSize="large" block {...props}>
          {title}
        </Button>
      </FormGroup>
    );
  }
}

export default SubmitGroup;
