import React, { useState, useEffect } from 'react';
import { Product, Quote, Client, StoreConfig, QuoteItem } from './types';
import { initialProducts, initialQuotes, initialClients, initialConfig } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { CustomerCatalog } from './components/CustomerCatalog';
import { PcBuilderModal } from './components/PcBuilderModal';
import { CartModal, CartItem } from './components/CartModal';
import { StoreLayout } from './components/StorePanel/StoreLayout';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';

export default function App() {
  const [appMode, setAppMode] = useState<'customer' | 'store'>('customer');
  const [customerTab, setCustomerTab] = useState<'home' | 'catalog' | 'builder'>('home');
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('Todos');
  
  // Data state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [config, setConfig] = useState<StoreConfig>(initialConfig);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.product.id === product.id);
      if (existing) {
        return prev.map((ci) =>
          ci.product.id === product.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast(`${product.name} agregado a la cotización`, 'success');
  };

  const handleAddBundleToCart = (items: Product[], bundleName: string) => {
    setCart((prev) => {
      const nextCart = [...prev];
      items.forEach((item) => {
        const existing = nextCart.find((ci) => ci.product.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          nextCart.push({ product: item, quantity: 1 });
        }
      });
      return nextCart;
    });
    addToast(`Bundle "${bundleName}" agregado a la cotización correctamente`, 'success');
    setCustomerTab('catalog');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.product.id === productId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((ci) => ci.product.id !== productId));
    addToast('Ítem eliminado de la cotización', 'info');
  };

  // Generate quote from customer cart
  const handleGenerateQuote = (quoteData: {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    channel: 'WhatsApp' | 'PDF' | 'Catálogo web';
    internalNotes: string;
    items: QuoteItem[];
    total: number;
  }) => {
    const newQuoteId = `COT-${String(quotes.length + 1).padStart(4, '0')}`;
    const newQuote: Quote = {
      id: newQuoteId,
      date: new Date().toISOString(),
      clientId: `cli-${Date.now()}`,
      clientName: quoteData.clientName,
      clientPhone: quoteData.clientPhone,
      clientEmail: quoteData.clientEmail,
      items: quoteData.items,
      total: quoteData.total,
      channel: quoteData.channel,
      status: 'Nueva',
      internalNotes: quoteData.internalNotes,
      validDays: config.quoteValidityDays,
    };

    setQuotes((prev) => [newQuote, ...prev]);

    // Check or create client in CRM
    setClients((prev) => {
      const existingClient = prev.find(
        (c) => c.phone === quoteData.clientPhone || c.name.toLowerCase() === quoteData.clientName.toLowerCase()
      );
      if (existingClient) {
        return prev.map((c) =>
          c.id === existingClient.id
            ? {
                ...c,
                quotesCount: c.quotesCount + 1,
                totalSpent: c.totalSpent + quoteData.total,
                lastInteraction: new Date().toISOString(),
              }
            : c
        );
      } else {
        const newClient: Client = {
          id: `cli-${Date.now()}`,
          name: quoteData.clientName,
          phone: quoteData.clientPhone,
          email: quoteData.clientEmail || 'sin-correo@tec-soluciono.pe',
          origin: 'Catálogo web',
          quotesCount: 1,
          totalSpent: quoteData.total,
          lastInteraction: new Date().toISOString(),
          tags: ['Gamer', 'Frecuente'],
          notes: 'Cliente registrado automáticamente desde el catálogo web.',
        };
        return [newClient, ...prev];
      }
    });

    setCart([]);
    addToast(`Cotización ${newQuoteId} generada exitosamente`, 'success');
  };

  if (appMode === 'store') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <StoreLayout
          onBackToCustomer={() => setAppMode('customer')}
          products={products}
          setProducts={setProducts}
          quotes={quotes}
          setQuotes={setQuotes}
          clients={clients}
          setClients={setClients}
          config={config}
          setConfig={setConfig}
          addToast={addToast}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#EEF3F7] dark:bg-[#081118] text-[#0F2233] dark:text-gray-100 flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Customer Navbar */}
      <Navbar
        activeTab={customerTab}
        setActiveTab={setCustomerTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStorePanel={() => setAppMode('store')}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {customerTab === 'home' && (
          <HomeScreen
            onSelectCategory={(cat) => {
              setCatalogInitialCategory(cat);
              setCustomerTab('catalog');
            }}
            onOpenBuilder={() => setCustomerTab('builder')}
          />
        )}
        {customerTab === 'catalog' && (
          <CustomerCatalog
            products={products}
            onAddToCart={handleAddToCart}
            initialCategory={catalogInitialCategory}
          />
        )}
        {customerTab === 'builder' && (
          <PcBuilderModal products={products} onAddBundleToCart={handleAddBundleToCart} />
        )}
      </main>

      {/* Cart & Quote Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onGenerateQuote={handleGenerateQuote}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
