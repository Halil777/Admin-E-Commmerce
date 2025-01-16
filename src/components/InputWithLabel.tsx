import React from "react";

const InputWithLabel = ({
  label,
  children,
  error,
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <label className="dark:text-whiteSecondary text-blackPrimary block text-base font-semibold mb-1 w-1/3 ">
        {label}
      </label>
      <div className="w-full">{children}</div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputWithLabel;
