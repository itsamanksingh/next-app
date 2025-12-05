"use client"

import React from 'react';
import Image from 'next/image';
import chrome from "../../../public/images/Home/chrome.png"
import { useState, useEffect } from 'react'
import edge from "../../../public/images/Home/edgesvg.svg"
import Firefox from "../../../public/images/Home/firefox.svg"
import playstore from '../../../public/images/Header/playstore1.svg';
import appstoreButton from '../../../public/images/Header/appstoreButton.svg';

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

const BrowserExtension = () => {
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
  if (browser === "Google Chrome" || browser === "Microsoft Edge" || browser === "Mozilla Firefox") {
    return (

      <div className="bg-white max-w-[1072px] w-full mx-auto pt-[180px] px-[24px]">
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
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#A57F28",
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
      </div>
    );
  } else { return null; }
};

export default BrowserExtension;