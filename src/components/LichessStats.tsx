import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaChessPawn, FaChessKnight, FaChessRook, FaChessQueen, FaChessKing, FaTrophy, FaClock, FaBolt } from 'react-icons/fa';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

interface LichessPerf {
  games: number;
  rating: number;
  rd: number;
  prog: number;
}

interface LichessData {
  username: string;
  perfs: {
    bullet?: LichessPerf;
    blitz?: LichessPerf;
    rapid?: LichessPerf;
    classical?: LichessPerf;
    puzzle?: LichessPerf;
  };
  count: {
    all: number;
    win: number;
    loss: number;
    draw: number;
  };
  playTime?: {
    total: number;
  };
}

interface LichessStatsProps {
  username?: string;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 2000) return 'text-yellow-400';
  if (rating >= 1800) return 'text-orange-400';
  if (rating >= 1600) return 'text-purple-400';
  if (rating >= 1400) return 'text-blue-400';
  return 'text-green-400';
};

const formatPlayTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  return `${hours}h`;
};

export default function LichessStats({ username = 'D_JAY' }: LichessStatsProps) {
  const [data, setData] = useState<LichessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLichessData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://lichess.org/api/user/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Lichess data');
        }
        const userData: LichessData = await response.json();
        setData(userData);
        setError(null);
      } catch (err) {
        setError('Could not load chess stats');
        console.error('Lichess API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLichessData();
  }, [username]);

  const gameTypes = [
    { key: 'bullet', name: 'Bullet', icon: FaBolt, description: '1 min' },
    { key: 'blitz', name: 'Blitz', icon: FaClock, description: '3-5 min' },
    { key: 'rapid', name: 'Rapid', icon: FaChessKnight, description: '10-15 min' },
    { key: 'classical', name: 'Classical', icon: FaChessRook, description: '30+ min' },
    { key: 'puzzle', name: 'Puzzles', icon: FaChessQueen, description: 'Tactics' },
  ];

  if (loading) {
    return (
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-12">
          Chess Stats
        </h2>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-12">
          Chess Stats
        </h2>
        <div className="text-center text-gray-400">
          <FaChessPawn className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>{error || 'Unable to load chess stats'}</p>
          <a
            href={`https://lichess.org/@/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300"
          >
            View on Lichess →
          </a>
        </div>
      </section>
    );
  }

  const winRate = data.count.all > 0
    ? Math.round((data.count.win / data.count.all) * 100)
    : 0;

  return (
    <motion.section
      className="py-16 px-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
        variants={itemVariants}
      >
        <FaChessKing className="inline-block mr-3 mb-1" />
        Chess Stats
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-12"
        variants={itemVariants}
      >
        Live stats from Lichess.org
      </motion.p>

      {/* Overall Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        variants={containerVariants}
      >
        <motion.div
          className="p-4 rounded-xl border border-white/20 bg-white/5 text-center hover:border-purple-500 transition-all"
          variants={itemVariants}
        >
          <FaTrophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{data.count.all.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Games</div>
        </motion.div>

        <motion.div
          className="p-4 rounded-xl border border-white/20 bg-white/5 text-center hover:border-purple-500 transition-all"
          variants={itemVariants}
        >
          <div className="text-2xl font-bold text-green-400">{winRate}%</div>
          <div className="text-sm text-gray-400">Win Rate</div>
          <div className="text-xs text-gray-500 mt-1">
            {data.count.win}W / {data.count.draw}D / {data.count.loss}L
          </div>
        </motion.div>

        <motion.div
          className="p-4 rounded-xl border border-white/20 bg-white/5 text-center hover:border-purple-500 transition-all"
          variants={itemVariants}
        >
          <FaClock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">
            {data.playTime ? formatPlayTime(data.playTime.total) : 'N/A'}
          </div>
          <div className="text-sm text-gray-400">Play Time</div>
        </motion.div>

        <motion.div
          className="p-4 rounded-xl border border-white/20 bg-white/5 text-center hover:border-purple-500 transition-all"
          variants={itemVariants}
        >
          <FaChessPawn className="w-6 h-6 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{data.username}</div>
          <div className="text-sm text-gray-400">Username</div>
        </motion.div>
      </motion.div>

      {/* Rating by Game Type */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        variants={containerVariants}
      >
        {gameTypes.map(({ key, name, icon: Icon, description }) => {
          const perf = data.perfs[key as keyof typeof data.perfs];
          if (!perf) return null;

          return (
            <motion.div
              key={key}
              className="p-4 rounded-xl border border-white/20 bg-white/5 text-center hover:border-purple-500 transition-all group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="text-xs text-gray-500 mb-1">{description}</div>
              <div className={`text-2xl font-bold ${getRatingColor(perf.rating)}`}>
                {perf.rating}
              </div>
              <div className="text-sm text-gray-400">{name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {perf.games} games
                {perf.prog !== 0 && (
                  <span className={perf.prog > 0 ? 'text-green-400 ml-1' : 'text-red-400 ml-1'}>
                    {perf.prog > 0 ? '+' : ''}{perf.prog}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lichess Profile Link */}
      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <a
          href={`https://lichess.org/@/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${username}'s Lichess profile (opens in new tab)`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all border border-white/20"
        >
          <FaChessKnight />
          Challenge me on Lichess
        </a>
      </motion.div>
    </motion.section>
  );
}
