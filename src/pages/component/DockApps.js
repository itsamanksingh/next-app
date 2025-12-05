"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import home from "../../../public/images/homecontent/home.svg";
import summrizer from "../../../public/images/homecontent/summrizer.svg";
import citation from "../../../public/images/homecontent/citation.svg";
import translator from "../../../public/images/homecontent/translator.svg";
import paraphrser from "../../../public/images/homecontent/paraphraser.svg";
import grammar from "../../../public/images/homecontent/grammar.svg";
import plagarisam from "../../../public/images/homecontent/plagarisam.svg";
import aidetctor from "../../../public/images/homecontent/ai.svg";
import humanizer from "../../../public/images/homecontent/humanizer.svg";
import chrome from "../../../public/images/Home/chrome.png"
import edge from "../../../public/images/Home/edgesvg.svg"
import Firefox from "../../../public/images/Home/firefox.svg"
import playstore from '../../../public/images/Header/playstore1.svg';
import appstoreButton from '../../../public/images/Header/appstoreButton.svg';
import ProductApp from "./ProductApp";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getBrowserName() {
  if (typeof navigator === "undefined" || !navigator.userAgent) return "Unknown Browser";
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Edg")) return "Microsoft Edge";
  else if (userAgent.includes("Chrome")) return "Google Chrome";
  else if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  else if (userAgent.includes("Safari")) return "Safari";
  else return "Unknown Browser";
}

export const getMobileOS = () => {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'Unknown';
  }

  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  if (/iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }
  if (/iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 0)) {
    return 'iOS';
  }

  if (/Mobi/i.test(userAgent)) {
    return 'Unknown Mobile';
  }

  return 'Unknown';
};

const image_array = [
  home,
  summrizer,
  citation,
  translator,
  paraphrser,
  grammar,
  plagarisam,
  // aitutor,
  aidetctor,
  humanizer,
];
const routes_array = [
  "",
  "summarizer",
  "citation-generator",
  "translator",
  "paraphraser",
  "grammar-checker",
  "plagiarism-checker",
  // "aitutor",
  "ai-detector",
  "ai-humanizer",
];
const tool_tip_content = [
  "Home",
  "Summarizer",
  "Citation Generator",
  "Translator",
  "Paraphraser",
  "Grammar Checker",
  "Plagiarism Checker",
  // "Aitutor",
  "AI Detector",
  "AI Humanizer",
];
const background_colors = [
  "#A57F28",
  "#8337FB",
  "#9A9A9A",
  "#EAB825",
  "#C12C52",
  "#00B700",
  "#F89500",
  // "#A47764",
  "#5DAEFA",
  "#45B5AA",
];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

function DockApps({ app, ispaid, u_name, setShowLoginModal }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const iconRefs = useRef([]);
  const maxScale = 1.8;

  useEffect(() => {
    const pathname = window.location.pathname;
    const currentRoute = pathname.split("/")[1] || "";

  }, []);

  const handleMouseEnter = (index) => {
    requestAnimationFrame(() => setHoverIndex(index));
  };

  const handleMouseLeave = () => setHoverIndex(null);

  const getTransform = (i) => {
    if (hoverIndex === null) return { scale: 1, y: 0, padding: "px-[8px]" };

    const distance = Math.abs(i - hoverIndex);
    if (distance > 2) return { scale: 1, y: 0, padding: "px-[8px]" };

    const scale = maxScale - distance * 0.3;
    const y = -20 + distance * 5;
    const padding = "px-[14px]";
    return { scale, y, padding };
  };

  const getSpacing = (i) => {
    if (hoverIndex === null) return 0;

    const distance = Math.abs(i - hoverIndex);
    const totalItems = image_array.length;

    if (distance <= 2) {
      if (hoverIndex <= 1) {
        if (i <= hoverIndex + 2) {
          return (maxScale - Math.abs(i - hoverIndex) * 0.3) * 12;
        }
      } else if (hoverIndex >= totalItems - 2) {
        if (i >= hoverIndex - 2) {
          return (maxScale - Math.abs(i - hoverIndex) * 0.3) * 12;
        }
      } else {
        return (maxScale - distance * 0.3) * 10;
      }
    }

    return 0;
  };

  const [browser, setBrowser] = useState();
  const [mobileOs, setMobileOs] = useState('Unknown');

  useEffect(() => {
    setBrowser(getBrowserName());
    setMobileOs(getMobileOS());
  }, []);

  const browserConfig = {
    "Google Chrome": {
      icon: chrome,
      text: "Add to Chrome. It's Free!",
      url: "https://chrome.google.com/webstore/detail/ahagkiklnmgomfgebbadeganeembeige",
    },
    "Microsoft Edge": {
      icon: edge,
      text: "Add to Edge. It's Free!",
      url: "https://microsoftedge.microsoft.com/addons/detail/fjljmokmbnijkfahhbeimkpihjjjgpmd",
    },
    "Mozilla Firefox": {
      icon: Firefox,
      text: "Add to Firefox. It's Free!",
      url: "https://addons.mozilla.org/addon/kreativespace-ai-writing-tools/",
    },
  };

  const defaultConfig = {
    icon: chrome,
    text: "Download Extension",
    url: "https://your-site.com",
  };

  const { icon, text, url } = browserConfig[browser] || defaultConfig;


  return (
    <section className="w-screen bg-[#FFFBF6] relative flex items-center justify-center py-[80px] px-[24px]">
      {/* Background Circles */}
      <div className='absolute inset-0 w-full h-full'>
        <svg className="absolute bottom-0 right-0" width="306" height="236" viewBox="0 0 306 236" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_13088_37098)">
            <circle cx="92.8221" cy="278.688" r="102" transform="rotate(-5 92.8221 278.688)" fill="#FFF5E9" />
            <circle cx="357.808" cy="255.504" r="186" transform="rotate(-5 357.808 255.504)" fill="#FFF5E9" />
          </g>
          <defs>
            <clipPath id="clip0_13088_37098">
              <rect width="306" height="236" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center text-center justify-center z-10  w-full">

        {/* Stay Productive Text */}
        <h2 className="text-2xl pb-[40px] font-normal text-[#151207] capitalize text-center" style={{ fontFamily: 'Poppins', fontSize: '24px', lineHeight: '36px', fontWeight: 400, textTransform: 'capitalize' }}>
          Hey <span style={{ color: "#A57F28", fontWeight: 500 }}>{u_name}</span>, Stay Productive With The Writing Tools
        </h2>

        <ProductApp />

        {(browser === "Google Chrome" || browser === "Microsoft Edge" || browser === "Mozilla Firefox") && (
          <div className="w-full mx-auto pt-[50px]">
            <div className="text-center max-w-[700px] mx-auto flex flex-col gap-[25px]">

              <h2 className="text-[24px] leading-[36px] font-normal text-[#151207] text-center" style={{ fontFamily: "poppins", fontWeight: 400, fontSize: "24px", lineHeight: "36px" }}>
                Write Original, Be Creative
              </h2>

              <p className="max-[768px]:hidden text-[16px] text-[#363532] leading-[28px] capitalize text-center" style={{ fontFamily: "poppins", fontWeight: 400, fontSize: "16px", lineHeight: "28px" }}>
                Upgrade your writing experience with our free browser extension. Every tool you need is included for free.
              </p>

              <p className="hidden max-[768px]:flex text-[16px] text-[#363532] leading-[28px] capitalize font-normal  text-center" style={{ fontFamily: "poppins", fontWeight: 400, fontSize: "16px", lineHeight: "28px" }}>
                {mobileOs == 'iOS' ? 'Upgrade your writing experience with our free App Store app. Every tool you need is included for free.' : 'Upgrade your writing experience with our free Google Play app. Every tool you need is included for free.'}
              </p>

              <div className="max-[768px]:hidden flex justify-center">
                <button
                  className="max-[768px]:hidden flex justify-center items-center gap-[12px] bg-white border border-[#A57F28] rounded-[50px] p-[10px] w-fit min-w-fit whitespace-nowrap cursor-pointer"
                  onClick={() => window.open(url, "_blank")}
                >
                  <Image
                    src={icon}
                    alt={`${browser} icon`}
                    width={24}
                    height={24}
                    className="max-[740px]:w-[20px] max-[740px]:h-[20px] max-[480px]:w-[16px] max-[480px]:h-[16px] flex-shrink-0"
                  />
                  <span
                    className="text-[15px] max-[740px]:text-[13px] max-[480px]:text-[11px] font-medium"
                    style={{
                      fontFamily: "poppins",
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#A57F28",
                      fontWeight: 500
                    }}
                  >
                    {text}
                  </span>
                </button>
              </div>

              <div className="max-[768px]:flex hidden justify-center">
                {mobileOs == 'iOS' ? <button
                  className="inline-flex items-center cursor-pointer"
                  onClick={() => window.open('https://apps.apple.com/us/app/kreativespace/id6754162242', "_blank")}
                >
                  <Image
                    src={appstoreButton}
                    alt={`appstore-icon`}
                    width={148}
                    height={44}

                  />
                </button> :
                  <button
                    className="inline-flex items-center cursor-pointer"
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.kreativespace.miniapp', "_blank")}
                  >
                    <Image
                      src={playstore}
                      alt={`playstore-icon`}
                      width={148}
                      height={44}

                    />

                  </button>}
              </div>

            </div>
          </div>)}

        {/* Original Dock (Hidden by default, can be toggled) */}
        <div className="mt-16 hidden">
          <nav
            className="flex justify-center bg-white rounded-full"
            style={{ boxShadow: "0px 4px 24px 8px #15120714" }}
          >
            <ul className="flex items-end bg-white rounded-full">
              {image_array.map((image, index) => {
                const { scale, y } = getTransform(index);
                const paddingClass =
                  index === 0
                    ? "pl-[8px]"
                    : index === image_array.length - 1
                      ? "px-[8px]"
                      : "pl-[8px]";
                const additionalPadding = getSpacing(index);

                const totalItems = image_array.length;
                let paddingStyle = {};

                if (additionalPadding > 0) {
                  if (index === 0) {
                    paddingStyle = { paddingRight: `${additionalPadding}px` };
                  } else if (index === totalItems - 1) {
                    paddingStyle = { paddingLeft: `${additionalPadding}px` };
                  } else {
                    paddingStyle = {
                      paddingLeft: `${additionalPadding}px`,
                      paddingRight: `${additionalPadding}px`,
                    };
                  }
                }

                const tooltip = tool_tip_content[index];
                const bgColor = background_colors[index];
                const isHovered = hoverIndex === index;

                return (
                  <li
                    key={index}
                    className={`relative ${paddingClass} py-[8px] transition-all duration-150`}
                    style={paddingStyle}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    ref={(el) => (iconRefs.current[index] = el)}
                  >
                    <Link href={`${index === 0 ? siteUrl : baseUrl / routes_array[index]}`}>
                      <div
                        style={{
                          transform: `scale(${scale}) translateY(${y}px)`,
                          transition: hoverIndex !== null ? "transform 100ms linear" : "none",
                        }}
                      >
                        <Image
                          src={image}
                          alt={tool_tip_content[index]}
                          width={42}
                          height={42}
                          unoptimized
                          className="rounded-full"
                        />
                      </div>
                    </Link>

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-[80px] z-10">
                        <div className="relative inline-block">
                          <span className="bg-black text-white text-xs font-medium py-1 px-3 rounded-md whitespace-nowrap inline-block">
                            {tooltip}
                          </span>
                          <span className="footer_tool_tip_triangle absolute left-1/2 transform -translate-x-1/2 top-full"></span>
                        </div>
                      </div>
                    )}

                    {/* Active Line */}
                    {tool_tip_content[index].toLowerCase() === app?.toLowerCase() && (
                      <span
                        className="absolute -translate-x-1/2 w-[16px] h-[3px] rounded-full transition-all mt-[1px]"
                        style={{ backgroundColor: bgColor }}
                      ></span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default DockApps;