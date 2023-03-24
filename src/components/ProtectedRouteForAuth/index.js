import { useEffect } from "react";
import { connect } from "react-redux";

const ProtectedRouteForAuth = (props) => {
  let currentRoute = props.children.props.children;

  let { children } = props;

  useEffect(() => {
    props.onChangeActiveRoute(currentRoute);
  });
  return children;
};

const mapStateToProps = (state) => {
  return {
    activeRoute: state.activeRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeActiveRoute: (currentRoute) =>
      dispatch({
        type: "routeChange",
        activeRoute: currentRoute,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRouteForAuth);
