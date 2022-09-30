import React,{Component} from "react";
import {connect} from "react-redux";
import symbols from "../utils/currencySymbols";
import {CHECK_OUT,CLEAR_ITEM_COUNT } from "../Actions";
import getSum from "../utils/converter";

class CartFooter extends Component{

    handleCheckOut = ()=>{
        if(this.props.product_count > 0){
            this.props.products_check_out()
            this.props.empty_basket_count()
            alert("Checked Out Successfully")
        }
   }

    render(){
        return(
            <div className="footer-item-container">
            <p className="footer-info">Tax 21%: <small  className="info-value">{symbols[this.props.currency_state]}42</small></p>
            <p className="footer-info">Quantity: <small className="info-value">{this.props.item_count}</small></p>
            <p className="item-total footer-info">Total: <small className="info-value">{symbols[this.props.currency_state]}{getSum(this.props.items,this.props.currency_state).toFixed(2)}</small></p>
            <button className="order-btn" onClick={this.handleCheckOut}>ORDER</button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        item_count:state.increase_item,
        currency_state:state.change_currency,
        items:state.add_toCart,
        product_count:state.increase_item
    }
}
const mapDispatchToProps = ()=>{
    return {
        products_check_out:CHECK_OUT,
        empty_basket_count:CLEAR_ITEM_COUNT
    }
}
export default connect(mapStateToProps,mapDispatchToProps())(CartFooter);