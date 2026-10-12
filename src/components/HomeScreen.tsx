import React from 'react';
import { Monitor, Laptop, Wrench, ArrowRight, Grid, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HomeScreenProps {
  onSelectCategory: (category: 'PCs' | 'Laptops' | 'Todos') => void;
  onOpenBuilder: () => void;
}

export const HomeScreen: React.HomeScreenProps = ({ onSelectCategory, onOpenBuilder }: any) => {
  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center py-2 sm:py-4 px-2 animate-fadeIn">
      <div className="w-full max-w-xl bg-gradient-to-br from-[#0F2233] via-[#122A3E] to-[#0B7A75] text-white p-5 sm:p-8 rounded-3xl shadow-2xl border border-white/15 text-center space-y-5 relative overflow-hidden">
        
        {/* Glowing backdrop ambient circle */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F4B400]/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0B7A75]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4B400]/20 text-[#F4B400] text-[11px] font-bold rounded-full border border-[#F4B400]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Tec-Soluciono · High-End Hardware 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Eleva tu Rendimiento Hoy
          </h1>
          <p className="text-xs text-gray-300 max-w-sm mx-auto">
            Potencia tu productividad o gaming con equipos de última generación y garantía directa.
          </p>
        </div>

        {/* 2 Main Choice Cards with High-Conversion Styling */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {/* PC Option */}
          <button
            onClick={() => onSelectCategory('PCs')}
            className="group relative bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-xl border border-white/20 hover:border-[#F4B400] p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl text-center space-y-2 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#F4B400] text-[#0F2233] text-[9px] font-extrabold px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
              Más Vendido
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B7A75] to-[#09635F] text-[#F4B400] flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
              🖥️
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#F4B400] transition-colors">
                PC de Escritorio
              </h3>
              <span className="text-[10px] text-gray-300 block mt-0.5">Rigs Gamer & Estaciones Pro</span>
            </div>
          </button>

          {/* Laptop Option */}
          <button
            onClick={() => onSelectCategory('Laptops')}
            className="group relative bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-xl border border-white/20 hover:border-[#F4B400] p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl text-center space-y-2 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#0B7A75] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-bl-xl uppercase tracking-wider">
              Portátil Pro
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B7A75] to-[#09635F] text-[#F4B400] flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
              💻
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#F4B400] transition-colors">
                Laptops & Ultrabooks
              </h3>
              <span className="text-[10px] text-gray-300 block mt-0.5">Movilidad & Alta Potencia</span>
            </div>
          </button>
        </div>

        {/* Secondary Action Links */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs">
          <button
            onClick={onOpenBuilder}
            className="px-4 py-2 rounded-xl bg-[#F4B400] hover:bg-amber-400 text-[#0F2233] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Ensamblador de PC</span>
          </button>
          <button
            onClick={() => onSelectCategory('Todos')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-white/20"
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ver Todo el Catálogo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
