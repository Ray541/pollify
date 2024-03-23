import { Routes, Route } from "react-router-dom";
import { Home, About, Feeds, Profile, Vote, Result } from "./pages";
import PageLayout from "./Layout/PageLayout";

function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/feeds" element={<Feeds />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/vote" element={<Vote />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
