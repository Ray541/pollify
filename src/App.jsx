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

function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/feeds" element={<Feeds />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/vote/:pollId" element={<Vote />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
