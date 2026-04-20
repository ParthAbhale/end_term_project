import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import useStockStore from '../../store/useStockStore';
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const pathKey = Object.keys(PAGE_TITLES).find(
    (key) => key === '/' ? location.pathname === '/' : location.pathname.startsWith(key)
  );
  const title = pathKey ? PAGE_TITLES[pathKey] : 'Stock Details';

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
        <div className="navbar-avatar">
          <span>S</span>
        </div>
      </div>
    </header>
  );
}
