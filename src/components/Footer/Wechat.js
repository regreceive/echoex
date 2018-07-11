// @flow

import React from 'react';
import MediaQuery from 'react-responsive';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Modal from 'react-bootstrap/lib/Modal';
import { Mobile, Default } from '../../deviceSwith';
import wechat from '../../assets/sns/wechat.png';
import qrc from '../../assets/sns/wechat_qrc.png';

import s from './Footer.scss';

const popover = (
  <Popover id="popover-trigger-click-root-close">
    <img src={qrc} className={s.qrc} alt="" />
  </Popover>
);

class Wechat extends React.Component {
  state = { showModal: false };

  modalCloseHandle = () => {
    this.setState({ showModal: false });
  };

  modalOpenHandle = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  render() {
    return (
      <li>
        <Default>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={popover}
            defaultOverlayShown={this.state.showModal}
            onExit={this.modalCloseHandle}
          >
            <a href="#" onClick={this.modalOpenHandle}>
              <img src={wechat} alt="" />
            </a>
          </OverlayTrigger>
        </Default>

        <Mobile>
          <a href="#" onClick={this.modalOpenHandle}>
            <img src={wechat} alt="" />
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
        </Mobile>
      </li>
    );
  }
}

export default Wechat;
