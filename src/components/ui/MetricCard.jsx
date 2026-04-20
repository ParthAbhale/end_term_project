import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({ icon: Icon, label, value, subValue, trend, color, delay = 0 }) {
  return (
    <div
      className="metric-card card animate-fadeIn"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="metric-card-header">
        <div className="metric-icon" style={{ background: color ? `${color}18` : 'var(--primary-lighter)', color: color || 'var(--primary)' }}>
          {Icon && <Icon size={22} />}
        </div>
        {trend !== undefined && (
          <div className={`metric-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {subValue && <div className="metric-sub">{subValue}</div>}
    </div>
  );
}
