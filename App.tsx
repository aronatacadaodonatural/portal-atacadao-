
import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ShieldAlert, ArrowLeft, Layers, Zap, ShieldCheck, Filter, LayoutGrid, AlertTriangle } from 'lucide-react';
import { Layout } from './components/Layout';
import { ToolCard } from './components/ToolCard';
import { PasswordModal } from './components/PasswordModal';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'main' | 'restricted'>('main');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!Array.isArray(TOOLS)) {
        throw new Error("Erro na integridade dos dados.");
      }
    } catch (err) {
      setError("Não foi possível carregar o catálogo de ferramentas. Por favor, recarregue a página ou contate o suporte.");
    }
  }, []);

  const categories = useMemo(() => {
    try {
      if (!TOOLS) return ['All'];
      const cats = Array.from(new Set(TOOLS.map(t => t.category)));
      // Mantém as categorias em ordem alfabética também, após o "Todas"
      return ['All', ...cats.sort((a, b) => a.localeCompare(b))];
    } catch (e) {
      return ['All'];
    }
  }, []);

  const filteredTools = useMemo(() => {
    try {
      if (!TOOLS) return [];
      return TOOLS
        .filter(tool => {
          const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               tool.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
          return matchesSearch && matchesCategory;
        })
        // ORDENAÇÃO ALFABÉTICA OBRIGATÓRIA
        .sort((a, b) => a.title.localeCompare(b.title));
    } catch (e) {
      return [];
    }
  }, [searchTerm, selectedCategory]);

  const handleOpenRestricted = () => {
    setIsModalOpen(true);
  };

  const handlePasswordSuccess = () => {
    setIsModalOpen(false);
    setView('restricted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    setView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout 
      onOpenRestricted={handleOpenRestricted} 
      isRestrictedView={view === 'restricted'}
      onGoBack={handleGoBack}
    >
      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handlePasswordSuccess}
      />

      {view === 'main' ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
          {/* Hero Section */}
          <section className="relative py-20 sm:py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#185947]/40 via-transparent to-transparent" />
            <div className="max-w-5xl mx-auto relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-[#D9B596]/10 border border-[#D9B596]/20 text-[#D9B596] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Sistemas Corporativos
              </div>
              <h1 className="text-4xl sm:text-7xl font-black text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                Central de <span className="text-[#D9B596]">Ferramentas</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16 font-medium opacity-90">
                Hub centralizado para gestão operacional, financeira e de recursos humanos do Atacadão do Natural. 
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { Icon: LayoutGrid, label: 'Ferramentas Ativas', value: TOOLS ? TOOLS.length.toString() : '0' },
                  { Icon: Zap, label: 'Performance', value: '99.9%' },
                  { Icon: ShieldCheck, label: 'Acesso Seguro', value: 'SSL' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                    <stat.Icon className="w-5 h-5 text-[#D9B596]/60 mx-auto mb-3" />
                    <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Search & Filter Controls */}
          <section className="max-w-7xl mx-auto -mt-10 mb-16 px-6 relative z-20">
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 flex flex-col xl:flex-row gap-6">
              {/* Search */}
              <div className="flex-grow relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#185947] transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="Pesquisar ferramentas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-14 pr-12 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#185947]/10 focus:border-[#185947] transition-all"
                  disabled={!!error}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filters - Compacted and Wrap-enabled */}
              <div className="flex items-center flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-2 mr-1">
                  <Filter size={14} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Categorias:</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    disabled={!!error}
                    className={`px-3 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border ${
                      selectedCategory === cat 
                      ? 'bg-[#185947] text-white border-[#185947] shadow-md shadow-emerald-900/20' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {cat === 'All' ? 'Todas' : cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Grid Area with Error Handling */}
          <section className="max-w-7xl mx-auto pb-32 px-6">
            {error ? (
              <div className="animate-in fade-in zoom-in duration-300 py-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Erro ao carregar ferramentas</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-8">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#185947] hover:bg-[#124235] text-white rounded-xl font-bold text-sm transition-all"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTools.map((tool, idx) => (
                    <div key={tool.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
                      <ToolCard tool={tool} />
                    </div>
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className="py-24 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <Search size={24} />
                    </div>
                    <h3 className="text-slate-300 text-lg font-bold mb-1">Nenhum resultado encontrado</h3>
                    <p className="text-slate-500 text-sm">Refine sua busca ou altere a categoria selecionada.</p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-screen">
          <section className="relative py-20 px-6">
            <button 
              onClick={handleGoBack}
              className="absolute top-10 left-10 z-20 flex items-center gap-2 bg-[#185947]/20 text-white px-5 py-2.5 rounded-lg border border-emerald-900/30 hover:bg-[#185947]/40 transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Voltar ao Início
            </button>

            <div className="max-w-4xl mx-auto relative z-10 text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                🔐 Sessão Administrativa Ativa
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                Gestão <span className="text-[#D9B596]">Administrativa</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
                Controle avançado de operações, métricas em tempo real e BI estratégico. 
              </p>
            </div>
          </section>

          <section className="max-w-7xl mx-auto pb-24 px-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               {[
                 { label: 'Relatórios Pendentes', value: '4' },
                 { label: 'Alertas Críticos', value: '0' },
                 { label: 'Logs do Sistema', value: '24h OK' }
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
                   <div className="text-2xl font-black text-[#D9B596]">{item.value}</div>
                 </div>
               ))}
             </div>

             <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-[#D9B596]/10 border border-[#D9B596]/20 rounded-full flex items-center justify-center mx-auto mb-8 text-[#D9B596]">
                   <ShieldAlert size={40} className="animate-pulse" />
                </div>
                <h2 className="text-white text-2xl font-black mb-4 uppercase tracking-wider">Módulo de BI em Construção</h2>
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-10 text-sm">
                   A equipe de infraestrutura está implementando os novos dashboards de análise preditiva e integração com ERP. Esta funcionalidade estará disponível no próximo ciclo de atualização (Q1 2025).
                </p>
                <div className="flex justify-center gap-4">
                  <div className="h-1 w-20 bg-emerald-900/30 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-emerald-500 animate-[loading_2s_infinite]" />
                  </div>
                </div>
             </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default App;
