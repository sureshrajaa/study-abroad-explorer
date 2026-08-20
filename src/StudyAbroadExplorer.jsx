import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const INK = "#0F1B2D";
const PANEL = "#16243A";
const PANEL_2 = "#1D2E48";
const PAPER = "#F2EDE1";
const MUTED = "#8B96A8";
const AMBER = "#E8A33D";
const BORDER = "#2A3A56";

const COUNTRY_STYLES = {
  "United States": { code: "US", color: "#E8A33D" },
  "United Kingdom": { code: "UK", color: "#4FB8A6" },
  Canada: { code: "CA", color: "#E2635A" },
  Germany: { code: "DE", color: "#8FBF6B" },
  Australia: { code: "AU", color: "#B98FE0" },
};

const RATES_TO_USD = { USD: 1, GBP: 1.27, EUR: 1.09, CAD: 0.73, AUD: 0.66 };

const RAW = [
  { name: "Duke University", country: "United States", ranking: "#61", tuition_amount: 65541.0, tuition_currency: "USD" },
  { name: "University of Virginia", country: "United States", ranking: "#260", tuition_amount: 44890.0, tuition_currency: "USD" },
  { name: "The University of Arizona", country: "United States", ranking: "#293rd", tuition_amount: 37722.0, tuition_currency: "USD" },
  { name: "Marist University", country: "United States", ranking: "#301-350", tuition_amount: 42741.0, tuition_currency: "USD" },
  { name: "Thomas Jefferson University", country: "United States", ranking: "#351-400", tuition_amount: 35757.0, tuition_currency: "USD" },
  { name: "Northeastern University", country: "United States", ranking: "#396th", tuition_amount: 34929.0, tuition_currency: "USD" },
  { name: "Colorado State University", country: "United States", ranking: "#442", tuition_amount: 30943.0, tuition_currency: "USD" },
  { name: "The University of Kansas", country: "United States", ranking: "#452nd", tuition_amount: 26203.0, tuition_currency: "USD" },
  { name: "Illinois Institute of Technology", country: "United States", ranking: "#601-610", tuition_amount: 38127.0, tuition_currency: "USD" },
  { name: "Lehigh University", country: "United States", ranking: "#641-650th", tuition_amount: 52995.0, tuition_currency: "USD" },
  { name: "The University of Manchester", country: "United Kingdom", ranking: "#34", tuition_amount: 30110.0, tuition_currency: "GBP" },
  { name: "University of Leeds", country: "United Kingdom", ranking: "#75", tuition_amount: 28887.0, tuition_currency: "GBP" },
  { name: "Durham University", country: "United Kingdom", ranking: "#78", tuition_amount: 27564.0, tuition_currency: "GBP" },
  { name: "University of Southampton", country: "United Kingdom", ranking: "#88", tuition_amount: 20212.0, tuition_currency: "USD", note: "currency shown as listed on source" },
  { name: "Newcastle University", country: "United Kingdom", ranking: "#137", tuition_amount: 27631.0, tuition_currency: "GBP" },
  { name: "Lancaster University", country: "United Kingdom", ranking: "#141", tuition_amount: 21450.0, tuition_currency: "EUR", note: "currency shown as listed on source" },
  { name: "Royal Holloway University of London", country: "United Kingdom", ranking: "#143", tuition_amount: 23004.0, tuition_currency: "GBP" },
  { name: "Cardiff University", country: "United Kingdom", ranking: "#154", tuition_amount: 25886.0, tuition_currency: "USD", note: "currency shown as listed on source" },
  { name: "University of Exeter", country: "United Kingdom", ranking: "#155", tuition_amount: 27535.0, tuition_currency: "GBP" },
  { name: "Cardiff Metropolitan University", country: "United Kingdom", ranking: "#159", tuition_amount: 13320.0, tuition_currency: "GBP" },
  { name: "OCAD University", country: "Canada", ranking: "#50-100", tuition_amount: 29819.0, tuition_currency: "CAD" },
  { name: "Mount Saint Vincent University", country: "Canada", ranking: "#146", tuition_amount: 17863.0, tuition_currency: "CAD" },
  { name: "Simon Fraser University", country: "Canada", ranking: "#318", tuition_amount: 24009.0, tuition_currency: "CAD" },
  { name: "Northeastern University, Toronto", country: "Canada", ranking: "#375", tuition_amount: 17828.0, tuition_currency: "CAD" },
  { name: "Concordia University of Edmonton", country: "Canada", ranking: "#387", tuition_amount: 20463.0, tuition_currency: "CAD" },
  { name: "University of Guelph", country: "Canada", ranking: "#486", tuition_amount: 26636.0, tuition_currency: "CAD" },
  { name: "Memorial University of Newfoundland (MUN)", country: "Canada", ranking: "#501-600", tuition_amount: 14844.0, tuition_currency: "CAD" },
  { name: "Carleton University", country: "Canada", ranking: "#601-650", tuition_amount: 17979.0, tuition_currency: "CAD" },
  { name: "University of Manitoba", country: "Canada", ranking: "#651-700th", tuition_amount: 13138.0, tuition_currency: "CAD" },
  { name: "Brock University", country: "Canada", ranking: "#1001-1200", tuition_amount: 31750.0, tuition_currency: "CAD" },
  { name: "Technical University of Munich (TUM)", country: "Germany", ranking: "=22", tuition_amount: 2000.0, tuition_currency: "EUR", note: "€2,000-3,000 UG, €4,000-6,000 PG" },
  { name: "LMU Munich", country: "Germany", ranking: "=58", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "Heidelberg University", country: "Germany", ranking: "80", tuition_amount: 1500.0, tuition_currency: "EUR" },
  { name: "Free University of Berlin", country: "Germany", ranking: "=88", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "Karlsruhe Institute of Technology (KIT)", country: "Germany", ranking: "=98", tuition_amount: 1500.0, tuition_currency: "EUR" },
  { name: "RWTH Aachen University", country: "Germany", ranking: "=105", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "Humboldt University of Berlin", country: "Germany", ranking: "130", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "Technical University of Berlin", country: "Germany", ranking: "145", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "University of Hamburg", country: "Germany", ranking: "193", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "University of Freiburg", country: "Germany", ranking: "201", tuition_amount: 1500.0, tuition_currency: "EUR" },
  { name: "University of Bonn", country: "Germany", ranking: "207", tuition_amount: 0.0, tuition_currency: "EUR" },
  { name: "University of Tübingen", country: "Germany", ranking: "215", tuition_amount: 1500.0, tuition_currency: "EUR" },
  { name: "The University of Sydney", country: "Australia", ranking: "#18", tuition_amount: 51828.0, tuition_currency: "AUD" },
  { name: "Australian National University", country: "Australia", ranking: "#30", tuition_amount: 52732.0, tuition_currency: "AUD" },
  { name: "Monash University", country: "Australia", ranking: "#37", tuition_amount: 50036.0, tuition_currency: "AUD" },
  { name: "The University of Western Australia", country: "Australia", ranking: "#77", tuition_amount: 44245.0, tuition_currency: "AUD" },
  { name: "Adelaide University", country: "Australia", ranking: "#82", tuition_amount: 48121.0, tuition_currency: "AUD" },
  { name: "RMIT University", country: "Australia", ranking: "#123", tuition_amount: 46785.0, tuition_currency: "AUD" },
  { name: "Macquarie University", country: "Australia", ranking: "#133", tuition_amount: 40931.0, tuition_currency: "AUD" },
  { name: "University of Wollongong (UOW)", country: "Australia", ranking: "#167", tuition_amount: 33457.0, tuition_currency: "AUD" },
  { name: "Deakin University", country: "Australia", ranking: "#197", tuition_amount: 42137.0, tuition_currency: "AUD" },
];

function rankNumber(r) {
  const m = String(r).replace(/[=#]/g, "").match(/\d+/);
  return m ? parseInt(m[0], 10) : 9999;
}

function usdApprox(amount, currency) {
  const rate = RATES_TO_USD[currency] ?? 1;
  return Math.round(amount * rate);
}

const DATA = RAW.map((u) => ({
  ...u,
  usd: usdApprox(u.tuition_amount, u.tuition_currency),
  rankNum: rankNumber(u.ranking),
}));

function statusBadge(usd) {
  if (usd === 0) return { label: "TUITION FREE", color: "#8FBF6B" };
  if (usd < 15000) return { label: "BUDGET", color: "#4FB8A6" };
  if (usd < 35000) return { label: "STANDARD", color: AMBER };
  return { label: "PREMIUM", color: "#E2635A" };
}

const fmt = (n) => "$" + n.toLocaleString("en-US");

function FlipValue({ value }) {
  const [tick, setTick] = useState(0);
  const prevValue = React.useRef(value);

  React.useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value;
      setTick((t) => t + 1);
    }
  }, [value]);

  return (
    <span style={{ display: "inline-block", perspective: "220px" }}>
      <span
        key={tick}
        style={{
          display: "inline-block",
          transformOrigin: "50% 50%",
          animation: tick > 0 ? "flipCell 450ms ease-out" : "none",
        }}
      >
        {value}
      </span>
    </span>
  );
}

const RANKING_OPTIONS = [
  { value: "any", label: "Any ranking" },
  { value: "100", label: "Top 100" },
  { value: "300", label: "Top 300" },
  { value: "500", label: "Top 500" },
];

export default function StudyAbroadExplorer() {
  const allCountries = Object.keys(COUNTRY_STYLES);
  const [view, setView] = useState("browse");
  const [selected, setSelected] = useState(allCountries);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const maxUsd = Math.max(...DATA.map((d) => d.usd));
  const [budget, setBudget] = useState(maxUsd);
  const [rankingFilter, setRankingFilter] = useState("any");
  const [tuitionFreeOnly, setTuitionFreeOnly] = useState(false);

  const toggleCountry = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const filtered = useMemo(() => {
    let rows = DATA.filter(
      (u) =>
        selected.includes(u.country) &&
        u.usd <= budget &&
        u.name.toLowerCase().includes(search.toLowerCase()) &&
        (rankingFilter === "any" || u.rankNum <= Number(rankingFilter)) &&
        (!tuitionFreeOnly || u.usd === 0)
    );
    if (sortBy === "rank") rows.sort((a, b) => a.rankNum - b.rankNum);
    if (sortBy === "cost-asc") rows.sort((a, b) => a.usd - b.usd);
    if (sortBy === "cost-desc") rows.sort((a, b) => b.usd - a.usd);
    return rows;
  }, [selected, search, sortBy, budget, rankingFilter, tuitionFreeOnly]);

  const countryStats = allCountries.map((c) => {
    const rows = DATA.filter((d) => d.country === c);
    const usdVals = rows.map((r) => r.usd);
    const avg = Math.round(usdVals.reduce((s, v) => s + v, 0) / rows.length);
    const min = Math.min(...usdVals);
    const max = Math.max(...usdVals);
    const avgRank = Math.round(
      rows.reduce((s, r) => s + r.rankNum, 0) / rows.length
    );
    const freeCount = rows.filter((r) => r.usd === 0).length;
    return {
      country: c,
      code: COUNTRY_STYLES[c].code,
      color: COUNTRY_STYLES[c].color,
      count: rows.length,
      avg,
      min,
      max,
      avgRank,
      freeCount,
    };
  });
  const maxAvgAcrossCountries = Math.max(...countryStats.map((s) => s.avg));

  const avgUsd = filtered.length
    ? Math.round(filtered.reduce((s, u) => s + u.usd, 0) / filtered.length)
    : 0;
  const cheapest = filtered.length
    ? filtered.reduce((a, b) => (a.usd < b.usd ? a : b))
    : null;
  const priciest = filtered.length
    ? filtered.reduce((a, b) => (a.usd > b.usd ? a : b))
    : null;

  const chartData = allCountries.map((c) => {
    const rows = DATA.filter((d) => d.country === c);
    const avg = Math.round(rows.reduce((s, r) => s + r.usd, 0) / rows.length);
    return { country: COUNTRY_STYLES[c].code, avg, color: COUNTRY_STYLES[c].color };
  });

  return (
    <div
      style={{ background: INK, color: PAPER, minHeight: "100vh" }}
      className="w-full font-sans p-6 md:p-10"
    >
      <style>{`
        @keyframes flipCell {
          0% { transform: rotateX(-100deg); opacity: 0.3; color: #E8A33D; }
          55% { transform: rotateX(20deg); }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div
          style={{ borderBottom: `1px solid ${BORDER}` }}
          className="pb-6 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3"
        >
          <div>
            <div
              style={{ color: AMBER, letterSpacing: "0.2em" }}
              className="text-xs font-semibold uppercase mb-2"
            >
              Departures &middot; Fall Intake
            </div>
            <h1
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              STUDY ABROAD EXPLORER
            </h1>
            <p style={{ color: MUTED }} className="text-sm mt-2">
              {DATA.length} destinations across {allCountries.length} countries
            </p>
          </div>

          <div className="flex gap-2">
            {[
              ["browse", "Browse"],
              ["compare", "Compare countries"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                style={{
                  background: view === key ? AMBER : "transparent",
                  color: view === key ? INK : PAPER,
                  border: `1px solid ${view === key ? AMBER : BORDER}`,
                }}
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            ["SHOWING", filtered.length],
            ["AVG FARE", fmt(avgUsd)],
            ["CHEAPEST", cheapest ? fmt(cheapest.usd) : "-"],
            ["PRICIEST", priciest ? fmt(priciest.usd) : "-"],
          ].map(([label, val]) => (
            <div
              key={label}
              style={{ background: PANEL, border: `1px solid ${BORDER}` }}
              className="rounded-lg p-3"
            >
              <div
                style={{ color: MUTED, letterSpacing: "0.1em" }}
                className="text-xs uppercase mb-1"
              >
                {label}
              </div>
              <div
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                className="text-lg font-bold"
              >
                <FlipValue value={val} />
              </div>
            </div>
          ))}
        </div>

        {view === "compare" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {countryStats.map((s) => (
              <div
                key={s.country}
                style={{ background: PANEL, border: `1px solid ${BORDER}` }}
                className="rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        color: s.color,
                        border: `1px solid ${s.color}`,
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      }}
                      className="rounded px-2 py-1 text-xs font-bold"
                    >
                      {s.code}
                    </span>
                    <span className="font-semibold">{s.country}</span>
                  </div>
                  <span style={{ color: MUTED }} className="text-xs">
                    {s.count} universities
                  </span>
                </div>

                <div className="mb-3">
                  <div
                    style={{ background: INK, borderRadius: 4, height: 8 }}
                    className="w-full overflow-hidden"
                  >
                    <div
                      style={{
                        width: `${(s.avg / maxAvgAcrossCountries) * 100}%`,
                        background: s.color,
                        height: "100%",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <div style={{ color: MUTED }} className="text-xs uppercase">
                      Avg fare
                    </div>
                    <div
                      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      className="font-semibold"
                    >
                      {fmt(s.avg)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: MUTED }} className="text-xs uppercase">
                      Avg rank
                    </div>
                    <div
                      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      className="font-semibold"
                    >
                      #{s.avgRank}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: MUTED }} className="text-xs uppercase">
                      Range
                    </div>
                    <div
                      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      className="font-semibold"
                    >
                      {fmt(s.min)} - {fmt(s.max)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: MUTED }} className="text-xs uppercase">
                      Tuition-free
                    </div>
                    <div
                      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                      className="font-semibold"
                    >
                      {s.freeCount} of {s.count}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelected([s.country]);
                    setView("browse");
                  }}
                  style={{ border: `1px solid ${s.color}`, color: s.color }}
                  className="rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide w-full"
                >
                  Browse {s.code} universities
                </button>
              </div>
            ))}
          </div>
        )}

        {view === "browse" && (
        <>
        <div
          style={{ background: PANEL, border: `1px solid ${BORDER}` }}
          className="rounded-lg p-4 mb-6"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {allCountries.map((c) => {
              const active = selected.includes(c);
              const s = COUNTRY_STYLES[c];
              return (
                <button
                  key={c}
                  onClick={() => toggleCountry(c)}
                  style={{
                    background: active ? s.color : "transparent",
                    color: active ? INK : s.color,
                    border: `1px solid ${s.color}`,
                  }}
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                >
                  {s.code} &middot; {c}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by university name"
              style={{
                background: INK,
                border: `1px solid ${BORDER}`,
                color: PAPER,
              }}
              className="rounded px-3 py-2 text-sm w-full"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: INK,
                border: `1px solid ${BORDER}`,
                color: PAPER,
              }}
              className="rounded px-3 py-2 text-sm w-full"
            >
              <option value="rank">Sort: ranking (best first)</option>
              <option value="cost-asc">Sort: fare (low to high)</option>
              <option value="cost-desc">Sort: fare (high to low)</option>
            </select>

            <div>
              <div style={{ color: MUTED }} className="text-xs mb-1">
                Max fare: {fmt(budget)} / year
              </div>
              <input
                type="range"
                min="0"
                max={maxUsd}
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <select
              value={rankingFilter}
              onChange={(e) => setRankingFilter(e.target.value)}
              style={{
                background: INK,
                border: `1px solid ${BORDER}`,
                color: PAPER,
              }}
              className="rounded px-3 py-2 text-sm w-full"
            >
              {RANKING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Ranking: {o.label}
                </option>
              ))}
            </select>

            <label
              style={{
                background: INK,
                border: `1px solid ${BORDER}`,
                color: PAPER,
              }}
              className="rounded px-3 py-2 text-sm w-full flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={tuitionFreeOnly}
                onChange={(e) => setTuitionFreeOnly(e.target.checked)}
              />
              Tuition-free only
            </label>

            <button
              onClick={() => {
                setSelected(allCountries);
                setSearch("");
                setSortBy("rank");
                setBudget(maxUsd);
                setRankingFilter("any");
                setTuitionFreeOnly(false);
              }}
              style={{ border: `1px solid ${BORDER}`, color: MUTED }}
              className="rounded px-3 py-2 text-sm w-full"
            >
              Reset all filters
            </button>
          </div>
        </div>

        <div
          style={{ background: PANEL, border: `1px solid ${BORDER}` }}
          className="rounded-lg p-4 mb-6"
        >
          <div
            style={{ color: MUTED, letterSpacing: "0.1em" }}
            className="text-xs uppercase mb-3"
          >
            Average annual fare by country (approx. USD)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid stroke={BORDER} vertical={false} />
              <XAxis dataKey="country" stroke={MUTED} fontSize={12} />
              <YAxis stroke={MUTED} fontSize={12} tickFormatter={(v) => "$" + v / 1000 + "k"} />
              <Tooltip
                contentStyle={{ background: INK, border: `1px solid ${BORDER}`, color: PAPER }}
                formatter={(v) => fmt(v)}
              />
              <Bar dataKey="avg" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{ background: PANEL, border: `1px solid ${BORDER}` }}
          className="rounded-lg overflow-hidden"
        >
          <div
            style={{
              background: PANEL_2,
              borderBottom: `1px solid ${BORDER}`,
              color: MUTED,
              letterSpacing: "0.1em",
            }}
            className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 text-xs uppercase"
          >
            <div className="col-span-2">Flight</div>
            <div className="col-span-5">Destination</div>
            <div className="col-span-2">Rank</div>
            <div className="col-span-2">Fare / yr</div>
            <div className="col-span-1">Status</div>
          </div>

          {filtered.length === 0 && (
            <div style={{ color: MUTED }} className="text-center py-10 text-sm">
              No destinations match these filters. Try widening the budget or search.
            </div>
          )}

          {filtered.map((u, i) => {
            const s = COUNTRY_STYLES[u.country];
            const badge = statusBadge(u.usd);
            return (
              <div
                key={u.name + i}
                style={{
                  borderBottom:
                    i === filtered.length - 1 ? "none" : `1px solid ${BORDER}`,
                }}
                className="grid grid-cols-2 md:grid-cols-12 gap-2 px-4 py-3 items-center text-sm"
              >
                <div className="col-span-2">
                  <span
                    style={{
                      color: s.color,
                      border: `1px solid ${s.color}`,
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    }}
                    className="rounded px-2 py-1 text-xs font-bold"
                  >
                    {s.code}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-5 font-medium">
                  {u.name}
                  {u.note && (
                    <div style={{ color: MUTED }} className="text-xs mt-1">
                      {u.note}
                    </div>
                  )}
                </div>
                <div
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: MUTED }}
                  className="col-span-1 md:col-span-2 text-xs md:text-sm"
                >
                  {u.ranking}
                </div>
                <div
                  style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                  className="col-span-1 md:col-span-2 font-semibold"
                >
                  <FlipValue
                    value={
                      u.tuition_amount === 0
                        ? "FREE"
                        : `${u.tuition_currency} ${u.tuition_amount.toLocaleString("en-US")}`
                    }
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span
                    style={{ color: badge.color, border: `1px solid ${badge.color}` }}
                    className="rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap"
                  >
                    {badge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        </>
        )}

        <div style={{ color: MUTED }} className="text-xs mt-4 text-center">
          Fares converted to approx. USD for comparison only using static rates. Source: alfabetaglobal.com, ardentoverseas.com
        </div>
      </div>
    </div>
  );
}
