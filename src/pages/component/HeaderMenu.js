"use client";
import Link from "next/link";
import React from "react";

const HeaderMenu = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const handleLinkClick = (e, item) => {
    if (item.id === 1) {
      e.preventDefault(); // Stop Next.js navigation
      window.location.reload(); // Reload page
    }
  };

  const memuList = [
    {
      id: 1,
      menu_name: "Home",
      url: '/',
    },
    {
      id: 2,
      menu_name: "About Us",
      url: `${baseUrl}/about`,
    },
    {
      id: 3,
      menu_name: "Pricing",
      url: `${baseUrl}/pricing`,
    },
    {
      id: 4,
      menu_name: "Blog",
      url: `https://blog.kreativespace.com/`,
    },
  ];

  return (
    <>
      <div className="flex gap-[32px]">
        {memuList.map((item) => {
          return (
            <Link
              key={item.id}
              className={`flex  ${item.menu_name === 'Home' ? 'content-text-active' : 'content-text'}`}
              href={item?.url !== "" ? item.url : ""}
              onClick={(e) => handleLinkClick(e, item)}
            >
              {item.menu_name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HeaderMenu;
