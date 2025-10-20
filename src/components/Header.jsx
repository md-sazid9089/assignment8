import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-secondary">
          <img src={logoUrl} alt="Hero.io" className="h-8" />
          <span>Hero.io</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <NavLink to="/" 
            className={({isActive}) => 
              isActive ? "font-semibold text-primary" : "font-medium text-gray-800 hover:text-primary"
            }>
            Home
          </NavLink>
          <NavLink to="/apps" 
            className={({isActive}) => 
              isActive ? "font-semibold text-primary" : "font-medium text-gray-800 hover:text-primary"
            }>
            Apps
          </NavLink>
          <NavLink to="/installation" 
            className={({isActive}) => 
              isActive ? "font-semibold text-primary" : "font-medium text-gray-800 hover:text-primary"
            }>
            Installation
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-light transition duration-200 hidden md:block">
          <a href="https://github.com/md-sazid9089" aria-label="GitHub" className="link link-hover">Contribute</a>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
          <NavLink to="/" 
            className={({isActive}) => 
              isActive ? "block py-2 font-semibold text-primary" : "block py-2 font-medium text-gray-800 hover:text-primary"
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink to="/apps" 
            className={({isActive}) => 
              isActive ? "block py-2 font-semibold text-primary" : "block py-2 font-medium text-gray-800 hover:text-primary"
            }
            onClick={() => setMenuOpen(false)}
          >
            Apps
          </NavLink>
          <NavLink to="/installation" 
            className={({isActive}) => 
              isActive ? "block py-2 font-semibold text-primary" : "block py-2 font-medium text-gray-800 hover:text-primary"
            }
            onClick={() => setMenuOpen(false)}
          >
            Installation
          </NavLink>
          <a
            href="https://github.com/md-sazid9089"
            aria-label="GitHub"
            className="block py-2 font-medium text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Contribute
          </a>
        </nav>
      )}
    </header>
  );
}
