import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Gift, 
  Utensils, 
  Home as HomeIcon,
  Shirt,
  Flame,
  Check,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HouseholdState, Occasion } from '../types';

interface CelebrateHubProps {
  household: HouseholdState;
  onToggleChecklistItem: (occasionId: string, phaseIndex: number, itemId: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const CelebrateHub: React.FC<CelebrateHubProps> = ({
  household,
  onToggleChecklistItem,
  onOpenChatWithPrompt
}) => {
  const [activeOccasionIndex, setActiveOccasionIndex] = useState(0);
  const activeOccasion = household.occasions[activeOccasionIndex] || household.occasions[0];

  const handleToggle = (phaseIndex: number, itemId: string) => {
    onToggleChecklistItem(activeOccasion.id, phaseIndex, itemId);
    confetti({ particleCount: 25, spread: 60, origin: { y: 0.7 } });
  };

  // Calculate total completed tasks
  const allTasks = activeOccasion.checklistPhases.flatMap(p => p.items);
  const completedTasks = allTasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedTasks / (allTasks.length || 1)) * 100);

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Header Banner */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NISA Celebrate & Occasion Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              {activeOccasion.title}
            </h1>
            <p className="text-black/60 text-sm mt-1 max-w-2xl leading-relaxed">
              {activeOccasion.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChatWithPrompt("Suggest gift hamper items and festival grocery quantities for Diwali")}
              className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Optimize Occasion Plan</span>
            </button>
          </div>
        </div>

        {/* Big Countdown & Progress Bar */}
        <div className="mt-6 pt-6 border-t border-black/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-black/5 flex items-center space-x-3">
            <Clock className="w-6 h-6 text-[#FF6B35]" />
            <div>
              <p className="text-xs text-black/50">Countdown</p>
              <p className="text-base font-bold text-[#1A1A1A]">{activeOccasion.daysRemaining} Days to Festival</p>
            </div>
          </div>

          <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-black/5 flex items-center space-x-3">
            <Users className="w-6 h-6 text-amber-600" />
            <div>
              <p className="text-xs text-black/50">Hosting Scale</p>
              <p className="text-base font-bold text-[#1A1A1A]">{activeOccasion.expectedGuests || 15} Out-of-town Relatives</p>
            </div>
          </div>

          <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-black/5 flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-black/50">Readiness</span>
                <span className="font-bold text-emerald-700">{progressPercent}% Done</span>
              </div>
              <div className="w-full bg-[#E8E5DF] rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Festive Buffet Menu */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xs font-bold text-black/50 uppercase tracking-widest mb-3 flex items-center space-x-2">
          <Utensils className="w-4 h-4 text-[#FF6B35]" />
          <span>Curated 15-Guest Festive Dinner Menu</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeOccasion.suggestedMenu.map((dish, i) => (
            <div key={i} className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-3.5 text-xs text-black/80">
              <p className="font-bold text-[#1A1A1A]">{dish.split(':')[0]}:</p>
              <p className="text-black/60 mt-1">{dish.split(':')[1] || dish}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Phase Interactive Timeline Checklists */}
      <div className="space-y-6">
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#FF6B35]" />
          <span>4-Stage Staggered Preparation Timeline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOccasion.checklistPhases.map((phase, pIdx) => (
            <div key={pIdx} className="bg-white border border-black/5 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">{phase.phase}</h3>
                  <span className="text-[11px] font-semibold text-black/50 bg-[#F0EEEA] px-2.5 py-0.5 rounded-full">
                    {phase.items.filter(i => i.done).length} / {phase.items.length} Done
                  </span>
                </div>

                <div className="space-y-2.5">
                  {phase.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(pIdx, item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                        item.done 
                          ? 'bg-[#F0EEEA]/60 border-black/5 opacity-60' 
                          : 'bg-[#F9F8F6] border-black/5 hover:border-[#FF6B35]'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-md border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          item.done 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-black/20 bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex-1 text-xs">
                        <p className={`font-medium ${item.done ? 'line-through text-black/40' : 'text-[#1A1A1A]'}`}>
                          {item.task}
                        </p>
                        <span className="text-[10px] text-black/50 capitalize">Category: {item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex justify-end">
                <button
                  onClick={() => onOpenChatWithPrompt(`Provide recommendations, schedule, and checklist for: ${phase.phase}`)}
                  className="text-xs text-[#FF6B35] hover:text-orange-700 font-semibold flex items-center space-x-1"
                >
                  <span>Ask NISA for details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
