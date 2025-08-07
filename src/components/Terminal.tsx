import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateWelcomeBanner = (): string[] => {
  return [
    ' /\\_/\\     ┌──────────────────────────┐',
    '( o.o )    │ welcome to djay\'s terminal │',
    ' > ^ <     └──────────────────────────┘',
    '',
    'type "help" to explore available commands.',
    ''
  ];
};

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

// Word lists for dynamic sentence generation
const commonWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'had', 'day', 'get', 'use', 'man', 'new', 'now', 'way', 'may', 'say', 'each', 'which', 'their', 'time', 'will', 'about', 'if', 'up', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'what', 'see', 'him', 'two', 'how', 'its', 'who', 'did', 'yes', 'his', 'been', 'long', 'well', 'were', 'said', 'each', 'she', 'have', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'over', 'also', 'back', 'after', 'first', 'well', 'work'
];

const techWords = [
  'code', 'debug', 'array', 'object', 'function', 'variable', 'method', 'class', 'import', 'export', 'async', 'await', 'promise', 'callback', 'event', 'element', 'component', 'props', 'state', 'hook', 'render', 'virtual', 'browser', 'server', 'client', 'database', 'query', 'response', 'request', 'api', 'json', 'xml', 'html', 'css', 'javascript', 'typescript', 'react', 'node', 'npm', 'git', 'github', 'deploy', 'build', 'test', 'mock', 'unit', 'integration', 'framework', 'library', 'package', 'module', 'interface', 'type', 'string', 'number', 'boolean', 'null', 'undefined', 'console', 'log', 'error', 'warning'
];

// Generate random typing test sentence
const generateTypingTest = (length: number = 12): string => {
  const allWords = [...commonWords, ...techWords];
  const words: string[] = [];
  
  for (let i = 0; i < length; i++) {
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    words.push(randomWord);
  }
  
  // Capitalize first word and add period
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
};

// Custom hook for command handling (Minimalist version)
const useCommandHandler = () => {
  const navigationCommands: Record<string, string> = {
    'home': '/astro-portfolio/',
    'about': '/astro-portfolio/about',
    'projects': '/astro-portfolio/projects',
    'connect': '/astro-portfolio/connect'
  };

  const handleCommand = (command: string): { type: 'navigate' | 'response', data: string[] | string } => {
    const trimmedCommand = command.trim();
    const mainCommand = trimmedCommand.toLowerCase();

    // Navigation commands
    if (navigationCommands[mainCommand]) {
      return {
        type: 'navigate',
        data: navigationCommands[mainCommand]
      };
    }

    const responses: string[] = [];

    switch (mainCommand) {
      case 'help':
        responses.push(
          'Available Commands:',
          '─'.repeat(25),
          '• home, about, projects, connect (Navigate to pages)',
          '• clear                     (Clear terminal)',
          '• sound                     (Toggle sound on/off)',
          '• typing                    (Start typing test)'
        );
        break;

      case 'clear':
        responses.push('clear');
        return { type: 'response', data: responses };

      case 'sound':
        responses.push('sound');
        return { type: 'response', data: responses };

      case 'typing':
        responses.push('typing');
        return { type: 'response', data: responses };

      default:
        responses.push(
          `bash: ${trimmedCommand}: command not found`,
          'Type "help" for a list of commands.'
        );
        return { type: 'response', data: responses };
    }

    return { type: 'response', data: responses };
  };

  return { handleCommand };
};

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>(() => 
    generateWelcomeBanner().map(line => ({ type: 'output', content: line }))
  );
  const [input, setInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentSoundFile, setCurrentSoundFile] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Global WPM tracking
  const [globalWpm, setGlobalWpm] = useState({
    startTime: 0,
    charactersTyped: 0,
    currentWpm: 0
  });
  
  // Typing test states
  const [typingTest, setTypingTest] = useState({
    active: false,
    sentence: '',
    userInput: '',
    startTime: 0,
    wpm: 0,
    accuracy: 100,
    completed: false
  });

  const { handleCommand } = useCommandHandler();

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus management
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Calculate global WPM for all typing
  useEffect(() => {
    if (globalWpm.startTime && globalWpm.charactersTyped > 0) {
      const timeElapsed = (Date.now() - globalWpm.startTime) / 1000 / 60; // minutes
      const wordsTyped = globalWpm.charactersTyped / 5; // Standard: 5 characters = 1 word
      const wpm = Math.round(wordsTyped / Math.max(timeElapsed, 0.1));
      setGlobalWpm(prev => ({ ...prev, currentWpm: wpm }));
    }
  }, [globalWpm.charactersTyped, globalWpm.startTime]);

  // Reset global WPM after inactivity
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      if (globalWpm.startTime && Date.now() - globalWpm.startTime > 10000) { // 10 seconds inactivity
        setGlobalWpm({ startTime: 0, charactersTyped: 0, currentWpm: 0 });
      }
    }, 10000);
    return () => clearTimeout(resetTimer);
  }, [globalWpm.startTime]);

  const playSound = (type: 'keypress' | 'enter' | 'error') => {
    if (!soundEnabled) return;

    try {
        if (type === 'keypress') {
        let audioPath = currentSoundFile;
        // If currentSoundFile is not set, pick one randomly for the first time
        if (!audioPath) {
          const soundIndex = Math.floor(Math.random() * 7) + 1;
          audioPath = `/public/audio/sound${soundIndex}.wav`;
          setCurrentSoundFile(audioPath); // Set the new random sound as the current sound
        }

        const audio = new Audio(audioPath);
        audio.volume = 0.5;
        audio.play().catch(() => {
            // silent fallback if autoplay fails
        });
        return;
        }

        // original oscillator-based sounds for 'enter' and 'error'
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
        audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
        case 'enter':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;

        case 'error':
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        }
    } catch (error) {
        // Silent fallback
    }
  };

  const startTypingTest = () => {
    const randomSentence = generateTypingTest(15); // Generate 15 words
    setTypingTest({
      active: true,
      sentence: randomSentence,
      userInput: '',
      startTime: 0,
      wpm: 0,
      accuracy: 100,
      completed: false
    });
    setHistory(prev => [...prev, 
      { type: 'output', content: '' },
      { type: 'output', content: '🚀 Typing Test Started!' },
      { type: 'output', content: '─'.repeat(50) },
      { type: 'output', content: `Type the following sentence:` },
      { type: 'output', content: '' },
      { type: 'output', content: `"${randomSentence}"` },
      { type: 'output', content: '' },
      { type: 'output', content: 'Start typing to begin the timer. Press ESC to exit.' },
      { type: 'output', content: '' }
    ]);
  };

  const endTypingTest = () => {
    if (typingTest.completed) {
      setHistory(prev => [...prev,
        { type: 'output', content: '' },
        { type: 'output', content: '🎉 Typing Test Completed!' },
        { type: 'output', content: `Final WPM: ${typingTest.wpm}` },
        { type: 'output', content: `Final Accuracy: ${typingTest.accuracy}%` },
        { type: 'output', content: '' }
      ]);
    } else {
      setHistory(prev => [...prev,
        { type: 'output', content: '' },
        { type: 'output', content: '⏹️  Typing test cancelled.' },
        { type: 'output', content: '' }
      ]);
    }
    setTypingTest({
      active: false,
      sentence: '',
      userInput: '',
      startTime: 0,
      wpm: 0,
      accuracy: 100,
      completed: false
    });
  };

  const typeResponse = async (responses: string[], onUpdate: (line: TerminalLine) => void) => {
    setIsTyping(true);
    for (const response of responses) {
      if (!response.trim()) {
          onUpdate({ type: 'output', content: '' });
          await new Promise(resolve => setTimeout(resolve, 50));
      } else {
          onUpdate({ type: 'output', content: response });
      }
    }
    setIsTyping(false);
  };
  
  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Change sound randomly on every enter press
    const soundIndex = Math.floor(Math.random() * 7) + 1;
    const newSoundPath = `/public/audio/sound${soundIndex}.wav`;
    setCurrentSoundFile(newSoundPath);

    playSound('enter');
    setCommandHistory(prev => {
      const newHistory = [trimmedCommand, ...prev.filter(cmd => cmd !== trimmedCommand)];
      return newHistory.slice(0, 20); // Keep last 20 commands
    });
    setHistoryIndex(-1);

    setHistory(prev => [...prev, { type: 'command', content: `$ ${trimmedCommand}` }]);

    const result = handleCommand(trimmedCommand);
    
    if (trimmedCommand.toLowerCase() === 'clear') {
      setHistory(generateWelcomeBanner().map(line => ({ type: 'output', content: line })));
      setInput('');
      return;
    }

    if (trimmedCommand.toLowerCase() === 'sound') {
      setSoundEnabled(prev => !prev);
      const status = !soundEnabled ? 'enabled' : 'disabled';
      setHistory(prev => [...prev, { type: 'output', content: `Sound ${status}.` }]);
      setInput('');
      return;
    }

    if (trimmedCommand.toLowerCase() === 'typing') {
      startTypingTest();
      setInput('');
      return;
    }

    if (result.type === 'navigate') {
      const responses = [`🚀 Navigating to ${trimmedCommand} page...`];
      await typeResponse(responses, line => setHistory(prev => [...prev, line]));
      setTimeout(() => {
        window.location.href = result.data as string;
      }, 300);
      setInput('');
    } else {
      const responses = result.data as string[];
      const isError = responses[0]?.startsWith('bash:');
      if (isError) playSound('error');

      await typeResponse(responses, line => {
        setHistory(prev => [...prev, { ...line, type: isError ? 'error' : 'output' }]);
      });
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Track global WPM for all typing (not just typing test)
    if (!typingTest.active) {
      if (!globalWpm.startTime && newValue.length > 0) {
        setGlobalWpm({ startTime: Date.now(), charactersTyped: 1, currentWpm: 0 });
      } else if (globalWpm.startTime && newValue.length > input.length) {
        const newCharCount = globalWpm.charactersTyped + 1;
        const timeElapsed = (Date.now() - globalWpm.startTime) / 1000 / 60; // minutes
        const wordsTyped = newCharCount / 5; // Standard: 5 characters = 1 word
        const wpm = Math.round(wordsTyped / Math.max(timeElapsed, 0.1));
        setGlobalWpm(prev => ({ 
          ...prev, 
          charactersTyped: newCharCount,
          currentWpm: wpm 
        }));
      }
    }
    
    if (typingTest.active) {
      // Handle typing test input
      if (!typingTest.startTime && newValue.length > 0) {
        setTypingTest(prev => ({ ...prev, startTime: Date.now() }));
      }
      
      // Check if test is completed
      if (newValue === typingTest.sentence) {
        setTypingTest(prev => ({ ...prev, userInput: newValue, completed: true }));
        setTimeout(() => endTypingTest(), 500);
        return;
      }
      
      setTypingTest(prev => ({ ...prev, userInput: newValue }));
      if (newValue.length > input.length && !isTyping) {
        playSound('keypress');
      }
      setInput(newValue);
      return;
    }

    // Normal terminal input
    if (newValue.length > input.length && !isTyping) {
      playSound('keypress');
    }
    setInput(newValue);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (typingTest.active) {
      if (e.key === 'Escape') {
        endTypingTest();
        setInput('');
      }
      return;
    }

    if (e.key === 'Enter' && !isTyping) {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'home', 'about', 'projects', 'connect', 'clear', 'sound', 'typing'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const completionLine = { type: 'output' as const, content: `Possible completions: ${matches.join(', ')}` };
        setHistory(prev => [...prev, completionLine]);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Render typed text with correct/incorrect highlighting
  const renderTypingProgress = () => {
    if (!typingTest.active) return null;
    
    const { sentence, userInput } = typingTest;
    return (
      <div className="mb-4 p-3 bg-gray-800/50 rounded border border-gray-600">
        <div className="text-sm mb-2 flex justify-between items-center">
          <span className="text-cyan-400">Live Stats:</span>
          <div className="flex gap-4 text-xs">
            <span className="text-green-400">WPM: {typingTest.wpm}</span>
            <span className="text-yellow-400">Accuracy: {typingTest.accuracy}%</span>
          </div>
        </div>
        <div className="font-mono text-base leading-relaxed">
          {sentence.split('').map((char, index) => {
            let className = 'text-gray-400';
            if (index < userInput.length) {
              className = userInput[index] === char ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30';
            } else if (index === userInput.length) {
              className = 'text-white bg-cyan-500/50 animate-pulse';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-gray-800 px-4 py-2 rounded-t-xl border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-300 text-sm font-mono">
            dhananjay@portfolio:~$
          </span>
          {globalWpm.currentWpm > 0 && !typingTest.active && (
            <span className="ml-4 text-cyan-400 text-xs">
              WPM: {globalWpm.currentWpm}
            </span>
          )}
        </div>
        <button
          onClick={toggleSound}
          className={`p-1 rounded text-sm transition-colors ${
            soundEnabled 
              ? 'text-green-400 hover:text-green-300' 
              : 'text-gray-500 hover:text-gray-400'
          }`}
          title={`Sound ${soundEnabled ? 'enabled' : 'disabled'}`}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
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

        {renderTypingProgress()}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-yellow-400"
          >
            <span className="mr-2 animate-spin">⟳</span>
            <span>Processing...</span>
          </motion.div>
        )}

        <div className="flex items-center mt-2 group">
          <span className="mr-2 text-cyan-400 font-semibold">
            {typingTest.active ? '⌨️' : '$'}
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white caret-green-400 font-mono"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={typingTest.active ? "Start typing the sentence above..." : ""}
          />
        </div>
        
        {history.length <= 20 && !typingTest.active && (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
            className="mt-4 text-xs text-gray-400 text-center"
        >
            💡 try <strong>help</strong> for commands, use <strong>↑/↓</strong> for history, and <strong>tab</strong> for autocomplete.
        </motion.div>
        )}

        {typingTest.active && (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
            className="mt-2 text-xs text-gray-400 text-center"
        >
            Press <strong>ESC</strong> to exit typing test
        </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;