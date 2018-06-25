import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Modal from 'react-bootstrap/lib/Modal';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

import history from '../../../history';
import { KycType } from '../../../components/App';
import lang from './locales';
import CountDown from './CountDown';
import { raisedCount } from '../../api';
import s from './Raise.scss';

let dict;
// 总公募量
const totalNum = 10000;

class Raise extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func,
    login: PropTypes.object,
    kyc: PropTypes.shape(KycType),
  };

  state = {
    showModal: false,
    start: Date.now(),
    end: new Date(new Date().setDate(30)).getTime(),
    currentNum: 0,
  };

  componentDidMount() {
    if (this.context.login.check()) {
      this.context.kyc.sync().then(status => {
        // 如果是认证中，就不用提示用户了
        if (status !== 3) {
          this.setState({ showModal: true });
        }
      });
    }

    raisedCount(this.context.fetch).then(currentNum => {
      this.setState({ currentNum });
    });
  }

  componentWillReceiveProps() {
    if (this.context.login.check()) {
      this.setState({ showModal: true });
    }
  }

  offeringHandle = () => {
    if (!this.context.login.check()) {
      history.push('/login');
    } else {
      this.setState({ showModal: true });
    }
  };

  show = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  hide = () => {
    this.setState({ showModal: false });
  };

  render() {
    dict = lang();
    const kyc = this.context.kyc.check();
    const { start, end, currentNum } = this.state;
    const achievedPercent = currentNum / totalNum * 100;
    return (
      <div className={s.root}>
        <div>
          <div className={s.title}>{dict.title}</div>
          <CountDown deadline={end} />
          <div className={s.progress}>
            <div>{dict.ongoing}</div>
            <div className={s.progressWrap}>
              <ProgressBar now={achievedPercent} />
            </div>
            <div className={s.percent}>{achievedPercent}%</div>
          </div>

          <div className={s.scope}>
            {dict.scope}: <span>{intl.get('DEADLINE', { start, end })}</span>
          </div>
        </div>

        <div className={s.bottom}>
          <div className={s.btnWrap}>
            <a href={dict.link}>{dict.whitePaper}</a>
            <button onClick={this.offeringHandle}>{dict.offering}</button>
          </div>
          <div
            className={s.agreement}
            dangerouslySetInnerHTML={{ __html: dict.agreement }}
          />
        </div>

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
      return <Success />;
    case 2:
      return <Failure />;
    default:
      return <div />;
  }
}

function Unauthorized() {
  const { unauthorized: d } = dict;
  return (
    <div className={s.content}>
      {d.title}
      <button onClick={() => history.push('/profile')}>{d.btn}</button>
    </div>
  );
}

function Failure() {
  const { failure: d } = dict;
  return (
    <div className={s.content}>
      {d.title}
      <button onClick={() => history.push('/profile')}>{d.btn}</button>
    </div>
  );
}

function Success() {
  const { success: d } = dict;
  return (
    <div className={s.content}>
      {d.title}
      <button onClick={() => history.push('/address')}>{d.btn}</button>
    </div>
  );
}

function Close({ onClose }) {
  return (
    <div className={s.closeWrap}>
      <span className={s.close} onClick={onClose}>
        ×
      </span>
    </div>
  );
}

Close.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withStyles(s)(Raise);
