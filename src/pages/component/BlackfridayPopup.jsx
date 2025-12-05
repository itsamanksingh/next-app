'use client';
import { useEffect, useState } from 'react';
import christmaspopup from '../../../public/images/christmas/christmaspopup.svg'
import Image from 'next/image';

const BlackfridayPopup = () => {

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const [isVisible, setIsVisible] = useState(true);


    if (!isVisible) return null;

    const getFromLocalStorage = (key) => {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                const value = localStorage.getItem(key);
                return JSON.parse(value);
            }
        } catch (error) {
            console.error(`Error accessing localStorage for key ${key}:`, error);
        }
        return null;
    };

    return (
        <>

            {getFromLocalStorage('account_type') !== 'paid' &&

                <div className="fixed inset-0 flex items-center justify-center z-50 cursor-pointer"
                >

                    <div className="absolute inset-0 bg-black opacity-65" />


                    <div
                        className="relative  rounded-[20px] overflow-hidden"
                        onClick={() => (window.location.href = `${baseUrl}/pricing`)}
                    >
                        <Image
                            src={christmaspopup}
                            alt="christmaspopup"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-[17%] right-[21%] flex justify-end items-start w-auto inset-y-0">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsVisible(false) }}
                                className={`transition-colors p-[4px] cursor-pointer rounded-full bg-[#E1E1E14D]  hover:bg-[#E1E1E14D] ${isVisible ? 'animate-slideFromBottom' : ''}`} aria-label="Close banner"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5.00004L5.00004 15M5 5L15 15" stroke="black" strokeWidth="0.909091" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full px-4">

                            <div className="flex flex-col gap-[9px]">
                                <div className="font-semibold text-center text-[14px] text-white">Use Code:</div>

                                <div className="bg-white text-[#590C14] font-medium text-[16px] px-[22px] py-[12px] rounded-full w-max mx-auto pointer-events-auto"   onClick={(e) => e.stopPropagation()}>
                                    CHRISTMAS25
                                </div>

                                <div className="font-semibold text-center text-[14px] text-white">till 25th december</div>
                            </div>

                        </div>
                    </div>

                </div>}
        </>
    )
}

export default BlackfridayPopup