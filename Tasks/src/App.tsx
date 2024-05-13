import { useState, useEffect } from "react";
import Home from "./page/home.page";
import Signup from "./page/signup.page";
import Login from "./page/login.page";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FIREBASE_AUTH } from "./config/firebase";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace={true} /> }/>
    </Routes>
  )
}

function MainRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Navigate to="/" replace={true} /> }/>
    </Routes>
  )
}

function App() {
  const [isAuthorizated, setIsAuthorizated] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setIsAuthorizated(user !== null);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      {
        isAuthorizated ? (
          <MainRouter/>
        ) : (
          <AuthRouter/>
        )
      }
    </Router>
  );
}

export default App;