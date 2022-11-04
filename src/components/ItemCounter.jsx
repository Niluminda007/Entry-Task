import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  INCREASE_ITEM,
  ADD_PRODUCT,
  REMOVE_FROM_CART,
  UPDATE_CART,
  DELETE_STORED_ATTRIBUTE,
} from "../Actions";
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
    this.props.add_product(this.props.price);

    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1,
        sum: prevState.sum + this.props.price,
      };
    });
    let { item_id } = this.props;

    let y = 0;

    let [item] = this.props.cart_products.items.filter((item, index) => {
      if (item.id === item_id) {
        y = index;
      }
      return item.id === item_id;
    });
    item.count = this.state.counter + 1;

    this.props.update_cart({
      id: item_id,
      product: item,
      index: y,
    });
  };

  handleDecrease = (e) => {
    const { item_id } = this.props;

    let [item] = this.props.cart_products.items.filter((item) => {
      return item.id === item_id;
    });

    if (this.state.counter < 2) {
      this.props.remove_from_cart(item_id);
      this.props.delete_user_choice(item.name);
      this.setState({ counter: 0 });
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

    this.props.increase_item(-1);
    this.props.add_product(-this.props.price);
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
    add_product: ADD_PRODUCT,
    remove_from_cart: REMOVE_FROM_CART,
    update_cart: UPDATE_CART,
    delete_user_choice: DELETE_STORED_ATTRIBUTE,
  };
};

const mapStateToProps = (state) => {
  return {
    cart_products: state.add_toCart,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ItemCounter);
