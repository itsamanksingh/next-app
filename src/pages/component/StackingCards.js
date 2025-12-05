"use client";
import { useTransform, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const StackingCards = ({
  len,
  i,
  title,
  description,
  image,
  video,
  isLottie,
  link,
  color,
  projects,
  progress,
  range,
  targetScale,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(null); // Tracks the active card index
  const lottieRefs = useRef([]); // References for Lottie animations
  const container = useRef(null);
  const cardRefs = useRef([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);



  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 741);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const isLastCard = i === projects?.length - 1;


  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  // const scale = useTransform(progress, range, [1, targetScale]);

  const scale =
    progress && range
      ? useTransform(progress, range, [1, targetScale])
      : undefined;

  // useEffect(() => {
  //   if (!Array.isArray(projects)) return;
  //   let projects_length = projects && projects.length
  //   // Initialize refs arrays to match the number of cards
  //   cardRefs.current = cardRefs.current.slice(0,projects_length);
  //   lottieRefs.current = lottieRefs.current.slice(0,projects_length);

  //   if (lottieRefs.current[0]) {
  //     lottieRefs.current[0].play();
  //   }

  //   // Function to check card visibility and control animations
  //   const handleCardVisibility = () => {
  //     cardRefs.current.forEach((cardRef, i) => {
  //       if (!cardRef) return;

  //       const rect = cardRef.getBoundingClientRect();
  //       const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  //       // If this card is overlapped (not the active one) and has a Lottie ref
  //       if (activeCard !== null && activeCard !== i && lottieRefs.current[i]) {
  //         lottieRefs.current[i].pause();
  //       }

  //       // If card is not visible at all, also pause its animation
  //       if (!isVisible && lottieRefs.current[i]) {
  //         lottieRefs.current[i].pause();
  //       }
  //     });
  //   };

  //   // Add event listeners for scroll and resize
  //   window.addEventListener("scroll", handleCardVisibility);
  //   window.addEventListener("resize", handleCardVisibility);

  //   // Initial check
  //   handleCardVisibility();

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener("scroll", handleCardVisibility);
  //     window.removeEventListener("resize", handleCardVisibility);
  //   };
  // }, [projects.length, activeCard]);

  // Function to handle card hover
  const handleCardHover = (index) => {
    // Stop any currently playing animations except the current one
    lottieRefs.current.forEach((ref, i) => {
      if (i !== index && ref) {
        ref.pause();
      }
    });

    // Set the new active card
    setActiveCard(index);

    // Play the animation for the current card
    if (lottieRefs.current[index]) {
      lottieRefs.current[index].play();
    }
  };

  useEffect(() => {
    let animationFrameId;
    let timeoutId;

    // Function to check if animation is in progress
    const checkAnimationState = () => {
      // Get the current transform values to detect animation
      const cardEl = cardRefs.current[i];
      if (cardEl) {
        const transform = window.getComputedStyle(cardEl).transform;
        // If transform is not "none", animation is still happening
        const isCurrentlyAnimating =
          transform !== "none" && transform !== "matrix(1, 0, 0, 1, 0, 0)";

        if (isCurrentlyAnimating) {
          setIsAnimating(true);
          // Keep checking until animation stops
          animationFrameId = requestAnimationFrame(checkAnimationState);
        } else {
          // Animation has stopped, set a timeout to ensure smooth transition
          clearTimeout(timeoutId);
          // timeoutId = setTimeout(() => {
          //   setIsAnimating(false);
          // }, 100);
        }
      }
    };

    // Start checking for animation state
    checkAnimationState();

    // Scroll event listener
    const handleScroll = () => {
      setIsAnimating(true);
      clearTimeout(timeoutId);

      // Reset animation state after scrolling stops
      timeoutId = setTimeout(() => {
        checkAnimationState();
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [i]);

  return (
    <>

      <div
        ref={container}
        className="cardContainer bg-transparent pt-[150px] [@media(max-width:603px)]:pt-[150px] px-[24px]"

        style={{
          //  height: isAnimating ? `50vh` : "auto",
          minHeight: isMobile ? "80vh" : "60vh",
          // marginBottom: 150
          // marginTop: "20px",
          // marginBottom: "50px",
        }}
      >


        <motion.div
          key={i}
          data-index={i}
          style={{
            backgroundColor: "#ffffff",
            // scale,


            top: isMobile
              ? (isAnimating
                ? `calc(-5vh + ${i <= 3 ? i * 5 : i * 20}px)`
                : '')
              : (isAnimating
                ? `calc(-5vh + ${i * 15}px)`
                : ''),

            marginTop: 5 * i,
            // marginBottom: "100px",
            // paddingBotton: `${isLastCard ? "150%" : ""}`,
            transition: "box-shadow 0.3s ease-in-out",
            cursor: "pointer",
            position: "relative", // important to keep layout
            boxShadow: "0px 4px 32px 0px #1512070F",

            // boxShadow: isHovered
            //   ? `0 4px 12px rgba(165, 127, 40, 0.4),    /* primary color */
            //    0 8px 16px rgba(122, 66, 244, 0.2),     /* purple */
            //    0 10px 20px rgba(242, 199, 68, 0.2),    /* yellow */
            //    0 12px 24px rgba(198, 54, 92, 0.2),     /* red/pink */
            //    0 14px 28px rgba(0, 178, 65, 0.2),      /* green */
            //    0 16px 32px rgba(255, 165, 0, 0.2)` /* orange */
            //   : `0 4px 12px rgba(165, 127, 40, 0.1),    /* primary color */
            //    0 8px 16px rgba(122, 66, 244, 0.1),     /* purple */
            //    0 10px 20px rgba(242, 199, 68, 0.1),    /* yellow */
            //    0 12px 24px rgba(198, 54, 92, 0.1),     /* red/pink */
            //    0 14px 28px rgba(0, 178, 65, 0.1),      /* green */
            //    0 16px 32px rgba(255, 165, 0, 0.1)`,
          }}
          className="rounded-[20px] card w-full max-w-[1072px] border-1 border-[#E8E8E8] bg-transparent   pl-[24px] pr-[24px]"
          ref={(el) => (cardRefs.current[i] = el)}
          onMouseEnter={() => {
            setIsHovered(true);
            handleCardHover(i); // Set this card as active
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="body flex flex-col-reverse min-[741px]:flex-row justify-center items-center gap-[32px] min-[740px]:gap-[42px] w-full my-[20px]">
            {/* Description Section */}
            <div className="description flex-1 w-full max-w-[500px]">
              <p style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: '24px', lineHeight: '36px' }} className="text-[24px] min-[741px]:text-[30px] leading-tight text-[#151207]">
                {title}
              </p>
              <p style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: '16px', lineHeight: '28px' }} className="text-base text-[#444] pt-[8px]">{description}</p>
              <div
                className="w-fit mt-[24px] cursor-pointer"
                onClick={() => (window.location.href = link)}
              >
                <div className="flex items-center gap-1">
                  <p className="text-[#007AFF] font-medium">Explore Now</p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.38394 3.32293C6.61981 3.12075 6.97492 3.14807 7.17709 3.38394L11.6771 8.63394C11.8576 8.84459 11.8576 9.15543 11.6771 9.36608L7.17709 14.6161C6.97492 14.8519 6.61981 14.8793 6.38394 14.6771C6.14807 14.4749 6.12075 14.1198 6.32293 13.8839L10.5092 9.00001L6.32293 4.11608C6.12075 3.88021 6.14807 3.5251 6.38394 3.32293Z"
                      fill="#007AFF"
                    />
                  </svg>
                </div>
              </div>

            </div>

            {/* Video/Lottie Section */}
            <div className="w-full max-w-[500px] aspect-[4/3]">
              <motion.div
                className="w-full h-full rounded-[12px] overflow-hidden"
                style={{
                  borderRadius: "24px",
                }}
                onMouseEnter={() => {
                  if (lottieRefs.current[i]) lottieRefs.current[i].play();
                }}
                onMouseLeave={() => {
                  if (lottieRefs.current[i]) lottieRefs.current[i].pause();
                }}
              >
                {isLottie ? (
                  <Lottie
                    lottieRef={(ref) => {
                      if (ref) lottieRefs[i] = ref;
                    }}
                    animationData={image}
                    loop
                    autoplay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                  />
                )}
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>

    </>
  );
};

export default StackingCards;