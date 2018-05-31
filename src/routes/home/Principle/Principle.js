import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Swiper from 'react-id-swiper/lib/custom';
import MediaQuery from 'react-responsive';
import cs from 'classnames';

import s from './Principle.scss';
import lang from './locales';

const Mobile = props => <MediaQuery {...props} maxWidth={767} />;
const Default = props => <MediaQuery {...props} minWidth={768} />;

let dict;

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

  normal() {
    const { index } = this.state;
    return (
      <div>
        <Chapter1 show={index === 0} />
        <Chapter2 show={index === 1} />
        <Chapter3 show={index === 2} />
        <Chapter4 show={index === 3} />
        <Chapter5 show={index === 4} />
      </div>
    );
  }

  render() {
    dict = lang();
    const { title } = dict;
    return (
      <div className={s.root}>
        <h2>{title}</h2>
        <Mobile>
          <Swipe />
        </Mobile>

        <Default>
          <Row className={s.container}>
            <Col sm={6}>{this.menu()}</Col>
            <Col sm={6}>{this.normal()}</Col>
          </Row>
        </Default>
      </div>
    );
  }
}

function Swipe() {
  return (
    <Swiper>
      <WrapForSwipe>
        <Chapter1 />
      </WrapForSwipe>
      <WrapForSwipe>
        <Chapter2 />
      </WrapForSwipe>
      <WrapForSwipe>
        <Chapter3 />
      </WrapForSwipe>
      <WrapForSwipe>
        <Chapter4 />
      </WrapForSwipe>
      <WrapForSwipe>
        <Chapter5 />
      </WrapForSwipe>
    </Swiper>
  );
}

// 给内容加一个背景颜色
function WrapForSwipe(props) {
  const { children, ...moreProps } = props;
  return (
    <div {...moreProps}>
      <div className={s.swipeUnit}>{props.children}</div>
    </div>
  );
}

WrapForSwipe.propTypes = {
  children: PropTypes.node.isRequired,
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
    <div className={cs(s.content, props.show && s.show)}>
      <h4>{c.title1}</h4>
      <ol dangerouslySetInnerHTML={{ __html: c.ol1 }} />
    </div>
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
