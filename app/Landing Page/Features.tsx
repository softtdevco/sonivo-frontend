import Image from "next/image";
import React from "react";
import { feature1, feature2, feature3, feature4, feature5 } from "@/assets/images";
import { FaArrowRight, FaPhone } from "react-icons/fa6";

const Features = () => {
  return (
    <>
      <div className="bg-white pb-8">
        <div className="mx-auto h-full md:w-[80%] w-[90%] md:pb-20 pb-10 md:pt-12 pt-8">
          <div className="h-20 justify-center self-stretch text-center font-['Inter'] md:text-5xl text-3xl font-normal leading-[61.60px] text-gray-800">
            Features
          </div>
          <div className="justify-center self-stretch text-center font-['Inter'] md:text-base text-xs font-normal leading-normal text-gray-500">
            Transkript AI streamlines communication with features like a
            customisable Call Flow Builder, efficient Agent Access, automated
            Call Broadcasts, Tailored Training Data for personalised
            interactions, and an integrated IVR & Dialer System for seamless
            call management.
          </div>
        </div>
        <div className="mx-auto my-5 w-full max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col gap-6">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-col items-center justify-start overflow-hidden md:rounded-tl-[48px] bg-gray-100 pb-6 pt-8 outline outline-1 outline-gray-200">
                  <Image
                    alt="feature1"
                    src={feature3}
                    className="w-[90%]  "
                  />

                  <div className="flex flex-col items-center justify-start gap-4 px-4">
                    <div className="justify-center self-stretch text-center font-['Inter'] md:text-2xl text-sm font-medium leading-tight text-neutral-700">
                      Ai Assistant
                    </div>
                    <div className="justify-center text-center font-['Inter'] md:text-sm text-[10px] font-normal leading-tight text-gray-500">
                      Transkript AI&apos;s Assistants integrate with VoIP
                      services to automate voice interactions. Configure them to
                      handle calls, provide responses, and execute tasks using
                      AI-driven automation. Seamlessly manage customer
                      engagement, streamline support, and enhance efficiency
                      with a fully customisable voice assistant built for your
                      business needs.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start overflow-hidden md:rounded-tr-[48px] bg-gray-100 pb-6 pt-8 outline outline-1 outline-gray-200">
                <Image
                    alt="feature1"
                    src={feature2}
                    className="w-[90%]"
                  />
                  <div className="flex flex-col items-center justify-start gap-4 px-4">
                    <div className="justify-center self-stretch text-center font-['Inter'] md:text-2xl text-sm font-medium leading-tight text-neutral-700">
                      Customise AI Assistants for Your Business Needs
                    </div>
                    <div className="justify-center text-center font-['Inter'] md:text-sm text-[10px] font-normal leading-tight text-gray-500">
                      Transkript AI allows you to create multiple AI-powered
                      voice assistants tailored to different business needs.
                      Each assistant can be fully customised, with options to
                      configure models, set prompts, adjust response
                      temperature, integrate knowledge bases, and even enable
                      emotion detection.{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-6 bg-gray-100 p-6 outline outline-1 outline-gray-200 md:flex-row">
                <Image
                  alt="feature1"
                  src={feature1}
                  className="relative w-full max-w-sm rounded-lg "
                />
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="justify-center text-center font-['Inter'] md:text-2xl text-sm font-medium leading-tight text-neutral-700">
                    AI-Powered Transcription, Summaries & Analysis
                  </div>
                  <div className="justify-center font-['Inter'] md:text-sm text-[10px] font-normal leading-tight text-gray-500">
                    Transkript AI enables seamless audio and video uploads for
                    fast, accurate transcriptions. Using advanced AI models, it
                    generates detailed summaries and insightful analyses,
                    helping you extract key information effortlessly. Whether
                    you&apos;re transcribing meetings, interviews, or customer
                    calls, Transkript AI ensures precision while providing
                    actionable insights to enhance decision-making and workflow
                    efficiency.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-col items-center justify-start overflow-hidden md:rounded-bl-[48px] bg-gray-100 pb-6 pt-8 outline outline-1 outline-gray-200">
                <Image
                    alt="feature1"
                    src={feature4}
                    className="w-[90%]  "
                  />
                  <div className="flex flex-col items-center justify-start gap-4 px-4">
                    <div className="justify-center self-stretch text-center font-['Inter'] md:text-2xl text-sm font-medium leading-tight text-neutral-700">
                      Seamless Phone Number Integration
                    </div>
                    <div className="justify-center text-center font-['Inter'] md:text-sm text-[10px] font-normal leading-tight text-gray-500">
                      Transkript AI allows you to add phone numbers from Twilio
                      or Vonage, enabling direct voice interactions with your AI
                      assistants. Easily connect numbers to your assistants,
                      making them capable of handling inbound and outbound
                      calls. This integration ensures a smooth and professional
                      communication experience, perfect for automating customer
                      support, managing inquiries, or streamlining business
                      operations.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start overflow-hidden md:rounded-br-[48px] bg-gray-100 pb-6 pt-8 outline outline-1 outline-gray-200">
                <Image
                    alt="feature1"
                    src={feature5}
                    className="w-[90%]  "
                  />
                  <div className="flex flex-col items-center justify-start gap-4 px-4">
                    <div className="justify-center self-stretch text-center font-['Inter'] md:text-2xl text-sm font-medium leading-tight text-neutral-700">
                      Enhanced Knowledge Base for Context-Aware Assistants
                    </div>
                    <div className="justify-center text-center font-['Inter'] md:text-sm text-[10px] font-normal leading-tight text-gray-500">
                      This feature improves contextual understanding, allowing
                      your AI to provide more accurate and relevant responses.
                      Whether it&apos;s FAQs, company policies, or technical
                      documentation, your assistants can reference uploaded
                      materials to deliver informed and precise interactions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default Features;
