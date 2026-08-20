import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Zap, 
  Flame, 
  Wifi, 
  Building, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Receipt, 
  AlertTriangle,
  QrCode,
  Users
} from 'lucide-react';
import { NexusUtilityBill, HelpStaff } from '../types';

interface NexusPayHubProps {
  bills: NexusUtilityBill[];
  staff: HelpStaff[];
  onPayBill: (billId: string) => void;
  onPayStaff: (staff: HelpStaff) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
}

export const NexusPayHub: React.FC<NexusPayHubProps> = ({
  bills,
  staff,
  onPayBill,
  onPayStaff,
  onOpenChatWithPrompt
}) => {
  const [selectedPayment, setSelectedPayment] = useState<{
    title: string;
    amount: number;
    recipient: string;
    type: 'bill' | 'staff';
    id: string;
  } | null>(null);

  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'bills' | 'staff'>('all');

  const unpaidBills = bills.filter(b => !b.isPaid);
  const dueStaff = staff.filter(s => s.isDue);

  const totalBillsDue = unpaidBills.reduce((sum, b) => sum + b.amount, 0);
  const totalStaffDue = dueStaff.reduce((sum, s) => sum + s.monthlySalary, 0);
  const grandTotalDue = totalBillsDue + totalStaffDue;

  const handleConfirmPay = () => {
    if (!selectedPayment) return;

    if (selectedPayment.type === 'bill') {
      onPayBill(selectedPayment.id);
    } else {
      const targetStaff = staff.find(s => s.id === selectedPayment.id);
      if (targetStaff) onPayStaff(targetStaff);
    }

    setPaymentSuccess(`Successfully paid ₹${selectedPayment.amount.toLocaleString('en-IN')} to ${selectedPayment.recipient}!`);
    setSelectedPayment(null);
    setTimeout(() => setPaymentSuccess(null), 4000);
  };

  const getBillIcon = (category: NexusUtilityBill['category']) => {
    switch (category) {
      case 'electricity': return Zap;
      case 'gas': return Flame;
      case 'internet': return Wifi;
      case 'maintenance': return Building;
      default: return DollarSign;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#2D2D2D]">
      {/* Top Banner: Nexus Pay & Financial Wallet */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-3">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>NEXUS Pay & Financial Hub</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Household Utility Bills & UPI Payroll
            </h1>
            <p className="mt-2 text-black/60 text-sm md:text-base leading-relaxed">
              Consolidated settlement dashboard for electricity, piped gas, society dues, and instant domestic staff payroll transfers.
            </p>
          </div>

          {/* Dues Summary Badge */}
          <div className="bg-[#FEF9F3] p-5 rounded-3xl border border-orange-200 shrink-0 text-right min-w-[200px]">
            <div className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider">Total Pending Dues</div>
            <div className="text-3xl font-black text-[#1A1A1A] mt-1">₹{grandTotalDue.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-black/50 mt-1 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{unpaidBills.length} Bills • {dueStaff.length} Salaries</span>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {paymentSuccess && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{paymentSuccess}</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-black/5 pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-black/60 hover:bg-[#F0EEEA]'
          }`}
        >
          All Items ({bills.length + staff.length})
        </button>

        <button
          onClick={() => setFilterType('bills')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'bills'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-black/60 hover:bg-[#F0EEEA]'
          }`}
        >
          Utility Bills ({bills.length})
        </button>

        <button
          onClick={() => setFilterType('staff')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'staff'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'bg-white text-black/60 hover:bg-[#F0EEEA]'
          }`}
        >
          Domestic Staff Salaries ({staff.length})
        </button>
      </div>

      {/* Grid: Bills and Staff Payments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Section 1: Utility Bills */}
        {(filterType === 'all' || filterType === 'bills') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF6B35]" />
                <span>Monthly Utility Invoices</span>
              </h2>
              <span className="text-xs text-black/40 font-semibold">₹{totalBillsDue.toLocaleString('en-IN')} Due</span>
            </div>

            <div className="space-y-3">
              {bills.map(bill => {
                const Icon = getBillIcon(bill.category);

                return (
                  <div
                    key={bill.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      bill.isPaid 
                        ? 'bg-[#FAFAFA] border-black/5 opacity-70' 
                        : 'bg-white border-black/10 hover:border-black/20 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          bill.isPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-[#FF6B35]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1A1A1A]">{bill.title}</h4>
                          <p className="text-[11px] text-black/50">{bill.provider} • Acc: {bill.accountNo}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-sm text-[#1A1A1A]">₹{bill.amount.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-black/50">Due {bill.dueDate}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-[10px]">
                        {bill.isPaid ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Paid & Settled</span>
                          </span>
                        ) : (
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Payment Pending</span>
                          </span>
                        )}
                      </div>

                      {!bill.isPaid ? (
                        <button
                          onClick={() => setSelectedPayment({
                            title: bill.title,
                            amount: bill.amount,
                            recipient: bill.provider,
                            type: 'bill',
                            id: bill.id
                          })}
                          className="bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                          Pay Bill
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Receipt #${bill.accountNo}\nAmount: ₹${bill.amount}\nStatus: Settled via Nexus Pay`)}
                          className="text-[11px] font-semibold text-black/60 hover:text-black flex items-center gap-1 cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Domestic Help Salaries */}
        {(filterType === 'all' || filterType === 'staff') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Domestic Staff UPI Payroll</span>
              </h2>
              <span className="text-xs text-black/40 font-semibold">₹{totalStaffDue.toLocaleString('en-IN')} Due 1st</span>
            </div>

            <div className="space-y-3">
              {staff.map(member => (
                <div
                  key={member.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    !member.isDue 
                      ? 'bg-[#FAFAFA] border-black/5 opacity-70' 
                      : 'bg-white border-orange-200 ring-1 ring-orange-100 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-sm text-[#1A1A1A]">{member.name}</h4>
                        {member.isDue && (
                          <span className="bg-rose-50 text-rose-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-rose-200">
                            Due 1st
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-black/50 font-medium">{member.role}</p>
                      <p className="text-[10px] font-mono text-black/40 mt-0.5">UPI: {member.upiId}</p>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-sm text-[#1A1A1A]">₹{member.monthlySalary.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-black/40">{member.lastPaidDate}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[10px] text-black/50">Phone: {member.phone}</span>

                    {member.isDue ? (
                      <button
                        onClick={() => setSelectedPayment({
                          title: `Monthly Salary - ${member.role}`,
                          amount: member.monthlySalary,
                          recipient: `${member.name} (${member.upiId})`,
                          type: 'staff',
                          id: member.id
                        })}
                        className="bg-[#FF6B35] hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Pay via UPI</span>
                      </button>
                    ) : (
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Paid for this month</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Payment Confirmation Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-black/10 max-w-md w-full p-6 shadow-2xl animate-fadeIn text-[#2D2D2D]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                  ₹
                </div>
                <span className="font-bold text-sm text-[#1A1A1A]">NEXUS UPI Gateway</span>
              </div>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-black/40 hover:text-black font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#F9F8F6] rounded-2xl mb-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-black/50">Item:</span>
                <span className="font-bold text-[#1A1A1A]">{selectedPayment.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-black/50">Recipient:</span>
                <span className="font-semibold text-[#1A1A1A]">{selectedPayment.recipient}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-black/5">
                <span className="font-bold text-[#1A1A1A]">Amount to Settle:</span>
                <span className="font-black text-lg text-[#FF6B35]">₹{selectedPayment.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-5 text-[11px] text-black/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant direct settlement via linked UPI Auto-Vault</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-1/2 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-black/70 hover:bg-black/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPay}
                className="w-1/2 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Authorize & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
