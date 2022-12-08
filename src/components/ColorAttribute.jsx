import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ColorButton from "./ColorButton";

class ColorAttribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked_attribute_id: "",
      clicked_attribute_value: "",
    };
  }

  setAttributeID(id, name) {
    const { isMiniCart, isCart, productName } = this.props;
    let attr_id = "";
    if (isMiniCart) {
      attr_id = `miniCart_${productName}_${id}-${name}`;
    } else if (isCart) {
      attr_id = `Cart_${productName}_${id}-${name}`;
    } else {
      attr_id = `${productName}_${id}-${name}`;
    }

    return attr_id;
  }

  handleClick = (id, value) => {
    const attr_heading = id.split("-").at(-1);
    this.setState({
      clicked_attribute_id: id,
      clicked_attribute_value: value,
    });
    const { onClick } = this.props;
    onClick(value, attr_heading);
  };

  render() {
    const { id: attrHeadingID, name, items } = this.props.attribute;
    const { isMiniCart, avalability, isCart } = this.props;
    const clickable = isMiniCart || isCart ? true : false;
    const sub_item_class = isMiniCart
      ? "mini-attribute-sub-item-color"
      : "attribute-sub-item-color";

    return (
      <div
        key={attrHeadingID}
        className={`${
          isMiniCart ? "mini-cart-item-attributes" : "cart-item-attributes"
        }`}
      >
        <p
          className={`${
            isMiniCart ? ".mini-cart-item-header" : "item-attr-heading"
          }`}
        >
          {name}:
        </p>
        <div className="attribute-sub-items">
          {items.map(({ value, id, displayValue }, index) => {
            const sub_item_id = this.setAttributeID(id, name);
            const className = `${sub_item_class} ${
              this.state.clicked_attribute_id === sub_item_id &&
              "cilcked_color_style"
            }`;
            return (
              <ColorButton
                key={index}
                value={displayValue}
                id={sub_item_id}
                style={{ backgroundColor: value }}
                className={className}
                onClick={this.handleClick}
                disabled={!avalability || clickable}
                selected_attrs={this.props.selected_attrs}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ColorAttribute.propTypes = {
  attribute: PropTypes.object,
  productName: PropTypes.string,
  isMiniCart: PropTypes.bool,
  isCart: PropTypes.bool,
  onClick: PropTypes.func,
  selected_attrs: PropTypes.object,
};

export default ColorAttribute;
