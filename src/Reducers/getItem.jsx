const getItemReducer = (product = {}, action) => {
  switch (action.type) {
    case "FETCH_ITEM":
      return action.payload;
    default:
      return product;
  }
};

export default getItemReducer;
