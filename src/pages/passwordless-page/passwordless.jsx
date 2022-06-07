import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "../../firebase/firebaseConfig";
import { setUserAuth } from "../../redux/userAuthSlice";

const Passwordless = () => {
  const dispatch = useDispatch();

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
          dispatch(setUserAuth(true));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Passwordless;
