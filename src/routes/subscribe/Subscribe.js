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
import Image from 'react-bootstrap/lib/Image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import debounce from 'lodash/debounce';
import cs from 'classnames';

import { address } from '../api';
import Section from '../../components/Section';
import qrc from './assets/qrc.jpg';

import s from './Subscribe.css';
import history from '../../history';
import { KycType } from '../../components/App';
import { expireHandle } from '../login/Login';

const EthAddress = '0x0ae06b74346dF0793b531f01594515335DAb9c4d';

class Subscribe extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    kyc: PropTypes.shape(KycType),
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = { ethAddress: '' };

  componentDidMount() {
    // 没有kyc认证成功，不能进入
    if (this.context.kyc.check() !== 1) {
      try {
        history.goBack();
        return;
      } catch (e) {}
    }

    // 已经登记以太地址，自动跳转到认筹页面
    address(this.context.fetch, this.context.login.check())
      .then(ethAddress => {
        if (ethAddress === '') {
          try {
            history.replace('/address');
          } catch (e) {}
        } else {
          this.setState({ ethAddress });
        }
      })
      .catch(expireHandle(this.context.login));
  }

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

        <div className={s.eth}>
          <p>{intl.get('ETHEREUM_ADDRESS')}</p>
          <p>{this.state.ethAddress}</p>
        </div>
        <FormGroup className={s.formGroup}>
          <p>{intl.get('PUBLIC_ADDRESS')}</p>
          <InputGroup>
            <FormControl type="text" defaultValue={EthAddress} readOnly />
            <InputGroup.Button>
              <CopyToClipboard
                text={EthAddress}
                onCopy={() => this.onCopyHandle()}
              >
                <Button bsStyle="primary">{intl.get('COPY')}</Button>
              </CopyToClipboard>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <div className={s.qrc}>
          <Image src={qrc} responsive alt="" />
        </div>
        <Row>
          <Col xs={12} className={cs('text-center', s.mailMe)}>
            {intl.get('SUBSCRIBE_ITEM')}
          </Col>
        </Row>

        {/* <Row className="text-center"> */}
        {/* <Button bsStyle="primary" href="/doc/file.docx"> */}
        {/* {intl.get('DOWNLOAD_TABLE')} */}
        {/* </Button> */}
        {/* </Row> */}

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
