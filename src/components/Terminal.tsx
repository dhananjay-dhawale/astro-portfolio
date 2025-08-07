import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Dhananjay\'s Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus on input when component loads and when clicked
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Sound effects (using Web Audio API for compatibility)
  const playSound = (type: 'keypress' | 'enter' | 'error') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume audio context if suspended (required by some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'keypress':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case 'enter':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
      }
    } catch (error) {
      // Fallback: Try to play a simple beep sound if Web Audio fails
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Hi-NVcHgUumvqVaiZCN0gciAECAYABAFBX');
        audio.volume = 0.1;
        audio.play().catch(() => {});
      } catch (fallbackError) {
        // Silent fallback - no sound but function won't crash
        console.log('Audio not supported in this environment');
      }
    }
  };

  // Simulate typing effect for responses
  const typeResponse = async (responses: string[]) => {
    setIsTyping(true);
    
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
      setHistory(prev => [...prev, { type: 'output' as const, content: response, timestamp: new Date() }]);
    }
    
    setIsTyping(false);
  };

  // Enhanced command handling with page navigation
  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    playSound('enter');
    
    // Add command to history
    const newHistory: TerminalLine[] = [...history, { type: 'command' as const, content: `$ ${trimmedCommand}`, timestamp: new Date() }];
    setHistory(newHistory);

    const commandParts = trimmedCommand.toLowerCase().split(' ');
    const mainCommand = commandParts[0];

    // Navigation commands - redirect to actual pages
    const navigationCommands: Record<string, string> = {
      'home': '/astro-portfolio/',
      'about': '/astro-portfolio/about',
      'projects': '/astro-portfolio/projects',
      'contact': '/astro-portfolio/contact'
    };

    if (navigationCommands[mainCommand]) {
      const responses = [
        '',
        `🚀 Navigating to ${mainCommand} page...`,
        `Redirecting to: ${navigationCommands[mainCommand]}`,
        ''
      ];
      
      await typeResponse(responses);
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = navigationCommands[mainCommand];
      }, 1000);
      
      setInput('');
      return;
    }

    // Terminal-only commands
    const responses: string[] = [];

    switch (mainCommand) {
      case 'help':
        responses.push(
          '',
          '📋 Available Commands:',
          '─'.repeat(40),
          '🌐 Navigation Commands:',
          '  home          - Go to home page',
          '  about         - Go to about page',
          '  projects      - Go to projects page',
          '  contact       - Go to contact page',
          '',
          '💻 Terminal Commands:',
          '  help          - Show this help message',
          '  clear         - Clear the terminal',
          '  date          - Show current date and time',
          '  whoami        - Display current user info',
          '  ls            - List available pages',
          '  skills        - Display technical skills',
          '  links         - Show social media links',
          '',
          '💡 Tip: Use navigation commands to visit actual pages!',
          ''
        );
        break;

      case 'skills':
        responses.push(
          '',
          '🛠️ Technical Skills',
          '─'.repeat(40),
          '💻 Programming Languages:',
          '   Java, JavaScript, TypeScript, Python',
          '',
          '🌐 Frontend Technologies:',
          '   Angular, React, HTML5, CSS3, Tailwind CSS',
          '',
          '⚙️ Backend Technologies:',
          '   Spring Boot, Spring Security, REST APIs',
          '',
          '🗄️ Databases:',
          '   MySQL, PostgreSQL, MongoDB',
          '',
          '🔧 Tools & Others:',
          '   Git, Docker, AWS, Postman, IntelliJ IDEA',
          '',
          '🏆 Competitive Programming:',
          '   LeetCode, Codeforces, CodeChef, HackerRank',
          ''
        );
        break;

      case 'links':
        responses.push(
          '',
          '🔗 Find Me Online',
          '─'.repeat(40),
          '💼 LinkedIn: linkedin.com/in/dhananjay-dhawale-829659198',
          '💻 GitHub: github.com/dhananjay-dhawale',
          '🐦 Twitter: @nonchalantnerdd',
          '📸 Instagram: @djayclicks',
          '✍️ Medium: medium.com/@dhananjaydhawale9',
          '🧩 LeetCode: leetcode.com/piudpie',
          '⚔️ Codeforces: codeforces.com/profile/djay24',
          ''
        );
        break;

      case 'clear':
        setHistory([
          { type: 'output', content: 'Terminal cleared.' },
          { type: 'output', content: 'Type "help" to see available commands.' },
          { type: 'output', content: '' }
        ] as TerminalLine[]);
        setInput('');
        return;

      case 'date':
        responses.push('', new Date().toString(), '');
        break;

      case 'whoami':
        responses.push('', 'dhananjay@portfolio:~$ You are viewing Dhananjay\'s portfolio', '');
        break;

      case 'ls':
        responses.push(
          '',
          'Available pages:',
          'home  about  projects  contact',
          '',
          'Use: <page-name> to navigate (e.g., "about")',
          ''
        );
        break;

      default:
        playSound('error');
        responses.push(
          '',
          `bash: ${trimmedCommand}: command not found`,
          'Type "help" to see available commands.',
          `Did you mean to navigate? Try: home, about, projects, or contact`,
          ''
        );
        break;
    }

    await typeResponse(responses);
    setInput('');
  };

  // Handle input changes with sound
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > input.length) {
      playSound('keypress');
    }
    setInput(newValue);
  };

  // Handle key presses
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple auto-complete for common commands
      const commands = ['help', 'about', 'skills', 'projects', 'contact', 'clear'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 rounded-t-xl border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-300 text-sm font-mono">
            dhananjay@portfolio:~$
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="h-96 bg-gray-900/95 text-green-400 font-mono text-sm p-4 rounded-b-xl shadow-2xl overflow-y-auto cursor-text backdrop-blur-sm border-2 border-gray-700/50"
        style={{
          scrollBehavior: 'smooth',
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)'
        }}
      >
        <AnimatePresence>
          {history.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-1 ${
                line.type === 'command' 
                  ? 'text-cyan-400 font-semibold' 
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-green-300'
              }`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-yellow-400"
          >
            <span className="mr-2">⟳</span>
            <span>Processing...</span>
          </motion.div>
        )}

        {/* Input Line */}
        <div className="flex items-center mt-2">
          <span className="mr-2 text-cyan-400 font-semibold">$</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white caret-green-400 font-mono"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
            placeholder={isTyping ? "Processing..." : "Type a command..."}
          />
          {showCursor && !isTyping && (
            <span className="text-green-400 animate-pulse">▋</span>
          )}
        </div>

        {/* Hint for new users */}
        {history.length <= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-4 text-gray-500 text-xs italic"
          >
            💡 Try: "home", "about", "projects", or "contact" to navigate to pages!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;