import ItemCounterReducer from "./ItemCount";
import { combineReducers } from "redux";
import cartReducer from "./cart";
import productReducer from "./products";
import productCountReducer from "./productCount";
import miniCartReducer from "./minicart";
import productIDReducer from "./productID";
import activeCategoryReducer from "./activeCategory";
import getItemReducer from "./getItem";
import currencyConvertReducer from "./currencyConvert";

const allReducers = combineReducers({
  item_counter: ItemCounterReducer,
  add_toCart: cartReducer,
  init_products: productReducer,
  increase_item: productCountReducer,
  mini_cart_state: miniCartReducer,
  fetch_product: productIDReducer,
  change_category: activeCategoryReducer,
  get_item: getItemReducer,
  change_currency: currencyConvertReducer,
});

export default allReducers;
