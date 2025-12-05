import { useState, useEffect, useRef } from "react";
import logo from "../../../public/images/Header/logoRegistered.svg";
import Image from "next/image";
import kiwi from "../../../public/videos/kiwi.json";
import dynamic from "next/dynamic";
import moment from "moment/moment";
import Head from "next/head";
import { FaceBookIcon, InstagramIcon, LinkedInIcon, MediumIcon, QuoraIcon, RedditIcon, TwitterIcon, YouTubeIcon } from "../../Component/FooterIcon";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const Footer = () => {
  const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="block flex items-center justify-center relative" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="flex flex-col px-[24px] max-w-[1300px] w-full justify-center py-6">
          <div className="flex flex-row max-[899px]:flex-col min-[900px]:flex-row gap-[24px] max-[799px]:items-baseline">
            <Image
              className="w-[201px] h-[46px] logo"
              src={logo}
              alt="Kreativespace by Avinyaa logo"
              style={{ cursor: "pointer" }}
              onClick={() => { window.location.href = "/"; }}
            />
            <p className="content-text !text-[#151207] content-center">
              Kreativespace by <a
                  href="https://www.avinyaaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "inherit" }}
                >
                  Avinyaa EdTech
                </a> - Enhancing productivity and
              authenticity with AI-driven writing tools.
            </p>
          </div>

          {/* Responsive grid layout */}
          <div className="grid min-[1920px]:grid-cols-4 min-[800px]:grid-cols-4 min-[604px]:grid-cols-2 max-[603px]:grid-cols-2 w-full py-[32px] gap-[24px]">
            {/* Extension Section */}
            <div className="flex justify-start">
              <div className="flex flex-col items-start min-w-[150px]">
                <p className="tool-label-text">Extensions & Apps</p>
                {[
                  { label: "Extension for Chrome", path: "https://chrome.google.com/webstore/detail/ahagkiklnmgomfgebbadeganeembeige" },
                  { label: "Extension for Edge", path: "https://microsoftedge.microsoft.com/addons/detail/fjljmokmbnijkfahhbeimkpihjjjgpmd" },
                  { label: "Extension for Firefox", path: "https://addons.mozilla.org/addon/kreativespace-ai-writing-tools/" },
                  { label: "iOS App", path: "https://apps.apple.com/us/app/kreativespace/id6754162242"},
                  { label: "Android App", path: "https://play.google.com/store/apps/details?id=com.kreativespace.miniapp"}

                ].map((extension, index) => (
                  <p
                    key={index}
                    className="content-text pt-[14px] cursor-pointer"
                    onClick={() => {
                      if (extension.path.startsWith('http')) {
                        window.open(extension.path, '_blank');
                      } else {
                        window.location.href = `${baseUrl}/${extension.path}`;
                      }
                    }}
                  >
                    {extension.label}
                  </p>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div className="flex justify-start">
              <div className="flex flex-col items-start min-w-[150px]">
                <p className="tool-label-text">Tools</p>
                {[
                  { label: "Summarizer", path: "summarizer" },
                  { label: "Citation Generator", path: "citation-generator" },
                  { label: "Translator", path: "translator" },
                  { label: "Paraphraser", path: "paraphraser" },
                  { label: "Grammar Checker", path: "grammar-checker" },
                  { label: "Plagiarism Checker", path: "plagiarism-checker" },
                  { label: "AI Detector", path: "ai-detector" },
                ].map((tool, index) => (
                  <p
                    key={index}
                    className="content-text pt-[14px] cursor-pointer"
                    onClick={() =>
                      (window.location.href = `${baseUrl}/${tool.path}`)
                    }
                  >
                    {tool.label}
                  </p>
                ))}
              </div>
            </div>

            {/* Premium Section */}
            <div className="flex justify-start">
              <div className="flex flex-col items-start min-w-[150px]">
                <p className="tool-label-text">Learn more</p>
                {[
                  { label: "Pricing Details", path: `pricing` },
                  { label: "Blog", path: `https://blog.kreativespace.com/` },
                ].map((premium, index) => (
                  <p
                    key={index}
                    className="content-text pt-[14px] cursor-pointer"
                    onClick={() => {
                          if (premium.label === "Blog") {
                            window.location.href = premium.path;
                          } else {
                           window.location.href = `${baseUrl}/${premium.path}`;
                          }
                        }}
                  >
                    {premium.label}
                  </p>
                ))}
              </div>
            </div>

            {/* Company Section */}
            <div className="flex justify-start">
              <div className="flex flex-col items-start min-w-[150px]">
                <p className="tool-label-text">Company</p>
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: `${baseUrl}/about` },
                  { label: "Help Center", path: `${baseUrl}/help-center` },
                  { label: "Contact Us", path: `${baseUrl}/contact-us` },
                  {
                    label: "Privacy & Policy",
                    path: `${baseUrl}/privacy-policy`,
                  },
                  {
                    label: "Terms of Service",
                    path: `${baseUrl}/terms-of-service`,
                  },
                  {
                    label: "Cookies Privacy Policy",
                    path: `${baseUrl}/cookie-policy`,
                  },
                ].map((item, index) => (
                  <p
                    key={index}
                    className="content-text pt-[14px] cursor-pointer"
                    onClick={() => {
                      window.location.href = item.path;
                    }}
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright and Social Media Section */}
          <div className="w-full border-t border-gray-300 pt-[14px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p
                className=""
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#363532",
                  fontWeight: "400",
                }}
              >
                © {moment().format("YYYY")} Kreativespace® by {" "}
                <a
                  href="https://www.avinyaaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "inherit" }}
                >
                  Avinyaa EdTech
                </a>{" "}
                and its affiliates.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/company/thekreativespace-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://x.com/kreativespaceai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80s transition-opacity"
                  aria-label="X (Twitter)"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com/thekreativespaceai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.youtube.com/@thekreativespace-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <YouTubeIcon />
                </a>
                <a
                  href="https://www.facebook.com/thekreativespaceai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <FaceBookIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className="absolute bottom-[8.5rem] right-4 md:bottom-[6.5rem] md:right-10 cursor-pointer"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="22" fill="#93939380" />
            <path
              d="M27.8346 24.5L22.0013 19.5L16.168 24.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Footer;