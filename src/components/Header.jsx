import React, { PureComponent } from "react";
import logo from "../images/brand.svg";
import cart from "../images/cart.svg";
import { connect } from "react-redux";
import { ON_CLICK, CHANGE_CATEGORY } from "../Actions";
import { Link } from "react-router-dom";
import MiniCart from "../pages/MiniCart";
import CurrencyDropDown from "./CurrencyDropDown";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      category_id: "all",
      currency_id: "0",
      is_dropDown_clicked: false,
    };
  }

  cart_url = {
    backgroundImage: "url(" + cart + ")",
    backgroundRepeat: "no-repeat",
  };
  logo_url = {
    backgroundImage: "url(" + logo + ")",
    backgroundRepeat: "no-repeat",
  };

  category_style = { color: "#5ECE7B", borderBottom: "solid 2px #5ECE7B" };
  categories = ["all", "clothes", "tech"];

  handleCategory = (e) => {
    const { id } = e.target;
    this.props.change_category(id);
    this.setState({
      category_id: id,
    });
  };

  handleCart = () => {
    const { mini_cart_click } = this.props;
    mini_cart_click();
  };

  render() {
    return (
      <div className="header">
        <nav className="category-nav">
          <ul className="category-links">
            {this.categories.map((category, index) => {
              return (
                <Link to={`/ItemArea/${category}`} key={index}>
                  <li
                    className="category-item"
                    id={`${category}`}
                    onClick={this.handleCategory}
                    style={
                      this.state.category_id === category
                        ? this.category_style
                        : null
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <Link to={`/ItemArea/${this.categories[0]}`}>
          <button
            id="all"
            onClick={this.handleCategory}
            className="logo-btn"
            style={this.logo_url}
          ></button>
        </Link>
        <span>
          <CurrencyDropDown />
          <button
            className="basket-cart-btn"
            style={this.cart_url}
            onClick={this.handleCart}
          >
            <span className="basket_count_shape" id="cart-basket">
              <p className="basket_count_number">{this.props.item_count}</p>
            </span>
          </button>
        </span>
        {this.props.mini_cart_state && <MiniCart />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item_count: state.increase_item,
    mini_cart_state: state.mini_cart_state,
    category_id: state.change_category,
    products: state.init_products,
  };
};
const mapDispatchToProps = () => {
  return {
    mini_cart_click: ON_CLICK,
    change_category: CHANGE_CATEGORY,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Header);
