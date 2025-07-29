import React from "react";
import styles from "@/styles/row.module.css";

interface ColProps {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
}

const Col: React.FC<ColProps> = ({ sm, md, lg, xl, children }) => {
  const classNames = [
    styles.col,
    sm ? styles[`sm-${sm}`] : "",
    md ? styles[`md-${md}`] : "",
    lg ? styles[`lg-${lg}`] : "",
    xl ? styles[`xl-${xl}`] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classNames}>{children}</div>;
};

export default Col;
