import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HouseholdState, PantryItem, ShoppingItem } from '../types';

interface AnticipateHubProps {
  household: HouseholdState;
  onAddItemToCart: (item: Partial<ShoppingItem>) => void;
  onToggleCartItem: (id: string) => void;
  onDeleteCartItem: (id: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const AnticipateHub: React.FC<AnticipateHubProps> = ({
  household,
  onAddItemToCart,
  onToggleCartItem,
  onDeleteCartItem,
  onOpenChatWithPrompt
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Groceries & Staples');
  const [newItemUrgency, setNewItemUrgency] = useState<'urgent' | 'regular' | 'festive'>('regular');
  const [newItemQty, setNewItemQty] = useState('1 unit');

  const categories = ['All', 'Groceries & Staples', 'Dairy & Fresh', 'Cleaning & Household', 'Personal Care', 'Snacks & Beverages'];

  const filteredPantry = activeCategory === 'All' 
    ? household.pantry 
    : household.pantry.filter(p => p.category === activeCategory);

  const totalCartValue = household.shoppingList.reduce((sum, item) => sum + (item.checked ? 0 : item.estimatedPrice), 0);

  const handleCopyList = () => {
    const text = household.shoppingList
      .map(item => `${item.checked ? '✅' : '⬜'} ${item.name} (${item.quantity}) - ₹${item.estimatedPrice}`)
      .join('\n');
    navigator.clipboard.writeText(`*NIVASA Smart Household Cart (${household.householdName})*\n\n${text}\n\n*Total Estimated: ₹${totalCartValue}*`);
    setCopied(true);
    setExportNotice("Cart copied to clipboard! Ready to paste into WhatsApp, Zepto, Blinkit or Instamart.");
    setTimeout(() => {
      setCopied(false);
      setExportNotice(null);
    }, 3500);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItemToCart({
      id: `s-custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty,
      urgency: newItemUrgency,
      estimatedPrice: 150,
      checked: false
    });
    setNewItemName('');
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Header Banner */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>NISA Anticipation & Consumption Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Pantry Inventory & Smart Cart
            </h1>
            <p className="text-black/60 text-sm mt-1 max-w-2xl leading-relaxed">
              Predictive replenishment based on household consumption cadence. NISA protects your budget by telling you what to buy now, and what to wait on.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChatWithPrompt("Review our pantry replenishment needs for this week and recommend what to order")}
              className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Audit Household Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Notice Toast */}
      {exportNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Two-Column Layout: Inventory Matrix vs. Shopping List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pantry Inventory Status (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-bold text-[#1A1A1A] flex items-center space-x-2">
                  <Package className="w-4 h-4 text-[#FF6B35]" />
                  <span>Household Pantry & Perishables</span>
                </h2>
                <p className="text-xs text-black/50">Consumption cycles calibrated over 60 days</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-[#1A1A1A] text-white shadow-sm'
                        : 'text-black/60 hover:text-black bg-[#F0EEEA]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Items List */}
            <div className="space-y-3">
              {filteredPantry.map((item) => {
                const isBuyNow = item.status === 'buy_now';
                const isBuyLater = item.status === 'buy_later';
                const isStocked = item.status === 'stocked';

                return (
                  <div
                    key={item.id}
                    className={`bg-[#F9F8F6] border rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isBuyNow 
                        ? 'border-rose-300 bg-rose-50/30' 
                        : isBuyLater 
                        ? 'border-amber-200 bg-amber-50/20' 
                        : 'border-black/5'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#1A1A1A]">{item.name}</span>
                        <span className="text-[10px] text-black/50 bg-white px-2 py-0.5 rounded-full border border-black/5">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs text-black/60">
                        Current stock: <strong className="text-[#1A1A1A]">{item.quantity}</strong> • {item.consumptionFrequency}
                      </p>

                      <p className="text-[11px] text-black/40">
                        Preferred Brand: {item.preferredBrand}
                      </p>
                    </div>

                    <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                      {isBuyNow && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>Buy Now (~{item.daysRemaining}d left)</span>
                        </span>
                      )}

                      {isBuyLater && (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Buy Later (~{item.daysRemaining}d left)</span>
                        </span>
                      )}

                      {isStocked && (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Stocked (No need yet)</span>
                        </span>
                      )}

                      {isBuyNow && (
                        <button
                          onClick={() => {
                            onAddItemToCart({
                              id: `s-${item.id}-${Date.now()}`,
                              name: item.name,
                              category: item.category,
                              quantity: "1 refill pack",
                              urgency: "urgent",
                              brandSuggestion: item.preferredBrand,
                              estimatedPrice: item.unitPrice || 350,
                              checked: false
                            });
                            confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
                          }}
                          className="bg-[#FF6B35] hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors shadow-sm"
                        >
                          + Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Smart Cart (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                <div>
                  <h2 className="text-base font-bold text-[#1A1A1A] flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-[#FF6B35]" />
                    <span>Smart Household Cart</span>
                  </h2>
                  <p className="text-xs text-black/50">Optimized for quick grocery export</p>
                </div>

                <button
                  onClick={handleCopyList}
                  className="bg-[#F0EEEA] hover:bg-[#1A1A1A] hover:text-white text-[#2D2D2D] border border-black/5 text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-colors font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy List"}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 mb-6 max-h-[360px] overflow-y-auto pr-1">
                {household.shoppingList.length === 0 ? (
                  <div className="text-center py-8 text-black/40 text-xs">
                    Your shopping cart is currently empty. Add items from the left.
                  </div>
                ) : (
                  household.shoppingList.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        item.checked 
                          ? 'bg-[#F0EEEA]/50 border-black/5 opacity-60' 
                          : 'bg-[#F9F8F6] border-black/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onToggleCartItem(item.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            item.checked 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'border-black/20 bg-white text-transparent hover:border-[#FF6B35]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        
                        <div>
                          <p className={`text-xs font-semibold ${item.checked ? 'line-through text-black/40' : 'text-[#1A1A1A]'}`}>
                            {item.name}
                          </p>
                          <p className="text-[11px] text-black/50">
                            {item.quantity} • {item.brandSuggestion || item.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-xs font-bold text-[#FF6B35]">
                          ₹{item.estimatedPrice}
                        </span>
                        <button
                          onClick={() => onDeleteCartItem(item.id)}
                          className="text-black/30 hover:text-rose-600 p-1 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Custom Item Form */}
              <form onSubmit={handleAddNewItem} className="bg-[#F9F8F6] p-3.5 rounded-2xl border border-black/5 mb-4 space-y-2">
                <div className="text-xs font-bold text-[#1A1A1A] flex items-center space-x-1">
                  <Plus className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Add Quick Item to Cart</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Cardamom, Dhoop sticks, Ghee"
                    className="flex-1 bg-white border border-black/10 text-xs text-[#1A1A1A] px-3 py-2 rounded-xl focus:outline-none focus:border-[#FF6B35]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1A1A1A] hover:bg-black text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>
              </form>

              {/* Total Calculation & Actions */}
              <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-black/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-black/50 font-medium">Estimated Total:</span>
                  <p className="text-base font-bold text-[#1A1A1A]">₹{totalCartValue.toLocaleString()}</p>
                </div>

                <button
                  onClick={handleCopyList}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-full transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <span>Export Order</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
