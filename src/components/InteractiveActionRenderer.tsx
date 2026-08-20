import React from 'react';
import { 
  Lightbulb, 
  Power, 
  ShoppingCart, 
  Receipt, 
  Shirt, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Utensils, 
  DollarSign, 
  Calendar, 
  Wrench, 
  Phone,
  Flame,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface InteractiveActionRendererProps {
  text: string;
  onExecuteAction: (label: string, url?: string) => void;
  executedActions?: Record<string, boolean>;
}

export const InteractiveActionRenderer: React.FC<InteractiveActionRendererProps> = ({
  text,
  onExecuteAction,
  executedActions = {}
}) => {
  // Regex to match [Button: ...] or [Link: ...] or Markdown [Label](url)
  // Matches:
  // 1. [Button: <Label>] or [Button: <Label> | <Extra>]
  // 2. [Link: <Label> | <URL>] or [Link: <URL>]
  // 3. [Label](http...)
  const actionRegex = /(\[Button:\s*([^\]]+)\]|\[Link:\s*([^\]]+)\]|\[([^\]]+)\]\((https?:\/\/[^\)]+)\))/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const getActionIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('light') || l.includes('lamp') || l.includes('switch') || l.includes('power')) {
      return <Power className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (l.includes('bill') || l.includes('electricity') || l.includes('bescom') || l.includes('pay') || l.includes('salary') || l.includes('₹') || l.includes('upi')) {
      return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
    }
    if (l.includes('grocer') || l.includes('cart') || l.includes('buy') || l.includes('order') || l.includes('atta') || l.includes('surf') || l.includes('pantry') || l.includes('restock')) {
      return <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />;
    }
    if (l.includes('laundry') || l.includes('wash') || l.includes('cloth')) {
      return <Shirt className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (l.includes('recipe') || l.includes('cook') || l.includes('food') || l.includes('dinner') || l.includes('meal') || l.includes('paneer')) {
      return <Utensils className="w-3.5 h-3.5 text-emerald-600" />;
    }
    if (l.includes('diwali') || l.includes('festival') || l.includes('celebrat') || l.includes('pooja')) {
      return <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />;
    }
    if (l.includes('clean') || l.includes('service') || l.includes('plumber') || l.includes('electrician') || l.includes('tech') || l.includes('urban')) {
      return <Wrench className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (l.includes('call') || l.includes('phone') || l.includes('contact')) {
      return <Phone className="w-3.5 h-3.5 text-emerald-600" />;
    }
    return <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />;
  };

  let tokenIndex = 0;

  while ((match = actionRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = actionRegex.lastIndex;

    // Push preceding text if any
    if (matchStart > lastIndex) {
      const plainText = text.substring(lastIndex, matchStart);
      parts.push(
        <span key={`text-${tokenIndex++}`} className="whitespace-pre-wrap">
          {plainText}
        </span>
      );
    }

    const fullMatch = match[0];

    // Check if it's a [Button: ...]
    if (fullMatch.startsWith('[Button:') || fullMatch.startsWith('[button:')) {
      const rawContent = match[2] || fullMatch.replace(/^\[Button:\s*/i, '').replace(/\]$/, '');
      const [label, extra] = rawContent.split('|').map(s => s.trim());
      const isExecuted = executedActions[label] || false;

      parts.push(
        <span key={`btn-${tokenIndex++}`} className="inline-block my-1 mx-1 align-middle">
          <button
            type="button"
            onClick={() => onExecuteAction(label, extra)}
            className={`group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer border ${
              isExecuted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium'
                : 'bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border-black/15 hover:border-black shadow-xs hover:shadow-md active:scale-95'
            }`}
          >
            {isExecuted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <span className="shrink-0 group-hover:rotate-6 transition-transform">
                {getActionIcon(label)}
              </span>
            )}
            <span className="font-semibold tracking-tight">{label}</span>
            {isExecuted && <span className="text-[10px] text-emerald-600 ml-0.5 font-bold uppercase">(Done)</span>}
          </button>
        </span>
      );
    }
    // Check if it's a [Link: ...]
    else if (fullMatch.startsWith('[Link:') || fullMatch.startsWith('[link:')) {
      const rawContent = match[3] || fullMatch.replace(/^\[Link:\s*/i, '').replace(/\]$/, '');
      let label = rawContent;
      let url = rawContent;
      if (rawContent.includes('|')) {
        const partsSplit = rawContent.split('|').map(s => s.trim());
        label = partsSplit[0];
        url = partsSplit[1];
      } else if (rawContent.startsWith('http')) {
        label = `Open Service Link`;
        url = rawContent;
      }

      parts.push(
        <span key={`link-${tokenIndex++}`} className="inline-block my-1 mx-1 align-middle">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              // Also allow internal handler tracking
              onExecuteAction(label, url);
            }}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FEF9F3] hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white border border-orange-200 hover:border-[#FF6B35] transition-all duration-200 shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FF6B35] group-hover:text-white shrink-0" />
            <span>{label}</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        </span>
      );
    }
    // Markdown [Label](url)
    else if (match[4] && match[5]) {
      const label = match[4];
      const url = match[5];

      parts.push(
        <span key={`mdlink-${tokenIndex++}`} className="inline-block my-1 mx-1 align-middle">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onExecuteAction(label, url)}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#F0EEEA] hover:bg-black hover:text-white text-black/80 border border-black/10 transition-all duration-200 shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-black/60 group-hover:text-white shrink-0" />
            <span>{label}</span>
          </a>
        </span>
      );
    }

    lastIndex = matchEnd;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${tokenIndex++}`} className="whitespace-pre-wrap">
        {text.substring(lastIndex)}
      </span>
    );
  }

  return <div className="leading-relaxed text-sm">{parts}</div>;
};
