import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, signInWithGooglePopup } from "../config/firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // TODO Zadanie 2 C - Rejestracja za pomoca emaila i hasla 'createUserWithEmailAndPassword'
  };

  const logGoogleUser = async () => {

    //TODO Zadanie 2 D - Rejestracja za pomoca Googla 'signInWithGooglePopup';
  };

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if(user !== null){
        navigate("/home")
      }
    });

    return unsubscribe;
  }, []);

  return (
    <main>
      <section>
        <div>
          <div>
            <h1> FocusApp </h1>
            <form>
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

              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <button
              style={{ backgroundColor: "blue", color: "whitesmoke" }}
              onClick={logGoogleUser}
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
