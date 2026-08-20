import React, { useState } from 'react';
import { 
  Utensils, 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  RefreshCw, 
  Heart, 
  AlertCircle,
  Plus,
  BookOpen,
  X
} from 'lucide-react';
import { HouseholdState, MealPlanDay } from '../types';

interface NourishHubProps {
  household: HouseholdState;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const NourishHub: React.FC<NourishHubProps> = ({
  household,
  onOpenChatWithPrompt
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [activeRecipe, setActiveRecipe] = useState<any | null>(null);

  const currentMealPlan = household.mealPlan;
  const activeDayPlan = currentMealPlan[selectedDay] || currentMealPlan[0];

  const handleOpenRecipe = (title: string) => {
    setActiveRecipe({
      title,
      prepTime: "25 minutes",
      servings: "4 family members (Adjusted for Dadi & Aarav)",
      ingredients: [
        "Fresh Spinach (Palak) - 2 bunches (washed & blanched)",
        "Fresh Paneer - 400g (cut into soft cubes)",
        "Onions & Tomatoes - 2 medium",
        "Garlic & Ginger paste - 1 tbsp",
        "Cumin seeds, Turmeric, Coriander powder",
        "Fresh cream / Doodh ki malai - 2 tbsp (for kid's portion)"
      ],
      steps: [
        "1. Blanch the fresh spinach in boiling water for 2 mins, then plunge in ice water to maintain vibrant green color.",
        "2. Blend spinach with 1 green chilli (set aside 1 portion with zero chilli for Dadi and Aarav).",
        "3. Sauté cumin seeds, ginger-garlic paste, and finely chopped tomatoes until oil separates.",
        "4. Pour in the velvety spinach puree and simmer for 5 minutes with mild pink salt (low sodium for Dadi).",
        "5. Gently fold in the fresh paneer cubes and warm through for 3 minutes.",
        "6. Serve with warm, soft whole wheat phulkas brushed with a touch of pure desi ghee."
      ],
      familyNotes: "Dadi's portion is kept low-sodium and without raw onion garnish. Aarav receives mild buttery paneer."
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Header Banner */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>NISA Nourish Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Aaj Khane Mein Kya Banayein?
            </h1>
            <p className="text-black/60 text-sm mt-1 max-w-2xl leading-relaxed">
              Meals planned around your household's actual pantry ingredients, zero food waste, and individual multi-generational dietary preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChatWithPrompt("Suggest an alternate dinner recipe with what's in our pantry")}
              className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Re-Roll Today's Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Household Dietary Alignment Matrix */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xs font-bold text-black/50 uppercase tracking-widest mb-4 flex items-center space-x-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Multi-Generational Family Dietary Matrix</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {household.members.map((member) => (
            <div key={member.id} className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">{member.name}</h3>
                  <span className="text-[11px] text-black/40 font-medium">{member.age} yrs</span>
                </div>
                <p className="text-xs text-[#FF6B35] font-semibold mb-2">{member.relation}</p>
                <div className="text-xs text-black/70 space-y-1.5 bg-white p-2.5 rounded-xl border border-black/5">
                  <p className="text-[11px] leading-snug">
                    <strong className="text-[#1A1A1A]">Diet:</strong> {member.dietaryNotes}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/5 text-[11px] text-black/50">
                <span>Favs: {member.favorites.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Interactive Meal Schedule */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">This Week's Household Meal Plan</h2>
            <p className="text-xs text-black/50">Optimized to use perishables first and satisfy all family palates</p>
          </div>

          {/* Day Selector Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0">
            {currentMealPlan.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedDay === idx
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F0EEEA] text-black/60 hover:text-black'
                }`}
              >
                {day.day.split(' ')[0]} ({day.dateStr})
              </button>
            ))}
          </div>
        </div>

        {/* Active Day Detail Card */}
        {activeDayPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Lunch */}
            <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    ☀️ Afternoon Lunch
                  </span>
                  <span className="text-xs text-black/50 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-black/40" />
                    <span>{activeDayPlan.lunch.prepTimeMin} mins</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{activeDayPlan.lunch.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-black/60">
                    <strong className="text-[#1A1A1A]">Key Ingredients:</strong> {activeDayPlan.lunch.ingredients.join(', ')}
                  </p>
                  <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                    ✨ {activeDayPlan.lunch.familyFit}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] text-black/50 font-medium">
                  {activeDayPlan.lunch.pantryReady ? "✅ All in pantry" : "⚠️ Needs 1 item"}
                </span>
                <button
                  onClick={() => handleOpenRecipe(activeDayPlan.lunch.title)}
                  className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Recipe Guide</span>
                </button>
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    🌙 Evening Dinner
                  </span>
                  <span className="text-xs text-black/50 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-black/40" />
                    <span>{activeDayPlan.dinner.prepTimeMin} mins</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{activeDayPlan.dinner.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-black/60">
                    <strong className="text-[#1A1A1A]">Key Ingredients:</strong> {activeDayPlan.dinner.ingredients.join(', ')}
                  </p>
                  <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                    ✨ {activeDayPlan.dinner.familyFit}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] text-black/50 font-medium">
                  {activeDayPlan.dinner.pantryReady ? "✅ Zero Waste Match" : "⚠️ Needs 1 item"}
                </span>
                <button
                  onClick={() => handleOpenRecipe(activeDayPlan.dinner.title)}
                  className="text-xs font-semibold text-[#FF6B35] hover:text-orange-700 flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Recipe Guide</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Recipe Modal Popup */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-3xl max-w-xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn text-[#2D2D2D]">
            <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
              <div className="flex items-center space-x-2 text-[#FF6B35]">
                <ChefHat className="w-5 h-5" />
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{activeRecipe.title}</h3>
              </div>
              <button
                onClick={() => setActiveRecipe(null)}
                className="text-black/40 hover:text-black p-1 rounded-lg hover:bg-[#F0EEEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-black/70">
              <div className="flex items-center justify-between bg-[#F9F8F6] p-3 rounded-2xl border border-black/5">
                <span>⏱️ Prep Time: <strong>{activeRecipe.prepTime}</strong></span>
                <span>👨‍👩‍👧‍👦 Servings: <strong>{activeRecipe.servings}</strong></span>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">Ingredients:</h4>
                <ul className="space-y-1.5 bg-[#F9F8F6] p-3.5 rounded-2xl border border-black/5">
                  {activeRecipe.ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">Cooking Instructions:</h4>
                <div className="space-y-2 bg-[#F9F8F6] p-3.5 rounded-2xl border border-black/5">
                  {activeRecipe.steps.map((st: string, i: number) => (
                    <p key={i} className="leading-relaxed">{st}</p>
                  ))}
                </div>
              </div>

              <div className="bg-[#FEF9F3] border border-orange-200 p-3.5 rounded-2xl text-black/80">
                <p className="font-semibold text-[#FF6B35] mb-1">❤️ NISA Family Note:</p>
                <p>{activeRecipe.familyNotes}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveRecipe(null)}
                className="bg-[#1A1A1A] hover:bg-black text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
