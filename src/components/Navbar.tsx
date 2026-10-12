import React from 'react';
import { ShoppingCart, Wrench, Package, Sun, Moon, Lock, Home, Grid } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'builder';
  setActiveTab: (tab: 'home' | 'catalog' | 'builder') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenStorePanel: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenStorePanel,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0F2233] text-white shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B7A75] flex items-center justify-center shadow-lg text-[#F4B400] font-bold text-lg sm:text-xl">
            T
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
              Tec-Soluciono
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#F4B400] font-medium tracking-wide uppercase block">
              Soporte & Componentes
            </span>
          </div>
        </div>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-[#0B7A75] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-[#0B7A75] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Catálogo</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'bg-[#0B7A75] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Ensamblador PC</span>
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
            title="Cambiar modo oscuro / claro"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F4B400]" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs font-medium"
          >
            <ShoppingCart className="w-4 h-4 text-[#F4B400]" />
            <span className="hidden sm:inline">Cotización</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F4B400] text-[#0F2233] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Store Panel Button */}
          <button
            onClick={onOpenStorePanel}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg border border-teal-500/30 whitespace-nowrap shrink-0"
          >
            <Lock className="w-3.5 h-3.5 text-[#F4B400]" />
            <span className="hidden sm:inline">Panel de tienda</span>
            <span className="sm:hidden">Panel</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Nav Bar */}
      <div className="md:hidden flex items-center justify-center gap-1 bg-[#081118]/90 px-2 py-2 border-t border-white/10">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'home' ? 'bg-[#0B7A75] text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'catalog' ? 'bg-[#0B7A75] text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Catálogo</span>
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'builder' ? 'bg-[#0B7A75] text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-[#F4B400]" />
          <span>Ensamblador</span>
        </button>
      </div>
    </header>
  );
};
