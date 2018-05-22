import React from 'react';
import Proptypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';

class PanelGroup extends React.Component {
  static propTypes = {
    header: Proptypes.string.isRequired,
    children: Proptypes.node.isRequired,
  };

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.header}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>{this.props.children}</Panel.Body>
      </Panel>
    );
  }
}

export default PanelGroup;
