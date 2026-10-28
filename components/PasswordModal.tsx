
import React, { useState, useEffect } from 'react';
import { Lock, X, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { CORRECT_PASSWORD } from '../constants';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setShowPassword(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === CORRECT_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0a1612]/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-restricted-title"
    >
      <div 
        className="bg-[#F2F2F2] w-full max-w-md rounded-2xl p-6 sm:p-10 shadow-2xl relative border border-white/20 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#185947]"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-900/10 rounded-full flex items-center justify-center text-[#185947] mb-6 border-2 border-emerald-900/10">
            <Lock size={28} />
          </div>
          
          <h2 id="modal-restricted-title" className="text-xl sm:text-2xl font-black text-[#0D0D0D] mb-2 sm:mb-3">
            Área Restrita
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
            Esta área é de acesso exclusivo para gestores. Por favor, insira a senha corporativa para prosseguir.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="restricted-password-input" 
                className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-800 text-left px-1"
              >
                Senha de Acesso
              </label>
              <div className="relative">
                <input 
                  id="restricted-password-input"
                  autoFocus
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-white border-2 py-3.5 sm:py-4 px-12 rounded-xl text-center text-xl font-bold tracking-[0.4em] focus:outline-none transition-all ${
                    error ? 'border-red-500 text-red-600' : 'border-emerald-900/10 focus:border-[#185947] text-slate-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs font-semibold animate-pulse text-left px-1">
                  Senha incorreta. Verifique e tente novamente.
                </p>
              )}
            </div>

            <div className="flex gap-3 sm:gap-4 pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 sm:py-4 text-xs font-bold uppercase text-gray-500 hover:text-gray-900 transition-colors rounded-xl border border-transparent hover:border-gray-200"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={!password.trim()}
                className="flex-[2] bg-[#185947] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0D0D0D] transition-all shadow-lg active:scale-95"
              >
                Acessar
                <ChevronRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
