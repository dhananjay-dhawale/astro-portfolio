import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaInstagram, FaCode, FaRegFileCode, FaChessPawn } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiGeeksforgeeks, SiHackerrank, SiCodeforces, SiDuolingo, SiQuora } from 'react-icons/si';

// Restructured data to include categories, icons, and brand-colored hovers
const categories = [
  {
    title: 'Professional & Social',
    links: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dhananjay-dhawale-829659198/', icon: FaLinkedin, color: 'hover:bg-[#0A66C2]' },
      { name: 'GitHub', url: 'https://github.com/dhananjay-dhawale', icon: FaGithub, color: 'hover:bg-[#181717]' },
      { name: 'Twitter', url: 'https://twitter.com/nonchalantnerdd', icon: FaTwitter, color: 'hover:bg-[#1DA1F2]' },
      { name: 'Instagram', url: 'https://instagram.com/djayclicks', icon: FaInstagram, color: 'hover:bg-[#E4405F]' },
      { name: 'Medium', url: 'https://medium.com/@dhananjaydhawale9', icon: FaMedium, color: 'hover:bg-[#000000]' },
      { name: 'Quora', url: 'https://www.quora.com/profile/Dhananjay-Dhawle', icon: SiQuora, color: 'hover:bg-[#B92B27]' },
    ]
  },
  {
    title: 'Competitive Programming',
    links: [
      { name: 'Leetcode', url: 'https://leetcode.com/piudpie/', icon: SiLeetcode, color: 'hover:bg-[#FFA116]' },
      { name: 'Geeks For Geeks', url: 'https://auth.geeksforgeeks.org/user/chessnoobdj/profile/', icon: SiGeeksforgeeks, color: 'hover:bg-[#34A853]' },
      { name: 'Codeforces', url: 'https://codeforces.com/profile/djay24', icon: SiCodeforces, color: 'hover:bg-[#3864a7]' },
      { name: 'Codechef', url: 'https://www.codechef.com/users/piudpie', icon: SiCodechef, color: 'hover:bg-[#5b4636]' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com/chesskingdj?hr_r=1', icon: SiHackerrank, color: 'hover:bg-[#00EA64]' },
      { name: 'CSES', url: 'https://cses.fi/user/111362', icon: FaCode, color: 'hover:bg-purple-500' },
    ]
  },
  {
    title: 'Other Interests',
    links: [
      { name: 'Keybr - Touch Typing', url: 'https://www.keybr.com/profile/4491fz0', icon: FaRegFileCode, color: 'hover:bg-purple-500' },
      { name: 'Lichess', url: 'https://lichess.org/@/D_JAY', icon: FaChessPawn, color: 'hover:bg-[#4E6285]' },
      { name: 'Duolingo', url: 'https://www.duolingo.com/profile/piudpie?via=share_profile_link', icon: SiDuolingo, color: 'hover:bg-[#58CC02]' },
      { name: 'Your Quote', url: 'https://www.yourquote.in/dhananjay-dhawle-bm8wu/quotes', icon: FaMedium, color: 'hover:bg-[#fff]' },
    ]
  }
];

export default function Links() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-purple-300 drop-shadow-[0_2px_4px_rgba(186,147,255,0.2)]">
        Find Me Online
      </h2>
      <div className="flex flex-col gap-8">
        {categories.map(category => (
          <div key={category.title}>
            <h3 className="text-xl font-semibold mb-4 text-purple-200">{category.title}</h3>
            <div className="flex flex-wrap gap-4">
              {category.links.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 ${link.color} hover:text-black transition-all text-sm font-medium border border-white/20`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}