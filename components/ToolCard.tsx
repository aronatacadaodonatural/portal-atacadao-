
import React from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Tool } from '../types';
import { getToolIcon } from '../constants';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const status = tool.status || 'active';

  const getStatusBadge = () => {
    switch (status) {
      case 'maintenance':
        return {
          label: 'Manutenção',
          classes: 'bg-amber-50 text-amber-700 border border-amber-200',
          Icon: AlertTriangle,
        };
      case 'beta':
        return {
          label: 'Beta',
          classes: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
          Icon: Sparkles,
        };
      case 'active':
      default:
        return {
          label: 'Ativo',
          classes: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
          Icon: CheckCircle2,
        };
    }
  };

  const statusInfo = getStatusBadge();
  const StatusIcon = statusInfo.Icon;

  return (
    <a
      href={tool.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Acessar ferramenta ${tool.title}`}
      className="group relative bg-white rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-emerald-800/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#185947] focus:ring-offset-2"
    >
      <div className="space-y-4">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#185947] group-hover:bg-[#185947] group-hover:text-white transition-all duration-300 shadow-sm">
            {getToolIcon(tool.category)}
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusInfo.classes}`}>
            <StatusIcon size={11} />
            {statusInfo.label}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="inline-block text-[#185947] text-[10px] font-extrabold uppercase tracking-widest opacity-70">
            {tool.category}
          </span>
          <h3 className="text-[#0D0D0D] font-bold text-lg leading-tight group-hover:text-[#185947] transition-colors">
            {tool.title}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
            {tool.description || 'Ferramenta operacional corporativa do Atacadão do Natural.'}
          </p>
        </div>
      </div>

      {/* Footer/Link visual cue */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[#185947]">
        <span className="text-xs font-bold uppercase tracking-wider group-hover:underline">
          Acessar Ferramenta
        </span>
        <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </a>
  );
};
