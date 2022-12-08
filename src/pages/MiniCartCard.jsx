import React, { PureComponent } from "react";
import Attributes from "../components/Attributes";
import ItemCounter from "../components/ItemCounter";
import PropTypes from "prop-types";

class MiniCartCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item_count: 1,
    };
  }
  render() {
    return (
      <div key={this.props.id} id={this.props.id} className="mini-cart-item">
        <div className="mini-cart-item-header">
          <p className="mini-cart-item-brand">{this.props.brand} </p>
          <p className="mini-cart-item-name"> {this.props.item_name}</p>
          <p className="mini-cart-item-price">
            {" "}
            {this.props.price.currency.symbol}
            {this.props.price.amount}{" "}
          </p>
          <Attributes
            product={this.props.product}
            isMiniCart={true}
            isCart={false}
            avalability={true}
          />
        </div>

        <div className="mini-cart-item-footer">
          <ItemCounter
            price={this.props.price.amount}
            product_id={this.props.id}
            isMiniCart={true}
            count={this.props.count}
            item_id={this.props.product.cart_item_id}
          />
          <img
            className="mini-item-img"
            alt={`${this.props.item_name} mini-img`}
            src={this.props.images[0]}
          />
        </div>
      </div>
    );
  }
}
MiniCartCard.propTypes = {
  product: PropTypes.object,
  id: PropTypes.string,
  images: PropTypes.array,
  item_name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.object,
  brand: PropTypes.string,
  attributes: PropTypes.array,
  count: PropTypes.number,
  chosen_attrs: PropTypes.object,
};
export default MiniCartCard;
