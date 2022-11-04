import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CHECK_OUT, CLEAR_ITEM_COUNT, GET_PRODUCT_SUM } from "../Actions";
class CartFooter extends PureComponent {
  handleCheckOut = () => {
    if (this.props.product_count > 0) {
      this.props.products_check_out();
      this.props.empty_basket_count();
      alert("Checked Out Successfully");
    }
  };

  render() {
    const { id: currency_id, currencyItems } = this.props.currency;
    const { get_prodcut_sum, product_sum, items } = this.props;
    if (items.length > 0) {
      get_prodcut_sum({
        products: items,
        currencyState: currency_id,
      });
    }
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
    get_prodcut_sum: GET_PRODUCT_SUM,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(CartFooter);
