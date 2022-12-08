import React, { PureComponent } from "react";
import Attributes from "../components/Attributes";
import ImageReel from "./ImageReel";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { INCREASE_ITEM, ADD_TO_CART, UPDATE_CART } from "../Actions";
import PropTypes from "prop-types";

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected_attrs: [],
    };
  }

  handleAddToCart = () => {
    this.props.increase_item(1);
    const item = this.getUpdatedProdcut();
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
          this.props.update_cart({
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
  storeUserChoice = (value, attr_heading) => {
    this.setState((state) => {
      state.selected_attrs.forEach((attr, index) => {
        if (Object.keys(attr).includes(attr_heading)) {
          state.selected_attrs.splice(index, 1);
        }
      });

      return {
        value: value,
        attr_heading: attr_heading,
        selected_attrs: [...state.selected_attrs, { [attr_heading]: value }],
      };
    });
  };

  getUpdatedProdcut = () => {
    const { selected_attrs } = this.state;
    let product = { ...this.props.product };
    let selected_attrs_obj = {};
    selected_attrs.forEach((attr) => {
      selected_attrs_obj = { ...selected_attrs_obj, ...attr };
    });

    Object.keys(product.chosen_attr).forEach((key) => {
      Object.keys(selected_attrs_obj).forEach((heading) => {
        if (key === heading) {
          const tempAttribute = {
            ...product.chosen_attr,
            [key]: selected_attrs_obj[heading],
          };
          product = { ...product, chosen_attr: tempAttribute };
        }
      });
    });

    return product;
  };

  render() {
    const { gallery, brand, name, id, prices, description, inStock } =
      this.props.product;
    const { product, currency_id } = this.props;
    return (
      <div className="product-container">
        <ImageReel img_list={gallery} avalability={inStock} />
        <div className="product-body">
          <p className="item-brand">{brand}</p>
          <p className="item-name">{name}</p>
          <Attributes
            product={product}
            avalability={inStock}
            onClick={this.storeUserChoice}
            isMiniCart={false}
            isCart={false}
          />

          <p className="item-price-head">
            PRICE: <br />
            <small className="item-price">
              {prices[currency_id].currency.symbol}
              {prices[currency_id].amount}
            </small>
          </p>
          <button
            className={`item-add-btn ${
              !inStock ? "item-add-btn-outofStock" : ""
            }`}
            id={`${id}-product-add`}
            onClick={this.handleAddToCart}
            disabled={!inStock}
          >
            ADD TO CART
          </button>
          <div className="item-descrip">{ReactHtmlParser(description)}</div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currency_id: state.change_currency.id,
    cart_items: state.add_toCart,
    item_id: state.fetch_product,
    add_Item: state.item_counter,
    products: state.init_products,
  };
};

const mapDispatchToProps = () => {
  return {
    add_to_cart: ADD_TO_CART,
    increase_item: INCREASE_ITEM,
    update_cart: UPDATE_CART,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Product);
