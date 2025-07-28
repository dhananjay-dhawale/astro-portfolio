// src/components/Contact.tsx
export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-black text-white max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">contact</h2>
      <p className="text-white/80 mb-4">i’m open to collaborations, internships, and exciting projects. feel free to reach out:</p>
      <ul className="space-y-2 text-white/80">
        <li>📧 <a className="text-sky-400 underline" href="mailto:dhananjaydhawale.dev@gmail.com">dhananjaydhawale.dev@gmail.com</a></li>
        <li>🔗 <a className="text-sky-400 underline" href="https://github.com/dhananjaydhawale" target="_blank">github.com/dhananjaydhawale</a></li>
        <li>💼 <a className="text-sky-400 underline" href="https://www.linkedin.com/in/dhananjaydhawale/" target="_blank">linkedin.com/in/dhananjaydhawale</a></li>
      </ul>
    </section>
  );
}
