import React, { useState } from 'react';
import { Product } from '../types';
import { Wrench, CheckCircle2, AlertTriangle, ShieldCheck, ShoppingCart, Plus, Trash2, ArrowRight, ArrowLeft, Cpu, HardDrive, Zap, Monitor, Box } from 'lucide-react';

interface PcBuilderProps {
  products: Product[];
  onAddBundleToCart: (items: Product[], bundleName: string) => void;
}

const STEPS = [
  { id: 1, title: 'Procesador (CPU)', icon: <Cpu className="w-4 h-4" />, category: 'Procesador' },
  { id: 2, title: 'Placa Madre', icon: <Wrench className="w-4 h-4" />, category: 'Placa' },
  { id: 3, title: 'Memoria RAM', icon: <HardDrive className="w-4 h-4" />, category: 'RAM' },
  { id: 4, title: 'Almacenamiento', icon: <HardDrive className="w-4 h-4" />, category: 'SSD' },
  { id: 5, title: 'Tarjeta de Video', icon: <Monitor className="w-4 h-4" />, category: 'Video' },
  { id: 6, title: 'Case y Fuente', icon: <Box className="w-4 h-4" />, category: 'Case y fuente' },
  { id: 7, title: 'Resumen & IA Check', icon: <ShieldCheck className="w-4 h-4" />, category: 'Resumen' },
];

export const PcBuilderModal: React.FC<PcBuilderProps> = ({ products, onAddBundleToCart }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCpu, setSelectedCpu] = useState<Product | null>(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState<Product | null>(null);
  const [selectedRam, setSelectedRam] = useState<Product | null>(null);
  const [selectedSsd, setSelectedSsd] = useState<Product | null>(null);
  const [selectedGpu, setSelectedGpu] = useState<Product | null>(null);
  const [selectedCase, setSelectedCase] = useState<Product | null>(null);

  const cpus = products.filter((p) => p.category === 'Procesador');
  const motherboards = products.filter((p) => p.category === 'Placa');
  const rams = products.filter((p) => p.category === 'RAM');
  const ssds = products.filter((p) => p.category === 'SSD');
  const gpus = products.filter((p) => p.category === 'Video');
  const cases = products.filter((p) => p.category === 'Case y fuente');

  // Compatibility checks
  let socketMatch = true;
  if (selectedCpu && selectedMotherboard) {
    if (selectedCpu.specs.socket && selectedMotherboard.specs.socket) {
      socketMatch = selectedCpu.specs.socket === selectedMotherboard.specs.socket;
    }
  }

  let ddrMatch = true;
  if (selectedMotherboard && selectedRam) {
    if (selectedMotherboard.specs.ddr && selectedRam.specs.ddr) {
      ddrMatch = selectedMotherboard.specs.ddr === selectedRam.specs.ddr;
    }
  }

  let estimatedWatts = 100;
  if (selectedCpu?.specs.watts) estimatedWatts += selectedCpu.specs.watts;
  if (selectedGpu?.specs.watts) estimatedWatts += selectedGpu.specs.watts;

  let psuWatts = 600;
  if (selectedCase?.specs.watts) psuWatts = selectedCase.specs.watts;

  const powerOk = psuWatts >= estimatedWatts;

  const selectedItems = [
    selectedCpu,
    selectedMotherboard,
    selectedRam,
    selectedSsd,
    selectedGpu,
    selectedCase,
  ].filter(Boolean) as Product[];

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  // Presets
  const handleLoadPreset = (type: 'gamer' | 'workstation' | 'starter') => {
    if (type === 'gamer') {
      const cpu = cpus.find((p) => p.name.includes('i7')) || cpus[0];
      const mb = motherboards.find((p) => p.specs.socket === cpu?.specs.socket) || motherboards[0];
      const ram = rams.find((p) => p.specs.ddr === mb?.specs.ddr) || rams[0];
      const ssd = ssds[0];
      const gpu = gpus.find((p) => p.name.includes('4080') || p.name.includes('4070')) || gpus[0];
      const cs = cases[0];
      setSelectedCpu(cpu || null);
      setSelectedMotherboard(mb || null);
      setSelectedRam(ram || null);
      setSelectedSsd(ssd || null);
      setSelectedGpu(gpu || null);
      setSelectedCase(cs || null);
    } else if (type === 'workstation') {
      const cpu = cpus.find((p) => p.name.includes('Ryzen 9')) || cpus[0];
      const mb = motherboards.find((p) => p.specs.socket === cpu?.specs.socket) || motherboards[0];
      const ram = rams.find((p) => p.specs.ddr === 'DDR5') || rams[0];
      const ssd = ssds[0];
      const gpu = gpus.find((p) => p.name.includes('4080')) || gpus[0];
      const cs = cases[0];
      setSelectedCpu(cpu || null);
      setSelectedMotherboard(mb || null);
      setSelectedRam(ram || null);
      setSelectedSsd(ssd || null);
      setSelectedGpu(gpu || null);
      setSelectedCase(cs || null);
    } else {
      setSelectedCpu(cpus[0] || null);
      setSelectedMotherboard(motherboards[0] || null);
      setSelectedRam(rams[1] || rams[0] || null);
      setSelectedSsd(ssds[0] || null);
      setSelectedGpu(gpus[1] || gpus[0] || null);
      setSelectedCase(cases[0] || null);
    }
    setCurrentStep(7); // Jump to summary
  };

  const handleAddCustomPc = () => {
    if (selectedItems.length === 0) return;
    onAddBundleToCart(selectedItems, 'PC Ensamblada a Medida (Tec-Soluciono)');
  };

  const handleClear = () => {
    setSelectedCpu(null);
    setSelectedMotherboard(null);
    setSelectedRam(null);
    setSelectedSsd(null);
    setSelectedGpu(null);
    setSelectedCase(null);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header with Quick Presets */}
      <div className="bg-gradient-to-r from-[#0F2233] via-[#163045] to-[#0B7A75] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-[#F4B400]/20 text-[#F4B400] text-xs font-semibold rounded-full border border-[#F4B400]/30">
            Guía Interactiva & Inteligente
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ensamblador Guiado Tec-Soluciono
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Diseña tu PC paso a paso con validación de compatibilidad en tiempo real o elige una configuración prearmada para empezar al instante.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2.5 shrink-0 w-full lg:w-auto">
          <span className="text-[11px] text-[#F4B400] font-bold uppercase tracking-wider block">
            Cargar Configuración Rápida (Presets):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleLoadPreset('gamer')}
              className="px-3 py-1.5 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white text-xs font-bold transition-all shadow"
            >
              ⚡ Gamer Pro
            </button>
            <button
              onClick={() => handleLoadPreset('workstation')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow"
            >
              🚀 Workstation
            </button>
            <button
              onClick={() => handleLoadPreset('starter')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0F2233] text-xs font-bold transition-all shadow"
            >
              💡 Creator Starter
            </button>
          </div>
        </div>
      </div>

      {/* Step Navigation Progress Bar */}
      <div className="bg-white dark:bg-[#0F1E29] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {STEPS.map((step) => {
            const isCompleted =
              (step.id === 1 && selectedCpu) ||
              (step.id === 2 && selectedMotherboard) ||
              (step.id === 3 && selectedRam) ||
              (step.id === 4 && selectedSsd) ||
              (step.id === 5 && selectedGpu) ||
              (step.id === 6 && selectedCase) ||
              (step.id === 7 && selectedItems.length > 0);

            const isActive = currentStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B7A75] text-white shadow-md scale-105'
                    : isCompleted
                    ? 'bg-teal-50 dark:bg-teal-950/40 text-[#0B7A75] border border-teal-200 dark:border-teal-800'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#F4B400] text-[#0F2233]' : isCompleted ? 'bg-[#0B7A75] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {isCompleted && !isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.id}
                </div>
                <span className="whitespace-nowrap">{step.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Builder Grid: Step Selector + Live Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Selector Area (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F1E29] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <span className="text-[10px] text-[#0B7A75] font-bold uppercase tracking-wider">
                Paso {currentStep} de 7
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {STEPS[currentStep - 1].title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
              )}
              {currentStep < 7 && (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-[#0B7A75] hover:bg-[#09635F] text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* STEP 1: CPU */}
          {currentStep === 1 && (
            <ComponentPickerGrid
              items={cpus}
              selectedId={selectedCpu?.id}
              onSelect={setSelectedCpu}
            />
          )}

          {/* STEP 2: MOTHERBOARD */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {!socketMatch && selectedCpu && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Advertencia: La placa seleccionada tiene un socket diferente al CPU elegido ({selectedCpu.specs.socket}).</span>
                </div>
              )}
              <ComponentPickerGrid
                items={motherboards}
                selectedId={selectedMotherboard?.id}
                onSelect={setSelectedMotherboard}
              />
            </div>
          )}

          {/* STEP 3: RAM */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {!ddrMatch && selectedMotherboard && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Advertencia: La memoria RAM no coincide con el tipo DDR de la placa madre.</span>
                </div>
              )}
              <ComponentPickerGrid
                items={rams}
                selectedId={selectedRam?.id}
                onSelect={setSelectedRam}
              />
            </div>
          )}

          {/* STEP 4: SSD */}
          {currentStep === 4 && (
            <ComponentPickerGrid
              items={ssds}
              selectedId={selectedSsd?.id}
              onSelect={setSelectedSsd}
            />
          )}

          {/* STEP 5: GPU */}
          {currentStep === 5 && (
            <ComponentPickerGrid
              items={gpus}
              selectedId={selectedGpu?.id}
              onSelect={setSelectedGpu}
            />
          )}

          {/* STEP 6: CASE & PSU */}
          {currentStep === 6 && (
            <div className="space-y-4">
              {!powerOk && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Fuente de poder insuficiente para el consumo estimado de los componentes.</span>
                </div>
              )}
              <ComponentPickerGrid
                items={cases}
                selectedId={selectedCase?.id}
                onSelect={setSelectedCase}
              />
            </div>
          )}

          {/* STEP 7: SUMMARY & CHECK */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="bg-teal-50 dark:bg-teal-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-3">
                <h3 className="text-sm font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0B7A75]" />
                  <span>Diagnóstico de Compatibilidad Tec-Soluciono</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${socketMatch ? 'bg-white dark:bg-gray-900 border-teal-200 text-teal-800 dark:text-teal-300' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="font-bold block">Socket CPU & Placa</span>
                    <span>{socketMatch ? '✓ Compatible' : '✗ Revisar socket'}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${ddrMatch ? 'bg-white dark:bg-gray-900 border-teal-200 text-teal-800 dark:text-teal-300' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="font-bold block">Memoria RAM</span>
                    <span>{ddrMatch ? '✓ Sincronizado' : '✗ Conflicto DDR'}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${powerOk ? 'bg-white dark:bg-gray-900 border-teal-200 text-teal-800 dark:text-teal-300' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="font-bold block">Fuente de Poder</span>
                    <span>{powerOk ? `✓ Óptimo (${psuWatts}W)` : '✗ Fuente baja'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-gray-400">Componentes Seleccionados:</h4>
                <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                  {selectedItems.length === 0 ? (
                    <p className="p-4 text-xs text-gray-400 text-center">No has seleccionado ningún componente aún.</p>
                  ) : (
                    selectedItems.map((item) => (
                      <div key={item.id} className="p-3.5 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block">{item.name}</span>
                            <span className="text-[10px] text-gray-400">{item.category}</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">S/. {item.price.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Summary Sidebar */}
        <div className="bg-white dark:bg-[#0F1E29] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Resumen de Tu PC
            </h3>
            <button
              onClick={handleClear}
              className="text-[11px] text-rose-600 hover:underline font-semibold"
            >
              Reiniciar
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <SummaryItem label="CPU" item={selectedCpu} onRemove={() => setSelectedCpu(null)} />
            <SummaryItem label="Placa" item={selectedMotherboard} onRemove={() => setSelectedMotherboard(null)} />
            <SummaryItem label="RAM" item={selectedRam} onRemove={() => setSelectedRam(null)} />
            <SummaryItem label="SSD" item={selectedSsd} onRemove={() => setSelectedSsd(null)} />
            <SummaryItem label="GPU" item={selectedGpu} onRemove={() => setSelectedGpu(null)} />
            <SummaryItem label="Case & PSU" item={selectedCase} onRemove={() => setSelectedCase(null)} />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Potencia Estimada</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{estimatedWatts}W / {psuWatts}W</span>
            </div>
            <div className="flex justify-between items-center text-sm font-extrabold text-gray-900 dark:text-white">
              <span>Total Estimado</span>
              <span className="text-xl font-mono text-[#0B7A75]">S/. {totalPrice.toFixed(2)}</span>
            </div>

            <button
              disabled={selectedItems.length === 0 || !socketMatch || !ddrMatch || !powerOk}
              onClick={handleAddCustomPc}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all mt-4 ${
                selectedItems.length === 0 || !socketMatch || !ddrMatch || !powerOk
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F4B400] hover:bg-amber-400 text-[#0F2233]'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar Configuración al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ComponentPickerGridProps {
  items: Product[];
  selectedId?: string;
  onSelect: (p: Product) => void;
}

const ComponentPickerGrid: React.FC<ComponentPickerGridProps> = ({ items, selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((prod) => {
        const isSelected = selectedId === prod.id;
        const isOutOfStock = prod.stock === 0;

        return (
          <div
            key={prod.id}
            onClick={() => !isOutOfStock && onSelect(prod)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              isSelected
                ? 'border-[#0B7A75] bg-teal-50/50 dark:bg-teal-950/20 shadow-md ring-2 ring-[#0B7A75]/30'
                : isOutOfStock
                ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900 border-gray-200'
                : 'bg-white dark:bg-[#0F1E29] border-gray-200 dark:border-gray-800 hover:border-[#0B7A75]'
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{prod.name}</h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{prod.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="font-mono font-extrabold text-sm text-[#0B7A75]">
                S/. {prod.price.toFixed(2)}
              </span>
              {isSelected ? (
                <span className="px-2.5 py-1 text-[10px] font-bold bg-[#0B7A75] text-white rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Seleccionado
                </span>
              ) : isOutOfStock ? (
                <span className="text-[10px] text-rose-600 font-bold">Agotado</span>
              ) : (
                <span className="text-[10px] text-gray-400 font-semibold">Clic para elegir</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  item: Product | null;
  onRemove: () => void;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, item, onRemove }) => (
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
    <div className="min-w-0 flex-1 pr-2">
      <span className="text-[10px] font-bold text-gray-400 uppercase block">{label}</span>
      <span className="text-xs font-semibold text-gray-900 dark:text-white truncate block">
        {item ? item.name : 'Sin seleccionar'}
      </span>
    </div>
    {item && (
      <button onClick={onRemove} className="text-rose-500 hover:text-rose-700 p-1" title="Quitar">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);
