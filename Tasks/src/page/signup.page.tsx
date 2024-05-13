import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    registerWithEmailPassword,
    registerWithGoogle
  } = useAuth();

  return (
    <main>
      <section>
        <div>
          <div>
            <h1> FocusApp </h1>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <button type="submit" onClick={registerWithEmailPassword}>
              Sign up
            </button>

            <button
              style={{ backgroundColor: "blue", color: "whitesmoke" }}
              onClick={registerWithGoogle}
            >
              Sign up with Google
            </button>
            <p>
              Already have an account? <NavLink to="/">Log in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
