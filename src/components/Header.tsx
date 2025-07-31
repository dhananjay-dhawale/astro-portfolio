// src/components/Header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur text-white px-6 py-4 flex justify-center items-center">
      <nav className="space-x-6 text-sm">
        <a href="#about" className="hover:text-sky-400">About</a>
        <a href="#projects" className="hover:text-sky-400">Projects</a>
        <a href="#contact" className="hover:text-sky-400">Contact</a>
      </nav>
    </header>
  );
}
