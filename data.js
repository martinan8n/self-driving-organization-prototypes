export const scenario = {
  company: "Northstar Games",
  mission: "Launch one successful mobile game every quarter without increasing team size.",
  state: {
    retention7d: 28.4,
    targetRetention7d: 32,
    cpi: 2.18,
    targetCpi: 2.25,
    sentiment: 4.3,
    targetSentiment: 4.5,
    launchCadence: "1 / quarter"
  },
  interventions: [
    {title:"Reworked first-session onboarding", status:"Running", impact:"+2.1 pp D7 retention", confidence:"Medium"},
    {title:"Paused low-quality ad cohort", status:"Completed", impact:"-€0.17 CPI", confidence:"High"},
    {title:"Pricing experiment for returning players", status:"Needs approval", impact:"+6–9% payer conversion", confidence:"Medium"}
  ],
  causal: [
    "Tutorial drop-off",
    "Early-session confusion",
    "D7 retention",
    "Organic rating",
    "Acquisition efficiency"
  ],
  learnings: [
    "Players who skip the tutorial are 2.4× more likely to churn in 48h.",
    "Creative set B lowers CPI but attracts lower-retention users.",
    "Shorter onboarding improved first-session completion in two segments."
  ]
};
