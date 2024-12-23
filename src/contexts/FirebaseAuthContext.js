import { Loading } from "../components";
import { firebaseConfig } from "../config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const initialAuthState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FB_AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "FIREBASE",
  createUserWithEmail: (email, password) => Promise.resolve(),
  signInWithEmail: (email, password) => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new  GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("email")
    provider.addScope("profile")
    return signInWithPopup(auth, provider);
  };

  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "FB_AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              email: user.email,
              avatar: user.photoURL,
              name: user.displayName || user.email,
            },
          },
        });
      } else {
        dispatch({
          type: "FB_AUTH_STATE_CHANGED",
          payload: { isAuthenticated: false, user: null },
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!state.isInitialised) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        signInWithGoogle,
        method: "FIREBASE",
        signInWithEmail,
        createUserWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
