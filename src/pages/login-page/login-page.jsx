import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebaseConfig";
import { emailValidation } from "../../utils/emailValidations";
import SmallLoader from "../../components/small-loader/small-loader.component";
import "./login.style.scss";

const LoginComponent = () => {
  const [errMessage, setErrMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "" });
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("emailForSignIn");
    if (
      firebase.auth().isSignInWithEmailLink(window.location.href) &&
      !!savedEmail
    ) {
      firebase
        .auth()
        .signInWithEmailLink(savedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .then(setIsAuth(true))
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
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

export default LoginComponent;
