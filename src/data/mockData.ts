import { Product, Quote, Client, StoreConfig } from '../types';

export const initialConfig: StoreConfig = {
  storeName: 'Tec-Soluciono',
  logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
  whatsappNumber: '+51987654321',
  quoteValidityDays: 7,
  pdfFooterMessage: 'Precios sujetos a disponibilidad de stock y variación del tipo de cambio. Garantía directa de 1 año.',
  igvRate: 18,
};

export const initialProducts: Product[] = [
  // PCs
  {
    id: 'prod-1',
    name: 'PC Gamer Quantum Elite RTX 4070',
    category: 'PCs',
    price: 5499.00,
    stock: 4,
    status: 'Stock bajo',
    specs: { socket: 'LGA1700', ddr: 'DDR5', watts: 750, maxRam: '128GB', solderedRam: 'No' },
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i7-14700KF, 32GB DDR5 5600MHz, 1TB NVMe Gen4, RTX 4070 12GB, Liquid Cooling 240mm.'
  },
  {
    id: 'prod-2',
    name: 'PC Estación de Trabajo ProRender Ryzen 9',
    category: 'PCs',
    price: 7899.00,
    stock: 2,
    status: 'Stock bajo',
    specs: { socket: 'AM5', ddr: 'DDR5', watts: 850, maxRam: '192GB', solderedRam: 'No' },
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&auto=format&fit=crop&q=80',
    description: 'AMD Ryzen 9 7950X, 64GB DDR5, 2TB NVMe Pro, RTX 4080 Super 16GB, Fuente 850W 80+ Gold.'
  },
  {
    id: 'prod-3',
    name: 'PC Creator Starter i5',
    category: 'PCs',
    price: 2999.00,
    stock: 12,
    status: 'En stock',
    specs: { socket: 'LGA1700', ddr: 'DDR4', watts: 600, maxRam: '64GB', solderedRam: 'No' },
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i5-13400F, 16GB DDR4, 512GB NVMe, RTX 3060 12GB, Gabinete RGB con 4 ventiladores.'
  },

  // Laptops
  {
    id: 'prod-4',
    name: 'Laptop Gamer ASUS ROG Strix G16',
    category: 'Laptops',
    price: 6499.00,
    stock: 3,
    status: 'Stock bajo',
    specs: { ddr: 'DDR5', maxRam: '64GB', solderedRam: 'No' },
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    description: 'i7-13650HX, 16GB DDR5, 512GB SSD, RTX 4060 8GB, Pantalla 16" QHD+ 240Hz.'
  },
  {
    id: 'prod-5',
    name: 'Laptop Ultrabook Lenovo ThinkBook 14',
    category: 'Laptops',
    price: 2899.00,
    stock: 15,
    status: 'En stock',
    specs: { ddr: 'DDR4', maxRam: '32GB', solderedRam: 'Sí' },
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: 'AMD Ryzen 7 7730U, 16GB RAM, 512GB SSD, Windows 11 Pro, Aluminio anodizado gris.'
  },

  // Procesador
  {
    id: 'prod-6',
    name: 'Procesador Intel Core i7-14700KF',
    category: 'Procesador',
    price: 1699.00,
    stock: 8,
    status: 'En stock',
    specs: { socket: 'LGA1700', watts: 125 },
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
    description: '20 núcleos (8 P-cores + 12 E-cores), hasta 5.6 GHz, LGA1700 sin gráficos integrados.'
  },
  {
    id: 'prod-7',
    name: 'Procesador AMD Ryzen 7 7800X3D',
    category: 'Procesador',
    price: 1850.00,
    stock: 0,
    status: 'Agotado',
    specs: { socket: 'AM5', watts: 120 },
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
    description: 'El rey del gaming, 8 núcleos, 16 hilos, 96MB de caché L3, socket AM5.'
  },

  // Placa
  {
    id: 'prod-8',
    name: 'Placa Madre MSI MAG Z790 TOMAHAWK WIFI',
    category: 'Placa',
    price: 1199.00,
    stock: 6,
    status: 'En stock',
    specs: { socket: 'LGA1700', ddr: 'DDR5', formFactor: 'ATX' },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Soporte DDR5, PCIe 5.0, Wi-Fi 6E, LAN 2.5G, diseño térmico ampliado.'
  },
  {
    id: 'prod-9',
    name: 'Placa Madre ASUS ROG STRIX B650E-F GAMING',
    category: 'Placa',
    price: 1299.00,
    stock: 4,
    status: 'Stock bajo',
    specs: { socket: 'AM5', ddr: 'DDR5', formFactor: 'ATX' },
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
    description: 'Socket AM5 para Ryzen serie 7000/8000/9000, PCIe 5.0 M.2, DDR5 robusta.'
  },

  // RAM
  {
    id: 'prod-10',
    name: 'Memoria RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    category: 'RAM',
    price: 520.00,
    stock: 14,
    status: 'En stock',
    specs: { ddr: 'DDR5' },
    image: 'https://images.unsplash.com/photo-1562976540-1e02c5144c12?w=600&auto=format&fit=crop&q=80',
    description: 'Kit de 32GB DDR5 6000MHz CL30 con iluminación RGB dinámica de diez zonas.'
  },
  {
    id: 'prod-11',
    name: 'Memoria RAM Kingston Fury Beast 16GB (2x8GB) DDR4 3200MHz',
    category: 'RAM',
    price: 210.00,
    stock: 25,
    status: 'En stock',
    specs: { ddr: 'DDR4' },
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
    description: 'Kit confiable DDR4 para actualización económica y alto rendimiento.'
  },

  // SSD
  {
    id: 'prod-12',
    name: 'Disco Duro SSD M.2 NVMe Kingston KC3000 2TB Gen4',
    category: 'SSD',
    price: 699.00,
    stock: 10,
    status: 'En stock',
    specs: {},
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
    description: 'Lectura hasta 7,000 MB/s, escritura hasta 7,000 MB/s, alto rendimiento para edición y gaming.'
  },

  // Video
  {
    id: 'prod-13',
    name: 'Tarjeta de Video NVIDIA GeForce RTX 4080 Super 16GB OC',
    category: 'Video',
    price: 4399.00,
    stock: 3,
    status: 'Stock bajo',
    specs: { watts: 320 },
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
    description: 'DLSS 3, Ray Tracing avanzado, 16GB GDDR6X, ideal para 4K ultra.'
  },
  {
    id: 'prod-14',
    name: 'Tarjeta de Video ASUS Dual GeForce RTX 4060 V2 8GB',
    category: 'Video',
    price: 1450.00,
    stock: 9,
    status: 'En stock',
    specs: { watts: 115 },
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
    description: 'Diseño compacto de 2 ventiladores, perfecta para 1080p y 1440p gaming.'
  },

  // Case y fuente
  {
    id: 'prod-15',
    name: 'Gabinete NZXT H5 Flow RGB Blanco + Fuente 750W 80+ Gold',
    category: 'Case y fuente',
    price: 890.00,
    stock: 7,
    status: 'En stock',
    specs: { watts: 750, formFactor: 'ATX' },
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
    description: 'Panel frontal perforado, excelente flujo de aire, combo con fuente modular 750W.'
  },

  // Accesorios
  {
    id: 'prod-16',
    name: 'Monitor Gamer 27" IPS 2K 180Hz AOC Q27G4',
    category: 'Accesorios',
    price: 1199.00,
    stock: 5,
    status: 'En stock',
    specs: {},
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    description: 'Resolución QHD 2560x1440, tiempo de respuesta 0.5ms MPRT, G-Sync Compatible.'
  },
  {
    id: 'prod-17',
    name: 'Teclado Mecánico Inalámbrico Keychron K2 Pro RGB',
    category: 'Accesorios',
    price: 420.00,
    stock: 11,
    status: 'En stock',
    specs: {},
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Switches Gateron Hot-Swappable, conectividad Bluetooth 5.1 y USB-C, QMK/VIA.'
  }
];

export const initialClients: Client[] = [
  {
    id: 'cli-1',
    name: 'Carlos Mendoza',
    phone: '+51 912 345 678',
    email: 'carlos.mendoza@empresa.pe',
    origin: 'Catálogo web',
    quotesCount: 3,
    totalSpent: 16497.00,
    lastInteraction: '2026-10-10T14:30:00Z',
    tags: ['Empresa', 'Frecuente', 'VIP'],
    notes: 'Requiere facturas con RUC para su consultora de software. Muy interesado en estaciones de trabajo.',
    scheduledFollowUp: {
      date: '2026-10-13',
      note: 'Llamar para confirmar la compra de la segunda estación Ryzen 9.'
    }
  },
  {
    id: 'cli-2',
    name: 'Sofía Valdivia',
    phone: '+51 998 765 432',
    email: 'sofia.valdivia.design@gmail.com',
    origin: 'WhatsApp',
    quotesCount: 2,
    totalSpent: 5499.00,
    lastInteraction: '2026-10-09T11:15:00Z',
    tags: ['Diseñador', 'Gamer'],
    notes: 'Diseñadora gráfica freelance. Trabaja con Premiere y Blender. Prefiere iluminación blanca.',
    scheduledFollowUp: {
      date: '2026-10-12',
      note: 'Enviar opciones de monitores 4K calibrados por color.'
    }
  },
  {
    id: 'cli-3',
    name: 'Mateo Quispe',
    phone: '+51 945 112 233',
    email: 'mateo.q.uni@gmail.com',
    origin: 'Catálogo web',
    quotesCount: 1,
    totalSpent: 2999.00,
    lastInteraction: '2026-10-08T16:20:00Z',
    tags: ['Estudiante'],
    notes: 'Estudiante de ingeniería de sistemas en la UNI. Pagará al contado con transferencia BCP.',
  },
  {
    id: 'cli-4',
    name: 'Lucía Benavides',
    phone: '+51 922 333 444',
    email: 'lbenavides@constructoralb.pe',
    origin: 'Visita',
    quotesCount: 4,
    totalSpent: 21996.00,
    lastInteraction: '2026-10-07T09:45:00Z',
    tags: ['Empresa', 'VIP'],
    notes: 'Renovación de equipos para oficina de arquitectura y metrados CAD.',
  },
  {
    id: 'cli-5',
    name: 'Diego Armas',
    phone: '+51 987 123 456',
    email: 'diego.armas.p@outlook.com',
    origin: 'WhatsApp',
    quotesCount: 1,
    totalSpent: 0,
    lastInteraction: '2026-10-06T18:10:00Z',
    tags: ['Gamer'],
    notes: 'Preguntó por stock de tarjeta Ryzen 7 7800X3D.',
  },
  {
    id: 'cli-6',
    name: 'Valeria Cárdenas',
    phone: '+51 933 667 890',
    email: 'valeria.cardenas@pucp.edu.pe',
    origin: 'Catálogo web',
    quotesCount: 2,
    totalSpent: 2899.00,
    lastInteraction: '2026-10-05T12:00:00Z',
    tags: ['Estudiante'],
    notes: 'Buscaba laptop ligera para diseño y redacción.',
  },
  {
    id: 'cli-7',
    name: 'Renzo Salazar',
    phone: '+51 966 554 321',
    email: 'renzo.salazar.dev@gmail.com',
    origin: 'Recomendación',
    quotesCount: 1,
    totalSpent: 6499.00,
    lastInteraction: '2026-10-04T15:30:00Z',
    tags: ['Gamer', 'Frecuente'],
    notes: 'Compró laptop ASUS ROG Strix para desarrollo y gaming.',
  },
  {
    id: 'cli-8',
    name: 'Camila Torres',
    phone: '+51 911 222 333',
    email: 'camila.torres.arq@gmail.com',
    origin: 'WhatsApp',
    quotesCount: 1,
    totalSpent: 5499.00,
    lastInteraction: '2026-10-03T10:00:00Z',
    tags: ['Diseñador'],
    notes: 'Renderizado arquitectónico en Lumion.',
  },
  {
    id: 'cli-9',
    name: 'Gonzalo Pardo',
    phone: '+51 955 443 322',
    email: 'gpardo@logistikaperu.com',
    origin: 'Visita',
    quotesCount: 3,
    totalSpent: 11997.00,
    lastInteraction: '2026-10-02T17:40:00Z',
    tags: ['Empresa'],
    notes: 'Equipos para control de almacenes y logística.',
  },
  {
    id: 'cli-10',
    name: 'Andrea Morales',
    phone: '+51 977 889 900',
    email: 'andrea.morales.mkt@gmail.com',
    origin: 'Catálogo web',
    quotesCount: 1,
    totalSpent: 2899.00,
    lastInteraction: '2026-10-01T14:10:00Z',
    tags: ['Frecuente'],
    notes: 'Marketing digital y edición de video ligera.',
  },
  {
    id: 'cli-11',
    name: 'Fernando Huamán',
    phone: '+51 932 111 222',
    email: 'fhuaman.ing@gmail.com',
    origin: 'WhatsApp',
    quotesCount: 2,
    totalSpent: 4500.00,
    lastInteraction: '2026-09-28T11:20:00Z',
    tags: ['Gamer'],
    notes: 'Armado personalizado con refrigeración líquida.',
  },
  {
    id: 'cli-12',
    name: 'Patricia Ledesma',
    phone: '+51 964 888 777',
    email: 'patricia.ledesma@estudiojuridico.pe',
    origin: 'Recomendación',
    quotesCount: 1,
    totalSpent: 2899.00,
    lastInteraction: '2026-09-25T16:00:00Z',
    tags: ['Empresa'],
    notes: 'Computadoras de oficina para despacho legal.',
  }
];

export const initialQuotes: Quote[] = [
  {
    id: 'COT-0020',
    date: '2026-10-10T14:30:00Z',
    clientId: 'cli-1',
    clientName: 'Carlos Mendoza',
    clientPhone: '+51 912 345 678',
    clientEmail: 'carlos.mendoza@empresa.pe',
    items: [
      { productId: 'prod-2', productName: 'PC Estación de Trabajo ProRender Ryzen 9', category: 'PCs', price: 7899.00, quantity: 1 }
    ],
    total: 7899.00,
    channel: 'WhatsApp',
    status: 'Nueva',
    internalNotes: 'Cliente corporativo frecuente. Solicita factura con RUC 20...',
    validDays: 7
  },
  {
    id: 'COT-0019',
    date: '2026-10-09T11:15:00Z',
    clientId: 'cli-2',
    clientName: 'Sofía Valdivia',
    clientPhone: '+51 998 765 432',
    clientEmail: 'sofia.valdivia.design@gmail.com',
    items: [
      { productId: 'prod-1', productName: 'PC Gamer Quantum Elite RTX 4070', category: 'PCs', price: 5499.00, quantity: 1 },
      { productId: 'prod-16', productName: 'Monitor Gamer 27" IPS 2K 180Hz AOC Q27G4', category: 'Accesorios', price: 1199.00, quantity: 1 }
    ],
    total: 6698.00,
    channel: 'PDF',
    status: 'Seguimiento',
    internalNotes: 'Pendiente de confirmación de tarjeta de crédito.',
    validDays: 7
  },
  {
    id: 'COT-0018',
    date: '2026-10-08T16:20:00Z',
    clientId: 'cli-3',
    clientName: 'Mateo Quispe',
    clientPhone: '+51 945 112 233',
    clientEmail: 'mateo.q.uni@gmail.com',
    items: [
      { productId: 'prod-3', productName: 'PC Creator Starter i5', category: 'PCs', price: 2999.00, quantity: 1 }
    ],
    total: 2999.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Venta completada. Pago por transferencia BCP verificado.',
    validDays: 7
  },
  {
    id: 'COT-0017',
    date: '2026-10-07T09:45:00Z',
    clientId: 'cli-4',
    clientName: 'Lucía Benavides',
    clientPhone: '+51 922 333 444',
    clientEmail: 'lbenavides@constructoralb.pe',
    items: [
      { productId: 'prod-1', productName: 'PC Gamer Quantum Elite RTX 4070', category: 'PCs', price: 5499.00, quantity: 2 }
    ],
    total: 10998.00,
    channel: 'WhatsApp',
    status: 'Cerrada',
    internalNotes: 'Entregado en oficina San Isidro.',
    validDays: 7
  },
  {
    id: 'COT-0016',
    date: '2026-10-06T12:00:00Z',
    clientId: 'cli-5',
    clientName: 'Diego Armas',
    clientPhone: '+51 987 123 456',
    clientEmail: 'diego.armas.p@outlook.com',
    items: [
      { productId: 'prod-7', productName: 'Procesador AMD Ryzen 7 7800X3D', category: 'Procesador', price: 1850.00, quantity: 1 }
    ],
    total: 1850.00,
    channel: 'WhatsApp',
    status: 'Perdida',
    internalNotes: 'No había stock inmediato, prefirió otro proveedor.',
    validDays: 7
  },
  {
    id: 'COT-0015',
    date: '2026-10-05T14:00:00Z',
    clientId: 'cli-6',
    clientName: 'Valeria Cárdenas',
    clientPhone: '+51 933 667 890',
    clientEmail: 'valeria.cardenas@pucp.edu.pe',
    items: [
      { productId: 'prod-5', productName: 'Laptop Ultrabook Lenovo ThinkBook 14', category: 'Laptops', price: 2899.00, quantity: 1 }
    ],
    total: 2899.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Recojo en tienda.',
    validDays: 7
  },
  {
    id: 'COT-0014',
    date: '2026-10-04T10:30:00Z',
    clientId: 'cli-7',
    clientName: 'Renzo Salazar',
    clientPhone: '+51 966 554 321',
    items: [
      { productId: 'prod-4', productName: 'Laptop Gamer ASUS ROG Strix G16', category: 'Laptops', price: 6499.00, quantity: 1 }
    ],
    total: 6499.00,
    channel: 'PDF',
    status: 'Cerrada',
    internalNotes: 'Venta de laptop ROG Strix.',
    validDays: 7
  },
  {
    id: 'COT-0013',
    date: '2026-10-03T15:20:00Z',
    clientId: 'cli-8',
    clientName: 'Camila Torres',
    clientPhone: '+51 911 222 333',
    items: [
      { productId: 'prod-1', productName: 'PC Gamer Quantum Elite RTX 4070', category: 'PCs', price: 5499.00, quantity: 1 }
    ],
    total: 5499.00,
    channel: 'WhatsApp',
    status: 'Enviada',
    internalNotes: 'Enviada cotización detallada por WhatsApp.',
    validDays: 7
  },
  {
    id: 'COT-0012',
    date: '2026-10-02T11:00:00Z',
    clientId: 'cli-9',
    clientName: 'Gonzalo Pardo',
    clientPhone: '+51 955 443 322',
    items: [
      { productId: 'prod-3', productName: 'PC Creator Starter i5', category: 'PCs', price: 2999.00, quantity: 2 }
    ],
    total: 5998.00,
    channel: 'Tienda física',
    status: 'Cerrada',
    internalNotes: 'Venta al contado.',
    validDays: 7
  },
  {
    id: 'COT-0011',
    date: '2026-10-01T09:15:00Z',
    clientId: 'cli-10',
    clientName: 'Andrea Morales',
    clientPhone: '+51 977 889 900',
    items: [
      { productId: 'prod-5', productName: 'Laptop Ultrabook Lenovo ThinkBook 14', category: 'Laptops', price: 2899.00, quantity: 1 }
    ],
    total: 2899.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Despacho a domicilio Miraflores.',
    validDays: 7
  },
  {
    id: 'COT-0010',
    date: '2026-09-28T14:00:00Z',
    clientId: 'cli-11',
    clientName: 'Fernando Huamán',
    clientPhone: '+51 932 111 222',
    items: [
      { productId: 'prod-6', productName: 'Procesador Intel Core i7-14700KF', category: 'Procesador', price: 1699.00, quantity: 1 },
      { productId: 'prod-8', productName: 'Placa Madre MSI MAG Z790 TOMAHAWK WIFI', category: 'Placa', price: 1199.00, quantity: 1 }
    ],
    total: 2898.00,
    channel: 'WhatsApp',
    status: 'Cerrada',
    internalNotes: 'Componentes para ensamble.',
    validDays: 7
  },
  {
    id: 'COT-0009',
    date: '2026-09-25T10:00:00Z',
    clientId: 'cli-12',
    clientName: 'Patricia Ledesma',
    clientPhone: '+51 964 888 777',
    items: [
      { productId: 'prod-5', productName: 'Laptop Ultrabook Lenovo ThinkBook 14', category: 'Laptops', price: 2899.00, quantity: 1 }
    ],
    total: 2899.00,
    channel: 'PDF',
    status: 'Cerrada',
    internalNotes: 'Compra corporativa estudio.',
    validDays: 7
  },
  {
    id: 'COT-0008',
    date: '2026-09-22T16:00:00Z',
    clientId: 'cli-1',
    clientName: 'Carlos Mendoza',
    clientPhone: '+51 912 345 678',
    items: [
      { productId: 'prod-12', productName: 'Disco Duro SSD M.2 NVMe Kingston KC3000 2TB Gen4', category: 'SSD', price: 699.00, quantity: 2 }
    ],
    total: 1398.00,
    channel: 'WhatsApp',
    status: 'Cerrada',
    internalNotes: 'SSDs para servidores.',
    validDays: 7
  },
  {
    id: 'COT-0007',
    date: '2026-09-20T12:30:00Z',
    clientId: 'cli-4',
    clientName: 'Lucía Benavides',
    clientPhone: '+51 922 333 444',
    items: [
      { productId: 'prod-2', productName: 'PC Estación de Trabajo ProRender Ryzen 9', category: 'PCs', price: 7899.00, quantity: 1 }
    ],
    total: 7899.00,
    channel: 'PDF',
    status: 'Cerrada',
    internalNotes: 'Estación de trabajo entrega rápida.',
    validDays: 7
  },
  {
    id: 'COT-0006',
    date: '2026-09-18T15:00:00Z',
    clientId: 'cli-2',
    clientName: 'Sofía Valdivia',
    clientPhone: '+51 998 765 432',
    items: [
      { productId: 'prod-10', productName: 'Memoria RAM Corsair Vengeance RGB 32GB', category: 'RAM', price: 520.00, quantity: 1 }
    ],
    total: 520.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Upgrade de RAM.',
    validDays: 7
  },
  {
    id: 'COT-0005',
    date: '2026-09-15T11:00:00Z',
    clientId: 'cli-9',
    clientName: 'Gonzalo Pardo',
    clientPhone: '+51 955 443 322',
    items: [
      { productId: 'prod-16', productName: 'Monitor Gamer 27" IPS 2K 180Hz AOC Q27G4', category: 'Accesorios', price: 1199.00, quantity: 2 }
    ],
    total: 2398.00,
    channel: 'WhatsApp',
    status: 'Cerrada',
    internalNotes: 'Monitores para oficinas.',
    validDays: 7
  },
  {
    id: 'COT-0004',
    date: '2026-09-12T09:30:00Z',
    clientId: 'cli-11',
    clientName: 'Fernando Huamán',
    clientPhone: '+51 932 111 222',
    items: [
      { productId: 'prod-13', productName: 'Tarjeta de Video NVIDIA GeForce RTX 4080 Super 16GB OC', category: 'Video', price: 4399.00, quantity: 1 }
    ],
    total: 4399.00,
    channel: 'PDF',
    status: 'Cerrada',
    internalNotes: 'Tarjeta gráfica alta gama.',
    validDays: 7
  },
  {
    id: 'COT-0003',
    date: '2026-09-10T14:10:00Z',
    clientId: 'cli-3',
    clientName: 'Mateo Quispe',
    clientPhone: '+51 945 112 233',
    items: [
      { productId: 'prod-17', productName: 'Teclado Mecánico Inalámbrico Keychron K2 Pro RGB', category: 'Accesorios', price: 420.00, quantity: 1 }
    ],
    total: 420.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Teclado mecánico.',
    validDays: 7
  },
  {
    id: 'COT-0002',
    date: '2026-09-08T16:45:00Z',
    clientId: 'cli-5',
    clientName: 'Diego Armas',
    clientPhone: '+51 987 123 456',
    items: [
      { productId: 'prod-14', productName: 'Tarjeta de Video ASUS Dual GeForce RTX 4060 V2 8GB', category: 'Video', price: 1450.00, quantity: 1 }
    ],
    total: 1450.00,
    channel: 'WhatsApp',
    status: 'Cerrada',
    internalNotes: 'GPU gama media.',
    validDays: 7
  },
  {
    id: 'COT-0001',
    date: '2026-09-05T10:00:00Z',
    clientId: 'cli-7',
    clientName: 'Renzo Salazar',
    clientPhone: '+51 966 554 321',
    items: [
      { productId: 'prod-15', productName: 'Gabinete NZXT H5 Flow RGB Blanco + Fuente 750W', category: 'Case y fuente', price: 890.00, quantity: 1 }
    ],
    total: 890.00,
    channel: 'Catálogo web',
    status: 'Cerrada',
    internalNotes: 'Gabinete y fuente.',
    validDays: 7
  }
];
