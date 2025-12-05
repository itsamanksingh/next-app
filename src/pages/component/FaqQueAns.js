"use client";

import { Poppins } from "next/font/google";
import React, { useState } from "react";
// import "../styles/Common/OtherDetailsallApp.css";
const FaqQueAns = ({ faqQueAns, name }) => {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  return (
<div className="bg-white mt-[100px] [@media(max-width:603px)]:mt-[100px]">

      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-center main-text-title pb-[20px]" style={{fontFamily:"poppins", fontSize:"24px", fontWeight:400, lineHeight:"36px"}}>
          {name}
        </p>
        <div className="w-full max-w-[872px]">
          {faqQueAns?.map((faq, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-[8px] w-full  ${expanded === index ? 'bg-[#F8F8F8]' : 'bg-white'
                }`}
            >
              <button
                onClick={() => handleChange(index)}
                className="w-full flex justify-between p-[14px] cursor-pointer"
              >
                <p className="para-work-title text-left mr-[8px] text-[#151207]" style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "16px", lineHeight: "24px"}}>{faq.question}</p>
                <span className="w-[20px] h-[20px]">
                  {expanded === index ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 11.25L9 6.75L3.75 11.25" stroke="#151207" stroke-linecap="round" stroke-linejoin="round" />
                  </svg> :
                    <svg className="cursor-pointer"  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 6.75L9 11.25L3.75 6.75" stroke="#151207" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  }
                </span>
              </button>
              {expanded === index && (
                <div className="auto-animated-active-text text-[#363532] px-[14px] pb-[14px]">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqQueAns;