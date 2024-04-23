import { FaGithub } from "react-icons/fa6";
import { GiLaptop } from "react-icons/gi";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto flex  items-center justify-center flex-col gap-7 py-10 px-3 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-black text-[#2b00ff]">
        About Project
      </h1>
      <p className="text-[16px] font-normal tracking-wider text-gray-800 text-center">
        This is a Polling Website where users can create Polls and vote for a
        poll. User can see the result of the Poll in the form of a chart.
      </p>
      <ul className="w-full text-gray-800 px-3 font-extrabold tracking-wide text-2xl md:text-4xl">
        Project Content:
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 User Authentication
          </span>{" "}
          - User can create an Account using the Sign Up form and can Log In
          using the registered Email and Password.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Dashboard
          </span>{" "}
          - Where users will have a list of all Polls he/she created.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Feeds
          </span>{" "}
          - Where users will have a list of all Polls that other users created.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Voted
          </span>{" "}
          - Where users will have a list of all Polls he/she have voted and
          participated in.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌Create Poll
          </span>{" "}
          - User will be able to create polls using this button and will be
          directed to a pop up in which you have to type in a question and
          provide it with minimum 2 options and maximum 4 options.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Vote
          </span>{" "}
          - User will be able to Vote to every poll.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Result
          </span>{" "}
          - User will be able to view the Results of evey poll.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Profile
          </span>{" "}
          - Where users will be able to view the user data like Username, Full
          Name, User ID and User Email. Username and Full Name is Editable.
        </li>
      </ul>
      <ul className="w-full text-gray-800 px-3 font-extrabold tracking-wide text-2xl md:text-4xl">
        Future Scope:
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 View Statistics
          </span>{" "}
          - The user can view the statistics of the Poll in the form of Pie Char
          and Bar Chart.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Shareable Link
          </span>{" "}
          - The Poll Creater can share the link to the intended location an
          people which will scale the project to the other people who do not
          have an account.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Chat Window
          </span>{" "}
          - Here all the users can Chat with each others with Real Time Chating
          Experience.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Group Poll
          </span>{" "}
          - Once the Chat Window is integrated the the users can create Polls
          for a perticular group chat or group of people. These polls will not
          be accessible to the users who are not in the group.
        </li>
        <li className="px-2 py-1 text-gray-600 font-normal tracking-wider sm:tracking-wide text-[15px] sm:text-[16px]">
          <span className="text-[#2b00ff] font-bold text-lg tracking-wider">
            📌 Time Limited Poll
          </span>{" "}
          - In future users can create polls for a perticular Time Period on the
          time is up the poll will be closed and users cannot vote for the
          polls.
        </li>
      </ul>

      <p className="text-[16px] font-normal tracking-wider text-gray-800 text-center">
        If you Liked ❤️ the project have a look at my Socials below 😊.
      </p>
      <div className="flex items-center justify-center flex-wrap flex-col gap-3 tracking-wide">
        <span className="text-xl text-center text-[#0088FF] font-bold">
          Project Developed by Pranav
        </span>
        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-7 text-xl">
          <a
            href="https://pranav-portfolio-ten.vercel.app/"
            target="_blank"
            className="hover:text-[#2b00ff] focus:outline-none focus:text-[#2b00ff] duration-150 transition-all flex justify-center items-center gap-3 md:flex-col md:gap-1"
          >
            <GiLaptop />
            <span className="text-xs md:text-sm">Portfolio</span>
          </a>
          <a
            href="https://github.com/Ray541"
            target="_blank"
            className="hover:text-[#2b00ff] focus:outline-none focus:text-[#2b00ff] duration-150 transition-all flex justify-center items-center gap-3 md:flex-col md:gap-1"
          >
            <FaGithub />
            <span className="text-xs md:text-sm">Github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/pranav-rao-09a79b231/"
            target="_blank"
            className="hover:text-[#2b00ff] focus:outline-none focus:text-[#2b00ff] duration-150 transition-all flex justify-center items-center gap-3 md:flex-col md:gap-1"
          >
            <FaLinkedin />
            <span className="text-xs md:text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
