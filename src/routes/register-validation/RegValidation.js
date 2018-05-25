import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';

import Section from '../../components/Section';
import s from './RegValidation.css';

class Subscribe extends React.Component {
  static contextTypes = {
    state: PropTypes.object.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { state } = this.context;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <h5>
          {intl.getHTML('REG_VALIDATION_DESCRIPTION', {
            email: state.email || '',
          })}
        </h5>
      </Section>
    );
  }
}

export default withStyles(s)(Subscribe);
