import React from "react";

interface headerProps {
  headerIcon: JSX.Element;
  title: string;
  description: string;
}

const ComponentsHeader: React.FC<headerProps> = ({
  headerIcon,
  title,
  description,
}) => {
  return (
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold leading-6 text-gray-900 flex gap-2">
          {headerIcon}
          {title}
        </h1>
        <p className="mt-2 text-sm text-indigo-700">{description}</p>
      </div>
  );
};

export default ComponentsHeader;
