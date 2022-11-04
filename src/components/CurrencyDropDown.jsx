import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import { CHANGE_CURRENCY } from "../Actions";
import dropDownArrow from "../images/dropDownArrow.svg";

class CurrencyDropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.dropDownRef = createRef();
    this.state = {
      currency_id: "0",
      is_dropDown_clicked: false,
    };
  }
  currencyDropDownItems = [
    { label: "USD", symbol: "$" },
    { label: "GBP", symbol: "£" },
    { label: "AUD", symbol: "A$" },
    { label: "JPY", symbol: "¥" },
    { label: "RUB", symbol: "₽" },
  ];

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.dropDownRef.current &&
      !this.dropDownRef.current.contains(event.target)
    ) {
      this.setState({
        is_dropDown_clicked: false,
      });
    }
  };

  dropDown_arrow_url = {
    backgroundImage: "url(" + dropDownArrow + ")",
    backgroundRepeat: "no-repeat",
  };

  handleCurrency = (e) => {
    this.setState({
      is_dropDown_clicked: !this.state.is_dropDown_clicked,
    });
  };
  handleCurrency_convert = (e) => {
    const { id } = e.target;
    this.setState({ currency_id: id });

    this.props.change_currency(parseInt(id));
  };

  render() {
    const { currencyItems } = this.props.currency_state;
    return (
      <div className="currency-dropdown" ref={this.dropDownRef}>
        <span className="currency-btn" onClick={this.handleCurrency}>
          {this.currencyDropDownItems[this.props.currency_state.id].symbol}
          <button
            className={`currency-drop-arrow ${
              this.state.is_dropDown_clicked && "flip-drop-arrow"
            }`}
            style={this.dropDown_arrow_url}
          ></button>
        </span>
        <ul
          id="currency_content"
          className={`dropdown-content ${
            this.state.is_dropDown_clicked && "show"
          }`}
        >
          {currencyItems.map((item, index) => {
            return (
              <li
                key={index}
                id={index}
                className="currency-item"
                onClick={this.handleCurrency_convert}
              >
                {`${item.symbol} `} {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency_state: state.change_currency,
  };
};

const mapDispatchToProps = () => {
  return {
    change_currency: CHANGE_CURRENCY,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CurrencyDropDown);
