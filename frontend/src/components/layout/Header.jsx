import SearchInput from '../ui/SearchInput';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';

const Header = ({ handleMobileSidebarToggle }) => {
  const user = null;
  
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button */}
          <button
            onClick={handleMobileSidebarToggle}
            className="text-gray-600 hover:text-gray-900 md:hidden"
          >
            <FiMenu size={24} />
          </button>

          {/* Center - Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchInput />
          </div>

          {/* Right side - Profile */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
            </span>
            <Link to="/profile" className="flex items-center">
              <Avatar
                src={user?.avatar}
                name={user?.first_name || user?.username || '?'}
                size="md"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;