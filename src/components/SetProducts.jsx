import React,{Component} from "react";
import {connect} from "react-redux";
import {INIT_PRODUCTS} from "../Actions";


class SetProducts extends Component{
   
    constructor(props){
        super(props)
        this.SetProducts();
    }
    SetProducts() {
        let items = this.props.products;
        
        items.map( (item)=>{
            let chosen_attr = {}
            item.attributes.map( attribute=> {
                chosen_attr[attribute.id] = ""
                
            } )
            
            item["chosen_attr"] = chosen_attr
        })
        
        this.props.add_to_store(items);
    }
    render(){
        return(
            <div style={{"display":"none"}}>                
            </div>                       
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        add_products:state.init_products
    }
}
const mapDispatchToProps = () =>{
    return {
        add_to_store:INIT_PRODUCTS
    }
}


export default connect(mapStateToProps,mapDispatchToProps())(SetProducts);