export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  dietaryNotes: string;
  favorites: string[];
  allergies?: string;
  dailyRoutine?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'Groceries & Staples' | 'Dairy & Fresh' | 'Cleaning & Household' | 'Personal Care' | 'Snacks & Beverages';
  quantity: string;
  daysRemaining: number;
  status: 'buy_now' | 'buy_later' | 'stocked';
  preferredBrand: string;
  consumptionFrequency: string; // e.g. "Refilled every 14 days"
  unitPrice?: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  urgency: 'urgent' | 'regular' | 'festive';
  brandSuggestion?: string;
  estimatedPrice: number;
  checked: boolean;
  notes?: string;
}

export interface HelpStaff {
  id: string;
  name: string;
  role: string;
  phone: string;
  monthlySalary: number;
  paymentDueDay: number; // day of month e.g. 1
  upiId: string;
  lastPaidDate: string;
  isDue: boolean;
}

export interface ServiceContact {
  id: string;
  name: string;
  serviceType: 'Plumber' | 'Electrician' | 'AC Technician' | 'Carpenter' | 'Appliance Tech' | 'Emergency' | 'Doctor';
  phone: string;
  rating: number;
  notes: string;
  lastUsedDate?: string;
}

export interface OccasionChecklist {
  phase: string; // e.g. "Phase 1: Deep Cleaning (15 Days Before)", "Phase 2: Groceries & Sweets (7 Days Before)"
  items: {
    id: string;
    task: string;
    category: 'cleaning' | 'groceries' | 'cooking' | 'gifting' | 'personal_care' | 'decor';
    done: boolean;
  }[];
}

export interface Occasion {
  id: string;
  title: string;
  type: 'festival' | 'family_gathering' | 'birthday' | 'puja';
  date: string;
  daysRemaining: number;
  description: string;
  expectedGuests?: number;
  checklistPhases: OccasionChecklist[];
  suggestedMenu: string[];
}

export interface MealPlanDay {
  day: string;
  dateStr: string;
  lunch: {
    title: string;
    ingredients: string[];
    prepTimeMin: number;
    pantryReady: boolean;
    familyFit: string;
  };
  dinner: {
    title: string;
    ingredients: string[];
    prepTimeMin: number;
    pantryReady: boolean;
    familyFit: string;
  };
  highlightDish?: string;
}

export interface ConsumptionInsight {
  id: string;
  title: string;
  type: 'spike' | 'replenishment' | 'waste_reduction' | 'seasonal' | 'wellness';
  message: string;
  impact: string;
  actionLabel?: string;
  actionType?: 'add_to_cart' | 'adjust_routine' | 'view_pantry' | 'open_recipe';
  actionPayload?: any;
}

export interface MemoryFact {
  id: string;
  category: 'people' | 'food' | 'routine' | 'festivals' | 'help' | 'preferences';
  key: string;
  value: string;
  confidence: number;
  updatedAt: string;
}

export interface InteractiveActionItem {
  id: string;
  label: string;
  type: 'button' | 'link';
  url?: string;
  actionKey?: string;
  icon?: string;
  executed?: boolean;
}

export interface SmartDevice {
  id: string;
  name: string;
  location: string;
  type: 'light' | 'ac' | 'geyser' | 'purifier' | 'fan' | 'lock';
  isOn: boolean;
  statusText: string;
  powerWatts?: number;
  temperature?: number;
  brightness?: number;
}

export interface NexusUtilityBill {
  id: string;
  title: string;
  provider: string;
  category: 'electricity' | 'water' | 'gas' | 'internet' | 'maintenance';
  amount: number;
  dueDate: string;
  isPaid: boolean;
  accountNo: string;
  autoPayEnabled: boolean;
}

export interface NexusGatePass {
  id: string;
  visitorName: string;
  purpose: string;
  category: 'delivery' | 'service' | 'guest' | 'cab';
  passCode: string;
  validUntil: string;
  status: 'active' | 'used' | 'pending';
}

export interface HouseholdState {
  householdName: string;
  city: string;
  neighborhood: string;
  languagePreference: string;
  culturalBackground: string;
  members: FamilyMember[];
  pantry: PantryItem[];
  shoppingList: ShoppingItem[];
  helpStaff: HelpStaff[];
  serviceContacts: ServiceContact[];
  occasions: Occasion[];
  mealPlan: MealPlanDay[];
  insights: ConsumptionInsight[];
  memories: MemoryFact[];
  devices: SmartDevice[];
  bills?: NexusUtilityBill[];
  gatePasses?: NexusGatePass[];
}

export interface ChatCard {
  type: 'meal' | 'shopping' | 'occasion' | 'help_payment' | 'pantry' | 'insight' | 'none';
  title?: string;
  description?: string;
  items?: string[];
  actionButtonLabel?: string;
  data?: any;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nisa';
  text: string;
  timestamp: string;
  thoughtSnippet?: string;
  suggestions?: string[];
  card?: ChatCard;
  actions?: InteractiveActionItem[];
  extractedMemories?: string[];
}

