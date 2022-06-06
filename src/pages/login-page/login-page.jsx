import React, { useState } from "react";
import firebase from "../../firebase/firebaseConfig";
import { emailValidation } from "../../utils/emailValidations";
import SmallLoader from "../../components/small-loader/small-loader.component";
import "./login.style.scss";

const LoginPage = () => {
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
    if (emailValidation(email.trim())) {
      setLoading(true);
      try {
        setEmailSuccess(false);
        firebase
          .auth()
          .sendSignInLinkToEmail(email, {
            url: "http://localhost:3000",
            handleCodeInApp: true,
          })
          .then(() => {
            window.localStorage.setItem("emailForSignIn", email);
            setEmailSuccess(true);
            setLoading(false);
          });
      } catch (e) {
        setError({ ...error, authorization: true });
      }
    } else {
      setEmailSuccess(false);
      alert("Email is incorrect");
    }
  };

  return (
    <div className="sign-in-email-style">
      <form
        className="sign-in-style"
        onSubmit={(e) => passwordLessEmailAuth(e)}
      >
        <h3>Login</h3>
        <input
          type="text"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="Enter your email..."
          label="Email"
          value={email}
        />
        <button className="send-email-button">
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
            <i className="fas fa-check"></i> Check your email to complete login!
          </>
        )}
      </p>

      <p className="error-message">{errMessage}</p>
    </div>
  );
};

export default LoginPage;
