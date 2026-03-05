function AIWorkflowCard() {
  return (
    <div
      className="ai-workflow-card relative col-span-3 h-[400px] overflow-hidden rounded-3xl border border-solid border-border bg-background"
      data-name="Container"
    >
      <div className="flex flex-col items-center px-[62px] pt-[23px]">
        <p className="text-center text-[14px] leading-[1.43] font-medium text-foreground">
          Supercharge your AI workflow
        </p>
        <p className="max-w-[351px] text-center text-[12px] leading-[1.34] font-normal whitespace-pre-wrap text-muted">
          Build faster with our advanced Skills and MCPs. Give taste to your agents and build
          beautiful interfaces by default.
        </p>
      </div>
      <div className="ai-workflow-canvas relative mx-auto mt-7 w-full max-w-[420px] px-5">
        {/* Dot pattern background */}
        <svg
          className="absolute inset-0 block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 362 248"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            height="248"
            id="dots-mask"
            maskUnits="userSpaceOnUse"
            style={{maskType: "alpha"} as React.CSSProperties}
            width="362"
            x="0"
            y="0"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0H346C354.837 0 362 7.16344 362 16V232C362 240.837 354.837 248 346 248H16C7.16344 248 0 240.837 0 232V16Z"
              fill="url(#dots-radial)"
            />
          </mask>
          <g mask="url(#dots-mask)">
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0H346C354.837 0 362 7.16344 362 16V232C362 240.837 354.837 248 346 248H16C7.16344 248 0 240.837 0 232V16Z"
              fill="url(#dots-pattern)"
              fillOpacity="0.12"
            />
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(181 124) rotate(90) scale(166.759 243.414)"
              gradientUnits="userSpaceOnUse"
              id="dots-radial"
              r="1"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <pattern
              height="1"
              id="dots-pattern"
              patternTransform="matrix(8.4 0 0 8.4 0 0)"
              patternUnits="userSpaceOnUse"
              preserveAspectRatio="none"
              viewBox="0 0 14 14"
              width="1"
            >
              <rect fill="black" height="2" rx="1" width="2" />
            </pattern>
          </defs>
        </svg>
        <svg className="relative block h-auto w-full" fill="none" viewBox="-8 0 342 240">
          {/* Connection Paths and Animated Beams */}
          <g className="ai-workflow-fade-in" style={{animationDelay: "1.0s"}}>
            <path
              d="M54.4141 87.25C90.4728 104.035 111.808 110.386 151.567 117.447"
              stroke="#18181B"
              strokeLinecap="round"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M54.4141 87.25C90.4728 104.035 111.808 110.386 151.567 117.447"
              stroke="url(#beam-grad-1)"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M75.0039 47.9668C97.5668 78.753 114.836 93.3481 151.898 115.631"
              stroke="#18181B"
              strokeLinecap="round"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M75.0039 47.9668C97.5668 78.753 114.836 93.3481 151.898 115.631"
              stroke="url(#beam-grad-2)"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M54.3198 147.56C89.4014 133.02 110.68 127.013 151.283 119.658"
              stroke="#18181B"
              strokeLinecap="round"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M54.3198 147.56C89.4014 133.02 110.68 127.013 151.283 119.658"
              stroke="url(#beam-grad-3)"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M75.049 187.398C99.4121 155.484 116.194 141.564 151.167 122.517"
              stroke="#18181B"
              strokeLinecap="round"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M75.049 187.398C99.4121 155.484 116.194 141.564 151.167 122.517"
              stroke="url(#beam-grad-4)"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M197.887 117.062 L254.887 117.063"
              stroke="#18181B"
              strokeLinecap="round"
              strokeOpacity="0.1"
              strokeWidth="2"
            />
            <path
              d="M197.887 117.062 L254.887 117.063"
              stroke="url(#beam-grad-main)"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </g>

          {/* Node Left 1: Claude */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.5s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="white"
                width="47"
                x="31.3867"
                y="4.0625"
              />
              <image
                height="20"
                href="/images/pro/ai-workflow/claude-logo.svg"
                width="20"
                x="44.8867"
                y="17.5625"
              />
            </g>
          </g>

          {/* Node Left 2: Cursor */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.6s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="white"
                width="47"
                x="7.38672"
                y="64.0625"
              />
              <image
                height="20"
                href="/images/pro/ai-workflow/cursor-logo.svg"
                width="20"
                x="20.8867"
                y="77.5625"
              />
            </g>
          </g>

          {/* Node Left 3: VS Code */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.7s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="white"
                width="47"
                x="7.38672"
                y="124.062"
              />
              <image
                height="20"
                href="/images/pro/ai-workflow/vscode-logo.svg"
                width="20"
                x="20.8867"
                y="137.562"
              />
            </g>
          </g>

          {/* Node Left 4: OpenCode */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.8s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="white"
                width="47"
                x="31.3867"
                y="184.062"
              />
              <image
                height="20"
                href="/images/pro/ai-workflow/opencode-logo.svg"
                width="16"
                x="46.8867"
                y="197.562"
              />
            </g>
          </g>

          {/* Middle Node: MCP Logo */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.3s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="white"
                width="47"
                x="151.387"
                y="94.0625"
              />
              <image
                height="30"
                href="/images/pro/ai-workflow/mcp-icon.png"
                width="30"
                x="159.887"
                y="102.5625"
              />
            </g>
          </g>

          {/* Right Main Node: HeroUI Pro Logo */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.1s"}}
          >
            <g className="ai-workflow-node-origin">
              <image
                clipPath="url(#clip-main-logo)"
                height="64"
                href="/images/pro/ai-workflow/hero-pro-ai-logo.png"
                width="64"
                x="254.887"
                y="85.5625"
              />
            </g>
          </g>

          {/* Particles Flowing into Main Node */}
          <g className="ai-workflow-fade-in" style={{animationDelay: "1.5s"}}>
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="2"
              rx="1"
              style={{animationDelay: "0.0s"}}
              width="2"
              x="234.887"
              y="113.562"
            />
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="2"
              rx="1"
              style={{animationDelay: "0.3s"}}
              width="2"
              x="234.887"
              y="119.562"
            />
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="3"
              rx="1.5"
              style={{animationDelay: "0.6s"}}
              width="3"
              x="240.887"
              y="111.562"
            />
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="3"
              rx="1.5"
              style={{animationDelay: "0.9s"}}
              width="3"
              x="240.887"
              y="120.562"
            />
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="3"
              rx="1.5"
              style={{animationDelay: "1.2s"}}
              width="3"
              x="248.367"
              y="110"
            />
            <rect
              className="ai-workflow-particle"
              fill="#3983ef"
              height="3"
              rx="1.5"
              style={{animationDelay: "1.5s"}}
              width="3"
              x="248.367"
              y="122"
            />
          </g>

          {/* Definitions */}
          <defs>
            <clipPath id="clip-main-logo">
              <rect height="64" rx="16" width="64" x="254.887" y="85.5625" />
            </clipPath>

            {/* Animated Beam Gradients */}
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="beam-grad-1"
              x1="376"
              x2="410"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                calcMode="spline"
                dur="5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="376; -34"
              />
              <animate
                attributeName="x2"
                calcMode="spline"
                dur="5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="410; 0"
              />
              <stop offset="0%" stopColor="#3983ef" stopOpacity="0" />
              <stop offset="5%" stopColor="#3983ef" stopOpacity="1" />
              <stop offset="32.5%" stopColor="#69b6ea" stopOpacity="1" />
              <stop offset="100%" stopColor="#69b6ea" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="beam-grad-2"
              x1="376"
              x2="410"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                calcMode="spline"
                dur="6.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="376; -34"
              />
              <animate
                attributeName="x2"
                calcMode="spline"
                dur="6.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="410; 0"
              />
              <stop offset="0%" stopColor="#3983ef" stopOpacity="0" />
              <stop offset="5%" stopColor="#3983ef" stopOpacity="1" />
              <stop offset="32.5%" stopColor="#69b6ea" stopOpacity="1" />
              <stop offset="100%" stopColor="#69b6ea" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="beam-grad-3"
              x1="376"
              x2="410"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                calcMode="spline"
                dur="4.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="376; -34"
              />
              <animate
                attributeName="x2"
                calcMode="spline"
                dur="4.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="410; 0"
              />
              <stop offset="0%" stopColor="#3983ef" stopOpacity="0" />
              <stop offset="5%" stopColor="#3983ef" stopOpacity="1" />
              <stop offset="32.5%" stopColor="#69b6ea" stopOpacity="1" />
              <stop offset="100%" stopColor="#69b6ea" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="beam-grad-4"
              x1="376"
              x2="410"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                calcMode="spline"
                dur="5.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="376; -34"
              />
              <animate
                attributeName="x2"
                calcMode="spline"
                dur="5.5s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="410; 0"
              />
              <stop offset="0%" stopColor="#3983ef" stopOpacity="0" />
              <stop offset="5%" stopColor="#3983ef" stopOpacity="1" />
              <stop offset="32.5%" stopColor="#69b6ea" stopOpacity="1" />
              <stop offset="100%" stopColor="#69b6ea" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="beam-grad-main"
              x1="376"
              x2="410"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                calcMode="spline"
                dur="4s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="376; -34"
              />
              <animate
                attributeName="x2"
                calcMode="spline"
                dur="4s"
                keySplines="0.16 1 0.3 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="410; 0"
              />
              <stop offset="0%" stopColor="#3983ef" stopOpacity="0" />
              <stop offset="5%" stopColor="#3983ef" stopOpacity="1" />
              <stop offset="32.5%" stopColor="#69b6ea" stopOpacity="1" />
              <stop offset="100%" stopColor="#69b6ea" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default AIWorkflowCard;
