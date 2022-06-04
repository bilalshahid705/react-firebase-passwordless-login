import React, { useState } from "react";
import { emailValidation } from "../../utils/emailValidations";
import { BoxLoading } from "react-loadingg";
import SmallLoader from "../small-loader/small-loader.component";
import "./login.style.scss";

const LoginComponent = () => {
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "" });
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrMessage("");
  };

  const passwordLessEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (emailValidation(email.trim())) {
      try {
        setEmailSuccess(false);

        const host = window.location.host;
        window.localStorage.setItem("emailForSignIn", email.trim());
      } catch (e) {
        setError({ ...error, authorization: true });
      }
    } else {
      setEmailSuccess(false);
      alert("Email is incorrect");
    }
    setLoading(false);
  };

  return (
    <div className="login-page-style">
      <div className="sign-in-email-style">
        <h3>PasswordLess Login</h3>
        <br />
        <form
          className="sign-in-style"
          onSubmit={(e) => passwordLessEmailAuth(e)}
        >
          <input
            type="text"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="Enter your email..."
            label="Email"
            value={email}
            data-test="email-handler"
          />
          <button className="send-email-button" data-test="send">
            {!loading ? (
              "Send Email"
            ) : (
              <SmallLoader size="12px" borderSize="2px" />
            )}
          </button>
        </form>

        <p className="succes-style">
          {emailSuccess && (
            <>
              <i className="fas fa-check"></i> Check your email to complete
              login!
            </>
          )}
        </p>

        <p className="error-message">{errMessage}</p>
      </div>
    </div>
  );
};

export default LoginComponent;
