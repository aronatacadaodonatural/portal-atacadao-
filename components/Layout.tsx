
import React, { useState } from 'react';
import { Instagram, Facebook, Globe, Lock, ArrowLeft, Building2 } from 'lucide-react';
import { TOOLS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onOpenRestricted: () => void;
  isRestrictedView?: boolean;
  onGoBack?: () => void;
}

const LogoImage: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="h-10 w-10 rounded-xl bg-emerald-900/40 border border-[#D9B596]/30 flex items-center justify-center text-[#D9B596]">
        <Building2 size={20} />
      </div>
    );
  }

  return (
    <img 
      src="https://i.postimg.cc/44zt2nHK/Logo.png" 
      alt="Atacadão do Natural" 
      className={className}
      onError={() => setImageFailed(true)} 
    />
  );
};

const Header: React.FC<{ onOpenRestricted: () => void; isRestrictedView?: boolean; onGoBack?: () => void }> = ({ 
  onOpenRestricted, 
  isRestrictedView, 
  onGoBack 
}) => (
  <nav className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#D9B596]/10 px-4 sm:px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <button 
        type="button"
        onClick={onGoBack} 
        aria-label="Voltar para a página inicial"
        className="flex items-center gap-3 sm:gap-4 text-left group focus:outline-none focus:ring-2 focus:ring-[#185947] rounded-xl p-1"
      >
        <LogoImage className="h-9 sm:h-10 w-auto transition-transform group-hover:scale-105" />
        <div className="flex flex-col">
          <span className="text-white font-bold text-base sm:text-lg leading-tight group-hover:text-[#D9B596] transition-colors">
            Atacadão do Natural
          </span>
          <span className="text-[#D9B596] text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold">
            Portal Corporativo
          </span>
        </div>
      </button>
      
      <div className="flex items-center gap-3 sm:gap-4">
        {isRestrictedView ? (
          <button 
            type="button"
            onClick={onGoBack}
            className="flex items-center gap-2 bg-[#185947]/30 border border-emerald-700/40 text-emerald-300 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase hover:bg-[#185947]/50 transition-all active:scale-95"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Voltar ao</span> Portal
          </button>
        ) : (
          <button 
            type="button"
            onClick={onOpenRestricted}
            className="flex items-center gap-2 bg-[#D9B596]/10 border border-[#D9B596]/30 text-[#D9B596] px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase hover:bg-[#D9B596]/20 transition-all active:scale-95 shadow-sm"
          >
            <Lock size={14} />
            Área Restrita
          </button>
        )}
        <div className="hidden md:block bg-[#185947] border border-[#D9B596]/20 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Acesso Interno
        </div>
      </div>
    </div>
  </nav>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Ordena as ferramentas alfabeticamente para o Acesso Rápido de forma segura
  const sortedTools = Array.isArray(TOOLS) 
    ? [...TOOLS].sort((a, b) => a.title.localeCompare(b.title)) 
    : [];

  return (
    <footer className="bg-[#0D0D0D] border-t border-[#D9B596]/10 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <LogoImage className="h-10 w-auto" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Sua central completa de ferramentas operacionais para gestão eficiente de produtos naturais e orgânicos.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, url: 'https://www.instagram.com/atacadaodonatural/', label: 'Instagram do Atacadão do Natural' },
              { Icon: Facebook, url: 'https://www.facebook.com/atacadaodonatural/', label: 'Facebook do Atacadão do Natural' },
              { Icon: Globe, url: 'https://www.atacadaodonatural.com.br/', label: 'Site Oficial do Atacadão do Natural' }
            ].map(({ Icon, url, label }, i) => (
              <a 
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg bg-emerald-900/20 border border-[#D9B596]/20 flex items-center justify-center text-[#D9B596] hover:bg-emerald-900/40 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#185947]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[#D9B596] text-xs font-bold uppercase tracking-widest mb-6">Acesso Rápido (A-Z)</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-4">
            {sortedTools.map((tool) => (
              <li key={tool.id}>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D9B596] text-sm transition-all flex items-center gap-2 group focus:outline-none focus:text-[#D9B596]"
                >
                  <span className="w-1 h-1 bg-emerald-800 rounded-full group-hover:bg-[#D9B596] transition-colors"></span>
                  {tool.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#D9B596] text-xs font-bold uppercase tracking-widest mb-6">Suporte e Info</h4>
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="font-bold text-gray-300 mb-1">Uso Restrito</p>
              <p className="text-gray-400 text-xs leading-relaxed">Portal corporativo de uso exclusivo para colaboradores e parceiros autorizados.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-300 font-medium">Sistemas Operacionais: Online</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#D9B596]/5 text-center">
        <p className="text-gray-500 text-xs">© {currentYear} Atacadão do Natural. Todos os direitos reservados.</p>
        <p className="text-gray-600 text-[10px] mt-2">Desenvolvido com excelência operacional e segurança.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onOpenRestricted, isRestrictedView, onGoBack }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0a1612]">
      <div className="organic-pattern fixed inset-0 pointer-events-none z-0 opacity-40" />
      <Header onOpenRestricted={onOpenRestricted} isRestrictedView={isRestrictedView} onGoBack={onGoBack} />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};
