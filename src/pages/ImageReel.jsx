import React,{Component} from "react";

class ImageReel extends Component{

    constructor(props){
        super(props)
        this.state ={
            main_img_index:0
        }
    }
    changeMainImage = (e)=>{
        const {id} = e.target
        this.setState({
            main_img_index:id
        })  
    }

    render(){
        if(Object.keys(this.props.img_list).length != null){
            return(
           
                <div className="product-head">
                    <div className="normal-product-img-container" >
                    {this.props.img_list.map( (img,index) =>{ return <img key={index} id={index} className="normal-img" src={img} onClick={this.changeMainImage}></img>})}
                    </div>
                    <div className="main-product-img-container">
                    <img alt="maing-img" className="main-img" src={this.props.img_list[this.state.main_img_index]} />
    
                    </div>
                </div>
            )
        }
        else{
            return
        } 
    }
}
export default ImageReel