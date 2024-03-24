import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";

const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Form Submited");
  };

  return (
    <div className="w-full p-5 flex-col min-h-[100vh] flex items-center justify-center bg-gray-900">
      <form className="w-full p-5 bg-white border-2 border-gray-700 text-gray-700 flex flex-col gap-4 md:w-1/2 md:py-5 md:px-7 lg:w-1/3 rounded-xl">
        <h1 className="w-full text-4xl font-extrabold flex items-center justify-center gap-2">
          Sign Up
          <FaUserPlus />
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-md tracking-wider" htmlFor="full-name">
            Full Name
          </label>
          <input
            className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
            type="text"
            id="full-name"
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md tracking-wider" htmlFor="username">
            Username
          </label>
          <input
            className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md tracking-wider" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
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
            className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
            type="password"
            id="password"
            placeholder="Password...🔑"
          />
        </div>
        <p className="w-full text-center tracking-wide">
          Have an Account?{" "}
          <Link
            to={"/signin"}
            className="font-bold tracking-normal text-[#0088FF] text-[20px] hover:text-[#2B00FF] focus:outline-none focus:text-[#2B00FF]"
          >
            Sign In
          </Link>
        </p>
        <Button value={"Sign Up"} onClick={handleSignUp} />
      </form>
    </div>
  );
};

export default SignUp;
