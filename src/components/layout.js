import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import { publicRoutes, privateRoutes } from "../routes";

const nagivationAddress = (authenticated) => {
  if (authenticated) {
    return "/dashboard";
  } else {
    return "/login";
  }
};

const Layout = () => {
  const { isUserAuth } = useSelector((state) => state.users);

  let finalRoutes = [];
  switch (isUserAuth) {
    case true:
      finalRoutes = [...privateRoutes];
      break;
    case false:
      finalRoutes = [...publicRoutes];
      break;
    default:
      finalRoutes = [];
      break;
  }

  return (
    <div>
      <React.Suspense>
        <Routes>
          {finalRoutes.map(({ component: Component, ...rest }, idx) => {
            return (
              Component && (
                <Route
                  key={idx}
                  path={rest.path}
                  exact={rest.exact}
                  element={Component}
                />
              )
            );
          })}
          <Route
            path="*"
            element={<Navigate to={nagivationAddress(isUserAuth)} />}
          />
        </Routes>
      </React.Suspense>
    </div>
  );
};

export default Layout;
