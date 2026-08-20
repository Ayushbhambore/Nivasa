import { HouseholdState } from '../types';

export const initialHouseholdState: HouseholdState = {
  householdName: "The Sharma Family",
  city: "Bengaluru, India",
  neighborhood: "Indiranagar",
  languagePreference: "English / Hindi (Hinglish friendly)",
  culturalBackground: "North Indian living in Bengaluru (Vegetarian-leaning with mild spice for kids & elders)",
  
  members: [
    {
      id: "mem-1",
      name: "Ayush",
      relation: "Household Head / Working Parent",
      age: 36,
      dietaryNotes: "High protein, prefers quick weekday dinners, likes light black coffee mornings",
      favorites: ["Palak Paneer", "Dal Makhani", "Tawa Roti", "Cold Brew"],
      dailyRoutine: "Leaves for office at 8:30 AM, returns by 7:00 PM"
    },
    {
      id: "mem-2",
      name: "Priya",
      relation: "Working Parent",
      age: 34,
      dietaryNotes: "Strict vegetarian, avoids processed sugar, loves herbal tea & millets",
      favorites: ["Methi Thepla", "Quinoa Khichdi", "Paneer Bhurji", "Ginger Cardamom Chai"],
      dailyRoutine: "Works hybrid, handles morning kids school prep"
    },
    {
      id: "mem-3",
      name: "Dadi (Saroj)",
      relation: "Grandmother / Elder",
      age: 68,
      dietaryNotes: "Low sodium, soft rotis, no raw onions in evening, takes warm turmeric milk before bed",
      favorites: ["Moong Dal Khichdi", "Lauki Kofta", "Phulkas with Ghee", "Besan Ladoo"],
      dailyRoutine: "Morning puja at 6:30 AM, evening garden walk at 5:30 PM"
    },
    {
      id: "mem-4",
      name: "Aarav",
      relation: "Son",
      age: 7,
      dietaryNotes: "Mild spice only, loves dairy, school tiffin needs finger-food snacks",
      favorites: ["Paneer Kathi Roll", "Poha", "Cheese Paratha", "Mango Lassi"],
      dailyRoutine: "School bus at 7:45 AM, returns at 3:15 PM"
    }
  ],

  pantry: [
    {
      id: "p1",
      name: "Fresh Paneer",
      category: "Dairy & Fresh",
      quantity: "400g (Unopened pack)",
      daysRemaining: 3,
      status: "stocked",
      preferredBrand: "Amul Fresh / Nandini",
      consumptionFrequency: "Twice a week"
    },
    {
      id: "p2",
      name: "Fresh Spinach (Palak)",
      category: "Dairy & Fresh",
      quantity: "2 bunches (In crisper drawer)",
      daysRemaining: 2,
      status: "stocked",
      preferredBrand: "Local organic mandi",
      consumptionFrequency: "Weekly"
    },
    {
      id: "p3",
      name: "Surf Excel Matic Liquid Detergent",
      category: "Cleaning & Household",
      quantity: "Approx 180ml remaining (~3 washes left)",
      daysRemaining: 3,
      status: "buy_now",
      preferredBrand: "Surf Excel Matic Front Load (HUL)",
      consumptionFrequency: "Refilled every 18 days (~1.5L bottle)",
      unitPrice: 380
    },
    {
      id: "p4",
      name: "Tata Tea Gold / Red Label Tea",
      category: "Snacks & Beverages",
      quantity: "150g in jar (~6 days left)",
      daysRemaining: 6,
      status: "buy_later",
      preferredBrand: "Red Label Natural Care / Tata Tea Gold",
      consumptionFrequency: "500g pouch every 3 weeks",
      unitPrice: 270
    },
    {
      id: "p5",
      name: "Fortune Sunlite Sunflower Oil",
      category: "Groceries & Staples",
      quantity: "2.5 Litres (Adequate stock)",
      daysRemaining: 16,
      status: "stocked",
      preferredBrand: "Fortune / Saffola Gold",
      consumptionFrequency: "5L can monthly",
      unitPrice: 650
    },
    {
      id: "p6",
      name: "Aashirvaad Shudh Chakki Atta",
      category: "Groceries & Staples",
      quantity: "1.2 kg remaining",
      daysRemaining: 4,
      status: "buy_now",
      preferredBrand: "Aashirvaad Whole Wheat Atta",
      consumptionFrequency: "10kg bag every 3 weeks",
      unitPrice: 420
    },
    {
      id: "p7",
      name: "Vim Dishwash Gel (Lemon)",
      category: "Cleaning & Household",
      quantity: "750ml bottle (Half full)",
      daysRemaining: 14,
      status: "stocked",
      preferredBrand: "Vim Gel (HUL)",
      consumptionFrequency: "Monthly refill pouch",
      unitPrice: 190
    },
    {
      id: "p8",
      name: "Dove Daily Moisture Shampoo & Soap",
      category: "Personal Care",
      quantity: "1 bar left in cabinet, shampoo 20% left",
      daysRemaining: 5,
      status: "buy_now",
      preferredBrand: "Dove Deep Moisture / Lifebuoy Handwash (HUL)",
      consumptionFrequency: "Refilled monthly",
      unitPrice: 310
    }
  ],

  shoppingList: [
    {
      id: "s1",
      name: "Surf Excel Matic Liquid (2L Refill)",
      category: "Cleaning & Household",
      quantity: "1 bottle (2 Litres)",
      urgency: "urgent",
      brandSuggestion: "Surf Excel Matic Front Load",
      estimatedPrice: 430,
      checked: false,
      notes: "Running out in 2-3 laundry cycles"
    },
    {
      id: "s2",
      name: "Aashirvaad Shudh Chakki Atta (10kg)",
      category: "Groceries & Staples",
      quantity: "1 bag (10 kg)",
      urgency: "urgent",
      brandSuggestion: "Aashirvaad Whole Wheat",
      estimatedPrice: 420,
      checked: false,
      notes: "Roti staple, 1.2kg left"
    },
    {
      id: "s3",
      name: "Dove Deep Moisture Bathing Bars (Pack of 4)",
      category: "Personal Care",
      quantity: "1 pack (4x100g)",
      urgency: "regular",
      brandSuggestion: "Dove Care",
      estimatedPrice: 280,
      checked: false,
      notes: "Master bathroom restock"
    }
  ],

  helpStaff: [
    {
      id: "h1",
      name: "Sunita Didi",
      role: "Cook (Morning & Evening Meals)",
      phone: "+91 98451 23091",
      monthlySalary: 6500,
      paymentDueDay: 1,
      upiId: "sunita.sharma.cook@oksbi",
      lastPaidDate: "1st of last month",
      isDue: true
    },
    {
      id: "h2",
      name: "Rekha",
      role: "Domestic Helper (Cleaning & Utensils)",
      phone: "+91 97412 88402",
      monthlySalary: 4500,
      paymentDueDay: 1,
      upiId: "rekha.helper@paytm",
      lastPaidDate: "1st of last month",
      isDue: true
    },
    {
      id: "h3",
      name: "Ramesh Bhai",
      role: "Driver (School drop & weekend)",
      phone: "+91 98860 41299",
      monthlySalary: 12000,
      paymentDueDay: 5,
      upiId: "ramesh.driver92@ybl",
      lastPaidDate: "5th of last month",
      isDue: false
    }
  ],

  serviceContacts: [
    {
      id: "sc1",
      name: "Naveen (Indiranagar Trusted Plumber)",
      serviceType: "Plumber",
      phone: "+91 98450 71120",
      rating: 4.9,
      notes: "Very reliable, handles kitchen sink leaks & geyser pipe fittings. Charges ₹300 visit fee.",
      lastUsedDate: "3 months ago"
    },
    {
      id: "sc2",
      name: "Manoj Electrician (Swamy Electricals)",
      serviceType: "Electrician",
      phone: "+91 99160 55432",
      rating: 4.8,
      notes: "Known for inverter battery checkups and ceiling fan repairs. Lives nearby 12th Main.",
      lastUsedDate: "1 month ago"
    },
    {
      id: "sc3",
      name: "Urban Company AC Deep Service (Suresh)",
      serviceType: "AC Technician",
      phone: "+91 98440 99812",
      rating: 4.9,
      notes: "Master bedroom Daikin AC pre-summer deep foaming service.",
      lastUsedDate: "5 months ago"
    },
    {
      id: "sc4",
      name: "Dr. Ananya Rao (Pediatrician - Cloudnine)",
      serviceType: "Doctor",
      phone: "+91 80 4661 2200",
      rating: 5.0,
      notes: "Aarav's pediatrician for vaccinations and seasonal flu consultations."
    }
  ],

  occasions: [
    {
      id: "occ-1",
      title: "Diwali Grand Celebration & Family Gathering",
      type: "festival",
      date: "2026-11-08",
      daysRemaining: 18,
      description: "15 relatives visiting (Ayush's brother's family from Delhi + cousins). Requires full house deep cleaning, sweet making, pooja essentials, and bedding setup.",
      expectedGuests: 15,
      suggestedMenu: [
        "Welcome drink: Saffron Cardamom Thandai",
        "Appetizers: Paneer Tikka & Crispy Corn Chaat",
        "Main Course: Shahi Paneer, Pindi Chole, Dal Makhani, Kashmiri Pulao, Stuffed Kulchas",
        "Dessert: Homemade Gulab Jamun & Kaju Katli"
      ],
      checklistPhases: [
        {
          phase: "Phase 1: Deep Cleaning & House Prep (18 to 14 Days Before)",
          items: [
            { id: "c1", task: "Book Urban Company deep sofa & kitchen chimney cleaning", category: "cleaning", done: true },
            { id: "c2", task: "Wash spare bedsheets, duvets & pillow covers for 15 guests", category: "cleaning", done: false },
            { id: "c3", task: "Check extra brass diyas, fairy lights & pooja thali in storage", category: "decor", done: false }
          ]
        },
        {
          phase: "Phase 2: Festival Groceries & Dry Fruits (12 to 7 Days Before)",
          items: [
            { id: "c4", task: "Bulk order Cashews, Almonds, Pistachios, Cardamom & Saffron for gifting boxes", category: "gifting", done: false },
            { id: "c5", task: "Restock Desi Ghee (3 Litres), Basmati Rice (10kg), Maida & Besan for sweets", category: "groceries", done: false },
            { id: "c6", task: "Order pooja camphor, dhoop sticks, gangajal and roli chawal", category: "groceries", done: false }
          ]
        },
        {
          phase: "Phase 3: Gifting, Sweets & Attire (6 to 2 Days Before)",
          items: [
            { id: "c7", task: "Pack 8 Diwali gift hampers for visiting relatives & neighbors", category: "gifting", done: false },
            { id: "c8", task: "Iron ethnic festive kurtas for Aarav, Ayush, Priya & Dadi", category: "personal_care", done: false },
            { id: "c9", task: "Prepare Sunita Didi's Diwali festival bonus & sweet box", category: "cooking", done: false }
          ]
        },
        {
          phase: "Phase 4: Lakshmi Puja Day & Dinner Hosting (Diwali Day)",
          items: [
            { id: "c10", task: "Fresh marigold flower garland decoration at main entrance door", category: "decor", done: false },
            { id: "c11", task: "Set up buffet dinner counters with warm chaffing dishes", category: "cooking", done: false },
            { id: "c12", task: "Evening Lakshmi-Ganesh Aarti with full family at 7:15 PM", category: "cooking", done: false }
          ]
        }
      ]
    }
  ],

  mealPlan: [
    {
      day: "Today (Monday)",
      dateStr: "Aug 16",
      lunch: {
        title: "Rajma Chawal with Kachumber Salad & Curd",
        ingredients: ["Rajma (Kidney beans)", "Basmati Rice", "Onion Tomato Masala", "Coriander", "Fresh Curd"],
        prepTimeMin: 35,
        pantryReady: true,
        familyFit: "Comforting favorite for all 4 family members; gentle spice suitable for Dadi & Aarav"
      },
      dinner: {
        title: "Creamy Palak Paneer with Tawa Roti & Cucumber Raita",
        ingredients: ["Fresh Spinach (in fridge)", "Fresh Paneer (in fridge)", "Garlic", "Tomatoes", "Aashirvaad Atta", "Curd"],
        prepTimeMin: 25,
        pantryReady: true,
        familyFit: "Zero food waste: Utilizes fresh spinach & paneer expiring in 2 days. High protein for Ayush & Priya."
      },
      highlightDish: "Palak Paneer (Pantry Optimized)"
    },
    {
      day: "Tomorrow (Tuesday)",
      dateStr: "Aug 17",
      lunch: {
        title: "Yellow Moong Dal Tadka, Jeera Aloo & Phulkas",
        ingredients: ["Moong Dal", "Potatoes", "Cumin", "Hing", "Ghee", "Wheat Flour"],
        prepTimeMin: 25,
        pantryReady: true,
        familyFit: "Light & alkaline, easy on Dadi's stomach, quick school tiffin for Aarav"
      },
      dinner: {
        title: "Mixed Vegetable Pulao with Mint Boondi Raita & Roasted Papad",
        ingredients: ["Basmati Rice", "Carrots", "Green Peas", "Beans", "Mint", "Boondi"],
        prepTimeMin: 30,
        pantryReady: true,
        familyFit: "Wholesome single-pot dinner; kids love crunchy papad"
      },
      highlightDish: "Mixed Veg Pulao"
    },
    {
      day: "Wednesday",
      dateStr: "Aug 18",
      lunch: {
        title: "Lauki Chana Dal with Steamed Rice & Lemon Pickle",
        ingredients: ["Bottle Gourd (Lauki)", "Chana Dal", "Turmeric", "Curry leaves", "Rice"],
        prepTimeMin: 30,
        pantryReady: true,
        familyFit: "Dadi's favorite nutritious meal; cooling during warm afternoons"
      },
      dinner: {
        title: "Methi Paneer Bhurji with Multigrain Parathas & Green Chutney",
        ingredients: ["Methi leaves", "Crumbled Paneer", "Capsicum", "Multigrain Atta"],
        prepTimeMin: 25,
        pantryReady: false,
        familyFit: "Low carb, rich in iron and fibre for Priya's health goals"
      },
      highlightDish: "Methi Paneer Bhurji"
    }
  ],

  insights: [
    {
      id: "ins-1",
      title: "Detergent Replenishment Anticipated",
      type: "replenishment",
      message: "Your front-load washing machine runs ~5 cycles/week. With ~180ml Surf Excel Matic remaining, it will run out by Thursday's laundry load.",
      impact: "Predictive restock avoids emergency quick-commerce delivery fee.",
      actionLabel: "Add Surf Excel 2L to Sunday List",
      actionType: "add_to_cart",
      actionPayload: { name: "Surf Excel Matic Liquid Detergent (2L)", price: 430 }
    },
    {
      id: "ins-2",
      title: "Cook & Maid Monthly Salaries Due Tomorrow",
      type: "replenishment",
      message: "1st of the month is tomorrow. Sunita Didi (₹6,500) and Rekha (₹4,500) payments are due. Total: ₹11,000.",
      impact: "Timely payment builds lasting trust with domestic help partners.",
      actionLabel: "Open UPI Direct Pay Assistant",
      actionType: "adjust_routine"
    },
    {
      id: "ins-3",
      title: "Zero Food Waste Opportunity Tonight",
      type: "waste_reduction",
      message: "You have 2 fresh bunches of spinach (Palak) and 400g Paneer in the crisper drawer expiring in 48 hours. Palak Paneer tonight utilizes 100% of these fresh ingredients.",
      impact: "Saves ₹180 in perishable waste and provides a nutritious high-protein dinner.",
      actionLabel: "View Step-by-Step Palak Paneer Guide",
      actionType: "open_recipe"
    },
    {
      id: "ins-4",
      title: "Diwali Hosting Occasion Detected (15 Relatives)",
      type: "seasonal",
      message: "18 days left until Diwali with 15 out-of-town guests arriving. Staggering your bulk grocery, sweet-making and spare linen preparations over 3 weeks will keep stress at zero.",
      impact: "Reduces last-minute Diwali festival panic and out-of-stock items.",
      actionLabel: "Explore 4-Stage Diwali Timeline",
      actionType: "view_pantry"
    }
  ],

  memories: [
    {
      id: "m1",
      category: "people",
      key: "Dadi's Evening Dietary Constraint",
      value: "Low sodium, soft rotis with ghee, strictly no raw onions after 6:00 PM",
      confidence: 0.98,
      updatedAt: "Learned 2 weeks ago"
    },
    {
      id: "m2",
      category: "people",
      key: "Aarav's School Tiffin Preference",
      value: "Likes rollable finger-foods like paneer kathi rolls or cheese paratha; low spice",
      confidence: 0.95,
      updatedAt: "Learned 1 week ago"
    },
    {
      id: "m3",
      category: "routine",
      key: "Laundry Rhythm",
      value: "Washing machine runs 5 times weekly (Monday, Wednesday, Friday, Saturday, Sunday)",
      confidence: 0.92,
      updatedAt: "Observed over 30 days"
    },
    {
      id: "m4",
      category: "preferences",
      key: "Brand Loyalty: Detergent & Personal Care",
      value: "Prefers Surf Excel Matic Front Load for washing and Dove for family bathing",
      confidence: 0.96,
      updatedAt: "Saved in profile"
    },
    {
      id: "m5",
      category: "festivals",
      key: "Diwali Traditions",
      value: "Large family gathering of 15 guests, makes homemade Gulab Jamun & Saffron Thandai, gifts dry fruit boxes to neighbors",
      confidence: 0.99,
      updatedAt: "Confirmed for Diwali 2026"
    },
    {
      id: "m6",
      category: "help",
      key: "Household Staff Payroll",
      value: "Sunita Didi (₹6,500) and Rekha (₹4,500) expect payment on the 1st of every month via UPI",
      confidence: 0.98,
      updatedAt: "Monthly recurring"
    }
  ],

  devices: [
    {
      id: "dev-1",
      name: "Living Room Main Lights",
      location: "Living Room",
      type: "light",
      isOn: true,
      statusText: "Warm White (80% Brightness)",
      powerWatts: 24,
      brightness: 80
    },
    {
      id: "dev-2",
      name: "Balcony Ambient Lights",
      location: "Balcony",
      type: "light",
      isOn: false,
      statusText: "Off",
      powerWatts: 12,
      brightness: 0
    },
    {
      id: "dev-3",
      name: "Master Bedroom AC",
      location: "Master Bedroom",
      type: "ac",
      isOn: false,
      statusText: "Set to 24°C (Eco Mode)",
      powerWatts: 1100,
      temperature: 24
    },
    {
      id: "dev-4",
      name: "Bathroom Water Geyser",
      location: "Master Bath",
      type: "geyser",
      isOn: false,
      statusText: "Ready (Auto-off in 20 min)",
      powerWatts: 2000
    },
    {
      id: "dev-5",
      name: "Kent RO Water Purifier",
      location: "Kitchen",
      type: "purifier",
      isOn: true,
      statusText: "TDS 85 ppm (Filter Health: 92%)",
      powerWatts: 60
    },
    {
      id: "dev-6",
      name: "Front Door Smart Lock",
      location: "Entrance",
      type: "lock",
      isOn: true,
      statusText: "Locked • Auto-lock enabled",
      powerWatts: 4
    }
  ],

  bills: [
    {
      id: "bill-1",
      title: "BESCOM Electricity Bill",
      provider: "BESCOM Bangalore",
      category: "electricity",
      amount: 2840,
      dueDate: "Aug 22, 2026",
      isPaid: false,
      accountNo: "BES-INDIRA-994821",
      autoPayEnabled: false
    },
    {
      id: "bill-2",
      title: "GAIL Piped Natural Gas",
      provider: "GAIL Gas Ltd",
      category: "gas",
      amount: 680,
      dueDate: "Aug 26, 2026",
      isPaid: false,
      accountNo: "GAS-KA-441029",
      autoPayEnabled: true
    },
    {
      id: "bill-3",
      title: "Airtel Xstream Fiber (300 Mbps)",
      provider: "Airtel Broadband",
      category: "internet",
      amount: 1179,
      dueDate: "Sep 02, 2026",
      isPaid: true,
      accountNo: "AIRTEL-080-881920",
      autoPayEnabled: true
    },
    {
      id: "bill-4",
      title: "Palm Meadows Apartment Maintenance",
      provider: "RWA Society Office",
      category: "maintenance",
      amount: 4500,
      dueDate: "Aug 28, 2026",
      isPaid: false,
      accountNo: "FLAT-B402-MAINT",
      autoPayEnabled: false
    }
  ],

  gatePasses: [
    {
      id: "gp-1",
      visitorName: "Blinkit Delivery Agent",
      purpose: "Grocery & Surf Excel Delivery",
      category: "delivery",
      passCode: "NX-8821",
      validUntil: "Today, 6:00 PM",
      status: "active"
    },
    {
      id: "gp-2",
      visitorName: "Suresh (Urban Company Clean)",
      purpose: "Sofa & Deep Cleaning Inspection",
      category: "service",
      passCode: "NX-4109",
      validUntil: "Tomorrow, 11:30 AM",
      status: "active"
    },
    {
      id: "gp-3",
      visitorName: "Sunita Didi (Cook)",
      purpose: "Regular Morning Entry",
      category: "service",
      passCode: "NX-PASS-STAFF",
      validUntil: "Daily recurring",
      status: "active"
    }
  ]
};
