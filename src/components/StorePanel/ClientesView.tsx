import React, { useState } from 'react';
import { Client, Quote, ClientTag } from '../../types';
import { Search, Users, Phone, Calendar, MessageSquare, Tag, Plus, CheckCircle2, X, Send } from 'lucide-react';

interface ClientesViewProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  quotes: Quote[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ALL_TAGS: ClientTag[] = ['Estudiante', 'Empresa', 'Diseñador', 'Frecuente', 'Gamer', 'VIP'];

export const ClientesView: React.FC<ClientesViewProps> = ({
  clients,
  setClients,
  quotes,
  addToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Editable fields in modal
  const [clientNotes, setClientNotes] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleNote, setScheduleNote] = useState('');

  // Suggested messages for today follow-ups
  const [suggestedMsg, setSuggestedMsg] = useState('Hola, ¿pudiste revisar la cotización enviada? Estamos atentos a cualquier duda.');

  const handleOpenClient = (client: Client) => {
    setSelectedClient(client);
    setClientNotes(client.notes || '');
    setScheduleDate(client.scheduledFollowUp?.date || '');
    setScheduleNote(client.scheduledFollowUp?.note || '');
  };

  const handleSaveClientNotes = () => {
    if (!selectedClient) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === selectedClient.id
          ? {
              ...c,
              notes: clientNotes,
              scheduledFollowUp: scheduleDate ? { date: scheduleDate, note: scheduleNote } : undefined,
            }
          : c
      )
    );
    addToast('Ficha de cliente y seguimiento guardados correctamente', 'success');
    setSelectedClient(null);
  };

  const handleWhatsAppChat = (phone: string, name: string) => {
    addToast(`Abriendo chat de WhatsApp con ${name} (${phone})...`, 'success');
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Today follow-ups simulation (quotes sent > 2 days ago without closing)
  const followUpsToday = quotes.filter((q) => q.status === 'Seguimiento' || q.status === 'Nueva');

  return (
    <div className="space-y-8">
      {/* Seguimientos de Hoy Section */}
      <div className="bg-gradient-to-r from-[#0F2233] to-[#0B7A75] text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#F4B400]" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Seguimientos Pendientes de Hoy ({followUpsToday.length})
            </h3>
          </div>
          <span className="text-xs text-gray-300">Cotizaciones sin respuesta &gt; 2 días</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followUpsToday.slice(0, 3).map((q) => (
            <div key={q.id} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#F4B400]">{q.id}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{q.clientName}</span>
              </div>

              <div>
                <label className="block text-[10px] text-gray-300 mb-1">Mensaje sugerido (editable):</label>
                <input
                  type="text"
                  value={`Hola ${q.clientName}, ¿pudiste revisar la cotización ${q.id}? Quedamos atentos.`}
                  onChange={(e) => setSuggestedMsg(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/20 text-white text-xs border border-white/20 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono font-bold">S/. {q.total.toFixed(2)}</span>
                <button
                  onClick={() => handleWhatsAppChat(q.clientPhone, q.clientName)}
                  className="px-3 py-1.5 rounded-lg bg-[#F4B400] text-[#0F2233] text-xs font-bold flex items-center gap-1 shadow hover:bg-amber-400 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Enviar WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cliente por nombre, teléfono o correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
          />
        </div>
        <span className="text-xs text-gray-400 hidden sm:inline">Total clientes registrados: {clients.length}</span>
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-[#0F1E29] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Origen</th>
                <th className="px-6 py-4">Cotizaciones</th>
                <th className="px-6 py-4">Monto Total</th>
                <th className="px-6 py-4">Etiquetas</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((cli) => (
                <tr key={cli.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">{cli.name}</span>
                      <span className="text-[11px] text-gray-400">{cli.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300">{cli.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{cli.origin}</td>
                  <td className="px-6 py-4 font-bold">{cli.quotesCount}</td>
                  <td className="px-6 py-4 font-mono font-bold text-gray-900 dark:text-white">
                    S/. {cli.totalSpent.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {cli.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 dark:bg-teal-950/40 text-[#0B7A75] dark:text-teal-300 rounded-md border border-teal-200 dark:border-teal-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleWhatsAppChat(cli.phone, cli.name)}
                      className="p-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      title="Escribir por WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenClient(cli)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors"
                      title="Ver Ficha de Cliente"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ficha de Cliente: {selectedClient.name}
                </h3>
                <p className="text-xs text-gray-400">{selectedClient.email} · {selectedClient.phone}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tags & Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-xs">
              <div>
                <span className="text-gray-400 block">Origen</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedClient.origin}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Total Invertido</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">
                  S/. {selectedClient.totalSpent.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Etiquetas</span>
                <div className="flex gap-1 mt-1">
                  {selectedClient.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] bg-teal-100 text-[#0B7A75] rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Historial de Cotizaciones del Cliente
              </h4>
              <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                {quotes
                  .filter((q) => q.clientId === selectedClient.id)
                  .map((q) => (
                    <div key={q.id} className="p-3.5 flex items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-900/30 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#0B7A75]">{q.id}</span>
                        <span className="text-gray-500 ml-2">{new Date(q.date).toLocaleDateString()}</span>
                      </div>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">
                        S/. {q.total.toFixed(2)}
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-teal-100 text-[#0B7A75]">
                        {q.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Notes & Scheduling */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Notas sobre el Cliente
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Programar Seguimiento (Fecha)
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Recordatorio de Seguimiento
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Llamar para confirmar presupuesto"
                    value={scheduleNote}
                    onChange={(e) => setScheduleNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveClientNotes}
                className="px-6 py-2.5 rounded-xl bg-[#0B7A75] text-white text-xs font-bold shadow-lg"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
