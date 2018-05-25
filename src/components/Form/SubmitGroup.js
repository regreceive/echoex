import React from 'react';
import Proptypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

// 防止重复提交
class SubmitGroup extends React.Component {
  static propTypes = {
    title: Proptypes.string.isRequired,
    onSubmit: Proptypes.func.isRequired,
    bsStyle: Proptypes.string,
    disabled: Proptypes.bool,
  };

  static defaultProps = {
    bsStyle: 'primary',
    disabled: false,
  };

  state = { disabled: false };

  componentWillMount() {
    this.setState({ disabled: this.props.disabled || this.loading });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ disabled: nextProps.disabled || this.loading });
  }

  loading = false;

  handleClick() {
    this.loading = true;
    this.setState({ disabled: true });
    this.props.onSubmit().then(() => {
      this.loading = false;
      this.setState({ disabled: false });
    });
  }

  render() {
    const { disabled } = this.state;
    const { title, ...props } = this.props;
    return (
      <FormGroup className="text-center">
        <Button
          {...props}
          disabled={disabled}
          onClick={() => this.handleClick()}
        >
          {title}
        </Button>
      </FormGroup>
    );
  }
}

export default SubmitGroup;
