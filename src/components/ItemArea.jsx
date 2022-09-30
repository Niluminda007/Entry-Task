import React, { Component } from "react";
import { graphql } from "react-apollo";
import ITEM_QUERY from "../GraphQl/Queries";
import Card from "./Card";
import SetProducts from "./SetProducts";
import { connect } from "react-redux";
import { ON_CLICK } from "../Actions";


class ItemArea extends Component {


    products = [];

    displayItems() {

        var data = this.props.data;

        if (data.loading) {
            return <div>Loading</div>
        }

        else {
            this.products = data.categories[0].products;
            let category = this.props.category_id

            return (
                <div className="item-container">
                    <SetProducts products={data.categories[0].products} />
                    {data.categories[0].products.map(item => {
                        if (category === "all") {
                            return (
                                <Card key={item.id} product={item} inStock={item.inStock} src={item.gallery[0]} item_name={item.name} price={item.prices[this.props.currency_id]} id={item.id} />
                            )
                        }
                        else if (category === item.category) {
                            return (
                                <Card key={item.id} product={item} inStock={item.inStock} src={item.gallery[0]} item_name={item.name} price={item.prices[this.props.currency_id]} id={item.id} />
                            )}
                        return

                            })}
                        
                </div>
            );
        }
    }

    render() {
        if (this.props.mini_cart_state) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }

        return (
            <div>
                <h1 className="category-heading">{this.props.category_id}</h1>
                {this.displayItems()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mini_cart_state: state.mini_cart_state,
        category_id: state.change_category,
        currency_id: state.change_currency
    }
}
const mapDispatchToProps = () => {
    return {
        handle_toggle: ON_CLICK
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(graphql(ITEM_QUERY)(ItemArea));