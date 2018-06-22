import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from 'react-bootstrap/lib/Modal';

import { KycType } from '../../../components/App';
import s from './Raise.scss';

class Raise extends React.Component {
  static contextTypes = {
    kyc: PropTypes.shape(KycType),
  };

  state = { showModal: false };

  componentDidMount() {
    console.log('didmount');
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentWillReceiveProps() {
    console.log('receive next props');
  }

  show = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  hide = () => {
    this.setState({ showModal: false });
  };

  render() {
    const kyc = this.context.kyc.check();
    return (
      <div className={s.root}>
        <Modal
          dialogClassName={s.modal}
          show={this.state.showModal}
          onHide={this.hide}
        >
          <Modal.Body className={s.modalBody}>
            <Close onClose={this.hide} />
            <Contents kyc={kyc} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function Contents({ kyc }) {
  switch (kyc) {
    case 0:
      return <Unauthorized />;
    case 1:
      return <Failure />;
    case 2:
      return <Success />;
  }
}

function Unauthorized() {
  return (
    <div className={s.content}>
      你还未进行KYC认证,快去认证吧!
      <button>去认证</button>
    </div>
  );
}

function Failure() {
  return (
    <div className={s.content}>
      KYC认证失败,请重新认证!
      <button>重新认证</button>
    </div>
  );
}

function Success() {
  return (
    <div className={s.content}>
      KYC已认证成功,快去参与公募吧!
      <button>去公募</button>
    </div>
  );
}

function Close(props) {
  return (
    <div className={s.closeWrap}>
      <span className={s.close} onClick={props.onClose}>
        ×
      </span>
    </div>
  );
}

Close.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withStyles(s)(Raise);
