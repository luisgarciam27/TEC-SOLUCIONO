export type ProductCategory = 
  | 'PCs'
  | 'Laptops'
  | 'Procesador'
  | 'Placa'
  | 'RAM'
  | 'SSD'
  | 'Video'
  | 'Case y fuente'
  | 'Accesorios';

export type ProductStatus = 'En stock' | 'Stock bajo' | 'Agotado';

export interface TechSpecs {
  socket?: string;
  ddr?: 'DDR4' | 'DDR5' | 'N/A';
  watts?: number;
  maxRam?: string;
  solderedRam?: 'Sí' | 'No';
  formFactor?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in PEN (S/.)
  stock: number;
  status: ProductStatus;
  specs: TechSpecs;
  image: string;
  description: string;
}

export type QuoteStatus = 'Nueva' | 'Enviada' | 'Seguimiento' | 'Cerrada' | 'Perdida';
export type QuoteChannel = 'WhatsApp' | 'PDF' | 'Catálogo web' | 'Tienda física';

export interface QuoteItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  price: number;
  quantity: number;
}

export interface Quote {
  id: string; // e.g. "COT-0001"
  date: string; // ISO date string
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  items: QuoteItem[];
  total: number;
  channel: QuoteChannel;
  status: QuoteStatus;
  internalNotes?: string;
  validDays: number;
}

export type ClientTag = 'Estudiante' | 'Empresa' | 'Diseñador' | 'Frecuente' | 'Gamer' | 'VIP';
export type ClientOrigin = 'Catálogo web' | 'WhatsApp' | 'Visita' | 'Recomendación';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  origin: ClientOrigin;
  quotesCount: number;
  totalSpent: number;
  lastInteraction: string; // ISO date
  tags: ClientTag[];
  notes: string;
  scheduledFollowUp?: {
    date: string;
    note: string;
  };
}

export interface StoreConfig {
  storeName: string;
  logoUrl: string;
  whatsappNumber: string;
  quoteValidityDays: number;
  pdfFooterMessage: string;
  igvRate: number; // e.g. 18 (%)
}
