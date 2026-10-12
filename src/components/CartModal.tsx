import React, { useState } from 'react';
import { Product, QuoteItem, Quote, Client } from '../types';
import { ShoppingCart, X, Trash2, Plus, Minus, Send, FileText, CheckCircle2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onGenerateQuote: (quoteData: {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    channel: 'WhatsApp' | 'PDF' | 'Catálogo web';
    internalNotes: string;
    items: QuoteItem[];
    total: number;
  }) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onGenerateQuote,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [channel, setChannel] = useState<'WhatsApp' | 'PDF' | 'Catálogo web'>('Catálogo web');
  const [internalNotes, setInternalNotes] = useState('');
  const [successGenerated, setSuccessGenerated] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const igv = subtotal * 0.18;
  const total = subtotal; // price includes IGV in our catalog

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || cart.length === 0) return;

    const quoteItems: QuoteItem[] = cart.map((ci) => ({
      productId: ci.product.id,
      productName: ci.product.name,
      category: ci.product.category,
      price: ci.product.price,
      quantity: ci.quantity,
    }));

    onGenerateQuote({
      clientName,
      clientPhone,
      clientEmail,
      channel,
      internalNotes: internalNotes || 'Generado desde el catálogo web del cliente.',
      items: quoteItems,
      total,
    });

    setSuccessGenerated('¡Cotización generada exitosamente y enviada al panel de la tienda!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#0F2233] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-[#F4B400]" />
            <h2 className="text-lg font-bold">Resumen de Cotización & Carrito</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successGenerated ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-teal-100 text-[#0B7A75] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{successGenerated}</h3>
            <p className="text-sm text-gray-500">
              El equipo de ventas ha recibido tu solicitud. Puedes verla en el Panel de Tienda (sección Cotizaciones y Clientes).
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white font-semibold text-sm transition-all"
              >
                Continuar Navegando
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">Tu carrito de cotización está vacío.</p>
              </div>
            ) : (
              <>
                {/* Cart Items Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Productos en la Cotización ({cart.length})
                  </h4>
                  <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    {cart.map((item) => (
                      <div key={item.product.id} className="p-4 flex items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-900/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-xl shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                              {item.product.name}
                            </h5>
                            <p className="text-xs text-[#0B7A75] font-mono font-bold">
                              S/. {item.product.price.toFixed(2)} c/u
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-700 rounded-lg p-1 bg-white dark:bg-gray-800">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>S/. {(total / 1.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>IGV (18%)</span>
                    <span>S/. {(total - total / 1.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-200 dark:border-gray-800">
                    <span>Total Estimado</span>
                    <span className="text-[#0B7A75] font-mono">S/. {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Contact Form for Quote */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Datos para la Cotización
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Roberto Gómez"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. +51 987 654 321"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Canal Preferido
                      </label>
                      <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                      >
                        <option value="Catálogo web">Catálogo Web</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="PDF">PDF</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Observaciones o Requerimientos Especiales
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Requiero factura con RUC 20..., envío a domicilio..."
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#F4B400]" />
                    <span>Confirmar y Generar Cotización Oficial</span>
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
