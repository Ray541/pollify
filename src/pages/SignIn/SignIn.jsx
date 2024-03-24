import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";

const SignIn = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Form Submited");
  };

  return (
    <div className="w-full p-5 flex-col min-h-[100vh] flex items-center justify-center bg-gray-900">
      <form className="w-full p-5 border-2 bg-white border-gray-700 text-gray-700 flex flex-col gap-4 md:w-1/2 md:py-5 md:px-7 lg:w-1/3 rounded-xl">
        <h1 className="w-full text-4xl font-extrabold flex items-center justify-center gap-2">
          Sign In <IoLogIn />
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-md tracking-wider" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
            type="email"
            id="email"
            placeholder="Email...✉️"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md tracking-wider" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
            type="password"
            id="password"
            placeholder="Password...🔑"
          />
        </div>
        <Link
          to={"/forgot-password"}
          className="w-full text-lg text-center font-bold hover:text-[#0088FF] tracking-wide transition-all duration-100 focus:outline-none focus:text-[#0088FF]"
        >
          Forgot Password?
        </Link>
        <p className="w-full text-center tracking-wide">
          Don't have an Account?{" "}
          <Link
            to={"/signup"}
            className="font-bold tracking-normal text-[#0088FF] text-[20px] hover:text-[#2B00FF] focus:outline-none focus:text-[#2B00FF]"
          >
            Sign Up
          </Link>
        </p>
        <Button value={"Sign In"} onClick={handleSignIn} />
      </form>
    </div>
  );
};

export default SignIn;
