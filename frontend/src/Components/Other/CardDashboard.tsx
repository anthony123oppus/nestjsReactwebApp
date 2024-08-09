import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  to : string
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDashboard: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  to,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <Link to={to} id="cardDash" className=" flex justify-between rounded-sm border border-stroke bg-white pt-6 pb-5 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col gap-4">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {children}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>

      <div className="mt-4 flex flex-col items-end justify-between gap-3">
        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
        <div>
          <h4 className="text-title-xl2 font-semibold text-black dark:text-white">
            {total}
          </h4>
        </div>

      </div>
    </Link>
  );
};

export default CardDashboard;
