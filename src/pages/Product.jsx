import React, { Component } from "react";
import Attributes from "../components/Attributes";
import ImageReel from "./ImageReel";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { INCREASE_ITEM, ADD_PRODUCT, ADD_TO_CART, FETCH_PRODUCT_ID, FETCH_ITEM, UPDATE_CART } from "../Actions";

class Product extends Component {

    handleAddToCart = (e) => {

        const { id } = e.target;
        const product_id = id.replace('-product-add', '')
        this.props.increase_item(1)
        this.props.add_product(this.props.product.prices[0].amount)

        const items = this.props.products.array

        let alreadyInCart = false;

        this.props.cart_items.items.forEach(cart_item => {
            if (cart_item.id === product_id) {
                alreadyInCart = true
                cart_item.count += 1
                this.props.update_cart({ ["id"]: cart_item.id, ["product"]: cart_item })
            }
        });

        if (!alreadyInCart) {
            const added_Item = items.filter(item => {
                return item.id === product_id
            })
            let [item] = added_Item
            item.count = 1

            this.props.add_to_cart(item);
        }
    }
    render() {
        const {gallery, brand, name ,id, prices,description} = this.props.product
        const {product , currency_id} = this.props
        return (
            <div className="product-container">

                <ImageReel img_list={gallery} />
                <div className="product-body">
                    <p className="item-brand">{brand}</p>
                    <p className="item-name">{name}</p>
                    <Attributes product={product} />

                    <p className="item-price-head">PRICE: <br /><small className="item-price">{prices[currency_id].currency.symbol}{prices[currency_id].amount}</small></p>
                    <button className="item-add-btn" id={`${id}-product-add`} onClick={this.handleAddToCart}>ADD TO CART</button>
                    <div className="item-descrip">{ReactHtmlParser(description)}</div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency_id: state.change_currency,
        cart_items: state.add_toCart,
        item_id: state.fetch_product,
        add_Item: state.item_counter,
        products: state.init_products

    }
}

const mapDispatchToProps = () => {
    return {
        add_to_cart: ADD_TO_CART,
        increase_item: INCREASE_ITEM,
        add_product: ADD_PRODUCT,
        fetch_item_id: FETCH_PRODUCT_ID,
        fetch_item: FETCH_ITEM,
        update_cart: UPDATE_CART,

    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Product)
