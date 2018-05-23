import React from 'react';
import Proptypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

class SubmitGroup extends React.Component {
  static propTypes = {
    title: Proptypes.string.isRequired,
    onClick: Proptypes.func.isRequired,
  };

  state = { isLoading: false };

  handleClick() {
    this.setState({ isLoading: true });
    this.props.onClick().then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { title, ...props } = this.props;
    return (
      <FormGroup className="text-center">
        <Button
          bsStyle="primary"
          bsSize="large"
          disabled={isLoading}
          onClick={() => this.handleClick()}
          {...props}
        >
          {title}
        </Button>
      </FormGroup>
    );
  }
}

export default SubmitGroup;
