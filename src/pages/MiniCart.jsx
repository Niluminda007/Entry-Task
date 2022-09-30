import React,{Component} from "react";
import "./miniCart.css";
import {connect} from "react-redux";
import MiniCartCard from "./MiniCartCard";
import {Link} from "react-router-dom"
import { ON_CLICK,CHECK_OUT,CLEAR_ITEM_COUNT } from "../Actions";
import symbols from "../utils/currencySymbols";
import getSum from "../utils/converter";

class MiniCart extends Component{

   handle_mini_cart = ()=>{
    this.props.mini_cart_click()
    document.body.classList.remove('modal-open')
   }

   handleCheckOut = ()=>{
        if(this.props.product_count > 0){
            this.props.products_check_out()
            this.props.empty_basket_count()
            alert("Checked Out Successfully")
        }
   }
    render(){
        return (
            <div className="mini-cart-container" id="mini-cart" >
                <div className="mini-cart-header">
                <p className="mini-cart-heading">My Bag, <span className="mini-item-count">{this.props.product_count} items</span> </p>

                </div>
                <div className="mini-cart-body">
                {this.props.products.items.map( item=>{
                    return <MiniCartCard product={item} key={item.id} id={item.id} images={item.gallery} item_name={item.name} category={item.category} price={item.prices[this.props.currency_id]}  brand={item.brand} attributes={item.attributes} count={item.count} />
                }) }
                    
                </div>
                <div className="mini-cart-footer">

                <p>Total: <span className="mini-cart-sum">{symbols[this.props.currency_state]} {getSum(this.props.products,this.props.currency_state).toFixed(2)}</span> </p>

                <div className="mini-cart-btns">
                <Link to={'/Cart'}><button className="mini-cart-cart-btn" onClick={this.handle_mini_cart}>VIEW BAG</button></Link>
                <button className="mini-cart-checkOut-btn" onClick={this.handleCheckOut}>CHECK OUT</button>

                </div>       
                </div>
            </div>
        )
    }
}
const mapStateToProps =  (state)=>{
    return {
        product_count:state.increase_item,
        product_sum:state.product_sum,
        products:state.add_toCart,
        currency_id:state.change_currency,
        mini_cart_state:state.mini_cart_state,
        currency_state:state.change_currency

    }
}

const mapDispatchToProps = ()=>{
    return {
        mini_cart_click:ON_CLICK,
        products_check_out:CHECK_OUT,
        empty_basket_count:CLEAR_ITEM_COUNT
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(MiniCart);