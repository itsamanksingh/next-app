"use client";

import Image from "next/image";
import React from "react";
import kreativespace from "../../../public/images/Header/kriativespace.svg";
import Link from "next/link";

const SidePannel = ({
  sidebarRef,
  setSidePannelOpen,
  handleLoginClick,
  accountType,
  token,
  logout,
}) => {
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const memuList = [
    {
      id: 1,
      menu_name: "Profile",
      url: `${baseUrl}/profile`,
    },
    {
      id: 2,
      menu_name: "Home",
      url: '/',
    },
    {
      id: 3,
      menu_name: "About Us",
      url: `${baseUrl}/about`,
    },

    {
      id: 4,
      menu_name: "Pricing",
      url: `${baseUrl}/pricing`,
    },
    {
      id: 5,
      menu_name: "Blog",
      url: `https://blog.kreativespace.com/`,
    },
  ];

  const handleLinkClick = (e, item) => {
    if (item.id === 2) {
      e.preventDefault(); // Stop Next.js navigation
      window.location.reload(); // Reload page
    }
  };

  return (
    <div className="max-[900px]:relative min-[901px]:hidden" ref={sidebarRef}>
      <aside
        id="default-sidebar"
        className="fixed top-0 right-0 z-50 w-full h-screen transition-transform translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto flex flex-col justify-between bg-white">
          <div className="flex flex-col">
            <header className="flex justify-between items-center px-[12px]">
              <Image
                className="logo H-[24px]"
                src={kreativespace}
                alt="logo"
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = "/")}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setSidePannelOpen(false);
                  0;
                }}
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="38" height="38" rx="19" fill="#F8F8F8" />
                  <path
                    d="M24.9999 13.0001L12 26M11.9999 13L24.9999 25.9999"
                    stroke="#151207"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </header>

            <div className="mt-[16px] p-[16px]">
              <div className="flex flex-col cursor-pointer">
                <div className="manual_horizontal_line"></div>
                {memuList.map((item) => {
                  if (!token && item.id === 1) {
                    return null;
                  }

                  return (
                    <div key={item.id}>
                      <Link
                        key={item.id}
                        className="flex justify-between items-center sidebar-pannel-text py-[16px]"
                        href={
                          item.id === 2
                            ? "/"
                            : item?.url !== ""
                            ? item?.url
                            : ""
                        }
                        onClick={(e) => handleLinkClick(e, item)}
                      >
                        {item.menu_name}

                        <span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 3.33398L10 8.00065L6 12.6673"
                              stroke="#7C7B77"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                      <div className="manual_horizontal_line"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-[16px]">
            {!token ? (
              <button
                className="w-full py-[12px] bg-[#A57F28] try-now-free-sidebar-text rounded-full cursor-pointer"
                onClick={() => {
                  window.location.href = `${baseUrl}/signup`;
                }}
              >
                Try Now For Free
              </button>
            ) : accountType !== "paid" ? (
              <>
              <div className="text-center pb-[12px] money-back-currency">
                  5 Days Money Back Guarantee
                </div>
              <button
                className="w-full py-[12px] bg-[#F58F00] try-now-free-sidebar-text rounded-full cursor-pointer"
                onClick={() => {
                  window.location.href = `${baseUrl}/pricing`;
                }}
              >
                Get Premium now
              </button>
              </>
            ) : null}

            <button
              className="w-full py-[12px] bg-white text-gray-800 rounded-full login-text cursor-pointer lign-in-text"
              onClick={token !== null ? logout : handleLoginClick}
            >
              {token !== null ? "Log Out" : "Log in"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SidePannel;
