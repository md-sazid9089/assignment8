import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import data from "../data/apps.json";
import { isInstalled, installApp, uninstallApp } from "../utils/storage.js";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AppDetails() {
  const { id } = useParams();
  const app = data.find((a) => a.id === Number(id));
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (app) setInstalled(isInstalled(app.id));
  }, [app]);

  const toggleInstall = () => {
    if (!app) return;
    if (installed) {
      uninstallApp(app.id);
      setInstalled(false);
      toast("Uninstalled");
    } else {
      installApp(app.id);
      setInstalled(true);
      toast("Installed");
    }
  };

  const chartData = useMemo(
    () =>
      app?.ratings?.map((r) => ({ name: r.name, count: r.count })) ?? [],
    [app]
  );

  const fmt = (n) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
    return `${n}`;
  };

  if (!app) {
    return (
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-2">App not found</h2>
          <p className="text-gray-500 mb-6">The app you are looking for doesn’t exist.</p>
          <Link to="/apps" className="btn-primary">Back to Apps</Link>
        </div>
      </section>
    );
  }

  const imgSrc = app.icon || app.image;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              <img
                src={imgSrc}
                alt={app.title}
                className="h-28 w-28 md:h-32 md:w-32 rounded-lg object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placehold.co/128x128?text=App";
                }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold">{app.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Developed by <span className="text-primary font-medium">{app.companyName}</span>
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-emerald-600">
                    {/* downloads icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-1a1 1 0 1 1 2 0v1z" />
                      <path d="M10 2a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 0 1 6.707 8.293L9 10.586V3a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Downloads</div>
                    <div className="font-semibold">{fmt(app.downloads)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-amber-500">
                    {/* star */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.151c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 0 0-.364 1.118l1.286 3.95c.3.922-.755 1.688-1.538 1.118l-3.36-2.444a1 1 0 0 0-1.176 0l-3.36 2.444c-.783.57-1.838-.197-1.538-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L1.974 9.377c-.783-.57-.38-1.81.588-1.81h4.151a1 1 0 0 0 .95-.69l1.286-3.95z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Average Ratings</div>
                    <div className="font-semibold">{app.ratingAvg}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-indigo-500">
                    {/* reviews icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h7v2H7z" />
                      <path d="M4 4h16a2 2 0 0 1 2 2v15.5a.5.5 0 0 1-.8.4L16 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Reviews</div>
                    <div className="font-semibold">{fmt(app.reviews)}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={toggleInstall}
                className={`mt-6 inline-flex items-center rounded-md px-4 py-2 text-white font-medium ${
                  installed ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {installed ? "Uninstall" : `Install Now (${app.size} MB)`}
              </button>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Ratings</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 20, bottom: 10, left: 40 }}
              >
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 mt-6">
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {app.description}
          </p>
        </div>
      </div>
    </section>
  );
}
