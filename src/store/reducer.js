const initialState = {
  activeRoute: "login",
};

const reducer = (state = initialState, action) => {
  let { activeRoute, type } = action;
  let updatedState = state;
  switch (type) {
    case "routeChange":
      updatedState = { ...state, activeRoute };
      break;
    default:
      break;
  }

  return updatedState;
};
export default reducer;
