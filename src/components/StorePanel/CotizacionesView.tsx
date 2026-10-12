import React, { useState } from 'react';
import { Quote, QuoteStatus, Product, Client, StoreConfig } from '../../types';
import { Search, Filter, Eye, Send, Download, Printer, Kanban, Table as TableIcon, X, CheckCircle2 } from 'lucide-react';
import { generateQuotePdf } from '../../utils/pdfGenerator';

interface CotizacionesViewProps {
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  clients: Client[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  config: StoreConfig;
}

const STATUSES: QuoteStatus[] = ['Nueva', 'Enviada', 'Seguimiento', 'Cerrada', 'Perdida'];

export const CotizacionesView: React.FC<CotizacionesViewProps> = ({
  quotes,
  setQuotes,
  clients,
  products,
  setProducts,
  addToast,
  config,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleStatusChange = (quoteId: string, newStatus: QuoteStatus) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          // If changing to 'Cerrada' from something else, deduct stock automatically
          if (newStatus === 'Cerrada' && q.status !== 'Cerrada') {
            setProducts((prodPrev) =>
              prodPrev.map((p) => {
                const itemInQuote = q.items.find((qi) => qi.productId === p.id);
                if (itemInQuote) {
                  const updatedStock = Math.max(0, p.stock - itemInQuote.quantity);
                  return {
                    ...p,
                    stock: updatedStock,
                    status: updatedStock === 0 ? 'Agotado' : updatedStock < 5 ? 'Stock bajo' : 'En stock',
                  };
                }
                return p;
              })
            );
            addToast(`Cotización ${q.id} cerrada. Stock descontado automáticamente.`, 'success');
          } else {
            addToast(`Estado de ${q.id} actualizado a ${newStatus}`, 'success');
          }
          return { ...q, status: newStatus };
        }
        return q;
      })
    );

    if (selectedQuote && selectedQuote.id === quoteId) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleWhatsAppResend = (q: Quote) => {
    addToast(`Cotización ${q.id} reenviada por WhatsApp al cliente ${q.clientName}`, 'success');
  };

  const handleDownloadPdf = (q: Quote) => {
    try {
      generateQuotePdf(q, config);
      addToast(`PDF de cotización ${q.id} generado y descargado correctamente`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Error al generar el documento PDF', 'error');
    }
  };

  const filtered = quotes.filter((q) => {
    const matchesStatus = statusFilter === 'Todos' || q.status === statusFilter;
    const matchesSearch =
      q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente o número COT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
          >
            <option value="Todos">Todos los Estados</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#0F1E29] rounded-xl border border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'table' ? 'bg-[#0B7A75] text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabla</span>
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === 'kanban' ? 'bg-[#0B7A75] text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Tablero Kanban</span>
          </button>
        </div>
      </div>

      {/* Main View: Table vs Kanban */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-[#0F1E29] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Número</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Canal</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                    <td className="px-6 py-4 font-mono font-bold text-[#0B7A75]">{q.id}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(q.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {q.clientName}
                      <span className="block text-[11px] text-gray-400">{q.clientPhone}</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">
                      S/. {q.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{q.channel}</td>
                    <td className="px-6 py-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border focus:outline-none ${
                          q.status === 'Cerrada' ? 'bg-teal-100 text-[#0B7A75] border-teal-300' :
                          q.status === 'Nueva' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                          q.status === 'Seguimiento' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          q.status === 'Perdida' ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {STATUSES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors"
                        title="Ver detalle de cotización"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STATUSES.map((statusCol) => {
            const colQuotes = filtered.filter((q) => q.status === statusCol);
            return (
              <div
                key={statusCol}
                className="bg-white dark:bg-[#0F1E29] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 space-y-3 flex flex-col min-w-[260px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase">
                    {statusCol}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {colQuotes.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colQuotes.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 hover:border-[#0B7A75] cursor-pointer transition-all space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#0B7A75]">{q.id}</span>
                        <span className="text-[10px] text-gray-400">{new Date(q.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {q.clientName}
                      </h4>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-800">
                        <span className="text-xs font-mono font-extrabold text-gray-900 dark:text-white">
                          S/. {q.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">{q.channel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#0B7A75]">{selectedQuote.id}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                  Cotización para {selectedQuote.clientName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block">Teléfono / WhatsApp</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedQuote.clientPhone}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Canal de Entrada</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedQuote.channel}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Equipos y Componentes Cotizados
              </h4>
              <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                {selectedQuote.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-900/30 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">{item.productName}</span>
                      <span className="text-gray-400">Cantidad: {item.quantity} · {item.category}</span>
                    </div>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      S/. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-teal-50 dark:bg-teal-950/30 p-4 rounded-2xl border border-teal-200 dark:border-teal-800">
              <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase">Total Cotizado</span>
              <span className="text-xl font-extrabold text-[#0B7A75] font-mono">
                S/. {selectedQuote.total.toFixed(2)}
              </span>
            </div>

            {/* Internal notes */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Notas Internas
              </label>
              <textarea
                rows={2}
                value={selectedQuote.internalNotes || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedQuote((prev) => (prev ? { ...prev, internalNotes: val } : null));
                  setQuotes((prev) =>
                    prev.map((q) => (q.id === selectedQuote.id ? { ...q, internalNotes: val } : q))
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
              ></textarea>
            </div>

            {/* Status changer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Estado:</span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as QuoteStatus)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold border border-gray-300 dark:border-gray-700"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsAppResend(selectedQuote)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleDownloadPdf(selectedQuote)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white text-xs font-bold shadow transition-all"
                >
                  <Printer className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>Imprimir / Descargar PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
