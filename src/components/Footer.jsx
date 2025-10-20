export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg">Hero Apps</h3>
          <p className="text-sm">Building simple, useful web apps for everyday problems.</p>
          <p className="text-xs mt-2">© {year} Hero Apps. All rights reserved.</p>
        </div>

        <nav>
          <ul className="flex gap-4">
            <li><a href="/about" className="link link-hover">About</a></li>
            <li><a href="/privacy" className="link link-hover">Privacy</a></li>
            <li><a href="/terms" className="link link-hover">Terms</a></li>
            <li><a href="/contact" className="link link-hover">Contact</a></li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="mailto:hello@heroapps.example" aria-label="Email" className="link link-hover text-sm">hello@heroapps.example</a>
          <a href="https://github.com/md-sazid9089" aria-label="GitHub" className="link link-hover">GitHub</a>
          <a href="https://twitter.com/md_sazid9089" aria-label="Twitter" className="link link-hover">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
