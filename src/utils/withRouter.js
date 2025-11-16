import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <Component
        {...props}
        router={{ params, navigate, location }}
      />
    );
  }

  return ComponentWithRouterProp;
}
