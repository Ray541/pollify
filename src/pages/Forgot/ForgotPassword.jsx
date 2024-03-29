import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { PiPasswordFill } from "react-icons/pi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const initialValue = {
    email: "",
  };

  const validationSchema = () =>
    Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    });

  return (
    <div className="w-full p-5 flex-col min-h-[100vh] flex items-center justify-center bg-gray-900">
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            sendPasswordResetEmail(auth, values.email)
              .then(() => {
                alert("Password reset email sent!");
                resetForm();
              })
              .catch((error) => {
                alert(error);
              });
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <Form className="w-full p-5 bg-white border-2 border-gray-700 text-gray-700 flex flex-col gap-4 md:w-1/2 md:py-5 md:px-7 lg:w-1/3 rounded-xl">
          <h1 className="w-full text-3xl font-extrabold flex items-center justify-center flex-wrap">
            Forgot Password
            <PiPasswordFill />
          </h1>
          <div className="flex flex-col gap-2">
            <label className="text-md tracking-wider" htmlFor="email">
              Email
            </label>
            <Field
              className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="email"
              id="email"
              name="email"
              placeholder="Email...✉️"
            />
            <ErrorMessage className="text-black" name="email" component="div" />
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
            Send Reset Password Email
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
