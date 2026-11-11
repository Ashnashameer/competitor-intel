# EDGE – Competitor Intelligence Hub
### Comprehensive Technical & Strategic Architecture Briefing

> **Purpose of this document:**  
> This briefing provides a complete, 360-degree architectural, functional, and data breakdown of the **EDGE Competitor Intelligence Hub**. It is structured so that any engineer, analyst, or AI model (including ChatGPT/Claude) can understand how every file, component, data pipeline, and workflow in the project connects.

---

## 1. Executive Summary & Product Vision

### 1.1 What is EDGE?
**EDGE** is an enterprise-grade **Competitor Intelligence & Market Research Platform** developed under the **MYST Initiative**. It is engineered to monitor, analyze, and benchmark technology education, AI curriculum, robotics training, and digital skills providers across **Kerala and India**.

### 1.2 Core Mission
The platform enables strategic decision-makers, academic directors, and product teams to:
1. **Track 51 Competitor Profiles**: Gain exhaustive visibility into competitor business models, service offerings, delivery formats, and pricing.
2. **Audit School & College MoUs**: Inspect verified public institutional partnerships, curriculum delivery deals, and technology lab rollouts.
3. **Analyze Multi-Sector Players**: Differentiate between **External Service / Curriculum Providers** and **Educational Institutions Themselves**.
4. **Benchmark Strategic Positioning**: Compare market rivals head-to-head across pedagogy, geographic coverage (all 14 Kerala districts), tech stacks, and fee structures.
5. **Spot Market White Spaces**: Identify underserved districts, target classes (K-12, Higher Secondary, Higher Ed, Corporate), and high-growth niches (e.g., Prompt Engineering, GenAI, IoT).

---

## 2. Technical Stack & Architecture

| Layer | Technology | Key Capabilities & Details |
| :--- | :--- | :--- |
| **Framework** | **React 18** | Functional components, custom hooks, `useMemo`, `useCallback`, `useEffect` |
| **Build Tool** | **Vite 6** | Ultra-fast HMR, Rollup production bundling, code-splitting |
| **Styling** | **Tailwind CSS v4** | Custom color systems, geometric font utilities (`Outfit`, `Plus Jakarta Sans`, `Inter`), CSS Grid, Flexbox, backdrop-blur |
| **Icons** | **Lucide React** | 1,000+ optimized SVG icons used across navigation, badges, and metrics |
| **State Layer** | **React Context API** | Unified `DataContext` providing global CRUD operations and caching |
| **Persistence** | **Browser `localStorage`** | Auto-syncs custom additions, edits, and deletions with instant fallback to immutable seed datasets |
| **Routing** | **Hash-Based Router** | Browser history-friendly hash navigation (`#welcome`, `#categories`, `#schools`, `#colleges`, `#corporate`, `#other_partnerships`, `#profile-[id]`, `#overview`, `#compare`, `#activities`) |
| **CI / CD** | **GitHub Actions** | Automated build verification and deployment to GitHub Pages on push to `main` |

---

## 3. System Architecture & Component Connection Map

```
index.html (Fonts, Assets & Preload)
  └── src/main.jsx
        └── src/context/DataContext.jsx (Global State & localStorage Sync)
              └── src/App.jsx (Hash Router & State Coordinator)
                    ├── 1. WelcomePage.jsx (4K Cinematic Landing Hero)
                    ├── 2. CompetitorCategoriesPage.jsx (4 Sector Gateway Cards)
                    ├── 3. CategoryCompetitorListPage.jsx (Schools, Colleges, Corporate, Other)
                    ├── 4. OrganisationProfilePage.jsx (360° Comprehensive Dossier)
                    ├── 5. CyberSquareDashboard.jsx (Flagship Market Leader Dossier)
                    ├── 6. OverviewDashboard.jsx (Executive Analytics & Heatmaps)
                    ├── 7. CompetitorComparison.jsx (Head-to-Head Benchmarking)
                    ├── 8. CompetitorActivityTracker.jsx (Timeline of Market Moves)
                    ├── 9. CompetitiveStrategyModule.jsx (SWOT & Defensibility Matrices)
                    ├── 10. MarketTrendsModule.jsx (Industry Trends & Opportunities)
                    ├── 11. CompetitorDirectory.jsx (Legacy 5-Segment Master Directory)
                    ├── Header.jsx (Breadcrumbs, Stats & Global Search)
                    ├── Sidebar.jsx (Persistent Nav & Sector Quick-Jumps)
                    ├── ExcelSlicersPanel.jsx (Enterprise Multi-Filter Drawer)
                    └── Modals (AddEditCompetitorModal.jsx / EvidenceModals)
```

---

## 4. Complete Data Layer Breakdown

The data layer is located in `src/data/` and is designed with relational integrity:

### 4.1 Primary Datasets
1. **`seedData.js`** (`SEED_ORGANISATIONS`):
   - **51 Comprehensive Competitor Dossiers**: Contains full metadata for each competitor (e.g., Cyber Square, TinkerHub, Inker Robotics, Keltron, Avodha, Eduex, GTech MuLearn, Unique World Robotics, De-Lead, etc.).
   - Schema per organisation includes: id, name, logoText, segment, entityNature, entityNatureLabel, city, district, state, website, yearEstablished, teamSize, studentReach, institutionPartnershipsCount, services, techStack, feeModel, swotAnalysis, and schoolPartnerships.
2. **`categoryRelationships.js`**:
   - Manages relational links between the 51 competitors and the **4 Market Categories**.
   - Contains:
     - `isSchoolPartnerVerified(org)`: Validates whether a competitor has confirmed public evidence of Kerala school partnerships.
     - `getCategoryPartnershipMetrics(org, categoryId)`: Returns verified partnership counts, delivery models, and confidence levels.
     - `getCompetitorSkillCategories(org)`: Maps competitors to skill domains (e.g., Coding & AI, STEM & Robotics, Soft Skills).
3. **`partnershipClassificationData.js`**:
   - Maps each organisation into external service providers vs. educational institutions.
   - Supports multi-category cross-listing.
4. **`strategicIntelligenceData.js`**:
   - **`COMPETITIVE_STRATEGY_DATA`**: Battlecards, defensibility scores, market positioning, target demographics.
   - **`COMPETITOR_ACTIVITIES_DATA`**: Live chronological feed of market moves.
   - **`MARKET_TRENDS_DATA`**: Macro industry trends.
5. **`schoolResearchData.js`**:
   - Deep-dive school database across all 14 Kerala districts.

---

## 5. Walkthrough of Main Views & User Journeys

### 5.1 Welcome & Landing Page (`WelcomePage.jsx`)
- **Visual Identity**: Premium dark cinematic environment (`#070314` deep cobalt / royal violet) featuring a 4K background artwork of a strategist interacting with digital intelligence HUD screens.
- **Hero Statement**: High-contrast, bold typography:
  - **`COMPETITOR`** and **`INTEL`** rendered with a luminous lavender-to-purple gradient.
  - Balanced kerning (`0.015em`) ensuring `E` and `T` have clean, non-colliding letterforms.
  - Tagline: *"Know Your Competition. See Beyond the Market."* in crisp, high-contrast white.
- **Actions**:
  - `Explore Directory →` (navigates to `#categories`).
  - `Compare Rivals` (navigates to `#compare`).
  - Keyboard shortcut: Pressing Enter launches directly into the platform.

### 5.2 4-Sector Categories Gateway (`CompetitorCategoriesPage.jsx`)
Acts as the central directory hub, displaying 4 structured gateway cards:
1. **Schools**: K-12, CBSE, ICSE, and Higher Secondary coding, AI curriculum, and robotics partners.
2. **Colleges & Universities**: Higher education engineering, arts, and management institutional MoUs.
3. **Corporate**: B2B corporate upskilling, automation, and enterprise workforce training.
4. **Other Partnerships**: NGOs, Kerala Government bodies (ASAP Kerala, KSUM), and independent skill centres.

### 5.3 Category Competitor Directory (`CategoryCompetitorListPage.jsx`)
Provides a scannable index of all competitors within a selected sector:
- **Card View & Table View Toggle**: Seamless switching between battlecard grid and dense tabular data.
- **Smart Sorting (Verified First)**:
  - **In School Partner Directory**: All **14 verified partners** (Avodha, Eduex, Inker Robotics, Keltron, TinkerHub, etc.) are rendered first in rich lavender battlecards (`bg-gradient-to-br from-[#f3e8ff]/90 via-[#ede0fa] to-[#e6d3f8]`).
  - **Unverified competitors** (e.g., *AiBonic Innovations*, *YM Innovations*) are placed at the end in clean white cards with an explicit `"NOT PUBLICLY VERIFIED"` badge.
- **Deep Multi-Dimensional Filters**: Filter by District (14 Kerala districts), Skill Category (Technical vs. Non-Technical), Delivery Mode (Offline, Hybrid, Online), Target Classes, and Entity Nature.
- **One-Click Dossier Entry**: Clicking any card or table row launches the competitor's 360° profile.

### 5.4 Dedicated Organisation Dossier (`OrganisationProfilePage.jsx`)
The complete intelligence dossier for any of the 51 competitors:
- Hero lockup, executive summary, verified institutional footprints, curriculum breakdown, commercial fee models, interactive SWOT grid, and hardware/software tech stacks.

### 5.5 Flagship Competitor Deep-Dive: Cyber Square (`CyberSquareDashboard.jsx`)
Dedicated analytical module for market benchmark **Cyber Square**:
- Detailed district penetration matrix across Kerala, UAE, and GCC markets.
- In-depth syllabus breakdown (Coding, AI, Python, Scratch, Web Dev).
- Head-to-head positioning against MYST EDGE initiatives.

### 5.6 Executive Overview Dashboard (`OverviewDashboard.jsx`)
- Macro KPI scorecard, geographic distribution bar charts across all 14 Kerala districts, sector proportion donuts, and recently audited competitor quick-links.

### 5.7 Competitor Head-to-Head Comparison (`CompetitorComparison.jsx`)
- Allows selecting any 2 or 3 competitors simultaneously with side-by-side benchmarking across 15+ metrics.

### 5.8 Activity Tracker (`CompetitorActivityTracker.jsx`)
- Interactive chronological feed of recent competitor initiatives, marketing pushes, school tie-ups, workshop announcements, and press releases.

### 5.9 Excel Slicers Analytical Panel (`ExcelSlicersPanel.jsx`)
- Slide-out enterprise drawer mimicking Microsoft Excel / PowerBI slicers for real-time cross-filtering.

---

## 6. State Management & Lifecycle (`DataContext.jsx`)

- **Hydration**: On initial boot, `DataContext` reads from browser `localStorage` (`edge_competitor_organisations`). If empty, it seeds from `SEED_ORGANISATIONS`.
- **Mutation**: Any edit made via `AddEditCompetitorModal` updates React state and writes to `localStorage`.
- **Fail-Safe**: Includes a `"Reset to Factory Defaults"` trigger that flushes `localStorage` and restores the original seed datasets.

---

## 7. Routing & URL Navigation Map

| Hash Route | Rendered Component | View Description |
| :--- | :--- | :--- |
| `""` or `#welcome` | `<WelcomePage />` | 4K Cinematic Hero Landing Page |
| `#categories` | `<CompetitorCategoriesPage />` | 4-Sector Gateway Selector |
| `#schools` | `<CategoryCompetitorListPage categoryId="schools" />` | School Partner Directory (Verified First) |
| `#colleges` | `<CategoryCompetitorListPage categoryId="colleges" />` | College & University Partners Directory |
| `#corporate` | `<CategoryCompetitorListPage categoryId="corporate" />` | Corporate Upskilling Directory |
| `#other_partnerships` | `<CategoryCompetitorListPage categoryId="other_partnerships" />` | NGOs & Govt Skill Centers Directory |
| `#profile-[id]` | `<OrganisationProfilePage org={org} />` | Complete 360° Competitor Profile Dossier |
| `#overview` | `<OverviewDashboard />` | Executive Intelligence Command Center |
| `#compare` | `<CompetitorComparison />` | Multi-Competitor Side-by-Side Comparison |
| `#strategy` | `<CompetitiveStrategyModule />` | Defensibility, Battlecards & SWOT Plays |
| `#activities` | `<CompetitorActivityTracker />` | Live Timeline of Competitor Moves |
| `#trends` | `<MarketTrendsModule />` | Industry & Policy Trends (NEP 2020) |
| `#all-competitors` | `<CompetitorDirectory />` | Unfiltered Master Database |

---

## 8. Build, Verification & Deployment Pipeline

- **Local Development**: `npm run dev` (Boots Vite dev server at `http://localhost:5173`)
- **Production Build**: `npm run build` (Generates production artifacts in `dist/`)
- **Deployment**: Automated via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.
