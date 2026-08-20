import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Utensils, 
  ShoppingCart, 
  Sparkles, 
  Users, 
  BrainCircuit, 
  ChevronDown,
  MapPin,
  Menu,
  X,
  Globe,
  Check,
  Zap,
  Power,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Shield,
  Layers
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { NexusAppSwitcher } from './NexusAppSwitcher';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../i18n/languages';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  householdName: string;
  city: string;
  urgentCount: number;
  onOpenChatWithPrompt: (prompt: string) => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  householdName,
  city,
  urgentCount,
  onOpenChatWithPrompt,
  currentLanguage,
  onSelectLanguage
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileLangGrid, setShowMobileLangGrid] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Close desktop "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll or auto-close when tab changes
  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  };

  const moreItems = [
    { id: 'nexus-iot', label: 'Nexus Smart IoT', icon: Zap, badge: '6 Devices' },
    { id: 'nexus-pay', label: 'Nexus Pay & Bills', icon: CreditCard, badge: 'Dues' },
    { id: 'nexus-gate', label: 'Nexus Gate Passes', icon: Shield, badge: '3 Passes' },
    { id: 'celebrate', label: t.occasions, icon: Sparkles, badge: 'Diwali' },
    { id: 'manage', label: t.help, icon: Users, badge: 'Salaries' },
    { id: 'memory', label: t.memory, icon: BrainCircuit, badge: 'Memory Graph' }
  ];

  const allNavItems = [
    { 
      id: 'hub', 
      label: t.home, 
      desc: 'Daily household dashboard & alerts',
      icon: Home, 
      badge: undefined 
    },
    { 
      id: 'nourish', 
      label: t.meals, 
      desc: 'Zero-waste meal plan & recipes',
      icon: Utensils, 
      badge: 'Dinner Ready' 
    },
    { 
      id: 'anticipate', 
      label: t.pantry, 
      desc: 'Pantry inventory & auto-restock',
      icon: ShoppingCart, 
      badge: urgentCount > 0 ? `${urgentCount} Urgent` : undefined,
      badgeColor: 'bg-[#FF6B35] text-white'
    },
    { 
      id: 'nexus-iot', 
      label: 'Nexus Smart IoT', 
      desc: 'Living room lights, AC thermostat, geyser & wattage',
      icon: Zap, 
      badge: '6 Devices' 
    },
    { 
      id: 'nexus-pay', 
      label: 'Nexus Pay & Bills', 
      desc: 'BESCOM electricity, piped gas & UPI salaries',
      icon: CreditCard, 
      badge: 'Dues Pending' 
    },
    { 
      id: 'nexus-gate', 
      label: 'Nexus Gate & Security', 
      desc: 'Instant delivery entry codes & Diwali bulk pass',
      icon: Shield, 
      badge: '3 Passes' 
    },
    { 
      id: 'celebrate', 
      label: t.occasions, 
      desc: 'Diwali in 18 days with 15 guests',
      icon: Sparkles, 
      badge: 'Diwali 18d' 
    },
    { 
      id: 'manage', 
      label: t.help, 
      desc: 'Domestic staff payroll & attendance',
      icon: Users, 
      badge: 'Salaries Due' 
    },
    { 
      id: 'memory', 
      label: t.memory, 
      desc: 'Autonomous preferences knowledge graph',
      icon: BrainCircuit, 
      badge: 'Active' 
    },
    { 
      id: 'chat', 
      label: t.askNisa, 
      desc: 'Interactive household voice & task AI',
      icon: Sparkles, 
      badge: 'Interactive AI',
      badgeColor: 'bg-orange-100 text-[#FF6B35]'
    }
  ];

  const isMoreActive = moreItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/10 shadow-xs text-[#2D2D2D]">
      {/* Top Banner with Localized Insights Ribbon (Desktop & Mobile Scrollable) */}
      <div className="bg-[#F0EEEA] px-4 py-1.5 text-xs border-b border-black/5 flex items-center justify-between overflow-x-auto text-black/70 scrollbar-none">
        <div className="flex items-center space-x-5 shrink-0">
          <div className="flex items-center space-x-1.5 text-[#FF6B35] font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">NISA Intelligence</span>
          </div>
          
          <button 
            onClick={() => onOpenChatWithPrompt("What should we cook tonight with our available spinach and paneer?")}
            className="hover:text-black transition-colors flex items-center space-x-1 text-xs shrink-0 cursor-pointer"
          >
            <span className="text-black/40">{t.todayDinner}:</span>
            <span className="font-medium underline decoration-orange-400">Palak Paneer</span>
          </button>
          
          <button 
            onClick={() => onOpenChatWithPrompt("Show me the urgent grocery items running out this week")}
            className="hover:text-black transition-colors flex items-center space-x-1 text-xs shrink-0 cursor-pointer"
          >
            <span className="text-black/40">{t.pantry}:</span>
            <span className="font-medium text-[#FF6B35]">Surf Excel & Atta</span>
          </button>
          
          <button 
            onClick={() => onOpenChatWithPrompt("What do we need to prepare for Diwali in 18 days with 15 guests?")}
            className="hover:text-black transition-colors flex items-center space-x-1 text-xs shrink-0 cursor-pointer"
          >
            <span className="text-black/40">{t.occasions}:</span>
            <span className="font-medium text-amber-700">{t.festiveCountdown}</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-2 text-black/40 text-[11px] font-medium tracking-wide shrink-0 pl-4">
          <span>17 Indian Languages Supported</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between h-16 sm:h-18">
        
        {/* Left: Branding & Household Identity */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <div 
            onClick={() => handleTabSelect('hub')}
            className="cursor-pointer flex items-center space-x-2.5 sm:space-x-3 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-white font-serif font-black text-base sm:text-lg tracking-tight">N</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-black text-black/40">NIVASA</span>
                <span className="bg-[#FEF9F3] border border-orange-200 text-[#FF6B35] text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-full">
                  Home AI
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A] tracking-tight truncate max-w-[140px] sm:max-w-none">
                {householdName}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center pl-3 border-l border-black/10">
            <div className="bg-[#F0EEEA] text-[#2D2D2D] text-xs px-2.5 py-1 rounded-full border border-black/5 flex items-center space-x-1.5">
              <MapPin className="w-3 h-3 text-[#FF6B35]" />
              <span className="text-[11px] font-medium">{city}</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5 py-1">
          {/* 1. Home Hub */}
          <button
            id="nav-tab-hub"
            onClick={() => handleTabSelect('hub')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hub'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-black/65 hover:text-black hover:bg-[#F0EEEA]'
            }`}
          >
            <Home className={`w-3.5 h-3.5 ${activeTab === 'hub' ? 'text-white' : 'text-black/50'}`} />
            <span>{t.home}</span>
          </button>

          {/* 2. Nourish & Meals */}
          <button
            id="nav-tab-nourish"
            onClick={() => handleTabSelect('nourish')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'nourish'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-black/65 hover:text-black hover:bg-[#F0EEEA]'
            }`}
          >
            <Utensils className={`w-3.5 h-3.5 ${activeTab === 'nourish' ? 'text-white' : 'text-black/50'}`} />
            <span>{t.meals}</span>
          </button>

          {/* 3. Smart Pantry & Cart */}
          <button
            id="nav-tab-anticipate"
            onClick={() => handleTabSelect('anticipate')}
            className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'anticipate'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'text-black/65 hover:text-black hover:bg-[#F0EEEA]'
            }`}
          >
            <ShoppingCart className={`w-3.5 h-3.5 ${activeTab === 'anticipate' ? 'text-white' : 'text-black/50'}`} />
            <span>{t.pantry}</span>
            {urgentCount > 0 && (
              <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                {urgentCount}
              </span>
            )}
          </button>

          {/* 4. Grouped "More" Dropdown Menu */}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              id="nav-tab-more"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                isMoreActive || isMoreOpen
                  ? 'bg-[#1A1A1A] text-white border-black shadow-sm'
                  : 'bg-transparent text-black/65 hover:text-black hover:bg-[#F0EEEA] border-transparent'
              }`}
            >
              <span>{t.more}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isMoreOpen ? 'rotate-180 text-white' : 'text-black/50'}`} />
            </button>

            {/* Dropdown Popover */}
            {isMoreOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 bg-white border border-black/10 rounded-2xl shadow-xl z-50 p-1.5 animate-fadeIn text-[#2D2D2D]">
                <div className="px-3 py-1.5 text-[10px] font-bold text-black/40 uppercase tracking-wider">
                  Household Operations
                </div>
                
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabSelect(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#FEF9F3] text-[#FF6B35]'
                          : 'hover:bg-[#F0EEEA] text-[#1A1A1A]'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6B35]' : 'text-black/50'}`} />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/5 text-black/60">
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Desktop Nexus Switcher + Language Selector + AI Button, & Mobile Single-Unit Hamburger */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Desktop Nexus Ecosystem App Switcher */}
          <div className="hidden sm:block">
            <NexusAppSwitcher
              currentAppId={activeTab === 'hub' || activeTab === 'nourish' || activeTab === 'anticipate' ? 'nivasa-home' : activeTab}
              onSelectApp={(appId) => {
                if (appId === 'nivasa-home') handleTabSelect('hub');
                else if (appId === 'nexus-iot') handleTabSelect('nexus-iot');
                else if (appId === 'nexus-pay') handleTabSelect('nexus-pay');
                else if (appId === 'nexus-gate') handleTabSelect('nexus-gate');
                else if (appId === 'nexus-memory') handleTabSelect('memory');
                else handleTabSelect(appId);
              }}
            />
          </div>

          {/* Desktop Language Selector (Hidden on Mobile) */}
          <div className="hidden md:block">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={onSelectLanguage}
            />
          </div>

          {/* Desktop NISA AI Button (Hidden on Mobile) */}
          <button
            id="open-nisa-ai-btn"
            onClick={() => handleTabSelect('chat')}
            className={`hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
              activeTab === 'chat'
                ? 'bg-[#FF6B35] text-white shadow-md'
                : 'bg-[#1A1A1A] hover:bg-black text-white hover:shadow-md'
            }`}
            title="Open NISA Interactive Chat Console"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>{t.askNisa}</span>
          </button>

          {/* Mobile Single-Unit Trigger Controls (< md screens) */}
          <div className="flex md:hidden items-center space-x-1.5">
            {/* Mobile Nexus Launcher Shortcut */}
            <button
              type="button"
              onClick={() => {
                handleTabSelect('nexus-iot');
              }}
              className="flex items-center space-x-1 bg-[#1A1A1A] text-white px-2.5 py-1.5 rounded-full text-xs font-bold cursor-pointer"
              title="Nexus Smart Hub"
            >
              <Zap className="w-3 h-3 text-[#FF6B35]" />
              <span className="text-[10px]">NEXUS</span>
            </button>

            {/* Mobile Fast Language Switch Indicator */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(true);
                setShowMobileLangGrid(true);
              }}
              className="flex items-center space-x-1 bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#1A1A1A] border border-black/10 px-2.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-[11px]">{currentLangObj.nativeName.split(' ')[0]}</span>
            </button>

            {/* Mobile NISA Chat Icon Button */}
            <button
              type="button"
              onClick={() => handleTabSelect('chat')}
              className={`p-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'bg-[#1A1A1A] text-white'
              }`}
              title="Open NISA AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            </button>

            {/* Mobile Single Unit Hamburger Toggle Button */}
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setShowMobileLangGrid(false);
              }}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] ${
                isMobileMenuOpen
                  ? 'bg-[#1A1A1A] text-white border-black shadow-md'
                  : 'bg-[#F9F8F6] hover:bg-[#F0EEEA] text-[#1A1A1A] border-black/15'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#FF6B35]" />
              ) : (
                <div className="relative">
                  <Menu className="w-5 h-5 text-[#1A1A1A]" />
                  {urgentCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF6B35] rounded-full ring-2 ring-white"></span>
                  )}
                </div>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE COLLAPSIBLE SINGLE-UNIT PANEL (< md viewports)                     */}
      {/* All options organized and visible in a single unified view               */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/10 shadow-2xl max-h-[85vh] overflow-y-auto animate-fadeIn divide-y divide-black/5">
          
          {/* 1. Header Banner & Language Toggle Pill in Mobile Menu */}
          <div className="p-3.5 bg-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></div>
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                Household Menu & Controls
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileLangGrid(!showMobileLangGrid)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                showMobileLangGrid
                  ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                  : 'bg-white text-[#1A1A1A] border-black/10 shadow-2xs'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLangObj.nativeName}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showMobileLangGrid ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* 2. Embedded Pan-Indian Language Switcher Grid (Toggleable on Mobile) */}
          {showMobileLangGrid && (
            <div className="p-3 bg-[#FEF9F3] border-b border-orange-200 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider">
                  Select Language (17 Languages):
                </span>
                <span className="text-[10px] text-black/50">Instant UI Translation</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLanguage;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setShowMobileLangGrid(false);
                      }}
                      className={`text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors border ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-white border-black font-bold shadow-xs'
                          : 'bg-white hover:bg-orange-50 text-[#1A1A1A] border-black/5'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-semibold">{lang.nativeName}</div>
                        <div className="text-[10px] opacity-60 truncate">{lang.name}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Unified Mobile Navigation List (All 7 Options Visible) */}
          <div className="p-2 space-y-1">
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-black/40 uppercase tracking-wider">
              All Sections
            </div>

            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-md'
                      : 'hover:bg-[#F0EEEA] text-[#1A1A1A] bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-[#FF6B35] text-white' : 'bg-black/5 text-[#1A1A1A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate">{item.label}</div>
                      <div className={`text-[11px] truncate ${isActive ? 'text-white/70' : 'text-black/50'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0 pl-2">
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : item.badgeColor || 'bg-black/5 text-black/60'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#FF6B35]' : 'text-black/30'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 4. Instant Household Quick Actions in Mobile Single Unit */}
          <div className="p-3.5 bg-[#F9F8F6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FF6B35]" />
                <span>{t.quickActions}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenChatWithPrompt("Turn on lights");
                }}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/10 text-xs font-semibold p-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-2 text-left"
              >
                <Power className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{t.turnOnLights}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenChatWithPrompt("Pay electricity bill");
                }}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/10 text-xs font-semibold p-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-2 text-left"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{t.payElectricity}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenChatWithPrompt("Order groceries");
                }}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/10 text-xs font-semibold p-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-2 text-left"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{t.orderGroceries}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenChatWithPrompt("Schedule laundry pickup");
                }}
                className="bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-black/10 text-xs font-semibold p-2.5 rounded-xl transition-all shadow-2xs flex items-center space-x-2 text-left"
              >
                <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{t.scheduleLaundry}</span>
              </button>
            </div>
          </div>

          {/* 5. Mobile Footer Information */}
          <div className="p-3 bg-[#F0EEEA] text-center text-[11px] text-black/50 flex items-center justify-between">
            <span>{householdName} • {city}</span>
            <span className="font-semibold text-[#FF6B35]">{currentLangObj.nativeName} Active</span>
          </div>

        </div>
      )}

    </header>
  );
};
