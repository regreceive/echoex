import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import history from '../../history';
import SubmitGroup from '../../components/Form/SubmitGroup';
import FieldInlineGroup from '../../components/Form/FieldInlineGroup';
import Section from '../../components/Section';
import { expireHandle } from '../login/Login';
import { postAddress } from '../api';
import s from './ApplyAddress.css';

class ApplyAddress extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { help: '', agree: false };
    this.checkHandle = this.checkHandle.bind(this);
  }

  submitHandle() {
    const address = this.address.value;
    postAddress(this.context.fetch, { address })
      .then(() => {
        history.replace('/subscribe');
      })
      .catch(
        expireHandle(this.context.login, status => {
          this.setState({ help: intl.get(status) });
        }),
      );
  }

  checkHandle(e) {
    this.setState({ agree: e.target.checked });
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <Form horizontal>
          <FieldInlineGroup
            id="address"
            type="text"
            label={intl.get('ETH_ADDRESS')}
            inputRef={ref => {
              this.address = ref;
            }}
            autoFocus
            className={s.formGroup}
          />
          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Checkbox onClick={this.checkHandle}>
                {intl.get('ADDRESS_STATEMENT')}
              </Checkbox>
            </Col>
          </FormGroup>

          <SubmitGroup
            title={intl.get('SUBMIT')}
            onClick={() => this.submitHandle()}
            disabled={!this.state.agree}
          />

          <Row>
            {help && (
              <Col xs={12} className="text-right text-danger">
                {help}
              </Col>
            )}
          </Row>
        </Form>
      </Section>
    );
  }
}

export default withStyles(s)(ApplyAddress);
