import React from 'react';
import TweenMax from 'gsap';
import Waypoint from 'react-waypoint';

function easeInOut(WrappedComponent) {
  return class extends React.Component {
    constructor(...args) {
      super(...args);
      this.el = React.createRef();
    }

    enterHandle = () => {
      TweenMax.from(this.el.current.parentNode, 0.5, { y: 100 });
    };

    leaveHandle = () => {};

    render() {
      return (
        <Waypoint onEnter={this.enterHandle} onLeave={this.leaveHandle}>
          <WrappedComponent ref={this.el} />
        </Waypoint>
      );
    }
  };
}

export default { easeInOut };
