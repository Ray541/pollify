import Navbar from "../components/Navbar/Navbar";

// @ts-ignore
const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
