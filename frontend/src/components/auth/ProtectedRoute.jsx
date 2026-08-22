import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  // Check whether user is logged in
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;