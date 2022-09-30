import ItemCounterReducer from "./ItemCount";
import {combineReducers} from "redux";
import cartReducer from "./cart";
import productReducer from "./products";
import productCountReducer from "./productCount";
import producSumReducer from "./productSum";
import miniCartReducer from "./minicart";
import trackAttributesReducer from "./trackAttributes";
import productIDReducer from "./productID";
import activeCategoryReducer from "./activeCategory";
import getItemReducer from "./getItem";
import currencyConvertReducer from "./currencyConvert";
import selectedAttrReducer from "./selectedAttr";

const allReducers = combineReducers(
    {item_counter:ItemCounterReducer,
    add_toCart:cartReducer,
    init_products:productReducer,
    increase_item:productCountReducer,
    product_sum:producSumReducer,
    mini_cart_state:miniCartReducer,
    restore_attr_style:trackAttributesReducer,
    fetch_product:productIDReducer,
    change_category:activeCategoryReducer,
    get_item:getItemReducer,
    change_currency:currencyConvertReducer,
    store_attr:selectedAttrReducer,
    
    
});

export default allReducers;