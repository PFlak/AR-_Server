import React from "react";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //Testy czytania z firestore
  const readDoc = () => {
    const docReference = collection(db, "Competitions");
    getDocs(docReference).then((querySnapschot) => {
      const data = querySnapschot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
    });
  };

  return (
    <>
      <nav>
        <p>Welcome Home</p>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div>
          <button onClick={readDoc}>Show Data</button>
        </div>
      </nav>
    </>
  );
};

export default Home;
