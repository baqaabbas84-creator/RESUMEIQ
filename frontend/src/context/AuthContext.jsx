import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
} from "../services/authService";


// =========================================================
// AUTH CONTEXT
// =========================================================

const AuthContext = createContext(null);


// =========================================================
// AUTH PROVIDER
// =========================================================

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    getCurrentUser()
  );

  const [loading, setLoading] =
    useState(false);


  // =======================================================
  // LOGIN
  // =======================================================

  const login = async (
    email,
    password
  ) => {

    setLoading(true);

    try {

      const data = await loginUser({
        email,
        password,
      });

      /*
        authService loginUser() should already
        save token/user into localStorage.
      */

      setUser(
        data?.user || null
      );

      return data;

    } finally {

      setLoading(false);

    }
  };


  // =======================================================
  // REGISTER
  // =======================================================

  const register = async (
    name,
    email,
    password
  ) => {

    setLoading(true);

    try {

      const data =
        await registerUser({
          name,
          email,
          password,
        });

      /*
        authService registerUser()
        should save token/user.
      */

      setUser(
        data?.user || null
      );

      return data;

    } finally {

      setLoading(false);

    }
  };


  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = () => {

    logoutUser();

    setUser(null);
  };


  // =======================================================
  // AUTHENTICATION STATUS
  // =======================================================

  const authenticated =
    Boolean(user) &&
    isAuthenticated();


  // =======================================================
  // CONTEXT VALUE
  // =======================================================

  const value = {

    user,

    loading,

    isAuthenticated:
      authenticated,

    login,

    register,

    logout,
  };


  // =======================================================
  // PROVIDER
  // =======================================================

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};


// =========================================================
// USE AUTH HOOK
// =========================================================

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;
};