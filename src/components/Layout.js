import React from "react";

class Layout extends React.PureComponent {
  render() {
    return <>{this.props.children}</>;
  }
}

export default Layout;
