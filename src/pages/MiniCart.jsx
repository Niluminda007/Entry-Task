import React, { PureComponent, createRef } from "react";
import "./miniCart.css";
import { connect } from "react-redux";
import MiniCartCard from "./MiniCartCard";
import { Link } from "react-router-dom";
import { ON_CLICK, CHECK_OUT, CLEAR_ITEM_COUNT } from "../Actions";

class MiniCart extends PureComponent {
  constructor(props) {
    super(props);
    this.overLayRef = createRef();
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      !event.target.className.includes("basket") &&
      this.overLayRef.current &&
      !this.overLayRef.current.contains(event.target)
    ) {
      this.props.mini_cart_click();
    }
  };
  handle_overlay = (e) => {
    const { id } = e.target;
    if (id === "overlay") {
      this.props.mini_cart_click();
    }
  };
  handle_mini_cart = () => {
    this.props.mini_cart_click();
    document.body.classList.remove("modal-open");
  };

  handleCheckOut = () => {
    if (this.props.product_count > 0) {
      this.props.products_check_out();
      this.props.empty_basket_count();
      alert("Checked Out Successfully");
    }
  };
  getProdcutSum = () => {
    const {
      products,
      currency: { id },
    } = this.props;
    let total = 0;
    const { items } = products;
    if (items.length > 0) {
      items.forEach((item) => {
        total += item.prices[id].amount * item.count;
      });
    }
    return total;
  };

  render() {
    const { id: currency_id, currencyItems } = this.props.currency;
    const product_sum = this.getProdcutSum();

    return (
      <div
        className="mini-cart-overlay"
        id="overlay"
        ref={this.overLayRef}
        onClick={this.handle_overlay}
      >
        <div className="mini-cart-container " id="mini-cart">
          <div className="mini-cart-header">
            <p className="mini-cart-heading">
              My Bag,{" "}
              <span className="mini-item-count">
                {this.props.product_count} items
              </span>{" "}
            </p>
          </div>
          <div className="mini-cart-body">
            {this.props.products.items.map((item) => {
              return (
                <MiniCartCard
                  product={item}
                  key={item.cart_item_id}
                  id={item.id}
                  images={item.gallery}
                  item_name={item.name}
                  category={item.category}
                  price={item.prices[currency_id]}
                  brand={item.brand}
                  attributes={item.attributes}
                  count={item.count}
                  chosen_attrs={item.chosen_attr}
                />
              );
            })}
          </div>
          <div className="mini-cart-footer">
            <p>
              Total:{" "}
              <span className="mini-cart-sum">
                {currencyItems[currency_id].symbol} {product_sum.toFixed(2)}
              </span>{" "}
            </p>

            <div className="mini-cart-btns">
              <Link to={"/Cart"}>
                <button
                  className="mini-cart-cart-btn"
                  onClick={this.handle_mini_cart}
                >
                  VIEW BAG
                </button>
              </Link>
              <button
                className="mini-cart-checkOut-btn"
                onClick={this.handleCheckOut}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product_count: state.increase_item,
    product_sum: state.product_sum,
    products: state.add_toCart,
    currency: state.change_currency,
    mini_cart_state: state.mini_cart_state,
  };
};

const mapDispatchToProps = () => {
  return {
    mini_cart_click: ON_CLICK,
    products_check_out: CHECK_OUT,
    empty_basket_count: CLEAR_ITEM_COUNT,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(MiniCart);
