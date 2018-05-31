import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MediaQuery from 'react-responsive';

import Navigator from './Navigator';
import Banner from './Banner';
import Background from './Background';
import Principle from './Principle';
import Ecology from './Ecology';
import Team from './Team';
import Consultant from './Consultant';
import Partners from './Partners';
import Media from './Media';
import s from './Home.scss';

const Mobile = props => <MediaQuery {...props} minWidth={768} />;

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Mobile>
            <Navigator />
          </Mobile>
          <Banner />
          <Background />
          <Principle />
          <Ecology />
          <Team />
          <Consultant />
          <Partners />
          <Media />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
