"use client"
import React from 'react'
import Script from 'next/script'

const ReviewTrustPilot = () => {
    return (
        <>
            {/* Load Trustpilot script using Next.js Script component */}
            <Script
                src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                strategy="lazyOnload"
                async
            />
            <div className='pb-[24px] bg-white px-6 pt-[100px]'>
                <div className="flex justify-center flex-wrap pb-2 review-text">
                    <p>Share Your Experience</p>
                </div>
                <div className='py-2'>
                    <div
                        className="trustpilot-widget flex"
                        data-locale="en-US"
                        data-template-id="56278e9abfbbba0bdcd568bc"
                        data-businessunit-id="68786928bb280230abe25070"
                        data-style-height="52px"
                        data-style-width="100%"
                        data-theme="light"
                    >
                        <a
                            href="https://www.trustpilot.com/review/kreativespace.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                        >
                            Trustpilot
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewTrustPilot