// @flow

import React from 'react';
import PropTypes from 'prop-types';

export const LoginType = {
  in: PropTypes.func.isRequired,
  out: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
};

export const KycType = {
  sync: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
};

export type LoginFlowType = {
  in: void,
  out: void,
  check: void => string,
};

export type KycFlowType = {
  sync: () => void,
  check: void => number,
};

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  state: PropTypes.object,
  login: PropTypes.shape(LoginType),
  kyc: PropTypes.shape(KycType),
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.Children.only(this.props.children);
  }
}

export default App;
