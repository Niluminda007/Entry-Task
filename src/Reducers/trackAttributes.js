const trackAttributesReducer = (state = [], action) => {
  switch (action.type) {
    case "RESTORE_ATTR_STYLE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default trackAttributesReducer;
