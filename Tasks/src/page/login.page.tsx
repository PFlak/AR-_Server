import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loginMethod
  } = useAuth();

  return (
    <>
      <main>
        <section>
          <div>
            <p> Test App </p>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button onClick={loginMethod}>Login</button>
              </div>

            <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
