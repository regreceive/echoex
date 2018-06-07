import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import querystring from 'querystring';
import { regActivate } from '../api';
import * as Errors from '../../controllers/errors_constant';

import Section from '../../components/Section';
import s from './RegActivate.css';

class Subscribe extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { help: '' };
  }

  componentDidMount() {
    const { s, code } = querystring.parse(window.location.href.split('?')[1]);
    regActivate(this.context.fetch, { s, code })
      .then(() => {
        const msg = intl.get('REGACTIVATE_SUCCESS');
        this.setState({ help: msg });
      })
      .catch(status => {
        this.setState({ help: intl.get(status) });
      });
  }

  render() {
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <h5 className={s.h5} style={{ textAlign: 'center' }}>
          {this.state.help}
        </h5>
      </Section>
    );
  }
}

export default withStyles(s)(Subscribe);
