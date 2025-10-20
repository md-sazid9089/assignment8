import { Link } from "react-router-dom";

export default function AppCard({ app }) {
  const imgSrc = app.icon || app.image;
  const fmt = (n) =>
    n >= 1e6
      ? `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`
      : n >= 1e3
      ? `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K`
      : `${n}`;

  return (
    <Link to={`/apps/${app.id}`} className="card hover:-translate-y-1">
      <div className="bg-gray-100 h-44 flex items-center justify-center">
        <img
          src={app.image || app.icon || app.logo}
          alt={app.title}
          className="w-24 h-24 object-cover rounded-md"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/96x96?text=App";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{app.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{app.companyName}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-success text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            {fmt(app.downloads)}
          </div>
          <div className="flex items-center text-warning text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {app.ratingAvg}
          </div>
        </div>
      </div>
    </Link>
  );
}
