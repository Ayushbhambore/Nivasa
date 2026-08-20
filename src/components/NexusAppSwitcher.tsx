import React, { useState, useRef, useEffect } from 'react';
import { 
  Grid, 
  Home, 
  Zap, 
  CreditCard, 
  Shield, 
  BrainCircuit, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Radio,
  Cpu
} from 'lucide-react';

export interface NexusAppInfo {
  id: string;
  name: string;
  subTitle: string;
  icon: React.ElementType;
  tag: string;
  status: 'active' | 'synced' | 'online';
  color: string;
  badge?: string;
}

interface NexusAppSwitcherProps {
  currentAppId: string;
  onSelectApp: (appId: string) => void;
}

export const NEXUS_SUITE: NexusAppInfo[] = [
  {
    id: 'nivasa-home',
    name: 'NIVASA AI Home',
    subTitle: 'Household intelligence, meals, pantry & occasions',
    icon: Home,
    tag: 'Current Hub',
    status: 'active',
    color: 'bg-[#FF6B35] text-white',
    badge: 'NISA Core'
  },
  {
    id: 'nexus-iot',
    name: 'Nexus Smart IoT',
    subTitle: 'Living room lights, AC thermostat, geyser & power',
    icon: Zap,
    tag: '6 Connected',
    status: 'online',
    color: 'bg-amber-500 text-white',
    badge: '1.2 kW Load'
  },
  {
    id: 'nexus-pay',
    name: 'Nexus Pay & Dues',
    subTitle: 'BESCOM electricity, piped gas, staff UPI payroll',
    icon: CreditCard,
    tag: 'Bills Due',
    status: 'synced',
    color: 'bg-emerald-600 text-white',
    badge: '₹13,840 Due'
  },
  {
    id: 'nexus-gate',
    name: 'Nexus Gate & Security',
    subTitle: 'Visitor approvals, Blinkit delivery codes & Diwali pass',
    icon: Shield,
    tag: '3 Active Passes',
    status: 'online',
    color: 'bg-blue-600 text-white',
    badge: 'Secured'
  },
  {
    id: 'nexus-memory',
    name: 'Nexus Neural Memory',
    subTitle: 'Autonomous family preference graph & routines',
    icon: BrainCircuit,
    tag: '99% Confidence',
    status: 'synced',
    color: 'bg-indigo-600 text-white',
    badge: 'AI Synced'
  }
];

export const NexusAppSwitcher: React.FC<NexusAppSwitcherProps> = ({
  currentAppId,
  onSelectApp
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 9-dot Nexus Launcher Button */}
      <button
        type="button"
        id="nexus-app-launcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
          isOpen
            ? 'bg-[#1A1A1A] text-white border-black shadow-md'
            : 'bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#1A1A1A] border-black/10'
        }`}
        title="Open Nexus Ecosystem App Suite"
      >
        <div className="w-3.5 h-3.5 grid grid-cols-3 gap-0.5 items-center justify-center">
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
          <span className={`w-0.5 h-0.5 rounded-full ${isOpen ? 'bg-[#FF6B35]' : 'bg-[#1A1A1A]'}`}></span>
        </div>
        <span className="tracking-wide">NEXUS</span>
        <span className="bg-[#FF6B35] text-white text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded-full hidden sm:inline">
          SUITE
        </span>
      </button>

      {/* Dropdown Menu / Launcher Grid */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 bg-white border border-black/10 rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn text-[#2D2D2D]">
          
          {/* Header */}
          <div className="p-3 bg-[#FAFAFA] border-b border-black/5 rounded-xl mb-1.5 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  NEXUS Living Ecosystem
                </span>
              </div>
              <p className="text-[10px] text-black/50 mt-0.5">
                Unified Home Operating System v4.2 • Mesh Synced
              </p>
            </div>
            
            <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All 5 Apps Active</span>
            </div>
          </div>

          {/* App Switcher List */}
          <div className="space-y-1 max-h-80 overflow-y-auto p-1">
            {NEXUS_SUITE.map((app) => {
              const Icon = app.icon;
              const isSelected = currentAppId === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => {
                    onSelectApp(app.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#FEF9F3] border-orange-200 text-[#1A1A1A] shadow-xs'
                      : 'hover:bg-[#F0EEEA] border-transparent text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs shrink-0 ${app.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-[#1A1A1A]">{app.name}</span>
                        {isSelected && (
                          <span className="bg-[#FF6B35] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-black/50 truncate max-w-[200px] sm:max-w-[240px]">
                        {app.subTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0 pl-2">
                    {app.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 text-black/70">
                        {app.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-black/30" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nexus Status Footer */}
          <div className="mt-1.5 p-2 bg-[#F9F8F6] border-t border-black/5 rounded-xl text-[10px] text-black/50 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Cpu className="w-3 h-3 text-[#FF6B35]" />
              <span>Gateway: Indiranagar Hub • 12ms ping</span>
            </div>
            <span className="font-semibold text-black/70">Cloud Sync OK</span>
          </div>

        </div>
      )}
    </div>
  );
};
