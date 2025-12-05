"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

function PaidUltimate({ app, ispaid }) {

    return (
        <section className="w-screen bg-[#FFFBF6] overflow-hidden relative flex items-center justify-center py-12 mt-[100px] px-[24px]">
            {/* Background Circles - Mirrored to left side */}
            <div className='absolute inset-0 w-full h-full overflow-hidden'>
                <svg className="absolute bottom-0 left-0" width="306" height="236" viewBox="0 0 306 236" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_13088_37098)">
                        <circle cx="213.1779" cy="278.688" r="102" transform="rotate(5 213.1779 278.688)" fill="#FFF5E9" />
                        <circle cx="-51.808" cy="255.504" r="186" transform="rotate(5 -51.808 255.504)" fill="#FFF5E9" />
                    </g>
                    <defs>
                        <clipPath id="clip0_13088_37098">
                            <rect width="306" height="236" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            {/* Main Content */}
            <div
                className="relative z-10 mx-auto my-[100px] [@media(max-width:603px)]:px-4 [@media(max-width:320px)]:px-4"
                style={{ maxWidth: "1072px" }}
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                    {/* Second Div - Feature Tags (appears first on mobile) */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
                            <div className="bg-white rounded-lg p-[12px] text-[#363532] shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Advance Writing
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                All Modes
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Multi Language
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Synonymous level
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Delivery
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Support
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532] shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Engagement
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Translate
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Correctness
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Priority
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Plagiarize
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Store your history
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                Like Boss
                            </div>
                            <div className="bg-white rounded-lg p-[12px] text-[#363532]  shadow-lg text-center whitespace-nowrap" style={{
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0%"
                            }}>
                                More...
                            </div>
                        </div>
                    </div>

                    {/* First Div - Text Content (appears second on mobile) */}
                    <div className="w-full lg:w-1/2  text-center lg:text-left order-2 lg:order-1">
                        <h1 className="pb-[20px] text-[#151207]" style={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            fontSize: "24px",
                            lineHeight: "36px",
                            letterSpacing: "0%",
                            textTransform: "capitalize"
                        }}>
                            The Ultimate Writing AI Suite
                        </h1>
                        <p style={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "28px",
                            letterSpacing: "0%",
                            textTransform: "capitalize"
                        }} className="text-[#363532] pb-[30px] max-w-lg mx-auto lg:mx-0">
                            Unleash Your Writing Potential With Unlimited Access To Smarter, Faster, And Multilingual Tools — And So Much More.
                        </p>
                        <div className="max-[1023px]:w-none min-[1024px]:w-[300px]">
                          <button
                            onClick={() => (window.location.href = `${baseUrl}/${"pricing"}`)}
                            className="hover:bg-orange-600 text-white justify-center rounded-full font-medium transition-colors duration-200 inline-flex items-center gap-2 py-[12px] px-[24px] cursor-pointer"
                            style={{ backgroundColor: "#F58F00" }}
                          >
                            <svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.22253 2.7267C7.23585 0.9089 7.74251 0 8.5 0C9.25749 0 9.76415 0.9089 10.7775 2.7267L11.0396 3.19699C11.3276 3.71355 11.4716 3.97183 11.696 4.14225C11.9205 4.31266 12.2001 4.37592 12.7593 4.50244L13.2684 4.61762C15.2361 5.06284 16.22 5.28546 16.4541 6.03819C16.6881 6.79092 16.0174 7.57526 14.6759 9.14394L14.3289 9.54978C13.9477 9.99555 13.7571 10.2184 13.6713 10.4942C13.5856 10.7699 13.6144 11.0673 13.672 11.662L13.7245 12.2035C13.9273 14.2965 14.0287 15.343 13.4159 15.8082C12.8031 16.2734 11.8819 15.8492 10.0395 15.0009L9.56281 14.7815C9.03926 14.5404 8.77748 14.4199 8.5 14.4199C8.22252 14.4199 7.96074 14.5404 7.43719 14.7815L6.96054 15.0009C5.11814 15.8492 4.19694 16.2734 3.58412 15.8082C2.9713 15.343 3.0727 14.2965 3.27552 12.2035L3.32799 11.662C3.38562 11.0673 3.41444 10.7699 3.32869 10.4942C3.24294 10.2184 3.05234 9.99555 2.67113 9.54978L2.32408 9.14394C0.982599 7.57526 0.31186 6.79092 0.545937 6.03819C0.780014 5.28546 1.76389 5.06284 3.73163 4.61762L4.24071 4.50244C4.79988 4.37592 5.07947 4.31266 5.30395 4.14225C5.52844 3.97183 5.67242 3.71355 5.96037 3.19699L6.22253 2.7267Z"
                                fill="white"
                              />
                            </svg>
                            Unlock Premium - Save 65%
                          </button>
                        <div className="text-center pt-[12px] money-back-currency">
                          5 Days Money Back Guarantee
                        </div>
                      </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default PaidUltimate;