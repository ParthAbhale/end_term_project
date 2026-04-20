import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Search, Trophy, Calculator, Star,
  Moon, Sun, ChevronLeft, ChevronRight, TrendingUp,
} from 'lucide-react';
import useStockStore from '../../store/useStockStore';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/top-stocks', icon: Trophy, label: 'Top 10' },
  { path: '/simulator', icon: Calculator, label: 'Simulator' },
  { path: '/watchlist', icon: Star, label: 'Watchlist' },
];

export default function Sidebar() {
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useStockStore();
  const location = useLocation();

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <TrendingUp size={22} />
        </div>
        {sidebarOpen && <span className="brand-text">StockVision</span>}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            end={path === '/'}
            title={label}
          >
            <Icon size={20} />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="sidebar-bottom">
        <button className="sidebar-link" onClick={toggleDarkMode} title="Toggle theme">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button className="sidebar-collapse-btn" onClick={toggleSidebar} title="Toggle sidebar">
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  );
}
