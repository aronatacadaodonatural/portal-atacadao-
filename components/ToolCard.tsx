
import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Tool } from '../types';
import { getToolIcon } from '../constants';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <article 
      className="group relative bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-emerald-900/10 hover:-translate-y-1"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#185947] group-hover:bg-[#185947] group-hover:text-white transition-all duration-300">
          {getToolIcon(tool.category)}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <CheckCircle2 size={10} />
          {tool.status}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="text-[#185947] text-[10px] font-extrabold uppercase tracking-widest opacity-60">
          {tool.category}
        </span>
        <h3 className="text-[#0D0D0D] font-bold text-lg leading-tight group-hover:text-[#185947] transition-colors">
          {tool.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Footer/Link */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#185947] text-xs font-bold uppercase tracking-wider hover:underline"
        >
          Acessar Ferramenta
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
};
