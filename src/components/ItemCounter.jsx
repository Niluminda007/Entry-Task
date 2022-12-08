import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { INCREASE_ITEM, REMOVE_FROM_CART, UPDATE_CART } from "../Actions";
import PropTypes from "prop-types";
class ItemCounter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.count,
      sum: this.props.price,
    };
  }

  handleIncrease = (e) => {
    this.props.increase_item(1);
    this.setState((prevState) => ({
      ...prevState,
      counter: this.state.counter + 1,
      sum: this.state.sum + this.props.price,
    }));

    const { item_id } = this.props;

    let item_index = 0;

    const [item] = this.props.cart_products.items.filter((item, index) => {
      if (item.cart_item_id === item_id) {
        item_index = index;
      }
      return item.cart_item_id === item_id;
    });
    item.count = this.state.counter + 1;

    this.props.update_cart({
      id: item_id,
      product: item,
      index: item_index,
    });
  };

  handleDecrease = (e) => {
    const { item_id } = this.props;
    this.props.increase_item(-1);
    const item = this.props.cart_products.items.find((item) => {
      return item.cart_item_id === item_id;
    });

    if (this.state.counter < 2) {
      this.props.remove_from_cart(item_id);
      this.setState({ coutner: 0 });
    } else {
      this.setState((prevState) => {
        return {
          counter: prevState.counter - 1,
          sum: prevState.sum - this.props.price,
        };
      });
      item.count = this.state.counter - 1;
      this.props.update_cart({ id: item_id, product: item });
    }
  };
  render() {
    return (
      <div
        className={
          this.props.isMiniCart
            ? "mini-item-counter-container"
            : "item-counter-container"
        }
      >
        <button
          className={
            this.props.isMiniCart
              ? "mini-item-count-change-btn"
              : "item-count-change-btn"
          }
          onClick={this.handleIncrease}
          id={this.props.isMiniCart ? "mini-increase-btn" : "increase-btn"}
        >
          +
        </button>

        <p>{this.state.counter}</p>

        <button
          className={
            this.props.isMiniCart
              ? "mini-item-count-change-btn"
              : "item-count-change-btn"
          }
          onClick={this.handleDecrease}
          id={this.props.isMiniCart ? "mini-decrease-btn" : "decrease-btn"}
        >
          -
        </button>
      </div>
    );
  }
}

ItemCounter.propTypes = {
  price: PropTypes.any,
  item_id: PropTypes.string,
  count: PropTypes.number,
};

const mapDispatchToProps = () => {
  return {
    increase_item: INCREASE_ITEM,
    remove_from_cart: REMOVE_FROM_CART,
    update_cart: UPDATE_CART,
  };
};

const mapStateToProps = (state) => {
  return {
    cart_products: state.add_toCart,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ItemCounter);
