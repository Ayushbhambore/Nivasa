import React, { useState } from 'react';
import { 
  Zap, 
  Lightbulb, 
  AirVent, 
  Flame, 
  Droplets, 
  Lock, 
  Unlock, 
  Power, 
  Sliders, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Cpu, 
  Check, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { SmartDevice, HouseholdState } from '../types';

interface NexusSmartHubProps {
  devices: SmartDevice[];
  onToggleDevice: (deviceId: string) => void;
  onUpdateDeviceBrightness?: (deviceId: string, brightness: number) => void;
  onUpdateDeviceTemp?: (deviceId: string, delta: number) => void;
  onApplyScene: (sceneName: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const NexusSmartHub: React.FC<NexusSmartHubProps> = ({
  devices,
  onToggleDevice,
  onUpdateDeviceBrightness,
  onUpdateDeviceTemp,
  onApplyScene,
  onOpenChatWithPrompt
}) => {
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [filterRoom, setFilterRoom] = useState<string>('all');

  const activeDevices = devices.filter(d => d.isOn);
  const totalPowerWatts = devices.reduce((sum, d) => d.isOn ? sum + (d.powerWatts || 0) : sum, 0);

  const rooms = ['all', ...Array.from(new Set(devices.map(d => d.location)))];

  const filteredDevices = filterRoom === 'all' 
    ? devices 
    : devices.filter(d => d.location === filterRoom);

  const handleSceneClick = (scene: string) => {
    setActiveScene(scene);
    onApplyScene(scene);
    setTimeout(() => setActiveScene(null), 2500);
  };

  const getDeviceIcon = (type: SmartDevice['type']) => {
    switch (type) {
      case 'light': return Lightbulb;
      case 'ac': return AirVent;
      case 'geyser': return Flame;
      case 'purifier': return Droplets;
      case 'lock': return Lock;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Top Banner: Nexus Connected Living Status */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>NEXUS Smart IoT Mesh • Online</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Nexus Connected Devices & Climate
            </h1>
            <p className="mt-2 text-black/60 text-sm md:text-base leading-relaxed">
              Real-time monitoring and automation for your home appliances, lighting circuits, climate controls, and power usage.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#F0EEEA] px-4 py-3 rounded-2xl border border-black/5 text-center">
              <div className="text-xl font-black text-[#1A1A1A]">{activeDevices.length}/{devices.length}</div>
              <div className="text-[11px] text-black/50 font-medium">Active Devices</div>
            </div>

            <div className="bg-[#FEF9F3] px-4 py-3 rounded-2xl border border-orange-200 text-center">
              <div className="text-xl font-black text-[#FF6B35]">{totalPowerWatts} W</div>
              <div className="text-[11px] text-black/50 font-medium">Current Load</div>
            </div>
          </div>
        </div>

        {/* Quick One-Touch Nexus Living Scenes */}
        <div className="mt-6 pt-5 border-t border-black/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>One-Touch Nexus Living Scenes:</span>
            </span>
            <span className="text-[11px] text-black/50">Instant Multi-Device Presets</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleSceneClick('morning')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeScene === 'morning'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-98'
                  : 'bg-white hover:bg-[#F0EEEA] text-[#1A1A1A] border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Sun className="w-4 h-4 text-amber-500" />
                {activeScene === 'morning' && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="font-bold text-xs">Morning Routine</div>
              <div className="text-[10px] opacity-70">Geyser ON, Purifier ON, Light 80%</div>
            </button>

            <button
              onClick={() => handleSceneClick('evening')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeScene === 'evening'
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-98'
                  : 'bg-white hover:bg-[#F0EEEA] text-[#1A1A1A] border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Moon className="w-4 h-4 text-indigo-500" />
                {activeScene === 'evening' && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="font-bold text-xs">Evening Relax</div>
              <div className="text-[10px] opacity-70">Warm 40%, AC 24°C, Balcony ON</div>
            </button>

            <button
              onClick={() => handleSceneClick('all_on')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeScene === 'all_on'
                  ? 'bg-[#FF6B35] text-white border-orange-600 shadow-md scale-98'
                  : 'bg-white hover:bg-[#F0EEEA] text-[#1A1A1A] border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                {activeScene === 'all_on' && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="font-bold text-xs">Diwali Festive</div>
              <div className="text-[10px] opacity-70">All Lights 100%, AC Chill</div>
            </button>

            <button
              onClick={() => handleSceneClick('away')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeScene === 'away'
                  ? 'bg-[#1A1A1A] text-white border-black shadow-md scale-98'
                  : 'bg-white hover:bg-[#F0EEEA] text-[#1A1A1A] border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Power className="w-4 h-4 text-rose-500" />
                {activeScene === 'away' && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="font-bold text-xs">Away / All Off</div>
              <div className="text-[10px] opacity-70">Lock ON, All Appliances Off</div>
            </button>
          </div>
        </div>
      </div>

      {/* Room Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-black/50 uppercase tracking-wider pl-1">Rooms:</span>
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => setFilterRoom(room)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer capitalize ${
              filterRoom === room
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white hover:bg-[#F0EEEA] text-black/70 border border-black/10'
            }`}
          >
            {room === 'all' ? 'All Rooms (6)' : room}
          </button>
        ))}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDevices.map(device => {
          const Icon = getDeviceIcon(device.type);

          return (
            <div 
              key={device.id}
              className={`rounded-3xl border p-5 transition-all shadow-xs ${
                device.isOn
                  ? 'bg-white border-orange-200 ring-1 ring-orange-100'
                  : 'bg-[#FAFAFA] border-black/5 opacity-80'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    device.isOn 
                      ? 'bg-[#FF6B35] text-white shadow-sm' 
                      : 'bg-black/5 text-black/40'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1A1A1A]">{device.name}</h3>
                    <p className="text-[11px] text-black/50 font-medium">{device.location}</p>
                  </div>
                </div>

                {/* Primary Toggle Switch */}
                <button
                  type="button"
                  onClick={() => onToggleDevice(device.id)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                    device.isOn ? 'bg-[#FF6B35]' : 'bg-black/20'
                  }`}
                  aria-label={`Toggle ${device.name}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    device.isOn ? 'translate-x-5 shadow-xs' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Status Text & Live Watts */}
              <div className="bg-[#F9F8F6] rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                <span className="text-black/60 font-medium">{device.statusText}</span>
                {device.powerWatts !== undefined && (
                  <span className="font-bold text-[#1A1A1A] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-amber-500" />
                    <span>{device.isOn ? `${device.powerWatts}W` : '0W'}</span>
                  </span>
                )}
              </div>

              {/* Specific Controls (e.g. AC Temp or Light Brightness) */}
              {device.type === 'ac' && (
                <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-black/50 font-medium">Thermostat:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateDeviceTemp && onUpdateDeviceTemp(device.id, -1)}
                      disabled={!device.isOn}
                      className="w-7 h-7 rounded-lg bg-white border border-black/10 font-bold text-sm hover:bg-black/5 disabled:opacity-40 cursor-pointer flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-sm font-black text-[#1A1A1A] px-2">{device.temperature || 24}°C</span>
                    <button
                      onClick={() => onUpdateDeviceTemp && onUpdateDeviceTemp(device.id, 1)}
                      disabled={!device.isOn}
                      className="w-7 h-7 rounded-lg bg-white border border-black/10 font-bold text-sm hover:bg-black/5 disabled:opacity-40 cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {device.type === 'light' && device.brightness !== undefined && (
                <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-black/50 font-medium">Brightness:</span>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={device.brightness || 80}
                      disabled={!device.isOn}
                      onChange={(e) => onUpdateDeviceBrightness && onUpdateDeviceBrightness(device.id, Number(e.target.value))}
                      className="w-24 accent-[#FF6B35] cursor-pointer disabled:opacity-40"
                    />
                    <span className="text-xs font-bold text-[#1A1A1A] w-8 text-right">{device.brightness}%</span>
                  </div>
                </div>
              )}

              {device.type === 'geyser' && (
                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-black/50 font-medium">Safety Timer:</span>
                  <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    20 Min Auto Cutoff
                  </span>
                </div>
              )}

              {device.type === 'lock' && (
                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-black/50 font-medium">Security State:</span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Armed & Locked</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer AI Assist Banner */}
      <div className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Automate via NISA AI Voice Commands</h4>
            <p className="text-xs text-black/60">Say "Turn off living room lights in 30 mins" or "Set geyser schedule for 6 AM puja".</p>
          </div>
        </div>

        <button
          onClick={() => onOpenChatWithPrompt("Set up a smart schedule to turn off AC at 6:00 AM and start geyser")}
          className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer whitespace-nowrap"
        >
          Ask NISA to Automate
        </button>
      </div>
    </div>
  );
};
