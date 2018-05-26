import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Form from 'react-bootstrap/lib/Form';
import HelpGroup from '../../components/Form/HelpGroup';
import FieldInlineGroup from '../../components/Form/FieldInlineGroup';
import SubmitGroup from '../../components/Form/SubmitGroup';
import { expireHandle } from '../login/Login';
import { reset } from '../api';
import Section from '../../components/Section';

import s from './PasswordLink.css';

class PasswordLink extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = { help: '', sent: false };

  submitHandle() {
    const { value: email } = this.email;
    return reset(this.context.fetch, { email })
      .then(() => {
        this.setState({ sent: true });
      })
      .catch(
        expireHandle(this.context.login, status => {
          this.setState({ help: intl.get(status) });
        }),
      );
  }

  render() {
    const { help, sent } = this.state;
    const title = sent
      ? intl.get('PASSWORD_LINK_SENT_TITLE')
      : this.props.title;

    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={title}
      >
        {!sent && (
          <Form horizontal>
            <FieldInlineGroup
              id="email"
              type="text"
              label={intl.get('EMAIL')}
              inputRef={ref => {
                this.email = ref;
              }}
              autoFocus
            />
            <SubmitGroup
              title={intl.get('SEND_EMAIL')}
              onSubmit={() => this.submitHandle()}
            />
            <HelpGroup help={help} />
          </Form>
        )}
        {sent && <h5>{intl.getHTML('PASSWORD_LINK_SENT')}</h5>}
      </Section>
    );
  }
}

export default withStyles(s)(PasswordLink);
