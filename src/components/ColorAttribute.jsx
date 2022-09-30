import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { STORE_ATTRIBUTE, UPDATE_STORED_ATTRIBUTE } from "../Actions";
import {updateStylesOnComponentUpdate,storeStateOnComponentUnmount,displayStoredAttributes} from "../utils/attributeStyleHelper";

class ColorAttribute extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            clicked_attribute_id:"",
            clicked_attribute_value:"",
        }  
    }
    componentDidMount(){
        let {chosen_attrs} = this.props
        displayStoredAttributes(chosen_attrs)
    }
    componentDidUpdate(){
        let {clicked_attribute_id} = this.state
        let {chosen_attrs,update_user_choice} = this.props
       
        
        updateStylesOnComponentUpdate(clicked_attribute_id,chosen_attrs ,update_user_choice)
    }
    componentWillUnmount(){
        let {clicked_attribute_id} = this.state
        let {store_user_choice} = this.props
        storeStateOnComponentUnmount(clicked_attribute_id,store_user_choice)
    }
   
    handleClick = (e) => {
        
        const {id, value} = e.target;
        this.setState(
            {
                clicked_attribute_id: id,
                clicked_attribute_value: value
            }) 
    }

    render() {
        let {chosen_attrs} = this.props
        displayStoredAttributes(chosen_attrs)
        
        const {id:attrHeadingID,name,items} = this.props.attribute
        const {productName,isMiniCart} =  this.props
        const sub_item_class = isMiniCart ? "mini-attribute-sub-item-color" : "attribute-sub-item-color";

        return (
            <div key={attrHeadingID} className="cart-item-attributes" > 
                <h4 className="item-attr-heading">{name}:</h4>                  
                <div className="attribute-sub-items">
                {items.map(({value, id,displayValue},index)=>{
                    var sub_item_id = `${productName}_${id}-${name}`
                    
                    return (
                        <button key={index} value={displayValue} 
                            id={sub_item_id} style={{backgroundColor: value}} className={`${sub_item_class} ${this.state.clicked_attribute_id === sub_item_id && "cilcked_color_style"}`}
                            onClick={this.handleClick}></button>  
                        )
                })}
                </div> 
            </div> 
        )  
    }
}

ColorAttribute.propTypes = {
    attribute: PropTypes.object,
    productName: PropTypes.string,
    isMiniCart: PropTypes.bool,
    onClick: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        chosen_attrs: state.store_attr,
    }
}

const mapDispatchToProps = () => {
    return {
        store_user_choice: STORE_ATTRIBUTE,
        update_user_choice: UPDATE_STORED_ATTRIBUTE
    }
}
export default connect(mapStateToProps,mapDispatchToProps())(ColorAttribute);