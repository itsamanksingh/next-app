"use client";
import Head from "next/head";
import DockApps from "./component/DockApps";
import Header from "./component/Header";
import Footer from "./component/Footer";
import plagarisam_tool from "../../public/images/homecontent/plagarisam_tool.svg";
import summrizer_tool from "../../public/images/homecontent/summrizer_tool.svg";
import translator_tool from "../../public/images/homecontent/translator_tool.svg";
import StackingCards from "./component/StackingCards";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import para_image from "../../public/images/HomeJsonFile/paraphraser.json";
import citation from "../../public/images/HomeJsonFile/citation.json";
import aidetector from "../../public/images/HomeJsonFile/aidetector.json";
import kiwi from "../../public/videos/kiwi.json";
import dynamic from "next/dynamic";
import WhyChooseUs from "./component/WhyChooseUs";
import BrowserExtension from "./component/BrowserExtension";
import FaqQueAns from "./component/FaqQueAns";
import CallToAction from "./component/CallToAction";
import ReviewTrustPilot from "./component/ReviewTrustPilot";
import PaidUltimate from "./component/PaidUltimate";
import { jwtDecode } from "jwt-decode";
import Testimonial from "./component/testimonial";
import SignInModel from "./component/SignInModel";
import Script from "next/script";
import BlackfridayPopup from "./component/BlackfridayPopup";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const projects = [
  {
    id: 1,
    title: "Paraphraser",
    description:
      "Rewrite text instantly while preserving its original meaning and improving clarity.",
    image: para_image,
    color: "#C12C52",
    link: `${siteUrl}/paraphraser`,
    isLottie: true,
    video: null,
  },
  {
    id: 2,
    title: "Citation Generator",
    description:
      "Instantly generate well-structured and properly formatted citations in multiple styles with ease.",
    image: citation,
    color: "#00B700",
    link: `${siteUrl}/citation-generator`,
    isLottie: true,
    video: null,
  },
  {
    id: 3,
    title: "Grammar Checker",
    description:
      "Quickly find and fix grammar, spelling, and punctuation mistakes for flawless writing.",
    image: "",
    color: "#A47764",
    link: `${siteUrl}/grammar-checker`,
    isLottie: false,
    video: "https://d35z3dfm220p5l.cloudfront.net/home_Grammar.mp4",
  },
  {
    id: 4,
    title: "AI Detector",
    description:
      "Instantly analyze text to identify AI-generated, human-written, or mixed content with clear output results.",
    image: aidetector,
    color: "#A47764",
    link: `${siteUrl}/ai-detector`,
    isLottie: true,
    video: null,
  },
];

const faqQueAns = [
  {
    id: "1",
    question: "What is Kreativespace?",
    answer:
      "Kreativespace is an all-in-one writing platform with 8 powerful tools.",
  },
  {
    id: "2",
    question: "How does Kreativespace compare to Other AI writing tools?",
    answer:
      "We offer more tools, higher accuracy, and better overall value. With more Words Usage, Lesser Pricing, 95% Accuracy.",
  },
  {
    id: "3",
    question: "Is Kreativespace free to use for students?",
    answer:
      "Yes, anyone can use the free plan, not just students. The only difference between free and premium plans is words usage, which is higher in premium.",
  },
  {
    id: "4",
    question:
      "How does the AI Detector distinguish between human and AI-generated text?",
    answer: "It uses advanced algorithms to detect AI patterns in writing.",
  },
  {
    id: "5",
    question: "Is there a word-count limit per tool on the free plan?",
    answer: "Yes, words usage is generous for everyone’s use.",
  },
  {
    id: "6",
    question: "How do I sign up for the free and premium plans?",
    answer: "Just sign up on our website with your email to access any plan.",
  },
  {
    id: "7",
    question: "Are all eight tools accessible in both free and premium tiers?",
    answer:
      "Seven tools are available in the free plan, and all eight in premium.",
  },
  {
    id: "8",
    question: "Is Kreativespace accessible on mobile devices?",
    answer: "Yes, it works seamlessly on mobile and desktop browsers.",
  },
  {
    id: "9",
    question: "How secure is the student data and submissions?",
    answer: "We use encryption and never share or sell your data.",
  },
  {
    id: "10",
    question: "What’s the process for cancelling Premium access?",
    answer:
      "You can cancel anytime within 5 days, and we’ll refund your amount in 7 business days.",
  },
];

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function HomePage() {
  // User payment status - starts as null (not logged in)
  const [ispaid, setIspaid] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlideDown, setisSlideDown] = useState(false);
  const animationTimerRef = useRef(null);
  const lottieRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [username, setusername] = useState("");
  const [token, setToken] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Set initial width after component mounts (client-side)
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Utility functions for cookie and localStorage handling
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

  const safeJSONParse = (value) => {
    if (!value) return null;
    try {
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
      return value;
    }
  };

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

  // Function to fetch user payment status
  useEffect(() => {
    const fetchUserPaymentStatus = () => {
      try {
        // First, check if user is logged in by looking for access token
        const tokenFromCookie = getCookie("access_token");
        const tokenFromStorage = getFromLocalStorage("access_token");
        const token = tokenFromCookie || tokenFromStorage;
        setToken(token);
        if (!token) {
          // No token found, user is not logged in
          setIspaid(null);
          return;
        }

        // User is logged in, now check account type
        const accountTypeFromCookie = getCookie("account_type");
        const accountTypeFromStorage = getFromLocalStorage("account_type");

        if (getFromLocalStorage("user_name")) {
          const localuname = getFromLocalStorage("user_name");
          setusername(localuname);
        } else {
          const uname = getCookie("name");
          setusername(uname);
        }

        let accountType = accountTypeFromCookie || accountTypeFromStorage;

        // If no account type in cookies/storage, try to decode from JWT token
        if (!accountType && token) {
          try {
            const decodedToken = jwtDecode(token);
            accountType = decodedToken.account_type || decodedToken.accountType;
          } catch (tokenError) {
            console.error("Error decoding token for account type:", tokenError);
          }
        }

        // Set the payment status based on account type
        if (accountType) {
          // Map account type to ispaid values
          switch (accountType.toLowerCase()) {
            case "paid":
            case "premium":
            case "pro":
              setIspaid("paid");
              break;
            case "free":
            case "unpaid":
            case "basic":
              setIspaid("unpaid");
              break;
            default:
              // Unknown account type, default to unpaid for logged-in users
              setIspaid("unpaid");
          }
        } else {
          // User is logged in but no account type found, default to unpaid
          setIspaid("unpaid");
        }
      } catch (error) {
        console.error("Error fetching user payment status:", error);
        // On error, check if user has token (logged in) or not
        const tokenFromCookie = getCookie("access_token");
        const tokenFromStorage = getFromLocalStorage("access_token");

        if (tokenFromCookie || tokenFromStorage) {
          setIspaid("unpaid"); // Default to unpaid for logged-in users on error
        } else {
          setIspaid(null); // Not logged in
        }
      }
    };

    fetchUserPaymentStatus();
  }, []);

  // Optional: Listen for changes in localStorage or cookies
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "access_token" || e.key === "account_type") {
        // Re-fetch payment status when relevant data changes
        const fetchUserPaymentStatus = () => {
          const tokenFromStorage = getFromLocalStorage("access_token");
          const accountTypeFromStorage = getFromLocalStorage("account_type");

          if (!tokenFromStorage) {
            setIspaid(null);
            return;
          }

          if (accountTypeFromStorage) {
            switch (accountTypeFromStorage.toLowerCase()) {
              case "paid":
              case "premium":
              case "pro":
                setIspaid("paid");
                break;
              case "free":
              case "unpaid":
              case "basic":
                setIspaid("unpaid");
                break;
              default:
                setIspaid("unpaid");
            }
          } else {
            setIspaid("unpaid");
          }
        };

        fetchUserPaymentStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 523);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const container = useRef(null);
  const [isContainerVisible, setIsContainerVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContainerVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => {
      if (container.current) {
        observer.unobserve(container.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const tools = [
    {
      title: "Summarizer",
      description:
        "Instantly condense long texts into clear, concise summaries while preserving key information.",
      image: summrizer_tool,
      bgColor: "#8337FB",
      link: `${siteUrl}/summarizer`,
    },
    {
      title: "Translator",
      description:
        "Instantly translate words, sentences, and documents in any language with accuracy and clear meaning.",
      image: translator_tool,
      bgColor: "#EAB825",
      link: `${siteUrl}/translator`,
    },
    {
      title: "Plagiarism",
      description:
        "Instantly check for duplicate content, verify authenticity, and ensure your writing remains original and trustworthy.",
      image: plagarisam_tool,
      bgColor: "#F89500",
      link: `${siteUrl}/plagiarismchecker`,
    },
  ];

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      startKiwiAnimation();
    }, 8000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(animationTimerRef.current);
      Object.values(timerRefs.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const timerRefs = useRef({});

  const startKiwiAnimation = () => {
    setisSlideDown(false);
    setTimeout(() => {
      setisSlideDown(true);
      animationTimerRef.current = setTimeout(() => {
        setisSlideDown(false);
        timerRefs.current.restartCycle = setTimeout(() => {
          startKiwiAnimation();
        }, 8000);
      }, 2000);
    }, 3000);
  };

  return (
    <>
      <main className="main">
        <Head>
          <meta charset="UTF-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            Kreativespace: Complete AI Writing Solutions for Everyone
          </title>
          <meta
            name="description"
            content="Kreativespace - Write Faster, Publish Smarter, Stay Productive & Original with Complete AI Writing Solutions for Everyone. Try Now - FREE, Fast & Accurate!"
          />
          <meta
            name="title"
            content="Kreativespace: Complete AI Writing Solutions for Everyone"
          />
          <meta
            property="og:title"
            content="Kreativespace: Complete AI Writing Solutions for Everyone"
          />
          <meta
            property="og:description"
            content="Kreativespace - Write Faster, Publish Smarter, Stay Productive & Original with Complete AI Writing Solutions for Everyone. Try Now - FREE, Fast & Accurate!"
          />

          <meta name="robots" content="noindex,nofollow" />
          <meta name="type" content="website" />
          <meta name="url" content="https://kreativespace.com/" />
          <meta
            name="image"
            content="https://d35z3dfm220p5l.cloudfront.net/4x_Kiwi.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kreativespace.com/" />
          <meta
            property="og:image"
            content="https://d35z3dfm220p5l.cloudfront.net/4x_Kiwi.png"
          />
          <link rel="canonical" href="https://kreativespace.com/" />
        </Head>

        <div className="min-h-screen bg-white from-[#f8f6f1] to-white flex flex-col">
          {/* Header - Pass ispaid prop */}

          <Header ispaid={ispaid} />

          <div className="pt-[100px] flex flex-col justify-center items-center text-center">
            <style jsx>{`
              @keyframes slideUpKiwi {
                from {
                  transform: translateY(160px);
                }
                to {
                  transform: translateY(0);
                }
              }
              @keyframes slideDownKiwi {
                from {
                  transform: translateY(0);
                }
                to {
                  transform: translateY(250px);
                }
              }

              .slide-down-kiwi {
                animation: slideDownKiwi 1s forwards;
              }

              .slide-up-kiwi {
                animation: slideUpKiwi 1s forwards;
              }
            `}</style>

            <div className="relative w-full flex flex-col items-center justify-center responsive-title-width">
              <div className="flex-1 flex flex-col items-center justify-center title-width">
                <div
                  id="kiwi-container"
                  className="relative pointer-events-none bg-transparent z-0 mb-2"
                >
                  <div
                    className={`relative transition-transform duration-500 ${
                      isSlideDown ? "slide-down-kiwi" : "slide-up-kiwi"
                    }`}
                    style={{
                      transform: isSlideDown
                        ? "translateY(0)"
                        : "translateY(-160px)",
                      transition: "transform 0.8s ease-in-out",
                    }}
                  >
                    <Lottie
                      animationData={kiwi}
                      className="relative lottie"
                      lottieRef={lottieRef}
                    />

                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      style={{
                        width: "200px",
                        height: "20px",
                        background:
                          "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, transparent 80%)",
                        borderRadius: "50%",
                        filter: "blur(8px)",
                      }}
                    />
                  </div>
                  <div className="lottie-shadow"></div>
                </div>
                <p className="home-title-suits pb-[8px]">
                  Free AI Writing Tools Suite For
                </p>
                {isMobile ? (
                  <h1 className="home-title">
                    Productivity <br /> & <br /> Authenticity!
                  </h1>
                ) : (
                  <h1 className="home-title">
                    Productivity&nbsp;&&nbsp;Authenticity!
                  </h1>
                )}

                <p className="home-subtitle pt-[8px] px-[24px]">
                  AI-powered tools for seamless writing. Boost everyday
                  productivity across writing and studying tasks while
                  maintaining its integrity.
                </p>

                <div className="mt-[32px] max-[900px]:hidden min-[901px]:flex">
                  {!token ? (
                    <button
                      className="py-[12px] px-[24px]  bg-[#A57F28] try-now-free-sidebar-text rounded-full cursor-pointer shining-button"
                      style={{ boxShadow: "0px 4px 4px 0px #1512071F" }}
                      onClick={() => {
                        setShowLoginModal(true);
                      }}
                    >
                      Try Now For Free
                    </button>
                  ) : ispaid !== "paid" ? (
                    <div className="text-center">
                      <button
                        className="py-[12px] px-[24px] flex items-center gap-2  bg-[#F58F00] try-now-free-sidebar-text rounded-full cursor-pointer shining-button"
                        style={{ boxShadow: "0px 4px 4px 0px #1512071F" }}
                        onClick={() => {
                          window.location.href = `${siteUrl}/pricing`;
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.72253 2.7267C6.73585 0.9089 7.24251 0 8 0C8.75749 0 9.26415 0.9089 10.2775 2.7267L10.5396 3.19699C10.8276 3.71355 10.9716 3.97183 11.196 4.14225C11.4205 4.31266 11.7001 4.37592 12.2593 4.50244L12.7684 4.61762C14.7361 5.06284 15.72 5.28546 15.9541 6.03819C16.1881 6.79092 15.5174 7.57526 14.1759 9.14394L13.8289 9.54978C13.4477 9.99555 13.2571 10.2184 13.1713 10.4942C13.0856 10.7699 13.1144 11.0673 13.172 11.662L13.2245 12.2035C13.4273 14.2965 13.5287 15.343 12.9159 15.8082C12.3031 16.2734 11.3819 15.8492 9.53946 15.0009L9.06281 14.7815C8.53926 14.5404 8.27748 14.4199 8 14.4199C7.72252 14.4199 7.46074 14.5404 6.93719 14.7815L6.46054 15.0009C4.61814 15.8492 3.69694 16.2734 3.08412 15.8082C2.4713 15.343 2.5727 14.2965 2.77552 12.2035L2.82799 11.662C2.88562 11.0673 2.91444 10.7699 2.82869 10.4942C2.74294 10.2184 2.55234 9.99555 2.17113 9.54978L1.82408 9.14394C0.482599 7.57526 -0.18814 6.79092 0.0459368 6.03819C0.280014 5.28546 1.26389 5.06284 3.23163 4.61762L3.74071 4.50244C4.29988 4.37592 4.57947 4.31266 4.80395 4.14225C5.02844 3.97183 5.17242 3.71355 5.46037 3.19699L5.72253 2.7267Z"
                            fill="white"
                          />
                        </svg>
                        Get Premium now
                      </button>

                      <div className="text-center pt-[12px] money-back-currency">
                        5 Days Money Back Guarantee
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Badge Section - Pass ispaid prop */}
          <div
            className="flex justify-center flex-wrap pt-[100px]"
            id="ai-writing-tools"
          >
            <DockApps
              app="home"
              ispaid={ispaid}
              u_name={username}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
          <BlackfridayPopup />

          <WhyChooseUs />
          <div className="flex justify-center flex-wrap">
            {ispaid === "unpaid" && <PaidUltimate />}
          </div>

          <div
            className=" pt-[100px] bg-transparent flex flex-col items-center justify-center [@media(max-width:740px)]:gap-[100px] [@media(min-width:1300px)]:px-[160px]"
            ref={container}
          >
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.05;

              return (
                <>
                  {i === 0 && (
                    <div
                      className={`${
                        isContainerVisible ? "sticky top-0 z-10" : ""
                      } pt-1 text-center px-4 transition-all duration-300`}
                    >
                      <h2
                        className="text-[24px] text-center capitalize"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 400,
                          fontSize: "24px",
                          lineHeight: "36px",
                          color: "#151207",
                          textTransform: "capitalize",
                        }}
                      >
                        This is How our top tools look like
                      </h2>
                    </div>
                  )}
                  <StackingCards
                    len={projects.length}
                    key={`project_${i}`}
                    i={i}
                    {...project}
                    progress={scrollYProgress}
                    range={[i * 0.25, 1]}
                    targetScale={targetScale}
                    projects={projects}
                    ispaid={ispaid}
                  />
                </>
              );
            })}
          </div>

          {windowWidth <= 2400  && <BrowserExtension />}

          <Testimonial />
          <FaqQueAns faqQueAns={faqQueAns} name="Questions?" />

          {ispaid === null && (
            <CallToAction setShowLoginModal={setShowLoginModal} />
          )}

          <ReviewTrustPilot />

          <Footer />

          {showLoginModal && (
            <SignInModel
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
            />
          )}
        </div>
      </main>
    </>
  );
}
