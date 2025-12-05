import React from "react";
import { CitationApp,DetectorApp, GrammarApp, ParaphraserApp, PlagApp, SummrizerApp, TraslatorApp } from "../../store/productAppIcons";

const ProductApp = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const appArray = [
        { id: 1, name: 'Summarizer', icon: SummrizerApp, url: `${baseUrl}/${"summarizer"}` },
        { id: 2, name: 'Grammar', icon: GrammarApp, url: `${baseUrl}/${"grammar-checker"}` },
        { id: 3, name: 'Paraphraser', icon: ParaphraserApp, url: `${baseUrl}/${"paraphraser"}` },
        { id: 4, name: 'Citation', icon: CitationApp, url: `${baseUrl}/${"citation-generator"}` },
        { id: 5, name: 'Translator', icon: TraslatorApp, url: `${baseUrl}/${"translator"}` },
        { id: 6, name: 'Plagiarism', icon: PlagApp, url: `${baseUrl}/${"plagiarism-checker"}` },
        { id: 7, name: 'AI Detector', icon: DetectorApp, url: `${baseUrl}/${"ai-detector"}` },
    ];

    return (
        <div className="flex flex-col flex-wrap w-full max-w-[1072px]">
            <div className="gap-4 justify-center items-center flex flex-wrap">
                {appArray.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className=" flex flex-shrink-0 w-[256px] items-center justify-between bg-white rounded-lg p-[12px] border border-[#E8E8E8] hover:shadow-xl hover:border-[#A57F28] hover:scale-105 transition-all duration-300 ease-out cursor-pointer" 
                            onClick={() =>
                                (window.location.href = `${item.url}`)
                            }>
                                <div className="flex items-center flex-1 ">
                                    <div className="rounded-[5px] flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: '#FBF8FD' }}>
                                        {item.icon && <item.icon />}
                                    </div>
                                    <span className="text-[16px] font-normal leading-[28px] text-[#151207]">{item.name}</span>
                                </div>
                                <svg className="w-5 h-6 text-[#7C7B77] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </React.Fragment>
                    )
                })}

            </div>
        </div>
    )
}

export default ProductApp