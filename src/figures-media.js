// Commentators and broadcasters: the online-media roster. Nine of the names on
// this roster (Destiny, Hasan Piker, Pakman, Brian Tyler Cohen, Alex Jones,
// Candace Owens, Ben Shapiro, Tucker Carlson, Hutch) were already scored in
// figures.js; this file holds the additions.
//
// Scoring commentators is harder than scoring officeholders: there are no
// votes, and a talk record is long, contradictory, and performed. METHOD's
// rule that 0 means genuinely mixed or no findable evidence does more work
// here than anywhere else on the board, and every dossier in this batch says
// where its evidence is thin. Dossiers: docs/figures/<slug>.md.

export const MEDIA_FIGURES = [
  {
    name: 'PF Jung',
    slug: 'pfjung',
    answers: {
      e01: 0, e02: 0, e03: 0, e04: 0, e05: 0, e07: 0, e08: 0, e09: 0,
      e10: 0, e11: 0, e12: 0, e13: 0,
      s01: 0, s02: 0, s03: 0, s04: 0, s05: 0, s06: 0, s07: -1, s08: 0,
      s09: 0, s10: 0, s11: -1, s12: 0, s13: 0,
      y01: -1, y02: 0, y03: 0, y04: 0, y05: 0, y06: 2, y08: 1, y09: -1,
      y10: 0, y11: 1, y12: 1, y13: 0, y14: 0, y15: 0,
      f01: 0, f02: 0, f03: 0,
    },
    note: 'Self-described radical centrist and "applied sociologist" whose subject is the political conflict itself rather than any policy inside it. The result is the flattest sheet on the board: he talks constantly and states positions rarely, so almost every issue item is a genuine 0 under the METHOD rule. What does register is procedural, and it is the free-speech and anti-institutional-consensus cluster. Treat this placement as provisional.',
    sources: [
      { title: 'PF Jung - YouTube channel', url: 'https://www.youtube.com/c/pfjung' },
      { title: 'PF Jung: What is Enlightened Centrism - The Living Philosophy', url: 'https://www.thelivingphilosophy.com/p/6-pf-jung-what-is-enlightened-centrism' },
      { title: 'Untimely Reflections #37: PF Jung, Enlightened Centrism', url: 'https://creators.spotify.com/pod/profile/untimely-reflections/episodes/Untimely-Reflections-37-PF-Jung---Enlightened-Centrism-e37bcpg' },
      { title: 'PF Jung\'s Faux-Centrism (critical) - TDT', url: 'https://tdtstreams.substack.com/p/pf-jungs-faux-centrism' },
      { title: 'PF Jung - Destiny Wiki', url: 'https://wiki.destiny.gg/view/PF_Jung' },
    ],
  },
  {
    name: 'Piers Morgan',
    slug: 'morgan',
    answers: {
      e01: -1, e02: 2, e03: 0, e04: 0, e05: 0, e07: 1, e08: 0, e09: 0,
      e10: 0, e11: 1, e12: 0, e13: 0,
      s01: 1, s02: 2, s03: -2, s04: -1, s05: 0, s06: 0, s07: -1, s08: 0,
      s09: 1, s10: 0, s11: -1, s12: 0, s13: 2,
      y01: 1, y02: 2, y03: -1, y04: -1, y05: -2, y06: 2, y08: 0, y09: 0,
      y10: 0, y11: -1, y12: 1, y13: -2, y14: 2, y15: 1,
      f01: -1, f02: 1, f03: 2,
    },
    note: 'British tabloid editor turned interviewer, running Uncensored to a billion YouTube views and a TIME Studios partnership. Scored as what he is: an old-media centrist who lost his American cable show over gun control, defends the NHS as a matter of course, and has spent the past several years making his name on the anti-woke side of the culture war while platforming everyone. Institutionalist on the system axis, with a free-speech exception.',
    sources: [
      { title: 'TIME Studios and Piers Morgan Uncensored announce new interview series', url: 'https://time.com/article/2026/04/22/time-studios-and-piers-morgan-s-uncensored-announce-new-interview-series/' },
      { title: 'Piers Morgan Uncensored - YouTube', url: 'https://www.youtube.com/@PiersMorganUncensored' },
      { title: 'Piers Morgan Uncensored: US Politics playlist', url: 'https://www.youtube.com/playlist?list=PLq24DlPvfmfq2bKu8xGHU1a8tIaF5E-fk' },
      { title: 'Piers Morgan\'s fieriest one-on-one debates', url: 'https://www.youtube.com/watch?v=x7QsS3TD8MU' },
      { title: 'Piers Morgan Uncensored - Spotify', url: 'https://open.spotify.com/show/31ZL74w0W9CUGHFWZPGDf5' },
    ],
  },
  {
    name: 'Andrew Wilson',
    slug: 'wilson',
    answers: {
      e01: 1, e02: -1, e03: 0, e04: 0, e05: 1, e07: -1, e08: 0, e09: 0,
      e10: -1, e11: -2, e12: 0, e13: -1,
      s01: -2, s02: 2, s03: 1, s04: -1, s05: 2, s06: -2, s07: -2, s08: 2,
      s09: 2, s10: -2, s11: 2, s12: 1, s13: -2,
      y01: -2, y02: 0, y03: 1, y04: 1, y05: 0, y06: 2, y08: 1, y09: -2,
      y10: 1, y11: 2, y12: -2, y13: 0, y14: 1, y15: 2,
      f01: 1, f02: 0, f03: -2,
    },
    note: 'Host of The Crucible and proprietor of Debate University, an Orthodox convert who argues that objective morality requires God and that secular ethics collapses into nihilism. The record is thousands of debates rather than any policy history, so the social and religious items are dense and the economic ones are nearly empty: his politics are a theology first and a program second. Far social right, hard insurgent on the system axis.',
    sources: [
      { title: 'Andrew Wilson (podcaster) - Grokipedia', url: 'https://grokipedia.com/page/Andrew_Wilson_podcaster' },
      { title: 'Who is Andrew Wilson and how prolific are his claims? - Factually', url: 'https://factually.co/fact-checks/media/who-is-andrew-wilson-claims-prolificity-fdef35' },
      { title: 'Andrew Wilson, host of The Crucible - Whatever Podcast', url: 'https://whateverpodcasts.com/andrew-wilson-host-of-the-crucible-3/' },
      { title: 'Joe Rogan Experience #2444 - Andrew Wilson', url: 'https://podcasts.apple.com/us/podcast/2444-andrew-wilson/id360084272?i=1000747055892' },
      { title: 'Andrew Wilson - Destiny Wiki', url: 'https://wiki.destiny.gg/view/Andrew_Wilson' },
    ],
  },
  {
    name: 'Steven Crowder',
    slug: 'crowder',
    answers: {
      e01: 1, e02: -2, e03: -2, e04: 2, e05: 0, e07: -2, e08: 1, e09: -2,
      e10: 2, e11: -2, e12: 2, e13: -2,
      s01: -2, s02: 2, s03: 2, s04: -2, s05: 2, s06: -1, s07: -2, s08: 2,
      s09: 2, s10: 0, s11: 2, s12: 1, s13: -2,
      y01: -2, y02: -1, y03: 1, y04: 2, y05: -1, y06: 2, y08: 1, y09: -2,
      y10: 2, y11: 1, y12: -2, y13: 0, y14: 1, y15: 2,
      f01: 1, f02: 2, f03: -1,
    },
    note: 'Louder with Crowder, the longest-running daily conservative comedy show on the platforms, built on the Change My Mind table format and a libertarian-conservative frame: limited government, free markets, traditional values, and a running argument against transgender rights and climate consensus. The libertarianism is real on economics and absent on social policy, which is the standard shape of the fusionist online right.',
    sources: [
      { title: 'Steven Crowder - Wikipedia', url: 'https://en.wikipedia.org/wiki/Steven_Crowder' },
      { title: 'Louder With Crowder - bias and credibility - Media Bias/Fact Check', url: 'https://mediabiasfactcheck.com/louder-with-crowder/' },
      { title: 'Steven Crowder - Media Matters', url: 'https://www.mediamatters.org/steven-crowder' },
      { title: 'Steven Crowder - PragerU presenter page', url: 'https://www.prageru.com/presenters/steven-crowder' },
      { title: 'Steven Crowder - Newsweek topic page', url: 'https://www.newsweek.com/topic/steven-crowder' },
    ],
  },
  {
    name: 'Nick Fuentes',
    slug: 'fuentes',
    answers: {
      e01: 2, e02: 1, e03: 1, e04: 0, e05: 2, e07: 2, e08: -1, e09: 1,
      e10: 0, e11: -1, e12: -1, e13: 0,
      s01: -2, s02: 2, s03: 1, s04: -2, s05: 2, s06: -2, s07: -2, s08: 2,
      s09: 2, s10: -2, s11: 2, s12: 1, s13: -2,
      y01: -2, y02: -2, y03: 2, y04: 2, y05: 1, y06: 2, y08: 2, y09: -2,
      y10: 2, y11: 2, y12: -2, y13: 2, y14: 2, y15: 2,
      f01: 2, f02: -2, f03: -2,
    },
    note: 'America First host and leader of the groypers, a white nationalist and antisemitic movement now running an explicit strategy to place staff inside Republican offices and to grade candidates ahead of the 2026 midterms through a foundation that took in more than $560,000. The economic sheet is the part people miss: he is anti-libertarian, pro-entitlement and anti-billionaire, which places him left of the conservative media pack on economics and at the far edge of the board on everything else.',
    sources: [
      { title: 'Nick Fuentes - Britannica', url: 'https://www.britannica.com/biography/Nick-Fuentes' },
      { title: 'White nationalist Fuentes plans to target the 2026 midterms', url: 'https://ground.news/article/white-nationalist-fuentes-plans-to-target-2026-midterms_09c242' },
      { title: 'GOP staffers warn the groyper strategy is eating the party from within', url: 'https://www.techtimes.com/articles/322883/20260803/gop-staffers-warn-far-right-groyper-strategy-eating-republican-party-within.htm' },
      { title: 'What Nick Fuentes and the groypers want - The Week', url: 'https://theweek.com/politics/what-nick-fuentes-and-the-groypers-want' },
      { title: 'Fuentes revels in groyper infiltration of Republican politics - Media Matters', url: 'https://www.mediamatters.org/nick-fuentes/nick-fuentes-revels-groyper-infiltration-republican-politics-well-be-influencing' },
    ],
  },
  {
    name: 'Dennis Prager',
    slug: 'prager',
    answers: {
      e01: 0, e02: -2, e03: -2, e04: 2, e05: 0, e07: -2, e08: 0, e09: -2,
      e10: 2, e11: -2, e12: 2, e13: -2,
      s01: -2, s02: 2, s03: 2, s04: -2, s05: 2, s06: -1, s07: -2, s08: 2,
      s09: 2, s10: -1, s11: 2, s12: 2, s13: -2,
      y01: -2, y02: -1, y03: 0, y04: 1, y05: -2, y06: 2, y08: 0, y09: -1,
      y10: 1, y11: -1, y12: -1, y13: -1, y14: 0, y15: 0,
      f01: -1, f02: 2, f03: 1,
    },
    note: 'PragerU co-founder and the oldest voice in this batch, whose politics predate the online right entirely: Reagan-era fusionism, Judeo-Christian civilizational argument, and a hostility to the left framed as a defense of Western values rather than a nationalist program. Paralyzed from the neck down after a 2024 fall and still recording; the June 2026 health update is the most recent primary material. Hard right on the issues and, unusually for this roster, institutionalist on the system axis.',
    sources: [
      { title: 'Dennis Prager health update, June 2026 - PragerU', url: 'https://www.prageru.com/videos/dennis-prager-health-update-june-2026' },
      { title: 'The latest update on Dennis Prager - RedState', url: 'https://redstate.com/beccalower/2026/06/06/new-update-on-dennis-prager-n2203105' },
      { title: 'Prager grateful for "miracle" after spinal injury - CBN', url: 'https://cbn.com/news/health/dennis-prager-grateful-miracle-after-spinal-injury-gratitude-everything' },
      { title: 'Dennis Prager health update, March - PragerU', url: 'https://www.prageru.com/march-dennis-health-update' },
      { title: 'Dennis Prager health update, June 2026 - podcast', url: 'https://podcasts.apple.com/us/podcast/dennis-prager-health-update-june-2026-dennis-pragers/id1451698435?i=1000773472825' },
    ],
  },
  {
    name: 'Michael Knowles',
    slug: 'knowles',
    answers: {
      e01: 1, e02: -1, e03: -1, e04: 0, e05: 1, e07: 1, e08: 0, e09: 0,
      e10: -1, e11: -2, e12: 1, e13: -1,
      s01: -2, s02: 2, s03: 1, s04: -2, s05: 2, s06: -1, s07: -2, s08: 2,
      s09: 2, s10: -2, s11: 2, s12: 2, s13: -2,
      y01: -2, y02: -1, y03: 1, y04: 2, y05: -1, y06: 1, y08: 0, y09: -2,
      y10: 2, y11: 2, y12: -2, y13: 0, y14: 1, y15: 1,
      f01: 0, f02: 1, f03: -1,
    },
    note: 'Daily Wire host and the most prominent Catholic integralist-adjacent commentator in American conservative media, who argues the Constitution encodes Aquinas\' mixed regime and that Catholics are now overrepresented in every branch of the federal government. Post-liberal rather than fusionist: unlike Prager, he does not treat neutral liberal proceduralism as worth defending, which is what pushes him insurgent on the system axis while his economics stay conventionally right.',
    sources: [
      { title: 'Michael Knowles: America\'s founding mirrors Catholic political philosophy - National Catholic Register', url: 'https://www.ncregister.com/news/michael-knowles-heritage-catholic-philosophy' },
      { title: 'Michael Knowles: U.S. founding mirrors Catholic political philosophy - Catholic World Report', url: 'https://www.catholicworldreport.com/2026/03/19/michael-knowles-u-s-founding-mirrors-catholic-political-philosophy/' },
      { title: 'Michael Knowles (political commentator) - Wikipedia', url: 'https://en.wikipedia.org/wiki/Michael_Knowles_(political_commentator)' },
      { title: 'Knowles says Catholics are now overrepresented in US government', url: 'https://news.spreely.com/catholics-now-overrepresented-in-us-government-knowles-says/' },
      { title: 'Doug Wilson and Michael Knowles bond over a common enemy - Right Wing Watch', url: 'https://www.peoplefor.org/rightwingwatch/christian-nationalist-doug-wilson-and-right-wing-catholic-michael-knowles-bond-0' },
    ],
  },
  {
    name: 'Dave Ramsey',
    slug: 'ramsey',
    answers: {
      e01: 0, e02: -2, e03: -2, e04: 2, e05: 0, e07: -2, e08: 0, e09: -1,
      e10: 2, e11: -1, e12: 2, e13: -2,
      s01: -1, s02: 1, s03: 0, s04: -1, s05: 0, s06: 0, s07: -1, s08: 2,
      s09: 0, s10: -1, s11: 1, s12: 0, s13: 0,
      y01: 0, y02: 0, y03: 0, y04: 1, y05: -2, y06: 0, y08: 1, y09: -1,
      y10: 1, y11: 0, y12: 0, y13: 0, y14: 0, y15: 0,
      f01: 0, f02: 1, f03: 0,
    },
    note: 'Personal-finance broadcaster rather than a political commentator, included because his audience is enormous and his economics are a politics: individual responsibility over government programs, churches and communities over the safety net, and the loudest sustained argument in American media against student-debt cancellation. He explicitly rejects political pigeonholing and much of the instrument finds nothing to score, so the social and system items are thin by design.',
    sources: [
      { title: 'Dave Ramsey on political pigeonholing', url: 'https://finance.yahoo.com/news/dave-ramsey-people-lost-ability-203108359.html' },
      { title: 'Ramsey on Trump\'s attitude and cutting spending', url: 'https://finance.yahoo.com/news/screw-know-dave-ramsey-says-134522122.html' },
      { title: 'Ramsey says a lid on government spending could spur recovery', url: 'https://www.benzinga.com/news/25/04/44754362/dave-ramsey-says-putting-a-lid-on-government-spending-could-spur-quick-recovery-but-wants-america-to' },
      { title: 'Dave Ramsey\'s political stance', url: 'https://www.checkcharm.com/trending/dave-ramseys-political-stance/' },
      { title: 'The US debt strategy that made Dave Ramsey laugh', url: 'https://finance.yahoo.com/news/us-debt-strategy-made-dave-203000337.html' },
    ],
  },
];
