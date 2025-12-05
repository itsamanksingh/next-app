"use client";
import React, { useEffect, useRef } from "react";
import kriativespace from "../../../public/images/Header/kriativespace.svg";
import Image from "next/image";
import MicrosoftSignup from "./SocialSignup/MicrosoftSignup";
import AppleSignIn from "./SocialSignup/AppleSignIn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dynamic from "next/dynamic";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const SocialGoogleSignup = dynamic(
  () => import("../../Component/SocialSignup/SocialGoogleSignup"),
  {
    ssr: false,
  }
);

const SignInModel = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#00000042] bg-opacity-5 z-40 flex items-center justify-center h-full w-full"
      onClick={handleOutsideClick}
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        className="bg-white rounded-[24px] max-w-[464px] shadow-xl w-full mx-3 max-[400px]:px-[24px] relative z-50 p-[82px] max-[741px]:px-[41px]"
      >
        {/* Close button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="hover:text-gray-600 cursor-pointer"
          >
            <svg
              className="h-[24px] w-[24px] text-[#ffffff]"
              viewBox="0 0 24 24"
              fill="#7C7B77"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="">
          {/* Brand name */}
          <div className="flex justify-center items-center pb-[42px]">
            <Image
              className="logo H-[24px]"
              src={kriativespace}
              alt="logo"
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Welcome message */}
          <div className="text-center pb-[32px]">
            <p className="welcome-text">Welcome Back!</p>
            <p className="welcom-sub-text pt-[4px]">
              Please sign in to continue your adventure
            </p>
          </div>

          {/* Sign in buttons */}
          <div className="space-y-[12px] pb-[32px] flex flex-col items-center justify-center">
            <div className="mb-3">
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                onScriptLoadSuccess={() => {
                  window.google?.accounts.id?.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                  });
                }}
              >
                <SocialGoogleSignup />
              </GoogleOAuthProvider>
            </div>
            <MicrosoftSignup />
            <AppleSignIn />
          </div>

          {/* Divider */}

          <div className="flex items-center justify-center pb-[12px]">
            <div className="flex items-center  w-full max-w-[300px]">
              <div className="flex-grow h-px bg-[#E8E8E8]"></div>
              <span className="px-[8px] or-text text-xs font-normal leading-[18px] text-[#7C7B77]">
                Or
              </span>
              <div className="flex-grow h-px bg-[#E8E8E8]"></div>
            </div>
          </div>

          {/* Sign up or sign in links */}
          <div className="text-center">
            <p className="text-sm">
              <span
                className="sign-in-up-text cursor-pointer"
                onClick={() => {
                  window.location.href = `${baseUrl}/signup`;
                }}
              >
                Sign Up
              </span>
              <span className="email-text mx-1 text-[#363532] font-medium">
                or
              </span>
              <span
                className="sign-in-up-text mr-1 cursor-pointer"
                onClick={() => {
                  window.location.href = `${baseUrl}/signin`;
                }}
              >
                Sign In
              </span>
              <span className="email-text text-[#363532] font-medium">
                with email
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModel;
