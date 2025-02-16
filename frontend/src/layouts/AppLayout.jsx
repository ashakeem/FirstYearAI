import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiRoadMapLine } from "react-icons/ri";
import { IoMdBook } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import {
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import { Navigate } from "react-router-dom";
import SearchInput from "../components/ui/SearchInput";

const menuItems = [
  { key: "/roadmaps", icon: <RiRoadMapLine size={20} />, label: "Roadmaps" },
  { key: "/resources", icon: <IoMdBook size={20} />, label: "Resources" },
  { key: "/resume", icon: <FaRegFileAlt size={20} />, label: "Resume" },
  { key: "/profile", icon: <CgProfile size={20} />, label: "Profile" },
];

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleMobileSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity bg-indigo-100 bg-opacity-50 md:hidden ${mobileOpen ? "opacity-70 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white shadow-md border-r border-gray-100 transition-transform duration-300 transform 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } 
          ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 shadow-sm">
            {!collapsed && (
              <h1 className="text-indigo-600 text-xl font-bold">
                FirstYear.ai
              </h1>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-indigo-700 hover:text-gray-800 bg-indigo-100 px-2  rounded-md focus:outline-none"
              >
                {collapsed ? (
                  <FiChevronRight size={25} />
                ) : (
                  <FiChevronLeft size={25} />
                )}
              </button>
              {/* Mobile close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="mt-4 space-y-1">
              {menuItems.map((item) => {
                const active = location.pathname === item.key;
                return (
                  <li key={item.key}>
                    <Link
                      to={item.key}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 p-3 mx-2 rounded-md transition-colors ${active
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <span>{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section: Settings & Logout */}
          <div className="border-t  border-gray-100 shadow-sm p-1">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="w-full flex items-center gap-4 p-3 mx-2 rounded-md transition-colors hover:bg-gray-100 text-gray-700 focus:outline-none"
                >
                  <span>
                    <FiLogOut size={20} />
                  </span>
                  {!collapsed && <span>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ml-0 bg-white ${collapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >
        {/* Header */}
        <header className="bg-white p-4 shadow flex items-center">
          {/* Hamburger icon for mobile */}
          <button
            onClick={handleMobileSidebarToggle}
            className="text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
          >
            <FiMenu size={24} />
          </button>
        {/* <div className=" flex bg-red-50 align-middle"><SearchInput/></div> */}
        </header>

        {/* Content */}
        <main className="flex-1 p-3 overflow-hidden space-y-3">
          <nav aria-label="Breadcrumb" className="flex ">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
              <li className="flex items-center">
                <a
                  href="#"
                  className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>

                  <span className="ms-1.5 text-xs font-medium"> Home </span>
                </a>
              </li>

              <li className="relative flex items-center">
                <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                <a
                  href="#"
                  className="flex h-10 items-center bg-white ps-8 pe-4 text-xs font-medium transition hover:text-gray-900"
                >
                  {location.pathname[1].toUpperCase() +
                    location.pathname.slice(2)}
                </a>
              </li>
            </ol>
          </nav>
          <div className="  rounded-lg overflow-scroll w-full h-[90%] p-2 ">
            {children}
          </div>{" "}
        </main>

        {/* Footer */}
        <footer className="bg-transparent p-4 text-center text-sm  text-gray-500  border-gray-100 ">
          FirstYear.ai ©{new Date().getFullYear()} Created by Ayomide Hakeem
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
