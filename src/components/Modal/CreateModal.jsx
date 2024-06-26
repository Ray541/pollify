import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "../../firebase/firebase";
import Button from "../Button/Button";

const deleteIcon = <RiDeleteBin5Fill className="text-lg lg:text-2xl" />;

const CreateModal = ({ isOpen, onClose, onPollCreated }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const initialValues = {
    question: "",
    options: ["", ""], // Two options by default
    createdAt: "",
    creatorId: "",
    createdBy: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    options: Yup.array()
      .of(Yup.string().required("Option is required"))
      .min(2, "At least 2 options are required")
      .max(4, "No more than 4 options allowed"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));

    const pollCreatorUserName = currentUserData.userName;

    const newPoll = {
      question: values.question,
      options: values.options,
      createdAt: new Date(),
      creatorId: currentUser.uid,
      createdBy: pollCreatorUserName,
    };

    try {
      // Add the poll to the "polls" collection
      const pollDocRef = await addDoc(collection(firestore, "polls"), newPoll);

      // Create an array to store option promises
      const optionPromises = [];

      // For each option, create a document in the "options" collection
      values.options.forEach((option) => {
        const newOption = {
          pollId: pollDocRef.id, // Use the ID of the created poll
          option: option,
        };
        const optionPromise = addDoc(
          collection(firestore, "options"),
          newOption
        );
        optionPromises.push(optionPromise);
      });

      // Wait for all option documents to be created
      await Promise.all(optionPromises);
      resetForm();
      onPollCreated();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <section className="w-full min-h-screen fixed top-0 flex items-center justify-center text-white bg-[#00000069] z-50">
      <div className="w-full mx-5 p-3 lg:py-10 rounded-xl h-auto bg-gray-600 md:w-1/2 lg:w-1/3 flex flex-col gap-3">
        <div className="flex justify-between md:px-10">
          <h1 className="text-[1.75rem] tracking-wide">Create a Poll</h1>
          <button
            className={
              "flex items-center justify-center gap-1 bg-[#0088FF] hover:bg-gray-900 focus:bg-gray-900 focus:outline-none px-2 rounded-md transition-all duration-200"
            }
            onClick={onClose}
          >
            <IoMdClose /> Close
          </button>
        </div>

        {/* Form */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values }) => (
            <Form className="flex flex-col items-center gap-4 md:px-8 lg:px-10">
              <div className="w-full">
                <label htmlFor="question">Poll Question</label>
                <Field
                  className="w-full p-1 text-gray-900 mt-1 rounded-sm focus:outline-none border-2 border-transparent focus:border-2 focus:border-gray-900"
                  name="question"
                  type="text"
                  placeholder="Type Poll Question"
                />
                <ErrorMessage
                  className="text-black"
                  name="question"
                  component="div"
                />
              </div>

              <FieldArray name="options">
                {({ push, remove }) => (
                  <div className="w-full flex flex-col gap-4">
                    {values.options.map((option, index) => (
                      <div key={index}>
                        <label htmlFor={`options.${index}`}>
                          Option {index + 1}
                        </label>
                        <div className="flex gap-2">
                          <Field
                            className={
                              "w-full mt-1 p-1 text-gray-900 rounded-md focus:outline-none focus:border-2 focus:border-gray-900 border-transparent border-2"
                            }
                            name={`options.${index}`}
                            type="text"
                            placeholder="Type option"
                          />
                          {values.options.length > 2 && (
                            <>
                              <Button
                                className="hover:text-red-500 focus:text-red-500 focus:outline-none transition-all duration-75 ease-linear"
                                type={"button"}
                                value={deleteIcon}
                                onClick={() => remove(index)}
                              />{" "}
                            </>
                          )}
                        </div>
                        <ErrorMessage
                          className="text-black"
                          name={`options.${index}`}
                          component="div"
                        />
                      </div>
                    ))}
                    {values.options.length < 4 && (
                      <button
                        className="py-1 w-1/2 flex gap-1 items-center rounded-md justify-center bg-gray-900 hover:bg-[#0088FF] focus:bg-[#0088FF] focus:outline-none transition-all duration-200"
                        type="button"
                        onClick={() => push("")}
                      >
                        <BiListPlus /> Add Option
                      </button>
                    )}
                  </div>
                )}
              </FieldArray>

              <Button
                className="py-2 rounded-md bg-[#0088FF] w-full focus:outline-none focus:bg-gray-900 hover:bg-gray-900 transition-all duration-200"
                type="submit"
                value={"Create Poll"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default CreateModal;
