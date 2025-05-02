import React from "react";
import { FaGift } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { GiCrystalShine } from "react-icons/gi";

const Pricing = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto h-full w-[80%] pb-20 pt-12">
          <div className="inline-flex w-full flex-col items-center justify-start gap-6 overflow-hidden">
            <div className="h-20 justify-center self-stretch text-center font-[&quot;Inter&quot;] text-5xl font-normal leading-[61.60px] text-gray-800">
              Pricing options
            </div>
            <div className="w-full justify-center text-center font-[&quot;Inter&quot;] text-base font-normal leading-normal text-gray-500">
              Choose a plan that fits your business needs. With flexible pricing
              options, Transkript AI makes advanced communication tools
              accessible for teams of all sizes.
            </div>
          </div>
        </div>
        <div className="mx-auto w-[90%] grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          {/* Trial Card */}
          <div className="flex flex-col rounded-xl shadow-md overflow-hidden">
            <div className="bg-stone-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaGift className="text-blue-600 text-xl" />
                <div className="font-outfit text-xl font-semibold leading-relaxed text-gray-800">
                  Trial
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-outfit text-4xl font-semibold leading-10 text-gray-800">
                  $0
                </div>
                <div className="font-outfit text-xs font-normal leading-none text-gray-800">
                  / 7 days
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-6 bg-slate-50">
              <div className="font-outfit text-lg font-semibold leading-relaxed text-gray-800 mb-4">
                What&apos;s included?
              </div>
              
              {/* Feature list */}
              <div className="flex flex-col space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Dialer
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Call Broadcast
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Messaging
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Agent access
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Phonebook limit: 1000
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-3.5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Device limit: 1
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Plan duration: 7 days
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Is trial?
                  </div>
                </div>
              </div>
              
              {/* Button */}
              <button className="mt-6 w-full h-11 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                <div className="font-outfit text-base font-normal capitalize leading-relaxed">
                  Get started
                </div>
              </button>
            </div>
          </div>
          
          {/* Gold Card */}
          <div className="flex flex-col rounded-xl shadow-md overflow-hidden">
            <div className="bg-amber-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaCrown className="text-amber-500 text-xl" />
                <div className="font-outfit text-xl font-semibold leading-relaxed text-gray-800">
                  Gold
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-outfit text-4xl font-semibold leading-10 text-gray-800">
                  $49
                </div>
                <div className="font-outfit text-xs font-normal leading-none text-gray-800">
                  / month
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-6 bg-slate-50">
              <div className="font-outfit text-lg font-semibold leading-relaxed text-gray-800 mb-4">
                What&apos;s included?
              </div>
              
              {/* Feature list */}
              <div className="flex flex-col space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Dialer
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Call Broadcast
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Messaging
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Agent access
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Phonebook limit: 5000
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-3.5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Device limit: 5
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Plan duration: 30 days
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-red-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Is trial?
                  </div>
                </div>
              </div>
              
              {/* Button */}
              <button className="mt-6 w-full h-11 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <div className="font-outfit text-base font-normal capitalize leading-relaxed">
                  Subscribe
                </div>
              </button>
            </div>
          </div>
          
          {/* Platinum Card */}
          <div className="flex flex-col rounded-xl shadow-md overflow-hidden">
            <div className="bg-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <GiCrystalShine className="text-purple-600 text-xl" />
                <div className="font-outfit text-xl font-semibold leading-relaxed text-gray-800">
                  Platinum
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-outfit text-4xl font-semibold leading-10 text-gray-800">
                  $99
                </div>
                <div className="font-outfit text-xs font-normal leading-none text-gray-800">
                  / month
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-6 bg-slate-50">
              <div className="font-outfit text-lg font-semibold leading-relaxed text-gray-800 mb-4">
                What&apos;s included?
              </div>
              
              {/* Feature list */}
              <div className="flex flex-col space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Dialer
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Call Broadcast
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Messaging
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Agent access
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Phonebook limit: Unlimited
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-3.5 w-3.5 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Device limit: Unlimited
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-800 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Plan duration: 30 days
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-4 w-4 bg-red-600 rounded-sm"></div>
                  </div>
                  <div className="font-outfit text-sm font-normal leading-snug text-gray-800">
                    Is trial?
                  </div>
                </div>
              </div>
              
              {/* Button */}
              <button className="mt-6 w-full h-11 rounded-xl bg-purple-700 flex items-center justify-center text-white">
                <div className="font-outfit text-base font-normal capitalize leading-relaxed">
                  Go Premium
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
