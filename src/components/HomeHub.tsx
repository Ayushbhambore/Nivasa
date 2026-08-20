import React from 'react';
import { 
  Utensils, 
  ShoppingCart, 
  Sparkles, 
  Users, 
  Heart, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Calendar, 
  ChefHat, 
  Info, 
  ShieldCheck, 
  TrendingUp, 
  Flame, 
  MessageSquare,
  Zap,
  CreditCard,
  Shield,
  Activity,
  Layers
} from 'lucide-react';
import { HouseholdState, FamilyMember, PantryItem, HelpStaff } from '../types';
import { TRANSLATIONS } from '../i18n/languages';

interface HomeHubProps {
  household: HouseholdState;
  onOpenChatWithPrompt: (prompt: string) => void;
  onNavigateTab: (tabId: string) => void;
  onPayStaff: (staff: HelpStaff) => void;
  onAddPantryToCart: (item: PantryItem) => void;
  currentLanguage?: string;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  household,
  onOpenChatWithPrompt,
  onNavigateTab,
  onPayStaff,
  onAddPantryToCart,
  currentLanguage = 'en'
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const urgentPantry = household.pantry.filter(p => p.status === 'buy_now');
  const upcomingOccasion = household.occasions[0];
  const dueStaff = household.helpStaff.filter(h => h.isDue);
  const totalStaffDue = dueStaff.reduce((sum, s) => sum + s.monthlySalary, 0);

  const activeDevices = (household.devices || []).filter(d => d.isOn);
  const totalPowerWatts = (household.devices || []).reduce((sum, d) => d.isOn ? sum + (d.powerWatts || 0) : sum, 0);
  const unpaidBills = (household.bills || []).filter(b => !b.isPaid);
  const totalBillsDue = unpaidBills.reduce((sum, b) => sum + b.amount, 0);
  const activeGatePasses = (household.gatePasses || []).filter(g => g.status === 'active');

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Hero Welcome Banner with NISA Thought Engine */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NISA Household Intelligence Layer</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Good Morning, Ayush!
          </h1>
          <p className="mt-2 text-black/60 text-sm md:text-base leading-relaxed">
            NISA is actively managing <span className="text-[#1A1A1A] font-semibold">{household.householdName}</span>. 
            Here is what your home needs today across meals, pantry replenishment, staff dues, and Diwali preparation.
          </p>

          {/* Quick Interactive Actions Banner */}
          <div className="mt-6 pt-5 border-t border-black/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{t.quickActions}:</span>
              </span>
              <span className="text-[11px] text-black/50">{t.selectLanguage} • NISA Hub</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenChatWithPrompt("Turn on lights")}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/15 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{t.turnOnLights}</span>
              </button>

              <button
                onClick={() => onOpenChatWithPrompt("Pay electricity bill")}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/15 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.payElectricity}</span>
              </button>

              <button
                onClick={() => onOpenChatWithPrompt("Order groceries")}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/15 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.orderGroceries}</span>
              </button>

              <button
                onClick={() => onOpenChatWithPrompt("Schedule laundry pickup")}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/15 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t.scheduleLaundry}</span>
              </button>

              <a
                href="https://www.urbancompany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FEF9F3] hover:bg-[#FF6B35] hover:text-white text-[#FF6B35] border border-orange-200 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{t.bookCleaning}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NEXUS Ecosystem Quick Control Strip */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white rounded-3xl p-5 md:p-6 shadow-md border border-black/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center shadow-sm shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white tracking-wide">NEXUS Living Ecosystem</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Mesh Online • 4 Apps Synced
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Connected smart devices, automated bills, and gate passes synchronized with NIVASA AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('nexus-iot')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-white/10 flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart IoT ({activeDevices.length}/{household.devices?.length || 0})</span>
            </button>

            <button
              onClick={() => onNavigateTab('nexus-pay')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-white/10 flex items-center space-x-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bills (₹{totalBillsDue.toLocaleString('en-IN')})</span>
            </button>

            <button
              onClick={() => onNavigateTab('nexus-gate')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-white/10 flex items-center space-x-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Gate Passes ({activeGatePasses.length})</span>
            </button>
          </div>
        </div>

        {/* Real-Time Mini Snapshot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div 
            onClick={() => onNavigateTab('nexus-iot')}
            className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/5 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span className="flex items-center gap-1 font-semibold text-white/70">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Power Load</span>
              </span>
              <span className="text-[10px] text-amber-300 font-bold">Eco Mode</span>
            </div>
            <div className="text-lg font-black text-white">{totalPowerWatts} Watts</div>
            <div className="text-[11px] text-white/50 mt-0.5">
              {activeDevices.length} devices active across home
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('nexus-pay')}
            className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/5 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span className="flex items-center gap-1 font-semibold text-white/70">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upcoming Dues</span>
              </span>
              <span className="text-[10px] text-emerald-300 font-bold">1-Click UPI</span>
            </div>
            <div className="text-lg font-black text-white">₹{(totalBillsDue + totalStaffDue).toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-white/50 mt-0.5">
              BESCOM Electricity + Staff Payroll
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('nexus-gate')}
            className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/5 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span className="flex items-center gap-1 font-semibold text-white/70">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Gate Access Passes</span>
              </span>
              <span className="text-[10px] text-blue-300 font-bold">Auto Approved</span>
            </div>
            <div className="text-lg font-black text-white">{activeGatePasses.length} Active Codes</div>
            <div className="text-[11px] text-white/50 mt-0.5">
              Blinkit Grocery + Urban Company Pass
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. NOURISH PILLAR: Today's Meals & Zero Waste */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold flex items-center space-x-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                <span>🍳 Nourish Engine</span>
              </span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                0 Food Waste Match
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">Aaj kya banayein?</h3>
            <p className="text-xs text-black/60 mb-3">Based on your fresh spinach & paneer in crisper...</p>

            <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-4 mb-3">
              <div className="text-xs font-semibold text-[#1A1A1A] flex items-center space-x-1.5 mb-1">
                <ChefHat className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Palak Paneer with Soft Phulkas</span>
              </div>
              <p className="text-xs text-black/60 leading-relaxed mt-1">
                Satisfies Dadi's low-sodium soft roti requirement & Aarav's mild spice preference.
              </p>
              <div className="mt-2.5 pt-2 border-t border-black/5 text-[10px] text-black/50 flex justify-between">
                <span>Prep: 25 mins • Serves 4</span>
                <span className="text-emerald-700 font-semibold">100% Pantry Ready</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
            <button
              id="view-meals-btn"
              onClick={() => onNavigateTab('nourish')}
              className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
            >
              <span>View 7-Day Meal Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenChatWithPrompt("Step-by-step instructions for Palak Paneer tonight")}
              className="bg-[#F0EEEA] hover:bg-[#1A1A1A] hover:text-white text-black/80 border border-black/5 text-xs px-3 py-1 rounded-full transition-colors"
            >
              Cooking Guide
            </button>
          </div>
        </div>

        {/* 2. ANTICIPATE PILLAR: Predictive Replenishment */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider text-blue-700 font-bold flex items-center space-x-1.5">
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                <span>🛒 Anticipate</span>
              </span>
              <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
                {urgentPantry.length} Items Low
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">Running Low</h3>
            <p className="text-xs text-black/60 mb-3">Estimated ~3-4 days of stock remaining.</p>

            <div className="space-y-2.5 mb-3">
              {urgentPantry.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{item.name}</p>
                    <p className="text-[11px] text-rose-600 font-medium">{item.quantity} • ~{item.daysRemaining} days left</p>
                  </div>
                  <button
                    onClick={() => onAddPantryToCart(item)}
                    className="text-[11px] bg-[#FF6B35] hover:bg-orange-600 text-white font-bold px-2.5 py-1 rounded-full transition-colors shadow-sm"
                  >
                    + Add to Cart
                  </button>
                </div>
              ))}

              <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-2.5 flex items-center justify-between text-[11px] text-black/60">
                <span>Fortune Sunflower Oil (2.5L)</span>
                <span className="text-emerald-700 font-semibold">Stocked (16d left - No need)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
            <button
              id="view-pantry-btn"
              onClick={() => onNavigateTab('anticipate')}
              className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
            >
              <span>View Full Pantry & Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenChatWithPrompt("Review our household consumption patterns and what to restock")}
              className="text-[11px] text-black/50 hover:text-black"
            >
              Audit Habits
            </button>
          </div>
        </div>

        {/* 3. CELEBRATE PILLAR: Occasion & Festival Engine */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-[#FF6B35] rounded-full"></span>
                <span>Celebration Engine</span>
              </span>
              <span className="text-xs text-black/40 font-medium">18 Days to Diwali</span>
            </div>

            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{upcomingOccasion?.title}</h3>
            <p className="text-xs text-black/60 mb-3">15 Relatives Visiting from Jaipur & Mumbai</p>

            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <div className="bg-[#FEF9F3] border border-orange-100 rounded-2xl p-2.5 text-center">
                <span className="text-xl">🏠</span>
                <p className="text-[10px] font-bold text-[#1A1A1A] uppercase mt-1">Cleaning</p>
                <span className="text-[9px] text-emerald-700 font-semibold">Active</span>
              </div>
              <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-2.5 text-center opacity-70">
                <span className="text-xl">🎁</span>
                <p className="text-[10px] font-bold text-[#1A1A1A] uppercase mt-1">Gifting</p>
                <span className="text-[9px] text-black/40">In 7 Days</span>
              </div>
              <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-2.5 text-center opacity-70">
                <span className="text-xl">🕯️</span>
                <p className="text-[10px] font-bold text-[#1A1A1A] uppercase mt-1">Puja & Feast</p>
                <span className="text-[9px] text-black/40">Day 18</span>
              </div>
            </div>

            <div className="p-3 border-l-2 border-orange-400 bg-orange-50/50 rounded-r-xl text-xs text-black/70 italic leading-relaxed">
              "Last year deep cleaning started 20 days prior. Schedule Urban Company deep cleaning today?"
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
            <button
              id="view-celebrate-btn"
              onClick={() => onNavigateTab('celebrate')}
              className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
            >
              <span>4-Stage Diwali Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenChatWithPrompt("Generate a bulk dry fruits and sweets gifting list for 15 relatives")}
              className="bg-[#F0EEEA] hover:bg-[#1A1A1A] hover:text-white text-black/80 border border-black/5 text-xs px-3 py-1 rounded-full transition-colors"
            >
              Gifting Plan
            </button>
          </div>
        </div>

        {/* 4. MANAGE PILLAR: Household Help & Operations */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
                Manage: Domestic Payroll
              </span>
              <span className="text-[10px] font-bold bg-white/10 text-orange-400 px-2.5 py-0.5 rounded-full">
                ₹{totalStaffDue.toLocaleString()} Due Tomorrow (1st)
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              {dueStaff.map((staff) => (
                <div key={staff.id} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{staff.name} ({staff.role.split('(')[0].trim()})</p>
                    <p className="text-xs text-white/60">Due Tomorrow • ₹{staff.monthlySalary.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onPayStaff(staff)}
                    className="text-xs bg-[#FF6B35] hover:bg-orange-500 text-white font-bold px-3 py-1.5 rounded-full transition-all shadow-md"
                  >
                    Pay via UPI
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/50">
              Trusted Plumber Naveen & Electrician Manoj saved in your home rolodex.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              id="view-manage-btn"
              onClick={() => onNavigateTab('manage')}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center space-x-1"
            >
              <span>View Payroll & Rolodex</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. CARE & CONSUMPTION INTELLIGENCE */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow md:col-span-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] text-black/40 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Care: Family Wellness & Consumption Intelligence</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#F0EEEA] text-black/70 px-2.5 py-0.5 rounded-full">
                Active Insights
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {household.insights.map((ins) => (
                <div key={ins.id} className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-4">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1A1A1A] mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>{ins.title}</span>
                  </div>
                  <p className="text-xs text-black/60 leading-relaxed mb-2.5">
                    {ins.message}
                  </p>
                  {ins.actionLabel && (
                    <button
                      onClick={() => onOpenChatWithPrompt(`Tell me more about: ${ins.title}`)}
                      className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 underline"
                    >
                      {ins.actionLabel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab('memory')}
              className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
            >
              <span>Explore NISA's Household Memory Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
