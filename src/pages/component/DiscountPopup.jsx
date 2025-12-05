'use client'
import { useEffect, useState } from 'react';
import christmasBanner from '../../../public/images/christmas/christmasbanner.svg'
import mobileBanner from '../../../public/images/christmas/mobileBanner.svg'
import Image from 'next/image';


export default function DiscountPopup() {
    const [isVisible, setIsVisible] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    useEffect(() => {
        const observer = new MutationObserver(() => {
            document.body.style.paddingRight = '0px';
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
    }, []);

    if (!isVisible) return null;

    return (
        <>

            <div className="relative w-full bg-cover cursor-pointer flex shrink-0 overflow-hidden animate-slideFromTop pointer-events-none h-[44px] max-[600px]:h-[54px]"
                onClick={() =>
                    (window.location.href = `${baseUrl}/pricing`)
                }>
                <Image
                    src={christmasBanner}
                    alt="christmasBanner"
                    className="w-full h-full object-cover block max-[480px]:hidden shrink-0"
                />
                <Image
                    src={mobileBanner}
                    alt="christmasBanner"
                    className="w-full h-full object-cover shrink-0 hidden max-[480px]:block"
                />
                <div className="absolute inset-0 flex flex-wrap items-center justify-center px-[12px] shrink-0 text-white text-[16px] max-[600px]:text-[14px] max-[600px]:leading-[20px] max-[480px]:justify-start max-[600px]:h-10 max-[600px]:self-center font-normal pointer-events-auto">
                    Ho-Ho-Holidays Sale!<span className='font-bold text-[16px] max-[600px]:text-[14px] max-[600px]:leading-[20px]'>&nbsp; 72% OFF &nbsp;</span> Use Code&nbsp;-&nbsp;<span className='underline'>CHRISTMAS25</span>
                </div>

                <div className="absolute inset-y-0 right-[8px] w-full flex justify-end items-center pl-[12px]">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsVisible(false) }}
                        className={`transition-colors p-[4px] rounded-full  bg-[#FFFFFF3D] hover:bg-[#FFFFFF3D] ${isVisible ? 'animate-slideFromBottom' : ''}`} aria-label="Close banner"
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5.00004L5.00004 15M5 5L15 15" stroke="white" strokeWidth="0.909091" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}