const miniCartReducer = (clicked = false, action) => {
  switch (action.type) {
    case "ON_CLICK":
      return !clicked;

    default:
      return clicked;
  }
};

export default miniCartReducer;
