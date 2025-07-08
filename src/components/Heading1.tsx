import { JSX } from "react";
import { twMerge } from "tailwind-merge";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  label: string,
  customStyle?: string;
};

const baseStyles = {
  1: "text-4xl font-bold",
  2: "text-3xl font-semibold",
  3: "text-2xl font-semibold",
  4: "text-xl font-medium",
  5: "text-lg font-medium",
  6: "text-base font-medium",
};

function Heading({ level = 1, label, customStyle = "" }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={twMerge(`${baseStyles[level]} text-neutral-900 font-sans`,customStyle)}>
      {label}
    </Tag>
  );
}

export default Heading;
