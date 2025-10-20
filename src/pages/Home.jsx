import data from "../data/apps.json";
import AppCard from "../components/AppCard.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";

// Resolve relative asset paths so Vite includes them in the build
const resolveAsset = (p) => {
  if (!p) return p;
  const s = String(p);
  if (s.startsWith("http") || s.startsWith("data:") || s.startsWith("/")) return s;
  try {
    const normalized = s.replace(/^src[\\/]+/, ""); // drop leading src/
    return new URL(`../${normalized}`, import.meta.url).href; // relative to src/pages
  } catch {
    return s;
  }
};

export default function Home() {
  const [topApps, setTopApps] = useState([]);

  useEffect(() => {
    // Fetch top apps data and resolve common image fields for Vite/Netlify
    const items = data.slice(0, 8).map((app) => {
      const resolved = { ...app };
      ["image", "logo", "icon", "thumbnail", "cover", "banner"].forEach((k) => {
        if (resolved[k]) resolved[k] = resolveAsset(resolved[k]);
      });
      return resolved;
    });
    setTopApps(items);
  }, []);

  return (
    <>
      <Hero />

      {/* Stats Section (overlaps Hero) */}
      <section className="relative mt-3 md:-mt-18000 z-10">
        <div className="container mx-auto px-4">
          {/* floating card that overlaps the Hero */}
          <div className="mx-auto max-w-5xl bg-gradient-to-r from-primary to-primary-light text-white rounded-xl shadow-xl transform -translate-y-1/2 py-10 md:py-14 px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Trusted By Millions, Built For You
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
              <div className="text-center">
                <p className="text-5xl font-extrabold">29.6M</p>
                <p className="text-sm opacity-80 mt-2">Total Downloads</p>
                <p className="text-xs mt-1">↑ 21% this month</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold">906K</p>
                <p className="text-sm opacity-80 mt-2">Total Reviews</p>
                <p className="text-xs mt-1">↑ 46% this month</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold">132+</p>
                <p className="text-sm opacity-80 mt-2">Active Apps</p>
                <p className="text-xs mt-1">↑ 31 more will launch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Apps</h2>
          <p className="text-gray-500 text-center mb-8">
            Check out the most popular apps in our store
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {topApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/apps"
              className="bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-primary-light transition duration-200 inline-block"
            >
              View All Apps
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
