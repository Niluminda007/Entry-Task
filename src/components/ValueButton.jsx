import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";

class ValueButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }
  componentDidMount() {
    const { id } = this.props;
    const isCart = id.includes("miniCart") || id.includes("Cart");

    if (isCart) {
      const [, itemId, values] = id.split("_");
      const [value, heading] = values.split("-");
      const {
        prodcuts: { items },
      } = this.props;
      const product = items.find((item) => item.name === itemId);
      const { chosen_attr } = product;
      Object.keys(chosen_attr).forEach((attr) => {
        if (attr === heading && chosen_attr[attr] === value) {
          this.setState({ isSelected: true });
        }
      });
    }
  }

  handleClick = (e) => {
    const { onClick } = this.props;
    const { id, value } = e.target;

    onClick(id, value);
  };

  render() {
    const { value, id, style, className, disabled } = this.props;
    const { isSelected } = this.state;
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
