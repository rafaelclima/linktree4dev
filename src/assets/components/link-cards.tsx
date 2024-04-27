import { CSSProperties, ReactNode } from "react";

interface LinkCardProps {
  children: ReactNode;
  additionalClasses?: string;
  style?: CSSProperties;
}

export function LinkCards({
  children,
  additionalClasses,
  style,
}: LinkCardProps) {
  const classNames = `w-full font-poppins py-2 px-2 rounded-lg select-none ${additionalClasses}`;

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}
