// RetailPulse AI — Mock Data Engine
// Pakistan-focused FMCG retail intelligence sample dataset

export const CITIES = ["Karachi", "Lahore", "Rawalpindi", "Islamabad", "Gujranwala", "Faisalabad", "Peshawar", "Multan"];

export const AREAS: Record<string, string[]> = {
  Karachi: ["Clifton", "DHA", "Gulshan-e-Iqbal", "PECHS", "Saddar", "North Nazimabad", "Korangi", "Malir"],
  Lahore: ["Gulberg", "DHA", "Model Town", "Johar Town", "Bahria Town", "Iqbal Town", "Faisal Town", "Garden Town"],
  Rawalpindi: ["Satellite Town", "Chaklala", "Murree Road", "Raja Bazar", "Bahria Town", "Adiala Road"],
  Islamabad: ["F-6", "F-7", "F-8", "G-9", "G-10", "E-7", "Blue Area", "I-8"],
  Gujranwala: ["Satellite Town", "Trust Colony", "Civil Lines", "Shah Alam Market", "Peoples Colony"],
  Faisalabad: ["Peoples Colony", "Madina Town", "Gulberg", "Millat Road", "Susan Road"],
  Peshawar: ["Hayatabad", "University Town", "Saddar", "Cantonment", "Ring Road"],
  Multan: ["Gulgasht", "Shah Rukn-e-Alam", "Vehari Road", "Bosan Road", "New Multan"],
};

export const CATEGORIES = ["Biscuits", "Beverages", "Dairy", "Snacks", "Personal Care", "Household", "Confectionery", "Instant Food"];

export const BRANDS = [
  { id: "brand_001", name: "Peek Freans", category: "Biscuits", color: "#00D4FF" },
  { id: "brand_002", name: "Nestle", category: "Dairy", color: "#22C55E" },
  { id: "brand_003", name: "Lays", category: "Snacks", color: "#F59E0B" },
  { id: "brand_004", name: "Tapal", category: "Beverages", color: "#8B5CF6" },
  { id: "brand_005", name: "Shan Foods", category: "Instant Food", color: "#EF4444" },
];

export const PRODUCTS = [
  { id: "sku_001", name: "Sooper Biscuits 150g", brand: "Peek Freans", category: "Biscuits", price: 35, brandId: "brand_001" },
  { id: "sku_002", name: "Peek Freans Rio 150g", brand: "Peek Freans", category: "Biscuits", price: 45, brandId: "brand_001" },
  { id: "sku_003", name: "Milk Pak 1L", brand: "Nestle", category: "Dairy", price: 140, brandId: "brand_002" },
  { id: "sku_004", name: "Nescafe 3-in-1 Box", brand: "Nestle", category: "Beverages", price: 220, brandId: "brand_002" },
  { id: "sku_005", name: "Lays Classic 50g", brand: "Lays", category: "Snacks", price: 40, brandId: "brand_003" },
  { id: "sku_006", name: "Lays Masala 50g", brand: "Lays", category: "Snacks", price: 40, brandId: "brand_003" },
  { id: "sku_007", name: "Tapal Danedar 200g", brand: "Tapal", category: "Beverages", price: 180, brandId: "brand_004" },
  { id: "sku_008", name: "Tapal Family Mixture 500g", brand: "Tapal", category: "Beverages", price: 420, brandId: "brand_004" },
  { id: "sku_009", name: "Shan Biryani Masala 60g", brand: "Shan Foods", category: "Instant Food", price: 95, brandId: "brand_005" },
  { id: "sku_010", name: "Shan Curry Powder 100g", brand: "Shan Foods", category: "Instant Food", price: 120, brandId: "brand_005" },
];

// KPI Summary Data
export const KPI_DATA = {
  totalTransactions: { value: 48291, change: +12.4, label: "Total Transactions", period: "vs last week" },
  activeStores: { value: 3847, change: +8.2, label: "Active Kiryana Stores", period: "vs last month" },
  revenueTracked: { value: "₨ 12.4M", change: +19.7, label: "Revenue Tracked (Est.)", period: "vs last week" },
  dataPoints: { value: "2.1M", change: +34.1, label: "Data Points Collected", period: "vs last month" },
  avgTransactionValue: { value: "₨ 256", change: +5.3, label: "Avg Transaction Value", period: "vs last week" },
  coverageGrowth: { value: "71%", change: +2.1, label: "Network Coverage", period: "of target cities" },
};

// Hourly transaction trend
export const HOURLY_TREND = [
  { hour: "6AM", txns: 420, revenue: 107520 },
  { hour: "7AM", txns: 680, revenue: 174080 },
  { hour: "8AM", txns: 1240, revenue: 317440 },
  { hour: "9AM", txns: 1820, revenue: 465920 },
  { hour: "10AM", txns: 2100, revenue: 537600 },
  { hour: "11AM", txns: 1980, revenue: 506880 },
  { hour: "12PM", txns: 2450, revenue: 627200 },
  { hour: "1PM", txns: 2230, revenue: 570880 },
  { hour: "2PM", txns: 1860, revenue: 476160 },
  { hour: "3PM", txns: 2680, revenue: 686080 },
  { hour: "4PM", txns: 3120, revenue: 798720 },
  { hour: "5PM", txns: 3890, revenue: 996160 },
  { hour: "6PM", txns: 4210, revenue: 1077760 },
  { hour: "7PM", txns: 3740, revenue: 957440 },
  { hour: "8PM", txns: 2980, revenue: 762880 },
  { hour: "9PM", txns: 2210, revenue: 565760 },
  { hour: "10PM", txns: 1340, revenue: 343040 },
];

// Weekly trend per category
export const WEEKLY_CATEGORY_TREND = [
  { day: "Mon", Biscuits: 8420, Beverages: 6300, Dairy: 9100, Snacks: 5200, "Instant Food": 3100 },
  { day: "Tue", Biscuits: 7900, Beverages: 6800, Dairy: 8700, Snacks: 5600, "Instant Food": 3400 },
  { day: "Wed", Biscuits: 9200, Beverages: 7200, Dairy: 9400, Snacks: 4900, "Instant Food": 3200 },
  { day: "Thu", Biscuits: 8600, Beverages: 7800, Dairy: 9800, Snacks: 5400, "Instant Food": 3600 },
  { day: "Fri", Biscuits: 11200, Beverages: 9400, Dairy: 11600, Snacks: 6800, "Instant Food": 4800 },
  { day: "Sat", Biscuits: 13400, Beverages: 10200, Dairy: 12900, Snacks: 8200, "Instant Food": 5600 },
  { day: "Sun", Biscuits: 12100, Beverages: 9100, Dairy: 11200, Snacks: 7400, "Instant Food": 4900 },
];

// City performance
export const CITY_PERFORMANCE = [
  { city: "Karachi", stores: 1240, txns: 18420, revenue: 4714720, growth: 14.2, coverage: 68 },
  { city: "Lahore", stores: 980, txns: 13860, revenue: 3548160, growth: 18.7, coverage: 72 },
  { city: "Rawalpindi", stores: 620, txns: 7440, revenue: 1904640, growth: 22.1, coverage: 58 },
  { city: "Islamabad", stores: 380, txns: 3800, revenue: 972800, growth: 11.4, coverage: 81 },
  { city: "Gujranwala", stores: 340, txns: 2720, revenue: 696320, growth: 28.9, coverage: 45 },
  { city: "Faisalabad", stores: 287, txns: 2010, revenue: 514560, growth: 31.2, coverage: 38 },
];

// Top Products
export const TOP_PRODUCTS = [
  { sku: "sku_001", name: "Sooper Biscuits 150g", brand: "Peek Freans", units: 84200, revenue: 2947000, growth: 12.4, trend: "up" },
  { sku: "sku_003", name: "Milk Pak 1L", brand: "Nestle", units: 62100, revenue: 8694000, growth: 8.7, trend: "up" },
  { sku: "sku_005", name: "Lays Classic 50g", brand: "Lays", units: 58400, revenue: 2336000, growth: 15.2, trend: "up" },
  { sku: "sku_007", name: "Tapal Danedar 200g", brand: "Tapal", units: 47300, revenue: 8514000, growth: 6.1, trend: "up" },
  { sku: "sku_009", name: "Shan Biryani Masala 60g", brand: "Shan Foods", units: 38900, revenue: 3695500, growth: 22.8, trend: "up" },
  { sku: "sku_002", name: "Peek Freans Rio 150g", brand: "Peek Freans", units: 31200, revenue: 1404000, growth: -3.1, trend: "down" },
  { sku: "sku_006", name: "Lays Masala 50g", brand: "Lays", units: 29800, revenue: 1192000, growth: 9.4, trend: "up" },
  { sku: "sku_004", name: "Nescafe 3-in-1 Box", brand: "Nestle", units: 18200, revenue: 4004000, growth: -1.2, trend: "down" },
];

// Heatmap data for Pakistan cities
export const HEATMAP_DATA: Record<string, Record<string, number>> = {
  Karachi: {
    Clifton: 94, DHA: 88, "Gulshan-e-Iqbal": 72, PECHS: 81, Saddar: 67,
    "North Nazimabad": 59, Korangi: 45, Malir: 38,
  },
  Lahore: {
    Gulberg: 91, DHA: 86, "Model Town": 78, "Johar Town": 74, "Bahria Town": 69,
    "Iqbal Town": 63, "Faisal Town": 56, "Garden Town": 71,
  },
  Rawalpindi: {
    "Satellite Town": 84, Chaklala: 62, "Murree Road": 58, "Raja Bazar": 91,
    "Bahria Town": 73, "Adiala Road": 41,
  },
  Islamabad: {
    "F-6": 88, "F-7": 92, "F-8": 79, "G-9": 61, "G-10": 65,
    "E-7": 84, "Blue Area": 76, "I-8": 53,
  },
  Gujranwala: {
    "Satellite Town": 78, "Trust Colony": 54, "Civil Lines": 61, "Shah Alam Market": 87,
    "Peoples Colony": 69,
  },
  Faisalabad: {
    "Peoples Colony": 72, "Madina Town": 65, Gulberg: 58, "Millat Road": 49, "Susan Road": 44,
  },
};

// AI Insights
export const AI_INSIGHTS = [
  {
    id: "ai_001",
    type: "spike",
    icon: "📈",
    title: "Demand Spike Detected",
    message: "Biscuit consumption in Satellite Town, Rawalpindi surged 34% this week, likely driven by pre-Eid stockpiling. 218 Kiryana stores reported elevated Sooper and Rio sales.",
    city: "Rawalpindi",
    area: "Satellite Town",
    category: "Biscuits",
    confidence: 94,
    time: "2 hours ago",
    severity: "high",
  },
  {
    id: "ai_002",
    type: "opportunity",
    icon: "💡",
    title: "Market Opportunity",
    message: "Dairy products are severely undersupplied in Korangi, Karachi. Demand outpaces supply by ~40%. Only 12 of 87 stores in this area carry Milk Pak consistently.",
    city: "Karachi",
    area: "Korangi",
    category: "Dairy",
    confidence: 88,
    time: "4 hours ago",
    severity: "medium",
  },
  {
    id: "ai_003",
    type: "trend",
    icon: "🔥",
    title: "Rising Category Trend",
    message: "Instant food consumption across Gujranwala has grown 28.9% MoM — the fastest-growing city in the network. Shan Biryani Masala leads with 2,400+ units sold last week alone.",
    city: "Gujranwala",
    area: "All Areas",
    category: "Instant Food",
    confidence: 91,
    time: "6 hours ago",
    severity: "low",
  },
  {
    id: "ai_004",
    type: "anomaly",
    icon: "⚠️",
    title: "Anomaly Detected",
    message: "Unusual drop in Tea (Beverages) sales in Saddar, Karachi — 22% below 30-day baseline. Cross-referencing with local distributor outage data suggests supply disruption, not demand loss.",
    city: "Karachi",
    area: "Saddar",
    category: "Beverages",
    confidence: 82,
    time: "8 hours ago",
    severity: "medium",
  },
  {
    id: "ai_005",
    type: "forecast",
    icon: "🔮",
    title: "Demand Forecast",
    message: "Model predicts 18-24% increase in Snack category demand across DHA Lahore and F-7 Islamabad in the next 14 days, coinciding with school reopening season.",
    city: "Multiple",
    area: "Premium Areas",
    category: "Snacks",
    confidence: 86,
    time: "12 hours ago",
    severity: "low",
  },
];

// Store leaderboard (gamification)
export const STORE_LEADERBOARD = [
  { rank: 1, name: "Khan General Store", area: "Gulshan-e-Iqbal, Karachi", txns: 487, streak: 28, badge: "🏆 Elite", score: 9840 },
  { rank: 2, name: "Ali Kiryana", area: "Gulberg, Lahore", txns: 421, streak: 21, badge: "⭐ Pro", score: 8720 },
  { rank: 3, name: "Bismillah Store", area: "Satellite Town, RWP", txns: 398, streak: 30, badge: "🔥 Streak", score: 8540 },
  { rank: 4, name: "Hassan General Store", area: "F-7, Islamabad", txns: 362, streak: 14, badge: "⭐ Pro", score: 7890 },
  { rank: 5, name: "Meena Bazaar", area: "Shah Alam, Gujranwala", txns: 341, streak: 19, badge: "⭐ Pro", score: 7340 },
];

// Demand forecast data
export const FORECAST_DATA = [
  { week: "W-4", actual: 38400, forecast: null, lower: null, upper: null },
  { week: "W-3", actual: 41200, forecast: null, lower: null, upper: null },
  { week: "W-2", actual: 43800, forecast: null, lower: null, upper: null },
  { week: "W-1", actual: 48291, forecast: null, lower: null, upper: null },
  { week: "Now", actual: 48291, forecast: 48291, lower: 46000, upper: 51000 },
  { week: "W+1", actual: null, forecast: 52400, lower: 49000, upper: 56000 },
  { week: "W+2", actual: null, forecast: 55800, lower: 51000, upper: 61000 },
  { week: "W+3", actual: null, forecast: 57200, lower: 52000, upper: 63000 },
  { week: "W+4", actual: null, forecast: 61400, lower: 55000, upper: 68000 },
];

// Recent transactions (live feed)
export const RECENT_TRANSACTIONS = [
  { id: "txn_8821", store: "Khan General Store", area: "Gulshan-e-Iqbal, KHI", product: "Sooper Biscuits 150g", qty: 3, amount: 105, time: "30s ago" },
  { id: "txn_8820", store: "Ali Kiryana", area: "Gulberg, LHR", product: "Milk Pak 1L", qty: 2, amount: 280, time: "1m ago" },
  { id: "txn_8819", store: "Bismillah Store", area: "Satellite Town, RWP", product: "Tapal Danedar 200g", qty: 1, amount: 180, time: "2m ago" },
  { id: "txn_8818", store: "Hassan General Store", area: "F-7, ISB", product: "Lays Classic 50g", qty: 4, amount: 160, time: "3m ago" },
  { id: "txn_8817", store: "Meena Bazaar", area: "Civil Lines, GRW", product: "Shan Biryani Masala 60g", qty: 2, amount: 190, time: "4m ago" },
  { id: "txn_8816", store: "Zubair Store", area: "DHA, KHI", product: "Nescafe 3-in-1 Box", qty: 1, amount: 220, time: "5m ago" },
  { id: "txn_8815", store: "Baig Traders", area: "Iqbal Town, LHR", product: "Lays Masala 50g", qty: 6, amount: 240, time: "6m ago" },
];
