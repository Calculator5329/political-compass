import { FIGURE_2026_UPDATES } from './figure-updates.js';

// Public figures scored against the instrument from documented positions.
// Deep-research pass 2026-07-18: 14 research agents verified all prior scores
// and added 14 new figures. Every figure has a per-question evidence dossier at
// docs/figures/<slug>.md (rubric: docs/figures/METHOD.md). Scores flow through
// src/scoring.js like any respondent - never hand-edit a figure's (x,y).

const BASE_FIGURES = [
  {
    "name": "Donald Trump",
    "slug": "trump",
    "answers": {
      "e01": 2,
      "e02": -2,
      "e03": -2,
      "e04": 1,
      "e05": 1,
      "e06": -1,
      "e07": 0,
      "e08": 2,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -1,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": 1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": 0,
      "y06": 0,
      "y07": -1,
      "y08": 1,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his second-term record: sweeping 2025 tariffs, anti-DEI and two-sexes executive orders, mass-deportation drive, Schedule F revival, crypto championing, marijuana rescheduling, and sustained claims that elections, media, DOJ/FBI and a 'deep state' are rigged against him - with the J6 blanket pardon and FCC pressure campaign leaving him contradictory on protest tactics and government jawboning.",
    "sources": [
      {
        "title": "Trump 2025 EO chart - Holland & Knight",
        "url": "https://www.hklaw.com/en/general-pages/trumps-2025-executive-orders-chart"
      },
      {
        "title": "J6 pardons on day one - Roll Call",
        "url": "https://rollcall.com/2025/01/20/trump-pardons-nearly-all-jan-6-defendants-orders-prison-releases/"
      },
      {
        "title": "Third term: 'not joking' - NPR",
        "url": "https://www.npr.org/2025/03/30/g-s1-57231/trump-third-term"
      },
      {
        "title": "FCC orders ABC license review after Kimmel demand - Rolling Stone",
        "url": "https://www.rollingstone.com/tv-movies/tv-movie-news/trumps-fcc-orders-early-review-abc-station-licenses-after-president-demanded-kimmel-firing-1235555078/"
      },
      {
        "title": "GENIUS Act fact sheet - White House",
        "url": "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/"
      },
      {
        "title": "Marijuana rescheduling - NPR",
        "url": "https://www.npr.org/2026/04/23/nx-s1-5797245/marijuana-rules-reschedule-medical-legalization"
      }
    ]
  },
  {
    "name": "JD Vance",
    "slug": "vance",
    "answers": {
      "e01": 2,
      "e02": -2,
      "e03": -1,
      "e04": -1,
      "e05": 2,
      "e06": -1,
      "e07": 0,
      "e08": 2,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 1,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": 1,
      "y07": -2,
      "y08": 1,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his Senate and VP-era record: economic populism breaking GOP orthodoxy (pro-tariff, called for breaking up Google, praised Lina Khan, pro-minimum-wage rhetoric) fused with hard-right social positions, emphatic crypto championing, and the most explicit executive-supremacy claims against the courts.",
    "sources": [
      {
        "title": "Political positions of JD Vance - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Political_positions_of_JD_Vance"
      },
      {
        "title": "Vance: Roberts 'profoundly wrong' - CNN",
        "url": "https://www.cnn.com/2025/05/21/politics/jd-vance-john-roberts-judiciary-role"
      },
      {
        "title": "Bitcoin 2025: 'We reject regulators' - NOTUS",
        "url": "https://www.notus.org/trump-white-house/jd-vance-crypto-bitcoin-conference-speech"
      },
      {
        "title": "Unpacking JD Vance's labor record - OnLabor",
        "url": "https://onlabor.org/unpacking-jd-vances-labor-record/"
      },
      {
        "title": "'Fire every single mid-level bureaucrat' - Defense One",
        "url": "https://www.defenseone.com/policy/2024/07/heres-now-trumps-new-vice-presidential-pick-stacks-federal-workforce-issues/"
      },
      {
        "title": "The economic mind of JD Vance - NPR Planet Money",
        "url": "https://www.npr.org/sections/planet-money/2024/07/23/g-s1-12513/economic-mind-jd-vance"
      }
    ]
  },
  {
    "name": "Stephen Miller",
    "slug": "miller",
    "answers": {
      "e01": 2,
      "e02": -2,
      "e03": -2,
      "e04": 1,
      "e05": 0,
      "e06": 0,
      "e07": 0,
      "e08": 0,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 1,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": 1,
      "y07": -2,
      "y08": 0,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his record as the administration's policy architect: mass deportation (3,000 ICE arrests/day demand, habeas-suspension musing), the two-sexes/anti-DEI/merit EOs, sustained weaponization and deep-state claims, and open attacks on a 'rogue, radical left judiciary' - with a genuinely silent personal record on tech breakup, paid leave, and crypto.",
    "sources": [
      {
        "title": "Miller tells ICE to supercharge arrests - Axios",
        "url": "https://www.axios.com/2025/05/28/immigration-ice-deportations-stephen-miller"
      },
      {
        "title": "Miller: habeas suspension 'actively looking at' - PBS",
        "url": "https://www.pbs.org/newshour/politics/watch-stephen-miller-says-trump-administration-is-actively-looking-at-suspending-habeas-corpus"
      },
      {
        "title": "Miller warning to judges - New Republic",
        "url": "https://newrepublic.com/post/194367/stephen-miller-warning-judges-deportations"
      },
      {
        "title": "Tariffs 'saving the West' - The Hill",
        "url": "https://thehill.com/homenews/administration/5247084-stephen-miller-trump-saving-the-west-economic-domination/"
      },
      {
        "title": "Federal collective-bargaining exclusions EO - White House",
        "url": "https://www.whitehouse.gov/presidential-actions/2025/03/exclusions-from-federal-labor-management-relations-programs/"
      },
      {
        "title": "Miller opposed to loosening marijuana laws - Marijuana Moment",
        "url": "https://www.marijuanamoment.net/white-house-official-says-marijuana-reform-is-good-politics-as-trump-considers-rescheduling/"
      }
    ]
  },
  {
    "name": "Steve Bannon",
    "slug": "bannon",
    "answers": {
      "e01": 2,
      "e02": 1,
      "e03": 2,
      "e04": -1,
      "e05": 2,
      "e06": -1,
      "e07": 0,
      "e08": 0,
      "e09": 1,
      "e10": 1,
      "e11": -2,
      "e12": -2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": 0,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": 1,
      "y06": 1,
      "y07": -2,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 2,
      "y12": -2
    },
    "note": "Verified on 2024–26 War Room record: economic nationalism well left of GOP orthodoxy (raise taxes on the wealthy and corporations, defend Medicaid, break the 'broligarchs', tariffs as doctrine) fused with maximal traditionalism, mass deportation including H-1B holders, third-term advocacy, and total war on courts, media, experts, and the administrative state.",
    "sources": [
      {
        "title": "Bannon: 'We have to increase taxes on the wealthy' - Semafor",
        "url": "https://www.semafor.com/article/12/20/2024/we-have-to-increase-taxes-on-the-wealthy-steve-bannon"
      },
      {
        "title": "Bannon warns Republicans on Medicaid cuts - New Republic",
        "url": "https://newrepublic.com/post/191557/steve-bannon-warns-republicans-cut-medicaid"
      },
      {
        "title": "Bannon calls H-1B a 'scam', demands deportation of holders - The Hill",
        "url": "https://thehill.com/business/5060579-h-1b-visas-musk-maga-trump-ramaswamy-bannon-loomer-krishnan-immigration/"
      },
      {
        "title": "Bannon doubles down on Trump third term - Newsweek",
        "url": "https://www.newsweek.com/steve-bannon-doubles-down-third-trump-term-11843747"
      },
      {
        "title": "Bannon: tech 'bro-ligarchs' surrendered - National Pulse",
        "url": "https://thenationalpulse.com/2025/02/06/bannon-tech-bro-ligarchs-surrendered-to-trump-on-inauguration-day/"
      },
      {
        "title": "PolitiFact: Trump/Bannon third-term talk vs the Constitution",
        "url": "https://www.politifact.com/article/2025/oct/27/trump-bannon-third-term-constitution/"
      }
    ]
  },
  {
    "name": "Alex Jones",
    "slug": "jones",
    "answers": {
      "e01": 1,
      "e02": -2,
      "e03": -2,
      "e04": 1,
      "e05": 2,
      "e06": 0,
      "e07": -1,
      "e08": 2,
      "e09": -1,
      "e10": 0,
      "e11": -2,
      "e12": 1,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": 0,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": 1,
      "y06": 2,
      "y07": -2,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 2,
      "y12": -2
    },
    "note": "Verified through 2025–26 Infowars/Alex Jones Live output: globalist/deep-state conspiracism now aimed even at Trump's own cabinet, anti-CBDC pro-Bitcoin paleolibertarianism, climate-as-World-Bank-hoax, gun and deportation maximalism, and absolute distrust of media, courts, elections, and experts - the insurgent ceiling.",
    "sources": [
      {
        "title": "Infowars: 'Globalists deliberately destroying America' (Aug 2025)",
        "url": "https://www.infowars.com/posts/video-alex-jones-goes-off-on-trump-the-globalists-have-been-deliberately-destroying-america-stop-saying-that-the-destruction-of-our-great-nation-was-done-through-incompetence"
      },
      {
        "title": "Alex Jones Live: CBDC 'unified ledger' warning (Jul 2026)",
        "url": "https://www.alexjoneslive.com/2026/07/17/fourth-turning-alex-jones-uncovers-the-aims-of-the-un-bill-gates-the-chinese-to-bankrupt-the-world-economy-usher-in-a-cbdc-a-unified-ledger-then-your-very-life-will-be-min/"
      },
      {
        "title": "PBS Frontline: Jones in the lead-up to Jan 6",
        "url": "https://www.pbs.org/wgbh/frontline/article/what-conspiracy-theorist-alex-jones-said-in-the-lead-up-to-the-capitol-riot/"
      },
      {
        "title": "Britannica: Alex Jones (positions incl. climate-hoax/carbon tax)",
        "url": "https://www.britannica.com/biography/Alex-Jones"
      },
      {
        "title": "SPLC: anonymous $2M Bitcoin donation to Jones",
        "url": "https://www.splcenter.org/presscenter/exclusive-reporting-anonymous-donor-drops-2-million-bitcoin-alex-jones/"
      },
      {
        "title": "Alex Jones Live: 'Deportations Reach 900,000' (Jun 2026)",
        "url": "https://www.alexjoneslive.com/2026/06/21/deportations-reach-900000/"
      }
    ]
  },
  {
    "name": "Mike Pence",
    "slug": "pence",
    "answers": {
      "e01": -2,
      "e02": -2,
      "e03": -2,
      "e04": 2,
      "e05": -1,
      "e06": 2,
      "e07": -1,
      "e08": 0,
      "e09": -2,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 0,
      "s06": 1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -2,
      "s11": 2,
      "s12": -2,
      "y01": -1,
      "y02": 2,
      "y03": 1,
      "y04": 1,
      "y05": -2,
      "y06": 1,
      "y07": 2,
      "y08": -1,
      "y09": -1,
      "y10": -1,
      "y11": -2,
      "y12": 1
    },
    "note": "Verified on 2025–26 AAF/book-tour record: Reaganite free-trader calling Trump's tariffs 'the largest peacetime tax hike', pro-privatized-SS-accounts, maximal social conservatism (15-week ban, national youth-gender-medicine ban) - and the GOP's leading institutionalist: certified 2020, condemned Jan 6 pardons and DOJ purges, insists on due process for all persons.",
    "sources": [
      {
        "title": "Pence group launches ad campaign against Trump tariffs - Semafor",
        "url": "https://www.semafor.com/article/04/08/2025/pences-group-launches-ad-campaign-against-trump-tariffs"
      },
      {
        "title": "NPR: Pence says Washington is more 'swampy' under Trump (Jun 2026)",
        "url": "https://www.npr.org/2026/06/22/nx-s1-5597960/mike-pence-what-conservatives-want-republican-party"
      },
      {
        "title": "Salon: Pence breaks with Trump on tariffs, deportations (May 2025)",
        "url": "https://www.salon.com/2025/05/05/americans-are-going-to-see-consequences-pence-breaks-with-on-tariffs-deportations/"
      },
      {
        "title": "The Hill: Pence criticizes Trump's Jan 6 pardons",
        "url": "https://thehill.com/homenews/administration/5913383-pence-criticizes-trump-pardons/"
      },
      {
        "title": "Ballotpedia: Pence 2024 campaign positions",
        "url": "https://ballotpedia.org/Mike_Pence_presidential_campaign,_2024"
      },
      {
        "title": "Stand With Crypto: Pence (no crypto record)",
        "url": "https://www.standwithcrypto.org/politicians/person/michael---pence"
      }
    ]
  },
  {
    "name": "Mitt Romney",
    "slug": "romney",
    "answers": {
      "e01": -2,
      "e02": -1,
      "e03": -2,
      "e04": -1,
      "e05": -1,
      "e06": 0,
      "e07": 1,
      "e08": -1,
      "e09": -1,
      "e10": 2,
      "e11": 1,
      "e12": 1,
      "s01": -1,
      "s02": 1,
      "s03": -1,
      "s04": -1,
      "s05": -1,
      "s06": 1,
      "s07": -1,
      "s08": 1,
      "s09": 0,
      "s10": -2,
      "s11": 1,
      "s12": -2,
      "y01": 1,
      "y02": 2,
      "y03": 1,
      "y04": -2,
      "y05": -2,
      "y06": -1,
      "y07": 2,
      "y08": -1,
      "y09": 1,
      "y10": -2,
      "y11": -2,
      "y12": 2
    },
    "note": "Institutionalist business conservative: 'not a tariff guy,' backed the Safer Communities Act, a child allowance, and a carbon price, called student-debt relief a 'bribe,' and - as the only senator to twice vote to convict Trump - strongly defends elections, courts, and cross-party compromise.",
    "sources": [
      {
        "title": "Romney reflects on life after politics - SMU Daily Campus (2025)",
        "url": "https://smudailycampus.com/1067405/news/mitt-romney-reflects-on-life-after-politics-government-shutdown-the-republican-partys-future/"
      },
      {
        "title": "Romney rips Trump tariffs - The Hill",
        "url": "https://thehill.com/blogs/blog-briefing-room/news/395851-romney-rips-trump-tariffs-trade-wars-at-a-tax-on-americans/"
      },
      {
        "title": "Taxes - Senator Mitt Romney",
        "url": "https://www.romney.senate.gov/issues/taxes"
      },
      {
        "title": "Romney calls student loan forgiveness a bribe - Deseret News",
        "url": "https://www.deseret.com/utah/2022/8/24/23320337/mitt-romney-comments-on-biden-student-loan-forgiveness"
      },
      {
        "title": "Romney's climate legacy - E&E News",
        "url": "https://www.eenews.net/articles/romneys-climate-legacy-a-champion-with-few-results/"
      },
      {
        "title": "Political positions of Mitt Romney - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Political_positions_of_Mitt_Romney"
      }
    ]
  },
  {
    "name": "Gavin Newsom",
    "slug": "newsom",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": -1,
      "e04": -2,
      "e05": -1,
      "e06": -1,
      "e07": 2,
      "e08": -1,
      "e09": 1,
      "e10": -1,
      "e11": 2,
      "e12": -1,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": -1,
      "s05": -2,
      "s06": 1,
      "s07": 1,
      "s08": -1,
      "s09": -2,
      "s10": 2,
      "s11": -1,
      "s12": 2,
      "y01": 1,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": -1,
      "y06": -1,
      "y07": 1,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": -1,
      "y12": 1
    },
    "note": "Institutionalist center-left Democrat who has visibly moderated since 2025: sued to kill Trump's tariffs, backed off single-payer, called trans athletes in girls' sports 'deeply unfair' while opposing care bans, kept his death-penalty moratorium and $20 minimum-wage record - and fought Trump via Prop 50 and the courts, not the streets.",
    "sources": [
      {
        "title": "Newsom tariff lawsuit - gov.ca.gov",
        "url": "https://www.gov.ca.gov/2025/04/16/governor-newsom-files-lawsuit-to-end-president-trumps-tariffs/"
      },
      {
        "title": "Democracy at a Crossroads address - gov.ca.gov (June 2025)",
        "url": "https://www.gov.ca.gov/2025/06/10/governor-newsoms-address-to-california-democracy-at-a-crossroads/"
      },
      {
        "title": "Newsom moderates on single-payer - KFF Health News",
        "url": "https://kffhealthnews.org/insurance/gavin-newsom-california-single-payer-universal-healthcare-2028/"
      },
      {
        "title": "Wealth taxes 'going nowhere' - CalMatters",
        "url": "https://calmatters.org/commentary/2023/04/battles-taxing-the-rich-california/"
      },
      {
        "title": "Newsom on trans athletes - CalMatters",
        "url": "https://calmatters.org/politics/2025/03/newsom-transgender-athletes/"
      },
      {
        "title": "Prop 50 and 'rules of the game' - NBC News",
        "url": "https://www.nbcnews.com/politics/elections/california-gavin-newsom-trump-rigging-game-nationwide-redistricting-rcna241303"
      }
    ]
  },
  {
    "name": "Kamala Harris",
    "slug": "harris",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": 1,
      "e04": -2,
      "e05": 0,
      "e06": -2,
      "e07": 2,
      "e08": -1,
      "e09": 2,
      "e10": -2,
      "e11": 1,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 0,
      "s05": -2,
      "s06": 2,
      "s07": 1,
      "s08": -1,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 2,
      "y01": 1,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 1,
      "y06": -1,
      "y07": 0,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": -1,
      "y12": 2
    },
    "note": "Scored on her 2024 platform and 2025-26 positioning: anti-tariff ('Trump sales tax'), federal paid leave, marijuana legalization, abortion-rights codification, moderated on fracking, Medicare for All, and crypto; institutionalist who certified her own defeat but now calls Trump's DOJ an 'abuse of power.'",
    "sources": [
      {
        "title": "The evolution of Harris' stances - CBS News",
        "url": "https://www.cbsnews.com/news/kamala-harris-policy-positions-president-2024/"
      },
      {
        "title": "Harris and Medicare-for-all - Washington Post",
        "url": "https://www.washingtonpost.com/health/2024/09/10/kamala-harris-medicare-for-all/"
      },
      {
        "title": "Harris on digital assets - CoinDesk",
        "url": "https://www.coindesk.com/policy/2024/09/23/harris-says-her-white-house-will-invest-in-americas-future-which-includes-digital-assets"
      },
      {
        "title": "Harris alleges Trump DOJ 'revenge' - Fox News",
        "url": "https://www.foxnews.com/media/kamala-harris-alleges-trump-using-doj-revenge-questions-justice-systems-integrity"
      },
      {
        "title": "Kamala Harris 2024 campaign - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Kamala_Harris_2024_presidential_campaign"
      },
      {
        "title": "Harris 2026 book tour - CNN",
        "url": "https://www.cnn.com/2025/12/10/politics/kamala-harris-2026-tour"
      }
    ]
  },
  {
    "name": "Joe Biden",
    "slug": "biden",
    "answers": {
      "e01": -1,
      "e02": 1,
      "e03": 1,
      "e04": -2,
      "e05": 1,
      "e06": -2,
      "e07": 2,
      "e08": -2,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": -1,
      "s05": -2,
      "s06": 2,
      "s07": 1,
      "s08": -1,
      "s09": -2,
      "s10": -1,
      "s11": -2,
      "s12": 2,
      "y01": 1,
      "y02": 2,
      "y03": 0,
      "y04": -2,
      "y05": -1,
      "y06": -2,
      "y07": 1,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": -2,
      "y12": 2
    },
    "note": "Verified on his presidential record and active post-presidency: public option, most-pro-union framing, IRA climate spending, student-debt cancellation, death-row commutations, 'fund the police' centrism, and institutionalist defense of elections, civil servants, and Social Security against Trump.",
    "sources": [
      {
        "title": "Biden farewell address (oligarchy warning) - NPR",
        "url": "https://www.npr.org/2025/01/15/nx-s1-5258510/biden-farewell-address"
      },
      {
        "title": "Fact sheet: Biden commutes 37 death-row sentences",
        "url": "https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2024/12/23/fact-sheet-president-biden-commutes-the-sentences-of-37-individuals-on-death-row/"
      },
      {
        "title": "Biden calls Trump tariffs 'a major mistake' - SCMP",
        "url": "https://www.scmp.com/news/us/economy-trade-business/article/3290232/biden-touts-his-economic-legacy-and-calls-trumps-planned-tariffs-major-mistake"
      },
      {
        "title": "First post-presidency speech on Social Security - NBC",
        "url": "https://www.nbcnews.com/politics/joe-biden/biden-trump-social-security-first-post-presidency-speech-rcna201309"
      },
      {
        "title": "Murthy v. Missouri (platform-pressure record)",
        "url": "https://en.wikipedia.org/wiki/Murthy_v._Missouri"
      },
      {
        "title": "Biden vetoes SAB 121 crypto repeal - CoinDesk",
        "url": "https://www.coindesk.com/policy/2024/05/31/us-president-biden-vetoes-resolution-overturning-sec-guidance"
      }
    ]
  },
  {
    "name": "Barack Obama",
    "slug": "obama",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": 0,
      "e04": -2,
      "e05": -1,
      "e06": -2,
      "e07": 2,
      "e08": -1,
      "e09": 2,
      "e10": -1,
      "e11": 2,
      "e12": -1,
      "s01": 2,
      "s02": -1,
      "s03": -2,
      "s04": 1,
      "s05": -2,
      "s06": 2,
      "s07": 1,
      "s08": 0,
      "s09": -2,
      "s10": 1,
      "s11": -1,
      "s12": 0,
      "y01": 2,
      "y02": 2,
      "y03": 2,
      "y04": -2,
      "y05": -1,
      "y06": -2,
      "y07": 1,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": -2,
      "y12": 2
    },
    "note": "Institutionalist center-left liberal: ACA, TPP free trade, post-Sandy Hook gun push, Buffett Rule (never a wealth tax); his 2022 Stanford speech urged platform regulation, he rejected the 'defund' slogan, and his 2025 Hamilton College remarks defend courts, universities, and civil servants against Trump.",
    "sources": [
      {
        "title": "Obama Stanford disinformation speech - CNN",
        "url": "https://www.cnn.com/2022/04/21/politics/obama-disinformation-speech-stanford/index.html"
      },
      {
        "title": "Obama Hamilton College remarks, Apr 2025",
        "url": "https://thedolphinlmc.com/news-features/2025/04/09/president-obama-speaks-to-the-current-political-environment-at-hamilton-college/"
      },
      {
        "title": "Obama statement on SFFA affirmative-action ruling",
        "url": "https://barackobama.medium.com/our-statements-on-the-u-s-supreme-courts-decision-to-overturn-affirmative-action-2e161f52b5d1"
      },
      {
        "title": "The Buffett Rule - White House archive",
        "url": "https://obamawhitehouse.archives.gov/blog/2012/04/10/buffett-rule-asks-wealthiest-pay-their-fair-share"
      },
      {
        "title": "Obama on marijuana vs alcohol - CBS",
        "url": "https://www.cbsnews.com/news/obama-marijuana-not-more-dangerous-than-alcohol/"
      },
      {
        "title": "Obama on 'defund the police' slogan - CBS",
        "url": "https://www.cbsnews.com/news/obama-defund-the-police-slogan/"
      }
    ]
  },
  {
    "name": "Bernie Sanders",
    "slug": "sanders",
    "answers": {
      "e01": -1,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 2,
      "e06": -2,
      "e07": 2,
      "e08": -2,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 1,
      "s05": -2,
      "s06": 1,
      "s07": 1,
      "s08": -1,
      "s09": -2,
      "s10": 2,
      "s11": -1,
      "s12": 2,
      "y01": 0,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 1,
      "y06": 0,
      "y07": -1,
      "y08": 2,
      "y09": 1,
      "y10": -2,
      "y11": 1,
      "y12": 1
    },
    "note": "Democratic socialist: Medicare for All, 8% wealth tax, $17 minimum wage, Fighting Oligarchy tour; insists both parties answer to billionaire donors and pairs deep anti-establishment critique of corporate media, the 'out of control' Court, and Trump's weaponized DOJ with emphatic defense of elections and pragmatic cross-aisle work.",
    "sources": [
      {
        "title": "Sanders X post: targeted vs blanket tariffs",
        "url": "https://x.com/SenSanders/status/1908221908954263821"
      },
      {
        "title": "Prepared remarks: oligarchy, authoritarianism, kleptocracy - sanders.senate.gov",
        "url": "https://www.sanders.senate.gov/press-releases/prepared-remarks-sanders-on-americas-dangerous-movement-toward-oligarchy-authoritarianism-kleptocracy/"
      },
      {
        "title": "Sanders on the GENIUS Act crypto bill - Common Dreams",
        "url": "https://www.commondreams.org/news/bernie-sanders-genius-act-stablecoins"
      },
      {
        "title": "Sanders: Powell probe part of plan to 'intimidate and destroy' critics",
        "url": "https://www.commondreams.org/news/bernie-sanders-trump-authoritarianism"
      },
      {
        "title": "Fighting Oligarchy Tour - berniesanders.com",
        "url": "https://berniesanders.com/oligarchy/"
      },
      {
        "title": "Sanders on Trump Twitter ban - CNN",
        "url": "https://www.cnn.com/2021/03/24/politics/bernie-sanders-trump-twitter-ban"
      }
    ]
  },
  {
    "name": "Alexandria Ocasio-Cortez",
    "slug": "aoc",
    "answers": {
      "e01": -2,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 2,
      "e06": -2,
      "e07": 2,
      "e08": -2,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 2,
      "s05": -2,
      "s06": 2,
      "s07": 2,
      "s08": -1,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 2,
      "y01": 0,
      "y02": 2,
      "y03": -2,
      "y04": -2,
      "y05": 2,
      "y06": -2,
      "y07": -2,
      "y08": 1,
      "y09": 1,
      "y10": -1,
      "y11": 1,
      "y12": 0
    },
    "note": "Progressive left standard-bearer: Green New Deal, Medicare for All, anti-tariff and anti-crypto votes; filed impeachment articles against justices and backs court expansion, calls the Homan/DOJ threats against her politicized enforcement, while emphatically affirming election legitimacy.",
    "sources": [
      {
        "title": "AOC press releases (impeachment articles, Bondi letter)",
        "url": "https://ocasio-cortez.house.gov/media/press-releases"
      },
      {
        "title": "AOC on Colombia tariffs - X, Jan 2025",
        "url": "https://x.com/AOC/status/1883617048011669887"
      },
      {
        "title": "Stand With Crypto scorecard (GENIUS Act no vote)",
        "url": "https://www.standwithcrypto.org/politicians/person/alexandria---ocasio-cortez"
      },
      {
        "title": "AOC backs court expansion - Fox News",
        "url": "https://www.foxnews.com/politics/aoc-backs-court-packing-push"
      },
      {
        "title": "AOC: Congress looking to 'rein in disinformation' - The Hill",
        "url": "https://thehill.com/homenews/house/534045-ocasio-cortez-congress-looking-into-ways-to-rein-in-disinformation/"
      },
      {
        "title": "\"We must abolish the death penalty\" - X, Sept 2024",
        "url": "https://x.com/AOC/status/1838734396074942664"
      }
    ]
  },
  {
    "name": "Zohran Mamdani",
    "slug": "mamdani",
    "answers": {
      "e01": 0,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 0,
      "e06": 0,
      "e07": 2,
      "e08": -1,
      "e09": 2,
      "e10": -1,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -1,
      "s04": 2,
      "s05": -2,
      "s06": 2,
      "s07": 1,
      "s08": 0,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 1,
      "y01": 0,
      "y02": 1,
      "y03": -2,
      "y04": -2,
      "y05": 2,
      "y06": 0,
      "y07": 0,
      "y08": 2,
      "y09": 1,
      "y10": 0,
      "y11": 1,
      "y12": 0
    },
    "note": "DSA mayor of NYC since Jan 2026: millionaire/corporate tax hikes, $30 minimum wage, delivered free childcare, Department of Community Safety, sanctuary enforcement against a 'fascist' ICE, hunger-strike protest politics - tempered by pragmatic dealmaking with Hochul and Trump and silence on many federal/system questions.",
    "sources": [
      {
        "title": "Political positions of Zohran Mamdani - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Political_positions_of_Zohran_Mamdani"
      },
      {
        "title": "Platform - Zohran for NYC",
        "url": "https://www.zohranfornyc.com/platform"
      },
      {
        "title": "100 days assessment - The City Reporter",
        "url": "https://www.thecityreporter.nyc/2026/04/09/zohran-mamdani-100-days-rent-affordability-child-care/"
      },
      {
        "title": "Department of Community Safety - CBS New York",
        "url": "https://www.cbsnews.com/newyork/news/zohran-mamdani-new-york-city-department-of-community-safety/"
      },
      {
        "title": "NORML scorecard (cannabis legalization vote)",
        "url": "https://vote.norml.org/politicians/192156"
      },
      {
        "title": "State budget bailout of NYC - NYS Focus",
        "url": "https://nysfocus.com/2026/05/27/new-york-state-budget-city-aid-mamdani-hochul"
      }
    ]
  },
  {
    "name": "Hasan Piker",
    "slug": "piker",
    "answers": {
      "e01": -1,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 1,
      "e06": -1,
      "e07": 2,
      "e08": -2,
      "e09": 2,
      "e10": -1,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -1,
      "s04": 2,
      "s05": -2,
      "s06": 2,
      "s07": 2,
      "s08": -2,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 1,
      "y01": -2,
      "y02": 1,
      "y03": -2,
      "y04": -2,
      "y05": 2,
      "y06": 0,
      "y07": -2,
      "y08": 2,
      "y09": 0,
      "y10": -2,
      "y11": 2,
      "y12": -2
    },
    "note": "Self-described Marxist streamer: daily advocacy for universal programs, billionaire taxes, unions, and abolitionist politics; Manufacturing Consent media doctrine, 'violent revolution inevitable' rhetoric after adverse court rulings, and a 2025-26 record as a personal target of CBP detention and a federal subpoena - while still voting for Harris on stream.",
    "sources": [
      {
        "title": "Hasan Piker - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Hasan_Piker"
      },
      {
        "title": "Political DNA profile (ideology, media doctrine)",
        "url": "https://politicaldna.org/lineage/thinkers/hasan-piker/"
      },
      {
        "title": "FAIR on the media campaign against Piker",
        "url": "https://fair.org/home/medias-hasan-piker-meltdown-is-about-silencing-dissent/"
      },
      {
        "title": "JFK 'violent revolution' quote after VA ruling - Daily Caller, May 2026",
        "url": "https://dailycaller.com/2026/05/08/hasan-piker-violent-revolution-virginia-state-supreme-court-gop-redistricting-democrats-spanberger/"
      },
      {
        "title": "Cuba trip federal subpoena - Bloomberg, July 2026",
        "url": "https://www.bloomberg.com/news/articles/2026-07-01/us-agents-nab-member-of-group-that-brought-hasan-piker-to-cuba"
      },
      {
        "title": "On-stream Harris ballot / election coverage - NBC News",
        "url": "https://www.nbcnews.com/politics/hasan-piker-twitch-political-commentary-election-rcna172136"
      }
    ]
  },
  {
    "name": "Cornel West",
    "slug": "west",
    "answers": {
      "e01": 0,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 2,
      "e06": -2,
      "e07": 2,
      "e08": 0,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 2,
      "s05": -2,
      "s06": 2,
      "s07": 2,
      "s08": 1,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 2,
      "y01": -2,
      "y02": 0,
      "y03": -2,
      "y04": -2,
      "y05": 2,
      "y06": 1,
      "y07": -1,
      "y08": 2,
      "y09": 0,
      "y10": 0,
      "y11": 2,
      "y12": -1
    },
    "note": "Democratic-socialist 2024 platform (Medicare for All, wealth taxes, gun registry/red-flag laws, abolishing ICE and the death penalty, canceling student debt) plus a lifelong prophetic-Christian war on the 'corporate duopoly,' corporate media, and the carceral state; arrested in civil disobedience and organizing against Trump's 'neofascist' turn through 2026 while calling both parties beyond redemption.",
    "sources": [
      {
        "title": "Cornel West - Ballotpedia (2024 platform)",
        "url": "https://ballotpedia.org/Cornel_West"
      },
      {
        "title": "West on organizing under Trump - Truthout",
        "url": "https://truthout.org/articles/cornel-west-we-must-keep-our-souls-intact-as-we-organize-under-trump-again/"
      },
      {
        "title": "West: both parties 'beyond redemption' - The Hill",
        "url": "https://thehill.com/homenews/campaign/4617690-cornel-west-both-parties-beyond-redemption/"
      },
      {
        "title": "West 2024 campaign - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Cornel_West_2024_presidential_campaign"
      },
      {
        "title": "West on Immigration - OnTheIssues",
        "url": "https://ontheissues.org/2024/Cornel_West_Immigration.htm"
      }
    ]
  },
  {
    "name": "Elon Musk",
    "slug": "musk",
    "answers": {
      "e01": -2,
      "e02": -1,
      "e03": -2,
      "e04": 0,
      "e05": 0,
      "e06": 1,
      "e07": -1,
      "e08": 2,
      "e09": -2,
      "e10": 0,
      "e11": -1,
      "e12": 0,
      "s01": 1,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 1,
      "s06": 2,
      "s07": -2,
      "s08": 1,
      "s09": 2,
      "s10": 1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 0,
      "y12": 0
    },
    "note": "Scored on the full 2025-26 arc: DOGE's mass-firings architect who split with Trump over the 'Big Beautiful Bill,' founded the America Party as an anti-deficit 'uniparty' protest, then shelved it by late 2025 to resume mega-funding Republicans for the 2026 midterms; anti-tariff free-trader who fights unions, wealth taxes, and DEI, champions crypto and H-1B legal immigration, and remains emphatically insurgent on media, experts, elections, and the 'unelected fourth branch.'",
    "sources": [
      {
        "title": "Political activities of Elon Musk - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Political_activities_of_Elon_Musk"
      },
      {
        "title": "Musk forms the America Party - PBS NewsHour",
        "url": "https://www.pbs.org/newshour/politics/musk-says-hes-formed-the-america-party-heres-what-to-know"
      },
      {
        "title": "Musk defends DOGE on Joe Rogan - The Hill",
        "url": "https://thehill.com/homenews/administration/5170772-musk-rogan-defends-doge-podcast/"
      },
      {
        "title": "Musk resumes funding Republicans for 2026 - Axios",
        "url": "https://www.axios.com/2025/12/16/elon-musk-donations-midterms-republicans-trump"
      },
      {
        "title": "Musk-Trump thaw in 2026 - Bloomberg",
        "url": "https://www.bloomberg.com/news/newsletters/2026-01-15/elon-musk-s-once-frosty-relationship-with-trump-shows-new-signs-of-a-thaw"
      },
      {
        "title": "Musk's anti-tariff revolt - Axios",
        "url": "https://www.axios.com/2025/04/09/trump-tariff-outcry-pause-musk-ackman-joe-rogan"
      }
    ]
  },
  {
    "name": "Joe Rogan",
    "slug": "rogan",
    "answers": {
      "e01": -1,
      "e02": 1,
      "e03": 0,
      "e04": 0,
      "e05": 0,
      "e06": 0,
      "e07": 0,
      "e08": 1,
      "e09": 0,
      "e10": 0,
      "e11": -1,
      "e12": 0,
      "s01": 2,
      "s02": 1,
      "s03": 1,
      "s04": -1,
      "s05": -2,
      "s06": 1,
      "s07": -2,
      "s08": 1,
      "s09": 1,
      "s10": 2,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -1,
      "y03": -2,
      "y04": 0,
      "y05": -1,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 1,
      "y11": 0,
      "y12": 1
    },
    "note": "Pro-choice, pro-weed, pro-2A Trump endorser whose loyalty is anti-institutional, not partisan: broke loudly with Trump on tariffs ('stupid'), Canada annexation talk, and Gestapo-like ICE raids in 2025-26, while keeping universal-healthcare sympathy alongside fierce anti-DEI, anti-expert, anti-legacy-media politics. Economic zeros reflect a genuinely thin on-record footprint.",
    "sources": [
      {
        "title": "Rogan criticizes ICE tactics - NBC News",
        "url": "https://www.nbcnews.com/pop-culture/pop-culture-news/joe-rogan-criticizes-ice-tactics-podcast-rcna253931"
      },
      {
        "title": "Rogan on deportations - Axios",
        "url": "https://www.axios.com/2025/04/02/joe-rogan-trump-deportations-ice-el-salvador"
      },
      {
        "title": "Rogan turns tariff critic - Axios",
        "url": "https://www.axios.com/2025/04/09/trump-tariff-outcry-pause-musk-ackman-joe-rogan"
      },
      {
        "title": "Rogan pushes back on Vance on abortion - Salon",
        "url": "https://www.salon.com/2024/11/01/joe-rogan-pushes-back-on-jd-vances-claim-that-women-celebrate-abortion/"
      },
      {
        "title": "Rogan to Poilievre: Trump 'f***ed up' on Canada - Newsweek",
        "url": "https://www.newsweek.com/joe-rogan-donald-trump-canada-conservative-pierre-poilievre-11708072"
      }
    ]
  },
  {
    "name": "Liz Cheney",
    "slug": "cheney",
    "answers": {
      "e01": -2,
      "e02": -2,
      "e03": -2,
      "e04": 1,
      "e05": -1,
      "e06": 0,
      "e07": -1,
      "e08": 0,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -1,
      "s02": 1,
      "s03": 2,
      "s04": -2,
      "s05": -1,
      "s06": 0,
      "s07": -2,
      "s08": 0,
      "s09": 0,
      "s10": -1,
      "s11": 1,
      "s12": -1,
      "y01": 1,
      "y02": 2,
      "y03": 1,
      "y04": -2,
      "y05": -2,
      "y06": 0,
      "y07": 2,
      "y08": -1,
      "y09": 1,
      "y10": -2,
      "y11": -2,
      "y12": 2
    },
    "note": "Orthodox free-trade, low-tax conservative on economics (called broad tariffs 'fundamentally an anti-conservative policy') paired with a defining institutionalist identity: J6 vice-chair, defender of courts and civil servants, campaigning in 2025-26 for lawful 'guardrails of democracy' and anti-Trump congressional majorities.",
    "sources": [
      {
        "title": "Cheney bashes tariff policy, keeps fire on Trump - ABC News",
        "url": "https://abcnews.com/Politics/cheney-fire-trump-jan-6-bashes-tariff-policy/story?id=115027851"
      },
      {
        "title": "Cheney: 'Guardrails of democracy' must keep Trump in check - The Hill",
        "url": "https://thehill.com/homenews/campaign/4976278-liz-cheney-donald-trump-2024-victory-democracy/"
      },
      {
        "title": "'We Can't Survive a President who Goes to War With the Constitution' - Lehigh",
        "url": "https://news.lehigh.edu/liz-cheney-we-cant-survive-a-president-who-goes-to-war-with-the-constitution"
      },
      {
        "title": "Cheney in Anchorage: 2026 midterms, lawful protest - Alaska Beacon",
        "url": "https://alaskabeacon.com/2025/05/03/former-rep-liz-cheney-in-anchorage-lecture-event-gives-kudos-to-alaska-sen-murkowski/"
      },
      {
        "title": "Cheney key votes - Vote Smart",
        "url": "https://justfacts.votesmart.org/candidate/key-votes/171319/liz-cheney"
      },
      {
        "title": "Cheney on post-Roe state bans - Axios",
        "url": "https://www.axios.com/2024/10/22/liz-cheney-abortion-harris-town-hall-michigan"
      }
    ]
  },
  {
    "name": "Robert F. Kennedy Jr.",
    "slug": "rfk",
    "answers": {
      "e01": 1,
      "e02": 0,
      "e03": 0,
      "e04": -2,
      "e05": 1,
      "e06": -1,
      "e07": 1,
      "e08": 2,
      "e09": 1,
      "e10": -1,
      "e11": -1,
      "e12": -1,
      "s01": 0,
      "s02": 2,
      "s03": 0,
      "s04": 0,
      "s05": 0,
      "s06": 0,
      "s07": 0,
      "s08": 1,
      "s09": 2,
      "s10": 1,
      "s11": 1,
      "s12": 1,
      "y01": -2,
      "y02": -1,
      "y03": -1,
      "y04": 2,
      "y05": 1,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 0,
      "y12": 1
    },
    "note": "Economically heterodox populist ($15 minimum wage, Bitcoin evangelist, anti-corporate-capture) whose HHS record hardened the anti-institution axis: firing the entire ACIP panel, CDC mass layoffs, censorship litigation, binding two-sex guidance, CMS rules barring pediatric gender medicine, and a mifepristone restriction review that now muddies his old pro-choice stance.",
    "sources": [
      {
        "title": "RFK Jr. fires every ACIP member - STAT",
        "url": "https://www.statnews.com/2025/06/09/rfk-jr-fires-every-member-of-cdc-vaccine-expert-panel-acip/"
      },
      {
        "title": "CDC October 2025 mass layoffs - MSNBC",
        "url": "https://www.msnbc.com/msnbc/news/cdc-rfk-jr-shutdown-layoffs-goal-rcna237035"
      },
      {
        "title": "HHS two-sex guidance - Fierce Healthcare",
        "url": "https://www.fiercehealthcare.com/regulatory/kennedy-issues-guidance-recognizing-only-two-sexes-one-first-moves-hhs-secretary"
      },
      {
        "title": "CMS rule barring pediatric 'sex-rejecting procedures' - Federal Register",
        "url": "https://www.federalregister.gov/documents/2025/12/19/2025-23465/medicare-and-medicaid-programs-hospital-condition-of-participation-prohibiting-sex-rejecting"
      },
      {
        "title": "'Every abortion is a tragedy' at confirmation",
        "url": "https://reproductivefreedomforall.org/resources/rfk-jr-says-he-agrees-with-trump-that-every-abortion-is-a-tragedy-at-confirmation-hearing/"
      },
      {
        "title": "Kennedy: FDA reviewing mifepristone safety - CBS News",
        "url": "https://www.cbsnews.com/news/rfk-fda-abortion-pill-mifepristone-safety-review/"
      }
    ]
  },
  {
    "name": "Rand Paul",
    "slug": "paul",
    "answers": {
      "e01": -2,
      "e02": -2,
      "e03": -2,
      "e04": 2,
      "e05": -2,
      "e06": 1,
      "e07": -1,
      "e08": 2,
      "e09": -2,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 1,
      "s03": 2,
      "s04": 0,
      "s05": -1,
      "s06": 0,
      "s07": -2,
      "s08": 1,
      "s09": 2,
      "s10": 1,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -1,
      "y03": -2,
      "y04": 1,
      "y05": -2,
      "y06": 2,
      "y07": 0,
      "y08": 1,
      "y09": -2,
      "y10": 1,
      "y11": -1,
      "y12": 0
    },
    "note": "Consistent libertarian: co-led the April and October 2025 Senate resolutions revoking Trump's Canada tariffs and voted against the 'big, beautiful bill' over deficits; champions crypto non-regulation and market wages, sponsors the Life at Conception Act and anti-jawboning Free Speech Protection Act, and shares the anti-FBI, anti-expert distrust axis without full election denial.",
    "sources": [
      {
        "title": "Senate passes Paul's bill to block Canada tariffs - Reason",
        "url": "https://reason.com/2025/04/02/the-senate-just-passed-rand-pauls-bill-to-block-trumps-tariffs-on-canada/"
      },
      {
        "title": "Four Republicans vote to end Canada tariffs (Oct 2025) - CNN",
        "url": "https://www.cnn.com/2025/10/29/politics/canada-tariffs-senate-vote-trump"
      },
      {
        "title": "Paul rails against 'big, beautiful bill' - The Hill",
        "url": "https://thehill.com/homenews/senate/5379227-rand-paul-gop-spending-bill/"
      },
      {
        "title": "Paul continues 2020 fraud claims - ABC News",
        "url": "https://abcnews.go.com/Politics/sen-rand-paul-continues-making-false-claims-2020/story?id=75446712"
      },
      {
        "title": "Paul on due process before deportation - Newsweek",
        "url": "https://www.newsweek.com/mass-deportations-rand-paul-concerns-donald-trump-1989042"
      },
      {
        "title": "Life at Conception Act (S.99) - congress.gov",
        "url": "https://www.congress.gov/bill/118th-congress/senate-bill/99"
      }
    ]
  },
  {
    "name": "David Pakman",
    "slug": "pakman",
    "answers": {
      "e01": -2,
      "e02": 2,
      "e03": 1,
      "e04": -2,
      "e05": 1,
      "e06": -2,
      "e07": 2,
      "e08": -1,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -1,
      "s04": 1,
      "s05": -2,
      "s06": 2,
      "s07": 1,
      "s08": -2,
      "s09": -2,
      "s10": 2,
      "s11": -1,
      "s12": 1,
      "y01": 1,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 0,
      "y06": -1,
      "y07": -1,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": -1,
      "y12": 1
    },
    "note": "Progressive social democrat (single-payer, unions, debt relief, climate) whose 2025 book The Echo Machine explicitly argues incrementalism over accelerationism; defends elections, experts, and mainstream factuality against MAGA conspiracies while treating Trump's DOJ as weaponized and the Roberts Court as politicized.",
    "sources": [
      {
        "title": "Trump's terrible tariff plan will raise prices for US consumers - SAN op-ed",
        "url": "https://san.com/opinions/trumps-terrible-tariff-plan-will-raise-prices-for-us-consumers/"
      },
      {
        "title": "The Echo Machine - Beacon Press",
        "url": "https://www.beacon.org/The-Echo-Machine-P2164.aspx"
      },
      {
        "title": "The Echo Machine - Penguin Random House",
        "url": "https://www.penguinrandomhouse.com/books/770202/the-echo-machine-by-david-pakman/"
      },
      {
        "title": "David Pakman Show episode archive (2025)",
        "url": "https://davidpakman.com/may-13-2025/"
      },
      {
        "title": "Medicare for All funding segment - David Pakman Show",
        "url": "https://www.supernewsworld.com/Heres-EXACTLY-How-We-Pay-For-Medicare-For-All---David-Pakman-Show-3018281.html"
      },
      {
        "title": "David Pakman - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/David_Pakman"
      }
    ]
  },
  {
    "name": "Brian Tyler Cohen",
    "slug": "btc",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": 1,
      "e04": -2,
      "e05": 0,
      "e06": -2,
      "e07": 1,
      "e08": -1,
      "e09": 2,
      "e10": -2,
      "e11": 1,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 1,
      "s05": -2,
      "s06": 1,
      "s07": 1,
      "s08": -2,
      "s09": -2,
      "s10": 0,
      "s11": -1,
      "s12": 0,
      "y01": 0,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 1,
      "y06": -1,
      "y07": -1,
      "y08": -2,
      "y09": 2,
      "y10": -2,
      "y11": -1,
      "y12": 0
    },
    "note": "Democratic partisan messenger (Shameless, 2024): pro-labor, pro-choice, emphatic gun reformer and trans-rights defender, fierce institutionalist on elections and the 'deep state' - while attacking mainstream 'sanewashing', the captured Court, and by 2025 telling Democrats to stop playing nice and headlining No Kings protests.",
    "sources": [
      {
        "title": "Shameless: Republicans' Deliberate Dysfunction - Amazon",
        "url": "https://www.amazon.com/Shameless-Republicans-Deliberate-Dysfunction-Democracy/dp/0063392887"
      },
      {
        "title": "Public Notice interview on Shameless",
        "url": "https://www.publicnotice.co/p/brian-tyler-cohen-the-day-after-book"
      },
      {
        "title": "No Kings protest speech - YouTube",
        "url": "https://www.youtube.com/watch?v=NMsKroVKswE"
      },
      {
        "title": "BTC dismantles anti-trans narratives on Piers Morgan",
        "url": "https://www.youtube.com/watch?v=mx0glOZCMWU"
      },
      {
        "title": "Gun-reform X post (May 2022)",
        "url": "https://x.com/briantylercohen/status/1529260254885605376"
      },
      {
        "title": "Media Bias/Fact Check - BTC",
        "url": "https://mediabiasfactcheck.com/brian-tyler-cohen-btc-bias-and-credibility/"
      }
    ]
  },
  {
    "name": "Destiny",
    "slug": "destiny",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": -1,
      "e04": -1,
      "e05": -1,
      "e06": -1,
      "e07": 1,
      "e08": -2,
      "e09": 1,
      "e10": 0,
      "e11": 1,
      "e12": -1,
      "s01": 2,
      "s02": -1,
      "s03": 1,
      "s04": -1,
      "s05": -2,
      "s06": 2,
      "s07": 0,
      "s08": -2,
      "s09": -1,
      "s10": 2,
      "s11": 0,
      "s12": 0,
      "y01": 2,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 0,
      "y06": -1,
      "y07": 1,
      "y08": -2,
      "y09": 2,
      "y10": -2,
      "y11": -2,
      "y12": 1
    },
    "note": "Self-described 'omniliberal': pro-capitalism free-trade social democrat, pro-2A gun-owning liberal, hostile to crypto, and the internet's loudest defender of elections, media, and experts - but his institutionalism turned conditional in 2025 (refused to condemn the Kirk killing, endorsed tit-for-tat escalation, calls Trump's DOJ weaponized).",
    "sources": [
      {
        "title": "Destiny (streamer) - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Destiny_(streamer)"
      },
      {
        "title": "Yale debate coverage - Buckley Beacon, Dec 2025",
        "url": "https://buckleybeacon.com/2025/12/05/students-host-left-wing-streamer-destiny-for-debate-on-campus/"
      },
      {
        "title": "Destiny: a liberal in the age of radicals - Razib Khan",
        "url": "https://www.razibkhan.com/p/destiny-steven-bonnell-ii-a-liberal"
      },
      {
        "title": "Destiny calls NFTs a scam - Sportskeeda",
        "url": "https://www.sportskeeda.com/esports/twitch-streamer-destiny-calls-nfts-scam-ends-paid-promotion-nfts-within-week"
      },
      {
        "title": "Musk calls for prosecution over Kirk comments - UNILAD Tech",
        "url": "https://www.uniladtech.com/news/tech-news/elon-musk-call-destiny-streamer-prison-charlie-kirk-comments-346738-20250917"
      }
    ]
  },
  {
    "name": "Hutch",
    "slug": "hutch",
    "answers": {
      "e01": 0,
      "e02": 1,
      "e03": 1,
      "e04": -1,
      "e05": 0,
      "e06": -1,
      "e07": 1,
      "e08": 0,
      "e09": 1,
      "e10": -1,
      "e11": 1,
      "e12": -1,
      "s01": 1,
      "s02": -1,
      "s03": 0,
      "s04": 0,
      "s05": -1,
      "s06": 1,
      "s07": 0,
      "s08": 0,
      "s09": -1,
      "s10": 1,
      "s11": 0,
      "s12": 0,
      "y01": 1,
      "y02": 2,
      "y03": 0,
      "y04": -1,
      "y05": 0,
      "y06": 0,
      "y07": 1,
      "y08": -2,
      "y09": 1,
      "y10": -1,
      "y11": -1,
      "y12": 1
    },
    "note": "Ex-Call of Duty YouTuber turned political streamer: documented Bernie-supporting progressive who is pragmatically incrementalist - praises the Biden administration, canvassed for Democrats in 2024, defends the judiciary and electoralism, and rejects both-parties-same framing. Issue record is genuinely thin (stub-level documentation): economics/social scores are ±1 alignment scores off his Bernie-progressive profile, with 0 wherever even that inference is a stretch.",
    "sources": [
      {
        "title": "Hutch - Destiny Wiki",
        "url": "https://wiki.destiny.gg/view/Hutch"
      },
      {
        "title": "Hutch on X (bio + posts)",
        "url": "https://x.com/hutchinson"
      },
      {
        "title": "Hutch on Donald Trump winning the 2024 Election",
        "url": "https://www.youtube.com/watch?v=VfkespKImGI"
      },
      {
        "title": "Spanberger-response defense tweet",
        "url": "https://x.com/hutchinson/status/2025323715421241773"
      },
      {
        "title": "Judiciary defense tweet",
        "url": "https://x.com/hutchinson/status/1800266015928173028"
      }
    ]
  },
  {
    "name": "Tim Pool",
    "slug": "pool",
    "answers": {
      "e01": 2,
      "e02": 1,
      "e03": -1,
      "e04": 0,
      "e05": 1,
      "e06": 0,
      "e07": 0,
      "e08": 0,
      "e09": -1,
      "e10": 0,
      "e11": -2,
      "e12": 0,
      "s01": 0,
      "s02": 2,
      "s03": 2,
      "s04": -1,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": 1,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 1,
      "y05": 0,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": -1,
      "y12": -1
    },
    "note": "Occupy-era journalist turned MAGA-populist podcaster: emphatically pro-tariff, restrictionist on legal and illegal immigration, anti-CRT/DEI, pro-2A, two-sexes on gender, and radically system-distrusting (media, 2020 election, DOJ, experts, explicit deep-state belief). Seated in the White House new-media press seat from March 2025 but broke with Trump over Epstein files in late 2025-26 - insurgency outranks partisanship; residual-left holdovers (public healthcare in principle, drug legalization) survive as rhetoric.",
    "sources": [
      {
        "title": "Tim Pool - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Tim_Pool"
      },
      {
        "title": "H-1B / tariffs / restricted legal immigration post",
        "url": "https://x.com/Timcast/status/1872649908056195221"
      },
      {
        "title": "\"Of course there is a deep state\" - Media Matters, Dec 2025",
        "url": "https://www.mediamatters.org/tim-pool/tim-pool-i-believe-trump-losing"
      },
      {
        "title": "Mass-deportations \"MAGA's dead\" - Media Matters 2025",
        "url": "https://www.mediamatters.org/tim-pool/tim-pool-trump-administration-telling-people-back-mass-deportations-and-says-me-yeah-magas"
      },
      {
        "title": "First WH new-media-seat question (\"Maryland man hoax\")",
        "url": "https://www.realclearpolitics.com/video/2025/04/23/in_new_media_seat_tim_pool_asks_wh_about_maryland_man_hoax_.html"
      },
      {
        "title": "Epstein-files rebuke of Trump - Mediaite, Feb 2026",
        "url": "https://www.mediaite.com/online/tim-pool-lashes-out-at-trump-for-shocking-dismissal-of-epstein-files-as-a-hoax/"
      }
    ]
  },
  {
    "name": "Vladimir Putin",
    "slug": "putin",
    "answers": {
      "e01": 2,
      "e02": 1,
      "e03": 0,
      "e04": -2,
      "e05": 2,
      "e06": -2,
      "e07": 2,
      "e08": -1,
      "e09": -2,
      "e10": 0,
      "e11": -2,
      "e12": -2,
      "s01": 0,
      "s02": 2,
      "s03": -2,
      "s04": -2,
      "s05": 2,
      "s06": -1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -2,
      "s11": 1,
      "s12": 1,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": -2,
      "y07": -2,
      "y08": 2,
      "y09": -1,
      "y10": 2,
      "y11": 2,
      "y12": -2
    },
    "note": "Scored by governing conduct via own-record analogues: statist-protectionist economics (import substitution, decreed minimum-wage doubling, 2024 tax hikes on high incomes and corporations, forced state capture of Yandex, pronatalist maternity capital) with enforced 'traditional values' social policy, and the authoritarian pole on every system item - rigged elections, subordinated courts, crushed protest and media, term limits reset by amendment.",
    "sources": [
      {
        "title": "Kremlin.ru - progressive income tax law signed",
        "url": "http://en.kremlin.ru/acts/news/74542"
      },
      {
        "title": "Interfax - 2026 minimum wage law",
        "url": "https://interfax.com/newsroom/top-stories/115020/"
      },
      {
        "title": "Amnesty - 2023 gender-transition ban",
        "url": "https://www.amnesty.org/en/latest/news/2023/07/russia-adoption-of-transphobic-legislation-a-horrendous-blow-to-human-rights/"
      },
      {
        "title": "US Mission to OSCE - 2024 election neither free nor fair",
        "url": "https://osce.usmission.gov/on-the-russian-presidential-elections-and-russias-violations-of-osce-principles-and-commitments/"
      },
      {
        "title": "PBS - Putin: Trump cases show 'rottenness' of US system",
        "url": "https://www.pbs.org/newshour/politics/putin-says-prosecution-of-trump-shows-rottenness-u-s-political-system"
      },
      {
        "title": "Global Detention Project - 2025 expulsion regime",
        "url": "https://www.globaldetentionproject.org/russia-weaponising-immigration-policies-to-push-migrants-into-war-and-launching-a-new-expulsion-regime"
      }
    ]
  },
  {
    "name": "Xi Jinping",
    "slug": "xi",
    "answers": {
      "e01": 2,
      "e02": 1,
      "e03": 1,
      "e04": -2,
      "e05": 2,
      "e06": -1,
      "e07": 2,
      "e08": -2,
      "e09": -2,
      "e10": 0,
      "e11": 1,
      "e12": 0,
      "s01": 1,
      "s02": 1,
      "s03": -2,
      "s04": -2,
      "s05": 1,
      "s06": -1,
      "s07": -2,
      "s08": -2,
      "s09": 1,
      "s10": -2,
      "s11": 1,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": -2,
      "y07": -2,
      "y08": 2,
      "y09": -1,
      "y10": 2,
      "y11": 2,
      "y12": -2
    },
    "note": "Scored by governing conduct via own-record analogues: party-led state capitalism (counter-tariffs and self-reliance doctrine, Ant/Alibaba crackdown, 'common prosperity' pressure on high incomes, near-universal state medical insurance, total crypto ban, first national childcare subsidy, party-only unions) plus restrictive social practice (world-leading executions, sinicized religion, mandatory patriotic education), and the authoritarian pole on every system item - no competitive elections, party-subordinated courts and media, crushed protest, term limits abolished 2018.",
    "sources": [
      {
        "title": "CNBC - Xi: regulate excessively high incomes",
        "url": "https://www.cnbc.com/2021/08/18/chinas-xi-emphasizes-common-prosperity-at-finance-economy-meeting.html"
      },
      {
        "title": "Baker McKenzie - PBOC declares all crypto transactions illegal",
        "url": "https://blockchain.bakermckenzie.com/2021/10/04/chinas-central-bank-declares-all-cryptocurrency-transactions-illegal/"
      },
      {
        "title": "SCMP - first national childcare subsidies",
        "url": "https://www.scmp.com/economy/china-economy/article/3319872/china-launches-first-national-childcare-subsidies-bid-tackle-demographic-crisis"
      },
      {
        "title": "ChinaFile - Document 9 translation",
        "url": "https://www.chinafile.com/document-9-chinafile-translation"
      },
      {
        "title": "HRW - Hong Kong one year after the NSL",
        "url": "https://www.hrw.org/feature/2021/06/25/dismantling-free-society/hong-kong-one-year-after-national-security-law"
      },
      {
        "title": "Al Jazeera - parliament scraps presidential term limits",
        "url": "https://www.aljazeera.com/news/2018/3/11/china-parliament-scraps-presidential-term-limits"
      }
    ]
  },
  {
    "name": "Ron DeSantis",
    "slug": "desantis",
    "answers": {
      "e01": 1,
      "e02": -2,
      "e03": -2,
      "e04": 1,
      "e05": 1,
      "e06": 0,
      "e07": -1,
      "e08": 2,
      "e09": -2,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -2,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": 0,
      "y03": -2,
      "y04": 2,
      "y05": -2,
      "y06": 1,
      "y07": 0,
      "y08": 0,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his Florida executive record: mass-deportation partnership with ICE, six-week abortion ban, permitless carry, Stop WOKE/anti-DEI laws, trans-care ban, and 2026 property-tax abolition drive - hard-right on both policy axes, with insurgent 'deep state'/'slitting throats' rhetoric tempered by a governor's procedural institutionalism on elections and courts.",
    "sources": [
      {
        "title": "Laws DeSantis has passed as Florida governor - PBS NewsHour",
        "url": "https://www.pbs.org/newshour/politics/here-is-a-look-at-the-laws-desantis-has-passed-as-florida-governor-from-abortion-to-guns"
      },
      {
        "title": "DeSantis signs sweeping immigration laws for Trump's agenda - WLRN",
        "url": "https://www.wlrn.org/government-politics/2025-02-13/desantis-signs-sweeping-immigration-laws-for-trumps-agenda"
      },
      {
        "title": "Save Our Homes property-tax elimination special session - flgov.com",
        "url": "https://www.flgov.com/eog/news/press/2026/governor-ron-desantis-announces-special-session-property-tax-relief-unveils-save"
      },
      {
        "title": "DeSantis vows to 'start slitting throats' of federal workers - GovExec",
        "url": "https://www.govexec.com/management/2023/08/desantis-vows-start-slitting-throats-federal-workers-day-one-presidency/389093/"
      },
      {
        "title": "DeSantis targets ballot initiatives, property taxes and gun laws - WUSF",
        "url": "https://www.wusf.org/politics-issues/2025-03-04/desantis-targets-ballot-initiatives-property-taxes-gun-laws-legislature-opens-session"
      }
    ]
  },
  {
    "name": "Elizabeth Warren",
    "slug": "warren",
    "answers": {
      "e01": -2,
      "e02": 2,
      "e03": 2,
      "e04": -2,
      "e05": 2,
      "e06": -2,
      "e07": 2,
      "e08": -2,
      "e09": 2,
      "e10": -2,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 1,
      "s05": -2,
      "s06": 2,
      "s07": 2,
      "s08": -1,
      "s09": -2,
      "s10": 2,
      "s11": -2,
      "s12": 2,
      "y01": 1,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 0,
      "y06": 0,
      "y07": -1,
      "y08": 1,
      "y09": 2,
      "y10": -1,
      "y11": 1,
      "y12": 1
    },
    "note": "Scored on her Banking-ranking-member record: no on the GENIUS Act, the 2026 Ultra-Millionaire wealth tax, 'dumbest trade war in history' attacks on Trump tariffs, and defense of the press, elections, civil service and expert policymaking - far-left economically, structural-reformist (Court expansion, anti-donor politics) but institution-defending on the y-axis.",
    "sources": [
      {
        "title": "Warren floor speech against the GENIUS Act - Senate Banking",
        "url": "https://www.banking.senate.gov/newsroom/minority/on-senate-floor-warren-urges-colleagues-to-vote-no-on-the-genius-act"
      },
      {
        "title": "Ultra-Millionaire Tax Act - CBS News",
        "url": "https://www.cbsnews.com/news/elizabeth-warren-wealth-tax-plan-ultra-millionaire-tax-act/"
      },
      {
        "title": "Trump tariff policy 'all chaos and corruption' - ABC News",
        "url": "https://abcnews.com/Politics/trumps-tariff-policy-chaos-corruption-sen-elizabeth-warren/story?id=120752506"
      },
      {
        "title": "Warren slams Trump/Carr attack on Kimmel, free press - warren.senate.gov",
        "url": "https://www.warren.senate.gov/newsroom/press-releases/icymi-warren-slams-attack-by-trump-carr-on-kimmel-free-speech-free-press-at-spotlight-forum"
      },
      {
        "title": "Warren calls for Supreme Court expansion - warren.senate.gov",
        "url": "https://www.warren.senate.gov/newsroom/press-releases/in-op-ed-senator-warren-calls-for-supreme-court-expansion-to-protect-democracy-and-restore-independent-judiciary/"
      }
    ]
  },
  {
    "name": "Pete Buttigieg",
    "slug": "buttigieg",
    "answers": {
      "e01": -2,
      "e02": 1,
      "e03": 1,
      "e04": -2,
      "e05": 0,
      "e06": -1,
      "e07": 2,
      "e08": 0,
      "e09": 2,
      "e10": -1,
      "e11": 2,
      "e12": -2,
      "s01": 2,
      "s02": -2,
      "s03": -2,
      "s04": 1,
      "s05": -2,
      "s06": 2,
      "s07": 2,
      "s08": 1,
      "s09": -2,
      "s10": 2,
      "s11": -1,
      "s12": 2,
      "y01": 1,
      "y02": 2,
      "y03": -1,
      "y04": -2,
      "y05": 0,
      "y06": -1,
      "y07": 1,
      "y08": -1,
      "y09": 2,
      "y10": -2,
      "y11": 1,
      "y12": 2
    },
    "note": "Scored on his post-DOT 2025-26 media-circuit persona and 2020 platform: anti-tariff, tax-the-wealthy, Medicare-for-All-Who-Want-It center-left economics with strong LGBTQ/climate commitments, and a deeply institutionalist y-axis - pro-election, pro-expert, pro-compromise - leavened only by his old Electoral College and Court-expansion reform plans.",
    "sources": [
      {
        "title": "Buttigieg on Trump tariffs and taxing billionaires - Flagrant transcript",
        "url": "https://podscripts.co/podcasts/andrew-schulzs-flagrant-with-akaash-singh/pete-buttigieg-on-trump-tariffs-taxing-billionaires-and-republican-gays"
      },
      {
        "title": "Buttigieg: trans rights approach 'starts with compassion' - The Hill",
        "url": "https://thehill.com/homenews/lgbtq/5424293-buttigieg-transgender-rights-trans-athletes-trump-administration/"
      },
      {
        "title": "Buttigieg on the Democratic Party, AI, and his future - Michigan Public",
        "url": "https://www.michiganpublic.org/podcast/its-just-politics/2025-08-20/pete-buttigieg-on-the-democratic-party-ai-and-his-political-future"
      },
      {
        "title": "iSideWith policy profile - Pete Buttigieg",
        "url": "https://www.isidewith.com/candidates/pete-buttigieg/policies"
      },
      {
        "title": "Ballotpedia: Pete Buttigieg",
        "url": "https://ballotpedia.org/Pete_Buttigieg"
      }
    ]
  },
  {
    "name": "John Fetterman",
    "slug": "fetterman",
    "answers": {
      "e01": 1,
      "e02": 1,
      "e03": 0,
      "e04": -2,
      "e05": 0,
      "e06": -1,
      "e07": 1,
      "e08": 1,
      "e09": 2,
      "e10": -1,
      "e11": -1,
      "e12": -1,
      "s01": 2,
      "s02": -1,
      "s03": -1,
      "s04": -1,
      "s05": 1,
      "s06": 1,
      "s07": 0,
      "s08": 0,
      "s09": -1,
      "s10": 2,
      "s11": 0,
      "s12": 1,
      "y01": 0,
      "y02": 2,
      "y03": 1,
      "y04": -1,
      "y05": -2,
      "y06": 0,
      "y07": 0,
      "y08": 0,
      "y09": 0,
      "y10": -1,
      "y11": 0,
      "y12": 2
    },
    "note": "Scored on his 2025-26 breakaway record: highest Trump-support score of any Senate Democrat (26%), pro-tariff ('the trade war is going well'), Laken Riley cosponsor and ICE defender, sole Dem vote for AG Bondi, GENIUS Act yes - yet still union-first, pro-choice, pro-weed economics, with a loudly institutionalist condemnation of protest 'anarchy' and a compromise-is-the-job identity.",
    "sources": [
      {
        "title": "Fetterman 2026 voting scorecard - CongressVoteTracker",
        "url": "https://congressvotetracker.org/articles/fetterman-scorecard-march-2026.html"
      },
      {
        "title": "Fetterman: trade war 'going well... absolutely' - Fox News",
        "url": "https://www.foxnews.com/politics/watch-dem-senator-agrees-gop-trumps-making-progress-trade-war"
      },
      {
        "title": "'This is anarchy and true chaos' - Fetterman on X",
        "url": "https://x.com/SenFettermanPA/status/1932234335425323417"
      },
      {
        "title": "Fetterman criticizes ICE tactics but won't oppose funding - WESA",
        "url": "https://www.wesa.fm/politics-government/2026-01-26/fetterman-ice-minneapolis-shooting-funding"
      },
      {
        "title": "Fetterman would leave Democratic Party over Israel - CNN",
        "url": "https://www.cnn.com/2026/07/16/politics/fetterman-democratic-party-anti-israel"
      }
    ]
  },
  {
    "name": "Marjorie Taylor Greene",
    "slug": "mtg",
    "answers": {
      "e01": 0,
      "e02": -1,
      "e03": -1,
      "e04": 0,
      "e05": 2,
      "e06": -1,
      "e07": -1,
      "e08": 1,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 1,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -1,
      "y06": 2,
      "y07": -1,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 2,
      "y12": 0
    },
    "note": "Scored on her 2025 populist defection: still hard-right on trans care (her felony ban passed the House Dec 2025), guns, Christian nationalism and deportations, but maximally insurgent - broke with Trump over Epstein files, ACA subsidies, tariffs, H-1B visas and 'foreign wars', blamed both parties and their donors, and resigned from Congress Jan 2026.",
    "sources": [
      {
        "title": "NPR: MTG's political transformation, explained (Jan 2026)",
        "url": "https://www.npr.org/2026/01/06/nx-s1-5668142/marjorie-taylor-greenes-puzzling-political-transformation-explained"
      },
      {
        "title": "NPR: From top Trump ally to resignation",
        "url": "https://www.npr.org/2025/11/22/g-s1-98793/marjorie-taylor-greene-resignation"
      },
      {
        "title": "The Hill: Greene bill to phase out H-1B visas",
        "url": "https://thehill.com/homenews/house/5605801-marjorie-taylor-greene-h-1b-visas/"
      },
      {
        "title": "Congressional Equality Caucus: Protect Children's Innocence Act passes House",
        "url": "https://equality.house.gov/media-center/in-the-news/marjorie-taylor-greenes-sweeping-anti-trans-care-bill-passes-house"
      },
      {
        "title": "Newsweek: MTG's DOGE plan to fire government employees",
        "url": "https://www.newsweek.com/marjorie-taylor-greene-doge-subcommittee-trump-1990001"
      },
      {
        "title": "Forbes: Timeline of Greene's break with Trump and the GOP",
        "url": "https://www.forbes.com/sites/yezensaadah/2025/08/04/a-timeline-of-marjorie-taylor-greenes-monthslong-break-with-trump-and-gop/"
      }
    ]
  },
  {
    "name": "Ben Shapiro",
    "slug": "shapiro",
    "answers": {
      "e01": -2,
      "e02": -2,
      "e03": -2,
      "e04": 2,
      "e05": -1,
      "e06": 1,
      "e07": -2,
      "e08": 1,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 1,
      "s06": 1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": -1,
      "y01": -2,
      "y02": 1,
      "y03": -1,
      "y04": 1,
      "y05": -2,
      "y06": 2,
      "y07": 1,
      "y08": -1,
      "y09": -2,
      "y10": 1,
      "y11": -2,
      "y12": 1
    },
    "note": "Free-market institutional conservative: called Trump's 2025 tariffs 'one of the biggest tax increases' in US history and probably unconstitutional, wants a higher retirement age, defends legal/H-1B immigration and courts, and rejected stolen-2020 claims - while staying hard-right on abortion, DEI, youth transition and the expert class.",
    "sources": [
      {
        "title": "Media Matters: Shapiro - tariffs 'a massive tax increase on American consumers'",
        "url": "https://www.mediamatters.org/ben-shapiro/ben-shapiro-trumps-tariffs-are-massive-tax-increase-american-consumers-and-it-designed"
      },
      {
        "title": "Mediaite: Shapiro hammers Trump's tariffs as likely unconstitutional",
        "url": "https://www.mediaite.com/media/podcasts/ben-shapiro-hammers-trumps-tariffs-warns-they-are-likely-unconstitutional-and-based-on-backward-logic/"
      },
      {
        "title": "Daily Wire: Shapiro - 2020 was 'rigged (not stolen)'",
        "url": "https://www.dailywire.com/news/ben-shapiro-twitter-files-show-2020-was-rigged-not-stolen-but-trump-is-hurting-himself"
      },
      {
        "title": "Yahoo Finance: Shapiro on Social Security and retirement age",
        "url": "https://finance.yahoo.com/news/ben-shapiro-says-social-security-111100729.html"
      },
      {
        "title": "PBS Frontline interview (legal immigration/H-1B)",
        "url": "https://www.pbs.org/wgbh/frontline/interview/ben-shapiro/"
      },
      {
        "title": "Media Matters: How Shapiro is disagreeing with Trump (2025)",
        "url": "https://www.mediamatters.org/ben-shapiro/how-right-wing-podcaster-ben-shapiro-disagreeing-trump"
      }
    ]
  },
  {
    "name": "Charlie Kirk",
    "slug": "kirk",
    "answers": {
      "e01": 1,
      "e02": -2,
      "e03": -2,
      "e04": 2,
      "e05": 1,
      "e06": 0,
      "e07": -1,
      "e08": 1,
      "e09": -1,
      "e10": 2,
      "e11": -2,
      "e12": 2,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": -2,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": -1,
      "y06": 2,
      "y07": -1,
      "y08": 1,
      "y09": -2,
      "y10": 2,
      "y11": -1,
      "y12": -2
    },
    "note": "Scored on his record through his Sept 2025 assassination: MAGA-populist Christian nationalist - gun deaths 'worth it' for the 2nd Amendment, no separation of church and state, Civil Rights Act an 'anti-white weapon', anti-H-1B, televised executions - free-market on wages/taxes/college debt, and insurgent on elections, the FBI, media and experts.",
    "sources": [
      {
        "title": "FactCheck.org: Viral claims about Charlie Kirk's words",
        "url": "https://www.factcheck.org/2025/09/viral-claims-about-charlie-kirks-words/"
      },
      {
        "title": "GV Wire: Where Charlie Kirk stood on key political issues",
        "url": "https://gvwire.com/2025/09/11/where-charlie-kirk-stood-on-key-political-issues/"
      },
      {
        "title": "Wikipedia: Charlie Kirk (positions, Jan 6 buses, church-state reversal)",
        "url": "https://en.wikipedia.org/wiki/Charlie_Kirk"
      },
      {
        "title": "Newsweek: Kirk on public, televised executions",
        "url": "https://www.newsweek.com/charlie-kirk-death-penalty-public-executions-1873073"
      },
      {
        "title": "The Federal: Kirk's anti-H-1B visa stance",
        "url": "https://thefederal.com/category/news/charlie-kirks-anti-india-visa-stance-resurfaces-206121"
      },
      {
        "title": "The American Prospect: Charlie Kirk's theocracy",
        "url": "https://prospect.org/2025/09/22/2025-09-22-charlie-kirks-theocracy/"
      }
    ]
  },
  {
    "name": "Tucker Carlson",
    "slug": "carlson",
    "answers": {
      "e01": 2,
      "e02": 0,
      "e03": 0,
      "e04": -1,
      "e05": 2,
      "e06": 0,
      "e07": 1,
      "e08": 0,
      "e09": 1,
      "e10": 0,
      "e11": -2,
      "e12": -1,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -2,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -2,
      "s11": 2,
      "s12": 1,
      "y01": -2,
      "y02": -1,
      "y03": -2,
      "y04": 1,
      "y05": 0,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his post-Fox populist-nationalist record: pro-tariff economic nationalism and Big Tech antitrust alongside hard-right culture-war positions (deportation, replacement rhetoric, spiritual-battle Christianity), and near-total system distrust - deep state, media, experts - capped by his 2026 Iran-war break with Trump declaring MAGA has 'no future.'",
    "sources": [
      {
        "title": "Bessent tariff interview transcript - Treasury",
        "url": "https://home.treasury.gov/news/press-releases/sb0073"
      },
      {
        "title": "Great replacement 'electoral strategy' - Fox News opinion",
        "url": "https://www.foxnews.com/opinion/tucker-carlson-great-replacement-electoral-strategy"
      },
      {
        "title": "Dominion-suit private texts - NBC News",
        "url": "https://www.nbcnews.com/politics/donald-trump/private-fox-news-text-messages-emails-released-dominion-suit-rcna72693"
      },
      {
        "title": "2026 Iran-war break with Trump - ABC News",
        "url": "https://abcnews.com/US/trumps-iran-decision-sparks-backlash-tucker-carlson-maga/story?id=130622270"
      },
      {
        "title": "Climate experts 'controlling us' op-ed - Fox News",
        "url": "https://www.foxnews.com/opinion/tucker-carlson-climate-change-experts-bullying-helping-earth-controlling-us"
      },
      {
        "title": "Spiritual battle against Christians - Blaze Media",
        "url": "https://www.theblaze.com/news/tucker-carlson-spiritual-battle-christians"
      }
    ]
  },
  {
    "name": "Tulsi Gabbard",
    "slug": "gabbard",
    "answers": {
      "e01": 0,
      "e02": 1,
      "e03": 0,
      "e04": -1,
      "e05": 2,
      "e06": -1,
      "e07": 1,
      "e08": 0,
      "e09": 1,
      "e10": 0,
      "e11": 0,
      "e12": -1,
      "s01": 1,
      "s02": 1,
      "s03": 1,
      "s04": -1,
      "s05": 1,
      "s06": 0,
      "s07": -2,
      "s08": 1,
      "s09": 0,
      "s10": 2,
      "s11": 1,
      "s12": 0,
      "y01": -2,
      "y02": 0,
      "y03": -2,
      "y04": 2,
      "y05": -1,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -1,
      "y10": 2,
      "y11": 0,
      "y12": 1
    },
    "note": "Scored on her Trump-DNI record (2025-26): deep-state declassifications alleging an Obama 'treasonous conspiracy', 'propaganda media' attacks, and IC purges make her strongly insurgent, while her largely unrepudiated progressive congressional economics (Medicare for All cosponsor, anti-TCJA vote, marijuana legalization bills) and 'safe, legal, rare' abortion stance keep her near center on the left-right axis despite flips on guns and FISA 702.",
    "sources": [
      {
        "title": "ODNI release on impeachment 'conspiracy' declassification",
        "url": "https://www.dni.gov/index.php/newsroom/press-releases/press-releases-2026/4154-pr-06-26"
      },
      {
        "title": "CNN on her DNI deep-state pursuit and exit",
        "url": "https://www.cnn.com/2026/05/23/politics/tulsi-gabbard-sidelined-deep-state-trump-grievances"
      },
      {
        "title": "Trump endorsement / 'cabal of warmongers' - The Hill",
        "url": "https://thehill.com/homenews/campaign/4848258-tulsi-gabbard-endorse-donald-trump/"
      },
      {
        "title": "FISA 702 reversal - Washington Post",
        "url": "https://www.washingtonpost.com/national-security/2025/01/28/tulsi-gabbard-section-702-fisa-surveillance/"
      },
      {
        "title": "Ending Federal Marijuana Prohibition Act - House office",
        "url": "https://gabbard.house.gov/news/press-releases/rep-tulsi-gabbard-introduces-bill-end-marijuana-prohibition-expunge-prior"
      },
      {
        "title": "2nd Amendment 'shall not be infringed' - her Substack",
        "url": "https://tulsi.substack.com/p/2nd-amendment-our-right-shall-not"
      }
    ]
  },
  {
    "name": "Candace Owens",
    "slug": "owens",
    "answers": {
      "e01": 0,
      "e02": -2,
      "e03": -1,
      "e04": 0,
      "e05": 1,
      "e06": 0,
      "e07": -1,
      "e08": 0,
      "e09": 0,
      "e10": 1,
      "e11": -2,
      "e12": 0,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -2,
      "s05": 2,
      "s06": -1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": -1,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 0,
      "y05": 0,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": 0
    },
    "note": "Hard-right cultural traditionalist (anti-abortion Catholic convert, anti-trans, anti-DEI, pro-deportation) with anti-socialist but thin economics, and a maximally conspiratorial system view - stolen-2020 claims, 'state TV' media, science as 'pagan faith' - now fully post-MAGA after calling Trump a 'genocidal maniac' over the 2026 Iran strikes and declaring the left-right war fake.",
    "sources": [
      {
        "title": "2020 election 'CHEATED' post - X",
        "url": "https://x.com/realcandaceo/status/1415647711240536066"
      },
      {
        "title": "'I Don't Recognize Him' - 2026 break-with-Trump interview",
        "url": "https://natlawreview.com/press-releases/i-dont-recognize-him-candace-owens-her-break-trump-and-future-maga-exclusive"
      },
      {
        "title": "Science as 'pagan faith' - Newsweek",
        "url": "https://www.newsweek.com/candace-owens-science-pagan-faith-christianity-podcast-1920510"
      },
      {
        "title": "Science Feedback review of her climate claims",
        "url": "https://science.feedback.org/reviewed-content-author/candace-owens/"
      },
      {
        "title": "Candace Owens - Wikipedia (career, positions, controversies)",
        "url": "https://en.wikipedia.org/wiki/Candace_Owens"
      },
      {
        "title": "Immigration position record - iSideWith",
        "url": "https://www.isidewith.com/candidates/candace-owens/policies/immigration"
      }
    ]
  },
  {
    "name": "Bill Maher",
    "slug": "maher",
    "answers": {
      "e01": -1,
      "e02": 1,
      "e03": -1,
      "e04": 0,
      "e05": 0,
      "e06": 0,
      "e07": 0,
      "e08": -1,
      "e09": 0,
      "e10": 2,
      "e11": 1,
      "e12": 0,
      "s01": 2,
      "s02": 0,
      "s03": -1,
      "s04": -1,
      "s05": -2,
      "s06": 1,
      "s07": -1,
      "s08": -2,
      "s09": 0,
      "s10": 2,
      "s11": 1,
      "s12": -2,
      "y01": 0,
      "y02": 2,
      "y03": 1,
      "y04": -2,
      "y05": -1,
      "y06": 1,
      "y07": 1,
      "y08": 1,
      "y09": 0,
      "y10": -2,
      "y11": -1,
      "y12": 2
    },
    "note": "Old-school liberal institutionalist: pro-choice, pro-weed, emphatically anti-religion and pro-election-trust, warning of Trump's 'slow-moving coup' while insisting the checks are holding - but defects rightward on student-debt forgiveness ('loser issue'), tax-the-rich rhetoric, wokeness, ICE-era immigration nuance, and the death penalty, which keeps him only mildly left of center.",
    "sources": [
      {
        "title": "Maher's 'slow-moving coup' warnings - The Fulcrum",
        "url": "https://thefulcrum.us/governance-legislation/bill-maher-trump-coup"
      },
      {
        "title": "Trump dinner: 'every right to say so in a democracy' - THR",
        "url": "https://www.hollywoodreporter.com/news/politics-news/bill-maher-trump-dinner-criticism-successes-failures-1236524233/"
      },
      {
        "title": "Student loan forgiveness a 'loser issue' - Forbes",
        "url": "https://www.forbes.com/sites/zackfriedman/2022/05/09/bill-maher-student-loan-forgiveness-is-a-loser-issue/"
      },
      {
        "title": "Democrats will 'lose every election' on trans issues - The Hill",
        "url": "https://thehill.com/blogs/in-the-know/5163583-maher-criticizes-democrats-on-transgender-issues/"
      },
      {
        "title": "Nearly 60% of income to taxes - Fox Business",
        "url": "https://www.foxbusiness.com/media/bill-maher-says-nearly-60-his-income-taxes-calls-out-rich-dont-pay-narrative"
      },
      {
        "title": "Jewish Journal profile: 'sticking to his beliefs'",
        "url": "https://jewishjournal.com/cover_story/351501/bill-maher-is-sticking-to-his-beliefs-whether-you-like-it-or-not/"
      }
    ]
  },
  {
    "name": "Nikki Haley",
    "slug": "haley",
    "answers": {
      "e01": -2,
      "e02": -2,
      "e03": -1,
      "e04": 1,
      "e05": 0,
      "e06": 0,
      "e07": -1,
      "e08": 0,
      "e09": -2,
      "e10": 2,
      "e11": -2,
      "e12": 1,
      "s01": -1,
      "s02": 1,
      "s03": 2,
      "s04": -1,
      "s05": 1,
      "s06": 1,
      "s07": -2,
      "s08": 0,
      "s09": 0,
      "s10": 0,
      "s11": 2,
      "s12": -2,
      "y01": 0,
      "y02": 2,
      "y03": -1,
      "y04": 1,
      "y05": -1,
      "y06": -1,
      "y07": 1,
      "y08": 0,
      "y09": -1,
      "y10": 0,
      "y11": -1,
      "y12": 2
    },
    "note": "Scored on her 2024 campaign and 2025-26 commentary: orthodox free-market conservatism (anti-tariff op-eds against Trump into 2025, entitlement-age reform, praised striking down loan forgiveness) with hard-right social positions, but firmly institutionalist - affirms Biden's legitimate win, condemned Jan 6, and brands herself on consensus and civility.",
    "sources": [
      {
        "title": "Op-ed: Trump's Proposed Tariff Would Hurt American Workers",
        "url": "https://www.presidency.ucsb.edu/documents/op-ed-nikki-haley-trumps-proposed-tariff-would-hurt-american-workers-and-reignite"
      },
      {
        "title": "Haley questions Trump's China/India trade moves (2025) - The Hill",
        "url": "https://thehill.com/business/5437154-us-china-tariffs-india-oil-haley/"
      },
      {
        "title": "Where Haley stands on 2020 election, Jan. 6 - Washington Post",
        "url": "https://www.washingtonpost.com/politics/interactive/2023/presidential-candidates-2024-policies-issues/nikki-haley-jan-6-2020-election-results/"
      },
      {
        "title": "Haley political views breakdown - NewsNation",
        "url": "https://www.newsnationnow.com/politics/2024-election/nikki-haley-political-views-2024/"
      },
      {
        "title": "Haley statement on SCOTUS affirmative-action ruling",
        "url": "https://www.presidency.ucsb.edu/documents/statement-nikki-haley-the-supreme-court-affirmative-action-ruling"
      },
      {
        "title": "Haley's tax and budget platform - Tax Policy Center",
        "url": "https://taxpolicycenter.org/taxvox/what-nikki-haleys-tax-and-budget-platform"
      }
    ]
  },
  {
    "name": "Jon Stewart",
    "slug": "stewart",
    "answers": {
      "e01": -1,
      "e02": 2,
      "e03": 2,
      "e04": -1,
      "e05": 1,
      "e06": -1,
      "e07": 0,
      "e08": -1,
      "e09": 2,
      "e10": 0,
      "e11": 0,
      "e12": -2,
      "s01": 2,
      "s02": -1,
      "s03": -2,
      "s04": 0,
      "s05": -2,
      "s06": 1,
      "s07": 1,
      "s08": 0,
      "s09": -2,
      "s10": 0,
      "s11": -1,
      "s12": 0,
      "y01": -2,
      "y02": 1,
      "y03": -1,
      "y04": -2,
      "y05": 1,
      "y06": 1,
      "y07": -1,
      "y08": 2,
      "y09": 0,
      "y10": 0,
      "y11": 0,
      "y12": 1
    },
    "note": "Scored on his 2024-26 Daily Show/Weekly Show run: single-payer and billionaire-tax populism, union solidarity, and fierce defense of trans care, gun regulation, and civil servants against DOGE and ICE - paired with career-long insurgent contempt for cable news, donor-captured parties, and a Supreme Court he calls 'the Fox News of justice,' while still defending elections and democratic process.",
    "sources": [
      {
        "title": "Stewart on DOGE firings 'animated by malice'",
        "url": "https://www.inkl.com/news/jon-stewart-on-doge-firings-of-civil-servants-animated-by-malice"
      },
      {
        "title": "Stewart ICE monologue ('paramilitary,' zip-tying children) - The Mirror",
        "url": "https://www.themirror.com/entertainment/jon-stewart-ice-critic-monologue-1433227"
      },
      {
        "title": "Stewart-Lina Khan interview on Big Tech power - CNN",
        "url": "https://www.cnn.com/2024/04/02/media/jon-stewart-lina-khan-apple-interview"
      },
      {
        "title": "Stewart-Rutledge exchange on gender-affirming care - Newsweek",
        "url": "https://www.newsweek.com/jon-stewarts-takedown-arkansas-ag-transgender-rights-hailed-1750076"
      },
      {
        "title": "Sanders-Stewart on broken healthcare (Oct 2025)",
        "url": "https://thenationaldesk.com/news/americas-news-now/bernie-sanders-criticizes-democrats-for-ignoring-broken-us-healthcare-system-jon-stewart-the-daily-show-interview-government-shutdown-affordable-care-act-health-subsidies"
      },
      {
        "title": "Comedy pushback vs. Paramount/Trump pressure - NPR",
        "url": "https://www.npr.org/2025/07/27/nx-s1-5480172/colbert-south-park-jon-stewart-paramount-trump"
      }
    ]
  },
  {
    "name": "Vivek Ramaswamy",
    "slug": "ramaswamy",
    "answers": {
      "e01": 0,
      "e02": -2,
      "e03": -1,
      "e04": 1,
      "e05": 0,
      "e06": 1,
      "e07": 0,
      "e08": 2,
      "e09": -1,
      "e10": 1,
      "e11": -2,
      "e12": 1,
      "s01": -2,
      "s02": 2,
      "s03": 2,
      "s04": -1,
      "s05": 2,
      "s06": 1,
      "s07": -2,
      "s08": 2,
      "s09": 2,
      "s10": 1,
      "s11": 2,
      "s12": 0,
      "y01": -2,
      "y02": -2,
      "y03": -2,
      "y04": 2,
      "y05": 0,
      "y06": 2,
      "y07": 0,
      "y08": 2,
      "y09": -2,
      "y10": 2,
      "y11": 1,
      "y12": -1
    },
    "note": "Scored on his 2024 run plus the 2025-26 Ohio gubernatorial campaign (abolish state income tax, property-tax rollback, merit-pay schools): hard-right on abortion, trans care, deportation and DEI, crypto-libertarian and pro-marijuana on the margins, and maximally insurgent on the system - abolish the FBI and Education Department, fire 75% of the federal workforce, 'big tech stole the 2020 election,' 'climate change agenda is a hoax.'",
    "sources": [
      {
        "title": "Ramaswamy vows to gut FBI, IRS, CDC - 'shut down the administrative state' - Fox News",
        "url": "https://www.foxnews.com/media/vivek-ramaswamy-vows-gut-several-agencies-including-fbi-irs-cdc"
      },
      {
        "title": "Plans to eliminate federal agencies incl. FBI - NBC News",
        "url": "https://www.nbcnews.com/meet-the-press/meetthepressblog/vivek-ramaswamy-lays-plans-eliminate-federal-agencies-fbi-rcna95409"
      },
      {
        "title": "CNN fact check: 'big tech stole the 2020 election'",
        "url": "https://www.cnn.com/2023/08/31/politics/fact-check-vivek-ramaswamy-book-trump-2020-election/index.html"
      },
      {
        "title": "75% federal-workforce cut pledge - ABC News",
        "url": "https://abcnews.go.com/Politics/gop-presidential-candidate-vivek-ramaswamy-cut-federal-work/story?id=103152562"
      },
      {
        "title": "Ohio 2026: income/capital-gains/property tax cuts - Statehouse News Bureau",
        "url": "https://www.statenews.org/government-politics/2026-07-14/ramaswamy-touts-income-capital-gains-property-tax-cuts-as-ohios-main-business-group-endorses-him"
      },
      {
        "title": "Crypto policy framework - Axios",
        "url": "https://www.axios.com/2023/11/17/vivek-ramaswamy-crypto"
      }
    ]
  }
];

export const FIGURES = BASE_FIGURES.map((figure) => ({
  ...figure,
  answers: { ...figure.answers, ...FIGURE_2026_UPDATES[figure.slug] },
}));
