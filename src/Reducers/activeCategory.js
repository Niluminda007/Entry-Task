const activeCategoryReducer = (category_id = "all", action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return action.payload;

    default:
      return category_id;
  }
};

export default activeCategoryReducer;
