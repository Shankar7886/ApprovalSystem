import React, { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-[#eaeaec] rounded p-2 w-full  shadow-inner relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        <div className="relative">{/* Add icons/buttons here if needed */}</div>
      </div>

      <div className="bg-white rounded p-18 shadow-lg">{children}</div>
    </div>
  );
};

export default Card;
