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
              key={item.id}
              product={item}
              id={item.id}
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
  };
};

const mapDispatchToProps = () => {
  return {
    add_to_cart: ADD_TO_CART,
    remove_from_cart: REMOVE_FROM_CART,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(Cart);
