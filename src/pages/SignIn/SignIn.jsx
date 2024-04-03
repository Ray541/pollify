import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, firestore } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = () =>
    Yup.object({
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
          try {
            /**Sign In using firebase sign in function
             * it returns object and is stored in the user variable
             * Why? ---> as I have a different collection named users which contains all the user data
             * to access the currentUsers data I have stored the user data in user variable
             */
            const { user } = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );

            /**Stores the user data comming from the default signin function and authentication table of firebase
             * Navigate to Home Page
             */
            if (user) {
              localStorage.setItem("currentUser", JSON.stringify(user));
              navigate("/");
              resetForm();
            }

            const userId = user.uid;

            /**This is used to fetch the data from the firestore collection names users
             * Here, the uid in the users collection is compared with the user.uid which we get from the default authentication table in the firebase
             */
            const q = query(
              collection(firestore, "users"),
              where("uid", "==", userId)
            );

            /**If the collection with the user.uid exists then the user data from the firestore users collection is stored in localStorage */
            getDocs(q)
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  const snapshot = querySnapshot.docs[0];

                  localStorage.setItem(
                    "currentUserData",
                    JSON.stringify(snapshot.data())
                  );
                } else {
                  console.log("No documents found matching the query.");
                }
              })
              .catch((error) => {
                console.error("Error getting documents: ", error);
              });
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <Form className="w-full p-5 border-2 bg-white border-gray-700 text-gray-700 flex flex-col gap-4 md:w-1/2 md:py-5 md:px-7 lg:w-1/3 rounded-xl">
          <h1 className="w-full text-4xl font-extrabold flex items-center justify-center gap-2">
            Sign In <IoLogIn />
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
          <div className="flex flex-col">
            <label className="text-md tracking-wider" htmlFor="password">
              Password
            </label>
            <Field
              className="w-full border-2 border-gray-400  rounded-sm p-1 text-[black] outline-none focus:border-black"
              type="password"
              id="password"
              name="password"
              placeholder="Password...🔑"
            />
            <ErrorMessage
              className="text-black"
              name="password"
              component="div"
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
          <button
            type="submit"
            className="py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
          >
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
