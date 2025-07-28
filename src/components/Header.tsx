// src/components/Header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-sky-400">dhananjay dhawale</h1>
      <nav className="space-x-6 text-sm">
        <a href="#about" className="hover:text-sky-400">about</a>
        <a href="#projects" className="hover:text-sky-400">projects</a>
        <a href="#contact" className="hover:text-sky-400">contact</a>
      </nav>
    </header>
  );
}
