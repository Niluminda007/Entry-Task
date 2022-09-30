import React,{Component} from "react";
import "./product.css";
import { graphql } from "react-apollo";
import PRODUCT_FETCH_QUERY from "../GraphQl/single_product";
import { withRouter } from "react-router-dom";
import Product from "./Product"

class ProductPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            product_id:this.props.match.params.id
        }
    }
    render(){
        let data = this.props.data
        if(data.loading){
            return  "Loading"
        }
        else{
            let {product} = data
            return(
                     
                <Product product={product} />       
            
                )
        }     
    }
}

export default withRouter(graphql(PRODUCT_FETCH_QUERY, {
    options: (props) => {
        const {id} = props.match.params;
        return {
            variables: {
                id
            }
        }
    }
})(ProductPage));