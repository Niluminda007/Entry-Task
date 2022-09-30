import React, { Component, createRef } from "react";
import logo from "../images/brand.svg";
import cart from "../images/cart.svg";
import { connect } from "react-redux";
import { ON_CLICK, CHANGE_CATEGORY} from "../Actions";
import { Link } from "react-router-dom";
import MiniCart from "../pages/MiniCart";
import CurrencyDropDown from "./CurrencyDropDown";




class Header extends Component {
    constructor(props) {
        super(props);
        this.miniCartRef = createRef()
        this.state = {
            category_id: "all",
            currency_id: "0",
            is_dropDown_clicked: false
           

        };
    }

    cart_url = { backgroundImage: 'url(' + cart + ')', backgroundRepeat: "no-repeat" };
    category_style = { color: "#5ECE7B", borderBottom: "solid 2px #5ECE7B" };
    categories = ["all", "clothes","tech"]


    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
          this.miniCartRef.current &&
          !this.miniCartRef.current.contains(event.target)
        ) {
          this.props.mini_cart_click()
        }
      };


    handleCategory = (e) => {
        const { id } = e.target;
        this.props.change_category(id)
        this.setState({
            category_id: id
        });
    }

    handle_overlay = (e) => {
        const { id } = e.target
       
        if (id === "overlay") {
            this.props.mini_cart_click()
        }
      
    }

    handleCart = () => {
        this.props.mini_cart_click()
    }

    render() {
        return (
            <div className="header">
                <nav className="category-nav">

                    <ul className="category-links">

                        <Link to={`/ItemArea/${this.categories[0]}`}><li className="category-item" id="all" onClick={this.handleCategory} style={this.state.category_id === "all" ? this.category_style : null} >All</li></Link>
                        <Link to={`/ItemArea/${this.categories[1]}`}><li className="category-item" id="clothes" onClick={this.handleCategory} style={this.state.category_id === "clothes" ? this.category_style : null} >Clothes</li></Link>
                        <Link to={`/ItemArea/${this.categories[2]}`}><li className="category-item" id="tech" onClick={this.handleCategory} style={this.state.category_id === "tech" ? this.category_style : null}>Tech</li></Link>
                    </ul>
                </nav>
                    <img className="brand" src={logo} alt="brand"></img>
                <span>
                    <CurrencyDropDown />
                    <button className="cart-btn" style={this.cart_url} onClick={this.handleCart}  ><span className="basket_count_shape"  ><p className="basket_count_number">{this.props.item_count}</p></span></button>

                </span>
                {this.props.mini_cart_state && <div onClick={this.handle_overlay}  id="overlay" ref={this.miniCartRef}>
                    <MiniCart />

                </div>}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        item_count: state.increase_item,
        mini_cart_state: state.mini_cart_state,
        category_id: state.change_category
    }
}
const mapDispatchToProps = () => {
    return {
        mini_cart_click: ON_CLICK,
        change_category: CHANGE_CATEGORY,
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Header);