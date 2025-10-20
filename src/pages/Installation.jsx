import data from "../data/apps.json";
import { getInstalled, uninstallApp } from "../utils/storage.js";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { OverlayLoader } from "../components/Loader.jsx";

export default function Installation() {
  const [ids, setIds] = useState([]);
  const [sort, setSort] = useState("size"); // size | downloads | rating | title
  const [routeLoading, setRouteLoading] = useState(true);

  useEffect(() => {
    const rt = setTimeout(() => setRouteLoading(false), 350);
    return () => clearTimeout(rt);
  }, []);

  useEffect(() => setIds(getInstalled()), []);

  const uninstall = (id) => {
    uninstallApp(id);
    setIds(getInstalled());
    toast("Uninstalled");
  };

  const apps = data.filter((a) => ids.includes(a.id));

  const sortedApps = useMemo(() => {
    const arr = [...apps];
    arr.sort((a, b) => {
      switch (sort) {
        case "size":
          return b.size - a.size;
        case "downloads":
          return b.downloads - a.downloads;
        case "rating":
          return b.ratingAvg - a.ratingAvg;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return arr;
  }, [apps, sort]);

  const fmt = (n) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
    return `${n}`;
  };

  return (
    <section className="py-8 md:py-10">
      {routeLoading && <OverlayLoader />}
      <div className="max-w-6xl mx-auto px-4">
        {/* Header panel */}
        <div className="rounded-xl bg-white p-6 md:p-8 text-center shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your Installed Apps
          </h2>
          <p className="text-gray-500 mt-2">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        {/* List container */}
        <div className="mt-6 rounded-xl bg-white p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">
              {apps.length} {apps.length === 1 ? "App" : "Apps"} Found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white"
              >
                <option value="size">Size</option>
                <option value="downloads">Downloads</option>
                <option value="rating">Rating</option>
                <option value="title">Name</option>
              </select>
            </div>
          </div>

          {apps.length ? (
            <ul className="space-y-4">
              {sortedApps.map((app) => (
                <li
                  key={app.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={app.icon || app.image}
                      alt={app.title}
                      className="h-12 w-12 rounded-md object-cover bg-gray-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/96x96?text=App";
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">{app.title}</h3>
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-emerald-600">
                          {/* download icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="h-4 w-4"
                            fill="currentColor"
                          >
                            <path d="M3 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-1a1 1 0 1 1 2 0v1z" />
                            <path d="M10 2a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 6.707 8.293L9 10.586V3a1 1 0 0 1 1-1z" />
                          </svg>
                          {fmt(app.downloads)}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          {/* star icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="h-4 w-4 fill-current"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.151c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 0 0-.364 1.118l1.286 3.95c.3.922-.755 1.688-1.538 1.118l-3.36-2.444a1 1 0 0 0-1.176 0l-3.36 2.444c-.783.57-1.838-.197-1.538-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L1.974 9.377c-.783-.57-.38-1.81.588-1.81h4.151a1 1 0 0 0 .95-.69l1.286-3.95z" />
                          </svg>
                          {app.ratingAvg}
                        </span>
                        <span className="text-gray-500">{app.size} MB</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                    onClick={() => uninstall(app.id)}
                  >
                    Uninstall
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center opacity-70 py-8">No installed apps yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
