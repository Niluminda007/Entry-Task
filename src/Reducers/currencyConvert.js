const items = {
  id: 0,
  currencyItems: [
    { label: "USD", symbol: "$" },
    { label: "GBP", symbol: "£" },
    { label: "AUD", symbol: "A$" },
    { label: "JPY", symbol: "¥" },
    { label: "RUB", symbol: "₽" },
  ],
};
const currencyConvertReducer = (state = items, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};

export default currencyConvertReducer;
