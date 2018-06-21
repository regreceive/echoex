import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from 'react-bootstrap/lib/Modal';

import Navigator from './Navigator';
import Banner from './Banner';
import Background from './Background';
import Principle from './Principle';
import Ecology from './Ecology';
import Team from './Team';
import Consultant from './Consultant';
import Organization from './Organization';
import Partners from './Partners';
import Media from './Media';
import s from './Home.scss';

class Home extends React.Component {
  state = { showModal: false };

  show = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  hide = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigator />
          <Banner />
          <Background />
          <Principle />
          <Ecology />
          <Team />
          <Consultant />
          <Organization />
          <Partners />
          <Media />
        </div>

        <Modal bsSize="small" show={this.state.showModal} onHide={this.hide}>
          <Modal.Header closeButton />

          <Modal.Body>主体内容...</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withStyles(s)(Home);
