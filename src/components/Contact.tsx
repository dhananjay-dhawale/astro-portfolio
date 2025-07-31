export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-white max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-300 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]">Contact</h2>
      <p className="text-white/80 mb-4">
        I'm open to collaborations, internships, and exciting projects. Feel free to reach out:
      </p>
      <ul className="space-y-2 text-white/80 inline-block text-left">
        <li>📧 <a className="text-purple-300 underline" href="mailto:dhananjaydhawale.dev@gmail.com">dhananjaydhawale.dev@gmail.com</a></li>
        <li>🔗 <a className="text-purple-300 underline" href="https://github.com/dhananjaydhawale" target="_blank">github.com/dhananjaydhawale</a></li>
        <li>💼 <a className="text-purple-300 underline" href="https://www.linkedin.com/in/dhananjaydhawale/" target="_blank">linkedin.com/in/dhananjaydhawale</a></li>
      </ul>
    </section>
  );
}
