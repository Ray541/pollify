import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto flex  items-center justify-center flex-col gap-7 py-10 lg:px-8">
      <h1 className="text-4xl font-bold text-[#2b00ff] sm:text-[50px]">
        About Project
      </h1>
      <p className="text-[16px] font-normal tracking-wider text-gray-800 text-center">
        This is a Polling Website where users can create Polls and vote for a
        poll. User can see the result of the Poll in the form of a chart.
      </p>
      <ul className="text-gray-800 px-3 font-bold text-2xl sm:text-3xl">
        Project Content:
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">
            📌Sign Up and Sign In
          </span>{" "}
          - User can sign up using Gmail or by using the signup form and same
          with Log In.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">📌Dashboard</span>{" "}
          - Where users will have a list of all Polls he/she created.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">📌Feeds</span> -
          Where users will have a list of all Polls other users created.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">
            📌Create Poll
          </span>{" "}
          - User will be able to create polls using this button and will be
          directed to a pop up in which you have to type in a question and
          provide it with minimum 2 answers and maximum 3 questions.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">📌Vote</span> -
          User will be able to Vote to every poll.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg">📌Result</span> -
          User will be able to view the Results of evey poll.
        </li>
      </ul>
    </div>
  );
};

export default About;
