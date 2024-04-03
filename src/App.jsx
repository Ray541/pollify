import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  ForgotPassword,
  Home,
  About,
  Feeds,
  Profile,
  Vote,
  Result,
} from "./pages";
import PageLayout from "./Layout/PageLayout";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    /**Return loading state until authentication status is determined */
    return <Spinner />;
  }

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/signin" element={!isLoggedIn ? <SignIn /> : <Home />} />
          <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Home />} />
          <Route
            path="/forgot-password"
            element={!isLoggedIn ? <ForgotPassword /> : <Home />}
          />
          <Route path="/" element={isLoggedIn ? <Home /> : <SignIn />} />
          <Route path="/feeds" element={isLoggedIn ? <Feeds /> : <SignIn />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <SignIn />} />
          <Route
            path="/vote/:pollId"
            element={isLoggedIn ? <Vote /> : <SignIn />}
          />
          <Route
            path="/result/:pollId"
            element={isLoggedIn ? <Result /> : <SignIn />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <SignIn />}
          />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
