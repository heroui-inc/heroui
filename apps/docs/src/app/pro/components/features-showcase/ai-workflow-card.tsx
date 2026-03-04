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

          {/* Node Left 1: Sunburst */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.5s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="#DEDEE0"
                width="47"
                x="31.3867"
                y="4.0625"
              />
              <g clipPath="url(#clip2_2974_73793)">
                <path
                  d="M47.5956 31.1307L52.3166 28.382L52.3956 28.1424L52.3166 28.01H52.0858L51.2958 27.9596L48.5982 27.8839L46.2589 27.783L43.9925 27.657L43.4214 27.5308L42.8867 26.7995L42.9414 26.4338L43.4214 26.0998L44.108 26.1628L45.6269 26.2699L47.9054 26.4338L49.5582 26.5347L52.0067 26.7995H52.3956L52.4503 26.6356L52.3166 26.5347L52.2133 26.4338L49.8558 24.7757L47.3039 23.0231L45.9673 22.0143L45.2442 21.5036L44.8797 21.0246L44.7217 19.9781L45.3779 19.2278L46.2589 19.2909L46.4837 19.3539L47.3769 20.0663L49.2847 21.5984L51.7758 23.5022L52.1404 23.8174L52.2862 23.7102L52.3045 23.6346L52.1404 23.3508L50.7854 20.8102L49.3393 18.2253L48.6953 17.1536L48.5252 16.5106C48.4645 16.2457 48.4219 16.025 48.4219 15.7539L49.1693 14.7011L49.5823 14.5625L50.5789 14.7012L50.9982 15.0794L51.6178 16.5484L52.6204 18.8622L54.1758 22.0081L54.6315 22.9412L54.8745 23.8049L54.9657 24.0697H55.1237V23.9183L55.2512 22.1468L55.4882 19.9717L55.7191 17.1725L55.7982 16.3846L56.1748 15.4389L56.9221 14.9282L57.5054 15.2181L57.9854 15.9306L57.9186 16.3907L57.633 18.3137L57.0741 21.3273L56.7095 23.3447H56.9221L57.1652 23.0925L58.1495 21.737L59.8021 19.5934L60.5313 18.7424L61.3819 17.803L61.9288 17.3554H62.9617L63.7211 18.5281L63.3809 19.7385L62.3176 21.1381L61.4366 22.3233L60.1728 24.0886L59.3829 25.5008L59.4558 25.6143L59.6442 25.5954L62.4999 24.9649L64.0432 24.6749L65.8842 24.347L66.7167 24.7505L66.8077 25.1604L66.4796 25.9989L64.511 26.5032L62.2021 26.9823L58.7632 27.8272L58.7206 27.8587L58.7693 27.9217L60.3186 28.073L60.9809 28.1108H62.6032L65.6229 28.3441L66.4128 28.8863L66.8867 29.5483L66.8077 30.0526L65.5925 30.6957L63.9521 30.2922L60.1243 29.3465L58.8118 29.0061H58.6295V29.1196L59.7232 30.2291L61.7282 32.1079L64.2376 34.5288L64.3651 35.1278L64.0432 35.6005L63.7029 35.5501L61.4973 33.829L60.6467 33.0536L58.7206 31.3703H58.5931V31.5467L59.0366 32.2214L61.3819 35.878L61.5034 37.0001L61.3333 37.3659L60.7257 37.5865L60.0573 37.4604L58.6842 35.4619L57.2685 33.2111L56.1262 31.1937L55.9865 31.2757L55.3121 38.8096L54.9961 39.1941L54.2669 39.4841L53.6594 39.005L53.3373 38.2295L53.6593 36.6975L54.0482 34.6991L54.3642 33.1103L54.6497 31.137L54.8199 30.4814L54.8077 30.4372L54.668 30.4561L53.2341 32.4988L51.0528 35.5565L49.3272 37.473L48.9141 37.6432L48.1971 37.2586L48.2639 36.5715L48.6649 35.96L51.0527 32.8077L52.4927 30.8533L53.4224 29.7249L53.4163 29.5608H53.3617L47.0183 33.8354L45.8881 33.9866L45.402 33.5139L45.4628 32.7384L45.6937 32.4861L47.6015 31.1244L47.5956 31.1307Z"
                  fill="#18181B"
                />
              </g>
            </g>
          </g>

          {/* Node Left 2: VS Code like icon */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.6s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="#DEDEE0"
                width="47"
                x="7.38672"
                y="64.0625"
              />
              <g clipPath="url(#clip1_2974_73793)">
                <path
                  d="M42.4085 80.1899L31.4552 73.7184C31.1035 73.5105 30.6695 73.5105 30.3177 73.7184L19.3649 80.1899C19.0693 80.3646 18.8867 80.6877 18.8867 81.0377V94.0876C18.8867 94.4375 19.0693 94.7606 19.3649 94.9353L30.3183 101.407C30.67 101.615 31.104 101.615 31.4557 101.407L42.409 94.9353C42.7047 94.7606 42.8872 94.4375 42.8872 94.0876V81.0377C42.8872 80.6877 42.7047 80.3646 42.409 80.1899H42.4085ZM41.7205 81.5608L31.1467 100.303C31.0752 100.429 30.8865 100.378 30.8865 100.231V87.9591C30.8865 87.7139 30.7584 87.4871 30.5507 87.364L20.1656 81.2282C20.0422 81.155 20.0926 80.9619 20.2355 80.9619H41.3831C41.6835 80.9619 41.8711 81.295 41.721 81.5613H41.7205V81.5608Z"
                  fill="#18181B"
                />
              </g>
            </g>
          </g>

          {/* Node Left 3: Code Square */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.7s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="#DEDEE0"
                width="47"
                x="7.38672"
                y="124.062"
              />
              <g clipPath="url(#clip3_2974_73793)">
                <g mask="url(#mask0_2974_73793)">
                  <path
                    d="M42.0362 138.153L37.0913 135.772C36.812 135.638 36.4979 135.593 36.1923 135.645C35.8867 135.697 35.6048 135.843 35.3856 136.062L19.1974 150.822C19.0945 150.916 19.0123 151.03 18.9562 151.157C18.9 151.284 18.871 151.422 18.8711 151.561C18.8712 151.701 18.9003 151.838 18.9567 151.966C19.013 152.093 19.0953 152.207 19.1983 152.301L20.5207 153.503C20.6935 153.66 20.9157 153.751 21.1489 153.762C21.3821 153.772 21.6115 153.7 21.7975 153.559L41.2922 138.771C41.9462 138.275 42.8856 138.741 42.8856 139.562V139.504C42.8855 139.222 42.8058 138.945 42.6555 138.706C42.5053 138.467 42.2906 138.276 42.0362 138.153V138.153Z"
                    fill="#18181B"
                  />
                  <g filter="url(#filter1_d_2974_73793)">
                    <path
                      d="M42.0362 156.971L37.0913 159.352C36.812 159.486 36.4979 159.531 36.1923 159.479C35.8867 159.427 35.6048 159.281 35.3856 159.062L19.1974 144.302C19.0945 144.208 19.0123 144.094 18.9562 143.967C18.9 143.839 18.871 143.702 18.8711 143.563C18.8712 143.423 18.9003 143.286 18.9567 143.158C19.013 143.031 19.0953 142.917 19.1983 142.823L20.5207 141.621C20.6935 141.464 20.9157 141.373 21.1489 141.362C21.3821 141.352 21.6115 141.424 21.7975 141.565L41.2922 156.353C41.9462 156.849 42.8856 156.383 42.8856 155.562V155.62C42.8855 155.902 42.8058 156.179 42.6555 156.418C42.5053 156.657 42.2906 156.849 42.0362 156.971Z"
                      fill="#18181B"
                    />
                  </g>
                  <g filter="url(#filter2_d_2974_73793)">
                    <path
                      d="M37.0926 159.353C36.8133 159.487 36.499 159.531 36.1934 159.479C35.8878 159.427 35.6059 159.281 35.3867 159.062C35.9402 159.616 36.8867 159.224 36.8867 158.441V136.684C36.8867 135.901 35.9402 135.509 35.3867 136.062C35.6059 135.843 35.8878 135.697 36.1934 135.645C36.499 135.593 36.8133 135.637 37.0926 135.772L42.0366 138.15C42.2912 138.272 42.5061 138.464 42.6565 138.703C42.8069 138.942 42.8867 139.219 42.8867 139.501V155.623C42.8867 155.906 42.807 156.182 42.6566 156.422C42.5063 156.661 42.2915 156.853 42.0369 156.975L37.0926 159.353Z"
                      fill="#18181B"
                    />
                  </g>
                  <path
                    clipRule="evenodd"
                    d="M35.89 159.399C36.0809 159.474 36.2851 159.508 36.4899 159.5C36.6947 159.492 36.8957 159.442 37.0804 159.353L42.0217 156.976C42.2763 156.853 42.491 156.661 42.6413 156.422C42.7917 156.183 42.8714 155.906 42.8713 155.624V139.502C42.8713 139.22 42.7916 138.943 42.6413 138.704C42.491 138.465 42.2762 138.273 42.0217 138.15L37.0806 135.773C36.8014 135.638 36.4873 135.594 36.1818 135.646C35.8764 135.698 35.5946 135.844 35.3756 136.063L25.9163 144.693L21.796 141.565C21.6101 141.424 21.3808 141.353 21.1477 141.363C20.9146 141.373 20.6925 141.465 20.5199 141.622L19.1982 142.824C19.0952 142.918 19.013 143.032 18.9566 143.159C18.9003 143.287 18.8712 143.424 18.8711 143.563C18.871 143.703 18.9 143.84 18.9561 143.968C19.0123 144.095 19.0944 144.209 19.1972 144.303L22.7704 147.563L19.1972 150.823C19.0944 150.917 19.0123 151.031 18.9561 151.158C18.9 151.286 18.871 151.423 18.8711 151.563C18.8712 151.702 18.9003 151.839 18.9566 151.967C19.013 152.094 19.0952 152.208 19.1982 152.302L20.5199 153.504C20.6925 153.661 20.9146 153.753 21.1477 153.763C21.3808 153.773 21.6101 153.702 21.796 153.561L25.9163 150.433L35.3756 159.063C35.5219 159.21 35.6971 159.324 35.89 159.399ZM36.8747 142.115L29.6972 147.563L36.8747 153.011V142.115Z"
                    fill="url(#paint3_linear_2974_73793)"
                    fillRule="evenodd"
                    opacity="0.25"
                    style={{mixBlendMode: "overlay"}}
                  />
                </g>
              </g>
            </g>
          </g>

          {/* Node Left 4: Phone */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.8s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="#DEDEE0"
                width="47"
                x="31.3867"
                y="184.062"
              />
              <g clipPath="url(#clip4_2974_73793)">
                <g mask="url(#mask1_2974_73793)">
                  <g mask="url(#mask2_2974_73793)">
                    <path d="M59.3867 214.762H50.3867V205.162H59.3867V214.762Z" fill="#B8B8B8" />
                    <path
                      d="M59.3867 200.362H50.3867V214.762H59.3867V200.362ZM63.8867 219.562H45.8867V195.562H63.8867V219.562Z"
                      fill="#18181B"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* Middle Node: Squiggly Link */}
          <g
            className="ai-workflow-pop-in ai-workflow-node-origin"
            style={{animationDelay: "0.3s"}}
          >
            <g className="ai-workflow-node-origin">
              <rect
                fill="#EFEFEF"
                height="47"
                rx="11.5"
                stroke="#DEDEE0"
                width="47"
                x="151.387"
                y="94.0625"
              />
              <g clipPath="url(#clip0_2974_73793)">
                <path
                  clipRule="evenodd"
                  d="M179.191 106.296C178.627 105.747 177.872 105.44 177.085 105.44C176.299 105.44 175.543 105.747 174.979 106.296L163.749 117.309C163.561 117.492 163.309 117.594 163.047 117.594C162.785 117.594 162.533 117.492 162.345 117.309C162.253 117.219 162.18 117.112 162.13 116.994C162.08 116.876 162.055 116.749 162.055 116.621C162.055 116.492 162.08 116.365 162.13 116.247C162.18 116.129 162.253 116.022 162.345 115.932L173.576 104.919C174.515 104.005 175.774 103.493 177.085 103.493C178.396 103.493 179.655 104.005 180.594 104.919C181.138 105.448 181.549 106.097 181.793 106.815C182.037 107.533 182.108 108.298 181.999 109.049C182.759 108.941 183.535 109.009 184.265 109.247C184.995 109.486 185.66 109.889 186.21 110.426L186.268 110.484C186.728 110.931 187.094 111.466 187.343 112.058C187.593 112.649 187.722 113.284 187.722 113.926C187.722 114.567 187.593 115.202 187.343 115.794C187.094 116.385 186.728 116.92 186.268 117.367L176.111 127.327C176.08 127.357 176.056 127.392 176.039 127.432C176.023 127.471 176.014 127.514 176.014 127.556C176.014 127.599 176.023 127.641 176.039 127.681C176.056 127.72 176.08 127.756 176.111 127.786L178.197 129.832C178.289 129.921 178.362 130.028 178.412 130.147C178.462 130.265 178.488 130.392 178.488 130.52C178.488 130.649 178.462 130.776 178.412 130.894C178.362 131.012 178.289 131.119 178.197 131.209C178.009 131.391 177.757 131.493 177.495 131.493C177.233 131.493 176.981 131.391 176.793 131.209L174.707 129.163C174.493 128.955 174.322 128.705 174.205 128.429C174.089 128.153 174.028 127.856 174.028 127.557C174.028 127.257 174.089 126.961 174.205 126.685C174.322 126.409 174.493 126.159 174.707 125.95L184.864 115.989C185.14 115.721 185.36 115.4 185.509 115.045C185.659 114.69 185.736 114.309 185.736 113.924C185.736 113.539 185.659 113.158 185.509 112.804C185.36 112.449 185.14 112.128 184.864 111.859L184.806 111.802C184.243 111.254 183.488 110.947 182.703 110.947C181.917 110.946 181.162 111.252 180.598 111.799L172.231 120.005L172.228 120.007L172.114 120.121C171.926 120.304 171.674 120.406 171.412 120.406C171.149 120.406 170.897 120.304 170.709 120.121C170.617 120.031 170.544 119.924 170.494 119.806C170.444 119.688 170.419 119.561 170.419 119.432C170.419 119.304 170.444 119.177 170.494 119.059C170.544 118.94 170.617 118.833 170.709 118.744L179.194 110.422C179.47 110.153 179.688 109.832 179.837 109.478C179.986 109.123 180.063 108.743 180.063 108.358C180.062 107.974 179.985 107.593 179.835 107.239C179.686 106.884 179.467 106.564 179.191 106.296Z"
                  fill="#18181B"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M177.785 109.05C177.877 108.96 177.95 108.853 178 108.735C178.05 108.617 178.076 108.49 178.076 108.361C178.076 108.233 178.05 108.106 178 107.988C177.95 107.87 177.877 107.763 177.785 107.673C177.597 107.49 177.345 107.388 177.083 107.388C176.82 107.388 176.568 107.49 176.38 107.673L168.075 115.819C167.615 116.266 167.249 116.801 166.999 117.392C166.75 117.984 166.621 118.619 166.621 119.26C166.621 119.902 166.75 120.537 166.999 121.128C167.249 121.72 167.615 122.255 168.075 122.702C169.014 123.616 170.273 124.127 171.584 124.127C172.895 124.127 174.154 123.616 175.094 122.702L183.4 114.556C183.492 114.467 183.565 114.36 183.615 114.242C183.665 114.123 183.691 113.996 183.691 113.868C183.691 113.74 183.665 113.613 183.615 113.495C183.565 113.376 183.492 113.269 183.4 113.18C183.212 112.997 182.96 112.894 182.698 112.894C182.435 112.894 182.183 112.997 181.996 113.18L173.69 121.325C173.126 121.874 172.371 122.181 171.584 122.181C170.798 122.181 170.042 121.874 169.478 121.325C169.202 121.057 168.983 120.736 168.833 120.381C168.684 120.027 168.607 119.645 168.607 119.26C168.607 118.875 168.684 118.494 168.833 118.14C168.983 117.785 169.202 117.464 169.478 117.195L177.785 109.05Z"
                  fill="#18181B"
                  fillRule="evenodd"
                />
              </g>
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
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="34.8067"
              id="filter1_d_2974_73793"
              width="40.6836"
              x="10.5371"
              y="133.027"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4.167" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend
                in2="BackgroundImageFix"
                mode="overlay"
                result="effect1_dropShadow_2974_73793"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_2974_73793"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="40.544"
              id="filter2_d_2974_73793"
              width="24.168"
              x="27.0527"
              y="127.29"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4.167" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend
                in2="BackgroundImageFix"
                mode="overlay"
                result="effect1_dropShadow_2974_73793"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_2974_73793"
                mode="normal"
                result="shape"
              />
            </filter>

            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint3_linear_2974_73793"
              x1="30.8711"
              x2="30.8711"
              y1="135.625"
              y2="159.501"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <clipPath id="clip-main-logo">
              <rect height="64" rx="16" width="64" x="254.887" y="85.5625" />
            </clipPath>
            <clipPath id="clip0_2974_73793">
              <rect fill="white" height="28" transform="translate(160.887 103.562)" width="28" />
            </clipPath>
            <clipPath id="clip1_2974_73793">
              <rect fill="white" height="28" transform="translate(18.8867 73.5625)" width="24" />
            </clipPath>
            <clipPath id="clip2_2974_73793">
              <rect fill="white" height="25" transform="translate(42.8867 14.5625)" width="24" />
            </clipPath>
            <clipPath id="clip3_2974_73793">
              <rect fill="white" height="24" transform="translate(18.8867 135.562)" width="24" />
            </clipPath>
            <clipPath id="clip4_2974_73793">
              <rect fill="white" height="24" transform="translate(45.8867 195.562)" width="18" />
            </clipPath>

            <mask
              height="25"
              id="mask0_2974_73793"
              maskUnits="userSpaceOnUse"
              style={{maskType: "alpha"} as React.CSSProperties}
              width="25"
              x="18"
              y="135"
            >
              <path
                clipRule="evenodd"
                d="M35.9056 159.398C36.0965 159.473 36.3007 159.507 36.5055 159.499C36.7103 159.491 36.9113 159.441 37.096 159.352L42.0373 156.975C42.2918 156.852 42.5066 156.66 42.6568 156.421C42.8071 156.182 42.8868 155.905 42.8867 155.623V139.501C42.8867 139.219 42.807 138.942 42.6567 138.703C42.5064 138.464 42.2916 138.272 42.0371 138.149L37.0965 135.772C36.8172 135.637 36.5032 135.593 36.1977 135.645C35.8922 135.697 35.6105 135.843 35.3915 136.062L25.9319 144.692L21.8116 141.564C21.6257 141.423 21.3963 141.352 21.1632 141.362C20.93 141.372 20.7079 141.464 20.5353 141.621L19.2138 142.823C19.1109 142.917 19.0286 143.031 18.9723 143.158C18.9159 143.286 18.8868 143.423 18.8867 143.562C18.8866 143.702 18.9156 143.839 18.9717 143.967C19.0279 144.094 19.11 144.208 19.2129 144.302L22.786 147.562L19.2131 150.822C19.1103 150.916 19.0281 151.03 18.972 151.157C18.9158 151.285 18.8869 151.422 18.887 151.562C18.887 151.701 18.9162 151.838 18.9725 151.966C19.0288 152.093 19.1111 152.207 19.2141 152.301L20.5355 153.503C20.7081 153.66 20.9303 153.752 21.1634 153.762C21.3966 153.773 21.626 153.701 21.8118 153.56L25.9321 150.432L35.3915 159.062C35.5378 159.209 35.7127 159.323 35.9056 159.398ZM36.8903 142.114L29.7131 147.562L36.8905 153.01L36.8903 142.114Z"
                fill="white"
                fillRule="evenodd"
              />
            </mask>
            <mask
              height="25"
              id="mask1_2974_73793"
              maskUnits="userSpaceOnUse"
              style={{maskType: "luminance"} as React.CSSProperties}
              width="19"
              x="45"
              y="195"
            >
              <path d="M63.8867 195.562H45.8867V219.562H63.8867V195.562Z" fill="white" />
            </mask>
            <mask
              height="25"
              id="mask2_2974_73793"
              maskUnits="userSpaceOnUse"
              style={{maskType: "luminance"} as React.CSSProperties}
              width="19"
              x="45"
              y="195"
            >
              <path d="M63.8867 195.562H45.8867V219.562H63.8867V195.562Z" fill="white" />
            </mask>

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
