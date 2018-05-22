import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import intl from 'react-intl-universal';
import Section from '../../components/Section';
import { profile } from '../api';
import history from '../../history';
import s from './Profile.css';

class Login extends React.Component {
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

  componentWillMount() {
    profile(this.context.fetch)
      .then(data => {
        this.profile = data || {};
      })
      .catch(status => {
        if (status === 40001) {
          history.replace('/login');
        }
        this.setState({ help: intl.get(status) });
      });
  }

  render() {
    const { help } = this.state;
    return (
      <Section
        rootClassName={s.root}
        containerClassName={s.container}
        title={this.props.title}
      >
        <h2>账号信息</h2>
        <div className={s.profile_container}>
          <div className={s.profile_item}>
            <span>邮箱</span>
            <span>xxxxx@qq.com</span>
          </div>
          <div className={s.profile_item}>
            <span>密码</span>
            <span>******</span>
          </div>
          <div className={s.profile_item}>
            <span>以太地址</span>
            <span>ox.........</span>
          </div>
        </div>

        <h2>KYC 信息</h2>
        <div className={s.profile_container}>
          <div className={s.profile_item}>
            <span>kyc认证</span>
            <span>审核中</span>
          </div>
          <div className={s.profile_item}>
            <span>姓名</span>
            <span>kk</span>
          </div>
          <div className={s.profile_item}>
            <span>名</span>
            <span>k</span>
          </div>
          <div className={s.profile_item}>
            <span>姓</span>
            <span>k</span>
          </div>
          <div className={s.profile_item}>
            <span>性别</span>
            <span>男</span>
          </div>
          <div className={s.profile_item}>
            <span>出生日期</span>
            <span>1987.01.01</span>
          </div>
        </div>

        <h2>国际信息</h2>
        <div className={s.profile_container}>
          <div className={s.profile_item}>
            <span>护照id</span>
            <span>112313213131</span>
          </div>
          <div className={s.profile_item}>
            <span>护照正面</span>
            <img src="" alt="" />
          </div>
          <div className={s.profile_item}>
            <span>护照反面</span>
            <img src="" alt="" />
          </div>
        </div>
      </Section>
    );
  }
}

export default withStyles(s)(Login);
