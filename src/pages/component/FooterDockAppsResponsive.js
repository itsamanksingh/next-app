import React, { useState, useEffect } from "react";
import Link from "next/link";

import home from "../../../public/images/homecontent/home.svg";
import summrizer from "../../../public/images/homecontent/summrizer.svg";
import citation from "../../../public/images/homecontent/citation.svg";
import translator from "../../../public/images/homecontent/translator.svg";
import paraphrser from "../../../public/images/homecontent/paraphraser.svg";
import grammar from "../../../public/images/homecontent/grammar.svg";
import plagarisam from "../../../public/images/homecontent/plagarisam.svg";
import aitutor from "../../../public/images/homecontent/aitutor.svg";
import aidetctor from "../../../public/images/homecontent/ai.svg";
import humanizer from "../../../public/images/homecontent/humanizer.svg";
import { useRouter } from "next/router";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const image_array = [
  home,
  summrizer,
  citation,
  translator,
  paraphrser,
  grammar,
  plagarisam,
  aidetctor,
  humanizer,
];
const routes_array = [
  "/",
  "summarizer",
  "citation-generator",
  "translator",
  "paraphraser",
  "grammar-checker",
  "plagiarism-checker",
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
  "AI Detector",
 "AI Humanizer"
];
const icon_background_colors = [
  "#A57F28", // Home
  "#8337FB", // Summariser
  "#9A9A9A", // Citation Generator
  "#EAB825", // Translator
  "#C12C52", // Paraphraser - Pink/Red color from the image
  "#00B700", // Grammar Checker
  "#F89500", // Plagiarism Checker
  "#5DAEFA", // AI Detector
  "#45B5AA", // Humanizer
];

function FooterDockAppsResponsive() {
  const router = useRouter();
  const [activeApp, setActiveApp] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const currentPath = router.pathname; // e.g. "/", "/summariser", etc.
    const matchedIndex = routes_array.findIndex(
      (route) => route === currentPath
    );
    setActiveApp(matchedIndex);
  }, [router.pathname, router.isReady]);
  return (
    <>
      <div
        className="flex justify-center bg-white rounded-full p-[4px] w-full max-w-full "
        style={{ boxShadow: "0px 4px 24px 8px #15120714" }}
      >
        <nav className="flex justify-center w-full relative ">
          <div className="overflow-x-auto max-w-full">
            <ul className="flex items-center justify-center gap-1 w-full min-w-max ">
              {image_array.map((image, index) => {
                const isActive =
                  routes_array[index] === "/" ? 0 === activeApp : "";
                const iconBgColor = icon_background_colors[index];
                return (
                  <li
                    className="relative cursor-pointer border border-[#E8E8E8] rounded-full p-1"
                    key={index}
                  >
                    <Link
                      href={`${index === 0 ? siteUrl : baseUrl/routes_array[index]}`}
                      className="block focus:outline-none"
                    >
                      {isActive ? (
                        <div className="flex items-center bg-white rounded-full transition-all duration-300 gap-1">
                          <div
                            className="flex-shrink-0 w-[42px] h-[42px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: iconBgColor }}
                          >
                            <Image src={image} alt={tool_tip_content[index]} />
                          </div>
                          <span
                            className=" font-medium text-base whitespace-nowrap text-sm"
                            style={{ color: iconBgColor }}
                          >
                            {tool_tip_content[index]}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-300"
                          style={{ backgroundColor: iconBgColor }}
                        >
                          <Image
                            src={image}
                            alt={tool_tip_content[index]}
                            // className="w-6 h-6 brightness-0 invert"
                          />
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default FooterDockAppsResponsive;
