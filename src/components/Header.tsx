export default function Header() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="sticky top-0 z-50 bg-black text-white px-6 py-6 flex justify-center items-center">
      <nav className="space-x-6 text-sm" aria-label="Main navigation">
        <a href={baseUrl} className="hover:text-purple-300">Home</a>
        <a href={`${baseUrl}about`} className="hover:text-purple-300">About</a>
        <a href={`${baseUrl}projects`} className="hover:text-purple-300">Projects</a>
        <a href={`${baseUrl}connect`} className="hover:text-purple-300">Connect</a>
      </nav>
    </header>
  );
}