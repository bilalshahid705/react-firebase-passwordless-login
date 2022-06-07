import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isUserAuth } = useSelector((state) => state.users);

  return (
    <Routes>
      <Route
        {...rest}
        element={(props) =>
          isUserAuth ? <Component {...props} /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
