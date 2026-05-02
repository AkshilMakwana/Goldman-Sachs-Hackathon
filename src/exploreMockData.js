/** Shared Explore / Practice demo instruments — not live market data */

export function parseExplorePrice(priceDisplay) {
  const n = parseFloat(String(priceDisplay).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export const EXPLORE_MOCK_INVESTMENTS = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    category: "Technology",
    price: "$181.20",
    dailyChangePct: 0.47,
    marketCap: "$2.8T",
    week52High: "$237.23",
    week52Low: "$169.21",
    risk: "Medium",
    volatile: false,
    beginnerSummary:
      "Apple designs iPhones, Macs, and services used worldwide. Strong brand loyalty and recurring services revenue help explain why investors study its upgrades cycle closely.",
    newsArticles: [
      {
        title: "Apple services climb as hardware upgrade cadence stabilizes",
        source: "Reuters",
        summary:
          "Analysts highlight recurring subscriptions offsetting uneven handset refreshes heading into holiday quarters.",
      },
      {
        title: "Supply-chain tweaks trim delivery windows for flagship devices",
        source: "Bloomberg",
        summary:
          "Logistics teams cite diversified assembly footprints buffering isolated regional disruptions.",
      },
      {
        title: "EU scrutiny keeps privacy APIs in focus for developers",
        source: "Financial Times",
        summary:
          "Regulators weigh interoperability demands against Apple’s ecosystem control commitments.",
      },
    ],
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "Electric Vehicles",
    category: "Electric Vehicles",
    price: "$248.50",
    dailyChangePct: -3.15,
    marketCap: "$790B",
    week52High: "$389.22",
    week52Low: "$138.80",
    risk: "High",
    volatile: true,
    beginnerSummary:
      "Tesla sells premium EVs and builds charging networks globally. Demand outlooks and autonomous-driving milestones tend to swing sentiment faster than typical automakers.",
    newsArticles: [
      {
        title: "Margin debates intensify after stepped-up promotional leases",
        source: "CNBC",
        summary:
          "Margin watchers fear incentives mask softer underlying demand despite healthy backlog chatter.",
      },
      {
        title: "Battery sourcing roadmap draws scrutiny from EU policymakers",
        source: "Reuters",
        summary:
          "Officials seek clearer disclosures on cobalt alternatives ahead of expanded EV mandates.",
      },
      {
        title: "Robotaxi pilots quietly expand map coverage in warm-weather metros",
        source: "Wall Street Journal",
        summary:
          "Safety drivers remain onboard while telemetry feeds refine routing algorithms nightly.",
      },
    ],
  },
  {
    symbol: "NVDA",
    name: "Nvidia Corporation",
    sector: "Semiconductors",
    category: "Semiconductors & AI",
    price: "$910.30",
    dailyChangePct: 2.65,
    marketCap: "$2.2T",
    week52High: "$974.18",
    week52Low: "$474.62",
    risk: "High",
    volatile: true,
    beginnerSummary:
      "Nvidia sells GPUs powering gaming PCs and AI data centers. Demand cycles can spike when cloud builders refresh fleets or roll out new AI models.",
    newsArticles: [
      {
        title: "Hyperscaler capex commentary lifts AI accelerator optimism",
        source: "Bloomberg",
        summary:
          "Cloud giants reaffirmed multi-year GPU digestion timelines despite cautious CFO hedges.",
      },
      {
        title: "Export licensing chatter rattles shipment forecasts",
        source: "Nikkei Asia",
        summary:
          "Geopolitical observers parsed nuanced carve-outs affecting advanced packaged chips.",
      },
      {
        title: "Liquid cooling startups chase denser rack footprints",
        source: "TechCrunch",
        summary:
          "Thermal startups pitch immersion tooling optimized for ultra-concentrated GPU pods.",
      },
    ],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology & Cloud",
    category: "Technology & Cloud",
    price: "$421.75",
    dailyChangePct: 0.21,
    marketCap: "$3.1T",
    week52High: "$468.35",
    week52Low: "$362.95",
    risk: "Medium",
    volatile: false,
    beginnerSummary:
      "Microsoft blends enterprise software, Azure cloud, and productivity subscriptions that renew steadily across industries.",
    newsArticles: [
      {
        title: "Copilot attach rates quietly climb inside flagship suites",
        source: "Barron's",
        summary:
          "Partners detail SMB bundles layering AI assistants atop productivity staples.",
      },
      {
        title: "Azure backlog commentary underscores hybrid-cloud pragmatism",
        source: "Reuters",
        summary:
          "Executives emphasized sovereign clouds lifting regulated workloads sooner than predicted.",
      },
      {
        title: "Activision integration milestones reassure multiplayer roadmap watchers",
        source: "IGN Business",
        summary:
          "Studios reiterated catalog synergies without forcing premature SKU overlaps.",
      },
    ],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    sector: "Consumer / Cloud",
    category: "Consumer / Cloud",
    price: "$178.25",
    dailyChangePct: -0.82,
    marketCap: "$1.85T",
    week52High: "$242.52",
    week52Low: "$161.38",
    risk: "Medium",
    volatile: false,
    beginnerSummary:
      "Amazon mixes enormous retail logistics with AWS cloud profit pools—two engines that react differently when consumers tighten belts versus enterprises migrate workloads.",
    newsArticles: [
      {
        title: "Fulfillment robotics rollout trims regional handling costs",
        source: "Reuters",
        summary:
          "Centers cite denser shelving pods shaving seconds per pick without compromising SLAs.",
      },
      {
        title: "AWS wins sizable sovereign-cloud modernization pact",
        source: "Bloomberg",
        summary:
          "Agencies prioritized isolated regions mirroring classified workloads previously on-prem.",
      },
      {
        title: "Streaming bundles experiment with sports-lite packaging",
        source: "Variety",
        summary:
          "Programmers tested curated bundles balancing churn reduction against royalty stacks.",
      },
    ],
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    sector: "Crypto",
    category: "Crypto",
    price: "$67,200",
    dailyChangePct: -4.2,
    marketCap: "$1.3T",
    week52High: "$108,268",
    week52Low: "$53,717",
    risk: "Very High",
    volatile: true,
    beginnerSummary:
      "Bitcoin is a decentralized digital asset traded globally around the clock—liquidity can vanish briefly during exchange stress.",
    newsArticles: [
      {
        title: "ETF flow symmetry breaks after macro pivot headlines",
        source: "CoinDesk",
        summary:
          "Issuers noted uneven creations suggesting discretionary traders trimming leverage.",
      },
      {
        title: "Mining profitability hinges on stranded-energy partnerships",
        source: "Bloomberg Crypto",
        summary:
          "Operators cite stranded flare deals cushioning hash-price downdrafts modestly.",
      },
      {
        title: "Stablecoin transparency pushes spur issuer attest cadence",
        source: "Decrypt",
        summary:
          "Auditors experimented with shorter-interval proofs amid regulator benchmarking exercises.",
      },
    ],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    sector: "Crypto",
    category: "Crypto",
    price: "$3,420",
    dailyChangePct: 1.95,
    marketCap: "$410B",
    week52High: "$4,878",
    week52Low: "$2,083",
    risk: "Very High",
    volatile: true,
    beginnerSummary:
      "Ethereum powers smart-contract apps and staking yields evolve with network upgrades—gas fees still fluctuate with congestion.",
    newsArticles: [
      {
        title: "Layer-two throughput milestones quietly absorb meme-cycle spikes",
        source: "The Block",
        summary:
          "Rollup operators credited batched proofs smoothing settlement bursts overnight.",
      },
      {
        title: "Restaking dashboards warn on correlated slash vectors",
        source: "Messari Research",
        summary:
          "Analysts modeled correlated validator faults stressing novelty derivatives overlays.",
      },
      {
        title: "EU sandbox cohort experiments with programmable escrow clauses",
        source: "Ledger Insights",
        summary:
          "Pilots explored deterministic payouts contingent on oracle-fed KPI attestations.",
      },
    ],
  },
  {
    symbol: "VOO",
    name: "S&P 500 ETF",
    sector: "Broad Market ETF",
    category: "Broad Market ETF",
    price: "$470.10",
    dailyChangePct: 0.18,
    marketCap: "$1.2T",
    week52High: "$491.08",
    week52Low: "$422.41",
    risk: "Low-Medium",
    volatile: false,
    beginnerSummary:
      "VOO tracks hundreds of large U.S. companies—helpful when you want diversified equity exposure instead of picking individual names.",
    newsArticles: [
      {
        title: "Passive giants vacuum incremental 401(k) flows",
        source: "Morningstar",
        summary:
          "Plan sponsors favored ultra-low-cost core sleeves amid fiduciary benchmarking refreshes.",
      },
      {
        title: "Quarterly rebalance trims overweight mega-cap tilt modestly",
        source: "ETF.com",
        summary:
          "Index committees executed measured trims aligning with updated float methodologies.",
      },
      {
        title: "Retail SIP pipelines steady despite headline volatility",
        source: "Reuters",
        summary:
          "Micro-investing platforms cited autopilot allocations cushioning sentiment swings.",
      },
    ],
  },
  {
    symbol: "QQQ",
    name: "Nasdaq 100 ETF",
    sector: "Growth ETF",
    category: "Growth ETF",
    price: "$438.60",
    dailyChangePct: 0.62,
    marketCap: "$300B",
    week52High: "$454.52",
    week52Low: "$378.94",
    risk: "Medium",
    volatile: false,
    beginnerSummary:
      "QQQ concentrates on large Nasdaq-listed innovators—growth-oriented but typically bumpier than broad U.S. indexes.",
    newsArticles: [
      {
        title: "Mega-cap magnificence masks median constituent drawdowns",
        source: "Bloomberg ETF",
        summary:
          "Analysts flagged dispersion widening beneath headline index resilience prints.",
      },
      {
        title: "Options overlays hedge gamma shocks during earnings clusters",
        source: "MarketWatch",
        summary:
          "Structured desks marketed collars cushioning concentrated holder swings.",
      },
      {
        title: "Retail thematic proxies rotate toward AI-adjacent suppliers",
        source: "Seeking Alpha",
        summary:
          "Forum chatter emphasized niche semiconductor capital equipment linkage trades.",
      },
    ],
  },
];
