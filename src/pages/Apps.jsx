import { useEffect, useMemo, useState } from "react";
import data from "../data/apps.json";
import AppCard from "../components/AppCard.jsx";
import Loader, { OverlayLoader } from "../components/Loader.jsx";
import { Link } from "react-router-dom";

// Resolve relative asset paths so Vite includes them in the build
const resolveAsset = (p) => {
  if (!p) return p;
  const s = String(p);
  if (s.startsWith("http") || s.startsWith("data:")) return s;
  // Remove leading slash for Vite import
  const normalized = s.replace(/^\/?assets[\\/]+/, "");
  try {
    return new URL(`../assets/${normalized}`, import.meta.url).href;
  } catch {
    return s;
  }
};

export default function Apps() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("hl");
  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(true);

  useEffect(() => {
    // route transition loader (on page mount)
    const rt = setTimeout(() => setRouteLoading(false), 350);
    return () => clearTimeout(rt);
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [q, sort]);

  const filtered = useMemo(() => {
    const f = data.filter(a => a.title.toLowerCase().includes(q.toLowerCase()));
    const s = [...f].sort((a, b) => sort === "hl" ? b.downloads - a.downloads : a.downloads - b.downloads);
    // Resolve image fields for Vite/Netlify
    return s.map(app => {
      const resolved = { ...app };
      ["image", "logo", "icon", "thumbnail", "cover", "banner"].forEach((k) => {
        if (resolved[k]) resolved[k] = resolveAsset(resolved[k]);
      });
      return resolved;
    });
  }, [q, sort]);

  return (
    <section className="py-8">
      {routeLoading && <OverlayLoader />}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">All Apps <span className="opacity-60">({filtered.length})</span></h2>
          <p className="opacity-70">Browse and search all available apps.</p>
        </div>
        <div className="flex gap-2">
          <input className="input input-bordered w-56" placeholder="Search apps..." value={q} onChange={e => setQ(e.target.value)} />
          <select className="select select-bordered" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="hl">High-Low</option>
            <option value="lh">Low-High</option>
          </select>
        </div>
      </div>
      {loading ? <Loader /> : (
        filtered.length ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        ) : (
          <div className="not-found">
            <img
              src={resolveAsset("assets/appt.png")}
              alt="No apps found"
              className="not-found-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/400x260?text=No+Apps+Found";
              }}
            />
            <h2>No App Found</h2>
            <p>Try a different search or filter.</p>
            <Link to="/apps" className="go-back-btn">Browse All Apps</Link>
          </div>
        )
      )}
    </section>
  );
}
