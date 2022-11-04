import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ImageReel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      main_img_index: 0,
    };
  }
  changeMainImage = (e) => {
    const { id } = e.target;
    this.setState({
      main_img_index: id,
    });
  };

  render() {
    if (Object.keys(this.props.img_list).length != null) {
      const { avalability } = this.props;
      return (
        <div className="product-head">
          <div className="normal-product-img-container">
            {this.props.img_list.map((img, index) => {
              return (
                <img
                  key={index}
                  id={index}
                  className="normal-img"
                  src={img}
                  alt={`${index} img`}
                  onClick={this.changeMainImage}
                ></img>
              );
            })}
          </div>
          <div className="main-product-img-container">
            {!avalability && (
              <div className="product-not-instock">OUT OF STOCK</div>
            )}
            <img
              alt="main-img"
              className={`${
                !avalability ? "product-not-instock-img" : ""
              } main-img`}
              src={this.props.img_list[this.state.main_img_index]}
            />
          </div>
        </div>
      );
    } else {
      return;
    }
  }
}
ImageReel.propTypes = {
  img_list: PropTypes.array,
  avalability: PropTypes.bool,
};
export default ImageReel;
