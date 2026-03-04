"use client";

import {imgBlur7} from "./features-showcase-imgs";

interface UserData {
  id: string;
  avatarBg: string;
  circleFrom: string;
  circleTo: string;
  badgeFrom: string;
  badgeTo: string;
  avatarOpacity: number;
}

const users: UserData[] = [
  {
    avatarBg:
      'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.2197e-14 2.9 -2.9 1.7757e-16 18 7)"><stop stop-color="rgba(17,38,170,1)" offset="0"/><stop stop-color="rgba(24,62,181,1)" offset="0.125"/><stop stop-color="rgba(32,87,191,1)" offset="0.25"/><stop stop-color="rgba(47,137,213,1)" offset="0.5"/><stop stop-color="rgba(61,187,234,1)" offset="0.75"/><stop stop-color="rgba(76,237,255,1)" offset="1"/></radialGradient></defs></svg>\')',
    avatarOpacity: 0.9,
    badgeFrom: "#388EF8",
    badgeTo: "#90D7F6",
    circleFrom: "#9ae1fb",
    circleTo: "#fbf9f8",
    id: "blue",
  },
  {
    avatarBg:
      'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.2197e-14 2.9 -2.9 1.7757e-16 18 7)"><stop stop-color="rgba(73,17,170,1)" offset="0"/><stop stop-color="rgba(119,32,183,1)" offset="0.25"/><stop stop-color="rgba(164,47,196,1)" offset="0.5"/><stop stop-color="rgba(210,61,209,1)" offset="0.75"/><stop stop-color="rgba(255,76,222,1)" offset="1"/></radialGradient></defs></svg>\')',
    avatarOpacity: 0.9,
    badgeFrom: "#7538F8",
    badgeTo: "#F690EC",
    circleFrom: "#f69afb",
    circleTo: "#faf8fb",
    id: "purple",
  },
  {
    avatarBg:
      'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.2197e-14 2.9 -2.9 1.7757e-16 18 7)"><stop stop-color="rgba(17,170,60,1)" offset="0"/><stop stop-color="rgba(32,191,100,1)" offset="0.25"/><stop stop-color="rgba(47,213,140,1)" offset="0.5"/><stop stop-color="rgba(76,255,180,1)" offset="1"/></radialGradient></defs></svg>\')',
    avatarOpacity: 0.9,
    badgeFrom: "#38F85A",
    badgeTo: "#90F6A3",
    circleFrom: "#9afbb0",
    circleTo: "#f8fbf9",
    id: "green",
  },
  {
    avatarBg:
      'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.2197e-14 2.9 -2.9 1.7757e-16 18 7)"><stop stop-color="rgba(170,111,17,1)" offset="0"/><stop stop-color="rgba(191,138,32,1)" offset="0.25"/><stop stop-color="rgba(213,164,47,1)" offset="0.5"/><stop stop-color="rgba(255,216,76,1)" offset="1"/></radialGradient></defs></svg>\')',
    avatarOpacity: 0.8,
    badgeFrom: "#FDBB23",
    badgeTo: "#FECE30",
    circleFrom: "#fbe89a",
    circleTo: "#fbf9f8",
    id: "yellow",
  },
];

function UserRow({index, user}: {user: UserData; index: number}) {
  const gradientId = `vip-badge-${user.id}-${index}`;

  return (
    <div className="relative h-[36px] w-[144px] shrink-0">
      {/* Badge hexagon */}
      <div className="absolute top-[4px] left-[120px] size-[14px]">
        <div className="absolute top-[0.58px] left-[0.58px] size-[12.83px]">
          <div className="absolute inset-[2.81%_6.7%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 11.114 12.111"
            >
              <path
                d="M4.39 0.313C5.112 -0.104 6.002 -0.104 6.724 0.313L9.947 2.174C10.669 2.591 11.114 3.361 11.114 4.195V7.917C11.114 8.75 10.669 9.521 9.947 9.938L6.724 11.799C6.002 12.216 5.112 12.216 4.39 11.799L1.167 9.938C0.445 9.521 0 8.75 0 7.917V4.195C0 3.361 0.445 2.591 1.167 2.174L4.39 0.313Z"
                fill={`url(#${gradientId})`}
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id={gradientId}
                  x1="5.557"
                  x2="5.557"
                  y1="-0.361"
                  y2="12.472"
                >
                  <stop stopColor={user.badgeFrom} />
                  <stop offset="1" stopColor={user.badgeTo} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        {/* Lightning bolt */}
        <div className="absolute top-[3.5px] right-1/4 left-1/4 aspect-24/24 overflow-clip">
          <div className="absolute inset-[12.5%_26.55%_12.5%_26.56%]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 3.282 5.25"
            >
              <path
                d="M1.977 1.805V0.207C1.985 0.168 1.97 0.074 1.847 0.017C1.741 -0.033 1.624 0.041 1.589 0.089C1.057 0.94 0.063 2.729 0.024 2.819C-0.025 2.932 0.009 3.003 0.055 3.055C0.09 3.094 0.173 3.117 0.217 3.117H1.298L1.067 5.071C1.07 5.116 1.108 5.214 1.232 5.243C1.356 5.273 1.441 5.184 1.468 5.135L3.235 2.147C3.26 2.107 3.313 2.003 3.256 1.91C3.235 1.876 3.205 1.849 3.169 1.83C3.133 1.811 3.093 1.803 3.053 1.805H1.977Z"
                fill="var(--fill-0, white)"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Avatar */}
      <div
        className="absolute top-0 left-0 size-[36px] overflow-clip rounded-[244.8px]"
        style={{opacity: user.avatarOpacity}}
      >
        <div
          className="absolute top-0 left-0 size-[36px] rounded-[18px]"
          style={{backgroundImage: user.avatarBg}}
        />
        <div
          className="absolute top-[9px] left-[12px] size-[12px] rounded-[18px]"
          style={{
            background: `linear-gradient(to bottom, ${user.circleFrom}, ${user.circleTo})`,
          }}
        />
        <div
          className="absolute top-[23px] left-[6px] size-[24px] rounded-[18px]"
          style={{
            background: `linear-gradient(to bottom, ${user.circleFrom}, ${user.circleTo})`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_2px_0px_white]" />
      </div>
      {/* Placeholder bars */}
      <div className="absolute top-[6px] left-[44px] h-[10px] w-[72px] rounded-[4px] bg-default" />
      <div className="absolute top-[22px] left-[44px] h-[10px] w-[100px] rounded-[4px] bg-default" />
    </div>
  );
}

function VipMemberCard() {
  return (
    <div className="relative col-span-2 h-[288px] overflow-clip rounded-3xl border border-solid border-border">
      <p className="absolute top-[67px] left-1/2 -translate-x-1/2 text-center text-sm leading-[1.43] font-medium text-foreground">
        VIP member
      </p>
      <div className="absolute top-[39px] left-[126px] flex size-[12px] items-center justify-center">
        <div className="flex-none -scale-y-100 rotate-180">
          <div className="relative size-[12px]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 12"
            >
              <g id="mynaui:chat-solid" opacity="0.06">
                <path
                  d="M6 1.125C4.70707 1.125 3.46709 1.63861 2.55285 2.55285C1.63861 3.46709 1.125 4.70707 1.125 6C1.125 6.779 1.308 7.5165 1.634 8.171C1.686 8.276 1.691 8.4325 1.6315 8.676C1.59999 8.799 1.56329 8.92061 1.5215 9.0405L1.5065 9.0835C1.4695 9.1935 1.4295 9.3135 1.3995 9.425C1.2085 10.1385 1.8615 10.7915 2.5745 10.6005C2.6865 10.5705 2.806 10.5305 2.9165 10.4935L2.9595 10.4785C3.07939 10.4367 3.201 10.4 3.324 10.3685C3.5675 10.3085 3.724 10.3135 3.829 10.366C4.50331 10.702 5.24662 10.8763 6 10.875C8.6925 10.875 10.875 8.6925 10.875 6C10.875 3.3075 8.6925 1.125 6 1.125Z"
                  fill="var(--fill-0, #18181B)"
                  id="Vector"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute top-[91px] left-1/2 w-[256px] -translate-x-1/2 text-center text-xs leading-[1.34] font-normal whitespace-pre-wrap text-muted">
        Get high-priority support and an exclusive badge in our community.
      </p>
      <div className="absolute top-[23px] left-[143px] size-8 rounded-2xl bg-default" />
      <div
        className="absolute top-[18px] left-[174px] flex size-[16.203px] items-center justify-center"
        style={
          {
            "--transform-inner-height": "307",
            "--transform-inner-width": "1200",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[9.94deg]">
          <div className="relative size-[13.996px]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12.83 12.83"
            >
              <path
                d="M4.3891 0.31252C5.11084 -0.104173 6.00005 -0.104174 6.72179 0.31252L9.94455 2.17318C10.6663 2.58988 11.1109 3.35996 11.1109 4.19335V7.91467C11.1109 8.74806 10.6663 9.51814 9.94455 9.93483L6.72179 11.7955C6.00005 12.2122 5.11084 12.2122 4.3891 11.7955L1.16634 9.93483C0.444608 9.51814 0 8.74806 0 7.91467V4.19335C0 3.35996 0.444607 2.58988 1.16634 2.17318L4.3891 0.31252Z"
                fill="var(--fill-0, #EFEFEF)"
              />
            </svg>
            <div className="absolute top-[3.5px] right-[24.99%] left-[25.01%] aspect-24/24 overflow-clip opacity-30">
              <div className="absolute inset-[12.51%_26.55%_12.49%_26.56%]">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 3.281 5.249"
                >
                  <path
                    d="M1.977 1.805V0.207C1.985 0.168 1.97 0.074 1.847 0.017C1.741 -0.033 1.624 0.041 1.589 0.089C1.057 0.94 0.063 2.729 0.024 2.819C-0.025 2.932 0.009 3.003 0.055 3.055C0.09 3.094 0.173 3.117 0.217 3.117H1.298L1.067 5.071C1.07 5.116 1.108 5.214 1.232 5.243C1.356 5.273 1.441 5.184 1.468 5.135L3.234 2.147C3.26 2.107 3.313 2.003 3.256 1.91C3.235 1.876 3.205 1.849 3.169 1.83C3.133 1.811 3.093 1.803 3.053 1.805H1.977Z"
                    fill="var(--fill-0, #18181B)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* User list carousel */}
      <div className="absolute top-[139px] left-[87px] h-[136px] w-[144px] overflow-hidden">
        <div className="vip-member-carousel flex flex-col gap-2">
          {users.map((user, i) => (
            <UserRow key={`${user.id}-${i}`} index={i} user={user} />
          ))}
          {users.map((user, i) => (
            <UserRow key={`${user.id}-dup-${i}`} index={i + users.length} user={user} />
          ))}
        </div>
      </div>
      {/* Top blur overlay */}
      <div className="absolute top-[119px] left-1/2 h-[28px] w-[272px] -translate-x-1/2 rotate-180">
        <div
          className="absolute inset-0 bg-[rgba(245,245,245,0.7)] mask-intersect mask-alpha mask-size-[100%_100%] mask-no-clip mask-position-[0px_0px] mask-no-repeat backdrop-blur-[5px]"
          style={{maskImage: `url('${imgBlur7}')`}}
        />
      </div>
      {/* Bottom blur overlay */}
      <div className="absolute bottom-[-1px] left-1/2 h-[44px] w-[272px] -translate-x-1/2">
        <div
          className="absolute inset-0 bg-[rgba(245,245,245,0.7)] mask-intersect mask-alpha mask-size-[100%_100%] mask-no-clip mask-position-[0px_0px] mask-no-repeat backdrop-blur-[5px]"
          style={{maskImage: `url('${imgBlur7}')`}}
        />
      </div>
      {/* Discord icon */}
      <div className="absolute top-[31px] left-[151px] size-[16px] overflow-clip opacity-30">
        <div className="absolute top-0 bottom-0 left-1/2 aspect-24/24 -translate-x-1/2 overflow-clip">
          <div className="absolute inset-[16.67%_6.24%_16.65%_6.26%]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 13.9996 10.6694"
            >
              <path
                d="M11.8454 0.886667C10.9588 0.473333 9.99878 0.173333 8.99878 0C8.98119 0.00025047 8.96442 0.00743919 8.95211 0.0200001C8.83211 0.24 8.69211 0.526667 8.59878 0.746667C7.5381 0.586767 6.45945 0.586767 5.39878 0.746667C5.30544 0.52 5.16544 0.24 5.03878 0.0200001C5.03211 0.00666681 5.01211 0 4.99211 0C3.99211 0.173333 3.03878 0.473333 2.14544 0.886667C2.13878 0.886667 2.13211 0.893333 2.12544 0.9C0.312109 3.61333 -0.187891 6.25333 0.0587761 8.86667C0.0587761 8.88 0.0654427 8.89333 0.078776 8.9C1.27878 9.78 2.43211 10.3133 3.57211 10.6667C3.59211 10.6733 3.61211 10.6667 3.61878 10.6533C3.88544 10.2867 4.12544 9.9 4.33211 9.49333C4.34544 9.46667 4.33211 9.44 4.30544 9.43333C3.92544 9.28667 3.56544 9.11333 3.21211 8.91333C3.18544 8.9 3.18544 8.86 3.20544 8.84C3.27878 8.78667 3.35211 8.72667 3.42544 8.67333C3.43878 8.66 3.45878 8.66 3.47211 8.66667C5.76544 9.71333 8.23878 9.71333 10.5054 8.66667C10.5188 8.66 10.5388 8.66 10.5521 8.67333C10.6254 8.73333 10.6988 8.78667 10.7721 8.84667C10.7988 8.86667 10.7988 8.90667 10.7654 8.92C10.4188 9.12667 10.0521 9.29333 9.67211 9.44C9.64544 9.44667 9.63878 9.48 9.64544 9.5C9.85878 9.90667 10.0988 10.2933 10.3588 10.66C10.3788 10.6667 10.3988 10.6733 10.4188 10.6667C11.5654 10.3133 12.7188 9.78 13.9188 8.9C13.9321 8.89333 13.9388 8.88 13.9388 8.86667C14.2321 5.84667 13.4521 3.22667 11.8721 0.9C11.8654 0.893333 11.8588 0.886667 11.8454 0.886667ZM4.67878 7.27333C3.99211 7.27333 3.41878 6.64 3.41878 5.86C3.41878 5.08 3.97878 4.44667 4.67878 4.44667C5.38544 4.44667 5.94544 5.08667 5.93878 5.86C5.93878 6.64 5.37878 7.27333 4.67878 7.27333ZM9.32544 7.27333C8.63878 7.27333 8.06544 6.64 8.06544 5.86C8.06544 5.08 8.62544 4.44667 9.32544 4.44667C10.0321 4.44667 10.5921 5.08667 10.5854 5.86C10.5854 6.64 10.0321 7.27333 9.32544 7.27333Z"
                fill="var(--fill-0, #18181B)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VipMemberCard;
