interface HeroUIPlainProps {
  className?: string;
  size?: number;
  height?: number;
  width?: number;
}

export function HeroUIPlainLogo({className, height, size = 26, width}: HeroUIPlainProps) {
  // Calculate dimensions based on original aspect ratio (140:44)
  const aspectRatio = 114 / 158;
  const svgHeight = height || size;
  const svgWidth = width || Math.round(svgHeight * aspectRatio);

  return (
    <>
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        height={svgHeight}
        viewBox="0 0 114 158"
        width={svgWidth}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 39.403v47.208a6.467 6.467 0 0 0 3.035 5.485l32.2 20.127c4.29 2.682 9.848-.413 9.848-5.485V67.056c0-2.283 1.2-4.397 3.159-5.56l19.64-11.672v101.703c0 5.055 5.525 8.153 9.817 5.505l33.234-20.503a6.467 6.467 0 0 0 3.067-5.505V33.361c0-5.03-5.476-8.132-9.769-5.534L67.883 49.824V6.473c0-5.016-5.45-8.12-9.744-5.549L3.14 33.853A6.467 6.467 0 0 0 0 39.404Z"
          fill="currentColor"
        />
      </svg>
      <span
        className="sr-only"
        style={{
          borderWidth: 0,
          clip: "rect(0, 0, 0, 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0",
          position: "absolute",
          whiteSpace: "nowrap",
          width: "1px",
        }}
      >
        HeroUI Logo
      </span>
    </>
  );
}
