import React, { PureComponent } from "react";
import "./product.css";
import { withRouter } from "react-router-dom";
import Product from "./Product";
import { connect } from "react-redux";

class ProductPage extends PureComponent {
  render() {
    const {
      prodcuts: { array: prodcuts },
      match: {
        params: { id },
      },
    } = this.props;
    const prodcut = prodcuts.find((item) => {
      if (item.id === id) return item;
      return "";
    });
    if (prodcut) {
      return <Product product={prodcut} />;
    } else {
      return "loading";
    }
  }
}
const mapStateToProps = (state) => {
  return {
    prodcuts: state.init_products,
  };
};

export default withRouter(connect(mapStateToProps, null)(ProductPage));
