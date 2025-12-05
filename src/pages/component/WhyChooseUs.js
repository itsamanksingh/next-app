import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M16.9141 19.25C16.9141 16.6573 16.9141 15.3609 17.7378 14.5555C18.5616 13.75 19.8874 13.75 22.5391 13.75C25.1907 13.75 26.5165 13.75 27.3403 14.5555C28.1641 15.3609 28.1641 16.6573 28.1641 19.25V22C28.1641 24.5927 28.1641 25.8891 27.3403 26.6945C26.5165 27.5 25.1907 27.5 22.5391 27.5C19.8874 27.5 18.5616 27.5 17.7378 26.6945C16.9141 25.8891 16.9141 24.5927 16.9141 22V19.25Z" fill="#54C754"/>
          <path d="M3.16406 10.75C3.16406 13.3427 3.16406 14.6391 3.98782 15.4445C4.81159 16.25 6.13741 16.25 8.78906 16.25C11.4407 16.25 12.7665 16.25 13.5903 15.4445C14.4141 14.6391 14.4141 13.3427 14.4141 10.75V8C14.4141 5.40727 14.4141 4.11091 13.5903 3.30546C12.7665 2.5 11.4407 2.5 8.78906 2.5C6.13741 2.5 4.81159 2.5 3.98782 3.30546C3.16406 4.11091 3.16406 5.40728 3.16406 8V10.75Z" fill="#54C754"/>
          <path d="M16.9141 6.875C16.9141 5.516 16.9141 4.83651 17.1282 4.30051C17.4136 3.58584 17.9611 3.01804 18.6503 2.72202C19.1671 2.5 19.8224 2.5 21.1328 2.5H23.9453C25.2558 2.5 25.911 2.5 26.4279 2.72202C27.117 3.01804 27.6645 3.58584 27.95 4.30051C28.1641 4.83651 28.1641 5.516 28.1641 6.875C28.1641 8.234 28.1641 8.9135 27.95 9.44949C27.6645 10.1642 27.117 10.732 26.4279 11.028C25.911 11.25 25.2558 11.25 23.9453 11.25H21.1328C19.8224 11.25 19.1671 11.25 18.6503 11.028C17.9611 10.732 17.4136 10.1642 17.1282 9.44949C16.9141 8.9135 16.9141 8.234 16.9141 6.875Z" fill="#54C754"/>
          <path d="M3.16406 23.125C3.16406 24.484 3.16406 25.1635 3.37815 25.6995C3.6636 26.4142 4.21112 26.982 4.90027 27.278C5.41712 27.5 6.07235 27.5 7.38281 27.5H10.1953C11.5058 27.5 12.161 27.5 12.6779 27.278C13.367 26.982 13.9145 26.4142 14.2 25.6995C14.4141 25.1635 14.4141 24.484 14.4141 23.125C14.4141 21.766 14.4141 21.0865 14.2 20.5505C13.9145 19.8358 13.367 19.268 12.6779 18.972C12.161 18.75 11.5058 18.75 10.1953 18.75H7.38281C6.07235 18.75 5.41712 18.75 4.90027 18.972C4.21112 19.268 3.6636 19.8358 3.37815 20.5505C3.16406 21.0865 3.16406 21.766 3.16406 23.125Z" fill="#54C754"/>
        </svg>
      ),
      title: "All-In-One AI Writing",
      description: "Your complete writing toolkit all in one easy-to-use space.",
      color: "#54C754"
    },
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M7.08691 11.893L10.9146 6.71416C13.3888 3.36659 14.6259 1.69281 15.7801 2.04652C16.9343 2.40022 16.9343 4.45311 16.9343 8.5589V8.94602C16.9343 10.4269 16.9343 11.1673 17.4075 11.6318L17.4325 11.6558C17.9159 12.1105 18.6865 12.1105 20.2278 12.1105C23.0014 12.1105 24.3882 12.1105 24.8569 12.9516C24.8646 12.9656 24.8722 12.9796 24.8795 12.9937C25.3219 13.8479 24.519 14.9343 22.9131 17.1071L19.0854 22.2858C16.6111 25.6334 15.374 27.3072 14.2198 26.9535C13.0656 26.5998 13.0656 24.5468 13.0657 20.441L13.0657 20.0541C13.0657 18.5732 13.0657 17.8327 12.5926 17.3683L12.5675 17.3442C12.0841 16.8896 11.3135 16.8896 9.77219 16.8896C6.9986 16.8896 5.61181 16.8896 5.14312 16.0484C5.13536 16.0345 5.12782 16.0204 5.12049 16.0063C4.67805 15.1521 5.481 14.0657 7.08691 11.893Z" fill="#56AEFF"/>
        </svg>
      ),
      title: "Fast, Accurate & Easy To Use",
      description: "Get instant results with smart AI and an intuitive anyone can use.",
      color: "#56AEFF"
    },
    {
      icon: (
        <svg width="30" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.89062 12.5683V10C6.89062 5.3401 10.6682 1.5625 15.3281 1.5625C19.988 1.5625 23.7656 5.3401 23.7656 10V12.5683C25.1591 12.6723 26.0665 12.9351 26.7298 13.5983C27.8281 14.6967 27.8281 16.4645 27.8281 20C27.8281 23.5355 27.8281 25.3033 26.7298 26.4017C25.6314 27.5 23.8637 27.5 20.3281 27.5H10.3281C6.79259 27.5 5.02482 27.5 3.92647 26.4017C2.82812 25.3033 2.82812 23.5355 2.82812 20C2.82812 16.4645 2.82812 14.6967 3.92647 13.5983C4.58976 12.9351 5.49718 12.6723 6.89062 12.5683ZM8.76562 10C8.76562 6.37563 11.7038 3.4375 15.3281 3.4375C18.9525 3.4375 21.8906 6.37563 21.8906 10V12.5045C21.4119 12.5 20.8925 12.5 20.3281 12.5H10.3281C9.76373 12.5 9.24439 12.5 8.76562 12.5045V10ZM17.8281 20C17.8281 21.3807 16.7088 22.5 15.3281 22.5C13.9474 22.5 12.8281 21.3807 12.8281 20C12.8281 18.6193 13.9474 17.5 15.3281 17.5C16.7088 17.5 17.8281 18.6193 17.8281 20Z" fill="#F0BE28"/>
        </svg>
      ),
      title: "Secure, Private & Ad-Free",
      description: "No data tracking, no ads, just secure, focused writing.",
      color: "#F0BE28"
    }
  ];

  return (
    <div className="w-full bg-white pt-[100px] [@media(max-width:740px)]:pt-[100px]">
      <div className="max-w-[1072px] mx-auto px-[12px]">
        {/* Section Title */}
        <div className="text-center mb-[60px] [@media(max-width:740px)]:mb-[40px]">
          <h2 className="text-[32px] [@media(max-width:740px)]:text-[24px] mb-[16px]" style={{font:"Poppins", fontWeight:"400", fontSize: "24px", lineHeight: "36px", color: "#151207"}}>
            Why Choose Our AI Writing Suite?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] [@media(max-width:740px)]:gap-[24px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-[24px] [@media(max-width:740px)]:p-[20px] rounded-[16px] border border-[#E8E8E8] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:scale-105 transition-all duration-300 hover:border-[#D1D5DB]"
            >
              {/* Icon Container */}
              <div 
                className="w-[50px] h-[50px] [@media(max-width:740px)]:w-[50px] [@media(max-width:740px)]:h-[50px] rounded-[5px] flex items-center justify-center mb-[20px] [@media(max-width:740px)]:mb-[16px]"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <div className="w-[30px] h-[30px] [@media(max-width:740px)]:w-[26px] [@media(max-width:740px)]:h-[26px] flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Title - Updated to match CSS specs */}
              <h3 className="text-[16px] [@media(max-width:740px)]:text-[14px] font-medium text-[#151207] mb-[12px] [@media(max-width:740px)]:mb-[8px] text-center leading-[24px]">
                {feature.title}
              </h3>

              {/* Description - Updated to match CSS specs */}
              <p className="text-[14px] [@media(max-width:740px)]:text-[12px] text-[#363532] leading-[20px] text-center font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-[160px] [@media(max-width:740px)]:mt-[160px]">
          <p
            className="text-[24px] [@media(max-width:740px)]:text-[20px] leading-[36px] [@media(max-width:740px)]:leading-[30px] capitalize"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              letterSpacing: '0%'
            }}
          >
            This Is What Our Top Tools Look Like
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default WhyChooseUs;