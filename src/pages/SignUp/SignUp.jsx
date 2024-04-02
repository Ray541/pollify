import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { auth, firestore } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = () =>
    Yup.object({
      fullName: Yup.string().required("Full name is required"),
      userName: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be atleast 6 characters")
        .required("Password is required"),
    });

  return (
    <div className="w-full p-5 flex-col min-h-[100vh] flex items-center justify-center bg-gray-900">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const newUser = {
            fullName: values.fullName,
            userName: values.userName,
            email: values.email,
            password: values.password,
          };

          try {
            /**Creates a new collection in the firestore named users */
            await addDoc(collection(firestore, "users"), newUser);

            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                alert("Account Created Successfully");
                navigate("/signin");
              })
              .catch((error) => alert(error));
            resetForm();
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <Form className="w-full p-5 bg-white border-2 border-gray-700 text-gray-700 flex flex-col gap-4 md:w-1/2 md:py-5 md:px-7 lg:w-1/3 rounded-xl">
          <h1 className="w-full text-4xl font-extrabold flex items-center justify-center gap-2">
            Sign Up
            <FaUserPlus />
          </h1>
          <div className="flex flex-col gap-2">
            <label className="text-md tracking-wider" htmlFor="full-name">
              Full Name
            </label>
            <Field
              className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="text"
              name="fullName"
              id="full-name"
              placeholder="Full Name"
            />
            <ErrorMessage
              className="text-black"
              name="fullName"
              component="div"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-md tracking-wider" htmlFor="username">
              Username
            </label>
            <Field
              className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="text"
              name="userName"
              id="username"
              placeholder="Username"
            />
            <ErrorMessage
              className="text-black"
              name="userName"
              component="div"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-md tracking-wider" htmlFor="email">
              Email
            </label>
            <Field
              className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="email"
              name="email"
              id="email"
              placeholder="Email...✉️"
            />
            <ErrorMessage className="text-black" name="email" component="div" />
          </div>
          <div className="flex flex-col">
            <label className="text-md tracking-wider" htmlFor="password">
              Password
            </label>
            <Field
              className="w-full border-2 border-gray-500  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="password"
              name="password"
              id="password"
              placeholder="Password...🔑"
            />
            <ErrorMessage
              className="text-black"
              name="password"
              component="div"
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
          <button
            type="submit"
            className="py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
