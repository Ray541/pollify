import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Feeds from "./pages/Feeds/Feeds";
import Profile from "./pages/Profile/Profile";
import PageLayout from "./Layout/PageLayout";

function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/feeds" element={<Feeds />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
