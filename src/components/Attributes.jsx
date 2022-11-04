import React, { PureComponent } from "react";
import ValueAttribute from "./ValueAttributes";
import ColorAttribute from "./ColorAttribute";
import PropTypes from "prop-types";

class Attributes extends PureComponent {
  constructor(props) {
    super(props);
    const { attributes, category, name } = this.props.product;
    this.state = {
      attributes: attributes,
      category: category,
      productName: name,
    };
  }
  render() {
    const { isMiniCart, avalability, isCart } = this.props;
    return (
      <>
        {this.state.attributes.map((attribute, index) => {
          if (attribute.type === "text") {
            return (
              <ValueAttribute
                key={index}
                attribute={attribute}
                category={this.state.category}
                productName={this.state.productName}
                product={this.props.product}
                isMiniCart={isMiniCart}
                avalability={avalability}
                onClick={this.props.onClick}
                selected_attrs={this.props.chosen_attrs}
                isCart={isCart}
              />
            );
          }
          return (
            <ColorAttribute
              key={index}
              attribute={attribute}
              productName={this.state.productName}
              isMiniCart={isMiniCart}
              avalability={avalability}
              onClick={this.props.onClick}
              isCart={isCart}
            />
          );
        })}
      </>
    );
  }
}
Attributes.propTypes = {
  product: PropTypes.object,
  avalability: PropTypes.bool,
  isMiniCart: PropTypes.bool,
  isCart: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Attributes;
