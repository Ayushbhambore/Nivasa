import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHub } from './components/HomeHub';
import { ChatConsole } from './components/ChatConsole';
import { NourishHub } from './components/NourishHub';
import { AnticipateHub } from './components/AnticipateHub';
import { CelebrateHub } from './components/CelebrateHub';
import { ManageHub } from './components/ManageHub';
import { MemoryHub } from './components/MemoryHub';
import { NexusSmartHub } from './components/NexusSmartHub';
import { NexusPayHub } from './components/NexusPayHub';
import { NexusGateHub } from './components/NexusGateHub';
import { initialHouseholdState } from './data/defaultHousehold';
import { HouseholdState, ChatMessage, PantryItem, HelpStaff, ServiceContact, MemoryFact, ShoppingItem, SmartDevice, NexusUtilityBill, NexusGatePass } from './types';
import { MessageSquareHeart, Sparkles } from 'lucide-react';

export default function App() {
  const [household, setHousehold] = useState<HouseholdState>(initialHouseholdState);
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'nisa',
      text: "Namaste Ayush! I am NISA, your AI household manager for The Sharma Family.\n\nHere are your recommended options today:\n[Button: Turn On Lights]\n[Button: Pay Electricity Bill]\n[Button: Order Groceries]\n[Button: Schedule Laundry Pickup]\n[Link: Book Cleaning Service | https://www.urbancompany.com]",
      timestamp: 'Just now',
      suggestions: [
        "Turn on lights",
        "Check groceries",
        "Pay electricity bill",
        "Schedule laundry pickup"
      ],
      card: {
        type: 'meal',
        title: "Tonight's Recommended Dinner",
        description: "Zero Food Waste: Palak Paneer & Soft Phulkas",
        items: ["Fresh Spinach (in crisper)", "Fresh Paneer (400g pack)", "Aashirvaad Atta", "Low sodium portion for Dadi"],
        actionButtonLabel: "View Step-by-Step Cooking Guide"
      },
      extractedMemories: ["4 Household Members", "Sunita Didi Payroll tracked", "Diwali 15 Guests"]
    }
  ]);

  // Send message to NISA AI backend
  const handleSendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          householdContext: household,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();

      const nisaMsg: ChatMessage = {
        id: `nisa-${Date.now()}`,
        sender: 'nisa',
        text: data.text || "I've noted that for your household.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || [],
        card: data.card,
        extractedMemories: data.extractedMemories || []
      };

      setMessages((prev) => [...prev, nisaMsg]);

      // If NISA extracted memories, add them to household state
      if (data.extractedMemories && data.extractedMemories.length > 0) {
        setHousehold((prev) => ({
          ...prev,
          memories: [
            {
              id: `mem-${Date.now()}`,
              category: 'preferences',
              key: `Learned Insight`,
              value: data.extractedMemories.join('; '),
              confidence: 0.95,
              updatedAt: 'Just learned in chat'
            },
            ...prev.memories
          ]
        }));
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `nisa-err-${Date.now()}`,
        sender: 'nisa',
        text: "I experienced a slight connection hiccup, but your household records remain completely safe. How else can I assist?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["What should we cook tonight?", "Check urgent pantry restock", "View staff salary dues"]
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setActiveTab('chat');
    handleSendMessage(prompt);
  };

  // Staff Payment
  const handlePayStaff = (staff: HelpStaff | string) => {
    const staffId = typeof staff === 'string' ? staff : staff.id;
    setHousehold((prev) => ({
      ...prev,
      helpStaff: prev.helpStaff.map((h) => 
        h.id === staffId || h.name === staffId
          ? { ...h, isDue: false, lastPaidDate: 'Paid today via UPI' }
          : h
      )
    }));
  };

  // Cart Operations
  const handleAddItemToCart = (item: Partial<ShoppingItem>) => {
    setHousehold((prev) => ({
      ...prev,
      shoppingList: [
        {
          id: item.id || `s-${Date.now()}`,
          name: item.name || 'New Item',
          category: item.category || 'General',
          quantity: item.quantity || '1 unit',
          urgency: item.urgency || 'regular',
          brandSuggestion: item.brandSuggestion,
          estimatedPrice: item.estimatedPrice || 200,
          checked: false,
          notes: item.notes
        },
        ...prev.shoppingList
      ]
    }));
  };

  const handleAddPantryToCart = (item: PantryItem) => {
    handleAddItemToCart({
      name: item.name,
      category: item.category,
      quantity: "1 refill pack",
      urgency: 'urgent',
      brandSuggestion: item.preferredBrand,
      estimatedPrice: item.unitPrice || 350
    });
  };

  const handleToggleCartItem = (id: string) => {
    setHousehold((prev) => ({
      ...prev,
      shoppingList: prev.shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleDeleteCartItem = (id: string) => {
    setHousehold((prev) => ({
      ...prev,
      shoppingList: prev.shoppingList.filter((item) => item.id !== id)
    }));
  };

  // Festival Checklist Toggle
  const handleToggleChecklistItem = (occasionId: string, phaseIndex: number, itemId: string) => {
    setHousehold((prev) => ({
      ...prev,
      occasions: prev.occasions.map((occ) => {
        if (occ.id !== occasionId) return occ;
        const newPhases = [...occ.checklistPhases];
        const phase = newPhases[phaseIndex];
        if (phase) {
          phase.items = phase.items.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          );
        }
        return { ...occ, checklistPhases: newPhases };
      })
    }));
  };

  // Add Service Contact
  const handleAddServiceContact = (contact: Partial<ServiceContact>) => {
    setHousehold((prev) => ({
      ...prev,
      serviceContacts: [
        {
          id: contact.id || `sc-${Date.now()}`,
          name: contact.name || 'New Contact',
          serviceType: contact.serviceType || 'Plumber',
          phone: contact.phone || '',
          rating: contact.rating || 5.0,
          notes: contact.notes || '',
          lastUsedDate: contact.lastUsedDate || 'Recently added'
        },
        ...prev.serviceContacts
      ]
    }));
  };

  // Memory Operations
  const handleAddMemory = (mem: Partial<MemoryFact>) => {
    setHousehold((prev) => ({
      ...prev,
      memories: [
        {
          id: mem.id || `mem-${Date.now()}`,
          category: mem.category || 'preferences',
          key: mem.key || 'Custom Household Note',
          value: mem.value || '',
          confidence: mem.confidence || 0.95,
          updatedAt: 'Added just now'
        },
        ...prev.memories
      ]
    }));
  };

  const handleDeleteMemory = (id: string) => {
    setHousehold((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id)
    }));
  };

  const handleToggleDevice = (deviceId: string) => {
    setHousehold((prev) => ({
      ...prev,
      devices: (prev.devices || []).map((dev) =>
        dev.id === deviceId
          ? {
              ...dev,
              isOn: !dev.isOn,
              statusText: !dev.isOn ? 'Switched ON (Active)' : 'Switched OFF'
            }
          : dev
      )
    }));
  };

  const handleUpdateDeviceBrightness = (deviceId: string, brightness: number) => {
    setHousehold((prev) => ({
      ...prev,
      devices: (prev.devices || []).map((dev) =>
        dev.id === deviceId
          ? { ...dev, brightness, statusText: `Warm White (${brightness}% Brightness)` }
          : dev
      )
    }));
  };

  const handleUpdateDeviceTemp = (deviceId: string, delta: number) => {
    setHousehold((prev) => ({
      ...prev,
      devices: (prev.devices || []).map((dev) => {
        if (dev.id !== deviceId) return dev;
        const currentT = dev.temperature || 24;
        const newT = Math.min(28, Math.max(18, currentT + delta));
        return { ...dev, temperature: newT, statusText: `Set to ${newT}°C (Eco Mode)` };
      })
    }));
  };

  const handleApplyScene = (sceneName: string) => {
    setHousehold((prev) => {
      let updated = [...(prev.devices || [])];
      if (sceneName === 'morning') {
        updated = updated.map((d) => {
          if (d.type === 'geyser' || d.type === 'purifier') return { ...d, isOn: true, statusText: 'Active' };
          if (d.id === 'dev-1') return { ...d, isOn: true, brightness: 80, statusText: 'Warm White (80% Brightness)' };
          if (d.type === 'ac') return { ...d, isOn: false, statusText: 'Off' };
          return d;
        });
      } else if (sceneName === 'evening') {
        updated = updated.map((d) => {
          if (d.type === 'light') return { ...d, isOn: true, brightness: 50, statusText: 'Warm Relax (50%)' };
          if (d.type === 'ac') return { ...d, isOn: true, temperature: 24, statusText: 'Set to 24°C (Eco Mode)' };
          return d;
        });
      } else if (sceneName === 'all_on') {
        updated = updated.map((d) => ({
          ...d,
          isOn: true,
          brightness: d.type === 'light' ? 100 : d.brightness,
          statusText: 'Active'
        }));
      } else if (sceneName === 'away') {
        updated = updated.map((d) => {
          if (d.type === 'lock') return { ...d, isOn: true, statusText: 'Armed & Locked' };
          return { ...d, isOn: false, statusText: 'Switched OFF' };
        });
      }
      return { ...prev, devices: updated };
    });
  };

  const handlePayBill = (billId: string) => {
    setHousehold((prev) => ({
      ...prev,
      bills: (prev.bills || []).map((b) =>
        b.id === billId ? { ...b, isPaid: true } : b
      )
    }));
  };

  const handleCreateGatePass = (newPass: NexusGatePass) => {
    setHousehold((prev) => ({
      ...prev,
      gatePasses: [newPass, ...(prev.gatePasses || [])]
    }));
  };

  const urgentPantryCount = household.pantry.filter((p) => p.status === 'buy_now').length;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D2D2D] font-sans selection:bg-[#FF6B35] selection:text-white flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        householdName={household.householdName}
        city={household.city}
        urgentCount={urgentPantryCount}
        onOpenChatWithPrompt={handleOpenChatWithPrompt}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'hub' && (
          <HomeHub
            household={household}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
            onNavigateTab={setActiveTab}
            onPayStaff={handlePayStaff}
            onAddPantryToCart={handleAddPantryToCart}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'chat' && (
          <ChatConsole
            household={household}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClearChat={() => {
              setMessages([
                {
                  id: `nisa-reset-${Date.now()}`,
                  sender: 'nisa',
                  text: "Namaste! I'm ready for your household tasks.\n\nHere are your options:\n[Button: Turn On Lights]\n[Button: Pay Electricity Bill]\n[Button: Order Groceries]\n[Button: Schedule Laundry Pickup]\n[Link: Book Cleaning Service | https://www.urbancompany.com]",
                  timestamp: 'Just now',
                  suggestions: [
                    "Turn on lights",
                    "Check groceries",
                    "Pay electricity bill",
                    "Schedule laundry pickup"
                  ]
                }
              ]);
            }}
            onPayStaff={(name) => handlePayStaff(name)}
            onAddToCart={(name) => handleAddItemToCart({ name, urgency: 'urgent', estimatedPrice: 430 })}
            onNavigateTab={setActiveTab}
            onToggleDevice={handleToggleDevice}
          />
        )}

        {activeTab === 'nourish' && (
          <NourishHub
            household={household}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'anticipate' && (
          <AnticipateHub
            household={household}
            onAddItemToCart={handleAddItemToCart}
            onToggleCartItem={handleToggleCartItem}
            onDeleteCartItem={handleDeleteCartItem}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'nexus-iot' && (
          <NexusSmartHub
            devices={household.devices || []}
            onToggleDevice={handleToggleDevice}
            onUpdateDeviceBrightness={handleUpdateDeviceBrightness}
            onUpdateDeviceTemp={handleUpdateDeviceTemp}
            onApplyScene={handleApplyScene}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'nexus-pay' && (
          <NexusPayHub
            bills={household.bills || []}
            staff={household.helpStaff || []}
            onPayBill={handlePayBill}
            onPayStaff={handlePayStaff}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'nexus-gate' && (
          <NexusGateHub
            gatePasses={household.gatePasses || []}
            onCreatePass={handleCreateGatePass}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'celebrate' && (
          <CelebrateHub
            household={household}
            onToggleChecklistItem={handleToggleChecklistItem}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'manage' && (
          <ManageHub
            household={household}
            onPayStaff={handlePayStaff}
            onAddServiceContact={handleAddServiceContact}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryHub
            household={household}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}
      </main>

      {/* Persistent Floating Quick Chat FAB if not on chat tab */}
      {activeTab !== 'chat' && (
        <button
          id="floating-chat-fab"
          onClick={() => setActiveTab('chat')}
          className="fixed bottom-6 right-6 z-40 bg-[#1A1A1A] hover:bg-black text-white p-4 rounded-2xl shadow-xl flex items-center space-x-2.5 transition-all transform hover:scale-105 border border-black/10"
        >
          <div className="relative">
            <MessageSquareHeart className="w-5 h-5 text-[#FF6B35]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide">Ask NISA</span>
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-black/5 py-6 text-center text-xs text-black/50 bg-[#F0EEEA]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium text-[#1A1A1A]">
            NIVASA • <span className="text-black/50 font-normal">"Don't just manage products. Understand the home."</span>
          </p>
          <p className="text-[11px] text-black/40">
            South Asia-First Household Intelligence Platform • Powered by NISA AI
          </p>
        </div>
      </footer>
    </div>
  );
}
