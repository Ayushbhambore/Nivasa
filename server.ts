import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client with telemetry header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const NISA_SYSTEM_INSTRUCTION = `
You are NISA, the intelligent AI household manager powering NIVASA (Sanskrit for home / dwelling).
Your purpose is to help modern households manage everyday life by understanding the home, anticipating needs, reducing mental load, and turning insights into useful recommendations and actions.

CRITICAL INTERACTIVE REQUIREMENT:
You are an interactive AI household manager.
ALWAYS respond with clear, clickable actions in your preview.
Use buttons or links for tasks instead of plain text.

EXAMPLE FORMAT:
- "Turn on lights" → [Button: Turn On Lights]
- "Check groceries" → [Button: View Grocery List]
- "Book cleaning service" → [Link: https://example.com/cleaning]
- "Pay electricity bill" → [Button: Pay Electricity Bill]
- "Order groceries" → [Button: Order Groceries]
- "Schedule laundry" → [Button: Schedule Laundry Pickup]

When asked for household tasks, ALWAYS structure your recommendations like:
"Here are your options:
[Button: Pay Electricity Bill]
[Button: Order Groceries]
[Button: Schedule Laundry Pickup]
[Link: Book Deep Cleaning | https://www.urbancompany.com]"

Ensure EVERY action, task, recommendation, or external service is presented as a [Button: ...] or [Link: ...] so the user preview is 100% interactive.

Core Household Intelligence Principles:
1. THE HOUSEHOLD IS THE UNIT OF INTELLIGENCE:
   - Optimize for the whole household (parents, children, elders like Dadi, domestic help, visiting relatives).
   - For meals, consider all dietary restrictions (low sodium/soft rotis for Dadi, mild spice for kids, high protein for parents).
   - Solve "Aaj khane mein kya banayein?" proactively.

2. PROACTIVE ANTICIPATION:
   - Anticipate what is running out (e.g. detergent in 3 days, atta in 4 days).
   - Prevent unnecessary over-purchasing ("Oil will last 16 more days").

3. OCCASION & FESTIVAL ENGINE:
   - Think in occasions and life situations (e.g. Diwali 18 days away, 15 guests visiting).

4. DOMESTIC HELP & HOME OPERATIONS:
   - Track domestic staff (Sunita Didi, Rekha, Ramesh Bhai) salaries due on the 1st, and trusted home service contacts.

5. CULTURALLY GROUNDED & PRACTICAL:
   - Warm, respectful, concise tone with South Asian sensibility.

Always respond in a JSON format matching the schema:
{
  "text": "Your warm, natural, concise response with tasks formatted as [Button: Label] and [Link: URL]",
  "suggestions": ["3-4 relevant quick follow-up prompt chips for the user"],
  "card": {
    "type": "meal" | "shopping" | "occasion" | "help_payment" | "pantry" | "insight" | "none",
    "title": "Short title if card present",
    "description": "Short summary",
    "items": ["actionable items or steps"],
    "actionButtonLabel": "Label for direct action (e.g. Add to Grocery List, Confirm UPI Payment, Add to Diwali Prep)"
  },
  "extractedMemories": ["Short bullet points of any new household context learned"]
}
`;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "NIVASA", agent: "NISA" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, householdContext, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback simulated intelligent response if GEMINI_API_KEY is not yet populated
      const lower = (message || "").toLowerCase();
      let fallbackResponse = {
        text: "Namaste! I've checked your home context. Tonight, since you have fresh spinach and paneer expiring soon in the fridge, I recommend Palak Paneer with soft phulkas.\n\nHere are your recommended options:\n[Button: View Dinner Recipe]\n[Button: Order Groceries]\n[Button: Add Missing Spices to Cart]",
        suggestions: [
          "Add missing spices to grocery list",
          "What else is expiring in the fridge?",
          "Check Diwali 18-day checklist",
          "Sunita Didi's payment status"
        ],
        card: {
          type: "meal",
          title: "Tonight's Recommended Dinner",
          description: "Zero Food Waste: Palak Paneer & Phulkas",
          items: ["Fresh Spinach (in crisper)", "Fresh Paneer (400g pack)", "Aashirvaad Atta", "Mild spice for Dadi & Aarav"],
          actionButtonLabel: "Add to Tonight's Cooking Plan"
        },
        extractedMemories: ["User asked about dinner options"]
      };

      if (lower.includes("task") || lower.includes("option") || lower.includes("chore") || lower.includes("todo") || lower.includes("house") || lower.includes("manage")) {
        fallbackResponse = {
          text: "Here are your options:\n[Button: Turn On Lights]\n[Button: Pay Electricity Bill]\n[Button: Order Groceries]\n[Button: Schedule Laundry Pickup]\n[Link: Book Cleaning Service | https://www.urbancompany.com]",
          suggestions: [
            "Turn on living room lights",
            "Check groceries running out",
            "Pay Sunita Didi via UPI",
            "Book home cleaning"
          ],
          card: {
            type: "insight",
            title: "Pending Household Tasks",
            description: "4 critical tasks and 1 service booking recommended today",
            items: ["Pay BESCOM Electricity Bill", "Restock Surf Excel & Atta", "Schedule Laundry Pickup", "Urban Company Sofa Deep Clean"],
            actionButtonLabel: "Execute All Actions"
          },
          extractedMemories: ["Requested household task checklist"]
        };
      } else if (lower.includes("light") || lower.includes("switch") || lower.includes("ac") || lower.includes("fan") || lower.includes("device") || lower.includes("smart")) {
        fallbackResponse = {
          text: "Here are your smart home device controls:\n[Button: Turn On Living Room Lights]\n[Button: Turn Off Balcony Lights]\n[Button: Set AC to 24°C]\n[Button: Turn On Water Geyser]",
          suggestions: [
            "Turn on all lights",
            "Turn off geyser after 15 mins",
            "Check power consumption"
          ],
          card: {
            type: "insight",
            title: "Smart Home Controls",
            description: "Living Room, Bedrooms & Water Heating connected",
            items: ["Living Room Lights (Off)", "Master Bedroom AC (24°C)", "Bathroom Geyser (Standby)"],
            actionButtonLabel: "Toggle Main Lights"
          },
          extractedMemories: ["Smart device control used"]
        };
      } else if (lower.includes("diwali") || lower.includes("festival") || lower.includes("relative") || lower.includes("guest")) {
        fallbackResponse = {
          text: "Diwali is 18 days away, and with 15 guests visiting, we should stagger the prep!\n\nHere are your options:\n[Button: View 4-Stage Diwali Timeline]\n[Button: Order Pooja Samagri & Ghee]\n[Link: Book Urban Company Sofa Cleaning | https://www.urbancompany.com]\n[Button: Plan Dry Fruits Gifting Hampers]",
          suggestions: [
            "View 4-stage Diwali timeline",
            "Generate sweet ingredients list",
            "Book Urban Company sofa cleaning",
            "Check dry fruits gifting budget"
          ],
          card: {
            type: "occasion",
            title: "Diwali 18-Day Prep Hub",
            description: "15 Relatives Visiting | Indiranagar Home",
            items: ["Deep sofa cleaning (Booked)", "Spare bedsheets & linen wash", "Order dry fruit gift boxes", "Restock Desi Ghee & Basmati Rice"],
            actionButtonLabel: "Open Occasion Hub"
          },
          extractedMemories: ["Confirmed Diwali hosting with 15 guests"]
        };
      } else if (lower.includes("detergent") || lower.includes("surf") || lower.includes("grocer") || lower.includes("buy") || lower.includes("shopping") || lower.includes("running out")) {
        fallbackResponse = {
          text: "Your Surf Excel Matic liquid has ~180ml left (approx 3 wash cycles), and Atta has 1.2kg left. Cooking Oil (2.5L) is well stocked for 16 more days.\n\nHere are your options:\n[Button: Order Groceries]\n[Button: View Grocery List]\n[Button: Restock Surf Excel & Atta]\n[Button: Check Pantry Expiry Dates]",
          suggestions: [
            "Add Surf Excel & Atta to Blinkit/Instamart cart",
            "Check personal care supplies",
            "Review monthly grocery spend",
            "What can I cook with current stock?"
          ],
          card: {
            type: "shopping",
            title: "Urgent Replenishment List",
            description: "2 Items Needed | 1 Item Stocked (Do Not Buy)",
            items: ["Surf Excel Matic Liquid (2L Refill) - Urgent", "Aashirvaad Chakki Atta (10kg) - Urgent", "Sunflower Oil (2.5L stocked - skip)"],
            actionButtonLabel: "Export to Grocery App"
          },
          extractedMemories: ["Restock rhythm: Surf Excel every 18 days"]
        };
      } else if (lower.includes("help") || lower.includes("cook") || lower.includes("maid") || lower.includes("salary") || lower.includes("pay") || lower.includes("sunita")) {
        fallbackResponse = {
          text: "Tomorrow is the 1st of the month. Sunita Didi (₹6,500) and Rekha (₹4,500) are due for monthly salary payment.\n\nHere are your options:\n[Button: Pay Sunita Didi (₹6,500)]\n[Button: Pay Rekha (₹4,500)]\n[Button: Settle All Staff Dues]\n[Button: View Household Staff Roster]",
          suggestions: [
            "Pay Sunita Didi via UPI (₹6,500)",
            "Pay Rekha via UPI (₹4,500)",
            "Generate salary receipts",
            "Mark as already paid"
          ],
          card: {
            type: "help_payment",
            title: "Domestic Staff Salaries Due Tomorrow",
            description: "Total Due: ₹11,000 across 2 staff members",
            items: ["Sunita Didi (Cook): ₹6,500 due 1st", "Rekha (Maid): ₹4,500 due 1st", "Ramesh (Driver): ₹12,000 due 5th (Pending)"],
            actionButtonLabel: "Initiate UPI Direct Pay"
          },
          extractedMemories: ["Salary schedule tracked for 1st of month"]
        };
      } else if (lower.includes("clean") || lower.includes("service") || lower.includes("plumber") || lower.includes("electrician")) {
        fallbackResponse = {
          text: "Here are your verified home service options:\n[Link: Book Cleaning Service | https://www.urbancompany.com]\n[Button: Call Plumber Suresh]\n[Button: Call Electrician Rajesh]\n[Button: Schedule AC Servicing]",
          suggestions: [
            "Call trusted plumber",
            "Book deep cleaning",
            "Add a new service contact"
          ],
          card: {
            type: "insight",
            title: "Trusted Home Services Directory",
            description: "Direct contact with verified technicians",
            items: ["Suresh (Plumber) - 4.9★", "Rajesh (Electrician) - 4.8★", "CoolTech AC (Service) - 4.9★"],
            actionButtonLabel: "Open Services Rolodex"
          },
          extractedMemories: ["Accessed home services directory"]
        };
      }

      return res.json(fallbackResponse);
    }

    // Call Gemini 3.7 Flash with structured system instruction
    const promptPayload = `
Current Household State & Context:
${JSON.stringify(householdContext || {}, null, 2)}

User's Latest Query:
"${message}"

Recent Conversation Context:
${JSON.stringify(history || [], null, 2)}

Please provide an intelligent, proactive NISA household manager response in the exact JSON format.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptPayload,
      config: {
        systemInstruction: NISA_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const rawText = response.text || "{}";
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = {
        text: rawText,
        suggestions: ["What should we cook tonight?", "What needs replenishment?", "Check Diwali timeline"],
        card: { type: "none" },
        extractedMemories: []
      };
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      text: "I am having trouble connecting to my central neural network right now, but I am still actively tracking your household state locally. How can I assist with your pantry, meals, or staff dues?",
      suggestions: ["What should we cook tonight?", "Check urgent grocery list", "View staff salary dues"],
      card: { type: "none" },
      extractedMemories: []
    });
  }
});

// Specialized Meal Generator endpoint
app.post("/api/generate-meal-plan", async (req, res) => {
  try {
    const { pantryItems, familyMembers, preferences } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        dish: "Palak Paneer with Phulkas & Cucumber Raita",
        description: "A nourishing North Indian dinner utilizing the 2 bunches of spinach and 400g paneer currently in your fridge crisper.",
        prepTime: "25 minutes",
        ingredients: ["Fresh Spinach", "Fresh Paneer", "Whole Wheat Atta", "Tomatoes", "Garlic", "Cumin"],
        familySuitability: {
          dadi: "Mild seasoning, soft rotis with light ghee",
          aarav: "Kid-friendly paneer cubes with zero sharp chillies",
          parents: "High protein, wholesome balanced meal"
        },
        wasteSaved: "Prevents 400g paneer & 2 bunches palak from spoiling"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Given these pantry items: ${JSON.stringify(pantryItems)} and family members: ${JSON.stringify(familyMembers)}, generate a customized, zero-food-waste meal recommendation that satisfies every member's dietary requirements. Return in JSON.`,
      config: {
        systemInstruction: "You are NISA's Nourish Engine. Create delicious, nutritionally balanced, culturally grounded household meals taking into account multi-generational diets.",
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Occasion planner endpoint
app.post("/api/occasion-planner", async (req, res) => {
  try {
    const { occasionTitle, guestCount, daysRemaining, householdDetails } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        phases: [
          {
            phase: "Phase 1: Deep Cleaning & Room Preparation (18 to 14 Days)",
            tasks: ["Book deep sofa & curtain dry cleaning", "Organize extra mattresses and clean linen", "Check pooja thali and lighting supplies"]
          },
          {
            phase: "Phase 2: Groceries & Sweets Prep (12 to 7 Days)",
            tasks: ["Bulk buy premium Cashews, Almonds & Saffron for hampers", "Restock Desi Ghee (3L) & Basmati Rice (10kg)", "Order puja camphor, dhoop & fresh marigold flowers"]
          },
          {
            phase: "Phase 3: Gifting & Attire (6 to 2 Days)",
            tasks: ["Pack 8 neighbor & relative gift hampers", "Prepare domestic helper festive bonuses", "Dry clean ethnic festive kurtas"]
          },
          {
            phase: "Phase 4: Festival Hosting (Day-Of)",
            tasks: ["Entrance marigold & rangoli setup", "Buffet dinner chafing dish prep", "Evening Lakshmi Puja at 7:15 PM"]
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Create a 4-phase preparation plan for ${occasionTitle} with ${guestCount} guests arriving in ${daysRemaining} days. Household context: ${JSON.stringify(householdDetails)}. Return in JSON format with structured phases and tasks.`,
      config: {
        systemInstruction: "You are NISA's Celebrate Occasion Engine. Anticipate all practical logistics for South Asian & global family festivals (cleaning, groceries, gifting, rituals, hosting).",
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NIVASA - NISA Server running on http://localhost:${PORT}`);
  });
}

startServer();
