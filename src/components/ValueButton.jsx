import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";

class ValueButton extends PureComponent {
  handleClick = (e) => {
    const { onClick } = this.props;
    const { id, value } = e.target;

    onClick(id, value);
  };

  checkIsSelected = () => {
    let isSelected = false;
    const { id } = this.props;
    const isCart = id.includes("miniCart") || id.includes("Cart");

    if (isCart) {
      const [, , values] = id.split("_");
      const [value, heading] = values.split("-");
      const { selected_attrs } = this.props;
      Object.keys(selected_attrs).forEach((attr) => {
        if (attr === heading && selected_attrs[attr] === value) {
          isSelected = true;
        }
      });
    }

    return isSelected;
  };

  render() {
    const { value, id, style, className, disabled } = this.props;
    const isSelected = this.checkIsSelected();

    return (
      <button
        value={value}
        id={id}
        style={style}
        className={`${className} ${isSelected ? "cilcked_normal_style" : ""}`}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {value}
      </button>
    );
  }
}
ValueButton.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    prodcuts: state.add_toCart,
  };
};
export default connect(mapStateToProps, null)(ValueButton);
