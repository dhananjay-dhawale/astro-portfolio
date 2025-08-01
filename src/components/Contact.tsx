export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 text-white max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Contact Me</h2>

      <p className="text-white/80 mb-8">
        Feel free to reach out if you'd like to collaborate, ask a question, or just say hello.
      </p>

      <form
        action="https://formspree.io/f/yourid"
        method="POST"
        className="space-y-4 max-w-xl mx-auto text-black"
      >
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full p-3 rounded-lg bg-white/90 outline-none"
        />
        <textarea
          name="message"
          placeholder="Your message"
          required
          rows={5}
          className="w-full p-3 rounded-lg bg-white/90 outline-none"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-6 py-2 rounded-full transition-all"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-purple-300 mb-4">View My Resume</h3>
        <a
          href="./public/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-full mb-6 transition-all"
        >
          View Resume
        </a>

        <div className="w-full h-[70vh] border rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="./public/resume.pdf"
            className="w-full h-full"
            title="Resume"
          />
        </div>
      </div>
    </section>
  );
}
