import React from "react";

type Props = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  placeholder?: string;
  fontSx?: string;
};

const ProgressBar: React.FC<Props> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  color = "#4db8ff",
  trailColor = "#d9d9d9",
  placeholder,
  fontSx,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trailColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className={`${fontSx} text-center`}
        >
          {placeholder}
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;