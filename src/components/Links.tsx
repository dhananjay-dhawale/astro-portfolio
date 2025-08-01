const links = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dhananjay-dhawale-829659198/' },
  { name: 'Twitter', url: 'https://twitter.com/nonchalantnerdd' },
  { name: 'Leetcode', url: 'https://leetcode.com/piudpie/' },
  { name: 'Medium', url: 'https://medium.com/@dhananjaydhawale9' },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/djay24' },
  { name: 'Codechef', url: 'https://www.codechef.com/users/piudpie' },
  { name: 'Geeks For Geeks', url: 'https://auth.geeksforgeeks.org/user/chessnoobdj/profile/' },
  { name: 'Keybr - Touch Typing', url: 'https://www.keybr.com/profile/4491fz0' },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/chesskingdj?hr_r=1' },
  { name: 'GitHub', url: 'https://github.com/dhananjay-dhawale' },
  { name: 'Instagram', url: 'https://instagram.com/djayclicks' },
  { name: 'Your Quote', url: 'https://www.yourquote.in/dhananjay-dhawle-bm8wu/quotes' },
  { name: 'Lichess', url: 'https://lichess.org/@/D_JAY' },
  { name: 'Quora', url: 'https://www.quora.com/profile/Dhananjay-Dhawle' },
  { name: 'CSES', url: 'https://cses.fi/user/111362' },
  { name: 'Duolingo', url: 'https://www.duolingo.com/profile/ph.zQ3Tfn?via=share_profile' },
];

export default function Links() {
  return (
    <section className="py-20 px-6 text-white max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-3xl font-bold mb-6 text-purple-300 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]">Find Me Online</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-full bg-white/10 hover:bg-purple-300 hover:text-black transition text-sm font-medium border border-white/20"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}