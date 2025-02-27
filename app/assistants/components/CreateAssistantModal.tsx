import React from "react";

const CreateAssistantModal = () => {
  return (
    <div className="inline-flex h-[701px] flex-col  gap-8 overflow-hidden rounded-bl-[20px] rounded-br-[20px] bg-white px-8 py-6 shadow-[0px_21px_35px_0px_rgba(0,0,0,0.05)]w-[400px]">
      <div className="flex h-[75px] flex-col items-start justify-start gap-2 self-stretch">
        <div className="self-stretch  text-base font-semibold text-gray-600">
          Choose a template
        </div>
        <div className="self-stretch  text-base font-normal leading-normal text-gray-500">
          Here&apos;s a few templates to get you started, or you can create your own
          template and use it to create a new assistant.
        </div>
      </div>
      <div className="flex h-[546px] flex-col items-start justify-start gap-6 self-stretch">
        <div className="flex h-[76px] flex-col items-start justify-start gap-2 self-stretch">
          <div className="inline-flex items-center justify-center gap-2">
            <div>
              <span className=" text-sm font-normal leading-[17.50px] text-[#272728]">
                Assistant’s name
              </span>
              <span className=" text-sm font-normal leading-[17.50px] text-[#ef5a3c]">
                *
              </span>
            </div>
            <div className=" text-xs font-normal leading-[15px] text-[#808080]">
              You can change this later
            </div>
          </div>
          <div className="inline-flex h-[50px] items-center justify-start gap-[19.38px] self-stretch rounded-xl border border-gray-200 bg-neutral-50 px-[20.52px] py-5">
            <div className="shrink grow basis-0  text-sm font-normal leading-[17.50px] text-gray-700 opacity-50">
              Enter preferred name
            </div>
          </div>
        </div>
        <div data-svg-wrapper>
          <svg
            width="484"
            height="2"
            viewBox="0 0 484 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H484" stroke="#E9EAF4" stroke-width="0.5" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-5 self-stretch">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 border-[#ef5a3c] bg-[#ef5a3c]/5 p-6">
            <div data-svg-wrapper>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_309_207)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 0C4.43169 0 3.88663 0.225764 3.48477 0.627629C3.08291 1.02949 2.85714 1.57454 2.85714 2.14286V9.55526C3.34629 9.16313 3.9672 8.92857 4.6429 8.92857C6.22086 8.92857 7.50004 10.2078 7.50004 11.7857V12.5H8.21433C9.79229 12.5 11.0715 13.7792 11.0715 15.3571C11.0715 16.9351 9.79229 18.2143 8.21433 18.2143H7.50004V18.9286C7.50004 19.3074 7.42629 19.6691 7.29236 20H17.8571C18.4254 20 18.9706 19.7743 19.3724 19.3724C19.7743 18.9706 20 18.4254 20 17.8571V6.42857C20 6.23913 19.9247 6.05744 19.7909 5.9235L14.0765 0.20921C13.9425 0.0752549 13.7609 0 13.5714 0H5ZM5.71429 11.7857C5.71429 11.194 5.23459 10.7143 4.64286 10.7143C4.05113 10.7143 3.57143 11.194 3.57143 11.7857V14.2857H1.07143C0.479694 14.2857 0 14.7654 0 15.3571C0 15.9489 0.479694 16.4286 1.07143 16.4286H3.57143V18.9286C3.57143 19.5203 4.05113 20 4.64286 20C5.23459 20 5.71429 19.5203 5.71429 18.9286V16.4286H8.21429C8.80601 16.4286 9.28571 15.9489 9.28571 15.3571C9.28571 14.7654 8.80601 14.2857 8.21429 14.2857H5.71429V11.7857Z"
                    fill="#EF5A3C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_309_207">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="self-stretch  text-base font-semibold text-[#ef5a3c]">
                Blank Template
              </div>
              <div className="self-stretch  text-xs font-normal leading-[15px] text-[#c69389]">
                This blank slate template with minimal configurations. It's a
                starting point for creating your custom assistant.
              </div>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
            <div data-svg-wrapper className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_309_254)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.99693 0.0661637C11.4919 0.0653144 12.9677 0.40188 14.3144 1.05078C15.6613 1.6997 16.8443 2.64425 17.7752 3.81401C18.7062 4.98377 19.361 6.34857 19.6912 7.80667C20.0212 9.26478 20.0179 10.7786 19.6814 12.2352C19.345 13.6919 18.6842 15.0538 17.7482 16.2195C16.8122 17.3852 15.625 18.3245 14.2754 18.9677C12.9257 19.6107 11.4484 19.9408 9.9534 19.9334C8.53781 19.9264 7.14101 19.617 5.85627 19.0268L0.904869 19.9221C0.651891 19.9678 0.393845 19.8741 0.229199 19.6767C0.0645521 19.4792 0.0187063 19.2085 0.109155 18.968L1.52948 15.1891C0.657558 13.7658 0.157242 12.1438 0.0776133 10.4726C-0.00790511 8.67778 0.395008 6.89337 1.24344 5.30942C2.09187 3.72548 3.35404 2.40132 4.89553 1.478C6.43694 0.554691 8.20014 0.0667624 9.99693 0.0661637ZM9.45577 6.34975C9.71554 6.24215 10.0014 6.214 10.2772 6.26885C10.5529 6.32371 10.8063 6.45911 11.0051 6.65792C11.2039 6.85675 11.3393 7.11007 11.3942 7.38585C11.449 7.66162 11.4209 7.94748 11.3133 8.20725C11.2057 8.46702 11.0234 8.68907 10.7897 8.84528C10.5559 9.0015 10.281 9.08488 9.99981 9.08488C9.5067 9.08488 9.10696 9.48462 9.10696 9.97774V11.5208C9.10696 12.0139 9.5067 12.4136 9.99981 12.4136C10.4929 12.4136 10.8927 12.0139 10.8927 11.5208V10.7438C11.2068 10.6528 11.5069 10.5137 11.7817 10.3301C12.3092 9.97761 12.7203 9.4767 12.9631 8.89062C13.2058 8.30454 13.2693 7.65965 13.1456 7.03747C13.0218 6.4153 12.7163 5.8438 12.2678 5.39524C11.8192 4.94668 11.2477 4.64121 10.6255 4.51744C10.0034 4.39368 9.35847 4.45721 8.7724 4.69997C8.18633 4.94272 7.6854 5.35382 7.33297 5.88128C6.98054 6.40872 6.79243 7.02884 6.79243 7.66321C6.79243 8.15631 7.19217 8.55607 7.68528 8.55607C8.1784 8.55607 8.57814 8.15631 8.57814 7.66321C8.57814 7.38202 8.66153 7.10715 8.81774 6.87337C8.97396 6.63957 9.19598 6.45735 9.45577 6.34975ZM9.99986 16.2711C9.29504 16.2695 8.72416 15.6977 8.72416 14.9925C8.72416 14.2864 9.29661 13.7139 10.0028 13.7139C10.0037 13.7139 10.0047 13.7139 10.0057 13.7139C10.7105 13.7155 11.2814 14.2874 11.2814 14.9925C11.2814 15.6987 10.7089 16.2711 10.0027 16.2711C10.0018 16.2711 10.0008 16.2711 9.99986 16.2711Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_309_254">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="self-stretch  text-base font-semibold text-gray-600">
                Inbound Q & A
              </div>
              <div className="self-stretch  text-xs font-normal leading-[15px] text-[#808080]">
                An inbound call agent example designed to provide comprehensive
                support for SmartHome Innovations.{" "}
              </div>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
            <div data-svg-wrapper className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_309_242)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.9808 2.14359C9.38323 2.13287 8.78944 2.24017 8.23341 2.45934C7.6774 2.67851 7.1701 3.00524 6.74057 3.42081C6.31104 3.83639 5.96773 4.33261 5.73031 4.8811C5.49391 5.42723 5.36714 6.01446 5.35714 6.60943V7.14286V10.358V12.8571C5.35714 13.6461 4.71754 14.2857 3.92857 14.2857H2.14286C0.95939 14.2857 0 13.3263 0 12.1429V9.28571C0 8.10224 0.95939 7.14286 2.14286 7.14286H3.21429V6.6009V6.58471C3.22757 5.70526 3.41439 4.83704 3.76379 4.02986C4.11319 3.22267 4.61844 2.49236 5.25057 1.88077C5.8827 1.26917 6.62931 0.788327 7.4476 0.465776C8.25993 0.145573 9.12706 -0.0123846 10 0.000757588C10.8729 -0.0123846 11.7401 0.145573 12.5524 0.465776C13.3707 0.788327 14.1173 1.26917 14.7494 1.88077C15.3816 2.49236 15.8869 3.22267 16.2361 4.02986C16.5856 4.83704 16.7723 5.70526 16.7856 6.58471L16.7859 6.6009L16.7857 7.14286H17.8571C19.0406 7.14286 20 8.10224 20 9.28571V12.1429C20 13.3263 19.0406 14.2857 17.8571 14.2857H16.7857V15C16.7857 16.0419 16.3719 17.0411 15.635 17.7779C15.0031 18.4097 14.1783 18.8041 13.2989 18.9037C12.9321 19.5579 12.232 20 11.4286 20H9.28571C8.10224 20 7.14286 19.0406 7.14286 17.8571C7.14286 16.6737 8.10224 15.7143 9.28571 15.7143H11.4286C12.2028 15.7143 12.8811 16.1249 13.2577 16.7403C13.5816 16.6657 13.881 16.5014 14.1198 16.2627C14.4547 15.9279 14.6429 15.4736 14.6429 15V6.60944C14.6329 6.01447 14.5061 5.42723 14.2697 4.8811C14.0323 4.33261 13.689 3.83639 13.2594 3.42081C12.8299 3.00524 12.3226 2.67851 11.7666 2.45934C11.2106 2.24017 10.6168 2.13287 10.0192 2.14359C10.0064 2.14381 9.9936 2.14381 9.9808 2.14359Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_309_242">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="self-stretch  text-base font-semibold text-gray-600">
                Customer Support
              </div>
              <div className="self-stretch  text-xs font-normal leading-[15px] text-[#808080]">
                A versatile template designed with a perfect mix of emotional
                intelligence and technical knowledge.
              </div>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
            <div data-svg-wrapper className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_309_258)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 2.79548C0 1.64611 0.931756 0.714355 2.08113 0.714355H17.9189C19.0683 0.714355 20 1.64611 20 2.79548V13.6332C20 14.7826 19.0683 15.7144 17.9189 15.7144H12.1671L12.9316 17.8506H14.2857C14.8774 17.8506 15.3571 18.3304 15.3571 18.9221C15.3571 19.5138 14.8774 19.9935 14.2857 19.9935H5.71426C5.12253 19.9935 4.64283 19.5138 4.64283 18.9221C4.64283 18.3304 5.12253 17.8506 5.71426 17.8506H7.06837L7.83294 15.7144H2.08113C0.931757 15.7144 0 14.7826 0 13.6332V2.79548ZM2.94861 7.90054C2.94861 7.40744 3.34836 7.00768 3.84147 7.00768H5.09147V5.75768C5.09147 5.26458 5.49121 4.86483 5.98433 4.86483C6.47743 4.86483 6.87719 5.26458 6.87719 5.75768V7.00768H8.12719C8.62029 7.00768 9.02004 7.40744 9.02004 7.90054C9.02004 8.39366 8.62029 8.7934 8.12719 8.7934H6.87719V10.0434C6.87719 10.5365 6.47743 10.9363 5.98433 10.9363C5.49121 10.9363 5.09147 10.5365 5.09147 10.0434V8.7934H3.84147C3.34836 8.7934 2.94861 8.39366 2.94861 7.90054ZM14.4369 6.50764C14.4369 7.198 14.9966 7.75764 15.6869 7.75764C16.3773 7.75764 16.9369 7.198 16.9369 6.50764C16.9369 5.81728 16.3773 5.25764 15.6869 5.25764C14.9966 5.25764 14.4369 5.81728 14.4369 6.50764ZM11.6636 9.29346C11.6636 9.98381 12.2233 10.5435 12.9136 10.5435C13.604 10.5435 14.1636 9.98381 14.1636 9.29346C14.1636 8.6031 13.604 8.04346 12.9136 8.04346C12.2233 8.04346 11.6636 8.6031 11.6636 9.29346Z"
                    fill="#808080"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_309_258">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="self-stretch  text-base font-semibold text-gray-600">
                Game NPC
              </div>
              <div className="self-stretch  text-xs font-normal leading-[15px] text-[#808080]">
                An assistant for demonstrating an in-game NPC, Elenya is
                designed to offer guidance, lore, and insights.
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-end gap-2 self-stretch">
          <div className="  rounded-xl ">
            
            <div className="text-center  text-base font-medium leading-[14.40px] text-[#131313] h-11 w-[84px] rounded-xl border border-[#dedede] flex items-center justify-center">
              Close
            </div>
          </div>
          <div className="flex items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3">
            <div className="text-center  text-base font-medium leading-[14.40px] text-white">
              Create Assistant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssistantModal;
