import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Receipt, 
  Zap, 
  Shirt, 
  ShoppingCart, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type TaskModalType = 'electricity_bill' | 'laundry_pickup' | 'cleaning_booking' | 'action_success';

interface TaskActionModalProps {
  type: TaskModalType;
  title: string;
  data?: any;
  onClose: () => void;
  onConfirm: (payload?: any) => void;
}

export const TaskActionModal: React.FC<TaskActionModalProps> = ({
  type,
  title,
  data,
  onClose,
  onConfirm
}) => {
  const [laundrySlot, setLaundrySlot] = useState('Tomorrow, 10:00 AM - 12:00 PM');
  const [laundryType, setLaundryType] = useState('Wash & Iron (15 Clothes)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        onConfirm();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-black/10 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fadeIn text-[#2D2D2D]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/5">
          <div className="flex items-center space-x-2">
            {type === 'electricity_bill' && (
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            )}
            {type === 'laundry_pickup' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Shirt className="w-4 h-4" />
              </div>
            )}
            {type === 'cleaning_booking' && (
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">{title}</h3>
              <p className="text-[11px] text-black/50">NISA Household Task Executor</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-black/40 hover:text-black p-1.5 rounded-lg hover:bg-[#F0EEEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="py-4 space-y-4 text-xs">
          {type === 'electricity_bill' && (
            <div className="space-y-3">
              <div className="bg-[#FEF9F3] border border-orange-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Provider / Board:</span>
                  <span className="font-bold text-[#1A1A1A]">BESCOM Bengaluru (Consumer #849204)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Billing Cycle:</span>
                  <span className="font-medium text-[#1A1A1A]">August 2026</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Due Date:</span>
                  <span className="font-bold text-rose-600">22 August 2026 (In 6 Days)</span>
                </div>
                <div className="pt-2 border-t border-orange-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1A1A1A]">Total Amount Due:</span>
                  <span className="text-base font-bold text-[#FF6B35]">₹1,420.00</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-black/60 bg-[#F9F8F6] p-3 rounded-xl border border-black/5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant settlement with automated BBPS payment confirmation receipt.</span>
              </div>
            </div>
          )}

          {type === 'laundry_pickup' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Service Type</label>
                <select
                  value={laundryType}
                  onChange={(e) => setLaundryType(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="Wash & Iron (15 Clothes)">Wash & Iron (15 Clothes) - ₹450</option>
                  <option value="Dry Cleaning (Festive Kurtas & Sarees)">Dry Cleaning (Festive Kurtas & Sarees) - ₹850</option>
                  <option value="Bed Linen & Curtain Wash">Bed Linen & Curtain Deep Wash - ₹600</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1A1A1A] font-semibold mb-1">Preferred Pickup Window</label>
                <select
                  value={laundrySlot}
                  onChange={(e) => setLaundrySlot(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-black/10 rounded-xl px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="Tomorrow, 10:00 AM - 12:00 PM">Tomorrow, 10:00 AM - 12:00 PM</option>
                  <option value="Tomorrow, 4:00 PM - 6:00 PM">Tomorrow, 4:00 PM - 6:00 PM</option>
                  <option value="Sunday Morning, 9:00 AM - 11:00 AM">Sunday Morning, 9:00 AM - 11:00 AM</option>
                </select>
              </div>

              <div className="bg-[#F0EEEA] p-3 rounded-2xl text-[11px] text-black/70 flex items-center justify-between">
                <span>Pickup Address:</span>
                <span className="font-semibold text-[#1A1A1A]">12th Main, Indiranagar, BLR</span>
              </div>
            </div>
          )}

          {type === 'cleaning_booking' && (
            <div className="space-y-3">
              <div className="bg-[#FEF9F3] border border-orange-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Service Provider:</span>
                  <span className="font-bold text-[#1A1A1A]">Urban Company Premium</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Scope:</span>
                  <span className="font-medium text-[#1A1A1A]">Full Sofa, Carpet & Kitchen Deep Cleaning</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-black/60">Pre-Diwali Discount:</span>
                  <span className="font-bold text-emerald-600">20% Off Applied</span>
                </div>
                <div className="pt-2 border-t border-orange-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1A1A1A]">Estimated Total:</span>
                  <span className="text-base font-bold text-[#FF6B35]">₹2,199.00</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-black/5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F0EEEA] hover:bg-[#E8E5DF] text-black/70 font-semibold text-xs px-4 py-2.5 rounded-full transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isProcessing || isDone}
            onClick={handleExecute}
            className={`font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center space-x-1.5 ${
              isDone
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1A1A1A] hover:bg-black text-white'
            }`}
          >
            {isProcessing ? (
              <span>Executing...</span>
            ) : isDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Confirmed!</span>
              </>
            ) : (
              <>
                <span>{type === 'electricity_bill' ? 'Pay ₹1,420 Now' : type === 'laundry_pickup' ? 'Confirm Pickup' : 'Book Appointment'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
