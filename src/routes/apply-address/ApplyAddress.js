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
import { postAddress, address } from '../api';
import s from './ApplyAddress.css';
import { KycType } from '../../components/App';

class ApplyAddress extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    kyc: PropTypes.shape(KycType),
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = { help: '', agree: false };
    this.checkHandle = this.checkHandle.bind(this);
  }

  componentDidMount() {
    // 没有kyc认证成功，不能进入。如果浏览器跳转进入该页，会由于kyc没有及时拿到而回退一个页面
    if (this.context.kyc.check() !== 1) {
      try {
        history.goBack();
        return;
      } catch (e) {}
    }

    // 已经登记以太地址，自动跳转到认筹页面
    address(this.context.fetch, this.context.login.check()).then(ethAddress => {
      if (ethAddress !== '') {
        try {
          history.replace('/subscribe');
        } catch (e) {}
      }
    });
  }

  submitHandle() {
    const address = this.address.value;
    return postAddress(this.context.fetch, { address })
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
          />
          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Checkbox onClick={this.checkHandle}>
                {intl.get('ADDRESS_STATEMENT')}
              </Checkbox>
            </Col>
          </FormGroup>

          <Row className={s.sa}>
            <Col smOffset={3} sm={9}>
              {intl.get('ADDRESS_SA')}
            </Col>
          </Row>

          <SubmitGroup
            title={intl.get('SUBMIT')}
            onSubmit={() => this.submitHandle()}
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
