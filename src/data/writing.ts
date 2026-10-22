export type PostSection = { heading?: string; paragraphs?: string[]; list?: string[] };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  project?: string; // related project slug
  sections: PostSection[];
};

export const POSTS: Post[] = [
  {
    slug: "matching-10-million-business-records",
    title: "Matching 10 million business records: what worked in the Amazon ML Challenge",
    summary:
      "How our team got from 0.927 to 0.964 F0.5 by fixing recall first, letting records pick entities, and judging every match against its rivals.",
    date: "2026-10-01",
    readMinutes: 5,
    project: "amazon-ml",
    sections: [
      {
        paragraphs: [
          "The task in the Amazon ML Challenge 2026 was entity resolution: decide which records from two noisy sources belong to which of 2.2 million businesses in a third. About 10.3 million records, names in English and Indic scripts, French addresses that only appeared in the test set, and plenty of deliberate decoys.",
          "Our team, Team Minutes, finished with a best public leaderboard score of 0.964 macro F0.5. These are the four ideas that moved the score most.",
        ],
      },
      {
        heading: "1. You can't match what you never compare",
        paragraphs: [
          "Comparing every pair is impossible at this size, so the first step is blocking: build an inverted index on name tokens, prefixes, address pieces and house numbers, and only compare records that share a key.",
          "The trap is measuring blocking on a sample. A sample hides crowding, because common names have far fewer neighbours. We always queried validation entities against the full 10.3 million-record pool, which made the recall number honest.",
        ],
      },
      {
        heading: "2. Let records choose entities too",
        paragraphs: [
          "Forward blocking (each entity keeps its top 50 records) left good matches buried behind similar-looking candidates. Adding reverse blocking, where each record also proposes its top 10 entities, lifted full-density recall from 94.2% to 97.1%.",
        ],
      },
      {
        heading: "3. Judge a match against its competitors",
        paragraphs: [
          "A pairwise model looks at one entity and one record at a time. That is exactly what decoys exploit: same address, name changed by one syllable.",
          "Our second-stage model looked at how each record scored against every entity that retrieved it: the margin to the best rival, its rank, how many entities wanted it. The margin became the single most important feature, and each record was then assigned to at most one owner.",
        ],
      },
      {
        heading: "4. Tune for the metric you are scored on",
        paragraphs: [
          "F0.5 rewards precision more than recall, so we picked the decision threshold by grid search on a held-out set of 25,000 entities. The curve was flat between 0.60 and 0.75, which told us the model was stable rather than lucky.",
        ],
      },
      {
        heading: "The progression",
        list: [
          "Baseline blocking + LightGBM: 0.927 public",
          "Richer blocking keys and decoy features: 0.940",
          "Indic transliteration and candidate statistics: 0.945",
          "Reverse blocking and one-to-one ownership: 0.964",
        ],
        paragraphs: [
          "The lesson I took away: most of the gains came from fixing what the model could see, not from a bigger model.",
        ],
      },
    ],
  },
  {
    slug: "the-fee-you-never-see",
    title: "The fee you never see: what 13 years of fund data say about Regular plans",
    summary:
      "I downloaded daily NAVs for 21 Indian mutual funds since 2013 to measure what buying through an agent really costs, and found the answer depends on more than the fee.",
    date: "2026-10-15",
    readMinutes: 4,
    project: "fund-reality",
    sections: [
      {
        paragraphs: [
          "Every Indian mutual fund comes in two versions: Direct, which you buy yourself, and Regular, which you buy through an agent who is paid a commission out of the fund's returns. Same fund, same holdings. The only difference is about 1% a year.",
          "One percent sounds small, so I built Fund Reality to see what it adds up to with real prices instead of illustrations.",
        ],
      },
      {
        heading: "What the data show",
        list: [
          "₹10 lakh invested through an agent in January 2013 ended up ₹9.9 lakh smaller on average than the same money invested directly.",
          "In Nippon India Small Cap the gap was ₹21.2 lakh.",
          "The Nifty 50 index fund returned 5.8% a year over the last five years, but the typical five-year period since 2013 earned 13.3%. The latest period started near a market high.",
          "No kind of equity fund escaped the 2020 crash: average worst falls ranged from −35% for mid caps to −43% for small caps.",
        ],
      },
      {
        heading: "Why one return number misleads",
        paragraphs: [
          "Fund factsheets show a single trailing return. That number depends heavily on the start date. So the site computes every possible five-year window, 459 of them, and shows the whole spread. A first-time investor sees the range they might actually get, not the best-looking slice.",
        ],
      },
      {
        heading: "The catch in my own list",
        paragraphs: [
          "The 21 funds were chosen because they are well known today, which means they are survivors. Funds that closed or were merged are missing. That is why these large-cap funds beat the index in 71% of five-year periods, while S&P's SPIVA scorecard found 84% of all Indian large-cap funds lagged their benchmark over five years.",
          "I put that caveat on the site itself. If a data story only works when you hide its weaknesses, it isn't a good story.",
        ],
      },
      {
        heading: "How it's built",
        paragraphs: [
          "Python and pandas download and clean the NAV history once, compute rolling returns, drawdowns and XIRR, and write static JSON. The Next.js site reads that JSON, so public pages need no database. Supabase handles sign-in for the members-only portfolio cost check.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
