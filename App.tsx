import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { ProjectCard } from './components/ProjectCard';
import { PROJECTS, EXPERIENCE, OWNER_NAME, SOCIAL_LINKS, OWNER_ROLE, OWNER_BIO, PROFILE_IMAGE } from './constants';
import { Project } from './types';

type View = 'work' | 'about' | 'project';

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        }
      });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is clickable
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.group') || // For project cards
        target.onclick !== null;

      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
      style={{ transform: `translate(-50%, -50%)` }} // Initial state
    />
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('work');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Initialize dark mode based on user's system preference (device values)
  // Defaults to false (light mode) if preference cannot be detected
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('project');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  // Custom Markdown components to style elements
  const markdownComponents = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      // Check if the source is a video file
      const isVideo = src?.match(/\.(mp4|webm|ogg)$|^data:video/i);

      if (isVideo) {
        return (
          <span className="block my-12 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20 dark:ring-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md transition-transform duration-500 hover:scale-[1.01]">
            <video 
              src={src} 
              className="w-full h-auto block" 
              autoPlay 
              muted 
              loop 
              playsInline
              title={alt}
            >
              {alt}
            </video>
          </span>
        );
      }

      return (
        <span className="block my-12 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20 dark:ring-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md transition-transform duration-500 hover:scale-[1.01]">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-auto object-cover" 
            loading="lazy"
          />
        </span>
      );
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-[#111] transition-colors duration-500 dark:bg-[#050505] dark:text-[#eee] selection:bg-blue-500/30 selection:text-blue-200">
      
      <CustomCursor />

      {/* Ambient Background Glows for Glassmorphism Context */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/10 animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px] dark:bg-purple-600/10" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[40%] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-600/10" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/60 px-6 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 transition-all duration-300 hover:bg-white/80 dark:hover:bg-black/60">
          <button 
            onClick={() => { setView('work'); setSelectedProjectId(null); }}
            className="text-lg font-bold tracking-tighter transition-opacity hover:opacity-70"
          >
            {OWNER_NAME}
          </button>
          <div className="flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => { setView('work'); setSelectedProjectId(null); }}
              className={`transition-all hover:text-blue-500 hover:scale-105 ${view === 'work' ? 'text-black dark:text-white' : 'text-zinc-500'}`}
            >
              Work
            </button>
            <button 
              onClick={() => { setView('about'); setSelectedProjectId(null); }}
              className={`transition-all hover:text-blue-500 hover:scale-105 ${view === 'about' ? 'text-black dark:text-white' : 'text-zinc-500'}`}
            >
              About
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 transition-transform hover:scale-110 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className={`relative z-10 mx-auto max-w-5xl px-6 pb-12 ${view === 'project' ? 'pt-24 md:pt-32' : 'pt-32 md:pt-48'}`}>
        {view === 'work' && (
          <div key="work" className="page-transition">
            <header className="mb-16">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
                {OWNER_ROLE}
              </h1>
            </header>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {PROJECTS.map((proj, idx) => {
                const gridClass = idx % 3 === 0 ? "lg:col-span-4" : "lg:col-span-2";
                return <ProjectCard key={proj.id} project={proj} className={gridClass} onClick={handleProjectClick} />;
              })}
              
              <div className="flex flex-col justify-center rounded-[2rem] bg-blue-600/90 backdrop-blur-sm p-8 text-white shadow-lg lg:col-span-3 border border-blue-500/50 transition-transform duration-300 hover:scale-[1.02]">
                <h3 className="mb-2 text-2xl font-bold">Design × Data</h3>
                <p className="opacity-90 leading-relaxed">Bridging the gap between creative vision and analytical results to build products that scale.</p>
              </div>

              <div className="flex items-center justify-center rounded-[2rem] border border-white/40 bg-white/40 backdrop-blur-md p-8 shadow-lg dark:border-white/5 dark:bg-white/5 lg:col-span-3 transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-center">
                  <span className="text-5xl font-bold tracking-tighter">{PROJECTS.length}+</span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2">Projects Shipped</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'about' && (
          <div key="about" className="page-transition">
            <section className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
              <div className="space-y-6">
                <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-transform hover:scale-[1.01] duration-500">
                   <img 
                    src={PROFILE_IMAGE} 
                    alt={OWNER_NAME} 
                    className="h-full w-full object-cover grayscale brightness-110 contrast-110"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map(link => (
                    <a 
                      key={link.platform} 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-zinc-200/50 bg-white/50 backdrop-blur-sm px-6 py-3 text-center text-sm font-bold transition-all hover:bg-black hover:text-white hover:border-black dark:border-white/10 dark:bg-white/5 dark:hover:bg-white dark:hover:text-black hover:scale-105 active:scale-95"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-16">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold sm:text-6xl tracking-tight leading-tight">Solving problems through focus.</h2>
                  <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {OWNER_BIO}
                  </p>
                </div>

                <div className="rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-md p-10 shadow-xl dark:border-white/5 dark:bg-white/5">
                  <h3 className="mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Career History</h3>
                  <div className="space-y-10">
                    {EXPERIENCE.map(exp => (
                      <div key={exp.id} className="flex flex-col gap-2 sm:flex-row sm:justify-between group">
                        <div className="max-w-md">
                          <h4 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{exp.company}</h4>
                          <p className="text-zinc-500 dark:text-zinc-400">{exp.role}</p>
                        </div>
                        <div className="text-sm font-mono text-zinc-400 sm:text-right pt-1 whitespace-nowrap shrink-0">{exp.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'project' && selectedProject && (
          <div key="project" className="page-transition">
            <header className="mb-20 max-w-4xl mx-auto">
              <button 
                onClick={() => setView('work')}
                className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-blue-500 hover:-translate-x-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Index
              </button>
              <h1 className="mb-4 text-5xl font-bold sm:text-7xl md:text-8xl tracking-tighter leading-[0.9]">
                {selectedProject.title}
              </h1>
              <p className="mb-10 text-2xl sm:text-3xl font-bold text-zinc-400 dark:text-zinc-500 tracking-tight leading-tight">
                {selectedProject.description}
              </p>
              <p className="text-xl sm:text-2xl font-medium text-zinc-500 dark:text-zinc-400 leading-snug">
                {selectedProject.overview}
              </p>
            </header>

            <div className="mb-20 max-w-4xl mx-auto">
              <div className="rounded-[2rem] border border-white/40 bg-white/40 backdrop-blur-md dark:border-white/5 dark:bg-white/5 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Role</h4>
                    <p className="font-semibold">{selectedProject.role}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Timeline</h4>
                    <p className="font-semibold">{selectedProject.period}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Tools</h4>
                    <p className="font-semibold">{selectedProject.tools?.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Domain</h4>
                    <p className="font-semibold">{selectedProject.domain?.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-24 overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full object-cover" />
            </div>

            <div className="max-w-4xl mx-auto pb-20 prose dark:prose-invert">
               <ReactMarkdown components={markdownComponents}>{selectedProject.content}</ReactMarkdown>
            </div>
          </div>
        )}

        <footer className="mt-48 mb-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200/50 pt-8 dark:border-white/5 gap-4">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} {OWNER_NAME}
          </p>
          <div className="flex gap-8 items-center">
            <a href="mailto:seeyeon.jeon@gmail.com" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-blue-500 transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/siyeon-jeon/?locale=en_US" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-blue-500 transition-colors">LinkedIn</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;