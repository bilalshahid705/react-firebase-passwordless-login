import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "../../firebase/firebaseConfig";
import { setUserAuth } from "../../redux/userAuthSlice";

const Passwordless = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("emailForSignIn");
    console.log("window.location.href", window.location.href);
    if (
      firebase.auth().isSignInWithEmailLink(window.location.href) &&
      !!savedEmail
    ) {
      firebase
        .auth()
        .signInWithEmailLink(savedEmail, window.location.href)
        .then(() => {
          setIsAuth(true);
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(setUserAuth(isAuth));
    }
  }, [isAuth, dispatch]);
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Passwordless;
