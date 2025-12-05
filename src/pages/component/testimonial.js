import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { EmptyStarIcon, FillStarIcon } from "../../../public/images/testimonial/ratingicon";

const Testimonial = () => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const assistantArray = [
        { tilte: "", rating: 4, content: "I have used the paraphraser tool of Kreativespace. It has literally helped me rewrite all the complex sentences into a very simple language without changing any meaning of it. And I was using it for my assignment and it feels natural and saves time. It improves the quality of my writing.", image: "/images/testimonial/smittestimonial1.png", Name: "Krish", country: "Rutgers University", logo: "/images/testimonial/rutgersuniversity.png" },
        { title: "", rating: 5, content: "This tool saves me hours by automatically generating perfect citations every time. It is accurate, formats multiple docs, and takes the stress out of referencing for my assignments and papers.", image: "/images/testimonial/bhavyatestimonial.png", Name: "Bhavya", country: "Senior Editor", logo: "" },
        { title: "", rating: 4, content: "I had complete faith that my work was my own with the AI Detector feature. It immediately and correctly identified my content as human-generated, becoming an indispensable tool for maintaining trust in academy.", image: "/images/testimonial/jaytestimonial.png", Name: "Jay", country: "New York University", logo: "/images/testimonial/newyorkuniversity.png" },
        { title: "", rating: 5, content: "The translations are not only fast but also very accurate; they maintain my tone perfectly. It's been a lifesaver for me, talking to people in different languages and not losing track of what I'm saying.", image: "/images/testimonial/dhavaltestimonial.png", Name: "Dhaval", country: "Journalist", logo: "" },
        { title: "", rating: 4, content: "I made my AI text sound like a human. The output was undetectable by AI checkers and just flowed; it was a lifesaver for pure, polished original writing.", image: "/images/testimonial/smittestimonial.png", Name: "Smit", country: "Maastricht University", logo: "/images/testimonial/maastrichtuniversity.png" },
        { title: "", rating: 5, content: "I didn't even know parts of my work were plagiarised until I used this tool. It scans billions of sources and makes sure my writing is original and free from an academic problem.", image: "/images/testimonial/prachitestimonial.png", Name: "Prachi", country: "Writer", logo: "" },
        { title: "", rating: 4, content: "The Summarize feature was a game-changer for me. It was helping me with the contents, lengthy articles, and research papers into clear and precise points without losing any essence of it. I can really study faster and obtain more information right now. Absolutely amazing tool.", image: "/images/testimonial/janvitestimonial.png", Name: "Janvi", country: "King’s College London", logo: "/images/testimonial/king’scollegelondon.png" },
        { title: "", rating: 5, content: "Kreativespace worked for me like a true writing companion. I'm using it as my daily tool, it eased my extra efforts and saved a lot of time.", image: "/images/testimonial/bhargavtestimonial.png", Name: "Bhargav", country: "Queensland University of Technology", logo: "/images/testimonial/queenslanduniversityoftechnology.png" },
    ];

    // Duplicate items for seamless infinite scrolling
    const repeatedArray = [...assistantArray, ...assistantArray];

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let speed = 0.5; // Smaller speed for smoother scroll
        let animationFrameId;

        const scroll = () => {
            if (!isPaused) {
                slider.scrollLeft += speed;
                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        scroll(); // Start scrolling

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <>
            <div className="bg-white pt-[80px]">
                <div className="max-w-[1072px] mx-auto md:px-0 pt-[100px] overflow-hidden relative bg-white">
                    <p className="text-[24px] leading-[36px] text-[#151207] text-center">
                        What our writer says
                    </p>

                    <div className="pt-[42px] relative flex">
                        {/* Gradient Shadows for smooth edges */}
                        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

                        {/* Continuous Scrolling Slider */}
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-hidden "
                            onMouseEnter={() => { setIsPaused(true) }}  // Pause on hover
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {repeatedArray.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-6 ml-[14px] min-w-[324px] rounded-[12px] border border-[#E8E8E8] flex flex-1 flex-row items-center  gap-[8px] transition duration-300  box-border `}
                                    onMouseEnter={() => {
                                        setIsPaused(true);
                                        setHoveredIndex(index);
                                    }}
                                    onMouseLeave={() => {
                                        setIsPaused(false);
                                        setHoveredIndex(null);
                                    }}

                                >
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="flex flex-col items-start h-[314px] gap-[14px]">
                                            <div className="flex flex-row">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i}>
                                                        {i < item.rating ? <FillStarIcon /> : <EmptyStarIcon />}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-wrap w-full text-base font-normal leading-7 text-[#363532]">{item.content}</p>
                                        </div>
                                        <div className="flex items-center gap-[12px] h-[60px]">
                                            <Image
                                                src={item.image}
                                                alt={`${item.Name}'s profile photo`}
                                                width={42}
                                                height={42}
                                                className="w-[38px] h-[38px] rounded-full object-cover"
                                            />
                                            <div className="flex items-center justify-between w-full gap-[8px]">
                                                <div className="flex flex-col items-start gap-[1px]">
                                                    <p className="text-base font-normal leading-5 text-[#363532]">{item.Name}</p>
                                                    <p className="text-base font-normal leading-5 text-[#7C7B77]">{item.country}</p>
                                                </div>
                                                {item.logo && (
                                                    <Image
                                                        src={item.logo}
                                                        alt={`${item.Name}'s university`}
                                                        width={20}
                                                        height={20}
                                                        className="w-[24px] h-[24px] object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;