


import React, { useEffect, useState } from "react";
// import { AuthContex } from "./AuthContex";
import { auth } from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,                      
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
;
const googleProvider  = new GoogleAuthProvider()
                               
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };





  const signInWithGoogle = ()=>{
        setLoading(true);

       return signInWithPopup(auth,googleProvider)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOutUser,
    signInWithGoogle,
  };
  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
