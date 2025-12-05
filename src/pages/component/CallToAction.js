"use client";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const CallToAction = ({
  title = "Ready To Boost Your Writing Game?",
  description = "Join Kreativespace And Explore Ai-Powered Tools Built To Help You Write Better, Faster, And Smarter — Totally Free To Start.",
  buttonText = "Join Now - It's Free",
  setShowLoginModal
}) => {

  return (
    <div className="pt-[100px] px-[24px] flex justify-center">
      <div className="bg-[#F8F8F8] w-full max-w-[1072px] rounded-[12px] px-[48px] py-[40px] flex flex-col justify-center items-center text-center">
        <h2 className="text-[32px] font-semibold text-[#1a1a1a] mb-[16px] leading-[1.2]">
          {title}
        </h2>
        <p className="text-[16px] text-[#666] leading-[1.5] mb-[32px] max-w-[500px] ">
          {description}
        </p>
        <button
          onClick={() =>
            setShowLoginModal(true)
          }
          className="bg-[#A57F28] hover:bg-[#B8941F] text-white cursor-pointer font-medium px-[24px] py-[12px] rounded-[28px] text-[16px] transition-colors duration-200 shadow-sm hover:shadow-md shining-button"
          style={{ fontFamily: "Poppins", fontWeight: 500, lineHeight: "24px" }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CallToAction;