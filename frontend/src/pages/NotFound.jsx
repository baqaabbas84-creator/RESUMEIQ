import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1>Create Account</h1>

      <form>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Create a password"
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Register;