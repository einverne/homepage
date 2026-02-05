# Compound Interest Calculator Design Document

## Project Overview

### Project Name
**Compound Interest Calculator** / 复利计算器

### Project Goal
Build an interactive compound interest calculation tool that helps users visually understand the power of compound interest. Through visualized charts and data tables, demonstrate the growth potential of long-term investments.

### Target Users
- Investment beginners: Quick start with a clean interface
- Experienced investors: Advanced options for precise calculations

### Tech Stack

| Category | Selection |
|----------|-----------|
| Framework | Astro 5.x + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4.x |
| UI Components | shadcn/ui |
| Charts | Recharts |
| i18n | Reuse existing `src/utils/i18n.ts` approach |
| State Management | React useState + useReducer |

### Deployment Location
Under `/[lang]/tools/compound-interest` route, as part of the Lab toolset.

---

## Data Model & Calculation Logic

### Core Data Types

```typescript
// Input parameters
interface CalculatorInput {
  principal: number;          // Initial investment amount, default 100,000
  annualRate: number;         // Annual rate (%), default 4.0
  years: number;              // Investment years, default 30
  compoundFrequency: 'yearly' | 'quarterly' | 'monthly' | 'daily';  // Compound frequency, default monthly

  // Additional investment
  additionalAmount: number;   // Periodic additional amount, default 0
  additionalFrequency: 'yearly' | 'quarterly' | 'monthly';  // Additional frequency
  additionalStartYear: number; // Start year for additions, default 1
}

// Yearly calculation result
interface YearlyResult {
  year: number;
  startBalance: number;       // Balance at year start
  interest: number;           // Yearly interest
  additionalPrincipal: number; // Additional principal this year
  endBalance: number;         // Balance at year end
  growthRate: number;         // Year growth rate %
}

// Summary metrics
interface Summary {
  finalAmount: number;        // Final asset value
  totalPrincipal: number;     // Total principal (initial + additional)
  totalInterest: number;      // Total earnings
  totalReturn: number;        // Return rate %
  doublingCount: number;      // Number of doublings
  doublingYears: number[];    // Years when doubled
}
```

### Core Calculation Formula

```
Compound formula: A = P × (1 + r/n)^(n×t)
With additional investment: A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]

Where:
- P = Initial principal
- r = Annual rate (decimal)
- n = Compound frequency (yearly:1, quarterly:4, monthly:12, daily:365)
- t = Investment years
- PMT = Periodic additional amount
```

---

## UI Component Structure

### Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Header: Page title + Language switch                   │
├───────────────────┬─────────────────────────────────────┤
│                   │                                     │
│   InputPanel      │         OutputPanel                 │
│   (30% width)     │         (70% width)                 │
│                   │                                     │
│   - Basic params  │   - KPI Cards (4)                   │
│   - Additional    │   - Trend Chart (Line)              │
│     (collapsible) │   - Pie Chart                       │
│                   │   - Yearly Data Table               │
│   - Action btns   │                                     │
│     Share/Reset   │                                     │
│                   │                                     │
├───────────────────┴─────────────────────────────────────┤
│  Documentation Section (Intro, formulas, guide)         │
├─────────────────────────────────────────────────────────┤
│  Footer                                                 │
└─────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | ≥1024px | Side by side (30% / 70%) |
| Tablet | 768-1023px | Stacked (50% / 50%) |
| Mobile | <768px | Vertical stack, input on top |

### Component Tree

```
CompoundInterestCalculator/
├── CalculatorHeader.tsx        # Title, language switch
├── InputPanel/
│   ├── BasicInputs.tsx         # Basic parameter inputs
│   ├── AdditionalInputs.tsx    # Additional investment (collapsible)
│   └── ActionButtons.tsx       # Share, reset buttons
├── OutputPanel/
│   ├── KPICards.tsx            # 4 key metric cards
│   ├── TrendChart.tsx          # Main trend line chart
│   ├── PieChart.tsx            # Earnings pie chart
│   └── DataTable.tsx           # Yearly data table
├── DocumentSection.tsx         # Bottom documentation
└── hooks/
    ├── useCalculator.ts        # Calculation logic hook
    ├── useShareURL.ts          # URL share logic
    └── useLocalHistory.ts      # LocalStorage history
```

---

## Input Panel Design

### Basic Input Parameters

| Field | Component | Default | Validation | Notes |
|-------|-----------|---------|------------|-------|
| Initial Investment | NumberInput | 100,000 | 0 - 999,999,999 | With thousand separator |
| Annual Rate | NumberInput | 4.0 | 0 - 200 | Unit %, 1 decimal |
| Investment Years | NumberInput | 30 | 1 - 100 | Unit: years |
| Compound Frequency | Select | monthly | 4 options | yearly/quarterly/monthly/daily |

### Additional Investment Parameters (Collapsible)

| Field | Component | Default | Validation |
|-------|-----------|---------|------------|
| Periodic Amount | NumberInput | 0 | 0 - 99,999,999 |
| Frequency | Select | yearly | yearly/quarterly/monthly |
| Start Year | NumberInput | 1 | 1 - investment years |

### Interaction Details

```typescript
// Input debounce: 500ms delay before calculation
const debouncedCalculate = useDebouncedCallback(calculate, 500);

// Input validation: Real-time feedback
// - Red border + error message
// - Block invalid values

// Number formatting
// - On input: Pure numbers
// - On blur: Thousand separator (100,000)
```

### shadcn/ui Component Mapping

| Function | shadcn Component |
|----------|------------------|
| Number input | `Input` + custom formatting |
| Dropdown | `Select` |
| Collapsible area | `Collapsible` |
| Buttons | `Button` |
| Tooltips | `Tooltip` |

---

## Output Panel Design

### KPI Metric Cards (4)

| Card | Main Value | Secondary Info | Icon |
|------|------------|----------------|------|
| Final Asset | ¥1,006,139 | +906% vs initial | TrendingUp |
| Total Earnings | ¥906,139 | Principal ¥100,000 | PiggyBank |
| Return Multiple | 10.06x | 30 years compound effect | Calculator |
| Doubling Count | 3 times | Doubled in year 9/18/27 | Repeat |

### Main Trend Chart (Recharts LineChart)

```typescript
// Dual-axis line chart config
<LineChart>
  <XAxis dataKey="year" />              // X-axis: Year
  <YAxis yAxisId="left" />              // Left Y: Cumulative asset
  <YAxis yAxisId="right" orientation="right" />  // Right Y: Yearly growth

  <Line yAxisId="left" dataKey="endBalance" stroke="#2563eb" />     // Compound curve (solid, blue)
  <Line yAxisId="left" dataKey="simpleInterest" stroke="#9ca3af" strokeDasharray="5 5" />  // Simple interest (dashed, gray)
  <Line yAxisId="left" dataKey="principal" stroke="#f59e0b" />      // Principal baseline (orange)
  <Line yAxisId="right" dataKey="yearlyGrowth" stroke="#10b981" />  // Yearly growth (green)

  <Tooltip />                           // Hover details
  <Legend />                            // Legend
</LineChart>
```

### Earnings Pie Chart (Recharts PieChart)

| Sector | Data | Color |
|--------|------|-------|
| Principal | totalPrincipal | #3b82f6 (blue) |
| Earnings | totalInterest | #10b981 (green) |

Hover shows exact amount and percentage.

### Yearly Data Table

| Column | Width | Align | Format |
|--------|-------|-------|--------|
| Year | 60px | Center | Integer |
| Start Balance | auto | Right | Thousands |
| Yearly Interest | auto | Right | Thousands |
| Additional | auto | Right | Thousands |
| End Balance | auto | Right | Thousands, **bold** |
| Growth % | 80px | Right | Percentage |

Table features:
- Default shows all years, can toggle 5/10 year intervals
- Highlight doubling years (background color)
- Click chart year to scroll to corresponding row

---

## Data Persistence & Sharing

### URL Parameter Sharing

```typescript
// URL encoding scheme
// Example: /zh/tools/compound-interest?p=100000&r=4&y=30&f=m&a=1000&af=y&as=1

interface URLParams {
  p: number;   // principal
  r: number;   // rate
  y: number;   // years
  f: string;   // frequency (y/q/m/d)
  a?: number;  // additional (optional)
  af?: string; // additionalFrequency (optional)
  as?: number; // additionalStart (optional)
}

// Encode/decode utility functions
const encodeParams = (input: CalculatorInput): string => { ... }
const decodeParams = (search: string): Partial<CalculatorInput> => { ... }
```

### Share Interaction Flow

```
User clicks "Share" button
       ↓
Generate full URL with parameters
       ↓
Copy to clipboard + Toast "Link copied"
       ↓
(Optional) Show QR code modal
```

### LocalStorage History

```typescript
// Storage structure
interface HistoryEntry {
  id: string;              // UUID
  timestamp: number;       // Save timestamp
  name?: string;           // User-defined name (optional)
  input: CalculatorInput;  // Full input parameters
  summary: Summary;        // Calculation summary
}

// Storage key
const STORAGE_KEY = 'compound-interest-history';

// Limit: Max 10 entries
// Auto-delete oldest when exceeded
```

### History UI

- Located at bottom of input panel, collapsed
- Expanded shows history list (time + summary)
- Supports: Load, delete, clear all
- Loading auto-fills input and recalculates

---

## Internationalization (i18n)

### Translation Structure

Extend existing `src/utils/i18n.ts` translations object:

```typescript
// Add compoundInterest namespace
compoundInterest: {
  // Page title
  title: '复利计算器',
  subtitle: '见证时间与复利的力量',

  // Input labels
  inputs: {
    principal: '初始投资金额',
    annualRate: '年收益率',
    years: '投资年限',
    compoundFrequency: '复利频率',
    additionalAmount: '定期追加金额',
    additionalFrequency: '追加频率',
    additionalStartYear: '追加开始年份',
  },

  // Frequency options
  frequency: {
    yearly: '年度',
    quarterly: '季度',
    monthly: '月度',
    daily: '日度',
  },

  // KPI cards
  kpi: {
    finalAmount: '最终资产',
    totalReturn: '总收益',
    returnMultiple: '累计收益倍数',
    doublingCount: '翻倍次数',
    comparedToInitial: '相比初始增长',
    principalAmount: '本金',
    doublingYears: '第 {years} 年翻倍',
  },

  // Charts
  chart: {
    compoundLine: '复利增长',
    simpleLine: '单利增长',
    principalLine: '本金',
    yearlyGrowth: '年增长额',
  },

  // Table
  table: {
    year: '年份',
    startBalance: '年初余额',
    interest: '年度利息',
    additional: '追加本金',
    endBalance: '年末余额',
    growthRate: '年增长%',
  },

  // Action buttons
  actions: {
    share: '分享',
    reset: '重置',
    copied: '链接已复制',
    history: '历史记录',
    loadHistory: '加载',
    clearHistory: '清空',
  },

  // Documentation titles
  docs: {
    whatIsCompound: '什么是复利',
    formula: '复利计算公式',
    howToUse: '如何使用本计算器',
    keyPoints: '关键要点',
    importance: '复利的重要性',
  },
}
```

### Currency & Number Formatting

```typescript
// Auto-select currency symbol and format based on language
const formatCurrency = (value: number, locale: SupportedLocale) => {
  const config = {
    zh: { currency: 'CNY', symbol: '¥' },
    en: { currency: 'USD', symbol: '$' },
    ja: { currency: 'JPY', symbol: '¥' },
  };

  return new Intl.NumberFormat(localeDateLocales[locale], {
    style: 'currency',
    currency: config[locale].currency,
    maximumFractionDigits: 0,
  }).format(value);
};
```

---

## Documentation Section

### Document Structure

Documentation uses collapsible Accordion component, all collapsed by default.

### Content Outline

**1. What is Compound Interest**
> Compound interest is a calculation method where investment returns are reinvested to generate additional returns. Unlike simple interest, compound interest creates a "snowball effect" that grows exponentially over time.

**2. Compound Interest Formula**
```
A = P × (1 + r/n)^(n×t)

A = Final amount
P = Initial principal
r = Annual rate (decimal)
n = Compounds per year
t = Investment years
```

**3. How to Use This Calculator**
- Enter initial investment amount
- Set expected annual rate
- Choose investment years and compound frequency
- (Optional) Set periodic additional investment
- View charts and table results

**4. Key Points**
- Rule of 72: Divide 72 by annual rate to estimate doubling time
- Time is the most important factor, start early
- Higher compound frequency increases returns (but difference is usually small)
- Regular additional investment significantly accelerates wealth accumulation

**5. Importance of Compound Interest**
- Einstein quote (disputed but widely shared)
- Long-term investment vs short-term speculation
- Real case: 30 years at 7% annual return

### Responsive Design

| Device | Layout |
|--------|--------|
| Desktop | 2-column Accordion, side by side |
| Tablet/Mobile | 1-column Accordion, vertical stack |

### shadcn/ui Component

Use `Accordion` component:
```tsx
<Accordion type="multiple" className="w-full">
  <AccordionItem value="what-is-compound">
    <AccordionTrigger>{t.docs.whatIsCompound}</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  ...
</Accordion>
```

---

## File Structure & Dependencies

### New File Structure

```
src/
├── components/
│   └── tools/
│       └── compound-interest/
│           ├── CompoundInterestCalculator.tsx   # Main component entry
│           ├── InputPanel.tsx                   # Input panel container
│           ├── BasicInputs.tsx                  # Basic parameter inputs
│           ├── AdditionalInputs.tsx             # Additional investment inputs
│           ├── ActionButtons.tsx                # Share/reset buttons
│           ├── OutputPanel.tsx                  # Output panel container
│           ├── KPICards.tsx                     # Metric cards group
│           ├── TrendChart.tsx                   # Trend line chart
│           ├── EarningsPieChart.tsx             # Earnings pie chart
│           ├── DataTable.tsx                    # Yearly data table
│           ├── HistoryPanel.tsx                 # History panel
│           ├── DocumentSection.tsx              # Bottom documentation
│           └── hooks/
│               ├── useCalculator.ts             # Core calculation logic
│               ├── useShareURL.ts               # URL encode/decode
│               └── useLocalHistory.ts           # LocalStorage operations
├── pages/
│   └── [lang]/
│       └── tools/
│           └── compound-interest.astro          # Page entry
└── utils/
    └── i18n.ts                                  # Add compoundInterest translations
```

### New Dependencies

```bash
# Tailwind CSS + config
pnpm add tailwindcss @tailwindcss/vite

# shadcn/ui dependencies
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react                    # Icon library
pnpm add @radix-ui/react-accordion       # Accordion
pnpm add @radix-ui/react-collapsible     # Collapsible
pnpm add @radix-ui/react-select          # Select
pnpm add @radix-ui/react-tooltip         # Tooltip
pnpm add @radix-ui/react-toast           # Toast

# React integration
pnpm add @astrojs/react react react-dom

# Chart library
pnpm add recharts

# Utility library
pnpm add uuid                            # Generate history IDs
```

### Astro Config Update

```javascript
// astro.config.mjs
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    react(),
    // ... existing integrations
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

---

## Implementation Priority & v2 Roadmap

### v1 Implementation Order

| Phase | Task | Complexity |
|-------|------|------------|
| 1 | Environment setup (Tailwind, React, shadcn/ui) | Low |
| 2 | Core calculation hook `useCalculator.ts` | Medium |
| 3 | Basic input panel `BasicInputs.tsx` | Low |
| 4 | KPI metric cards `KPICards.tsx` | Low |
| 5 | Main trend chart `TrendChart.tsx` | Medium |
| 6 | Earnings pie chart `EarningsPieChart.tsx` | Low |
| 7 | Yearly data table `DataTable.tsx` | Medium |
| 8 | Additional investment inputs `AdditionalInputs.tsx` | Low |
| 9 | URL share feature `useShareURL.ts` | Low |
| 10 | LocalStorage history `useLocalHistory.ts` | Low |
| 11 | i18n translations (zh/en/ja) | Medium |
| 12 | Bottom documentation `DocumentSection.tsx` | Low |
| 13 | Responsive adaptation & testing | Medium |

### v2 Feature Roadmap

| Feature | Description | Priority |
|---------|-------------|----------|
| Comparison Mode | Support Plan A/B/C comparison | High |
| PDF Export | Using html2canvas + jsPDF | Medium |
| Scenario Presets | Retirement, down payment, startup templates | Medium |
| Inflation Adjustment | Real return = nominal return - inflation | Medium |
| CSV/Excel Export | Table data export | Low |
| Risk Levels | Conservative/balanced/aggressive rate presets | Low |
| Goal Calculator | Reverse calculation: years/principal needed for goal | Low |

### Performance Considerations

| Optimization | Strategy |
|--------------|----------|
| Calculation Debounce | 500ms delay after input change |
| Chart Rendering | Use `useMemo` to cache data transformation |
| Large Table | Enable virtual scrolling for >50 years |
| Code Splitting | Dynamic import Recharts, reduce initial bundle |

### Accessibility (a11y)

- All inputs have associated `label`
- Charts provide `aria-label` text description
- Color contrast meets WCAG AA standards
- Keyboard navigation support

---

## Appendix: i18n Full Translation Keys

See `src/utils/i18n.ts` for complete translation implementation in zh/en/ja.
