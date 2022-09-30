import React,{Component , createRef} from "react";
import {connect} from "react-redux";
import {CHANGE_CURRENCY } from "../Actions";
import symbols from "../utils/currencySymbols";
import dropDownArrow from "../images/dropDownArrow.svg";

class CurrencyDropDown extends Component{

    constructor(props){
        super(props)
        this.dropDownRef = createRef()
        this.state={
            currency_id: "0",
            is_dropDown_clicked: false
        }
    }

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

    dropDown_arrow_url = { backgroundImage: 'url(' + dropDownArrow + ')', backgroundRepeat: "no-repeat" };

    handleCurrency = e => {
        this.setState({
            is_dropDown_clicked: !this.state.is_dropDown_clicked
        })

    }
    handleCurrency_convert = e => {
        const { id } = e.target
        this.setState(prevState => {
            return { currency_id: id }
        })
        
        this.props.change_currency(parseInt(id))
    }
    render(){
        return (
            <div className="currency-dropdown" ref={this.dropDownRef}>
            <span className="currency-btn" onClick={this.handleCurrency}>
                {symbols[this.props.currency_state]}
                <button className={`currency-drop-arrow ${this.state.is_dropDown_clicked && "flip-drop-arrow"}`} style={this.dropDown_arrow_url}></button>
            </span>
            <div id="currency_content" className={`dropdown-content ${this.state.is_dropDown_clicked && "show"}`}>
                <li id="0" className="currency-item" onClick={this.handleCurrency_convert}>$ USD </li>
                <li id="1" className="currency-item" onClick={this.handleCurrency_convert}>£ GBP </li>
                <li id="2" className="currency-item" onClick={this.handleCurrency_convert}>A$ AUD</li>
                <li id="3" className="currency-item" onClick={this.handleCurrency_convert}>¥ JPY </li>
                <li id="4" className="currency-item" onClick={this.handleCurrency_convert}>₽ RUB</li>
            </div>
        </div>
        )   
    }
}

const mapStateToProps = (state)=>{
    return {
        currency_state: state.change_currency
    }

    
}

const mapDispatchToProps = () => {
    return {
        change_currency: CHANGE_CURRENCY


    }
}

export default connect(mapStateToProps,mapDispatchToProps())(CurrencyDropDown)