const selectedAttrReducer = (state = [], action) => {
  switch (action.type) {
    case "STORE_ATTRIBUTE":
      return [...state, action.payload];

    case "UPDATE_STORED_ATTRIBUTE":
      return state.filter((attr) => attr !== action.payload);

    case "DELETE_STORED_ATTRIBUTE":
      return state.filter((item) => !item.includes(action.payload));

    default:
      return state;
  }
};

export default selectedAttrReducer;
