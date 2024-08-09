/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLink";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GiSkills } from "react-icons/gi";
import { CgProductHunt } from "react-icons/cg";
import { FaUserShield } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

import { logo } from "../../util/Image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col w-full justify-center items-center gap-4 py-5.5 lg:py-6.5">
        <img src={logo} alt="onwerlogo" className="h-24 w-24 md:flex hidden" />
        <NavLink to="/dashboard">
          <h2 className="font-semibold text-white text-3xl text-center font-work-sans">
            Administrator
          </h2>
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear font-work-sans">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu dashboard --> */}
              <li>
                <NavLink
                  to="/dashboard"
                  // className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  //   pathname.includes('dashboard') &&
                  //   'bg-graydark dark:bg-meta-4'
                  // }`}

                  // simple way to active navbar
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive ? "bg-graydark dark:bg-meta-4" : ""
                    }`
                  }
                >
                  <TbLayoutDashboardFilled className="text-xl" />
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu dashboard --> */}

              {/* <!-- Menu Project --> */}
              <li>
                <NavLink
                  to="/project"
                  // className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  //   pathname.includes('product') &&
                  //   'bg-graydark dark:bg-meta-4'
                  // }`}

                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive ? "bg-graydark dark:bg-meta-4" : ""
                    }`
                  }
                >
                  <CgProductHunt className="text-xl" />
                  Project
                </NavLink>
              </li>
              {/* <!-- Menu Project --> */}

              {/* <!-- Menu Project --> */}
              <li>
                <NavLink
                  to="/skill"
                  // className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  //   pathname.includes('product') &&
                  //   'bg-graydark dark:bg-meta-4'
                  // }`}

                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive ? "bg-graydark dark:bg-meta-4" : ""
                    }`
                  }
                >
                  <GiSkills className="text-xl" />
                  Skill
                </NavLink>
              </li>
              {/* <!-- Menu Project --> */}

              {/* Menu About */}
              {/* <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive && "bg-graydark dark:bg-meta-4"
                    }`
                  }
                >
                  <FaInfoCircle className="text-xl" />
                  About
                </NavLink>
              </li> */}
              {/* Menu About */}

              {/* <!-- Menu user --> */}
              <li>
                <NavLink
                  to="/developer"
                  // className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  //   pathname.includes("user") && "bg-graydark dark:bg-meta-4"
                  // }`}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive && "bg-graydark dark:bg-meta-4"
                    }`
                  }
                >
                  <FaUserShield className="text-xl" />
                  Developer
                </NavLink>
              </li>
              {/* <!-- Menu user --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
