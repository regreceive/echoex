import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import lang from './locales';
import s from './Ecology.scss';

class Ecology extends Component {
  render() {
    const dict = lang();
    const { title, contents } = dict;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>{title}</h2>
          <Grid>
            <Row>
              {contents.map(content => (
                <dl className="col-sm-4 col-xs-12" key={content.label}>
                  <dt>{content.label}</dt>
                  <dd>{content.descr}</dd>
                </dl>
              ))}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Ecology);
