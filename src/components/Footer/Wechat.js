// @flow

import React from 'react';
import MediaQuery from 'react-responsive';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Modal from 'react-bootstrap/lib/Modal';
import Col from 'react-bootstrap/lib/Col';
import wechat from '../../assets/sns/wechat.png';
import qrc from '../../assets/sns/wechat_qrc.png';

import s from './Footer.scss';

const popover = (
  <Popover id="popover-trigger-click-root-close">
    <img src={qrc} className={s.qrc} />
  </Popover>
);

class Wechat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.modalCloseHandle = this.modalCloseHandle.bind(this);
    this.modalOpenHandle = this.modalOpenHandle.bind(this);
  }

  modalCloseHandle() {
    this.setState({ showModal: false });
  }

  modalOpenHandle(e: Event) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  render() {
    return (
      <MediaQuery minWidth={992}>
        {matches => {
          // 大屏
          if (matches) {
            return (
              <li>
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="top"
                  overlay={popover}
                  defaultOverlayShown={this.state.showModal}
                  onExit={this.modalCloseHandle}
                >
                  <a href="#" onClick={this.modalOpenHandle}>
                    <img src={wechat} width="45" height="45" />
                  </a>
                </OverlayTrigger>
              </li>
            );
          }

          // 小屏
          return (
            <li>
              <a href="#" onClick={this.modalOpenHandle}>
                <img src={wechat} width="45" height="45" />
              </a>
              <Modal
                show={this.state.showModal}
                onHide={this.modalCloseHandle}
                dialogClassName={s.customDialog}
              >
                <Modal.Body>
                  <img src={qrc} className={s.qrc} />
                </Modal.Body>
              </Modal>
            </li>
          );
        }}
      </MediaQuery>
    );
  }
}

export default Wechat;
