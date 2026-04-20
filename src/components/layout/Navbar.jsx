import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import useStockStore from '../../store/useStockStore';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/search': 'Search Stocks',
  '/top-stocks': 'Top 10 Stocks',
  '/simulator': 'Investment Simulator',
  '/watchlist': 'Watchlist',
};

export default function Navbar() {
  const location = useLocation();
  const { setSidebarOpen, sidebarOpen } = useStockStore();
  const { user, logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const pathKey = Object.keys(PAGE_TITLES).find(
    (key) => key === '/' ? location.pathname === '/' : location.pathname.startsWith(key)
  );
  const title = pathKey ? PAGE_TITLES[pathKey] : 'Stock Details';

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const displayName = user?.displayName || 'User';
  const email = user?.email || '';
  const photoURL = user?.photoURL || '';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-center">
        <SearchBar />
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn" title="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        {/* User Profile */}
        <div className="navbar-profile" ref={profileRef}>
          <button
            className="navbar-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            id="profile-menu-btn"
          >
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="navbar-avatar-img"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="navbar-avatar">
                <span>{initials}</span>
              </div>
            )}
            <ChevronDown
              size={14}
              className={`profile-chevron ${showProfileMenu ? 'rotated' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="profile-dropdown animate-scaleIn">
              <div className="profile-dropdown-header">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="dropdown-avatar-img"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="dropdown-avatar">
                    <span>{initials}</span>
                  </div>
                )}
                <div className="dropdown-user-info">
                  <span className="dropdown-name">{displayName}</span>
                  <span className="dropdown-email">{email}</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <button className="profile-dropdown-item" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
