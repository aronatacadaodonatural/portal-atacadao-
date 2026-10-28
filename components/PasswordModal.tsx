
import React, { useState, useEffect } from 'react';
import { Lock, X, ChevronRight } from 'lucide-react';
import { CORRECT_PASSWORD } from '../constants';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a1612]/95 backdrop-blur-xl">
      <div className="bg-[#F2F2F2] w-full max-w-md rounded-2xl p-10 shadow-2xl relative border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-900/10 rounded-full flex items-center justify-center text-[#185947] mb-8 border-2 border-emerald-900/10">
            <Lock size={32} />
          </div>
          
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-3">Área Restrita</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Esta área é de acesso exclusivo para gestores. Por favor, insira a senha corporativa para prosseguir.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-800 text-left px-1">
                Senha de Acesso
              </label>
              <input 
                autoFocus
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                className={`w-full bg-white border-2 py-4 rounded-xl text-center text-xl font-bold tracking-[0.5em] focus:outline-none transition-all ${
                  error ? 'border-red-500' : 'border-emerald-900/10 focus:border-[#185947]'
                }`}
              />
              {error && (
                <p className="text-red-500 text-xs font-semibold animate-pulse">
                  Senha incorreta. Verifique e tente novamente.
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 text-xs font-bold uppercase text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-[#185947] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0D0D0D] transition-all shadow-lg active:scale-95"
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
