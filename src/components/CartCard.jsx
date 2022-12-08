import React, { PureComponent } from "react";
import Attributes from "./Attributes";
import ItemCounter from "./ItemCounter";
import ImageSlider from "./ImageSlider";
import { UPDATE_CART } from "../Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CartCard extends PureComponent {
  storeAttr = (e, attr_id) => {
    const { value } = e.target;
    const item_id = this.props.id;
    const { items } = this.props.cart_products;

    const [selected_item] = items.filter((item) => item.id === item_id);

    selected_item.chosen_attr[attr_id] = value;
    this.props.update_cart({ id: item_id, product: selected_item });
  };

  render() {
    const {
      id,
      brand,
      price: { amount, currency },
      count,
      item_name,
    } = this.props;
    return (
      <div key={id} id={id} className="cart-item">
        <div className="cart-item-footer">
          <p className="cart-item-brand">{brand} </p>
          <p className="cart-item-name"> {item_name}</p>
          <p className="cart-item-price">
            {" "}
            {currency.symbol}
            {amount}{" "}
          </p>
          <Attributes product={this.props.product} isCart={true} />
        </div>

        <div className="cart-item-header">
          <ImageSlider id={id} />
          <ItemCounter price={amount} item_id={id} count={count} />
        </div>
      </div>
    );
  }
}

CartCard.propTypes = {
  product: PropTypes.object,
  id: PropTypes.string,
  images: PropTypes.array,
  item_name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.object,
  brand: PropTypes.string,
  attributes: PropTypes.array,
  count: PropTypes.number,
  chosen_attr: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cart_products: state.add_toCart,
  };
};
const mapDispatchToProps = () => {
  return {
    update_cart: UPDATE_CART,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CartCard);
