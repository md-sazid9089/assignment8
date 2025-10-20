import error404 from '../../assets/error-404.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-5xl font-bold text-error mb-4">404</h1>
      <img src={error404} alt="404" className="mb-6" />
      <p className="text-xl mb-6">Sorry, the page you requested was not found.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  );
}
