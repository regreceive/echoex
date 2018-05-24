import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import debounce from 'lodash/debounce';
import cs from 'classnames';

import Section from '../../components/Section';
import s from './Subscribe.css';

const EthAddress = '0xfCD65569C82A6555EA9FED6f21a66EaeDd9Ab008';

class Subscribe extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  onCopyHandle() {
    this.toastEl.style.opacity = 1;
    this.debounced();
  }

  debounced = debounce(() => {
    this.toastEl.style.opacity = 0;
  }, 2000);

  render() {
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <h5 className={s.h5}>{intl.get('SUBSCRIBE_DESCRIPTION')}</h5>
        <FormGroup className={s.formGroup}>
          <InputGroup>
            <FormControl type="text" bsSize="large" defaultValue={EthAddress} />
            <InputGroup.Button>
              <CopyToClipboard
                text={EthAddress}
                onCopy={() => this.onCopyHandle()}
              >
                <Button bsStyle="primary" bsSize="large">
                  {intl.get('COPY')}
                </Button>
              </CopyToClipboard>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Row>
          <Col xs={12} className={cs('text-center', s.mailMe)}>
            {intl.get('SUBSCRIBE_DOWNLOAD_EXCEL')} contact@echo.center
          </Col>
        </Row>

        <Row className="text-center">
          <Button bsStyle="primary" href="/doc/file.docx">
            {intl.get('DOWNLOAD_TABLE')}
          </Button>
        </Row>

        <div
          ref={ref => {
            this.toastEl = ref;
          }}
          className={s.toast}
        >
          {intl.get('COPIED')}
        </div>
      </Section>
    );
  }
}

export default withStyles(s)(Subscribe);
