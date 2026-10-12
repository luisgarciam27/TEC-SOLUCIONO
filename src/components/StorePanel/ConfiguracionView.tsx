import React, { useState } from 'react';
import { StoreConfig } from '../../types';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

interface ConfiguracionViewProps {
  config: StoreConfig;
  setConfig: React.Dispatch<React.SetStateAction<StoreConfig>>;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const ConfiguracionView: React.FC<ConfiguracionViewProps> = ({
  config,
  setConfig,
  addToast,
}) => {
  const [storeName, setStoreName] = useState(config.storeName);
  const [logoUrl, setLogoUrl] = useState(config.logoUrl);
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [quoteValidityDays, setQuoteValidityDays] = useState(config.quoteValidityDays);
  const [pdfFooterMessage, setPdfFooterMessage] = useState(config.pdfFooterMessage);
  const [igvRate, setIgvRate] = useState(config.igvRate);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig({
      storeName,
      logoUrl,
      whatsappNumber,
      quoteValidityDays,
      pdfFooterMessage,
      igvRate,
    });
    addToast('Configuración de la tienda guardada correctamente', 'success');
  };

  return (
    <div className="max-w-3xl bg-white dark:bg-[#0F1E29] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 rounded-2xl bg-[#0B7A75]/10 text-[#0B7A75]">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Configuración General del Negocio
          </h3>
          <p className="text-xs text-gray-500">
            Personaliza los parámetros fiscales, vigencia de cotizaciones y datos de contacto de tu tienda.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Nombre de la Tienda
            </label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Número de WhatsApp Oficial
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Vigencia de Cotizaciones (Días)
            </label>
            <input
              type="number"
              required
              value={quoteValidityDays}
              onChange={(e) => setQuoteValidityDays(parseInt(e.target.value) || 7)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Tasa de IGV (%)
            </label>
            <input
              type="number"
              required
              value={igvRate}
              onChange={(e) => setIgvRate(parseFloat(e.target.value) || 18)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            URL del Logotipo de la Tienda
          </label>
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Mensaje de Pie de Página en PDFs
          </label>
          <textarea
            rows={3}
            value={pdfFooterMessage}
            onChange={(e) => setPdfFooterMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
          ></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#F4B400]" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
};
