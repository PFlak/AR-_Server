import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebase";

const Home = () => {

  const handleLogout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const readDoc = () => {
    //TODO Zadanie 3 - Odczytwanie z bazy danych i logowanie do consoli
  };

  const getUserSpecification = () => {
    console.log('------- User Specification ------');
    console.log(FIREBASE_AUTH.currentUser);
    console.log('------------------------');
  }

  return (
    <>
      <nav>
        <p>Welcome Home</p>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div>
          <button onClick={getUserSpecification}>Show User Specifiation</button> - They are avalible at console (F12)
        </div>

        <div>
          <button onClick={readDoc}> Read data from Database </button>
        </div>
      </nav>
    </>
  );
};

export default Home;
