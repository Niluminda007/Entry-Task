import React, { Component } from "react";
import Attributes from "../components/Attributes";
import ItemCounter from "../components/ItemCounter";


class MiniCartCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item_count: 1
        }
    }

    isCloth = false

    checkIfColor(attr_item) {
        if (attr_item === "Color") {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div key={this.props.id} id={this.props.id} className="mini-cart-item"  >
                <div className="mini-cart-item-header">
                    <p className="mini-cart-item-brand">{this.props.brand} </p>
                    <p className="mini-cart-item-name"> {this.props.item_name}</p>
                    <p className="mini-cart-item-price"> {this.props.price.currency.symbol}{this.props.price.amount} </p>
                    <Attributes product={this.props.product} isMiniCart={true} />
                </div>

                <div className="mini-cart-item-footer">
                    <ItemCounter price={this.props.price.amount} product_id={this.props.id} isMiniCart={true} count={this.props.count} item_id={this.props.id} />
                    <img className="mini-item-img" src={this.props.images[0]} />
                </div>
            </div>
        );
    }
}

export default MiniCartCard