import React, { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const TrendingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];
const TRENDING  = ["UI/UX Designer", "React Developer", "Data Scientist", "Product Manager"];
const COMPANIES = ["Microsoft", "Walmart", "Accenture", "Samsung", "Amazon", "Adobe"];

const STATS = [
  { icon: <BriefcaseIcon />, value: "10K+",  label: "Live Jobs",        color: "#2563eb" },
  { icon: <UsersIcon />,     value: "2,400", label: "Hired This Month", color: "#16a34a" },
  { icon: <TrendingIcon />,  value: "340",   label: "Added Today",      color: "#d97706" },
  { icon: <StarIcon />,      value: "98%",   label: "Verified",         color: "#7c3aed" },
];

// ─── Counter ──────────────────────────────────────────────────────────────────
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return count;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef    = useRef(null);
  const locationRef = useRef(null);
  const [activeTypes, setActiveTypes] = useState([]);
  const [titleFocus, setTitleFocus]       = useState(false);
  const [locationFocus, setLocationFocus] = useState(false);
  const counter = useCounter(10284);

  const toggle = (t) =>
    setActiveTypes((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const handleSearch = () => {
    setSearchFilter({
      title:    titleRef.current?.value ?? "",
      location: locationRef.current?.value ?? "",
      types:    activeTypes,
    });
    setIsSearched(true);
  };

  const fillSearch = (term) => { if (titleRef.current) titleRef.current.value = term; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .hero-wrap * { box-sizing: border-box; }
        .hero-wrap {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f8fafc;
          width: 100%;
        }

        /* ── Entrance animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu0 { animation: fadeUp 0.5s 0.05s ease both; }
        .fu1 { animation: fadeUp 0.5s 0.12s ease both; }
        .fu2 { animation: fadeUp 0.5s 0.20s ease both; }
        .fu3 { animation: fadeUp 0.5s 0.28s ease both; }
        .fu4 { animation: fadeUp 0.5s 0.36s ease both; }
        .fu5 { animation: fadeUp 0.5s 0.44s ease both; }

        /* ── Search inputs ── */
        .hero-input {
          border: none; outline: none; background: transparent;
          font-family: 'Inter', sans-serif; font-size: 14px;
          color: #111827; width: 100%; padding: 0;
        }
        .hero-input::placeholder { color: #9ca3af; }

        /* ── Search field wrapper ── */
        .hero-field {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; flex: 1;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px; background: #fff;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .hero-field.focused {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .hero-field svg { color: #9ca3af; flex-shrink: 0; }

        /* ── Search button ── */
        .hero-btn {
          background: #1d4ed8; color: #fff; border: none;
          border-radius: 10px; padding: 14px 28px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(29,78,216,0.35);
        }
        .hero-btn:hover  { background: #1e40af; box-shadow: 0 6px 20px rgba(29,78,216,0.45); }
        .hero-btn:active { transform: scale(0.97); }

        /* ── Type pills ── */
        .type-pill {
          border: 1.5px solid #e5e7eb; border-radius: 20px;
          padding: 6px 14px; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
          background: #fff; color: #6b7280;
          font-family: 'Inter', sans-serif;
        }
        .type-pill:hover  { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
        .type-pill.active { background: #2563eb; border-color: #2563eb; color: #fff; }

        /* ── Trending tag ── */
        .trend-tag {
          border: 1.5px solid #e5e7eb; border-radius: 6px;
          padding: 4px 10px; font-size: 12px; color: #6b7280;
          background: #fff; cursor: pointer;
          transition: all 0.15s; font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .trend-tag:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }

        /* ── Stat card ── */
        .stat-card {
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 12px; padding: 14px 20px;
          display: flex; align-items: center; gap: 12px;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .stat-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          border-color: #bfdbfe;
          transform: translateY(-2px);
        }
        .stat-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-val { font-size: 18px; font-weight: 800; color: #111827; line-height: 1; }
        .stat-lbl { font-size: 11.5px; color: #6b7280; margin-top: 2px; }

        /* ── Trusted strip ── */
        .trusted-strip {
          background: #fff; border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          padding: 18px 40px;
          display: flex; align-items: center; gap: 32px;
          overflow: hidden;
        }
        .trusted-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9ca3af;
          white-space: nowrap; flex-shrink: 0;
        }
        .trusted-divider { width: 1px; height: 20px; background: #e5e7eb; flex-shrink: 0; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-row { display: flex; gap: 48px; animation: marquee 22s linear infinite; width: max-content; }
        .marquee-row:hover { animation-play-state: paused; }

        .company-logo {
          font-size: 13px; font-weight: 700; letter-spacing: 0.02em;
          color: #d1d5db; white-space: nowrap;
          transition: color 0.2s; cursor: default;
        }
        .company-logo:hover { color: #6b7280; }

        /* ── Live badge pulse ── */
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="hero-wrap">

        {/* ══════════════════ HERO SECTION ══════════════════ */}
        <section style={{
          background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 50%, #f0fdf4 100%)",
          padding: "72px 24px 64px",
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>

            {/* ── Live badge ── */}
            <div className="fu0" style={{ marginBottom: "20px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "#eff6ff", border: "1.5px solid #bfdbfe",
                borderRadius: "20px", padding: "5px 14px",
                fontSize: "12px", fontWeight: 600, color: "#2563eb",
              }}>
                <span className="pulse-dot" style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#22c55e", flexShrink: 0,
                }} />
                {counter.toLocaleString()}+ opportunities available right now
              </span>
            </div>

            {/* ── Headline ── */}
            <h1 className="fu1" style={{
              fontSize: "clamp(36px, 5.5vw, 58px)", fontWeight: 800,
              color: "#0f172a", lineHeight: 1.1, marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}>
              Find the job that<br />
              <span style={{ color: "#2563eb" }}>fits your life</span>
            </h1>

            {/* ── Subtext ── */}
            <p className="fu2" style={{
              fontSize: "15px", color: "#64748b", lineHeight: 1.7,
              maxWidth: "520px", marginBottom: "36px",
            }}>
              Explore verified opportunities from top companies and take the next step in your career — all in one place.
            </p>

            {/* ── Search Bar ── */}
            <div className="fu3" style={{ maxWidth: "760px" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                {/* Job title */}
                <div className={`hero-field${titleFocus ? " focused" : ""}`} style={{ minWidth: "220px" }}>
                  <SearchIcon />
                  <input
                    ref={titleRef}
                    type="text"
                    className="hero-input"
                    placeholder="Job title or keyword"
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(false)}
                  />
                </div>

                {/* Location */}
                <div className={`hero-field${locationFocus ? " focused" : ""}`} style={{ minWidth: "180px" }}>
                  <PinIcon />
                  <input
                    ref={locationRef}
                    type="text"
                    className="hero-input"
                    placeholder="City or remote"
                    onFocus={() => setLocationFocus(true)}
                    onBlur={() => setLocationFocus(false)}
                  />
                </div>

                {/* Button */}
                <button className="hero-btn" onClick={handleSearch}>
                  Search Jobs
                </button>
              </div>

              {/* ── Job type filters ── */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", alignSelf: "center", marginRight: "2px" }}>
                  Type:
                </span>
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    className={`type-pill${activeTypes.includes(t) ? " active" : ""}`}
                    onClick={() => toggle(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* ── Trending ── */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>
                  <TrendingIcon /> Trending:
                </span>
                {TRENDING.map((term) => (
                  <button key={term} className="trend-tag" onClick={() => fillSearch(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>

           
          </div>
        </section>

        {/* ══════════════════ TRUSTED BY ══════════════════ */}
        <div className="trusted-strip fu5">
          <span className="trusted-label">Trusted by</span>
          <div className="trusted-divider" />
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="marquee-row">
              {[...COMPANIES, ...COMPANIES].map((name, i) => (
                <span key={i} className="company-logo">{name}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}