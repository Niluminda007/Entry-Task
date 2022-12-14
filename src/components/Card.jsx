import React, { PureComponent } from "react";
import CommonCart from "../images/CommonCart.svg";
import { connect } from "react-redux";
import {
  INCREASE_ITEM,
  ADD_TO_CART,
  FETCH_PRODUCT_ID,
  FETCH_ITEM,
  UPDATE_CART,
} from "../Actions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Card extends PureComponent {
  common_cart_url = {
    backgroundImage: "url(" + CommonCart + ")",
    backgroundRepeat: "no-repeat",
  };
  handleProduct = () => {
    this.props.fetch_item_id(this.props.id);
    this.props.fetch_item(this.props.product);
  };

  handleAdd = () => {
    this.props.increase_item(1);
    const item = this.props.product;
    if (Object.values(item.chosen_attr).every((val, i, arr) => val === "")) {
      Object.keys(item.chosen_attr).forEach((heading) => {
        item.attributes.forEach((attr) => {
          if (heading === attr.id) {
            item.chosen_attr[heading] = attr.items[0]["value"];
          }
        });
      });
    }
    let alreadyInCart = false;
    this.props.cart_items.items.forEach((cart_item) => {
      if (cart_item.id === item.id) {
        if (
          Object.entries(cart_item.chosen_attr).toString() ===
          Object.entries(item.chosen_attr).toString()
        ) {
          alreadyInCart = true;
          cart_item.count += 1;
          this.props.update_item({
            id: cart_item.id,
            product: cart_item,
          });
        }
      }
    });

    if (!alreadyInCart) {
      item.count = 1;
      this.props.add_to_cart(item);
    }
  };
  render() {
    return (
      <div
        key={this.props.key}
        id={this.props.id}
        className={`product-card ${!this.props.inStock && "out-of-stock-card"}`}
        onClick={this.handleProduct}
      >
        <Link key={this.props.id} to={`/Products/${this.props.id}`}>
          <div className="card-head">
            <img
              alt=""
              src={this.props.src}
              className={`product-img ${
                !this.props.inStock && "out-of-stock-img"
              }`}
            ></img>
          </div>

          {!this.props.inStock && (
            <div className="out-of-stock-overlay">
              <p>OUT OF STOCK</p>
            </div>
          )}
          <div className="card-footer">
            <p className="info">{this.props.item_name}</p>
            <p className="info info-price">
              {" "}
              {this.props.price.currency.symbol}
              {this.props.price.amount}{" "}
            </p>
          </div>
        </Link>
        <div>
          <button
            className={`${
              !this.props.inStock
                ? "outofstock-common-cart-btn"
                : "common-cart-btn"
            }`}
            id={`${this.props.id}-common-cart`}
            style={this.common_cart_url}
            onClick={this.props.inStock ? this.handleAdd : null}
            disabled={!this.props.inStock}
          ></button>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  product: PropTypes.object,
  inStock: PropTypes.bool,
  src: PropTypes.string,
  item_name: PropTypes.string,
  price: PropTypes.object,
  id: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    add_Item: state.item_counter,
    cart_items: state.add_toCart,
    products: state.init_products,
  };
};

const mapDispatchToProps = () => {
  return {
    add_to_cart: ADD_TO_CART,
    increase_item: INCREASE_ITEM,
    fetch_item_id: FETCH_PRODUCT_ID,
    fetch_item: FETCH_ITEM,
    update_item: UPDATE_CART,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Card);
