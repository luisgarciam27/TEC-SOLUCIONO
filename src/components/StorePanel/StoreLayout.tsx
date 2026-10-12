import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Lock, 
  User, 
  Key, 
  ArrowLeft,
  Sun,
  Moon,
  Bell
} from 'lucide-react';
import { Product, Quote, Client, StoreConfig } from '../types';
import { ResumenView } from './ResumenView';
import { InventarioView } from './InventarioView';
import { CotizacionesView } from './CotizacionesView';
import { ClientesView } from './ClientesView';
import { ConfiguracionView } from './ConfiguracionView';
import { ToastMessage } from '../components/Toast';

interface StoreLayoutProps {
  onBackToCustomer: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  config: StoreConfig;
  setConfig: React.Dispatch<React.SetStateAction<StoreConfig>>;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export type StoreTab = 'resumen' | 'inventario' | 'cotizaciones' | 'clientes' | 'configuracion';

export const StoreLayout: React.FC<StoreLayoutProps> = ({
  onBackToCustomer,
  products,
  setProducts,
  quotes,
  setQuotes,
  clients,
  setClients,
  config,
  setConfig,
  addToast,
  darkMode,
  setDarkMode,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('1234');
  const [activeTab, setActiveTab] = useState<StoreTab>('resumen');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput && passwordInput) {
      setIsLoggedIn(true);
      addToast('Sesión iniciada correctamente en el Panel de Tienda', 'success');
    }
  };

  const handleQuickLogin = () => {
    setUsernameInput('admin');
    setPasswordInput('1234');
    setIsLoggedIn(true);
    addToast('Sesión iniciada correctamente en el Panel de Tienda', 'success');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#EEF3F7] dark:bg-[#081118] text-[#0F2233] dark:text-gray-100 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToCustomer}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B7A75] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la tienda</span>
            </button>
            <span className="px-3 py-1 bg-[#0B7A75]/10 text-[#0B7A75] text-[11px] font-bold rounded-full">
              Acceso Seguro
            </span>
          </div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0B7A75] text-[#F4B400] rounded-2xl mx-auto flex items-center justify-center text-2xl font-extrabold shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold">Panel de Tienda (CRM)</h2>
            <p className="text-xs text-gray-500">
              Ingresa tus credenciales para administrar inventario, cotizaciones y clientes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white font-bold text-sm shadow-lg transition-all"
            >
              Ingresar al Panel
            </button>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              Acceso Rápido (Demo)
            </button>
          </form>

          <p className="text-[11px] text-center text-gray-400">
            Usuario de ejemplo: <span className="font-mono font-bold text-gray-600 dark:text-gray-300">admin</span> / <span className="font-mono font-bold text-gray-600 dark:text-gray-300">1234</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF3F7] dark:bg-[#081118] text-[#0F2233] dark:text-gray-100 flex flex-col md:flex-row">
      {/* PC Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-[#0F2233] text-white flex-col justify-between shrink-0 border-r border-white/10 sticky top-0 h-screen">
        <div className="p-6 space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B7A75] flex items-center justify-center text-[#F4B400] font-bold text-xl shadow">
              T
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white leading-tight">
                {config.storeName}
              </h3>
              <span className="text-[10px] text-[#F4B400] font-semibold uppercase">
                Panel CRM & Admin
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <SidebarItem
              icon={<BarChart3 className="w-4 h-4" />}
              label="Resumen"
              active={activeTab === 'resumen'}
              onClick={() => setActiveTab('resumen')}
            />
            <SidebarItem
              icon={<Package className="w-4 h-4" />}
              label="Inventario"
              active={activeTab === 'inventario'}
              onClick={() => setActiveTab('inventario')}
              badge={products.filter((p) => p.stock < 5).length}
            />
            <SidebarItem
              icon={<FileText className="w-4 h-4" />}
              label="Cotizaciones"
              active={activeTab === 'cotizaciones'}
              onClick={() => setActiveTab('cotizaciones')}
              badge={quotes.filter((q) => q.status === 'Nueva').length}
            />
            <SidebarItem
              icon={<Users className="w-4 h-4" />}
              label="Clientes"
              active={activeTab === 'clientes'}
              onClick={() => setActiveTab('clientes')}
            />
            <SidebarItem
              icon={<Settings className="w-4 h-4" />}
              label="Configuración"
              active={activeTab === 'configuracion'}
              onClick={() => setActiveTab('configuracion')}
            />
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <button
            onClick={onBackToCustomer}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold transition-colors text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 text-[#F4B400]" />
            <span>Ver Catálogo Web</span>
          </button>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              addToast('Sesión cerrada correctamente', 'info');
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-[#0F1E29] border-b border-gray-200 dark:border-gray-800 h-20 px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 dark:text-white capitalize">
              {activeTab === 'resumen' && 'Resumen General del Negocio'}
              {activeTab === 'inventario' && 'Gestión de Inventario & Stock'}
              {activeTab === 'cotizaciones' && 'Control de Cotizaciones & Ventas'}
              {activeTab === 'clientes' && 'CRM de Clientes & Seguimientos'}
              {activeTab === 'configuracion' && 'Configuración General de la Tienda'}
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Panel administrativo sincronizado con el catálogo de clientes en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#F4B400]" /> : <Moon className="w-4 h-4 text-[#0B7A75]" />}
            </button>

            {/* Logout on mobile */}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="md:hidden p-2 rounded-xl bg-rose-100 text-rose-700"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Section View */}
        <main className="p-6 sm:p-8 flex-1">
          {activeTab === 'resumen' && (
            <ResumenView
              products={products}
              quotes={quotes}
              clients={clients}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'inventario' && (
            <InventarioView
              products={products}
              setProducts={setProducts}
              addToast={addToast}
            />
          )}
          {activeTab === 'cotizaciones' && (
            <CotizacionesView
              quotes={quotes}
              setQuotes={setQuotes}
              clients={clients}
              products={products}
              setProducts={setProducts}
              addToast={addToast}
              config={config}
            />
          )}
          {activeTab === 'clientes' && (
            <ClientesView
              clients={clients}
              setClients={setClients}
              quotes={quotes}
              addToast={addToast}
            />
          )}
          {activeTab === 'configuracion' && (
            <ConfiguracionView
              config={config}
              setConfig={setConfig}
              addToast={addToast}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0F1E29] border-t border-gray-200 dark:border-gray-800 px-2 py-2 flex items-center justify-around shadow-lg">
        <MobileNavItem
          icon={<BarChart3 className="w-5 h-5" />}
          label="Resumen"
          active={activeTab === 'resumen'}
          onClick={() => setActiveTab('resumen')}
        />
        <MobileNavItem
          icon={<Package className="w-5 h-5" />}
          label="Stock"
          active={activeTab === 'inventario'}
          onClick={() => setActiveTab('inventario')}
          badge={products.filter((p) => p.stock < 5).length}
        />
        <MobileNavItem
          icon={<FileText className="w-5 h-5" />}
          label="Cots"
          active={activeTab === 'cotizaciones'}
          onClick={() => setActiveTab('cotizaciones')}
          badge={quotes.filter((q) => q.status === 'Nueva').length}
        />
        <MobileNavItem
          icon={<Users className="w-5 h-5" />}
          label="Clientes"
          active={activeTab === 'clientes'}
          onClick={() => setActiveTab('clientes')}
        />
        <MobileNavItem
          icon={<Settings className="w-5 h-5" />}
          label="Config"
          active={activeTab === 'configuracion'}
          onClick={() => setActiveTab('configuracion')}
        />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
      active
        ? 'bg-[#0B7A75] text-white shadow-md'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && badge > 0 ? (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4B400] text-[#0F2233]">
        {badge}
      </span>
    ) : null}
  </button>
);

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
      active ? 'text-[#0B7A75] dark:text-teal-400 font-bold' : 'text-gray-500 hover:text-gray-800'
    }`}
  >
    {icon}
    <span className="text-[10px]">{label}</span>
    {badge && badge > 0 ? (
      <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#F4B400] text-[#0F2233] text-[9px] font-bold flex items-center justify-center">
        {badge}
      </span>
    ) : null}
  </button>
);
