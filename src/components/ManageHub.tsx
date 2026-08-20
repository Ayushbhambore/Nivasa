import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  QrCode, 
  X, 
  Check, 
  Download,
  Star,
  ExternalLink,
  Copy,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HouseholdState, HelpStaff, ServiceContact } from '../types';

interface ManageHubProps {
  household: HouseholdState;
  onPayStaff: (staff: HelpStaff) => void;
  onAddServiceContact: (contact: Partial<ServiceContact>) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const ManageHub: React.FC<ManageHubProps> = ({
  household,
  onPayStaff,
  onAddServiceContact,
  onOpenChatWithPrompt
}) => {
  const [activePaymentStaff, setActivePaymentStaff] = useState<HelpStaff | null>(null);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  // New Contact Form State
  const [newContactName, setNewContactName] = useState('');
  const [newContactType, setNewContactType] = useState<ServiceContact['serviceType']>('Plumber');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactNotes, setNewContactNotes] = useState('');

  const handleConfirmUPIPayment = () => {
    if (!activePaymentStaff) return;
    onPayStaff(activePaymentStaff);
    setIsPaidSuccess(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsPaidSuccess(false);
      setActivePaymentStaff(null);
    }, 2200);
  };

  const handleCopyUpi = (upiId: string) => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    onAddServiceContact({
      id: `sc-${Date.now()}`,
      name: newContactName.trim(),
      serviceType: newContactType,
      phone: newContactPhone.trim(),
      rating: 5.0,
      notes: newContactNotes.trim() || "Added to household directory",
      lastUsedDate: "Just added"
    });

    setNewContactName('');
    setNewContactPhone('');
    setNewContactNotes('');
    setShowAddContactModal(false);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Header Banner */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FEF9F3] border border-orange-100 text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>NISA Domestic Operations & Services</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Household Help & Home Services Directory
            </h1>
            <p className="text-black/60 text-sm mt-1 max-w-2xl leading-relaxed">
              Track domestic staff compensation, trigger direct UPI payments on the 1st of every month, and keep your trusted home service contacts in one permanent repository.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChatWithPrompt("Show domestic staff payment summary and dues for this month")}
              className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shadow-sm flex items-center space-x-2"
            >
              <DollarSign className="w-4 h-4 text-[#FF6B35]" />
              <span>Payroll Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Household Staff Payroll */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/5">
          <div>
            <h2 className="text-base font-bold text-[#1A1A1A] flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-[#FF6B35]" />
              <span>Domestic Staff Payroll Roster</span>
            </h2>
            <p className="text-xs text-black/50">Monthly recurring salaries & UPI settlements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {household.helpStaff.map((staff) => (
            <div
              key={staff.id}
              className={`bg-[#F9F8F6] border rounded-3xl p-5 flex flex-col justify-between transition-all ${
                staff.isDue ? 'border-rose-300 shadow-sm' : 'border-black/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#1A1A1A]">{staff.name}</span>
                  {staff.isDue ? (
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      <span>Due Tomorrow (1st)</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Settled</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-black/60 mb-3">{staff.role}</p>

                <div className="space-y-1.5 text-xs text-black/80 bg-white p-3 rounded-2xl border border-black/5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-black/50">Monthly Salary:</span>
                    <span className="font-bold text-[#1A1A1A]">₹{staff.monthlySalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Payment Day:</span>
                    <span>{staff.paymentDueDay}st of month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">UPI ID:</span>
                    <span className="font-mono text-[11px] text-[#FF6B35] truncate max-w-[140px]">{staff.upiId}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <a
                  href={`tel:${staff.phone.replace(/\s+/g, '')}`}
                  className="text-black/60 hover:text-black text-xs font-semibold flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => setActivePaymentStaff(staff)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all shadow-sm flex items-center space-x-1.5 ${
                    staff.isDue 
                      ? 'bg-[#FF6B35] hover:bg-orange-600 text-white' 
                      : 'bg-[#1A1A1A] hover:bg-black text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{staff.isDue ? 'Pay via UPI' : 'Advance / Bonus'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Home Service Directory Rolodex */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-black/5">
          <div>
            <h2 className="text-base font-bold text-[#1A1A1A] flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-[#FF6B35]" />
              <span>Trusted Home Services Rolodex</span>
            </h2>
            <p className="text-xs text-black/50">
              "Never search through old WhatsApp chats for a plumber's number again."
            </p>
          </div>

          <button
            onClick={() => setShowAddContactModal(true)}
            className="bg-[#1A1A1A] hover:bg-black text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors flex items-center space-x-1.5 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#FF6B35]" />
            <span>Add Trusted Service</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {household.serviceContacts.map((contact) => (
            <div key={contact.id} className="bg-[#F9F8F6] border border-black/5 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-[#1A1A1A]">{contact.name}</span>
                    <span className="bg-white text-[#FF6B35] text-[10px] font-bold px-2 py-0.5 rounded-full border border-black/5">
                      {contact.serviceType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{contact.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-black/60 mb-3 leading-relaxed">
                  {contact.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                <span className="font-mono text-black/70 font-medium">{contact.phone}</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center space-x-1 font-semibold"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="bg-white hover:bg-[#F0EEEA] text-black/80 border border-black/5 px-3 py-1 rounded-full flex items-center space-x-1 font-semibold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPI Payment Modal */}
      {activePaymentStaff && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fadeIn text-[#2D2D2D]">
            <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
              <div className="flex items-center space-x-2 text-[#FF6B35]">
                <QrCode className="w-5 h-5" />
                <h3 className="text-base font-serif font-bold text-[#1A1A1A]">UPI Direct Pay Assistant</h3>
              </div>
              <button
                onClick={() => setActivePaymentStaff(null)}
                className="text-black/40 hover:text-black p-1 rounded-lg hover:bg-[#F0EEEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isPaidSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">Payment Successful!</h4>
                <p className="text-xs text-black/70">
                  ₹{activePaymentStaff.monthlySalary.toLocaleString()} transferred to {activePaymentStaff.name} ({activePaymentStaff.upiId}).
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Payment receipt automatically logged in NISA Household Memory.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs text-black/70">
                <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-black/5 text-center space-y-2">
                  <p className="text-black/50">Paying Beneficiary:</p>
                  <p className="text-base font-bold text-[#1A1A1A]">{activePaymentStaff.name} ({activePaymentStaff.role})</p>
                  
                  {/* Simulated QR Visual */}
                  <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center border border-black/10 shadow-xs">
                    <div className="w-full h-full border border-dashed border-black/30 rounded-xl flex flex-col items-center justify-center text-black">
                      <QrCode className="w-16 h-16 text-[#1A1A1A] mb-1" />
                      <span className="text-[9px] font-mono font-bold text-[#FF6B35]">BHIM • UPI</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 pt-1">
                    <p className="font-mono text-xs text-[#1A1A1A] font-semibold">{activePaymentStaff.upiId}</p>
                    <button
                      onClick={() => handleCopyUpi(activePaymentStaff.upiId)}
                      className="text-[10px] text-black/50 hover:text-black flex items-center space-x-1 bg-white px-2 py-0.5 rounded-full border border-black/10"
                    >
                      {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#F9F8F6] p-3.5 rounded-2xl border border-black/5 flex items-center justify-between">
                  <span className="text-black/50 font-medium">Salary Amount:</span>
                  <span className="text-lg font-bold text-[#1A1A1A]">₹{activePaymentStaff.monthlySalary.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleConfirmUPIPayment}
                  className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold py-3 rounded-full text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" />
                  <span>Simulate Instant UPI Settlement</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add New Service Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateContact} className="bg-white border border-black/10 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fadeIn space-y-4 text-[#2D2D2D]">
            <div className="flex items-center justify-between pb-3 border-b border-black/5">
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">Add Trusted Home Service</h3>
              <button
                type="button"
                onClick={() => setShowAddContactModal(false)}
                className="text-black/40 hover:text-black p-1 rounded-lg hover:bg-[#F0EEEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Provider Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh AC Tech, Naveen Plumber"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Category</label>
                <select
                  value={newContactType}
                  onChange={(e) => setNewContactType(e.target.value as any)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="AC Technician">AC Technician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Appliance Tech">Appliance Tech</option>
                  <option value="Doctor">Doctor / Pediatrician</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 12345"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Notes / Pricing Context</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Charges ₹300 visit fee. Very reliable on weekends."
                  value={newContactNotes}
                  onChange={(e) => setNewContactNotes(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddContactModal(false)}
                className="bg-[#F0EEEA] hover:bg-[#E8E5DF] text-black/70 font-semibold text-xs px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs px-5 py-2 rounded-full transition-colors"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
