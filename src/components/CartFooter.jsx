import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CHECK_OUT, CLEAR_ITEM_COUNT } from "../Actions";

class CartFooter extends PureComponent {
  handleCheckOut = () => {
    if (this.props.product_count > 0) {
      this.props.products_check_out();
      this.props.empty_basket_count();
      alert("Checked Out Successfully");
    }
  };

  getProdcutSum = () => {
    const {
      items: products,
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
      <div className="footer-item-container">
        <p className="footer-info">
          Tax 21%:{" "}
          <small className="info-value">
            {currencyItems[currency_id].symbol}42
          </small>
        </p>
        <p className="footer-info">
          Quantity:{" "}
          <small className="info-value">{this.props.item_count}</small>
        </p>
        <p className="item-total footer-info">
          Total:{" "}
          <small className="info-value">
            {currencyItems[currency_id].symbol}
            {product_sum.toFixed(2)}
          </small>
        </p>
        <button className="order-btn" onClick={this.handleCheckOut}>
          ORDER
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item_count: state.increase_item,
    currency: state.change_currency,
    items: state.add_toCart,
    product_count: state.increase_item,
    product_sum: state.product_sum,
  };
};
const mapDispatchToProps = () => {
  return {
    products_check_out: CHECK_OUT,
    empty_basket_count: CLEAR_ITEM_COUNT,
  };
};

CartFooter.propTypes = {
  item_count: PropTypes.number,
  currency: PropTypes.object,
  items: PropTypes.object,
  product_count: PropTypes.any,
  product_sum: PropTypes.number,
  products_check_out: PropTypes.func,
  empty_basket_count: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps())(CartFooter);
