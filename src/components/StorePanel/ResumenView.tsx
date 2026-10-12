import React, { useState } from 'react';
import { Product, Quote, Client } from '../../types';
import { FileText, DollarSign, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, GripVertical } from 'lucide-react';
import { StoreTab } from './StoreLayout';

interface ResumenViewProps {
  products: Product[];
  quotes: Quote[];
  clients: Client[];
  setActiveTab: (tab: StoreTab) => void;
}

interface MetricCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const ResumenView: React.FC<ResumenViewProps> = ({
  products,
  quotes,
  clients,
  setActiveTab,
}) => {
  // Metrics calculation
  const totalQuotesMonth = quotes.length;
  const totalAmountQuoted = quotes.reduce((acc, q) => acc + q.total, 0);
  const closedQuotes = quotes.filter((q) => q.status === 'Cerrada');
  const totalSalesAmount = closedQuotes.reduce((acc, q) => acc + q.total, 0);
  const closingRate = totalQuotesMonth > 0 ? Math.round((closedQuotes.length / totalQuotesMonth) * 100) : 0;

  const lowStockProducts = products.filter((p) => p.stock < 5);
  const latestQuotes = quotes.slice(0, 5);

  // Cards order state for drag-and-drop customization
  const [cards, setCards] = useState<MetricCardData[]>([
    {
      id: 'quotes',
      title: 'Cotizaciones del Mes',
      value: totalQuotesMonth.toString(),
      subtitle: '+18% vs mes anterior',
      icon: <FileText className="w-5 h-5 text-[#0B7A75]" />,
    },
    {
      id: 'amount',
      title: 'Monto Cotizado',
      value: `S/. ${totalAmountQuoted.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: 'Pipeline activo',
      icon: <DollarSign className="w-5 h-5 text-[#F4B400]" />,
    },
    {
      id: 'sales',
      title: 'Ventas Cerradas',
      value: `S/. ${totalSalesAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtitle: `${closedQuotes.length} cotizaciones concretadas`,
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />,
    },
    {
      id: 'rate',
      title: 'Tasa de Cierre',
      value: `${closingRate}%`,
      subtitle: 'Meta óptima: 50%',
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
    },
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = cards.findIndex((c) => c.id === draggedId);
    const targetIndex = cards.findIndex((c) => c.id === targetId);

    if (draggedIndex < 0 || targetIndex < 0) return;

    const newCards = [...cards];
    const [removed] = newCards.splice(draggedIndex, 1);
    newCards.splice(targetIndex, 0, removed);

    setCards(newCards);
    setDraggedId(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Notice for Drag and Drop */}
      <div className="flex items-center justify-between bg-teal-50 dark:bg-teal-950/30 px-4 py-2.5 rounded-2xl border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-300">
        <span>💡 Consejo: Puedes arrastrar y soltar (Drag & Drop) las tarjetas de resumen para reorganizar tu vista inicial.</span>
      </div>

      {/* Metric Cards Grid with Drag and Drop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, card.id)}
            className={`bg-white dark:bg-[#0F1E29] p-4 sm:p-6 rounded-3xl border shadow-sm space-y-2 sm:space-y-3 cursor-move transition-all duration-200 hover:shadow-md ${
              draggedId === card.id ? 'opacity-40 border-dashed border-[#0B7A75]' : 'border-gray-200 dark:border-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <GripVertical className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider">{card.title}</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800">{card.icon}</div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{card.value}</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Low Stock & Weekly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Weekly Chart simulation */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F1E29] p-4 sm:p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Cotizaciones por Semana (Octubre 2026)
            </h3>
            <span className="text-[11px] text-gray-400">Canal Web & WhatsApp</span>
          </div>

          <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2 sm:px-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            {/* Week 1 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-600 dark:text-gray-400">S/. 18.5k</span>
              <div className="w-full bg-[#0B7A75]/20 hover:bg-[#0B7A75] transition-colors rounded-t-xl h-28 sm:h-36"></div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Sem 1</span>
            </div>
            {/* Week 2 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-600 dark:text-gray-400">S/. 24.2k</span>
              <div className="w-full bg-[#0B7A75]/30 hover:bg-[#0B7A75] transition-colors rounded-t-xl h-36 sm:h-48"></div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Sem 2</span>
            </div>
            {/* Week 3 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-600 dark:text-gray-400">S/. 19.8k</span>
              <div className="w-full bg-[#0B7A75]/25 hover:bg-[#0B7A75] transition-colors rounded-t-xl h-32 sm:h-40"></div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Sem 3</span>
            </div>
            {/* Week 4 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-600 dark:text-gray-400">S/. 31.5k</span>
              <div className="w-full bg-[#F4B400] hover:bg-amber-500 transition-colors rounded-t-xl h-44 sm:h-56"></div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Sem 4</span>
            </div>
          </div>
        </div>

        {/* Low Stock List */}
        <div className="bg-white dark:bg-[#0F1E29] p-4 sm:p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Stock Bajo (&lt; 5)</span>
            </h3>
            <button
              onClick={() => setActiveTab('inventario')}
              className="text-xs font-semibold text-[#0B7A75] hover:underline flex items-center gap-1"
            >
              <span>Ver todo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">No hay productos con stock bajo.</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-gray-400">{p.category}</span>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg shrink-0 ${
                    p.stock === 0 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.stock === 0 ? 'Agotado' : `${p.stock} unid.`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Latest Quotes Table */}
      <div className="bg-white dark:bg-[#0F1E29] p-4 sm:p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Últimas Cotizaciones Generadas
          </h3>
          <button
            onClick={() => setActiveTab('cotizaciones')}
            className="text-xs font-semibold text-[#0B7A75] hover:underline flex items-center gap-1"
          >
            <span>Gestionar todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-left text-[11px] sm:text-xs min-w-[550px]">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-3 sm:px-4 py-3 rounded-l-xl">Número</th>
                <th className="px-3 sm:px-4 py-3">Cliente</th>
                <th className="px-3 sm:px-4 py-3">Fecha</th>
                <th className="px-3 sm:px-4 py-3">Canal</th>
                <th className="px-3 sm:px-4 py-3">Total</th>
                <th className="px-3 sm:px-4 py-3 rounded-r-xl">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {latestQuotes.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                  <td className="px-3 sm:px-4 py-3 font-mono font-bold text-[#0B7A75]">{q.id}</td>
                  <td className="px-3 sm:px-4 py-3 font-medium text-gray-900 dark:text-white">{q.clientName}</td>
                  <td className="px-3 sm:px-4 py-3 text-gray-500">{new Date(q.date).toLocaleDateString()}</td>
                  <td className="px-3 sm:px-4 py-3 text-gray-500">{q.channel}</td>
                  <td className="px-3 sm:px-4 py-3 font-mono font-bold text-gray-900 dark:text-white">
                    S/. {q.total.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] font-bold rounded-lg ${
                      q.status === 'Cerrada' ? 'bg-teal-100 text-[#0B7A75]' :
                      q.status === 'Nueva' ? 'bg-blue-100 text-blue-700' :
                      q.status === 'Seguimiento' ? 'bg-amber-100 text-amber-800' :
                      q.status === 'Perdida' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
