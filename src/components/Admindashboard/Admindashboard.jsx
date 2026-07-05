// AdminDashboard.jsx
import { useState, useEffect, useRef } from "react";
import "./Admindashboard.css";
import logo from "../../assets/Stacklyimg.webp";
import { useNavigate } from "react-router-dom";

// ─── DATA ───────────────────────────────────────────────────────────────

const regionAccents = {
  "North America": "#60a5fa",
  "Europe": "#818cf8",
  "APAC": "#22d3ee",
  "LATAM": "#34d399",
  "MEA": "#f59e0b",
};

// Same underlying sites as the field-operations dashboard, so the two
// admin/ops views stay consistent with each other.
const networkSitesData = [
  { id: 1, name: "Austin Metro Exchange", region: "North America", site: "Austin, TX", type: "Data Center", status: "Live", progress: 100, endDate: "Commissioned 2022", budget: "$1.4M", director: "Sarah Chen" },
  { id: 2, name: "Berlin Fiber PoP", region: "Europe", site: "Berlin, DE", type: "Fiber PoP", status: "Deploying", progress: 64, endDate: "Q3 2026", budget: "$820K", director: "Nikolai Petrov" },
  { id: 3, name: "Singapore Subsea Landing", region: "APAC", site: "Singapore", type: "Subsea Landing", status: "Live", progress: 100, endDate: "Commissioned 2023", budget: "$3.1M", director: "Mei Lin Tan" },
  { id: 4, name: "São Paulo Exchange", region: "LATAM", site: "São Paulo, BR", type: "Exchange", status: "Deploying", progress: 41, endDate: "Q1 2027", budget: "$960K", director: "Diego Alvarez" },
  { id: 5, name: "Dubai Cell Cluster", region: "MEA", site: "Dubai, AE", type: "Cell Tower", status: "Under Review", progress: 88, endDate: "Q4 2026", budget: "$540K", director: "Amara Haddad" },
  { id: 6, name: "Chicago Backbone Node", region: "North America", site: "Chicago, IL", type: "Backbone Node", status: "Decommissioned", progress: 100, endDate: "Retiring Oct 2026", budget: "$1.1M", director: "Marcus Reed" },
  { id: 7, name: "Lagos Fiber Ring", region: "MEA", site: "Lagos, NG", type: "Fiber Ring", status: "Deploying", progress: 29, endDate: "Q2 2027", budget: "$700K", director: "Ade Okafor" },
];

const adminStats = {
  totalStaff: 386,
  activeStaff: 312,
  totalSites: 47,
  totalAssets: 18240,
  totalRevenue: 2845000,
  pendingApprovals: 23,
  monthlyGrowth: 8.6,
  completionRate: 68,
};

const recentStaff = [
  { name: "Sarah Chen", email: "s.chen@stackly.net", role: "Senior Network Engineer", status: "active", joinDate: "2025-01-15", projects: 3 },
  { name: "Nikolai Petrov", email: "n.petrov@stackly.net", role: "Field Director", status: "active", joinDate: "2025-01-12", projects: 2 },
  { name: "Mei Lin Tan", email: "m.tan@stackly.net", role: "APAC Infrastructure Lead", status: "pending", joinDate: "2025-01-10", projects: 0 },
  { name: "Diego Alvarez", email: "d.alvarez@stackly.net", role: "LATAM Field Engineer", status: "active", joinDate: "2025-01-08", projects: 2 },
  { name: "Amara Haddad", email: "a.haddad@stackly.net", role: "MEA RF Specialist", status: "inactive", joinDate: "2025-01-05", projects: 1 },
  { name: "Marcus Reed", email: "m.reed@stackly.net", role: "Backbone Operations Lead", status: "active", joinDate: "2025-01-03", projects: 1 },
];

const pendingApprovalsList = [
  { id: "REQ-001", user: "Mei Lin Tan", type: "Site Access Request", site: "Singapore Subsea Landing", submitted: "2025-01-18", priority: "high" },
  { id: "REQ-002", user: "Ade Okafor", type: "Budget Increase", site: "Lagos Fiber Ring", submitted: "2025-01-17", priority: "medium" },
  { id: "REQ-003", user: "Marcus Reed", type: "Decommission Approval", site: "Chicago Backbone Node", submitted: "2025-01-16", priority: "low" },
  { id: "REQ-004", user: "Amara Haddad", type: "Equipment Request", site: "Dubai Cell Cluster", submitted: "2025-01-15", priority: "high" },
  { id: "REQ-005", user: "Sarah Chen", type: "Maintenance Window Approval", site: "Austin Metro Exchange", submitted: "2025-01-14", priority: "medium" },
];

const systemAlerts = [
  { type: "warning", message: "Backup storage at 85% capacity", time: "2h ago" },
  { type: "info", message: "New subscriber registration spike detected", time: "4h ago" },
  { type: "success", message: "Network database optimization completed", time: "Yesterday" },
  { type: "error", message: "Scheduled network maintenance tonight at 2 AM", time: "Yesterday" },
];

const subscriberGrowthData = [45, 52, 48, 63, 71, 89, 95, 102, 115, 128, 142, 156];
const monthlyRevenue = [284, 312, 298, 345, 389, 412, 435, 468, 492, 525, 548, 572];

const networkSiteStatus = [
  { label: "Live", value: 28, color: "#60a5fa" },
  { label: "Deploying", value: 12, color: "#818cf8" },
  { label: "Under Review", value: 4, color: "#f59e0b" },
  { label: "Decommissioned", value: 3, color: "#94a3b8" },
];

const regionDistribution = [
  { label: "North America", value: 14, color: "#60a5fa" },
  { label: "Europe", value: 11, color: "#818cf8" },
  { label: "APAC", value: 9, color: "#22d3ee" },
  { label: "LATAM", value: 7, color: "#34d399" },
  { label: "MEA", value: 6, color: "#f59e0b" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "👥", label: "Staff", id: "staff" },
  { icon: "🌐", label: "Network Sites", id: "sites" },
  { icon: "📦", label: "Assets", id: "assets" },
  { icon: "💰", label: "Finance", id: "finance" },
  { icon: "✅", label: "Approvals", id: "approvals" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const statusColors = {
  Live: "adm-status-active",
  Deploying: "adm-status-field",
  Decommissioned: "adm-status-complete",
  "Under Review": "adm-status-review",
};

function fmt(n) { return "$" + n.toLocaleString(); }

// ─── COMPONENTS ──────────────────────────────────────────────────────────

function DashboardPage({ navigate }) {
  return (
    <>
      {/* Welcome Banner */}
      <div className="adm-welcome-banner">
        <div className="adm-welcome-content">
          <div className="adm-welcome-text">
            <h2>Welcome back, Admin 👋</h2>
          </div>
        </div>
        <div className="adm-welcome-stats-mini">
          <div className="adm-mini-stat">
            <span className="adm-mini-stat-value">{adminStats.totalStaff.toLocaleString()}</span>
            <span className="adm-mini-stat-label">Staff</span>
          </div>
          <div className="adm-mini-stat-divider" />
          <div className="adm-mini-stat">
            <span className="adm-mini-stat-value">{adminStats.totalSites}</span>
            <span className="adm-mini-stat-label">Sites</span>
          </div>
          <div className="adm-mini-stat-divider" />
          <div className="adm-mini-stat">
            <span className="adm-mini-stat-value">{fmt(adminStats.totalRevenue)}</span>
            <span className="adm-mini-stat-label">Revenue</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="adm-stats-grid">
        {[
          { icon: "👥", value: adminStats.totalStaff.toLocaleString(), label: "Total Staff", change: "+8.6%", bar: 85, accent: true },
          { icon: "🟢", value: adminStats.activeStaff.toLocaleString(), label: "Active Staff", change: "+5.1%", bar: 66, accent: false },
          { icon: "🌐", value: adminStats.totalSites, label: "Network Sites", change: "+3", bar: 70, accent: false },
          { icon: "📦", value: adminStats.totalAssets.toLocaleString(), label: "Assets Tracked", change: "+512", bar: 78, accent: false },
          { icon: "💰", value: fmt(adminStats.totalRevenue), label: "Monthly Revenue", change: "+$124K", bar: 90, accent: true },
          { icon: "⏳", value: adminStats.pendingApprovals, label: "Pending Approvals", change: "+5", bar: 45, accent: false },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top">
              <span className="adm-stat-icon">{s.icon}</span>
              <span className={`adm-stat-delta ${s.change.startsWith("+") ? "adm-up" : ""}`}>{s.change}</span>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      {/* Charts Grid */}
      <section className="adm-charts-grid">
        <div className="adm-card adm-chart-card">
          <div className="adm-card-header">
            <div>
              <h2 className="adm-card-title">Subscriber Growth</h2>
              <p className="adm-card-sub">Monthly active subscribers (000s)</p>
            </div>
            <div className="adm-chart-controls">
              <button className="adm-btn-outline adm-btn-sm adm-active" onClick={() => navigate("/404")}>Year</button>
              <button className="adm-btn-outline adm-btn-sm" onClick={() => navigate("/404")}>Month</button>
            </div>
          </div>
          <div className="adm-chart-container">
            <svg viewBox="0 0 500 200" className="adm-chart-svg">
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
              </defs>
              {subscriberGrowthData.map((_, i) => {
                const x = (i / (subscriberGrowthData.length - 1)) * 480 + 10;
                const y1 = 190 - (subscriberGrowthData[i] / Math.max(...subscriberGrowthData)) * 170;
                const y2 = 190 - (subscriberGrowthData[i + 1] / Math.max(...subscriberGrowthData)) * 170;
                if (i < subscriberGrowthData.length - 1) {
                  return (
                    <line key={i} x1={x} y1={y1} x2={x + 480 / (subscriberGrowthData.length - 1)} y2={y2} stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  );
                }
                return null;
              })}
              <polygon points={`10,190 ${subscriberGrowthData.map((d, i) => (i / (subscriberGrowthData.length - 1)) * 480 + 10 + "," + (190 - (d / Math.max(...subscriberGrowthData)) * 170)).join(" ")} 490,190`} fill="url(#userGradient)" />
              {subscriberGrowthData.map((d, i) => {
                const x = (i / (subscriberGrowthData.length - 1)) * 480 + 10;
                const y = 190 - (d / Math.max(...subscriberGrowthData)) * 170;
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill="#60a5fa" stroke="#fff" strokeWidth="1.5" />
                );
              })}
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                <text key={i} x={10 + i * 40} y="195" fill="rgba(255,255,255,0.3)" fontSize="10">{m}</text>
              ))}
            </svg>
          </div>
        </div>

        <div className="adm-card adm-chart-card">
          <div className="adm-card-header">
            <div>
              <h2 className="adm-card-title">Revenue Overview</h2>
              <p className="adm-card-sub">Monthly revenue ($000s)</p>
            </div>
            <button className="adm-btn-outline adm-btn-sm" onClick={() => navigate("/404")}>View All</button>
          </div>
          <div className="adm-chart-container">
            <svg viewBox="0 0 500 200" className="adm-chart-svg">
              {monthlyRevenue.map((d, i) => {
                const x = (i / (monthlyRevenue.length - 1)) * 480 + 10;
                const barHeight = (d / Math.max(...monthlyRevenue)) * 170;
                return (
                  <g key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                    <rect
                      x={x - 8}
                      y={190 - barHeight}
                      width="16"
                      height={barHeight}
                      rx="3"
                      fill={d > 500 ? "#60a5fa" : "rgba(96,165,250,0.5)"}
                      className="adm-bar-animate"
                    />
                    <title>{d}</title>
                  </g>
                );
              })}
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                <text key={i} x={10 + i * 40} y="195" fill="rgba(255,255,255,0.3)" fontSize="10">{m}</text>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Bottom Grid */}
      <section className="adm-bottom-grid">
        <div className="adm-card">
          <div className="adm-card-header">
            <div><h2 className="adm-card-title">Network Site Status</h2><p className="adm-card-sub">Distribution by phase</p></div>
          </div>
          <div className="adm-donut-chart" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 120 120" className="adm-donut-svg">
              {networkSiteStatus.reduce((acc, item, i) => {
                const total = networkSiteStatus.reduce((s, p) => s + p.value, 0);
                const start = acc;
                const end = start + (item.value / total) * 3.14159 * 2;
                const x1 = 60 + 45 * Math.cos(start);
                const y1 = 60 + 45 * Math.sin(start);
                const x2 = 60 + 45 * Math.cos(end);
                const y2 = 60 + 45 * Math.sin(end);
                const large = end - start > 3.14159 ? 1 : 0;
                acc = end;
                return (
                  <>
                    {i === 0 && <circle cx="60" cy="60" r="45" fill="none" stroke="#14141c" strokeWidth="12" />}
                    <path key={i} d={`M ${x1} ${y1} A 45 45 0 ${large} 1 ${x2} ${y2} L 60 60`} fill={item.color} opacity="0.9" />
                  </>
                );
              }, 0)}
              <text x="60" y="56" textAnchor="middle" className="adm-donut-num">{networkSiteStatus.reduce((s, p) => s + p.value, 0)}</text>
              <text x="60" y="68" textAnchor="middle" className="adm-donut-label">Sites</text>
            </svg>
          </div>
          <ul className="adm-legend-list">
            {networkSiteStatus.map((l, i) => (
              <li key={i} className="adm-legend-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="adm-legend-dot" style={{ background: l.color }} />
                <span className="adm-legend-label">{l.label}</span>
                <span className="adm-legend-count">{l.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="adm-card">
          <div className="adm-card-header">
            <div><h2 className="adm-card-title">Pending Approvals</h2><p className="adm-card-sub">Requiring your attention</p></div>
            <button className="adm-btn-outline adm-btn-sm" onClick={() => navigate("/404")}>View All</button>
          </div>
          <ul className="adm-approval-list">
            {pendingApprovalsList.map((req, i) => (
              <li key={i} className="adm-approval-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="adm-approval-header">
                  <span className="adm-approval-id">{req.id}</span>
                  <span className={`adm-priority-badge adm-priority-${req.priority}`}>{req.priority}</span>
                </div>
                <div className="adm-approval-details">
                  <span className="adm-approval-user">{req.user}</span>
                  <span className="adm-approval-type">{req.type}</span>
                </div>
                <div className="adm-approval-footer">
                  <span className="adm-approval-site">{req.site}</span>
                  <span className="adm-approval-date">{req.submitted}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="adm-card">
          <div className="adm-card-header">
            <div><h2 className="adm-card-title">Region Distribution</h2><p className="adm-card-sub">Sites by region</p></div>
          </div>
          <div className="adm-region-list">
            {regionDistribution.map((region, i) => (
              <div key={i} className="adm-region-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="adm-region-header">
                  <span className="adm-region-label">{region.label}</span>
                  <span className="adm-region-value">{region.value} sites</span>
                </div>
                <div className="adm-region-bar">
                  <div className="adm-region-fill" style={{ width: `${(region.value / Math.max(...regionDistribution.map(r => r.value))) * 100}%`, background: region.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Staff Table */}
      <div className="adm-card adm-full-width">
        <div className="adm-card-header">
          <div>
            <h2 className="adm-card-title">Recent Staff</h2>
            <p className="adm-card-sub">Latest hires and activity</p>
          </div>
          <button className="adm-btn-primary adm-btn-sm" onClick={() => navigate("/404")}>View All →</button>
        </div>
        <div className="adm-table-wrapper">
          <table className="adm-users-table">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Tickets</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentStaff.map((user, i) => (
                <tr key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="adm-user-name">{user.name}</div>
                    <div className="adm-user-email">{user.email}</div>
                  </td>
                  <td><span className="adm-role-badge">{user.role}</span></td>
                  <td>
                    <span className={`adm-status-badge ${user.status === "active" ? "adm-status-active" : user.status === "pending" ? "adm-status-field" : "adm-status-review"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td><span className="adm-project-count">{user.projects}</span></td>
                  <td>
                    <button className="adm-btn-icon adm-btn-view" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>👁️</button>
                    <button className="adm-btn-icon adm-btn-edit" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className="adm-card adm-full-width">
        <div className="adm-card-header">
          <div><h2 className="adm-card-title">System Alerts</h2><p className="adm-card-sub">Platform notifications</p></div>
          <button className="adm-btn-outline adm-btn-sm" onClick={() => navigate("/404")}>Mark All Read</button>
        </div>
        <div className="adm-alerts-grid">
          {systemAlerts.map((alert, i) => (
            <div key={i} className={`adm-alert-item adm-alert-${alert.type}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
              <div className="adm-alert-icon">{alert.type === "warning" ? "⚠️" : alert.type === "error" ? "🔴" : alert.type === "success" ? "✅" : "ℹ️"}</div>
              <div className="adm-alert-content">
                <div className="adm-alert-message">{alert.message}</div>
                <div className="adm-alert-time">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function StaffPage({ navigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const filteredStaff = recentStaff.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roles = ["All", "Senior Network Engineer", "Field Director", "APAC Infrastructure Lead", "LATAM Field Engineer", "MEA RF Specialist", "Backbone Operations Lead"];

  return (
    <>
      <section className="adm-stats-grid">
        {[
          { icon: "👥", value: adminStats.totalStaff.toLocaleString(), label: "Total Staff", bar: 85, accent: true },
          { icon: "🟢", value: adminStats.activeStaff.toLocaleString(), label: "Active Staff", bar: 66 },
          { icon: "⏳", value: recentStaff.filter(u => u.status === "pending").length, label: "Pending", bar: 20 },
          { icon: "📊", value: `${adminStats.monthlyGrowth}%`, label: "Growth Rate", bar: 75 },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top"><span className="adm-stat-icon">{s.icon}</span></div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="adm-card">
        <div className="adm-card-header">
          <div><h2 className="adm-card-title">Staff Management</h2><p className="adm-card-sub">All registered internal staff</p></div>
          <div className="adm-search-box" style={{ flex: "0 0 auto" }}>
            <span className="adm-search-icon">🔍</span>
            <input placeholder="Search staff…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="adm-filter-row" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {roles.map(role => (
            <button key={role} className={`adm-btn-outline ${filterRole === role ? "adm-btn-active" : ""}`}
              onClick={() => setFilterRole(role)}
              style={filterRole === role ? { borderColor: "#60a5fa", color: "#60a5fa" } : {}}>
              {role}
            </button>
          ))}
        </div>
        <div className="adm-table-wrapper">
          <table className="adm-users-table">
            <thead>
              <tr><th>Staff Member</th><th>Role</th><th>Status</th><th>Join Date</th><th>Tickets</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filteredStaff.map((user, i) => (
                <tr key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="adm-user-name">{user.name}</div>
                    <div className="adm-user-email">{user.email}</div>
                  </td>
                  <td><span className="adm-role-badge">{user.role}</span></td>
                  <td>
                    <span className={`adm-status-badge ${user.status === "active" ? "adm-status-active" : user.status === "pending" ? "adm-status-field" : "adm-status-review"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td><span className="adm-project-count">{user.projects}</span></td>
                  <td>
                    <button className="adm-btn-icon adm-btn-view" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>👁️</button>
                    <button className="adm-btn-icon adm-btn-edit" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✏️</button>
                    <button className="adm-btn-icon adm-btn-delete" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SitesPage({ navigate }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Live", "Deploying", "Under Review", "Decommissioned"];
  const filtered = filter === "All" ? networkSitesData : networkSitesData.filter(e => e.status === filter);

  return (
    <>
      <section className="adm-stats-grid">
        {[
          { icon: "🌐", value: networkSitesData.length, label: "Sample Sites", bar: 100, accent: true },
          { icon: "🟢", value: networkSitesData.filter(e => e.status === "Live").length, label: "Live", bar: 60 },
          { icon: "📍", value: networkSitesData.filter(e => e.status === "Deploying").length, label: "Deploying", bar: 40 },
          { icon: "🗄️", value: networkSitesData.filter(e => e.status === "Decommissioned").length, label: "Decommissioned", bar: 20 },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top"><span className="adm-stat-icon">{s.icon}</span></div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="adm-card">
        <div className="adm-card-header">
          <div><h2 className="adm-card-title">All Network Sites</h2><p className="adm-card-sub">Full list of infrastructure sites</p></div>
          <div className="adm-filter-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {statuses.map(s => (
              <button key={s} className={`adm-btn-outline ${filter === s ? "adm-btn-active" : ""}`} onClick={() => setFilter(s)}
                style={filter === s ? { borderColor: "#60a5fa", color: "#60a5fa" } : {}}>{s}</button>
            ))}
          </div>
        </div>
        <div className="adm-table-wrapper">
          <table className="adm-data-table">
            <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>Manager</th><th>Budget</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td><div className="adm-t-name">{t.name}</div><div className="adm-t-sub">{t.site}</div></td>
                  <td><span className="adm-region-tag" style={{ color: regionAccents[t.region], borderColor: regionAccents[t.region], background: `${regionAccents[t.region]}1f` }}>{t.region}</span></td>
                  <td className="adm-type-col">{t.type}</td>
                  <td><span className={`adm-status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                  <td><div className="adm-progress-wrap"><div className="adm-progress-bar"><div className="adm-progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="adm-progress-pct">{t.progress}%</span></div></td>
                  <td className="adm-date-col" style={{ fontSize: 12 }}>{t.director}</td>
                  <td className="adm-budget-col">{t.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AssetsPage({ navigate }) {
  const networkAssets = [
    { id: "AST-001", name: "Juniper MX960 Router", site: "Austin Metro Exchange", region: "North America", category: "Core Routing", installDate: "2022", condition: "Excellent", status: "Deployed" },
    { id: "AST-002", name: "OTDR Fiber Test Unit", site: "Berlin Fiber PoP", region: "Europe", category: "Field Equipment", installDate: "2025", condition: "Good", status: "Under Repair" },
    { id: "AST-003", name: "Subsea Repeater Unit R-14", site: "Singapore Subsea Landing", region: "APAC", category: "Subsea Infrastructure", installDate: "2023", condition: "Excellent", status: "Deployed" },
    { id: "AST-004", name: "Cisco ASR 9000 Chassis", site: "São Paulo Exchange", region: "LATAM", category: "Core Routing", installDate: "2024", condition: "Good", status: "Deployed" },
    { id: "AST-005", name: "5G Macro Antenna Array", site: "Dubai Cell Cluster", region: "MEA", category: "RAN Equipment", installDate: "2025", condition: "Good", status: "Deployed" },
    { id: "AST-006", name: "Legacy SONET Multiplexer", site: "Chicago Backbone Node", region: "North America", category: "Legacy Transport", installDate: "2011", condition: "Needs Repair", status: "Retired" },
    { id: "AST-007", name: "Fusion Splicer Kit", site: "Lagos Fiber Ring", region: "MEA", category: "Field Equipment", installDate: "2026", condition: "Excellent", status: "Deployed" },
    { id: "AST-008", name: "Backup Diesel Generator", site: "Austin Metro Exchange", region: "North America", category: "Power Systems", installDate: "2022", condition: "Excellent", status: "In Storage" },
  ];
  const conditionColor = { Excellent: "#22c55e", Good: "#f59e0b", "Needs Repair": "#ef4444" };

  return (
    <>
      <section className="adm-stats-grid">
        {[
          { icon: "📦", value: adminStats.totalAssets.toLocaleString(), label: "Total Assets", bar: 75, accent: true },
          { icon: "🔧", value: "312", label: "Under Repair", bar: 25 },
          { icon: "🌐", value: "9,800", label: "Deployed", bar: 80 },
          { icon: "🗑️", value: "76", label: "Retired", bar: 15 },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top"><span className="adm-stat-icon">{s.icon}</span></div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="adm-card">
        <div className="adm-card-header">
          <div><h2 className="adm-card-title">Asset Registry</h2><p className="adm-card-sub">Equipment tracked across all sites</p></div>
          <div className="adm-search-box" style={{ flex: "0 0 auto" }}>
            <span className="adm-search-icon">🔍</span>
            <input placeholder="Search assets…" />
          </div>
        </div>
        <div className="adm-table-wrapper">
          <table className="adm-data-table">
            <thead><tr><th>ID</th><th>Asset</th><th>Site</th><th>Category</th><th>Installed</th><th>Condition</th><th>Status</th></tr></thead>
            <tbody>
              {networkAssets.map(a => (
                <tr key={a.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td className="adm-type-col" style={{ fontSize: 11.5, fontFamily: "monospace" }}>{a.id}</td>
                  <td><div className="adm-t-name">{a.name}</div><div className="adm-t-sub">{a.region}</div></td>
                  <td className="adm-date-col">{a.site}</td>
                  <td className="adm-type-col" style={{ fontSize: 12 }}>{a.category}</td>
                  <td className="adm-date-col">{a.installDate}</td>
                  <td><span className="adm-condition-badge" style={{ background: conditionColor[a.condition] + "22", color: conditionColor[a.condition] }}>{a.condition}</span></td>
                  <td><span className="adm-status-badge adm-status-review" style={{ background: a.status === "Deployed" ? "rgba(34,197,94,0.14)" : a.status === "In Storage" ? "rgba(96,165,250,0.14)" : "rgba(245,158,11,0.14)", color: a.status === "Deployed" ? "#86efac" : a.status === "In Storage" ? "#93c5fd" : "#fcd34d" }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function FinancePage({ navigate }) {
  const infrastructureBudget = [
    { site: "Austin Metro Exchange", allocated: 1400000, spent: 1400000, region: "North America" },
    { site: "Berlin Fiber PoP", allocated: 820000, spent: 512000, region: "Europe" },
    { site: "Singapore Subsea Landing", allocated: 3100000, spent: 3100000, region: "APAC" },
    { site: "São Paulo Exchange", allocated: 960000, spent: 402000, region: "LATAM" },
    { site: "Dubai Cell Cluster", allocated: 540000, spent: 470000, region: "MEA" },
    { site: "Chicago Backbone Node", allocated: 1100000, spent: 1100000, region: "North America" },
    { site: "Lagos Fiber Ring", allocated: 700000, spent: 205000, region: "MEA" },
  ];

  const totalAllocated = infrastructureBudget.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = infrastructureBudget.reduce((a, b) => a + b.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const utilisation = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <>
      <section className="adm-stats-grid">
        {[
          { icon: "💰", value: fmt(totalAllocated), label: "Total Allocated", bar: 100, accent: true },
          { icon: "📈", value: fmt(totalSpent), label: "Spent", bar: utilisation },
          { icon: "✅", value: fmt(remaining), label: "Remaining", bar: 100 - utilisation },
          { icon: "📊", value: `${utilisation}%`, label: "Utilisation", bar: utilisation },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top"><span className="adm-stat-icon">{s.icon}</span></div>
            <div className="adm-stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="adm-card">
        <div className="adm-card-header"><div><h2 className="adm-card-title">Budget by Site</h2><p className="adm-card-sub">Allocation vs spend</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {infrastructureBudget.map((b, i) => {
            const pct = Math.round((b.spent / b.allocated) * 100);
            return (
              <div key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="adm-budget-row-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{b.site}</span>
                    <span className="adm-region-tag" style={{ marginLeft: 10, color: regionAccents[b.region], borderColor: regionAccents[b.region], background: `${regionAccents[b.region]}1f`, fontSize: 11 }}>{b.region}</span>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12.5, color: "rgba(245,245,247,0.65)" }}>
                    <span style={{ color: "#fff", fontWeight: 700 }}>{fmt(b.spent)}</span> / {fmt(b.allocated)}
                    <span style={{ marginLeft: 10, color: pct > 80 ? "#fca5a5" : "#60a5fa", fontWeight: 700 }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct > 85 ? "linear-gradient(90deg,#ef4444,#f87171)" : "linear-gradient(90deg,#60a5fa,#93c5fd)", borderRadius: 999, transition: "width 1.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ApprovalsPage({ navigate }) {
  return (
    <>
      <section className="adm-stats-grid">
        {[
          { icon: "⏳", value: adminStats.pendingApprovals, label: "Pending", bar: 45, accent: true },
          { icon: "✅", value: "142", label: "Approved This Month", bar: 75 },
          { icon: "❌", value: "23", label: "Rejected", bar: 20 },
          { icon: "📊", value: "86%", label: "Approval Rate", bar: 86 },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card ${s.accent ? "adm-stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="adm-stat-top"><span className="adm-stat-icon">{s.icon}</span></div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar"><div className="adm-stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <div className="adm-card">
        <div className="adm-card-header"><div><h2 className="adm-card-title">Pending Approvals</h2><p className="adm-card-sub">Requests awaiting your review</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pendingApprovalsList.map((req, i) => (
            <div key={i} className="adm-approval-card" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
              <div className="adm-approval-card-left">
                <div className="adm-approval-card-id">{req.id}</div>
                <div className="adm-approval-card-user">{req.user}</div>
                <div className="adm-approval-card-details">{req.type} · {req.site}</div>
              </div>
              <div className="adm-approval-card-right">
                <span className={`adm-priority-badge adm-priority-${req.priority}`}>{req.priority}</span>
                <span className="adm-approval-card-date">{req.submitted}</span>
                <div className="adm-approval-card-actions">
                  <button className="adm-btn-approve" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✓ Approve</button>
                  <button className="adm-btn-reject" onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>✕ Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SettingsPage({ navigate }) {
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} className={`adm-toggle ${value ? "adm-toggle-active" : ""}`}>
      <div className="adm-toggle-knob" />
    </div>
  );

  return (
    <>
      <div className="adm-card">
        <div className="adm-card-header"><div><h2 className="adm-card-title">Account</h2><p className="adm-card-sub">Your profile information</p></div></div>
        <div className="adm-profile-section">
          <img src="https://placehold.co/80x80/0a0a12/60a5fa?text=AD" alt="avatar" className="adm-profile-avatar" />
          <div className="adm-profile-info">
            <div className="adm-profile-name">Admin User</div>
            <div className="adm-profile-email">System Administrator · admin@stackly.net</div>
            <div className="adm-profile-badge">🛡️ Super Admin</div>
          </div>
          <button className="adm-btn-primary adm-btn-sm" onClick={() => navigate("/404")}>Edit Profile</button>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header"><div><h2 className="adm-card-title">Preferences</h2><p className="adm-card-sub">Notifications and display</p></div></div>
        <div className="adm-preferences-list">
          {[
            { label: "Push Notifications", sub: "Receive alerts for system events and approvals", value: notifications, set: setNotifications },
            { label: "Weekly Email Digest", sub: "Summary of platform activity", value: emailDigest, set: setEmailDigest },
            { label: "Dark Mode", sub: "Use dark colour scheme across the dashboard", value: darkMode, set: setDarkMode },
          ].map((item, i) => (
            <div key={i} className="adm-preference-item">
              <div>
                <div className="adm-preference-label">{item.label}</div>
                <div className="adm-preference-sub">{item.sub}</div>
              </div>
              <Toggle value={item.value} onChange={item.set} />
            </div>
          ))}
          <div className="adm-preference-item">
            <div>
              <div className="adm-preference-label">Language</div>
              <div className="adm-preference-sub">Interface display language</div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="adm-language-select">
              {["English", "French", "Spanish", "Arabic", "Portuguese"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="adm-card adm-danger-zone">
        <div className="adm-card-header"><div><h2 className="adm-card-title">Danger Zone</h2><p className="adm-card-sub">Irreversible account actions</p></div></div>
        <div className="adm-danger-actions">
          <button className="adm-btn-danger" onClick={() => navigate("/404")}>Reset Password</button>
          <button className="adm-btn-danger" onClick={() => navigate("/404")}>Delete Account</button>
        </div>
      </div>
    </>
  );
}

const pageMap = {
  dashboard: { title: "Dashboard", sub: "Welcome back, Admin — platform overview.", component: DashboardPage },
  staff: { title: "Staff", sub: "Manage all internal staff and roles.", component: StaffPage },
  sites: { title: "Network Sites", sub: "All live and in-progress infrastructure sites.", component: SitesPage },
  assets: { title: "Assets", sub: "Registry of all tracked network equipment.", component: AssetsPage },
  finance: { title: "Finance", sub: "Infrastructure allocation and expenditure tracking.", component: FinancePage },
  approvals: { title: "Approvals", sub: "Review and manage pending requests.", component: ApprovalsPage },
  settings: { title: "Settings", sub: "Account preferences and configuration.", component: SettingsPage },
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const mainRef = useRef(null);

  const currentPage = pageMap[activeNav];
  const PageComponent = currentPage.component;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeNav]);

  const handleNavClick = (id) => {
    setActiveNav(id);
    setSidebarOpen(false);
  };

  return (
    <div className="adm-dashboard-root">
      {sidebarOpen && <div className="adm-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`adm-sidebar ${sidebarOpen ? "adm-sidebar-open" : ""}`}>
        <div className="adm-sidebar-header">
          <div className="adm-brand">
            <img src={logo} alt="Stackly" className="adm-brand-logo-img" />
          </div>
          <button className="adm-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close adm-sidebar">✕</button>
        </div>
        <div className="adm-sidebar-section-label">MAIN MENU</div>
        <nav className="adm-sidebar-nav">
          {navItems.map(item => (
            <button key={item.id} className={`adm-nav-item ${activeNav === item.id ? "adm-nav-active" : ""}`} onClick={() => handleNavClick(item.id)}>
              <span className="adm-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "approvals" && <span className="adm-nav-badge">{adminStats.pendingApprovals}</span>}
            </button>
          ))}
        </nav>
        <button className="adm-logout-full-btn" style={{ marginTop: "auto" }} onClick={() => navigate("/login")}>
          <span>↪</span> Logout
        </button>
      </aside>

      <main className="adm-main-content" ref={mainRef}>
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <div className="adm-page-title">
              <h1>{currentPage.title}</h1>
            </div>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-search-box">
              <span className="adm-search-icon">🔍</span>
              <input placeholder="Search dashboard…" />
            </div>
            <button className="adm-icon-btn" aria-label="Notifications" onClick={() => navigate("/404")}>🔔<span className="adm-notif-dot" /></button>
          </div>
        </header>

        <div className="adm-content-area">
          <PageComponent navigate={navigate} />
        </div>
      </main>
    </div>
  );
}