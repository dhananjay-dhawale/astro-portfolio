export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white px-6 py-6 flex justify-center items-center">
      <nav className="space-x-6 text-sm">
        <a href="/astro-portfolio/" className="hover:text-purple-300">Home</a>
        <a href="/astro-portfolio/about" className="hover:text-purple-300">About</a>
        <a href="/astro-portfolio/projects" className="hover:text-purple-300">Projects</a>
        <a href="/astro-portfolio/connect" className="hover:text-purple-300">Connect</a>
      </nav>
    </header>
  );
}