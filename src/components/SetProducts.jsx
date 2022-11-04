import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { INIT_PRODUCTS } from "../Actions";
import PropTypes from "prop-types";

class SetProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.SetProducts();
  }
  SetProducts() {
    let items = this.props.products;
    if (this.props.cart_items.items.length === 0) {
      items.forEach((item) => {
        let chosen_attr = {};
        item.attributes.forEach((attribute) => {
          chosen_attr[attribute.id] = "";
        });

        item["chosen_attr"] = chosen_attr;
      });

      this.props.add_to_store(items);
    }
  }
  render() {
    return <div style={{ display: "none" }}></div>;
  }
}

SetProducts.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    add_products: state.init_products,
    cart_items: state.add_toCart,
  };
};
const mapDispatchToProps = () => {
  return {
    add_to_store: INIT_PRODUCTS,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(SetProducts);
