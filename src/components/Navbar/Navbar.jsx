import { NavLink, useNavigate } from "react-router-dom";
import NavbarLogo from "../../assets/navbar-logo.png";
import ProfileIcon from "../../assets/profile-icon.png";
import { useRef, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Navbar = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleProfileDropDown = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsProfile(false);
      }
    };

    document.addEventListener("mouseup", handleProfileDropDown);

    return () => {
      document.removeEventListener("mouseup", handleProfileDropDown);
    };
  }, []);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      navigate("/signin");
      setIsProfile(false);
    });
  };

  return (
    <div className="min-h-full sticky top-0 z-20" ref={dropDownRef}>
      <nav className="bg-gray-800 py-0.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NavLink
                  to={"/"}
                  className="flex items-center justify-center gap-3 px-2 py-1 rounded-md sm:gap-2 focus:outline-none focus:bg-gray-600 sm:focus:bg-gray-700"
                >
                  <img
                    className="h-[45px] w-[45px] rounded-full"
                    src={NavbarLogo}
                    alt="Pollify"
                  />
                  <span className="text-white text-lg sm:text-3xl font-black tracking-wide hover:text-[#0088FF] transition-all duration-300 ease-in-out">
                    Pollify
                  </span>
                </NavLink>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `hover:bg-gray-700 hover:text-white text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none text-[16px] tracking-wider transition-all duration-200 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/feeds"}
                    className={({ isActive }) =>
                      `hover:bg-gray-700 hover:text-white text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none text-[16px] tracking-wider transition-all duration-200 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    Feeds
                  </NavLink>
                  <NavLink
                    to={"/about"}
                    className={({ isActive }) =>
                      `hover:bg-gray-700 hover:text-white text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none text-[16px] tracking-wider transition-all duration-200 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    About
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <div className="relative ml-3">
                  <div
                    className="flex gap-2.5 focus:outline-none focus:bg-gray-700"
                    onClick={() => setIsProfile(!isProfile)}
                  >
                    <button
                      type="button"
                      className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:bg-gray-700"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <img
                        className="h10 w-10 hover:scale-100"
                        src={ProfileIcon}
                        alt=""
                      />
                    </button>

                    <div className="flex flex-col">
                      <span className="text-white font-normal cursor-pointer text-sm tracking-widest">
                        Username
                      </span>
                      <span className="text-[gray] font-normal hover:text-white cursor-pointer text-sm tracking-widest">
                        User Email
                      </span>
                    </div>
                  </div>

                  {/*               
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95" */}

                  {isProfile && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      {/* Active: "bg-gray-100", Not Active: "" */}
                      <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                          `block px-4 py-2 m-1.5 rounded tracking-wide text-sm text-gray-700 focus:bg-gray-900 focus:outline-none hover:bg-gray-800 hover:text-white text-[17px] transition-all duration-200 ${
                            isActive ? "bg-gray-300" : ""
                          }`
                        }
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        onClick={() => setIsProfile(!isProfile)}
                      >
                        Profile
                      </NavLink>
                      <span
                        className={`block px-4 py-2 m-1.5 rounded tracking-wide text-sm text-gray-700 focus:bg-gray-900 focus:outline-none hover:bg-gray-800 hover:text-white text-[17px] transition-all duration-200 cursor-pointer`}
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 "
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsMobileMenu(!isMobileMenu)}
              >
                <span className="absolute -inset-0.5"></span>
                {/* Menu Open SVG */}
                <svg
                  className={`${isMobileMenu ? "hidden" : "block"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                {/* Menu Close SVG */}
                <svg
                  className={`${isMobileMenu ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {isMobileMenu && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `hover:bg-gray-700 hover:text-white text-white block rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                aria-current="page"
                onClick={() => setIsMobileMenu(!isMobileMenu)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/feeds"}
                className={({ isActive }) =>
                  `hover:bg-gray-700 hover:text-white text-white block rounded-md px-3 py-2 text-base font-medium focus:outline-none focus:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={() => setIsMobileMenu(!isMobileMenu)}
              >
                Feeds
              </NavLink>
            </div>

            <div className="border-t border-gray-700 pb-3 pt-4">
              <div
                className="flex items-center px-5 focus:bg-gray-500"
                onClick={() => setIsProfile(!isProfile)}
              >
                <div className="flex-shrink-0">
                  <img className="h-10 w-10" src={ProfileIcon} alt="" />
                </div>
                <div className="ml-3 flex flex-col gap-1.5">
                  <div className="text-base font-medium leading-none text-white">
                    Username
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    User Email
                  </div>
                </div>
              </div>

              {isProfile && (
                <div className="mt-3 space-y-1 px-2">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                    onClick={() => {
                      setIsMobileMenu(!isMobileMenu);
                      setIsProfile(!isProfile);
                    }}
                  >
                    Profile
                  </NavLink>
                  <span
                    className={`block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700`}
                    onClick={() => {
                      setIsMobileMenu(!isMobileMenu);
                      setIsProfile(!isProfile);
                      handleSignOut();
                    }}
                  >
                    Sign out
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
