import LoginPage from "./pages/login-page/login-page.jsx";
import Dashboard from "./pages/dashboard-page/dashboard";
import Passwordless from "./pages/passwordless-page/passwordless";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { isUserAuth } = useSelector((state) => state.users);
  console.log("isUserAuth", isUserAuth);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isUserAuth ? (
            <>
              <Route path="/login" element={<LoginPage />} exact />
              <Route path="/" element={<Passwordless />} />
            </>
          ) : (
            <Route path="/dashboard" element={<Dashboard />} exact />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
