"use client"
import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa6";

const Testimonial = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeAnimation = () => {
      if (!marqueeRef.current) return;
      
      const container = marqueeRef.current;
      const scrollDistance = 1; // Adjust speed
      let position = 0;
      
      const scroll = () => {
        position -= scrollDistance;
        // Reset position when first card moves completely out of view
        if (position <= -550) {
          position = 0;
        }
        container.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scroll);
      };
      
      requestAnimationFrame(scroll);
    };
    
    marqueeAnimation();
  }, []);

  return (
    <section className="w-full bg-gray-100 py-10 px-4 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-start gap-12 md:gap-20">
        {/* Heading section */}
        <div className="flex flex-col items-center justify-start gap-6 max-w-3xl w-full">
          <h2 className="font-['Inter'] md:text-4xl text-xl font-normal leading-tight text-gray-800 text-center">
            Over 8,000 customers
          </h2>
          <p className="font-['Inter'] md:text-base text-xs font-normal md:leading-normal leading-tight text-gray-500 text-center">
            What some of our 8,000+ customers across 100+ countries think of
            Transkript.
          </p>
        </div>
        
        {/* Testimonial carousel with overflow hidden and mask overlays */}
        <div className="w-full overflow-hidden relative">
          {/* Mask overlays using pseudo-elements */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-28 lg:w-36 bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-28 lg:w-36 bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          
          {/* Inner marquee content that will scroll */}
          <div 
            ref={marqueeRef}
            className="flex items-start justify-start gap-3"
            style={{ 
              willChange: "transform"
            }}
          >
            {/* First set of cards for continuous loop */}
            <div className="flex-shrink-0 flex flex-col h-64 w-full sm:w-[350px] md:w-[450px] lg:w-[550px] items-start justify-between p-6 md:p-8 bg-white outline outline-1 outline-gray-200">
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="font-['Inter'] text-xl font-medium leading-tight text-neutral-700">
                  &ldquo;Huge boost in productivity&rdquo;
                </div>
                <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                  Transkript has completely transformed our customer support
                  operations. The AI call assistant handles routine inquiries
                  with ease, allowing our team to focus on more complex cases.
                  We&apos;ve seen a huge boost in productivity and customer
                  satisfaction!
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <img
                  className="h-10 w-10 rounded-3xl"
                  src="https://placehold.co/42x42"
                  alt="Profile"
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="font-['Inter'] text-sm font-medium leading-tight text-neutral-700">
                    Megan L.
                  </div>
                  <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                    Customer Support Manager
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col h-64 w-full sm:w-[350px] md:w-[450px] lg:w-[550px] items-start justify-between p-6 md:p-8 bg-white outline outline-1 outline-gray-200">
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="font-['Inter'] text-xl font-medium leading-tight text-neutral-700">
                  &ldquo;Game Changer&rdquo;
                </div>
                <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                  The call flow builder is a game-changer! Designing and
                  updating our call flows used to be a hassle, but with
                  Transkript, we can quickly create dynamic paths that improve
                  our caller experience. Highly recommended!
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <img
                  className="h-10 w-10 rounded-3xl"
                  src="https://placehold.co/42x42"
                  alt="Profile"
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="font-['Inter'] text-sm font-medium leading-tight text-neutral-700">
                    Samir P.
                  </div>
                  <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                    Operations Director
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col h-64 w-full sm:w-[350px] md:w-[450px] lg:w-[550px] items-start justify-between p-6 md:p-8 bg-white outline outline-1 outline-gray-200">
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="font-['Inter'] text-xl font-medium leading-tight text-neutral-700">
                  &ldquo;Excellent Service&rdquo;
                </div>
                <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                  Transkript has completely transformed our customer support
                  operations. The AI call assistant handles routine inquiries
                  with ease, allowing our team to focus on more complex cases.
                  We&apos;ve seen a huge boost in productivity and customer
                  satisfaction!
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <img
                  className="h-10 w-10 rounded-3xl"
                  src="https://placehold.co/42x42"
                  alt="Profile"
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="font-['Inter'] text-sm font-medium leading-tight text-neutral-700">
                    Megan L.
                  </div>
                  <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                    Customer Support Manager
                  </div>
                </div>
              </div>
            </div>
            
            {/* Duplicate card for continuous scrolling effect */}
            <div className="flex-shrink-0 flex flex-col h-64 w-full sm:w-[350px] md:w-[450px] lg:w-[550px] items-start justify-between p-6 md:p-8 bg-white outline outline-1 outline-gray-200">
              <div className="flex flex-col items-start justify-center gap-4">
                <div className="font-['Inter'] text-xl font-medium leading-tight text-neutral-700">
                  &ldquo;Huge boost in productivity&rdquo;
                </div>
                <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                  Transkript has completely transformed our customer support
                  operations. The AI call assistant handles routine inquiries
                  with ease, allowing our team to focus on more complex cases.
                  We&apos;ve seen a huge boost in productivity and customer
                  satisfaction!
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <img
                  className="h-10 w-10 rounded-3xl"
                  src="https://placehold.co/42x42"
                  alt="Profile"
                />
                <div className="flex flex-col items-start justify-center">
                  <div className="font-['Inter'] text-sm font-medium leading-tight text-neutral-700">
                    Megan L.
                  </div>
                  <div className="font-['Inter'] text-xs font-normal leading-tight text-gray-500">
                    Customer Support Manager
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="mt-12 flex items-center justify-center gap-4">
              <div className="bg-black-900 flex w-40 items-center justify-between rounded-xl px-5 py-3">
                <div className="justify-center text-center font-['Inter'] text-base font-medium leading-none text-white">
                  Try Now
                </div>
                <FaArrowRight className="text-white h-5 w-5"/>
                
              </div>
              <div className="relative flex items-center justify-start gap-1.5 rounded-xl px-5 py-3">
                <FaPhone className="text-black h-5 w-5"/>
                <div className="text-black justify-center text-center font-['Inter'] text-base font-medium leading-none">
                  Talk to Sales
                </div>
                <div className="absolute left-0 top-0 h-11 w-40 rounded-xl border border-neutral-200" />
              </div>
            </div>
      </div>
    </section>
  );
};

export default Testimonial;
