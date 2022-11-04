const getSum = (payload) => {
  const { products, currencyState } = payload;
  let total = 0;
  const { items } = products;
  items.forEach((item) => {
    total += item.prices[currencyState].amount * item.count;
  });

  return total;
};
const producSumReducer = (sum = 0, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return sum + action.payload;
    case "GET_PRODUCT_SUM":
      return getSum(action.payload);
    default:
      return sum;
  }
};

export default producSumReducer;
