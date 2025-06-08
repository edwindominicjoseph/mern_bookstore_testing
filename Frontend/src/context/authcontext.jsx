import { createContext, useContext } from "react";
import { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    //login a user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    //sign up with google
    const googleSignIn = async () => {
      return await signInWithPopup(auth, googleProvider);
    };

    // logout the user
    const logout = async () => {
      return await signOut(auth);
    };

    // manage user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
        email,
        username: displayName,
        photo: photoURL,
        };
        console.log("User data:", userData);
      }
      });

      return () => unsubscribe();
    }, []);

    

  const value = {
    currentUser,
    registerUser,
    loginUser,
    googleSignIn,
    logout,
    
    
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
