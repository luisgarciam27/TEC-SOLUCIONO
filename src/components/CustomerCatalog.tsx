import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { Search, Filter, ShoppingCart, Eye, CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface CustomerCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  initialCategory?: string;
}

const CATEGORIES: ProductCategory[] = [
  'PCs',
  'Laptops',
  'Procesador',
  'Placa',
  'RAM',
  'SSD',
  'Video',
  'Case y fuente',
  'Accesorios',
];

export const CustomerCatalog: React.FC<CustomerCatalogProps> = ({ products, onAddToCart, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'stock'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return b.stock - a.stock;
    return 0;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with Interactive Start Buttons */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2233] via-[#163045] to-[#0B7A75] text-white p-6 sm:p-12 shadow-xl border border-white/10 space-y-6">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F4B400] via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-block px-3 py-1 bg-[#F4B400]/20 text-[#F4B400] text-xs font-semibold rounded-full border border-[#F4B400]/30">
            Tec-Soluciono · Catálogo Oficial 2026
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ¿Qué equipo estás buscando hoy?
          </h1>
          <p className="text-xs sm:text-base text-gray-300">
            Selecciona una opción para filtrar al instante nuestro catálogo especializado en alto rendimiento y soporte técnico.
          </p>
        </div>

        {/* Interactive Start Buttons */}
        <div className="relative z-10 flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setSelectedCategory('PCs')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
              selectedCategory === 'PCs'
                ? 'bg-[#F4B400] text-[#0F2233] scale-105 ring-4 ring-[#F4B400]/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span className="text-lg">🖥️</span>
            <span>Busco una PC de Escritorio</span>
          </button>

          <button
            onClick={() => setSelectedCategory('Laptops')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
              selectedCategory === 'Laptops'
                ? 'bg-[#F4B400] text-[#0F2233] scale-105 ring-4 ring-[#F4B400]/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span className="text-lg">💻</span>
            <span>Busco una Laptop Portátil</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search, Category Filters, Sorting */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, procesador, GPU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            >
              <option value="default">Recomendados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="stock">Mayor Stock</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Interactive Filter Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === 'Todos'
                ? 'bg-[#0B7A75] text-white shadow-md'
                : 'bg-white dark:bg-[#0F1E29] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#0B7A75]'
            }`}
          >
            Todos ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0B7A75] text-white shadow-md'
                    : 'bg-white dark:bg-[#0F1E29] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#0B7A75]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {sorted.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0F1E29] rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No se encontraron productos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((prod) => {
            const isOutOfStock = prod.stock === 0;
            const isLowStock = prod.stock > 0 && prod.stock < 5;

            return (
              <div
                key={prod.id}
                className="group bg-white dark:bg-[#0F1E29] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#0F2233]/80 backdrop-blur-md text-white rounded-lg">
                        {prod.category}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-600 text-white rounded-lg shadow">
                          Agotado
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-[#F4B400] text-[#0F2233] rounded-lg shadow">
                          Stock bajo ({prod.stock})
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-[#0B7A75] text-white rounded-lg shadow">
                          En stock ({prod.stock})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1 group-hover:text-[#0B7A75] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer price & actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/60 mt-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Precio</span>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white font-mono">
                      S/. {prod.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                      title="Ver detalle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      disabled={isOutOfStock}
                      onClick={() => onAddToCart(prod)}
                      className={`px-3.5 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                        isOutOfStock
                          ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-[#0B7A75] hover:bg-[#09635F] text-white shadow-[#0B7A75]/20 hover:shadow-md'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Cotizar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[85vh] overflow-y-auto">
            <div className="relative h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 shrink-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-0.5 bg-[#0B7A75] text-white text-[11px] font-bold rounded-lg shadow">
                  {selectedProduct.category}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Precio</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0B7A75] font-mono">
                    S/. {selectedProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Especificaciones Técnicas
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {selectedProduct.specs.socket && (
                      <div>
                        <span className="text-gray-400 block text-[10px]">Socket</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedProduct.specs.socket}
                        </span>
                      </div>
                    )}
                    {selectedProduct.specs.ddr && (
                      <div>
                        <span className="text-gray-400 block text-[10px]">Memoria</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedProduct.specs.ddr}
                        </span>
                      </div>
                    )}
                    {selectedProduct.specs.watts && (
                      <div>
                        <span className="text-gray-400 block text-[10px]">Potencia Requerida</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedProduct.specs.watts}W
                        </span>
                      </div>
                    )}
                    {selectedProduct.specs.maxRam && (
                      <div>
                        <span className="text-gray-400 block text-[10px]">RAM Máxima</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedProduct.specs.maxRam}
                        </span>
                      </div>
                    )}
                    {selectedProduct.specs.formFactor && (
                      <div>
                        <span className="text-gray-400 block text-[10px]">Formato</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedProduct.specs.formFactor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-500">Stock:</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                      selectedProduct.stock > 0
                        ? 'bg-teal-50 text-[#0B7A75] border border-teal-200'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} unid.` : 'Agotado'}
                  </span>
                </div>

                <button
                  disabled={selectedProduct.stock === 0}
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className={`px-5 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-lg transition-all ${
                    selectedProduct.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0B7A75] hover:bg-[#09635F] text-white'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Agregar a Cotización</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
