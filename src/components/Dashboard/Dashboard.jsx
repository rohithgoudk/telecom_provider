import { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import logo from "../../assets/Stacklyimg.webp";
import { useNavigate } from "react-router-dom";

const siteAccents = {
  "North America": "#60a5fa",
  "Europe": "#818cf8",
  "APAC": "#22d3ee",
  "LATAM": "#34d399",
  "MEA": "#f59e0b",
};

const networkSitesData = [
  { id: 1, name: "Austin Metro Exchange", region: "North America", location: "Austin, TX", type: "Data Center", status: "Live", progress: 100, targetDate: "Commissioned 2022", budget: "$1.4M", manager: "Sarah Chen" },
  { id: 2, name: "Berlin Fiber PoP", region: "Europe", location: "Berlin, DE", type: "Fiber PoP", status: "Deploying", progress: 64, targetDate: "Q3 2026", budget: "$820K", manager: "Nikolai Petrov" },
  { id: 3, name: "Singapore Subsea Landing", region: "APAC", location: "Singapore", type: "Subsea Landing", status: "Live", progress: 100, targetDate: "Commissioned 2023", budget: "$3.1M", manager: "Mei Lin Tan" },
  { id: 4, name: "São Paulo Exchange", region: "LATAM", location: "São Paulo, BR", type: "Exchange", status: "Deploying", progress: 41, targetDate: "Q1 2027", budget: "$960K", manager: "Diego Alvarez" },
  { id: 5, name: "Dubai Cell Cluster", region: "MEA", location: "Dubai, AE", type: "Cell Tower", status: "Under Review", progress: 88, targetDate: "Q4 2026", budget: "$540K", manager: "Amara Haddad" },
  { id: 6, name: "Chicago Backbone Node", region: "North America", location: "Chicago, IL", type: "Backbone Node", status: "Decommissioned", progress: 100, targetDate: "Retiring Oct 2026", budget: "$1.1M", manager: "Marcus Reed" },
  { id: 7, name: "Lagos Fiber Ring", region: "MEA", location: "Lagos, NG", type: "Fiber Ring", status: "Deploying", progress: 29, targetDate: "Q2 2027", budget: "$700K", manager: "Ade Okafor" },
];

const fieldTechnicians = [
  { name: "Sarah Chen", role: "Senior Network Engineer — North America", experience: 14, avatar: "SC", status: "active", projects: 3, speciality: "Backbone Routing & BGP", email: "s.chen@stackly.net" },
  { name: "Nikolai Petrov", role: "Field Director — Europe", experience: 11, avatar: "NP", status: "active", projects: 2, speciality: "Fiber Splicing & OTDR Testing", email: "n.petrov@stackly.net" },
  { name: "Mei Lin Tan", role: "APAC Infrastructure Lead", experience: 9, avatar: "MT", status: "away", projects: 2, speciality: "Subsea Cable Systems", email: "m.tan@stackly.net" },
  { name: "Diego Alvarez", role: "LATAM Field Engineer", experience: 16, avatar: "DA", status: "active", projects: 2, speciality: "Exchange Commissioning", email: "d.alvarez@stackly.net" },
  { name: "Amara Haddad", role: "MEA RF Specialist", experience: 8, avatar: "AH", status: "active", projects: 1, speciality: "Cell Site RF Planning", email: "a.haddad@stackly.net" },
  { name: "Marcus Reed", role: "Backbone Operations Lead", experience: 12, avatar: "MR", status: "active", projects: 1, speciality: "Core Network Redundancy", email: "m.reed@stackly.net" },
];

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

const performanceReports = [
  { title: "Q2 Backbone Latency Benchmark Report", authors: "Chen, S., Reed, M.", journal: "Network Engineering", year: 2026, status: "Published", citations: 412 },
  { title: "Subsea Cable Redundancy Failover Analysis", authors: "Tan, M.L.", journal: "APAC Infrastructure", year: 2026, status: "Published", citations: 289 },
  { title: "5G RAN Deployment Post-Mortem — Dubai Cluster", authors: "Haddad, A.", journal: "MEA Field Ops", year: 2025, status: "In Review", citations: 0 },
  { title: "Fiber Splice Loss Trends Across European PoPs", authors: "Petrov, N.", journal: "Field Engineering", year: 2025, status: "Published", citations: 731 },
  { title: "LATAM Exchange Commissioning Playbook v2", authors: "Alvarez, D.", journal: "LATAM Operations", year: 2024, status: "Published", citations: 1204 },
  { title: "Legacy SONET Decommission Risk Assessment", authors: "Reed, M. et al.", journal: "Network Engineering", year: 2026, status: "In Draft", citations: 0 },
];

const maintenanceSchedule = [
  { date: "Jun 21", event: "Austin Metro Exchange — Router firmware upgrade", site: "Austin, TX", type: "urgent" },
  { date: "Jun 25", event: "Berlin Fiber PoP — Splice tray inspection", site: "Berlin, DE", type: "normal" },
  { date: "Jul 2", event: "Singapore Landing — Repeater diagnostics", site: "Singapore", type: "normal" },
  { date: "Jul 10", event: "Team sync: Q3 rollout review", site: "Virtual", type: "meeting" },
  { date: "Jul 18", event: "São Paulo Exchange — Ground fault testing", site: "São Paulo, BR", type: "normal" },
  { date: "Aug 5", event: "Dubai Cell Cluster — RF re-tuning after audit", site: "Dubai, AE", type: "normal" },
  { date: "Aug 14", event: "Annual field engineers' summit", site: "Chicago, IL", type: "meeting" },
  { date: "Sep 1", event: "Lagos Fiber Ring — Phase 2 splicing resumes", site: "Lagos, NG", type: "normal" },
  { date: "Oct 15", event: "Chicago Backbone Node — Final decommission deadline", site: "Chicago, IL", type: "urgent" },
];

const infrastructureBudget = [
  { site: "Austin Metro Exchange", allocated: 1400000, spent: 1400000, region: "North America" },
  { site: "Berlin Fiber PoP", allocated: 820000, spent: 512000, region: "Europe" },
  { site: "Singapore Subsea Landing", allocated: 3100000, spent: 3100000, region: "APAC" },
  { site: "São Paulo Exchange", allocated: 960000, spent: 402000, region: "LATAM" },
  { site: "Dubai Cell Cluster", allocated: 540000, spent: 470000, region: "MEA" },
  { site: "Chicago Backbone Node", allocated: 1100000, spent: 1100000, region: "North America" },
  { site: "Lagos Fiber Ring", allocated: 700000, spent: 205000, region: "MEA" },
];

const documentation = [
  { title: "Stackly Network Annual Report 2025", type: "Annual Report", year: 2025, pages: 96, downloads: 4210 },
  { title: "Field Technician Installation Handbook", type: "Technical Manual", year: 2024, pages: 188, downloads: 8890 },
  { title: "5G RAN Deployment Standards", type: "Field Guide", year: 2025, pages: 142, downloads: 3320 },
  { title: "Fiber Splicing & OTDR Reference Guide", type: "Technical Manual", year: 2023, pages: 210, downloads: 6710 },
  { title: "Incident Response Runbook v3", type: "Runbook", year: 2026, pages: 64, downloads: 5122 },
];

const networkAlerts = [
  { icon: "🌐", text: "New PoP activated in Berlin — European latency down 18%", time: "2h ago", type: "discovery" },
  { icon: "📡", text: "5G macro cluster commissioned in Dubai — coverage now live", time: "4h ago", type: "research" },
  { icon: "✅", text: "São Paulo Exchange passed final commissioning audit", time: "Yesterday", type: "complete" },
  { icon: "⚠️", text: "Fiber cut detected near Lagos Ring — traffic rerouted via backup path", time: "Yesterday", type: "alert" },
  { icon: "🔧", text: "Legacy SONET node in Chicago flagged for decommission", time: "2d ago", type: "update" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", id: "dashboard" },
  { icon: "🌐", label: "Network Sites", id: "sites" },
  { icon: "🛠", label: "Field Teams", id: "teams" },
  { icon: "📦", label: "Assets", id: "assets" },
  { icon: "📊", label: "Reports", id: "reports" },
  { icon: "🗓️", label: "Schedule", id: "schedule" },
  { icon: "💰", label: "Budget", id: "budget" },
  { icon: "📚", label: "Documentation", id: "documentation" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const statusColors = {
  Live: "status-active",
  Deploying: "status-field",
  Decommissioned: "status-complete",
  "Under Review": "status-review",
};

const conditionColor = { Excellent: "#22c55e", Good: "#f59e0b", "Needs Repair": "#ef4444" };
const paperStatusColor = { Published: "#22c55e", "In Review": "#f59e0b", "In Draft": "#818cf8" };
const scheduleTypeColor = { urgent: "#ef4444", normal: "#60a5fa", meeting: "#818cf8" };

function fmt(n) { return "$" + n.toLocaleString(); }

// ─── PAGE COMPONENTS ───────────────────────────────────────────────

function DashboardPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "🌐", delta: "+3 this month", value: "24", label: "Active Network Sites", bar: 72, accent: true },
          { icon: "📦", delta: "+512 this week", value: "18,240", label: "Devices Provisioned", bar: 64 },
          { icon: "💰", delta: "On track", value: "$18.4M", label: "Infrastructure Budget", bar: 88 },
          { icon: "🌍", delta: "+2 this quarter", value: "27", label: "Countries Served", bar: 90 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span><span className="stat-delta up">{s.delta}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>

      <section className="mid-grid">
        <div className="card">
          <div className="card-header">
            <div><h2 className="card-title">Active Network Sites</h2><p className="card-sub">Current rollout and live-site overview</p></div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>Target Date</th><th>Budget</th></tr></thead>
              <tbody>
                {networkSitesData.slice(0, 5).map(t => (
                  <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                    <td><div className="t-name">{t.name}</div><div className="t-sub">{t.location} · {t.manager}</div></td>
                    <td><span className="region-tag" style={{ color: siteAccents[t.region], borderColor: siteAccents[t.region], background: `${siteAccents[t.region]}1f` }}>{t.region}</span></td>
                    <td className="type-col">{t.type}</td>
                    <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                    <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="progress-pct">{t.progress}%</span></div></td>
                    <td className="date-col">{t.targetDate}</td>
                    <td className="budget-col">{t.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Network Alerts</h2><p className="card-sub">Live operations feed</p></div></div>
          <ul className="activity-list">
            {networkAlerts.map((a, i) => (
              <li key={i} className={`activity-item act-${a.type}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="act-icon">{a.icon}</span>
                <div><p className="act-text">{a.text}</p><span className="act-time">{a.time}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Field Team</h2><p className="card-sub">Active technicians</p></div></div>
          <ul className="team-list">
            {fieldTechnicians.slice(0, 4).map((m, i) => (
              <li key={i} className="team-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="member-avatar">{m.avatar}<span className={`online-dot dot-${m.status}`} /></div>
                <div className="member-info"><div className="member-name">{m.name}</div><div className="member-role">{m.role}</div></div>
                <div className="member-projects"><span className="proj-count">{m.experience}</span><span className="proj-label">yrs</span></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Upcoming Deadlines</h2><p className="card-sub">Next 60 days</p></div></div>
          <ul className="milestone-list">
            {[
              { site: "Austin Metro Exchange", event: "Router firmware upgrade — Phase 2", date: "Jun 21", done: false, urgent: true },
              { site: "Berlin Fiber PoP", event: "Splice tray inspection", date: "Jun 25", done: false, urgent: false },
              { site: "Singapore Landing", event: "Repeater diagnostics", date: "Jul 2", done: false, urgent: false },
              { site: "Dubai Cell Cluster", event: "RF re-tuning — Final review", date: "Aug 05", done: false, urgent: false },
              { site: "Singapore Subsea Landing", event: "Commissioning report submitted", date: "Jun 14", done: true, urgent: false },
            ].map((m, i) => (
              <li key={i} className={`milestone-item ${m.done ? "ms-done" : ""} ${m.urgent ? "ms-urgent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="ms-date"><span>{m.date.split(" ")[0]}</span><span>{m.date.split(" ")[1]}</span></div>
                <div className="ms-line"><div className="ms-dot" /></div>
                <div className="ms-body"><div className="ms-event">{m.event}</div><div className="ms-project">{m.site}</div></div>
                {m.urgent && <span className="ms-tag">Urgent</span>}
                {m.done && <span className="ms-tag ms-done-tag">Done</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="card-header"><div><h2 className="card-title">Site Distribution</h2><p className="card-sub">By region</p></div></div>
          <div className="donut-chart" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#14141c" strokeWidth="16" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#60a5fa" strokeWidth="16" strokeDasharray="86 216" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#818cf8" strokeWidth="16" strokeDasharray="43 216" strokeDashoffset="-86" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#22d3ee" strokeWidth="16" strokeDasharray="43 216" strokeDashoffset="-129" strokeLinecap="round" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="#34d399" strokeWidth="16" strokeDasharray="43 216" strokeDashoffset="-172" strokeLinecap="round" />
              <text x="60" y="56" textAnchor="middle" className="donut-num">7</text>
              <text x="60" y="68" textAnchor="middle" className="donut-label">Sites</text>
            </svg>
          </div>
          <ul className="legend-list">
            {[
              { color: "#60a5fa", label: "North America", count: 2 },
              { color: "#818cf8", label: "Europe", count: 1 },
              { color: "#22d3ee", label: "APAC", count: 1 },
              { color: "#34d399", label: "LATAM", count: 1 },
              { color: "#f59e0b", label: "MEA", count: 2 },
            ].map((l, i) => (
              <li key={i} className="legend-item" onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <span className="legend-dot" style={{ background: l.color }} />
                <span className="legend-label">{l.label}</span>
                <span className="legend-count">{l.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function SitesPage({ navigate }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Live", "Deploying", "Under Review", "Decommissioned"];
  const filtered = filter === "All" ? networkSitesData : networkSitesData.filter(e => e.status === filter);
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "🌐", value: networkSitesData.length, label: "Total Sites", bar: 100 },
          { icon: "🟢", value: networkSitesData.filter(e => e.status === "Live").length, label: "Live Now", bar: 60, accent: true },
          { icon: "📍", value: networkSitesData.filter(e => e.status === "Deploying").length, label: "Deploying", bar: 40 },
          { icon: "🗄️", value: networkSitesData.filter(e => e.status === "Decommissioned").length, label: "Decommissioned", bar: 20 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header">
          <div><h2 className="card-title">All Network Sites</h2><p className="card-sub">Full list of infrastructure sites</p></div>
          <div className="filter-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {statuses.map(s => (
              <button key={s} className={`btn-outline ${filter === s ? "btn-active" : ""}`} onClick={() => setFilter(s)}
                style={filter === s ? { borderColor: "#60a5fa", color: "#60a5fa" } : {}}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Site</th><th>Region</th><th>Type</th><th>Status</th><th>Progress</th><th>Manager</th><th>Target Date</th><th>Budget</th></tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td><div className="t-name">{t.name}</div><div className="t-sub">{t.location}</div></td>
                  <td><span className="region-tag" style={{ color: siteAccents[t.region], borderColor: siteAccents[t.region], background: `${siteAccents[t.region]}1f` }}>{t.region}</span></td>
                  <td className="type-col">{t.type}</td>
                  <td><span className={`status-badge ${statusColors[t.status]}`}>{t.status}</span></td>
                  <td><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div><span className="progress-pct">{t.progress}%</span></div></td>
                  <td className="date-col" style={{ fontSize: 12 }}>{t.manager}</td>
                  <td className="date-col">{t.targetDate}</td>
                  <td className="budget-col">{t.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TeamsPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "👥", value: fieldTechnicians.length, label: "Technicians", bar: 80 },
          { icon: "🟢", value: fieldTechnicians.filter(m => m.status === "active").length, label: "Online Now", bar: 85, accent: true },
          { icon: "📋", value: fieldTechnicians.reduce((a, m) => a + m.projects, 0), label: "Active Tickets", bar: 70 },
          { icon: "🏅", value: Math.round(fieldTechnicians.reduce((a, m) => a + m.experience, 0) / fieldTechnicians.length), label: "Avg. Yrs Exp.", bar: 75 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Field Technicians</h2><p className="card-sub">Full team directory</p></div></div>
        <div className="team-grid">
          {fieldTechnicians.map((m, i) => (
            <div key={i} className="team-card"
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div className="member-avatar" style={{ width: 46, height: 46, fontSize: 14 }}>{m.avatar}<span className={`online-dot dot-${m.status}`} /></div>
                <div>
                  <div className="member-name" style={{ fontSize: 15 }}>{m.name}</div>
                  <div className="member-role">{m.role}</div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.55)", lineHeight: 1.9 }}>
                <div>🎓 {m.speciality}</div>
                <div>✉️ {m.email}</div>
                <div>📂 {m.projects} active ticket{m.projects !== 1 ? "s" : ""} · {m.experience} yrs experience</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AssetsPage({ navigate }) {
  const [search, setSearch] = useState("");
  const filtered = networkAssets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.site.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📦", value: "18,240", label: "Total Devices", bar: 75, accent: true },
          { icon: "🔧", value: "312", label: "Under Repair", bar: 25 },
          { icon: "🌐", value: "9,800", label: "Deployed", bar: 80 },
          { icon: "🗑️", value: "76", label: "Retired", bar: 15 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header">
          <div><h2 className="card-title">Asset Registry</h2><p className="card-sub">Equipment tracked across all sites</p></div>
          <div className="search-box" style={{ flex: "0 0 auto" }}>
            <span className="search-icon">🔍</span>
            <input placeholder="Search assets…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Asset</th><th>Site</th><th>Category</th><th>Installed</th><th>Condition</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                  <td className="type-col" style={{ fontSize: 11.5, fontFamily: "monospace" }}>{a.id}</td>
                  <td><div className="t-name">{a.name}</div><div className="t-sub">{a.region}</div></td>
                  <td className="date-col">{a.site}</td>
                  <td className="type-col" style={{ fontSize: 12 }}>{a.category}</td>
                  <td className="date-col">{a.installDate}</td>
                  <td><span style={{ color: conditionColor[a.condition], fontWeight: 700, fontSize: 12 }}>{a.condition}</span></td>
                  <td><span className="status-badge status-review" style={{ background: a.status === "Deployed" ? "rgba(34,197,94,0.14)" : a.status === "In Storage" ? "rgba(96,165,250,0.14)" : "rgba(245,158,11,0.14)", color: a.status === "Deployed" ? "#86efac" : a.status === "In Storage" ? "#93c5fd" : "#fcd34d" }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ReportsPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📄", value: performanceReports.length, label: "Active Reports", bar: 80, accent: true },
          { icon: "✅", value: performanceReports.filter(p => p.status === "Published").length, label: "Published", bar: 70 },
          { icon: "🔍", value: performanceReports.filter(p => p.status === "In Review").length, label: "In Review", bar: 20 },
          { icon: "📊", value: performanceReports.reduce((a, p) => a + p.citations, 0), label: "Total Views", bar: 60 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Performance Reports</h2><p className="card-sub">Network analysis and technical write-ups</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {performanceReports.map((p, i) => (
            <div key={i} className="research-card"
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.35)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.6)", marginBottom: 6 }}>{p.authors}</div>
                  <div style={{ fontSize: 12, color: "rgba(245,245,247,0.45)" }}>{p.journal} · {p.year}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <span style={{ background: paperStatusColor[p.status] + "22", color: paperStatusColor[p.status], borderRadius: 999, padding: "3px 10px", fontSize: 11.5, fontWeight: 700 }}>{p.status}</span>
                  {p.citations > 0 && <span style={{ fontSize: 12, color: "rgba(245,245,247,0.5)" }}>📊 {p.citations} views</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SchedulePage({ navigate }) {
  return (
    <>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Maintenance & Rollout Calendar</h2><p className="card-sub">All upcoming deadlines and events</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {maintenanceSchedule.map((ev, i) => (
            <div key={i} className="schedule-row"
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ width: 50, flexShrink: 0, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: scheduleTypeColor[ev.type], textTransform: "uppercase", letterSpacing: "0.04em" }}>{ev.date.split(" ")[0]}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{ev.date.split(" ")[1]}</div>
              </div>
              <div style={{ width: 3, alignSelf: "stretch", borderRadius: 999, background: scheduleTypeColor[ev.type], opacity: 0.7, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{ev.event}</div>
                <div style={{ fontSize: 12, color: "rgba(245,245,247,0.55)", marginTop: 3 }}>📍 {ev.site}</div>
              </div>
              {ev.type === "urgent" && <span className="evt-tag" style={{ background: "rgba(239,68,68,0.16)", color: "#fca5a5" }}>Urgent</span>}
              {ev.type === "meeting" && <span className="evt-tag" style={{ background: "rgba(129,140,248,0.2)", color: "#a5b4fc" }}>Meeting</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BudgetPage({ navigate }) {
  const totalAllocated = infrastructureBudget.reduce((a, b) => a + b.allocated, 0);
  const totalSpent = infrastructureBudget.reduce((a, b) => a + b.spent, 0);
  const remaining = totalAllocated - totalSpent;
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "💰", value: fmt(totalAllocated), label: "Total Allocated", bar: 100, accent: true },
          { icon: "📉", value: fmt(totalSpent), label: "Total Spent", bar: Math.round((totalSpent / totalAllocated) * 100) },
          { icon: "✅", value: fmt(remaining), label: "Remaining", bar: Math.round((remaining / totalAllocated) * 100) },
          { icon: "📊", value: Math.round((totalSpent / totalAllocated) * 100) + "%", label: "Utilisation Rate", bar: Math.round((totalSpent / totalAllocated) * 100) },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Budget by Site</h2><p className="card-sub">Allocation vs spend</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {infrastructureBudget.map((b, i) => {
            const pct = Math.round((b.spent / b.allocated) * 100);
            return (
              <div key={i} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
                <div className="budget-row-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{b.site}</span>
                    <span className="region-tag" style={{ marginLeft: 10, color: siteAccents[b.region], borderColor: siteAccents[b.region], background: `${siteAccents[b.region]}1f`, fontSize: 11 }}>{b.region}</span>
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

function DocumentationPage({ navigate }) {
  return (
    <>
      <section className="stats-grid">
        {[
          { icon: "📚", value: documentation.length, label: "Documents", bar: 80, accent: true },
          { icon: "📥", value: documentation.reduce((a, p) => a + p.downloads, 0).toLocaleString(), label: "Total Downloads", bar: 90 },
          { icon: "📄", value: documentation.reduce((a, p) => a + p.pages, 0).toLocaleString(), label: "Total Pages", bar: 65 },
          { icon: "🗓️", value: "2026", label: "Latest Year", bar: 100 },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.accent ? "stat-accent" : ""}`} onClick={() => navigate("/404")} style={{ cursor: "pointer" }}>
            <div className="stat-top"><span className="stat-icon">{s.icon}</span></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.bar}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Documentation Library</h2><p className="card-sub">Manuals, guides, and reports</p></div></div>
        <div className="pub-grid">
          {documentation.map((pub, i) => (
            <div key={i} className="pub-card"
              onClick={() => navigate("/404")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>📖</div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 6, lineHeight: 1.4 }}>{pub.title}</div>
              <div style={{ fontSize: 12, color: "rgba(245,245,247,0.5)", marginBottom: 14 }}>{pub.type} · {pub.year} · {pub.pages} pages</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 700 }}>📥 {pub.downloads.toLocaleString()} downloads</span>
                <button className="btn-outline" style={{ padding: "5px 12px", fontSize: 11.5 }} onClick={(e) => { e.stopPropagation(); navigate("/404"); }}>View</button>
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
    <div onClick={() => onChange(!value)} style={{ width: 42, height: 24, borderRadius: 999, background: value ? "#60a5fa" : "rgba(255,255,255,0.12)", cursor: "pointer", transition: "all 0.3s ease", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: value ? 20 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );

  return (
    <>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Account</h2><p className="card-sub">Your profile information</p></div></div>
        <div className="account-row" style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20, flexWrap: "wrap" }}>
          <img src="https://placehold.co/64x64/0a0a12/60a5fa?text=You" alt="avatar" style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(96,165,250,0.4)" }} />
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>Alex Morgan</div>
            <div style={{ fontSize: 13, color: "rgba(245,245,247,0.55)", marginTop: 2 }}>Network Operations Director · alex.morgan@stackly.net</div>
            <div style={{ fontSize: 12, color: "#60a5fa", marginTop: 4 }}>🌐 5 years with Stackly</div>
          </div>
        </div>
        <button className="btn-outline" style={{ borderColor: "#60a5fa", color: "#60a5fa" }} onClick={() => navigate("/404")}>Edit Profile</button>
      </div>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Preferences</h2><p className="card-sub">Notifications and display</p></div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Push Notifications", sub: "Receive alerts for outages and deadline changes", value: notifications, set: setNotifications },
            { label: "Weekly Email Digest", sub: "Summary of network activity sent every Monday", value: emailDigest, set: setEmailDigest },
            { label: "Dark Mode", sub: "Use dark colour scheme across the dashboard", value: darkMode, set: setDarkMode },
          ].map((item, i) => (
            <div key={i} className="pref-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>{item.label}</div>
                <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.5)", marginTop: 2 }}>{item.sub}</div>
              </div>
              <Toggle value={item.value} onChange={item.set} />
            </div>
          ))}
          <div className="pref-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18 }}>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: 13.5 }}>Language</div>
              <div style={{ fontSize: 12.5, color: "rgba(245,245,247,0.5)", marginTop: 2 }}>Interface display language</div>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "#fff", borderRadius: 8, padding: "7px 12px", fontSize: 13, outline: "none" }}>
              {["English", "French", "Spanish", "Arabic", "Portuguese"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div><h2 className="card-title">Danger Zone</h2><p className="card-sub">Irreversible account actions</p></div></div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn-outline" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }} onClick={() => navigate("/404")}>Reset Password</button>
          <button className="btn-outline" style={{ borderColor: "rgba(239,68,68,0.4)", color: "#fca5a5" }} onClick={() => navigate("/404")}>Delete Account</button>
        </div>
      </div>
    </>
  );
}

const pageMap = {
  dashboard: { title: "Dashboard", sub: "", component: DashboardPage },
  sites: { title: "Network Sites", sub: "All live and in-progress infrastructure sites.", component: SitesPage },
  teams: { title: "Field Teams", sub: "Manage your technicians and field directors.", component: TeamsPage },
  assets: { title: "Assets", sub: "Registry of all tracked network equipment.", component: AssetsPage },
  reports: { title: "Reports", sub: "Performance analysis and technical write-ups.", component: ReportsPage },
  schedule: { title: "Schedule", sub: "Deadlines, maintenance windows, and events.", component: SchedulePage },
  budget: { title: "Budget", sub: "Infrastructure allocation and spend tracking.", component: BudgetPage },
  documentation: { title: "Documentation", sub: "Manuals, guides, and annual reports.", component: DocumentationPage },
  settings: { title: "Settings", sub: "Account preferences and configuration.", component: SettingsPage },
};

export default function Dashboard() {
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

  return (
    <div className="dashboard-root">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img src={logo} alt="Stackly" className="brand-logo-img" />
          </div>
          <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">✕</button>
        </div>
        <div className="sidebar-section-label">MAIN MENU</div>
        <nav className="sidebar-nav">
          {navItems.slice(0, 6).map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "sites" && <span className="nav-badge">7</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-section-label">MANAGEMENT</div>
        <nav className="sidebar-nav">
          {navItems.slice(6).map(item => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? "nav-active" : ""}`} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="logout-full-btn" style={{ marginTop: "auto" }} onClick={() => navigate("/login")}>
          <span>↪</span> Logout
        </button>
      </aside>

      <main className="main-content" ref={mainRef}>
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <div className="page-title">
              <h1>{currentPage.title}</h1>
              <p>{currentPage.sub}</p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search sites, assets, technicians…" />
            </div>
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate("/404")}>🔔<span className="notif-dot" /></button>
          </div>
        </header>

        <div className="content-area">
          <PageComponent navigate={navigate} />
        </div>
      </main>
    </div>
  );
}