import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import kriativespace from "../../../public/images/Header/kriativespace.svg";
import profile from "../../../public/images/Header/profile.svg";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../features/Config";
import defulatprofile from "../../../public/images/Header/defulatprofile.svg";
import Image from "next/image";
import Avatar from "./NextAvtar";
import HeaderMenu from "./HeaderMenu";
import SidePannel from "./SidePannel";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import DiscountPopup from "./DiscountPopup";

// Lazy load the SignInModel component
const SignInModel = lazy(() => import("../component/SignInModel.js"));

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

const Header = ({ title, ispaid }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openLoginMenu, setOpenLoginMenu] = useState(false);
  const [user_sign_in, setUserSignIn] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [picture, setPicture] = useState(null);
  const [userData, setUserData] = useState(null);
  const [accountType, setAccountType] = useState(null); // Add account type state
  const [isSidePannelOpen, setSidePannelOpen] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const loginMenuRef = useRef(null);
  const runonce = useRef(false);
  const sidebarRef = useRef(null);
  // Improved cookie parsing function
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop().split(";").shift();
      try {
        return decodeURIComponent(cookieValue);
      } catch (error) {
        console.error(`Error decoding cookie ${name}:`, error);
        return cookieValue;
      }
    }
    return null;
  };

  // Safe JSON parsing function
  const safeJSONParse = (value) => {
    if (!value) return null;
    try {
      // If the value is already a string and not JSON, return it as is
      if (
        typeof value === "string" &&
        !value.startsWith('"') &&
        !value.startsWith("{") &&
        !value.startsWith("[")
      ) {
        return value;
      }
      return JSON.parse(value);
    } catch (error) {
      console.error("JSON parse error:", error);
      return value; // Return the original value if parsing fails
    }
  };

  // Safe localStorage access
  const getFromLocalStorage = (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const value = localStorage.getItem(key);
        return safeJSONParse(value);
      }
    } catch (error) {
      console.error(`Error accessing localStorage for key ${key}:`, error);
    }
    return null;
  };

  // Safe localStorage setter
  const setToLocalStorage = (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage for key ${key}:`, error);
    }
  };

  useEffect(() => {
    const hasTest = searchParams.has("ex_logout");
    if (hasTest) {
      logout();
    }
  }, [searchParams]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    const handleScroll = () => {
      setOpenProfile(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close on click outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidePannelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main authentication data loading effect
  useEffect(() => {
    const loadUserData = () => {
      // Try to get values from cookies first
      const tokenFromCookie = getCookie("access_token");
      const nameFromCookie = getCookie("name");
      const emailFromCookie = getCookie("email");
      const pictureFromCookie = getCookie("picture");
      const accountTypeFromCookie = getCookie("account_type"); // Fetch account_type from cookie

      // Set account type from cookie
      if (accountTypeFromCookie) {
        setAccountType(accountTypeFromCookie);
        setToLocalStorage("account_type", accountTypeFromCookie);
      }

      if (tokenFromCookie) {
        setToken(tokenFromCookie);
        setToLocalStorage("access_token", tokenFromCookie);
        setUserSignIn(tokenFromCookie);

        // Decode JWT token to extract user info if cookies don't have them
        try {
          const decodedToken = jwtDecode(tokenFromCookie);

          // Set name from cookie or token
          const userName =
            nameFromCookie ||
            decodedToken.name ||
            decodedToken.given_name ||
            decodedToken.username;
          if (userName) {
            setName(userName);
            setToLocalStorage("user_name", userName);
          }

          // Set email from cookie or token
          const userEmail = emailFromCookie || decodedToken.email;
          if (userEmail) {
            setEmail(userEmail);
            setToLocalStorage("user_email", userEmail);
          }

          // Set picture from cookie or token
          const userPicture = pictureFromCookie || decodedToken.picture;
          if (userPicture) {
            setPicture(userPicture);
            setToLocalStorage("picture", userPicture);
          }

          // Set account type from token if not in cookie
          const tokenAccountType =
            decodedToken.account_type || decodedToken.accountType;
          if (!accountTypeFromCookie && tokenAccountType) {
            setAccountType(tokenAccountType);
            setToLocalStorage("account_type", tokenAccountType);
          }
        } catch (tokenError) {
          console.error("Error decoding token:", tokenError);

          // Fallback to cookie values even if token decode fails
          if (nameFromCookie) {
            setName(nameFromCookie);
            setToLocalStorage("user_name", nameFromCookie);
          }
          if (emailFromCookie) {
            setEmail(emailFromCookie);
            setToLocalStorage("user_email", emailFromCookie);
          }
          if (pictureFromCookie) {
            setPicture(pictureFromCookie);
            setToLocalStorage("picture", pictureFromCookie);
          }
        }
      } else {
        // Fallback to localStorage if no cookies
        const tokenFromStorage = getFromLocalStorage("access_token");
        const nameFromStorage = getFromLocalStorage("user_name");
        const emailFromStorage = getFromLocalStorage("user_email");
        const pictureFromStorage = getFromLocalStorage("picture");
        const accountTypeFromStorage = getFromLocalStorage("account_type"); // Get account_type from localStorage

        // Set account type from localStorage
        if (accountTypeFromStorage) {
          setAccountType(accountTypeFromStorage);
        }

        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          setUserSignIn(tokenFromStorage);

          // Try to decode token and extract missing info
          try {
            const decodedToken = jwtDecode(tokenFromStorage);

            const userName =
              nameFromStorage ||
              decodedToken.name ||
              decodedToken.given_name ||
              decodedToken.username;
            const userEmail = emailFromStorage || decodedToken.email;
            const userPicture = pictureFromStorage || decodedToken.picture;
            const tokenAccountType =
              accountTypeFromStorage ||
              decodedToken.account_type ||
              decodedToken.accountType;

            if (userName) setName(userName);
            if (userEmail) setEmail(userEmail);
            if (userPicture) setPicture(userPicture);
            if (tokenAccountType) setAccountType(tokenAccountType);
          } catch (tokenError) {
            console.error("Error decoding stored token:", tokenError);
            // Use stored values as fallback
            if (nameFromStorage) setName(nameFromStorage);
            if (emailFromStorage) setEmail(emailFromStorage);
            if (pictureFromStorage) setPicture(pictureFromStorage);
            if (accountTypeFromStorage) setAccountType(accountTypeFromStorage);
          }
        } else {
          setUserSignIn(null);
        }
      }
    };

    loadUserData();
  }, []);

  // Set user data object when name and email are available
  useEffect(() => {
    if (name || email) {
      setUserData({
        name: name || "Esther Howard",
        email: email || "No email provided",
        picture: picture,
        accountType: accountType, // Include account type in user data
      });
    }
  }, [name, email, picture, accountType]);

  function logout() {
    // Clear all user data
    setToken(null);
    setName(null);
    setEmail(null);
    setPicture(null);
    setUserData(null);
    setUserSignIn(null);
    setAccountType(null); // Clear account type

    // Clear cookies
    const cookiesToClear = [
      "access_token",
      "email",
      "name",
      "picture",
      "account_type",
      "plan_type",
      "word_count",
    ]; // Include account_type
    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure;`;
    });

    // Set logout flag
    document.cookie = `logout_flag=true; path=/; SameSite=None; Secure;`;
    // Clear localStorage
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    // Redirect to signin
    const logoutUrl = `${siteurl}/signin`;
    window.location.href = logoutUrl;
  }

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setOpenLoginMenu(false);
    setSidePannelOpen(false);
  };

  // Define dropdown icon style
  const dropdownIconStyle = {
    transform: openProfile || openLoginMenu ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.5s ease-in-out",
    display: "inline-block",
  };

  // Helper function to determine user account status
  const getAccountStatus = () => {
    // Use the local accountType state first, then fall back to the prop
    const currentAccountType = accountType || ispaid;
    return {
      isPaid: currentAccountType === "paid" || currentAccountType === "premium",
      accountType: currentAccountType,
      isSignedIn: !!user_sign_in,
    };
  };

  const { isPaid, isSignedIn } = getAccountStatus();

  return (
    <>
      <DiscountPopup />
      <header
        className={`px-[12px] bg-white rounded-lg flex justify-between items-center py-[12px] sm:py-[24px] h-[70px] ${
          title === "Home" ? "header" : ""
        }`}
      >
        <div className="flex w-full justify-between items-center">
          <div className="w-[256px] h-auto">
            <Image
              className="logo H-[24px]"
              src={kriativespace}
              alt="logo"
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "/")}
            />
          </div>

          <div className="max-[900px]:hidden min-[901px]:flex">
            <HeaderMenu />
          </div>

          <div className="relative flex items-center justify-end max-[900px]:hidden min-[901px]:flex w-[256px] h-auto">
            {/* First check: if no account type data available, show simple Sign In button */}
            {!isSignedIn ? (
              <div className="flex ">
                <button
                  className="px-[24px] py-[12px] bg-white text-gray-800 rounded-full login-text cursor-pointer lign-in-text"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button
                  className="px-[24px] py-[12px]  bg-[#A57F28] try-now-free-button-text rounded-full  cursor-pointer text-white"
                  onClick={() => {
                    window.location.href = `${siteurl}/signup`;
                  }}
                >
                  Try Now For Free
                </button>
              </div>
            ) : (
              /* Third check: user is signed in, show profile dropdown */
              <>
                <div
                  className="flex items-center bg-white justify-around pl-[2px] pr-[10px] py-[2px] gap-[6px] border-1  border-[#A57F28] bg-transparent rounded-full cursor-pointer overflow-hidden"
                  ref={loginMenuRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenProfile(!openProfile);
                  }}
                >
                  {/* Profile Image */}
                  <Avatar />

                  {/* Arrow Down Icon */}
                  <span style={dropdownIconStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A57F28"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </span>
                </div>

                {openProfile && (
                  <div
                    className="absolute right-0 top-full mt-3 min-w-[240px] bg-white shadow-lg rounded-[12px] z-50 overflow-hidden"
                    ref={profileRef}
                  >
                    {/* Profile Info */}
                    <div className="flex flex-col items-start justify-between w-full max-w-[256px]">
                      {/* Profile section */}
                      <div className="flex items-center space-x-3 w-full overflow-hidden">
                        <div className="border-b border-[#E8E8E8] p-[14px] w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-[#151207] truncate">
                                {userData?.name || name || "Esther Howard"}
                              </p>
                              <p className="text-sm font-normal text-[#363532] truncate">
                                {userData?.email ||
                                  email ||
                                  "No email provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex border-b cursor-pointer border-[#E8E8E8] w-full p-[14px] gap-2 items-center hover:bg-[#F6F6F6] transition-colors duration-200"
                        onClick={() =>
                          (window.location.href = `${siteurl}/profile`)
                        }
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="4.5"
                            r="3"
                            stroke="#151207"
                            strokeWidth="1.2"
                          />
                          <ellipse
                            cx="9"
                            cy="12.75"
                            rx="5.25"
                            ry="3"
                            stroke="#151207"
                            strokeWidth="1.2"
                          />
                        </svg>
                        <p className="text-sm font-medium text-[#151207] ">
                          My Profile
                        </p>
                      </div>

                      {/* Help section */}
                      <div
                        className="flex border-b cursor-pointer border-[#E8E8E8] w-full p-[14px] gap-2 items-center hover:bg-[#F6F6F6] transition-colors duration-200"
                        onClick={() =>
                          (window.location.href = `${siteurl}/help-center`)
                        }
                      >
                        <svg
                          className="cursor-pointer"
                          onClick={() =>
                            (window.location.href = `${siteurl}/help-center`)
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_9301_42691)">
                            <circle
                              cx="9"
                              cy="9"
                              r="7.5"
                              stroke="#151207"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M7.59375 6.65625C7.59375 5.8796 8.22335 5.25 9 5.25C9.77665 5.25 10.4062 5.8796 10.4062 6.65625C10.4062 7.17183 10.1288 7.62261 9.71502 7.86741C9.35853 8.07832 9 8.39829 9 8.8125V9.75"
                              stroke="#151207"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                            <circle cx="9" cy="12" r="0.75" fill="#151207" />
                          </g>
                          <defs>
                            <clipPath id="clip0_9301_42691">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="text-sm font-medium text-[#151207] ">
                          Help
                        </p>
                      </div>

                      {/* Contact us section */}
                      <div
                        className="flex border-b cursor-pointer border-[#E8E8E8] w-full p-[14px] gap-2 items-center hover:bg-[#F6F6F6] transition-colors duration-200"
                        onClick={() =>
                          (window.location.href = `${siteurl}/contact-us`)
                        }
                      >
                        <svg
                          className="cursor-pointer"
                          onClick={() =>
                            (window.location.href = `${siteurl}/contact-us`)
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 7.5C16.5139 8.0453 16.5 8.29068 16.5 9C16.5 11.8284 16.5 13.2426 15.6213 14.1213C14.7426 15 13.3284 15 10.5 15H7.5C4.67157 15 3.25736 15 2.37868 14.1213C1.5 13.2426 1.5 11.8284 1.5 9C1.5 6.17157 1.5 4.75736 2.37868 3.87868C3.25736 3 4.67157 3 7.5 3H9.75"
                            stroke="#151207"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M4.5 6L6.11917 7.34931C7.49665 8.49721 8.18539 9.07116 9 9.07116C9.81461 9.07116 10.5034 8.49721 11.8808 7.34931"
                            stroke="#151207"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="14.25"
                            cy="3.75"
                            r="2.25"
                            stroke="#151207"
                            strokeWidth="1.2"
                          />
                        </svg>
                        <p className="text-sm font-medium text-[#151207] ">
                          Contact Us
                        </p>
                      </div>

                      {/* Logout section */}
                      <div
                        className="flex w-full p-[14px] gap-2 items-center hover:bg-[#F6F6F6] transition-colors duration-200 cursor-pointer hover:rounded-b-[12px]"
                        onClick={logout}
                      >
                        <svg
                          className="cursor-pointer"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_9262_244)">
                            <path
                              d="M1.5 8.99902L12 8.99902M12 8.99902L9.375 6.74902M12 8.99902L9.375 11.249"
                              stroke="#151207"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.75 5.25C6.75908 3.61873 6.83142 2.7353 7.40771 2.15901C8.06672 1.5 9.12738 1.5 11.2487 1.5L11.9987 1.5C14.12 1.5 15.1807 1.5 15.8397 2.15901C16.4987 2.81802 16.4987 3.87868 16.4987 6L16.4987 12C16.4987 14.1213 16.4987 15.182 15.8397 15.841C15.1807 16.5 14.12 16.5 11.9987 16.5H11.2487C9.12738 16.5 8.06672 16.5 7.40771 15.841C6.83142 15.2647 6.75908 14.3813 6.75 12.75"
                              stroke="#151207"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9262_244">
                              <rect
                                width="18"
                                height="18"
                                rx="5"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="text-sm font-medium text-[#151207] ">
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {!isSidePannelOpen && (
            <div
              className="max-[899px]:flex min-[900px]:hidden cursor-pointer"
              onClick={() => {
                setSidePannelOpen(!isSidePannelOpen);
              }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="22" fill="white" />
                <path
                  d="M30 17L14 17"
                  stroke="#151207"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M30 22L14 22"
                  stroke="#151207"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path
                  d="M30 27L14 27"
                  stroke="#151207"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          )}

          {isSidePannelOpen && (
            <SidePannel
              sidebarRef={sidebarRef}
              setSidePannelOpen={setSidePannelOpen}
              handleLoginClick={handleLoginClick}
              setToLocalStorage={setToLocalStorage}
              getFromLocalStorage={getFromLocalStorage}
              accountType={accountType}
              token={token}
              logout={logout}
            />
          )}
        </div>
      </header>

      {/* Render the signin modal when showLoginModal is true */}
      {showLoginModal && (
        <SignInModel
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Header;
