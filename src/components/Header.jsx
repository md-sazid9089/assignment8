import { Link, NavLink } from 'react-router-dom';
const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-secondary">
          <img src={logoUrl} alt="Hero.io" className="h-8" />
          <span>Hero.io</span>
        </Link>
        
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
        
        <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-light transition duration-200">
          <a href="https://github.com/md-sazid9089" aria-label="GitHub" className="link link-hover">Contribute</a>
        </button>
      </div>
    </header>
  );
}
