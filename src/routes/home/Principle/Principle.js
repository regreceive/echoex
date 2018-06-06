import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cs from 'classnames';
import Swiper from 'react-id-swiper';

import lang from './locales';
import { Default, Mobile } from '../../../deviceSwith';
import s from './Principle.scss';

let dict;
const params = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

class Principle extends React.Component {
  state = { index: 0 };

  menu() {
    const { index } = this.state;
    const { menus } = dict;

    return (
      <div className={s.menu}>
        <span
          className={cs(s.link1, index === 0 && s.active)}
          onClick={() => this.menuClickHandle(0)}
        >
          {menus[0]}
        </span>
        <span
          className={cs(s.link2, index === 1 && s.active)}
          onClick={() => this.menuClickHandle(1)}
        >
          {menus[1]}
        </span>
        <span
          className={cs(s.link3, index === 2 && s.active)}
          onClick={() => this.menuClickHandle(2)}
        >
          {menus[2]}
        </span>
        <span
          className={cs(s.link4, index === 3 && s.active)}
          onClick={() => this.menuClickHandle(3)}
        >
          {menus[3]}
        </span>
        <span
          className={cs(s.link5, index === 4 && s.active)}
          onClick={() => this.menuClickHandle(4)}
        >
          {menus[4]}
        </span>
      </div>
    );
  }

  menuClickHandle(i) {
    this.setState({ index: i });
  }

  render() {
    dict = lang();
    const { title } = dict;
    const { index } = this.state;
    return (
      <div className={s.root}>
        <h2>{title}</h2>
        <Mobile>
          <Swiper {...params}>
            <Swipe1 />
            <Swipe2 />
          </Swiper>
        </Mobile>

        <Default>
          <Row className={s.container}>
            <Col sm={6}>{this.menu()}</Col>
            <Col sm={6}>
              <Chapter1 show={index === 0} />
              <Chapter2 show={index === 1} />
              <Chapter3 show={index === 2} />
              <Chapter4 show={index === 3} />
              <Chapter5 show={index === 4} />
            </Col>
          </Row>
        </Default>
      </div>
    );
  }
}

const Swipe1 = props => {
  const { menus, chapters } = dict;
  const [c1, c2] = chapters;

  return (
    <div {...props}>
      <div className={s.swipeUnit}>
        <Row>
          <Col xs={6}>
            <span className={s.t1}>{menus[0]}</span>
            <ol dangerouslySetInnerHTML={{ __html: c1.ol1 }} />
          </Col>
          <Col xs={6}>
            <h4>{c1.title2}</h4>
            <ol dangerouslySetInnerHTML={{ __html: c1.ol2 }} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <span className={s.t2}>{menus[1]}</span>
            <ol dangerouslySetInnerHTML={{ __html: c2.ol1 }} />
          </Col>
          <Col xs={6}>
            <h4>{c2.title2}</h4>
            <ol dangerouslySetInnerHTML={{ __html: c2.ol2 }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const Swipe2 = props => {
  const { menus, chapters } = dict;
  const [, , c3, c4, c5] = chapters;

  return (
    <div {...props}>
      <div className={s.swipeUnit}>
        <Row>
          <Col xs={6}>
            <span className={s.t3}>{menus[2]}</span>
            <ol dangerouslySetInnerHTML={{ __html: c3.ol1 }} />
          </Col>
          <Col xs={6}>
            <h4>{c3.title2}</h4>
            <ol dangerouslySetInnerHTML={{ __html: c3.ol2 }} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <span className={s.t4}>{menus[3]}</span>
            <ol dangerouslySetInnerHTML={{ __html: c4.ol1 }} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <span className={s.t5}>{menus[4]}</span>
            <p dangerouslySetInnerHTML={{ __html: c5.p1 }} />
          </Col>
          <Col xs={6}>
            <h4>{c5.title2}</h4>
            <p dangerouslySetInnerHTML={{ __html: c5.p2 }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

function Chapter1(props) {
  const { chapters } = dict;
  const c = chapters[0];

  return (
    <Row className={cs(s.content, props.show && s.show)}>
      <Col xs={6}>
        <h4>{c.title1}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol1 }} />
      </Col>
      <Col xs={6}>
        <h4>{c.title2}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol2 }} />
      </Col>
    </Row>
  );
}

Chapter1.propTypes = {
  show: PropTypes.bool,
};

Chapter1.defaultProps = {
  show: true,
};

function Chapter2(props) {
  const { chapters } = dict;
  const c = chapters[1];

  return (
    <Row className={cs(s.content, props.show && s.show)}>
      <Col xs={6}>
        <h4>{c.title1}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol1 }} />
      </Col>
      <Col xs={6}>
        <h4>{c.title2}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol2 }} />
      </Col>
    </Row>
  );
}

Chapter2.propTypes = {
  show: PropTypes.bool,
};

Chapter2.defaultProps = {
  show: true,
};

function Chapter3(props) {
  const { chapters } = dict;
  const c = chapters[2];

  return (
    <Row className={cs(s.content, props.show && s.show)}>
      <Col xs={6}>
        <h4>{c.title1}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol1 }} />
      </Col>
      <Col xs={6}>
        <h4>{c.title2}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol2 }} />
      </Col>
    </Row>
  );
}

Chapter3.propTypes = {
  show: PropTypes.bool,
};

Chapter3.defaultProps = {
  show: true,
};

function Chapter4(props) {
  const { chapters } = dict;
  const c = chapters[3];

  return (
    <Row className={cs(s.content, props.show && s.show)}>
      <Col xs={12}>
        <h4>{c.title1}</h4>
        <ol dangerouslySetInnerHTML={{ __html: c.ol1 }} />
      </Col>
    </Row>
  );
}

Chapter4.propTypes = {
  show: PropTypes.bool,
};

Chapter4.defaultProps = {
  show: true,
};

function Chapter5(props) {
  const { chapters } = dict;
  const c = chapters[4];

  return (
    <Row className={cs(s.content, props.show && s.show)}>
      <Col xs={12}>
        <h4>{c.title1}</h4>
        <p>{c.p1}</p>
      </Col>
      <Col xs={12}>
        <h4>{c.title2}</h4>
        <p>{c.p2}</p>
      </Col>
    </Row>
  );
}

Chapter5.propTypes = {
  show: PropTypes.bool,
};

Chapter5.defaultProps = {
  show: true,
};

export default withStyles(s)(Principle);
