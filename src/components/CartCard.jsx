import React, { Component } from "react";
import Attributes from "./Attributes";
import ItemCounter from "./ItemCounter";
import ImageSlider from "./ImageSlider";
import { UPDATE_CART } from "../Actions";
import { connect } from "react-redux";

class CartCard extends Component {
    constructor(props) {
        super(props)
    }
    isCloth = false

    checkIfColor(attr_item) {
        return attr_item === "Color";
    }

    storeAttr = (e, attr_id) => {

        const { value } = e.target;
        let item_id = this.props.id
        let { items } = this.props.cart_products

        let [selected_item] = items.filter(item => item.id == item_id);

        selected_item.chosen_attr[attr_id] = value
        this.props.update_cart({ ["id"]: item_id, ["product"]: selected_item })
    }


    render() {
        const { id, brand, price: { amount, currency }, count, item_name, } = this.props;
        return (
            <div key={id} id={id} className="cart-item">

                <div className="cart-item-footer">
                    <p className="cart-item-brand">{brand} </p>
                    <p className="cart-item-name"> {item_name}</p>
                    <p className="cart-item-price"> {currency.symbol}{amount} </p>
                    <Attributes product={this.props.product} />
                </div>

                <div className="cart-item-header">
                
                    <ImageSlider id={id} />
                    <ItemCounter price={amount} item_id={id} count={count} />
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        cart_products: state.add_toCart
    }
}
const mapDispatchToProps = () => {
    return {
        update_cart: UPDATE_CART
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(CartCard);