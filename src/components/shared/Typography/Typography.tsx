import { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import "./Typography.scss";

type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "body3";

interface Props {
  variant?: TypographyVariants;
  color?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  weight?: "200" | "300" | "400" | "600" | "700";
  style?: CSSProperties;
  children: ReactNode;
}

export default function Typography({
  variant = "body1",
  color = "var(--text-color)",
  weight = "300",
  children,
  textTransform = "none",
}: Props) {
  return (
    <div
      className={cn(variant, "transform-" + textTransform)}
      style={{
        color: color ? color : "",
        fontWeight: weight,
      }}
    >
      {children}
    </div>
  );
}
