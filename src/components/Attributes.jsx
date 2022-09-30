import React, { Component } from "react";
import ValueAttribute from "./ValueAttributes";
import ColorAttribute from "./ColorAttribute";

class Attributes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attributes: [],
            category: "",
            productName: "",    
        }
    }

    componentDidMount() {
        const {  attributes, category, name }  = this.props.product
        this.setState(prevState => ({ ...prevState, attributes: attributes, category: category, productName: name  }));    
    }

    render() {
        let {isMiniCart} = this.props
        return (
            <>
                {this.state.attributes.map((attribute, index) => {
                    if (attribute.type === "text") {
                        return <ValueAttribute key={index}
                          attribute={attribute} category={this.state.category} productName={this.state.productName} isCloth={this.state.productName === "Jacket"} isMiniCart={isMiniCart} />
                    }
                    return <ColorAttribute key={index}  attribute={attribute} productName={this.state.productName} isMiniCart={isMiniCart}  />
                })
                }
            </>
        )
    }
}

export default Attributes;