import React from 'react';
import PropTypes from 'prop-types';

class Section extends React.Component {
  static propTypes = {
    rootClassName: PropTypes.string.isRequired,
    containerClassName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { rootClassName, containerClassName, title, children } = this.props;
    return (
      <div className={rootClassName}>
        <div className={containerClassName}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    );
  }
}

export default Section;
