import React, { useState } from 'react';
import { 
  Shield, 
  QrCode, 
  Key, 
  Truck, 
  Users, 
  CheckCircle2, 
  Plus, 
  Clock, 
  Share2, 
  Copy, 
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { NexusGatePass } from '../types';

interface NexusGateHubProps {
  gatePasses: NexusGatePass[];
  onCreatePass: (newPass: NexusGatePass) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const NexusGateHub: React.FC<NexusGateHubProps> = ({
  gatePasses,
  onCreatePass,
  onOpenChatWithPrompt
}) => {
  const [showNewPassModal, setShowNewPassModal] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState<NexusGatePass['category']>('delivery');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    const newPass: NexusGatePass = {
      id: `gp-${Date.now()}`,
      visitorName,
      purpose: purpose || 'General Visit',
      category,
      passCode: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      validUntil: 'Today, 11:59 PM',
      status: 'active'
    };

    onCreatePass(newPass);
    setShowNewPassModal(false);
    setVisitorName('');
    setPurpose('');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getCategoryIcon = (cat: NexusGatePass['category']) => {
    switch (cat) {
      case 'delivery': return Truck;
      case 'service': return Key;
      case 'guest': return Users;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Top Banner: Nexus Gate & Society Security */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>NEXUS Gate & Community Security</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Pre-Approved Visitor Passes & Deliveries
            </h1>
            <p className="mt-2 text-black/60 text-sm md:text-base leading-relaxed">
              Instant digital security entry passes for Blinkit/Instamart delivery agents, Urban Company technicians, and visiting festival guests.
            </p>
          </div>

          <button
            onClick={() => setShowNewPassModal(true)}
            className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-sm flex items-center space-x-2 cursor-pointer shrink-0 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#FF6B35]" />
            <span>Generate Fast Gate Pass</span>
          </button>
        </div>
      </div>

      {/* Gate Pass Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gatePasses.map(pass => {
          const Icon = getCategoryIcon(pass.category);

          return (
            <div
              key={pass.id}
              className="bg-white rounded-3xl border border-black/10 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#1A1A1A]">{pass.visitorName}</h3>
                      <p className="text-[11px] text-black/50 capitalize">{pass.category} entry</p>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {pass.status}
                  </span>
                </div>

                <p className="text-xs text-black/70 mb-4 bg-[#F9F8F6] p-2.5 rounded-xl">
                  {pass.purpose}
                </p>

                {/* Digital Passcode Box */}
                <div className="p-3.5 bg-[#FEF9F3] border border-orange-200 rounded-2xl flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-black/40">Security Entry Code</div>
                    <div className="font-mono text-xl font-black text-[#FF6B35] tracking-wider">{pass.passCode}</div>
                  </div>

                  <button
                    onClick={() => handleCopy(pass.passCode)}
                    className="p-2 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 text-black/70 cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode === pass.passCode ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-black/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-black/40" />
                  <span>Valid: {pass.validUntil}</span>
                </span>

                <button
                  onClick={() => alert(`Shared Gate Pass #${pass.passCode} for ${pass.visitorName}`)}
                  className="text-[#FF6B35] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diwali Bulk Guest Pass Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1A1A1A]">Diwali 15-Guest Bulk Society Entry Pass</h4>
            <p className="text-xs text-black/60">Generate a universal QR code pass for all 15 visiting relatives arriving for Diwali.</p>
          </div>
        </div>

        <button
          onClick={() => {
            const diwaliPass: NexusGatePass = {
              id: `gp-diwali-${Date.now()}`,
              visitorName: "Diwali 15 Family Guests",
              purpose: "Diwali Lakshmi Puja & Family Reunion (15 Relatives)",
              category: "guest",
              passCode: "NX-DIWALI-VIP",
              validUntil: "Nov 08 - Nov 11, 2026",
              status: "active"
            };
            onCreatePass(diwaliPass);
          }}
          className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer whitespace-nowrap"
        >
          Generate Diwali Bulk Pass
        </button>
      </div>

      {/* Modal: New Pass */}
      {showNewPassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-black/10 max-w-md w-full p-6 shadow-2xl animate-fadeIn text-[#2D2D2D]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#1A1A1A]">Generate Nexus Gate Pass</h3>
              <button 
                onClick={() => setShowNewPassModal(false)}
                className="text-black/40 hover:text-black font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black/70 mb-1">Visitor / Agency Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zepto Agent, Dr. Rao, Relatives"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-xs focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black/70 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-xs focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="delivery">Quick Commerce / Food Delivery</option>
                  <option value="service">Home Repair / Urban Company</option>
                  <option value="guest">Family / Visiting Relatives</option>
                  <option value="cab">Cab Pickup / Drop</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black/70 mb-1">Purpose / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Grocery Drop at Flat B-402"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-xs focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPassModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-black/70 hover:bg-black/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Create Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
