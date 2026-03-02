"use client";

import {Button} from "@heroui/react";

function DarkMembershipCard() {
  return (
    <div className="relative mx-auto h-[452px] w-[302px]">
      <div className="absolute top-0 left-0 h-[452px] w-[302px] rounded-[20px] bg-gradient-to-b from-[#313131] to-[#1e1e1e]" />
      <div className="absolute top-[10px] left-[10px] h-[432px] w-[282px] rounded-[10px] border border-solid border-[rgba(255,255,255,0.1)]" />
      <div className="font-heading absolute top-[218px] left-[151px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center text-[32px] leading-[0] font-semibold whitespace-nowrap text-white not-italic">
        <p className="leading-[normal]">Junior Garcia</p>
      </div>
      <div className="font-heading absolute top-[244px] left-[151.5px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center text-[12px] leading-[0] font-medium whitespace-nowrap text-white not-italic opacity-30">
        <p className="leading-[normal]">Early access</p>
      </div>
      <p className="font-heading absolute top-[380px] left-[40px] text-[10px] leading-[normal] font-medium text-white not-italic opacity-30">
        Joined
      </p>
      <p className="font-heading absolute top-[380px] left-[262px] -translate-x-full text-right text-[10px] leading-[normal] font-medium text-white not-italic opacity-30">
        Member
      </p>
      <p className="font-heading absolute top-[396px] left-[40px] text-[16px] leading-[normal] font-medium text-white not-italic opacity-40">
        6 Feb 2026
      </p>
      <p className="font-heading absolute top-[396px] left-[262px] flex -translate-x-full gap-1 text-right text-[16px] leading-[0] font-semibold text-white not-italic opacity-40">
        <span className="leading-[normal] text-[rgba(255,255,255,0.5)]">#</span>
        <span className="leading-[normal]">{` 0046`}</span>
      </p>
      <div
        className="absolute top-[32px] left-[122px] h-[18px] w-[59px] opacity-40"
        data-name="brand-white"
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 59 18"
        >
          <g id="Vector">
            <path
              d="M0 4.48895V9.86707C0 10.1213 0.130846 10.3575 0.346116 10.4919L4.01793 12.7849C4.50724 13.0904 5.14101 12.7378 5.14101 12.16V7.63928C5.14101 7.37918 5.27794 7.13839 5.50123 7.00584L7.74101 5.6762V17.2626C7.74101 17.8385 8.37097 18.1914 8.86042 17.8897L12.6502 15.554C12.8676 15.42 13 15.1826 13 14.9268V3.80059C13 3.22754 12.3755 2.87418 11.8859 3.17019L7.74101 5.6762V0.737354C7.74101 0.165856 7.11958 -0.187724 6.62992 0.105171L0.358114 3.85676C0.136019 3.98961 0 4.22973 0 4.48895Z"
              fill="var(--fill-0, #FCFCFC)"
            />
            <path
              d="M26.8942 9.87989C26.8942 8.35475 26.2693 7.65084 25.0195 7.65084C23.5882 7.65084 22.5803 8.60894 22.5803 10.7598V15.6872H20V2H22.5803V7.00559C23.2052 5.98883 24.2333 5.48045 25.6444 5.48045C28.0433 5.48045 29.4544 6.94693 29.4544 9.41061V15.6872H26.8942V9.87989Z"
              fill="var(--fill-0, #FCFCFC)"
            />
            <path
              d="M35.8407 16C32.6355 16 30.5995 13.9274 30.5995 10.7402C30.5995 7.59218 32.6153 5.48045 35.8407 5.48045C39.3281 5.48045 41.223 7.94413 40.6989 11.405H33.1797C33.3209 13.0475 34.2885 13.986 35.8407 13.986C37.1107 13.986 37.8767 13.3408 38.0783 12.6955H40.6384C40.2352 14.6117 38.4613 16 35.8407 16ZM33.2402 9.70391H38.1992C38.1791 8.35475 37.2921 7.43575 35.7802 7.43575C34.4296 7.43575 33.4821 8.21788 33.2402 9.70391Z"
              fill="var(--fill-0, #FCFCFC)"
            />
            <path
              d="M42.106 8.29609C42.106 6.67318 43.0132 5.7933 44.7468 5.7933H48.0528V7.90503H44.6863V15.6872H42.106V8.29609Z"
              fill="var(--fill-0, #FCFCFC)"
            />
            <path
              d="M53.6983 16C50.4326 16 48.3563 13.9078 48.3563 10.7402C48.3563 7.57263 50.4326 5.48045 53.6983 5.48045C56.9237 5.48045 59 7.57263 59 10.7402C59 13.9078 56.9237 16 53.6983 16ZM53.6983 13.8687C55.311 13.8687 56.3794 12.6369 56.3794 10.7402C56.3794 8.84358 55.311 7.59218 53.6983 7.59218C52.0655 7.59218 50.9971 8.84358 50.9971 10.7402C50.9971 12.6369 52.0655 13.8687 53.6983 13.8687Z"
              fill="var(--fill-0, #FCFCFC)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClaimButton() {
  return (
    <Button className="mx-auto rounded-full bg-white text-foreground shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.06),0px_0px_1px_0px_rgba(0,0,0,0.06)]">
      Claim yours
    </Button>
  );
}

export {DarkMembershipCard, ClaimButton};
