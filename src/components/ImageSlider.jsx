import React, { Component } from "react";
import "./imageSlider.css"
import left_arrow from "../images/left_arrow.svg"
import right_arrow from "../images/right_arrow.svg"
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class ImageSlider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            img_index: 0,
            img_list: [],
            images_len: 0
        }
    }

    left_arrow_url = { backgroundImage: 'url(' + left_arrow + ')', backgroundRepeat: "no-repeat", backgroundPosition: "center" };

    right_arrow_url = { backgroundImage: 'url(' + right_arrow + ')', backgroundRepeat: "no-repeat", backgroundPosition: "center" };

    componentDidMount() {
        const { items } = this.props.cart_products;
        const { gallery } = items.find(product => product.id === this.props.id);

        this.setState(prevState => ({ ...prevState, img_list: gallery, images_len: gallery.length }));
    }

    handleSlideRight = () => {
        
        this.setState((prevState) => {
            if (prevState.img_index == this.state.images_len - 1) {
                return { img_index: 0 }
            }
            return { img_index: prevState.img_index + 1 }
        }
        )
    }
    handleSlideLeft = () => {
        
        this.setState((prevState) => {
            if (prevState.img_index == 0) {
                return { img_index: this.state.images_len - 1 }
            }
            return { img_index: prevState.img_index - 1 }
        }
        )
    }
    render() {
        const { img_list, img_index ,images_len } = this.state;
        const containsMoreThanOneImage = images_len != 1;
        const imageAlt = `image_${img_index}`;

        return (
            <div className="img-slider">
                <img className="slider-img" alt={imageAlt} src={img_list[img_index]} />
                {containsMoreThanOneImage &&
                    <div className="slide-arrow-container">
                        <button id="left-arrow" onClick={this.handleSlideLeft} style={this.left_arrow_url}></button>
                        <button id="right-arrow" onClick={this.handleSlideRight} style={this.right_arrow_url}></button>
                    </div>
                }
            </div>
        )
    }
}
ImageSlider.propTypes = {
    id: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        cart_products: state.add_toCart
    }
}
export default connect(mapStateToProps, null)(ImageSlider);