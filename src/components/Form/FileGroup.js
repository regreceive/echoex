import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Image from 'react-bootstrap/lib/Image';

class FileGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    label: '',
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = { imgData: '' };

  fr = null;

  initFileReader() {
    if (this.fr instanceof FileReader) {
      return;
    }
    this.fr = new FileReader();
    this.fr.addEventListener('load', event => {
      this.setState({ imgData: event.target.result });
    });
  }

  handleChange(event) {
    this.initFileReader();
    this.fr.readAsDataURL(event.target.files[0]);
  }

  render() {
    const { imgData } = this.state;
    const { id, label, ...props } = this.props;
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          type="file"
          {...props}
          name={id}
          onChange={this.handleChange}
        />
        <Image src={imgData} responsive thumbnail />
      </FormGroup>
    );
  }
}

export default FileGroup;
