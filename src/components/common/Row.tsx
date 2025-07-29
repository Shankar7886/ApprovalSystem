import React from "react";
import styles from "@/styles/Row.module.css";

interface RowProps {
  children: React.ReactNode;
  className?: string;
}

const Row: React.FC<RowProps> = ({ children, className }) => {
  return <div className={`${styles.row} ${className}`}>{children}</div>;
};

export default Row;
