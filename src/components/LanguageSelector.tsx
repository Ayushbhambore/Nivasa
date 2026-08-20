import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, Search, ChevronDown, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES, Language } from '../i18n/languages';

interface LanguageSelectorProps {
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
          isOpen
            ? 'bg-[#1A1A1A] text-white border-black shadow-sm'
            : 'bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#1A1A1A] border-black/10'
        }`}
        title="Switch Application Language"
      >
        <Globe className={`w-3.5 h-3.5 ${isOpen ? 'text-[#FF6B35]' : 'text-black/60'}`} />
        <div className="flex items-center space-x-1.5">
          <span className="font-medium">{selectedLang.nativeName}</span>
          <span className="text-[10px] opacity-60 hidden sm:inline">({selectedLang.name})</span>
        </div>
        <ChevronDown className={`w-3 h-3 text-black/40 transition-transform ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-black/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn text-[#2D2D2D]">
          
          {/* Header */}
          <div className="p-3 bg-[#FAFAFA] border-b border-black/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1A1A1A]">
                <Globe className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Select Language / भाषा चुनें</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-200">
                17 Languages
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-black/40 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Hindi, Marathi, Tamil..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#FF6B35] text-[#1A1A1A]"
                autoFocus
              />
            </div>
          </div>

          {/* Language Options List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-black/5 p-1">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-xs text-black/40">
                No language found matching "{searchQuery}"
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEF9F3] text-[#FF6B35] font-bold'
                        : 'hover:bg-[#F0EEEA] text-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'bg-[#FF6B35] text-white' : 'bg-black/5 text-black/60'
                      }`}>
                        {lang.code.toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold text-sm">{lang.nativeName}</span>
                          <span className="text-[11px] text-black/50">({lang.name})</span>
                        </div>
                        <p className="text-[10px] text-black/40">{lang.region}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#FF6B35]" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-[#F9F8F6] border-t border-black/5 text-[10px] text-black/50 text-center flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#FF6B35]" />
            <span>South Asian Pan-Indian Linguistic Support</span>
          </div>

        </div>
      )}
    </div>
  );
};
