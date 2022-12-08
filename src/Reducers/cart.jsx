const initialState = {
  items: [],
  cart_item_id: 1,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let item = action.payload;
      item["cart_item_id"] = `cart_item_${state.cart_item_id}`;

      return {
        ...state,
        cart_item_id: state.cart_item_id + 1,
        items: state.items.concat([item]),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.cart_item_id !== action.payload),
        ],
      };

    case "UPDATE_CART":
      return {
        ...state,
        items: [
          ...state.items
            .filter((item) => item.cart_item_id !== action.payload.id)
            .splice(action.payload.index, 0, action.payload.product),
          ...state.items,
        ],
      };

    case "CHECK_OUT":
      return { ...state, items: [] };

    default:
      return state;
  }
};
export default cartReducer;
