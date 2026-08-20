import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Users, 
  Utensils, 
  Clock, 
  Heart, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Tag,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HouseholdState, MemoryFact } from '../types';

interface MemoryHubProps {
  household: HouseholdState;
  onAddMemory: (memory: Partial<MemoryFact>) => void;
  onDeleteMemory: (id: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const MemoryHub: React.FC<MemoryHubProps> = ({
  household,
  onAddMemory,
  onDeleteMemory,
  onOpenChatWithPrompt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryFact['category']>('preferences');

  const categories = [
    { id: 'all', label: 'All Knowledge' },
    { id: 'people', label: 'Family & People' },
    { id: 'food', label: 'Diet & Nutrition' },
    { id: 'routine', label: 'Household Routines' },
    { id: 'festivals', label: 'Festivals & Occasions' },
    { id: 'preferences', label: 'Brand & Consumption' },
    { id: 'help', label: 'Help & Operations' }
  ];

  const filteredMemories = selectedCategory === 'all'
    ? household.memories
    : household.memories.filter(m => m.category === selectedCategory);

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;

    onAddMemory({
      id: `m-${Date.now()}`,
      category: newCategory,
      key: newKey.trim(),
      value: newValue.trim(),
      confidence: 0.95,
      updatedAt: "Added by user"
    });

    setNewKey('');
    setNewValue('');
    setShowAddModal(false);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Header Banner */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>NISA Household Memory Graph</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              What NISA Remembers About Your Home
            </h1>
            <p className="text-black/60 text-sm mt-1 max-w-2xl leading-relaxed">
              "I don't have to remember everything. NISA remembers my home." Progressive profiling learns dietary rules, consumption rhythms, and traditions through natural conversations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#1A1A1A] hover:bg-black text-white font-semibold text-xs px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center space-x-2 shrink-0"
            >
              <Plus className="w-4 h-4 text-[#FF6B35]" />
              <span>Teach NISA a New Fact</span>
            </button>
          </div>
        </div>

        {/* Global vs Local Principle Card */}
        <div className="mt-6 pt-6 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-black/60">
          <div className="flex items-center space-x-2 text-black/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Unit of Intelligence: <strong className="text-[#1A1A1A] font-bold">The Entire Household</strong> (4 Members + 3 Staff)</span>
          </div>
          <div className="text-[11px] text-black/50">
            South Asia-First • Privacy Protected • Progressive Learning
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-[#F0EEEA] text-black/60 hover:text-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((mem) => (
          <div
            key={mem.id}
            className="bg-white border border-black/5 rounded-3xl p-5 flex flex-col justify-between hover:border-black/20 transition-all shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-[#FF6B35] bg-[#FEF9F3] border border-orange-100 px-2.5 py-0.5 rounded-full">
                  {mem.category}
                </span>
                <span className="text-[10px] text-black/40 font-medium">
                  Confidence: {Math.round(mem.confidence * 100)}%
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">{mem.key}</h3>
              <p className="text-xs text-black/70 leading-relaxed bg-[#F9F8F6] p-3.5 rounded-2xl border border-black/5 mb-3">
                "{mem.value}"
              </p>
            </div>

            <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs text-black/50">
              <span className="text-[11px] text-black/40">{mem.updatedAt}</span>
              <button
                onClick={() => onDeleteMemory(mem.id)}
                className="text-black/30 hover:text-rose-600 transition-colors p-1"
                title="Remove memory fact"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveMemory} className="bg-white border border-black/10 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fadeIn space-y-4 text-[#2D2D2D]">
            <div className="flex items-center justify-between pb-3 border-b border-black/5">
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Teach NISA a Household Fact</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-black/40 hover:text-black p-1 rounded-lg hover:bg-[#F0EEEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Knowledge Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="people">Family & People</option>
                  <option value="food">Diet & Nutrition</option>
                  <option value="routine">Household Routine</option>
                  <option value="festivals">Festivals & Occasions</option>
                  <option value="preferences">Brand & Consumption</option>
                  <option value="help">Help & Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Memory Title / Context</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tuesday Dinner Rule, Baby Nap Time"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Memory Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Strictly vegetarian dinners on Tuesdays. Avoid garlic."
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="bg-[#F0EEEA] hover:bg-[#E8E5DF] text-black/70 font-semibold text-xs px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs px-5 py-2 rounded-full transition-colors"
              >
                Save to Memory
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
