import React, { useState } from 'react';
import { Product, ProductCategory, ProductStatus } from '../../types';
import { Search, Plus, Upload, Download, Edit3, Check, X, AlertTriangle } from 'lucide-react';

interface InventarioViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
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

export const InventarioView: React.FC<InventarioViewProps> = ({
  products,
  setProducts,
  addToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'stock'>('default');

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('PCs');
  const [newPrice, setNewPrice] = useState(1500);
  const [newStock, setNewStock] = useState(10);
  const [newSocket, setNewSocket] = useState('');
  const [newDdr, setNewDdr] = useState<'DDR4' | 'DDR5' | 'N/A'>('DDR5');
  const [newWatts, setNewWatts] = useState(600);
  const [newDescription, setNewDescription] = useState('');

  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditStock(p.stock);
  };

  const saveEditing = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStatus: ProductStatus =
            editStock === 0 ? 'Agotado' : editStock < 5 ? 'Stock bajo' : 'En stock';
          return {
            ...p,
            price: editPrice,
            stock: editStock,
            status: newStatus,
          };
        }
        return p;
      })
    );
    setEditingId(null);
    addToast('Precio y stock actualizados en el catálogo', 'success');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const status: ProductStatus = newStock === 0 ? 'Agotado' : newStock < 5 ? 'Stock bajo' : 'En stock';

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      category: newCategory,
      price: newPrice,
      stock: newStock,
      status,
      specs: {
        socket: newSocket || undefined,
        ddr: newDdr,
        watts: newWatts || undefined,
      },
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: newDescription || 'Nuevo producto agregado al inventario.',
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewDescription('');
    addToast('Producto agregado exitosamente al catálogo', 'success');
  };

  const handleSimulatedImport = () => {
    addToast('Importación de archivo .xlsx/.csv simulada con éxito. 5 nuevos ítems detectados.', 'success');
    setIsImportModalOpen(false);
  };

  const handleExportExcel = () => {
    addToast('Reporte de inventario exportado en formato Excel (.xlsx) correctamente', 'success');
  };

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return b.stock - a.stock;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] border border-gray-300 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B7A75]"
          >
            <option value="Todos">Todas las Categorías</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] hover:bg-gray-50 text-xs font-semibold border border-gray-300 dark:border-gray-700 transition-colors"
          >
            <Upload className="w-4 h-4 text-[#0B7A75]" />
            <span>Importar Excel</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1E29] hover:bg-gray-50 text-xs font-semibold border border-gray-300 dark:border-gray-700 transition-colors"
          >
            <Download className="w-4 h-4 text-[#0B7A75]" />
            <span>Exportar Excel</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4 text-[#F4B400]" />
            <span>Agregar Producto</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#0F1E29] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] sm:text-xs min-w-[650px]">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Producto</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Categoría</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Precio (S/.)</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Stock</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Estado</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sorted.map((prod) => {
                const isEditing = editingId === prod.id;

                return (
                  <tr key={prod.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-xl shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-1">{prod.description}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 font-medium">{prod.category}</td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono font-bold">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editPrice}
                          onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono"
                        />
                      ) : (
                        `S/. ${prod.price.toFixed(2)}`
                      )}
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono font-bold">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono"
                        />
                      ) : (
                        prod.stock
                      )}
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold rounded-lg ${
                        prod.status === 'En stock' ? 'bg-teal-100 text-[#0B7A75]' :
                        prod.status === 'Stock bajo' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {prod.status}
                      </span>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => saveEditing(prod.id)}
                            className="p-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                            title="Guardar cambios"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                            title="Cancelar"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(prod)}
                          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                          title="Editar precio y stock directamente"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Agregar Nuevo Producto</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre del Producto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Tarjeta Gráfica RTX 4070 Ti"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Precio (S/.) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Stock Inicial *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Socket / Atributo</label>
                  <input
                    type="text"
                    placeholder="Ej. LGA1700 o AM5"
                    value={newSocket}
                    onChange={(e) => setNewSocket(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  placeholder="Detalle técnico..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B7A75] text-white text-xs font-bold shadow-lg"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Excel Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#0F1E29] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Importar Catálogo (.xlsx / .csv)</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center space-y-3">
              <Upload className="w-10 h-10 text-[#0B7A75] mx-auto" />
              <p className="text-xs text-gray-500">Arrastra tu archivo Excel aquí o haz clic para buscar</p>
              <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
                Seleccionar Archivo
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-gray-400">Vista previa de columnas detectadas:</h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl text-xs font-mono text-gray-600 dark:text-gray-300">
                [Producto] · [Categoría] · [Precio] · [Stock] · [Socket]
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSimulatedImport}
                className="px-6 py-2.5 rounded-xl bg-[#0B7A75] text-white text-xs font-bold shadow-lg"
              >
                Confirmar Importación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
