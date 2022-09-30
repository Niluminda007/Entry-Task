import React, { Component } from "react";
import CommonCart from "../images/CommonCart.svg";
import { connect } from "react-redux";
import { INCREASE_ITEM, ADD_PRODUCT, ADD_TO_CART, FETCH_PRODUCT_ID, FETCH_ITEM, UPDATE_CART } from "../Actions";
import { Link } from "react-router-dom";

class Card extends Component {

    constructor(props) {
        super(props);
    }

    common_cart_url = { backgroundImage: 'url(' + CommonCart + ')', backgroundRepeat: "no-repeat" };
    handleProduct = () => {
        this.props.fetch_item_id(this.props.id)
        this.props.fetch_item(this.props.product)
    }

    handleAdd = (e) => {

        const { id } = e.target;
        const product_id = id.replace('-common-cart', '')
        this.props.increase_item(1)
        this.props.add_product(this.props.price.amount)

        var items = this.props.products.array

        let is_added = false

        this.props.cart_items["items"].forEach(cart_item => {
            if (cart_item.id === product_id) {
                is_added = true
                cart_item.count += 1
                this.props.update_item({ ["id"]: cart_item.id, ["product"]: cart_item })

            }
        });

        if (!is_added) {
            var added_Item = items.filter(item => {
                return item.id === product_id
            })
            let [item] = added_Item
            item["count"] = 1
            this.props.add_to_cart(item);
        }
    }


    render() {


        return (

            <div key={this.props.key} id={this.props.id} className={`product-card ${!this.props.inStock && "out-of-stock-card"}`} onClick={this.handleProduct} >
                <Link key={this.props.id} to={`${this.props.inStock && `/Products/${this.props.id}`}`} >
                    <div className="card-head">
                        <img alt="" src={this.props.src} className={`product-img ${!this.props.inStock && "out-of-stock-img"}`}></img>

                    </div>

                </Link>
                {!this.props.inStock && <div className="out-of-stock-overlay"><p>OUT OF STOCK</p></div>}
                <div className="card-footer">
                    <div>
                        <button className="common-cart-btn" id={`${this.props.id}-common-cart`} style={this.props.inStock ? this.common_cart_url : {}} onClick={this.props.inStock ? this.handleAdd : null}></button>

                    </div>
                    <p className="info">{this.props.item_name}</p>
                    <p className="info info-price">  {this.props.price.currency.symbol}{this.props.price.amount} </p>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        add_Item: state.item_counter,
        cart_items: state.add_toCart,
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
        update_item: UPDATE_CART

    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Card);