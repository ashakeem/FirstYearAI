import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FiChevronLeft, FiChevronRight, FiX, FiLogOut, FiHome, FiBook, FiFileText, FiUser } from 'react-icons/fi';
import Header from '../components/layout/Header';

// Define menu items
const menuItems = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <FiHome />,
  },
  {
    key: '/resources',
    label: 'Resources',
    icon: <FiBook />,
  },
  {
    key: '/resume',
    label: 'Resume',
    icon: <FiFileText />,
  },
  {
    key: '/profile',
    label: 'Profile',
    icon: <FiUser />,
  },
];

const AppLayout = ({ children }) => {
  const user = null;
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (mobileOpen && sidebar && !sidebar.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-gray-800/50 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed z-40 top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          ${collapsed ? "md:w-20" : "md:w-64"}
          md:translate-x-0 w-[280px]`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h1 className={`text-indigo-600 text-xl font-bold transition-opacity duration-200 
              ${collapsed ? "md:hidden" : "block"}`}>
              FirstYear.ai
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:block text-indigo-700 hover:text-gray-800 bg-indigo-100 p-1.5 rounded-md"
              >
                {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className={`p-4 border-b border-gray-100 ${collapsed ? "md:hidden" : "block"}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
                ) : (
                  <span className="text-indigo-600 font-medium">
                    {user?.first_name?.charAt(0) || user?.username?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div className={`transition-opacity duration-200 ${collapsed ? "md:hidden" : "block"}`}>
                <p className="font-medium text-gray-900">{user?.first_name || user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const active = location.pathname === item.key;
                return (
                  <li key={item.key}>
                    <Link
                      to={item.key}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                        ${active ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className={`transition-opacity duration-200 ${collapsed ? "md:hidden" : "block"}`}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FiLogOut size={20} />
              <span className={`transition-opacity duration-200 ${collapsed ? "md:hidden" : "block"}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
        <Header handleMobileSidebarToggle={() => setMobileOpen(!mobileOpen)} />
        <div className="flex flex-col min-h-[calc(100vh-64px)]">
          <main className="p-4 md:p-6 flex-grow">
            {children}
          </main>
          <footer className="mt-auto">
            <div className="border-t border-gray-200">
              <div className="container mx-auto px-4 py-6">
                <p className="text-center text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} FirstYear.ai. Created By Ayomide Hakeem.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
