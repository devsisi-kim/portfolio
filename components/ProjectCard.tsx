import React, { useRef, useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = "", onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    // Calculate rotation: center is (0,0), edges are limits
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation in degrees
    const maxRotation = 5;
    
    const rotateY = ((x - centerX) / centerX) * maxRotation; 
    const rotateX = ((y - centerY) / centerY) * -maxRotation; // Invert X for natural feel

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(project.id)}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/50 backdrop-blur-md shadow-lg transition-all duration-200 ease-out hover:bg-white/70 hover:shadow-2xl dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10 cursor-none ${className}`}
    >
      <div className="flex h-full flex-col p-8 transition-transform duration-200" style={{ transform: 'translateZ(20px)' }}>
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Tag for characteristics */}
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="rounded-full bg-blue-600/90 backdrop-blur-sm px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm"
            >
              {tag}
            </span>
          ))}
          {/* Domain for business areas */}
          {project.domain?.map((dom) => (
            <span 
              key={dom} 
              className="rounded-full border border-zinc-200/50 bg-white/50 backdrop-blur-sm px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
            >
              {dom}
            </span>
          ))}
        </div>
        
        <div className="flex-1">
          <h3 className="mb-2 text-2xl font-bold leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-m leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 ring-1 ring-black/5 dark:ring-white/5 h-[200px] relative">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};