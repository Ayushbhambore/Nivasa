import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  CheckCircle2, 
  ShoppingCart, 
  Utensils, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  BrainCircuit,
  Loader2,
  Trash2,
  RefreshCw,
  Power,
  Zap,
  Shirt,
  ExternalLink,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChatMessage, HouseholdState, PantryItem, HelpStaff } from '../types';
import { InteractiveActionRenderer } from './InteractiveActionRenderer';
import { TaskActionModal, TaskModalType } from './TaskActionModal';

interface ChatConsoleProps {
  household: HouseholdState;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onClearChat: () => void;
  onPayStaff: (staffName: string, amount: number) => void;
  onAddToCart: (itemName: string) => void;
  onNavigateTab?: (tabId: string) => void;
  onToggleDevice?: (deviceId: string) => void;
}

export const ChatConsole: React.FC<ChatConsoleProps> = ({
  household,
  messages,
  onSendMessage,
  isLoading,
  onClearChat,
  onPayStaff,
  onAddToCart,
  onNavigateTab,
  onToggleDevice
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [executedActions, setExecutedActions] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Task Modal state
  const [activeModal, setActiveModal] = useState<{
    isOpen: boolean;
    type: TaskModalType;
    title: string;
    actionLabel?: string;
  }>({
    isOpen: false,
    type: 'electricity_bill',
    title: 'Pay Electricity Bill'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser environment.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove button syntax before speaking
      const cleanText = text.replace(/\[Button:\s*([^\]]+)\]/gi, '$1').replace(/\[Link:\s*([^\]]+)\]/gi, '$1');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    onSendMessage(msg);
  };

  // Central Interactive Action Execution Handler
  const handleExecuteAction = (label: string, url?: string) => {
    const l = label.toLowerCase();
    
    // Mark as executed in local state
    setExecutedActions((prev) => ({ ...prev, [label]: true }));

    // 1. Smart Devices: Lights / AC / Geyser
    if (l.includes('light') || l.includes('lamp')) {
      if (onToggleDevice) {
        onToggleDevice('dev-1');
      }
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      showToast(`✓ Smart Action Executed: ${label}`);
      return;
    }

    // 2. Electricity Bill Payment
    if (l.includes('electricity') || (l.includes('bill') && !l.includes('grocery'))) {
      setActiveModal({
        isOpen: true,
        type: 'electricity_bill',
        title: 'Pay BESCOM Electricity Bill',
        actionLabel: label
      });
      return;
    }

    // 3. Laundry Pickup
    if (l.includes('laundry') || l.includes('iron') || l.includes('dry clean')) {
      setActiveModal({
        isOpen: true,
        type: 'laundry_pickup',
        title: 'Schedule Laundry & Ironing Pickup',
        actionLabel: label
      });
      return;
    }

    // 4. Grocery & Shopping
    if (l.includes('order grocer') || l.includes('restock') || l.includes('add missing') || l.includes('add to cart')) {
      onAddToCart("Surf Excel Matic 2L");
      onAddToCart("Aashirvaad Chakki Atta 10kg");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      showToast(`✓ Order Prepared: Added urgent pantry essentials to smart cart`);
      return;
    }

    if (l.includes('view grocery') || l.includes('check grocer') || l.includes('pantry')) {
      if (onNavigateTab) {
        onNavigateTab('anticipate');
      }
      showToast(`✓ Switched to Smart Pantry & Cart Hub`);
      return;
    }

    // 5. Domestic Staff Salaries
    if (l.includes('sunita') || l.includes('rekha') || l.includes('settle all staff') || l.includes('pay staff')) {
      onPayStaff("Sunita Didi", 6500);
      confetti({ particleCount: 35, spread: 65, origin: { y: 0.7 } });
      showToast(`✓ Staff Salary Payment Initiated: Sunita Didi (₹6,500)`);
      return;
    }

    // 6. Occasion & Diwali
    if (l.includes('diwali') || l.includes('festival') || l.includes('occasion')) {
      if (onNavigateTab) {
        onNavigateTab('celebrate');
      }
      showToast(`✓ Opened Diwali 18-Day Occasion Hub`);
      return;
    }

    // 7. Cleaning & Service Booking
    if (l.includes('clean') || l.includes('urban company')) {
      setActiveModal({
        isOpen: true,
        type: 'cleaning_booking',
        title: 'Book Urban Company Home Deep Cleaning',
        actionLabel: label
      });
      return;
    }

    // 8. Recipe & Meals
    if (l.includes('recipe') || l.includes('dinner') || l.includes('meal')) {
      if (onNavigateTab) {
        onNavigateTab('nourish');
      }
      showToast(`✓ Opened Nourish Meal Planner`);
      return;
    }

    // Fallback: Send message to NISA
    onSendMessage(`Please execute: ${label}`);
    showToast(`✓ Sent request to NISA: ${label}`);
  };

  const quickPrompts = [
    "Here are your options",
    "Turn on lights",
    "Pay electricity bill",
    "Order groceries",
    "Schedule laundry pickup",
    "Book cleaning service"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] bg-white border border-black/10 rounded-3xl overflow-hidden shadow-xl text-[#2D2D2D]">
      
      {/* Toast Notification for Action Feedback */}
      {toastMessage && (
        <div className="bg-[#1A1A1A] text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-lg animate-fadeIn border-b border-black/20">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white text-xs ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Bar with Household Intelligence Ribbon */}
      <div className="bg-[#FAFAFA] px-6 py-3.5 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#FF6B35] font-bold text-base">
            N
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] tracking-tight">NISA AI Household Manager</h2>
              <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Interactive Actions Active
              </span>
            </div>
            <p className="text-[11px] text-black/50">
              4 Members • 8 Pantry Items • Diwali in 18 Days • 3 Help Staff
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-2 rounded-xl text-xs transition-colors border ${
              ttsEnabled 
                ? 'bg-orange-50 border-orange-200 text-[#FF6B35]' 
                : 'bg-white border-black/10 text-black/60 hover:text-black'
            }`}
            title={ttsEnabled ? "Text-to-Speech Enabled" : "Text-to-Speech Disabled"}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onClearChat}
            className="p-2 rounded-xl bg-white hover:bg-[#F0EEEA] border border-black/10 text-black/60 hover:text-black transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Household Tasks Banner / Quick Action Ribbon */}
      <div className="bg-[#FEF9F3] px-6 py-2.5 border-b border-orange-100 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] uppercase font-bold text-[#FF6B35] tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FF6B35]" />
          <span>Quick Actions:</span>
        </span>
        
        <button
          onClick={() => handleExecuteAction("Turn On Lights")}
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white border border-black/10 rounded-full text-xs font-semibold shadow-2xs transition-colors"
        >
          <Power className="w-3 h-3 text-amber-500" />
          <span>Turn On Lights</span>
        </button>

        <button
          onClick={() => handleExecuteAction("Pay Electricity Bill")}
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white border border-black/10 rounded-full text-xs font-semibold shadow-2xs transition-colors"
        >
          <Zap className="w-3 h-3 text-emerald-600" />
          <span>Pay Electricity Bill</span>
        </button>

        <button
          onClick={() => handleExecuteAction("Order Groceries")}
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white border border-black/10 rounded-full text-xs font-semibold shadow-2xs transition-colors"
        >
          <ShoppingCart className="w-3 h-3 text-blue-600" />
          <span>Order Groceries</span>
        </button>

        <button
          onClick={() => handleExecuteAction("Schedule Laundry Pickup")}
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white border border-black/10 rounded-full text-xs font-semibold shadow-2xs transition-colors"
        >
          <Shirt className="w-3 h-3 text-indigo-500" />
          <span>Schedule Laundry Pickup</span>
        </button>

        <a
          href="https://www.urbancompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-orange-50 hover:bg-[#FF6B35] hover:text-white text-[#FF6B35] border border-orange-200 rounded-full text-xs font-semibold shadow-2xs transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>Book Cleaning Service</span>
        </a>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B35] font-bold text-xs flex items-center justify-center shrink-0">
                  N
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#1A1A1A] text-white rounded-tr-none shadow-sm'
                    : 'bg-[#F9F8F6] text-[#2D2D2D] rounded-tl-none border border-black/5'
                }`}>
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <InteractiveActionRenderer
                      text={msg.text}
                      onExecuteAction={handleExecuteAction}
                      executedActions={executedActions}
                    />
                  )}
                  
                  {!isUser && ttsEnabled && (
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      className="mt-2 text-[11px] text-[#FF6B35] font-medium hover:text-orange-700 flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to NISA</span>
                    </button>
                  )}
                </div>

                {/* Interactive Action Card if returned by NISA */}
                {msg.card && msg.card.type !== 'none' && (
                  <div className="bg-[#FEF9F3] border border-orange-200 rounded-2xl p-4 shadow-sm animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {msg.card.type === 'meal' && <Utensils className="w-4 h-4 text-emerald-600" />}
                        {msg.card.type === 'shopping' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                        {msg.card.type === 'occasion' && <Sparkles className="w-4 h-4 text-[#FF6B35]" />}
                        {msg.card.type === 'help_payment' && <DollarSign className="w-4 h-4 text-rose-600" />}
                        <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">
                          {msg.card.title || "NISA Action Item"}
                        </span>
                      </div>
                    </div>

                    {msg.card.description && (
                      <p className="text-xs text-black/70 mb-3">{msg.card.description}</p>
                    )}

                    {msg.card.items && msg.card.items.length > 0 && (
                      <ul className="space-y-1.5 mb-3 text-xs text-black/70">
                        {msg.card.items.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {msg.card.actionButtonLabel && (
                      <button
                        onClick={() => {
                          if (msg.card?.type === 'help_payment') {
                            handleExecuteAction("Pay Sunita Didi");
                          } else if (msg.card?.type === 'shopping') {
                            handleExecuteAction("Order Groceries");
                          } else if (msg.card?.type === 'occasion') {
                            handleExecuteAction("View 4-Stage Diwali Timeline");
                          } else {
                            handleExecuteAction(msg.card.actionButtonLabel);
                          }
                        }}
                        className="w-full bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <span>{msg.card.actionButtonLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
                      </button>
                    )}
                  </div>
                )}

                {/* Extracted Memory Pill */}
                {msg.extractedMemories && msg.extractedMemories.length > 0 && (
                  <div className="flex items-center space-x-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <BrainCircuit className="w-3 h-3 text-emerald-600" />
                    <span>NISA Memory Learned: {msg.extractedMemories.join(', ')}</span>
                  </div>
                )}

                {/* Follow-up suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(sug)}
                        className="text-[11px] bg-white hover:bg-black hover:text-white text-black/70 border border-black/10 px-3 py-1 rounded-full transition-colors flex items-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#FF6B35]" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-3 text-black/60 text-xs animate-pulse">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center font-bold text-xs">
              N
            </div>
            <div className="bg-[#F3F2EF] border border-black/5 rounded-2xl rounded-tl-none px-4 py-3">
              <span className="flex items-center space-x-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF6B35]" />
                <span>NISA is analyzing household state & actions...</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Fast Prompts Drawer */}
      <div className="bg-[#FAFAFA] px-6 py-2.5 border-t border-black/5 overflow-x-auto flex items-center space-x-2 text-xs">
        <span className="text-[10px] text-black/40 font-bold uppercase tracking-wider shrink-0">
          Suggested Queries:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(prompt)}
            className="shrink-0 text-[10px] bg-white border border-black/10 px-3 py-1.5 rounded-full hover:bg-black hover:text-white cursor-pointer transition-colors shadow-2xs whitespace-nowrap font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-black/5 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleListen}
          className={`p-3 rounded-2xl border transition-all ${
            isListening 
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
              : 'bg-[#F0EEEA] text-black/60 hover:text-black border-black/5'
          }`}
          title={isListening ? "Listening... click to stop" : "Speak to NISA"}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            id="chat-input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening to your voice..." : "Ask NISA for household tasks or options..."}
            className="w-full pl-5 pr-12 py-3.5 bg-white border border-black/10 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B35] shadow-inner text-[#2D2D2D]"
          />
          <button
            type="submit"
            id="send-message-btn"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 w-8 h-8 bg-black hover:bg-black/80 disabled:opacity-30 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Task Action Modal */}
      {activeModal.isOpen && (
        <TaskActionModal
          type={activeModal.type}
          title={activeModal.title}
          onClose={() => setActiveModal(prev => ({ ...prev, isOpen: false }))}
          onConfirm={() => {
            setActiveModal(prev => ({ ...prev, isOpen: false }));
            if (activeModal.actionLabel) {
              setExecutedActions(prev => ({ ...prev, [activeModal.actionLabel!]: true }));
            }
            showToast(`✓ Completed: ${activeModal.title}`);
          }}
        />
      )}

    </div>
  );
};
