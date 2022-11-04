const productIDReducer = (id = "", action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_ID":
      return action.payload;
    default:
      return id;
  }
};

export default productIDReducer;
