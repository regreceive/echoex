import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class Captcha extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    inputRef: PropTypes.func.isRequired,
    btnClassName: PropTypes.string.isRequired,
    addonClassName: PropTypes.string.isRequired,
    captchaClassName: PropTypes.string.isRequired,
    refreshCaptcha: PropTypes.func.isRequired,
    imgRef: PropTypes.func.isRequired,
  };

  render() {
    const {
      label,
      inputRef,
      btnClassName,
      addonClassName,
      captchaClassName,
      refreshCaptcha,
      imgRef,
    } = this.props;
    return (
      <FormGroup controlId="captcha">
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
          <FormControl type="text" inputRef={inputRef} />
          <InputGroup.Addon className={addonClassName}>
            <Button
              bsStyle="link"
              className={btnClassName}
              onClick={refreshCaptcha}
            >
              <img
                src="/api/captcha/send?scenario=reg"
                alt={intl.get('REFRESH_CAPTCHA')}
                className={captchaClassName}
                ref={imgRef}
              />
            </Button>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Captcha;
