import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions";
import CartCard from "../components/CartCard";
import CartFooter from "../components/CartFooter";
import "./Cart.css";

class Cart extends PureComponent {
  displayCartItems() {
    const items = this.props.products.items;
    return (
      <div className="cart-container">
        {items.map((item) => {
          return (
            <CartCard
              key={item.cart_item_id}
              product={item}
              id={item.cart_item_id}
              images={item.gallery}
              item_name={item.name}
              category={item.category}
              price={item.prices[this.props.currency_id]}
              brand={item.brand}
              attributes={item.attributes}
              count={item.count}
              chosen_attr={item.chosen_attr}
            />
          );
        })}
      </div>
    );
  }
  render() {
    if (this.props.mini_cart_state) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return (
      <div>
        <hr className="cart-item-line" />
        {this.displayCartItems()}
        <CartFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.add_toCart,
    currency_id: state.change_currency.id,
    items: state.add_toCart,
    mini_cart_state: state.mini_cart_state,
  };
};

const mapDispatchToProps = () => {
  return {
    add_to_cart: ADD_TO_CART,
    remove_from_cart: REMOVE_FROM_CART,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(Cart);
