import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Helloworld.css';

let left = 0;
function formatTimeLeft(t) {
  const DAY = 3600*24;
  const HOUR = 3600;
  const MINUTE = 60;

  const days = Math.floor(t/(3600*24));
  const hours = Math.floor((t-days*DAY)/(3600));
  const minutes = Math.floor((t-days*DAY-hours*HOUR)/60);
  const seconds = Math.floor(t-days*DAY-hours*HOUR-minutes*MINUTE);

  return days ?
      `${days}D ${hours}:${minutes}:${seconds}` :
      `${hours}:${minutes}:${seconds}`;
}
class Register extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);


    this.state = { deadline: '2018-05-24', timer: 'NA:NA:NA' };
    const t = setInterval(()=>{
      left--;
      if(left<=0) clearInterval(t);
      this.setState({timer: formatTimeLeft(left)})
    }, 1000);
  }

  componentDidMount(){
    const dead = new Date(this.state.deadline).getTime();
    left = Math.floor((dead - new Date().getTime())/1000);
    this.setState({timer: formatTimeLeft(left)})
  }

  render() {
    return (
        <div className="jumbotron">
          <h1 style={{textAlign:"center"}}>{this.state.timer}</h1>
        </div>
    );
  }
}

export default withStyles(s)(Register);
