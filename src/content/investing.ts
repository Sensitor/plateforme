/**
 * "Learn to invest" track: classic investing education (compounding, risk,
 * stocks, bonds, ETFs, allocation, DCA, moving averages, behaviour), the
 * second axis of the Academy next to the crypto tracks. Educational content
 * only, never personalised advice or buy/sell signals. Same rules as the
 * crypto lessons: no live market figures in the text (the live charts render
 * provider data with source and timestamp), facts traceable to the sources.
 */
import type { Concept, ConceptDeep } from "./concepts";

/** Suggested order through the track, from why to invest to how to stay the course. */
export const INVESTING_PATH = ["compound-interest", "risk-and-return", "investment-horizon", "stocks", "bonds", "etfs", "asset-allocation", "dca", "moving-averages", "behavioural-biases"];

export const INVESTING_CONCEPTS: Concept[] = [
  {
    slug: "compound-interest",
    title: "Compound interest",
    category: "investing",
    level: "beginner",
    summary: "Returns that earn returns: why time is the most powerful input of any long-term plan.",
    body: [
      "Compounding happens when the gains of one period are added to the capital and earn gains themselves in the next period. A sum growing at 7% a year does not add the same amount each year: it adds 7% of an ever larger base, so the curve bends upwards.",
      "The rule of 72 gives a quick feel for it: divide 72 by the annual rate to estimate how many years it takes to double. At 6% a year, money doubles in about 12 years; at 9%, in about 8.",
      "Compounding works in both directions. Fees, inflation and debt interest compound too, which is why a small annual cost can take a large share of the final result over decades.",
    ],
    keyTakeaways: ["Gains earn gains: growth accelerates with time", "Starting early often matters more than the exact rate", "Costs and inflation compound as well"],
    related: ["investment-horizon", "etfs", "dca"],
  },
  {
    slug: "risk-and-return",
    title: "Risk and return",
    category: "investing",
    level: "beginner",
    summary: "Higher expected returns come with wider swings and deeper losses along the way, and volatility quietly reduces compound growth.",
    body: [
      "In finance, risk usually means uncertainty: how widely an investment's results can vary around what you expect, including the chance of losing money. Assets that have offered higher long-run returns, such as stocks, have also shown larger and more frequent falls than cash or high-quality bonds.",
      "That extra return is often described as a reward for bearing risk. It is not guaranteed: it is an average over long periods, and any given year, or decade, can disappoint.",
      "Volatility also has a mathematical cost. Losing 50% requires a gain of 100% to get back to the start, so two investments with the same average annual return can end at very different values if one swings more than the other.",
    ],
    keyTakeaways: ["No expected return without risk", "The average return is not what you earn", "Swings reduce compound growth"],
    related: ["drawdowns", "asset-allocation", "investment-horizon"],
  },
  {
    slug: "investment-horizon",
    title: "Investment horizon",
    category: "investing",
    level: "beginner",
    summary: "How long the money can stay invested shapes how much risk it can carry: the longer the horizon, the narrower the range of average outcomes.",
    body: [
      "Your investment horizon is the time until you need the money. Money needed next year cannot wait for a recovery after a crash; money set aside for twenty years can, in principle, ride out several downturns.",
      "Over longer periods, good and bad years tend to offset each other, so the range of average yearly returns narrows. The range of final amounts, however, stays wide: the horizon reduces the uncertainty of the average rate, not the uncertainty of the outcome.",
      "Investor education from regulators starts with the same question. The AMF distinguishes three horizons, short term under three years, medium term from three to ten and long term beyond ten, and stresses that each calls for different investments.",
    ],
    keyTakeaways: ["Horizon means when you need the money", "Long horizons smooth the average, not the outcome", "One goal, one horizon"],
    related: ["risk-and-return", "compound-interest", "asset-allocation"],
  },
  {
    slug: "stocks",
    title: "Stocks",
    category: "investing",
    level: "beginner",
    summary: "A share is a slice of ownership in a company: its return comes from dividends, profit growth and the price the market is willing to pay for those profits.",
    body: [
      "A share (or stock) gives you part ownership of a company. As an owner you have a claim on its future profits, which the company either pays out as dividends or reinvests to grow, and usually a vote at general meetings.",
      "Over long periods, a stock's return can be broken into three parts: the dividends received, the growth of profits per share, and the change in the valuation multiple, that is, how many years of profits the market is willing to pay for.",
      "In the short run, prices are driven mostly by changing expectations and sentiment; in the long run, by profits. A single company can fail entirely, which is why most investors hold many of them, often through funds.",
    ],
    keyTakeaways: ["A share is part of a business", "Return comes from dividends, profit growth and the change in valuation", "A single stock is a concentrated risk"],
    related: ["etfs", "risk-and-return", "asset-allocation"],
  },
  {
    slug: "bonds",
    title: "Bonds",
    category: "investing",
    level: "beginner",
    summary: "A bond is a loan to a government or a company: it pays interest, returns the capital at maturity, and its price moves opposite to interest rates.",
    body: [
      "When you buy a bond, you lend money to an issuer: a state, a city or a company. In return you usually receive regular interest payments, called coupons, and the face value back on the maturity date, provided the issuer does not default.",
      "Bonds trade before maturity, and their price moves with interest rates. If new bonds pay more than yours, nobody will pay full price for your lower coupon, so its price falls. The longer the maturity, the larger the move.",
      "High-quality government bonds have historically been less volatile than stocks and have sometimes risen when stocks fell, which is why they are a common stabiliser in a portfolio. Lower-rated issuers pay more interest to compensate for a higher risk of default.",
    ],
    keyTakeaways: ["A bond is a loan with a schedule", "Rates up, prices down", "Longer maturity, bigger price swings"],
    related: ["asset-allocation", "risk-and-return", "rwa-tokenization"],
  },
  {
    slug: "etfs",
    title: "ETFs and index funds",
    category: "investing",
    level: "beginner",
    summary: "An ETF is a fund traded on an exchange like a share; index ETFs track a whole market at low cost, which puts broad diversification within anyone's reach.",
    body: [
      "An exchange-traded fund (ETF) pools money from many investors and holds a basket of assets, such as the shares of hundreds of companies. Each ETF share represents part ownership of that basket, and it trades on a stock exchange throughout the day like an ordinary share.",
      "Most ETFs follow an index: they aim to replicate a benchmark, such as a broad stock market index, rather than trying to beat it. Because no team is paid to pick securities, their annual fees (the expense ratio) are usually much lower than those of actively managed funds.",
      "Index investing rests on a simple observation: after fees, most active funds have trailed their benchmark over long periods. Not every ETF is broad or simple, though: some track a single sector, use leverage or follow a single asset, and carry the risks that come with it.",
    ],
    keyTakeaways: ["One share, a whole basket", "Index ETFs replicate, they do not pick", "Fees compound: check the expense ratio"],
    related: ["stocks", "compound-interest", "asset-allocation"],
  },
  {
    slug: "asset-allocation",
    title: "Asset allocation",
    category: "investing",
    level: "intermediate",
    summary: "How you split money between stocks, bonds, cash and other assets sets most of a portfolio's risk; rebalancing keeps that split on target.",
    body: [
      "Asset allocation is the division of a portfolio between broad asset classes such as stocks, bonds and cash. Because these classes behave differently, the mix largely determines how much the portfolio can grow and how far it can fall.",
      "There is no single right mix. It depends on the horizon, on the financial ability to bear losses, and on the willingness to live through them without abandoning the plan. A useful exercise is to ask which share of the portfolio you could see fall by half without changing course.",
      "Over time, the assets that rise most grow beyond their target weight, and the portfolio drifts towards more risk. Rebalancing, selling some of what has grown and buying what has lagged, brings it back to the chosen mix, either on a schedule or when weights drift past a threshold.",
    ],
    keyTakeaways: ["The mix sets the risk", "Choose it from horizon and tolerance", "Rebalance to stay on target"],
    related: ["diversification", "bonds", "investment-horizon"],
  },
  {
    slug: "dca",
    title: "Dollar-cost averaging (DCA)",
    category: "investing",
    level: "beginner",
    summary: "Investing the same amount at regular intervals, whatever the price: a discipline that smooths entry points and removes the need to time the market.",
    body: [
      "Dollar-cost averaging (DCA), or programmed investing, means investing a fixed amount at regular intervals, for example every month, regardless of the price. When prices are low, the same amount buys more units; when they are high, it buys fewer.",
      "Its main benefit is behavioural: it turns investing into a habit, avoids putting everything in just before a fall, and removes the temptation to wait for the perfect moment. It fits naturally with investing part of each salary.",
      "It is not a free lunch. FINRA notes that spreading out a sum you already have lowers risk but often produces lower returns than investing it at once, especially over long periods. DCA also does not protect against losses if prices fall for a long time.",
    ],
    keyTakeaways: ["Fixed amount, fixed schedule", "Buys more when prices are low", "Less regret, not higher returns by default"],
    related: ["compound-interest", "behavioural-biases", "moving-averages"],
  },
  {
    slug: "moving-averages",
    title: "Moving averages and the 200-week line",
    category: "investing",
    level: "intermediate",
    summary: "A moving average smooths prices to show the trend. Bitcoin's weekly closes have rarely fallen below their 200-week average, which is why that line is so widely watched.",
    body: [
      "A simple moving average is the average of the last N closing prices, recalculated at each new close. It smooths out noise and shows the direction of the trend, at the cost of lagging behind the price.",
      "Analysts use different windows for different horizons: 50 or 200 days for stocks and, for Bitcoin, the 200-week average, about four years, which spans roughly one halving cycle. Bitcoin's weekly closes have rarely fallen below it, and those periods coincided with the deepest points of past bear markets.",
      "A moving average describes the past; it does not forecast. Some investors read a price below the 200-week average as a relative discount, but prices have stayed below it for months, and an asset that changes in nature or size may not behave as it did before.",
    ],
    keyTakeaways: ["A smoothed view of the trend", "It lags by construction", "Below the 200-week line has been rare for Bitcoin, not impossible"],
    related: ["market-cycles", "halving", "dca"],
  },
  {
    slug: "behavioural-biases",
    title: "Behavioural biases",
    category: "investing",
    level: "beginner",
    summary: "Loss aversion, overconfidence, herding and other mental shortcuts lead investors to buy high, sell low and trade too much. Simple rules help.",
    body: [
      "Behavioural finance studies how real investors depart from rational decisions. Kahneman and Tversky's prospect theory showed that people feel losses roughly twice as strongly as equivalent gains, which pushes them to sell winners too early and hold losers too long.",
      "Other well-documented biases include overconfidence (overestimating one's skill, which leads to excessive trading), herding (following the crowd into popular assets), recency bias (expecting recent trends to continue) and confirmation bias (seeking information that supports what we already believe).",
      "Biases cannot be switched off, but their effects can be limited with rules decided in advance: a written plan, automatic contributions, a target allocation with periodic rebalancing, and a pause before any decision taken under strong emotion.",
    ],
    keyTakeaways: ["Losses hurt about twice as much as gains please", "The crowd and recent trends pull us off course", "Rules set in advance beat willpower"],
    related: ["fear-and-greed", "market-cycles", "dca"],
  },
];

export const INVESTING_DEEP: Record<string, ConceptDeep> = {
  "compound-interest": {
    minute:
      "Compound interest means your returns start producing returns of their own. Over a few years the effect is modest; over decades it dominates, so that most of the final amount can come from growth rather than from what you put in. Time, regularity and low costs are the levers you control.",
    steps: [
      { title: "Capital earns a return", text: "In year one, a sum earning 5% grows by 5% of the starting amount. So far this is simple interest." },
      { title: "The return is reinvested", text: "Instead of withdrawing the gain, you leave it invested. Next year's 5% applies to the larger total, including last year's gain." },
      { title: "Growth on growth", text: "Each year adds a little more than the year before. After 10 years at 5%, the total is about 1.63 times the start; after 30 years, about 4.3 times." },
      { title: "Contributions add fuel", text: "Regular contributions each start their own compounding. Early contributions have the most time to grow, which is why starting early matters so much." },
      { title: "Costs and inflation compound too", text: "A yearly fee or inflation rate works like a negative return. Over 20 years, the difference between a 7% and a 5% yearly return leaves you with about a third less at the end." },
    ],
    visual: "compound",
    visualCaption: "Try it: change the rate, the monthly contribution and the duration. The grey band is what you put in, the coloured band is growth on top. Illustrative rates, not a forecast.",
    example: {
      projects: [],
      title: "Two savers, ten years apart",
      paragraphs: [
        "Imagine two people who invest the same yearly amount at an illustrative 7% a year. The first invests from age 25 to 35, then stops and lets the money grow. The second starts at 35 and keeps investing every year until 65: three times as many contributions.",
        "At 65, the first saver ends up with about 105 times the yearly amount, the second with about 94 times. The first contributed a third as much and still finished ahead, because those early contributions had thirty to forty years to compound.",
        "The exact figures depend entirely on the assumed rate, but the shape does not. The Strategies page applies the same logic to real prices: its DCA simulator shows how regular purchases of Bitcoin or Ethereum would have grown, each one compounding, or shrinking, from its own date.",
      ],
    },
    metrics: [
      { label: "Rate net of costs", read: "What actually compounds is the return left after fees, taxes and inflation. Compare options on that basis." },
      { label: "Time invested", read: "The exponent of the formula. Doubling the duration more than doubles the growth." },
      { label: "Doubling time", read: "72 divided by the yearly rate gives the years needed to double: a quick way to feel the difference between two rates." },
      { label: "Share of growth in the final amount", read: "Final value minus contributions, as a share of the final value. The longer the horizon, the larger it becomes." },
    ],
    misconceptions: [
      { myth: "A higher rate always beats starting early.", reality: "Over long horizons, extra years of compounding often matter more than a point or two of return, as the two savers show." },
      { myth: "Compounding only applies to savings accounts.", reality: "It applies to any reinvested return, dividends, interest or price gains, and also to fees, inflation and debt." },
      { myth: "A small yearly fee is negligible.", reality: "A fee compounds every year. Over decades, the gap between a low-cost and a high-cost product can reach a large share of the final amount." },
    ],
    risks: [
      "Assuming a steady rate: real returns vary widely from year to year and can be negative for long stretches.",
      "Ignoring inflation, which reduces what the final amount can buy.",
      "Interrupting compounding by withdrawing gains or selling during a downturn.",
      "Carrying high-interest debt, which compounds against you faster than most investments compound for you.",
    ],
    quiz: [
      {
        question: "Using the rule of 72, roughly how long does money take to double at 8% a year?",
        options: ["About 4 years", "About 9 years", "About 14 years", "About 20 years"],
        answer: 1,
        explanation: "72 divided by 8 is 9. The rule is an approximation that works well for usual rates, roughly between 4% and 12%.",
      },
      {
        question: "Why do early contributions weigh so much in the final amount?",
        options: ["They are taxed less", "They have the most years to compound", "Markets always rise at the start", "Banks pay more to new clients"],
        answer: 1,
        explanation: "Each contribution compounds from its own date, so the first ones benefit from the longest stretch of growth.",
      },
      {
        question: "Two funds hold the same assets; one charges 0.2% a year, the other 2%. What happens over 30 years?",
        options: ["Nothing important, fees are small", "The gap grows every year because fees compound", "The expensive fund catches up later", "Both end with the same amount"],
        answer: 1,
        explanation: "The fee difference is applied every year to a growing base, so the gap between the two keeps widening.",
      },
    ],
    sources: [
      { title: "Compound Interest Calculator", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
      { title: "Compound interest (glossary)", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest" },
      { title: "Rule of 72", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Rule_of_72" },
      { title: "Compound interest", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Compound_interest" },
    ],
  },

  "risk-and-return": {
    minute:
      "Risk is the range of outcomes you might face, not just the chance of a loss. Investments with higher expected returns have historically swung more and fallen further. And because gains and losses compound, a volatile path ends lower than a steady one with the same average: the difference is called volatility drag.",
    steps: [
      { title: "Expected return", text: "What an investment is expected to earn on average over time. It is an estimate, not a promise, and it says nothing about the path." },
      { title: "Volatility", text: "How much returns vary around their average, usually measured by the standard deviation of yearly or monthly returns. A higher number means wider swings." },
      { title: "Drawdown", text: "The fall from a previous peak. It captures what investors actually live through: how deep the losses went and how long recovery took." },
      { title: "The risk premium", text: "Investors demand a higher expected return to hold assets that can fall a lot. That premium is why stocks have historically earned more than cash, and why they can lose heavily in a crisis." },
      { title: "Volatility drag", text: "A gain of 10% followed by a loss of 10% leaves you 1% below where you started. The more an asset swings, the more its compound return falls below its simple average." },
    ],
    visual: "volatility-drag",
    visualCaption: "Try it: both paths have the same average yearly return. Increase the swings and watch the volatile path end lower. Illustrative returns.",
    example: {
      projects: ["bitcoin"],
      title: "Same average, different result",
      paragraphs: [
        "Take two illustrative investments that both average +10% a year over two years. The first gains 10% each year. The second gains 60% in year one and loses 40% in year two. Both average +10%, but the first has grown by 21% while the second has lost 4%.",
        "Crypto assets make this concrete. The Bitcoin drawdown chart in the Academy shows falls of more than 70% from a previous peak in past cycles. Recovering from such a fall takes a gain of several hundred percent, which is why volatility and drawdowns matter as much as headline returns.",
        "None of this makes volatile assets bad. It means their expected return must be judged together with the swings they impose, and with your ability to hold through them.",
      ],
    },
    metrics: [
      { label: "Annualised volatility", read: "The standard deviation of returns scaled to a year. Useful to compare assets, but it understates the risk of rare crashes." },
      { label: "Maximum drawdown", read: "The worst peak-to-trough fall over a period. The honest question is whether you could hold through it." },
      { label: "Compound annual growth rate", read: "The steady rate that would turn the starting value into the final one: the return you actually earned, lower than the simple average when returns vary." },
      { label: "Time to recover", read: "How long the investment took to regain its previous peak. Long recoveries test patience as much as depth does." },
    ],
    misconceptions: [
      { myth: "Risk only means losing money.", reality: "Risk is the uncertainty of outcomes. An investment can miss your goal without ever showing a loss, for example if it lags inflation." },
      { myth: "An average return of 10% means you earned 10% a year.", reality: "With volatile returns, the compound rate you actually earned is lower than the simple average." },
      { myth: "Low past volatility means safe.", reality: "Some risks, such as default, a liquidity freeze or inflation, do not show up in past volatility until they happen." },
    ],
    risks: [
      "Estimating risk from a calm period and being surprised by the next crisis.",
      "Taking more risk than you can hold through, then selling at the bottom.",
      "Concentrating in one asset whose volatility dominates the whole portfolio.",
      "Mistaking leverage for skill: borrowing magnifies both returns and drawdowns.",
    ],
    quiz: [
      {
        question: "An investment gains 50%, then loses 50%. Where does it end?",
        options: ["Back where it started", "25% below the start", "25% above the start", "50% below the start"],
        answer: 1,
        explanation: "1.5 times 0.5 is 0.75: a quarter below the starting value, even though the simple average return is zero.",
      },
      {
        question: "What does volatility measure?",
        options: ["The fees of an investment", "How widely returns vary around their average", "The probability of a dividend", "The trading volume"],
        answer: 1,
        explanation: "Volatility is usually the standard deviation of returns: the wider the swings, the higher it is.",
      },
      {
        question: "Why have stocks historically earned more than cash?",
        options: ["Because governments guarantee them", "Because investors demand a premium for bearing their larger swings and losses", "Because they never fall for long", "Because their fees are lower"],
        answer: 1,
        explanation: "The higher expected return compensates for risk, which is exactly why it is not guaranteed over any given period.",
      },
    ],
    sources: [
      { title: "What is Risk?", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/what-risk" },
      { title: "Risk", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investing-basics/risk" },
      { title: "Rendements et risques des placements financiers", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/risques-et-rendements-des-placements" },
      { title: "Geometric mean", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Geometric_mean" },
    ],
  },

  "investment-horizon": {
    minute:
      "Your horizon is how long the money can stay invested before you need it. Short horizons leave no time to recover from a fall, so they call for stable assets. Long horizons let good and bad years offset each other, which narrows the range of average returns, though the range of final amounts stays wide.",
    steps: [
      { title: "Name the goal", text: "Each sum has a purpose: an emergency reserve, a home deposit in five years, retirement in thirty. The purpose sets the date." },
      { title: "Keep a safety buffer", text: "Money that may be needed at any moment, such as a few months of expenses, belongs in cash or equivalent, so that a market fall never forces a sale." },
      { title: "Match risk to time", text: "The shorter the horizon, the less room for assets that can lose a third of their value in a year. The longer the horizon, the more a temporary fall can be waited out." },
      { title: "Watch the range narrow", text: "With independent yearly returns, the spread of the average yearly return shrinks with the square root of time: four times longer, half the spread." },
      { title: "Plan the exit", text: "As the date approaches, moving gradually towards stable assets protects the result from a late crash, a danger known as sequence risk." },
    ],
    visual: "horizon",
    visualCaption: "Try it: the band shows where the average yearly return would land in 9 cases out of 10 for an illustrative asset. It narrows with time, but never to a single number. Model assumptions, not a forecast.",
    example: {
      projects: [],
      title: "One household, three horizons",
      paragraphs: [
        "Consider a household with three goals: a reserve for emergencies, a home deposit in four years and retirement in thirty. Treating them as one pot would either leave the deposit exposed to a crash or keep the retirement money idle for decades.",
        "Split by horizon, the reserve sits in a savings account, the deposit in low-volatility assets that are unlikely to drop much in four years, and the retirement money in a diversified portfolio that can absorb several bad years along the way.",
        "Crypto assets, with past falls of more than 70%, are the extreme case: they only fit money with a long horizon, in a share you could see shrink sharply without changing your plans.",
      ],
    },
    metrics: [
      { label: "Date of need", read: "When the money will be used. Without a date, no level of risk can be judged suitable." },
      { label: "Emergency reserve", read: "Several months of essential expenses held in cash, so that investments never have to be sold in a hurry." },
      { label: "Worst past drawdown of the asset", read: "Compare it with the horizon: could the asset recover from such a fall before you need the money?" },
      { label: "Money near its exit date", read: "Sums needed within a few years but still held in volatile assets are the main source of forced selling." },
    ],
    misconceptions: [
      { myth: "Over the long term, stocks cannot lose.", reality: "Long horizons improve the odds; they do not remove risk. Japan's main stock index took 34 years to regain its 1989 record high." },
      { myth: "All my money has the same horizon.", reality: "Each goal has its own date. Mixing them leads to too much risk for short goals or too little for long ones." },
      { myth: "A long horizon means I can ignore my investments.", reality: "It allows patience during falls, but the allocation still needs reviewing as goals change and the exit date approaches." },
    ],
    risks: [
      "Needing the money during a downturn and selling at a loss.",
      "Sequence risk: a crash just before or at the start of withdrawals weighs far more than one decades earlier.",
      "Holding long-term money in cash and losing purchasing power to inflation.",
      "Overestimating the horizon: life events can bring the date of need forward.",
    ],
    quiz: [
      {
        question: "You need a sum in 18 months for a home deposit. Which approach fits that horizon?",
        options: ["Mostly volatile assets for a higher return", "Stable assets whose value is unlikely to drop much", "A single cryptocurrency", "Leveraged products"],
        answer: 1,
        explanation: "With 18 months, there may be no time to recover from a fall, so stability matters more than potential return.",
      },
      {
        question: "What narrows as the horizon lengthens?",
        options: ["The range of final amounts", "The range of average yearly returns", "The fees", "The inflation rate"],
        answer: 1,
        explanation: "Good and bad years offset each other, so the average yearly return varies less. The range of final amounts stays wide.",
      },
      {
        question: "What is sequence risk?",
        options: ["The risk of buying in the wrong order", "The risk that a crash happens just before or during withdrawals", "The risk of a broker failing", "The risk of missing a dividend"],
        answer: 1,
        explanation: "Losses close to the date of need hurt most, because little time and capital are left to recover.",
      },
    ],
    sources: [
      { title: "Avant de souscrire : bien connaître son horizon de placement", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/cadrer-son-projet/fixer-son-horizon-de-placement" },
      { title: "Five Questions to Ask Before You Invest", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/getting-started/five-questions-ask-you-invest" },
      { title: "Risk", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investing-basics/risk" },
      { title: "Nikkei 225", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Nikkei_225" },
    ],
  },

  stocks: {
    minute:
      "Owning a share means owning a small part of a business and its future profits. Over time, what you earn comes from dividends, from profit growth and from what the market is willing to pay for those profits. In the short run, that last ingredient dominates and prices can swing widely.",
    steps: [
      { title: "The company raises capital", text: "When a company lists on a stock exchange, it sells shares to the public. After that, shares change hands between investors on the market." },
      { title: "Profits are earned", text: "The company sells goods or services. What remains after costs, interest and taxes is its profit, which belongs to shareholders." },
      { title: "Paid out or reinvested", text: "Management returns part of the profit through dividends or share buybacks and reinvests the rest to grow future profits." },
      { title: "The market sets a price", text: "Investors pay a multiple of profits, the price-to-earnings ratio (P/E). Optimism raises it and fear lowers it, often by more than profits change." },
      { title: "Your return", text: "Total return combines dividends and the change in price. Over long periods, profit growth and dividends have typically done most of the work; over months, changes in the multiple dominate." },
    ],
    visual: "stock-returns",
    visualCaption: "Try it: build a stock's yearly return from its three ingredients, and see how a change in the valuation multiple can outweigh years of profit growth. Illustrative inputs.",
    example: {
      projects: [],
      title: "Same company, different price",
      paragraphs: [
        "Imagine a company whose profits per share grow 6% a year for ten years, with a 2% dividend yield. If investors pay 20 times profits at the start and still 20 times at the end, the yearly return is roughly 8%: profit growth plus dividends.",
        "Now suppose the multiple falls from 30 to 15 over the same ten years. The share price ends about 10% below where it started and the yearly return drops to around 1%, even though the business did exactly as well.",
        "This is why analysts look at valuation as well as quality, and why the same discipline runs through Sensitor's crypto research: a token's market value can run far ahead of the activity behind it, as the market cap and FDV lesson shows.",
      ],
    },
    metrics: [
      { label: "Earnings per share (EPS)", read: "Profit divided by the number of shares. Its growth over the years is the engine of long-run returns." },
      { label: "Price-to-earnings ratio (P/E)", read: "Share price divided by EPS: how many years of current profits the market is paying. Compare it with the company's history and its sector." },
      { label: "Dividend yield", read: "Yearly dividends divided by the share price. Part of the return, though a very high yield can signal a dividend at risk." },
      { label: "Debt and cash flow", read: "How much the company borrows and how much cash it really generates. Profits without cash, or heavy debt, raise the risk of losses." },
    ],
    misconceptions: [
      { myth: "A low share price means a cheap stock.", reality: "The price per share depends on how many shares exist. Value is judged by comparing the price with profits, cash flow or assets." },
      { myth: "A great company is always a great investment.", reality: "If the price already assumes years of strong growth, a merely good outcome can disappoint shareholders." },
      { myth: "Stock prices follow profits closely.", reality: "In the short run, sentiment and interest rates move valuation multiples far more than profits change." },
    ],
    risks: [
      "Company-specific failure: a single stock can lose most or all of its value.",
      "Valuation risk: buying when multiples are high leaves little room for disappointment.",
      "Concentration in one sector or country that falls as a block.",
      "Trading too often, paying costs and reacting to noise rather than to the business.",
    ],
    quiz: [
      {
        question: "What does owning a share give you?",
        options: ["A loan to the company with fixed interest", "Part ownership of the company and a claim on its profits", "A guaranteed dividend", "A right to the company's products"],
        answer: 1,
        explanation: "A shareholder owns part of the business. Dividends are decided by the company and are never guaranteed.",
      },
      {
        question: "A company's profits rise but its share price falls. What is a likely explanation?",
        options: ["The company must be hiding something", "Investors now pay a lower multiple of profits", "Shares always fall after profits are published", "The dividend was too high"],
        answer: 1,
        explanation: "The price is profits times the multiple. If the multiple falls faster than profits rise, the price drops.",
      },
      {
        question: "Over long periods, which ingredients have typically driven most of stock returns?",
        options: ["Changes in the valuation multiple only", "Profit growth and dividends", "Share splits", "Trading volume"],
        answer: 1,
        explanation: "Multiples swing a lot but tend to come back; over decades, profit growth and dividends do most of the work.",
      },
    ],
    sources: [
      { title: "Stocks", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks" },
      { title: "Stocks", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investment-products/stocks" },
      { title: "Investir en actions", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/actions-obligations/actions" },
      { title: "Earnings per share", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Earnings_per_share" },
      { title: "Dividend", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dividend" },
    ],
  },

  bonds: {
    minute:
      "A bond is a loan: you receive interest along the way and your capital back at maturity, if the borrower pays. Before maturity, its price moves opposite to interest rates, and the longer the bond, the bigger the move. Credit quality decides how much extra interest you earn for the risk of default.",
    steps: [
      { title: "The issuer borrows", text: "A government or company issues bonds with a face value, a coupon rate and a maturity date, for example a ten-year bond paying 3% a year." },
      { title: "You collect coupons", text: "Each year (or half year) the issuer pays interest. At maturity, it repays the face value." },
      { title: "Rates change", text: "If market rates rise to 5%, a new buyer can get 5% elsewhere, so the 3% bond must trade below face value to offer a competitive yield." },
      { title: "Duration measures sensitivity", text: "Duration, in years, approximates the percentage price change for a one-point move in rates. A duration of 8 means about 8% lost if rates rise by one point." },
      { title: "Credit risk", text: "Rating agencies grade issuers. Lower ratings pay higher yields because the risk of missed payments is higher; after a default, investors may recover only part of their money." },
    ],
    visual: "bond-price",
    visualCaption: "Try it: move the market yield and watch the bond's price respond. Longer maturities react more. Illustrative bond with yearly coupons.",
    example: {
      projects: [],
      title: "When rates rose quickly",
      paragraphs: [
        "In 2022, central banks raised interest rates rapidly to fight inflation. Prices of existing long-dated government bonds fell sharply, and many bond funds had one of their worst years on record, at the same time as stocks fell.",
        "Investors who held individual high-quality bonds to maturity still received every coupon and their capital back: the losses were in market value, not in payments. Those who had to sell before maturity, or who held long-duration funds, felt the full price drop.",
        "The same mechanics now reach crypto: tokenised Treasury funds and the reserves behind major stablecoins hold short-term government debt, chosen precisely because short maturities move little when rates change. The RWA tokenization lesson explains how.",
      ],
    },
    metrics: [
      { label: "Yield to maturity", read: "The yearly return if you buy at today's price and hold to maturity with every payment made. It moves opposite to the price." },
      { label: "Duration", read: "Sensitivity to interest rates, in years. A higher duration means larger price swings when rates move." },
      { label: "Credit rating", read: "The agencies' view of the issuer's ability to pay. Below investment grade means a higher yield and a higher risk of default." },
      { label: "Yield versus inflation", read: "A bond yielding less than inflation loses purchasing power, even if every payment arrives." },
    ],
    misconceptions: [
      { myth: "Bonds cannot lose money.", reality: "Their market price falls when rates rise, and issuers can default. Holding a high-quality bond to maturity limits the loss to the effect of inflation." },
      { myth: "Bonds always rise when stocks fall.", reality: "Often, but not always: in 2022, both fell together because rising rates hit both." },
      { myth: "A higher yield is simply better.", reality: "A high yield usually signals more credit risk or a longer maturity, so a larger potential loss." },
    ],
    risks: [
      "Interest rate risk: long maturities can lose a lot when rates rise.",
      "Credit risk: the issuer may miss payments or default.",
      "Inflation risk: fixed payments buy less when prices rise.",
      "Liquidity risk: some bonds are hard to sell quickly at a fair price.",
    ],
    quiz: [
      {
        question: "Interest rates rise. What happens to the price of an existing fixed-rate bond?",
        options: ["It rises", "It falls", "It stays at face value", "It doubles"],
        answer: 1,
        explanation: "New bonds pay more, so the older, lower coupon is worth less and its price falls until its yield matches the market.",
      },
      {
        question: "Which holding is the most sensitive to a change in rates?",
        options: ["A one-year bond", "A thirty-year bond", "A money market fund", "A savings account"],
        answer: 1,
        explanation: "The longer the maturity, and so the duration, the more distant payments are revalued, and the bigger the price move.",
      },
      {
        question: "Why does a lower-rated company pay a higher interest rate?",
        options: ["Because it is more profitable", "To compensate lenders for a higher risk of default", "Because regulators require it", "Because its bonds are shorter"],
        answer: 1,
        explanation: "Lenders demand extra yield for the risk that coupons or the capital might not be paid.",
      },
    ],
    sources: [
      { title: "Bonds", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds" },
      { title: "Bonds", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investment-products/bonds" },
      { title: "Investir dans les obligations", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/actions-obligations/obligations" },
      { title: "Bond duration", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Bond_duration" },
      { title: "Yield to maturity", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Yield_to_maturity" },
    ],
  },

  etfs: {
    minute:
      "An ETF lets you buy a whole basket of assets in a single trade. Index ETFs simply follow a market, which keeps costs low and diversification broad. Because fees compound against you every year, the expense ratio is one of the few things in investing that you fully control.",
    steps: [
      { title: "An index is defined", text: "An index provider publishes a list of securities and their weights, for example the largest companies of a country weighted by market value." },
      { title: "The fund replicates it", text: "The ETF buys the securities in the index, or a representative sample, or uses a swap, so that its value follows the benchmark." },
      { title: "Shares trade on an exchange", text: "Investors buy and sell ETF shares through a broker, at market prices, throughout the trading day." },
      { title: "Creation and redemption", text: "Specialised institutions, called authorised participants, create or redeem ETF shares in large blocks, which keeps the market price close to the value of the holdings." },
      { title: "Fees are deducted", text: "The expense ratio is taken from the fund's assets every year. It shows up as slightly lower performance than the index, not as a separate bill." },
    ],
    visual: "etf-fees",
    visualCaption: "Try it: compare two funds holding the same market with different yearly fees. The gap between the lines is the cost of fees compounding. Illustrative return.",
    example: {
      projects: ["bitcoin"],
      title: "The cost of a percentage point",
      paragraphs: [
        "Take two funds that hold exactly the same assets and earn the same illustrative 6% a year before fees. One charges 0.2% a year, the other 1.8%. After 30 years, the low-cost fund has grown about 5.4 times; the expensive one about 3.4 times.",
        "More than a third of the final amount went to fees, for exactly the same exposure. This is why regulators such as the SEC and the AMF insist that investors look at costs before buying a fund.",
        "Crypto now has its own exchange-traded products: the spot Bitcoin ETFs approved in the United States in January 2024 hold bitcoin on behalf of their shareholders. The Bitcoin dossier covers what they changed for access to the asset and for the concentration of holdings.",
      ],
    },
    metrics: [
      { label: "Expense ratio", read: "The yearly fee as a percentage of assets. For broad index ETFs it is often a small fraction of a percent; compare similar funds on this basis." },
      { label: "Tracking difference", read: "How far the fund's return was from its index over a year. It captures fees and replication costs together." },
      { label: "Index and holdings", read: "What the fund actually owns: how many securities, which countries and sectors, and how much the largest positions weigh." },
      { label: "Size and trading spread", read: "Large, frequently traded funds usually have narrow bid-ask spreads, so buying and selling costs less." },
    ],
    misconceptions: [
      { myth: "All ETFs are diversified.", reality: "Some track a single sector, a theme, a commodity or even one stock, and carry concentrated risk." },
      { myth: "An index fund cannot lose much.", reality: "It follows its market down as well as up. A broad stock index can fall by a third or more in a crisis." },
      { myth: "ETFs are made for short-term trading.", reality: "They can be traded during the day, but most investors use broad, low-cost ETFs to hold a market for years." },
    ],
    risks: [
      "Market risk: the fund falls with its index.",
      "Concentration risk in narrow, thematic or single-asset ETFs.",
      "Leveraged and inverse ETFs, built for short holding periods, can drift far from the index over time.",
      "Counterparty risk in synthetic ETFs that replicate the index through swaps.",
    ],
    quiz: [
      {
        question: "What does one share of an index ETF represent?",
        options: ["A loan to the fund manager", "Part ownership of a basket that follows an index", "One share of the largest company in the index", "A guaranteed return equal to the index"],
        answer: 1,
        explanation: "Each share is a slice of the whole portfolio, which is built to follow the benchmark.",
      },
      {
        question: "Why do index ETFs usually charge less than active funds?",
        options: ["Exchanges subsidise them", "They replicate an index instead of paying a team to pick securities", "They pay no taxes", "They hold fewer securities"],
        answer: 1,
        explanation: "Following a published index is cheaper to run than researching and selecting securities.",
      },
      {
        question: "Two ETFs track the same index; one costs 0.1% a year, the other 1%. What should you expect over 20 years?",
        options: ["The same result", "A growing gap in favour of the cheaper fund", "The expensive fund to do better", "No difference, because fees are charged only once"],
        answer: 1,
        explanation: "Fees are taken every year from a growing base, so the cost difference compounds.",
      },
    ],
    sources: [
      { title: "Exchange-Traded Funds (ETFs)", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-2" },
      { title: "Exchange-Traded Funds and Products", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products" },
      { title: "Ce qu'il faut savoir sur les ETF avant d'investir", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/placements-collectifs/trackers-etf" },
      { title: "Quel est l'impact des frais sur le rendement annuel espéré de mon placement ?", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/lexique-simulateurs-et-outils-pratiques/nos-simulateurs/quel-est-limpact-des-frais-sur-le-rendement-annuel-espere-de-mon-placement" },
      { title: "Index fund", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Index_fund" },
    ],
  },

  "asset-allocation": {
    minute:
      "Asset allocation is the decision of how much to put in each broad type of asset. It does more to set a portfolio's risk and long-run return than the choice of any single investment. Once set, the mix drifts with markets, so it needs rebalancing from time to time.",
    steps: [
      { title: "List the building blocks", text: "Stocks for long-run growth, bonds for income and stability, cash for liquidity, and possibly other assets such as real estate or crypto, each with its own risk." },
      { title: "Start from the goal", text: "The horizon and the loss you could bear set the share of volatile assets. A long horizon and a high tolerance allow more; a near-term goal calls for less." },
      { title: "Combine assets that differ", text: "Assets that do not move together reduce the swings of the whole, so the portfolio is less volatile than the average of its parts." },
      { title: "Watch the drift", text: "After a strong year for stocks, a mix that started at 60% stocks might reach 70%, quietly raising the risk." },
      { title: "Rebalance", text: "Return to the target on a fixed schedule, such as once a year, or when a weight moves more than a set number of points. New contributions can also go to the assets that lag." },
    ],
    visual: "allocation",
    visualCaption: "Try it: change the mix and see how the expected return, the volatility and a bad year move together. Illustrative long-run assumptions, not forecasts.",
    example: {
      projects: [],
      title: "Where crypto fits in a mix",
      paragraphs: [
        "Because crypto assets have shown yearly swings several times larger than those of broad stock indices, even a small allocation can account for a large share of a portfolio's ups and downs. A position of a few percent can move the whole portfolio noticeably in a strong or a bad year.",
        "Sensitor's Portfolio page makes this visible for your own holdings: allocation by asset and sector, concentration and correlations between positions. It describes the portfolio; it does not say what the right mix is, which depends on each person's situation.",
        "The same rebalancing logic applies: after a large rally, a crypto position can outgrow its intended share, and rebalancing back to target means taking some gains; after a crash, it means adding to what has fallen.",
      ],
    },
    metrics: [
      { label: "Share of volatile assets", read: "The percentage in stocks, crypto and other assets that can fall sharply. It is the main dial of portfolio risk." },
      { label: "Drift from target", read: "The gap between current and target weights. Beyond a few points, the portfolio no longer carries the risk you chose." },
      { label: "Fall in a bad year", read: "How much the whole mix could lose in a severe year, rather than each asset taken separately." },
      { label: "Correlation between holdings", read: "Whether the assets tend to move together. Lower correlation makes diversification more effective." },
    ],
    misconceptions: [
      { myth: "Picking the right stocks matters more than the mix.", reality: "For most portfolios, the split between asset classes drives most of the variation in risk." },
      { myth: "A balanced portfolio never loses much.", reality: "It falls less than a pure stock portfolio, but stocks and bonds can fall together, as they did in 2022." },
      { myth: "Rebalancing means timing the market.", reality: "It follows a rule set in advance and requires no forecast: it simply restores the chosen level of risk." },
    ],
    risks: [
      "Holding a mix too aggressive for the horizon, then selling during a crash.",
      "Letting the portfolio drift for years until it carries far more risk than intended.",
      "Missing hidden concentration, such as several funds holding the same large companies.",
      "Assuming past correlations will hold in the next crisis.",
    ],
    quiz: [
      {
        question: "A portfolio targets 60% stocks and 40% bonds. After a strong rally it holds 72% stocks. What does rebalancing do?",
        options: ["Buys more stocks", "Sells some stocks and buys bonds to return to 60/40", "Sells everything", "Waits for a crash"],
        answer: 1,
        explanation: "Rebalancing restores the chosen mix, and with it the chosen level of risk.",
      },
      {
        question: "What mainly determines a portfolio's overall risk?",
        options: ["The number of trades", "The split between asset classes", "The broker used", "The day of the week you invest"],
        answer: 1,
        explanation: "Stocks, bonds and cash carry very different risks, so their proportions set most of the portfolio's behaviour.",
      },
      {
        question: "Why can a small crypto allocation weigh heavily on a portfolio's swings?",
        options: ["Because crypto pays high fees", "Because its volatility is several times that of broad stock indices", "Because crypto cannot be rebalanced", "Because it always moves with bonds"],
        answer: 1,
        explanation: "A small weight multiplied by a very high volatility can still contribute a large share of the total risk.",
      },
    ],
    sources: [
      { title: "Beginners' Guide to Asset Allocation, Diversification, and Rebalancing", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset" },
      { title: "Asset Allocation and Diversification", publisher: "FINRA", url: "https://www.finra.org/investors/investing/investing-basics/asset-allocation-diversification" },
      { title: "Comment bien diversifier un investissement ?", publisher: "AMF", url: "https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/conseils-pratiques/diversifier-ses-placements" },
      { title: "Asset allocation", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Asset_allocation" },
      { title: "Rebalancing investments", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Rebalancing_investments" },
    ],
  },

  dca: {
    minute:
      "DCA means investing the same amount on a fixed schedule, whatever the price. You buy more units when prices are low and fewer when they are high, which smooths your average cost. It is above all a discipline against bad timing; compared with investing a lump sum at once, it often trades some return for less regret.",
    steps: [
      { title: "Fix an amount and a rhythm", text: "Choose a sum you can invest without strain and a frequency, such as monthly, ideally automated." },
      { title: "Buy whatever the price", text: "Each purchase happens on schedule. There is no forecast to make and no signal to wait for." },
      { title: "More units when prices fall", text: "A fixed amount buys more units at low prices, so falls lower your average cost per unit." },
      { title: "A smoothed average cost", text: "Your average cost per unit ends up at or below the simple average of the prices on your purchase dates, because more units were bought at the lower prices." },
      { title: "Compare with a lump sum", text: "If the money is already available, investing it all at once gives it more time in the market. That has often come out ahead, at the cost of more regret if a fall follows." },
    ],
    visual: "dca-live",
    visualCaption: "Real prices: simulate regular purchases of Bitcoin or Ethereum from the year of your choice and compare with investing the same total on day one. Fees and taxes are ignored.",
    example: {
      projects: ["bitcoin", "ethereum"],
      title: "DCA through a full crypto cycle",
      paragraphs: [
        "The simulator above uses real weekly closing prices. Try a start year that ended near a peak: regular purchases continued through the crash that followed, buying many more units at low prices, and the result depends heavily on where the cycle stands today.",
        "Compare with the line for a lump sum invested on day one. When the starting point was low, the lump sum usually wins; when it was close to a peak, DCA often does better. Neither outcome was knowable in advance, which is the whole point of the discipline.",
        "The worst moment matters as much as the final result: it shows how far below the amount invested the portfolio fell along the way, which is what decides whether a plan can actually be followed.",
      ],
    },
    metrics: [
      { label: "Average cost per unit", read: "Total invested divided by units held. Compare it with the current price to see where you stand." },
      { label: "Return on amount invested", read: "Current value against everything you put in. It reflects the whole path, not just today's price." },
      { label: "Worst moment", read: "The deepest fall of the portfolio value below the sums invested: a measure of how hard the plan was to hold." },
      { label: "Fees per purchase", read: "Fixed fees on small, frequent purchases can eat a large share of each amount. Check them before choosing a frequency." },
    ],
    misconceptions: [
      { myth: "DCA guarantees a profit.", reality: "It smooths the entry price but cannot prevent losses if the asset falls and stays down." },
      { myth: "DCA always beats investing a lump sum.", reality: "When the money is already available, investing it at once has often done better, because markets have tended to rise over time." },
      { myth: "Weekly purchases are much better than monthly ones.", reality: "Over long periods the difference is usually small, while fees per purchase can matter more." },
    ],
    risks: [
      "Long declines: buying regularly into an asset that never recovers still loses money.",
      "Transaction fees that are large relative to each purchase.",
      "Abandoning the plan during a fall, which removes its main benefit.",
      "Applying DCA to a single, highly volatile asset without looking at the overall allocation.",
    ],
    quiz: [
      {
        question: "You invest the same amount every month. Prices fall sharply for a few months. What happens?",
        options: ["You buy fewer units", "You buy more units with the same amount", "Your purchases stop", "Your average cost rises"],
        answer: 1,
        explanation: "A fixed amount buys more units at a lower price, which lowers your average cost.",
      },
      {
        question: "According to FINRA, how does spreading out a sum compare with investing it at once?",
        options: ["It always earns more", "It lowers risk but often earns less, especially over long periods", "It makes no difference", "It is forbidden for retail investors"],
        answer: 1,
        explanation: "Spreading out keeps money in cash for longer, which reduces risk but also reduces time in the market.",
      },
      {
        question: "What is the main strength of DCA?",
        options: ["Predicting the best entry point", "A discipline that removes the need to time the market", "Guaranteed returns", "Lower volatility of the asset itself"],
        answer: 1,
        explanation: "DCA does not change the asset; it changes behaviour, by making purchases automatic and regular.",
      },
    ],
    sources: [
      { title: "Dollar Cost Averaging (glossary)", publisher: "Investor.gov (U.S. SEC)", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging" },
      { title: "The Benefits and Limitations of Dollar-Cost Averaging", publisher: "FINRA", url: "https://www.finra.org/investors/insights/dollar-cost-averaging" },
      { title: "Dollar cost averaging", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dollar_cost_averaging" },
      { title: "API documentation (coin prices used by the simulator)", publisher: "DefiLlama", url: "https://api-docs.defillama.com/" },
    ],
  },

  "moving-averages": {
    minute:
      "A moving average is the average of the last N prices, updated at each close. It smooths out noise to show the trend. Bitcoin's 200-week average, about four years of prices, is one of the most watched: weekly closes below it have been rare and have matched past bear market lows, but it describes history; it is not a signal.",
    steps: [
      { title: "Choose a window", text: "The number of periods to average: 50 or 200 days for a medium or long-term trend, 200 weeks for a full Bitcoin cycle." },
      { title: "Average and roll", text: "At each new close, add the latest price, drop the oldest one and recompute the average." },
      { title: "Read the position", text: "A price above a rising average describes an uptrend; a price below a falling average, a downtrend. The distance in percent shows how stretched the price is." },
      { title: "Accept the lag", text: "Because it averages the past, the line turns only after the price has turned. Longer windows lag more and react less to noise." },
      { title: "Know the variants", text: "Exponential moving averages give more weight to recent prices and react faster. Crossovers between a short and a long average are popular but give false signals in sideways markets." },
    ],
    visual: "wma-live",
    visualCaption: "Real prices: Bitcoin's weekly closes against their 200-week moving average, with the weeks below it shaded in red. The Strategies page lists every period below the line.",
    example: {
      projects: ["bitcoin"],
      title: "Reading the 200-week line without over-reading it",
      paragraphs: [
        "Over the history shown, weeks below the 200-week average have been a small minority, and the 2022 bear market produced a stretch of several months below it. This is why the line is often described as a historical floor.",
        "Some long-term investors therefore watch the distance to the 200-week average as a gauge of how far the price has moved from its long trend, and buy more heavily when the price is below it. That is a personal rule, not a property of the market.",
        "Three cautions apply. The pattern rests on very few cycles; the average rises after strong rallies, so the floor moves; and in 2022 the price stayed below the line for months and kept falling before recovering. The Strategies page lists every period, with its depth.",
      ],
    },
    metrics: [
      { label: "Distance to the average", read: "The percentage gap between the price and the average. In Bitcoin's history, large positive gaps have accompanied euphoric phases and negative ones rare discounts." },
      { label: "Slope of the average", read: "Whether the average itself rises or falls. A rising long-term average describes a long uptrend." },
      { label: "Time below the average", read: "How many consecutive weeks have closed below it. Past periods ranged from a single week to several months." },
      { label: "Share of history below", read: "The proportion of all weeks that closed below the average. A low share means the line has rarely been broken." },
    ],
    misconceptions: [
      { myth: "Below the 200-week average, the price has to go up.", reality: "It has recovered in the past, but the price can keep falling for months, and history may not repeat." },
      { myth: "A moving average predicts the next move.", reality: "It is calculated from past prices only. It describes the trend; it knows nothing about the future." },
      { myth: "The same rule works for every asset.", reality: "Windows and patterns differ by asset. Many tokens have fallen below their long averages and never come back." },
    ],
    risks: [
      "Over-fitting: a rule that matched a few past cycles can fail in the next one.",
      "Lag: the signal comes after the move, sometimes too late to be useful.",
      "False signals in sideways markets, where prices cross the average again and again.",
      "A changing market structure, such as new types of buyers, altering past behaviour.",
    ],
    quiz: [
      {
        question: "Bitcoin closes a week below its 200-week moving average. What can you say for sure?",
        options: ["It will rise next week", "Its price is below the average of its last 200 weekly closes", "The bear market is over", "The average will fall immediately"],
        answer: 1,
        explanation: "That is the only certain fact. Whether the price recovers soon is unknown; in 2022 it stayed below for months.",
      },
      {
        question: "Why does a 200-week average lag the price?",
        options: ["Because exchanges delay their data", "Because it averages about four years of past prices", "Because it uses a log scale", "Because it only counts weekends"],
        answer: 1,
        explanation: "Each new price is only one of 200 values, so the line turns slowly, after the price has turned.",
      },
      {
        question: "What is the main limit of rules based on Bitcoin's 200-week average?",
        options: ["They require expensive data", "They rest on very few past cycles and may not hold in the future", "They only work on stocks", "They are illegal"],
        answer: 1,
        explanation: "A handful of cycles is a tiny sample, and a larger, more mature market may behave differently.",
      },
    ],
    sources: [
      { title: "Moving average", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Moving_average" },
      { title: "Technical analysis", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Technical_analysis" },
      { title: "API documentation (coin price history)", publisher: "DefiLlama", url: "https://api-docs.defillama.com/" },
    ],
  },

  "behavioural-biases": {
    minute:
      "Our brains use shortcuts that serve us well in daily life but mislead us in markets. We fear losses more than we value gains, overrate our own skill, follow the crowd and extrapolate recent trends. The result is buying after rises, selling after falls and trading too much. Rules set in advance are the best defence.",
    steps: [
      { title: "Loss aversion", text: "A loss hurts about twice as much as an equal gain pleases, so investors avoid realising losses and take gains too quickly." },
      { title: "Overconfidence", text: "Most people rate their skill above average. In markets this shows up as frequent trading, which raises costs and often lowers returns." },
      { title: "Herding and fear of missing out", text: "Seeing others profit makes an asset feel both safer and more urgent, which draws investors in late, close to peaks." },
      { title: "Recency and confirmation", text: "Recent returns feel like the new normal, and we look for news that confirms what we already think." },
      { title: "Guard-rails", text: "Automate contributions, write down the target allocation and the reason for each investment, rebalance on a schedule and wait a set time before acting on a strong emotion." },
    ],
    visual: "table",
    visualCaption: "Six common biases, how they show up in a portfolio, and a guard-rail for each.",
    table: {
      columns: ["How it shows up", "A guard-rail"],
      rows: [
        { label: "Loss aversion", values: ["Holding losing positions to avoid realising the loss, selling winners too early", "Set review and exit rules when you buy, not when you are down"] },
        { label: "Overconfidence", values: ["Frequent trading, concentrated bets, ignoring base rates", "Track your decisions and costs, and compare with a simple index"] },
        { label: "Herding", values: ["Buying what has already risen because everyone talks about it", "A waiting period before any unplanned purchase"] },
        { label: "Recency", values: ["Expecting last year's trend to continue indefinitely", "Look at long histories, including full cycles and drawdowns"] },
        { label: "Confirmation", values: ["Reading only sources that agree with your view", "Write down what would prove you wrong, and look for it"] },
        { label: "Anchoring", values: ["Waiting to get back to the price you paid before selling", "Judge a position on its prospects today, not on its purchase price"] },
      ],
    },
    example: {
      projects: [],
      title: "A cycle of emotions in crypto",
      paragraphs: [
        "Crypto markets concentrate these biases. Big rallies draw new investors in near the top, and the steep falls that follow push many to sell near the bottom.",
        "A study by the Bank for International Settlements, based on crypto trading app data from August 2015 to December 2022, found that a majority of app users in nearly all economies made losses on their bitcoin holdings: many had started buying after prices had already risen.",
        "Sensitor's sentiment and market cycle lessons show these phases with real data, and the Strategies page lets you test a rule-based approach such as regular purchases. The aim is not to feel no emotion, but to decide in calm conditions what you will do in stressful ones.",
      ],
    },
    metrics: [
      { label: "Trades per year", read: "A high count, especially right after big market moves, often signals emotion-driven decisions and higher costs." },
      { label: "Gap between plan and portfolio", read: "When the portfolio drifts far from its written target, recent moves are probably driving the decisions." },
      { label: "Your return versus the fund's", read: "Investors in a fund often earn less than the fund itself, because they buy after rises and sell after falls." },
      { label: "Decisions after a sharp move", read: "A simple self-check: how many of your trades came within a day of a sharp rise or fall?" },
    ],
    misconceptions: [
      { myth: "Biases only affect beginners.", reality: "Professionals show them too. Experience helps, but rules and processes protect better than confidence." },
      { myth: "Knowing about a bias is enough to avoid it.", reality: "Awareness helps a little; automatic contributions and rules decided in advance help much more." },
      { myth: "Following the crowd is safe because so many people cannot be wrong.", reality: "Crowds often arrive late, near peaks, and leave together, near bottoms." },
    ],
    risks: [
      "Selling after a crash and missing the recovery.",
      "Concentrating in a popular asset at the height of enthusiasm.",
      "Excessive trading that turns costs and taxes into a major drag.",
      "Rewriting the plan in the middle of a market move.",
    ],
    quiz: [
      {
        question: "According to prospect theory, how do people weigh losses compared with gains of the same size?",
        options: ["Equally", "Losses weigh about twice as much", "Gains weigh twice as much", "Losses are ignored"],
        answer: 1,
        explanation: "Loss aversion explains why investors hold losers too long and sell winners too early.",
      },
      {
        question: "An investor buys a token because its price doubled last month and everyone is talking about it. Which biases are most at work?",
        options: ["Anchoring and home bias", "Herding and recency", "Loss aversion only", "None, it is a rational choice"],
        answer: 1,
        explanation: "Following the crowd and extrapolating recent gains are classic triggers for buying near peaks.",
      },
      {
        question: "Which tool best limits the effect of biases?",
        options: ["Checking prices more often", "Rules decided in advance, such as automatic contributions and scheduled rebalancing", "Following social media closely", "Trading more to gain experience"],
        answer: 1,
        explanation: "Rules set in calm conditions reduce the number of decisions taken under emotion.",
      },
    ],
    sources: [
      { title: "Prospect theory", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Prospect_theory" },
      { title: "Loss aversion", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Loss_aversion" },
      { title: "Disposition effect", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Disposition_effect" },
      { title: "Herd behavior", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Herd_behavior" },
      { title: "Crypto shocks and retail losses (BIS Bulletin No 69)", publisher: "Bank for International Settlements", url: "https://www.bis.org/publ/bisbull69.htm" },
    ],
  },
};
