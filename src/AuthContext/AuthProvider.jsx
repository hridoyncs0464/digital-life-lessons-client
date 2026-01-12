import React, { useEffect, useState } from "react";
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
const googleProvider = new GoogleAuthProvider();

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
 const signInWithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider);
  };
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        await fetch(
          "https://digital-life-lessons-server-omega.vercel.app/lesson-users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName || "Anonymous",
            }),
          }
        );
      } catch (err) {
        console.error("Lesson user sync failed:", err);
      }
    }
  });

  return () => unsubscribe();
}, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);

  //     // CREATE LESSON USER IN DB
  //     if (currentUser?.email) {
  //       await fetch(
  //         "https://digital-life-lessons-server-omega.vercel.app/lesson-users",
  //         {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email: currentUser.email,
  //             name: currentUser.displayName || "Anonymous",
  //           }),
  //         }
  //       );
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  
  const AuthInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOutUser,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
