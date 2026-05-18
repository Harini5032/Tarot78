// ── Deck construction ──
const SUITS = ["C", "W", "S", "P"] as const
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Pg", "Kn", "Q", "K"] as const
const MAJOR = [
  "Fool",
  "Magician",
  "High Priestess",
  "Empress",
  "Emperor",
  "Hierophant",
  "Lovers",
  "Chariot",
  "Strength",
  "Hermit",
  "Wheel of Fortune",
  "Justice",
  "Hanged Man",
  "Death",
  "Temperance",
  "Devil",
  "Tower",
  "Star",
  "Moon",
  "Sun",
  "Judgement",
  "World",
]

const SUIT_NAMES: Record<string, string> = {
  C: "Cups",
  W: "Wands",
  S: "Swords",
  P: "Pentacles",
}
const RANK_NAMES: Record<string, string> = {
  A: "Ace",
  Pg: "Page",
  Kn: "Knight",
  Q: "Queen",
  K: "King",
}

export function fmt(n: string): string {
  for (const [a, f] of Object.entries(SUIT_NAMES)) {
    if (n.endsWith(a)) {
      const r = n.slice(0, -a.length)
      return `${RANK_NAMES[r] || r} of ${f}`
    }
  }
  return n
}

export function buildDeck(): string[] {
  const deck: string[] = []
  RANKS.forEach((r) => SUITS.forEach((s) => deck.push(r + s)))
  MAJOR.forEach((m) => deck.push(m))
  return deck
}

export function shuffle<T>(arr: T[]): T[] {
  return arr.slice().sort(() => Math.random() - 0.5)
}

// ── Spread layouts ──
export type SpreadPosition = { x: number; y: number; label: string; rotate?: number }
export type SpreadKey =
  | "single"
  | "three"
  | "five"
  | "seven"
  | "celtic"
  | "modifiedCeltic"
  | "daily"
  | "guidance"
  | "relationship"
  | "love"
  | "decision"
  | "career"
  | "shadow"

export const spreads: Record<SpreadKey, SpreadPosition[]> = {
  single: [{ x: 0, y: 0, label: "Focus" }],
  three: [
    { x: -145, y: 0, label: "Past" },
    { x: 0, y: 0, label: "Present" },
    { x: 145, y: 0, label: "Future" },
  ],
  five: [
    { x: 0, y: -115, label: "Situation" },
    { x: -145, y: 0, label: "Challenge" },
    { x: 0, y: 0, label: "Core" },
    { x: 145, y: 0, label: "Advice" },
    { x: 0, y: 115, label: "Outcome" },
  ],
  seven: [
    { x: -270, y: 0, label: "Past" },
    { x: -180, y: 0, label: "Present" },
    { x: -90, y: 0, label: "Hidden" },
    { x: 0, y: 0, label: "Obstacle" },
    { x: 90, y: 0, label: "Advice" },
    { x: 180, y: 0, label: "External" },
    { x: 270, y: 0, label: "Outcome" },
  ],
  celtic: [
    { x: 0, y: 0, label: "Present" },
    { x: 0, y: 0, label: "Challenge", rotate: 90 },
    { x: 0, y: -145, label: "Above" },
    { x: 0, y: 145, label: "Below" },
    { x: -145, y: 0, label: "Past" },
    { x: 145, y: 0, label: "Future" },
    { x: 290, y: -145, label: "Self" },
    { x: 290, y: -48, label: "Environment" },
    { x: 290, y: 48, label: "Hopes" },
    { x: 290, y: 145, label: "Outcome" },
  ],
  modifiedCeltic: [
    { x: 0, y: 0, label: "You" },
    { x: 115, y: 0, label: "Partner" },
    { x: 58, y: -115, label: "Connection" },
    { x: 58, y: 115, label: "Challenge" },
    { x: -115, y: 0, label: "Past" },
    { x: 230, y: 0, label: "Future" },
  ],
  daily: [
    { x: -120, y: 0, label: "Energy" },
    { x: 0, y: 0, label: "Focus" },
    { x: 120, y: 0, label: "Advice" },
  ],
  guidance: [
    { x: 0, y: -150, label: "Guide Message" },
    { x: -115, y: -55, label: "Support" },
    { x: 115, y: -55, label: "Challenge" },
    { x: -115, y: 80, label: "Action" },
    { x: 115, y: 80, label: "Outcome" },
    { x: 0, y: 180, label: "Spiritual Advice" },
  ],
  relationship: [
    { x: -115, y: -40, label: "You" },
    { x: 115, y: -40, label: "Them" },
    { x: 0, y: -40, label: "Connection" },
    { x: -115, y: 100, label: "Your Feelings" },
    { x: 115, y: 100, label: "Their Feelings" },
    { x: 0, y: 100, label: "Outcome" },
  ],
  love: [
    { x: 0, y: -115, label: "Current Love" },
    { x: -125, y: 0, label: "Strength" },
    { x: 125, y: 0, label: "Weakness" },
    { x: 0, y: 115, label: "Outcome" },
  ],
  decision: [
    { x: -145, y: 0, label: "Option A" },
    { x: 145, y: 0, label: "Option B" },
    { x: 0, y: -115, label: "Advice" },
    { x: 0, y: 115, label: "Outcome" },
  ],
  career: [
    { x: 0, y: -115, label: "Current" },
    { x: -125, y: 0, label: "Challenge" },
    { x: 125, y: 0, label: "Opportunity" },
    { x: 0, y: 115, label: "Outcome" },
  ],
  shadow: [
    { x: -120, y: 0, label: "Shadow" },
    { x: 0, y: 0, label: "Trigger" },
    { x: 120, y: 0, label: "Lesson" },
    { x: 0, y: 115, label: "Healing" },
  ],
}

// ── Meanings ──
export const meanings: Record<string, { up: string; rev: string }> = {
  AC: { up: "New emotional beginning, intuition, love energy", rev: "Emotional block, confusion, suppressed feelings" },
  "2C": { up: "Connection, partnership, mutual attraction", rev: "Imbalance, miscommunication in relationship" },
  "3C": { up: "Friendship, celebration, joy", rev: "Overindulgence, gossip, disconnection" },
  "4C": { up: "Contemplation, emotional pause", rev: "New awareness, breaking boredom" },
  "5C": { up: "Loss, grief, regret", rev: "Healing, moving forward" },
  "6C": { up: "Nostalgia, comfort, memories", rev: "Stuck in past, needing growth" },
  "7C": { up: "Choices, illusions, fantasy", rev: "Clarity, decision making" },
  "8C": { up: "Walking away, emotional shift", rev: "Avoidance, fear of leaving" },
  "9C": { up: "Wish fulfillment, satisfaction", rev: "Unfulfilled desires, dissatisfaction" },
  "10C": { up: "Emotional happiness, harmony", rev: "Disconnection, broken harmony" },
  PgC: { up: "Curiosity, new feelings", rev: "Emotional immaturity, insecurity" },
  KnC: { up: "Romantic, following heart", rev: "Mood swings, unrealistic expectations" },
  QC: { up: "Compassion, emotional balance", rev: "Overwhelmed, emotional instability" },
  KC: { up: "Emotional control, wisdom", rev: "Manipulation, suppressed emotions" },
  AW: { up: "New passion, inspiration", rev: "Lack of direction, delay" },
  "2W": { up: "Planning, decisions", rev: "Fear of change, poor planning" },
  "3W": { up: "Expansion, progress", rev: "Delays, setbacks" },
  "4W": { up: "Celebration, stability", rev: "Instability, lack of support" },
  "5W": { up: "Conflict, competition", rev: "Avoiding conflict, inner struggle" },
  "6W": { up: "Victory, success", rev: "Self-doubt, lack of recognition" },
  "7W": { up: "Defending position", rev: "Giving up, overwhelmed" },
  "8W": { up: "Fast movement, action", rev: "Delays, frustration" },
  "9W": { up: "Resilience, persistence", rev: "Exhaustion, burnout" },
  "10W": { up: "Burden, responsibility", rev: "Overload, needing release" },
  PgW: { up: "Excitement, ideas", rev: "Lack of direction" },
  KnW: { up: "Action, adventure", rev: "Impulsiveness, recklessness" },
  QW: { up: "Confidence, charisma", rev: "Jealousy, insecurity" },
  KW: { up: "Leadership, vision", rev: "Control issues, ego" },
  AS: { up: "Clarity, truth, breakthrough", rev: "Confusion, misjudgment" },
  "2S": { up: "Difficult decision", rev: "Indecision, avoidance" },
  "3S": { up: "Heartbreak, pain", rev: "Recovery, healing" },
  "4S": { up: "Rest, recovery", rev: "Burnout, stress" },
  "5S": { up: "Conflict, tension", rev: "Resolution, moving on" },
  "6S": { up: "Transition, moving forward", rev: "Stuck, resistance" },
  "7S": { up: "Deception, strategy", rev: "Truth revealed" },
  "8S": { up: "Feeling trapped", rev: "Freedom, clarity" },
  "9S": { up: "Anxiety, worry", rev: "Relief, facing fears" },
  "10S": { up: "Painful ending", rev: "Recovery, new start" },
  PgS: { up: "Curiosity, observation", rev: "Gossip, immaturity" },
  KnS: { up: "Action, ambition", rev: "Aggression, rash actions" },
  QS: { up: "Clarity, independence", rev: "Coldness, isolation" },
  KS: { up: "Authority, logic", rev: "Manipulation, harshness" },
  AP: { up: "Opportunity, new venture", rev: "Missed chance" },
  "2P": { up: "Balance, adaptability", rev: "Overwhelm, imbalance" },
  "3P": { up: "Teamwork, growth", rev: "Lack of collaboration" },
  "4P": { up: "Security, saving", rev: "Greed, fear of loss" },
  "5P": { up: "Hardship, struggle", rev: "Recovery, support" },
  "6P": { up: "Giving, sharing", rev: "Imbalance in giving" },
  "7P": { up: "Patience, investment", rev: "Frustration, delays" },
  "8P": { up: "Hard work, skill", rev: "Lack of focus" },
  "9P": { up: "Independence, success", rev: "Dependence, insecurity" },
  "10P": { up: "Wealth, stability", rev: "Family issues, instability" },
  PgP: { up: "Learning, new goal", rev: "Lack of progress" },
  KnP: { up: "Hard work, routine", rev: "Stagnation, laziness" },
  QP: { up: "Nurturing, stability", rev: "Neglect, imbalance" },
  KP: { up: "Success, abundance", rev: "Materialism, greed" },
  Fool: { up: "New beginning, leap of faith", rev: "Recklessness, hesitation" },
  Magician: { up: "Manifestation, power", rev: "Manipulation, illusion" },
  "High Priestess": { up: "Intuition, mystery", rev: "Hidden truths" },
  Empress: { up: "Nurturing, abundance", rev: "Dependence, imbalance" },
  Emperor: { up: "Authority, structure", rev: "Control, rigidity" },
  Hierophant: { up: "Tradition, guidance", rev: "Rebellion, new path" },
  Lovers: { up: "Love, union", rev: "Conflict, imbalance" },
  Chariot: { up: "Determination, victory", rev: "Lack of control" },
  Strength: { up: "Courage, patience", rev: "Self-doubt" },
  Hermit: { up: "Introspection, solitude", rev: "Isolation" },
  "Wheel of Fortune": { up: "Change, fate", rev: "Bad luck, resistance" },
  Justice: { up: "Fairness, truth", rev: "Bias, dishonesty" },
  "Hanged Man": { up: "Sacrifice, new view", rev: "Stalling" },
  Death: { up: "Transformation", rev: "Resistance to change" },
  Temperance: { up: "Balance, harmony", rev: "Imbalance" },
  Devil: { up: "Attachment, addiction", rev: "Breaking free" },
  Tower: { up: "Sudden change", rev: "Avoiding disaster" },
  Star: { up: "Hope, healing", rev: "Doubt" },
  Moon: { up: "Illusion, fear", rev: "Clarity" },
  Sun: { up: "Joy, success", rev: "Temporary sadness" },
  Judgement: { up: "Awakening", rev: "Self-doubt" },
  World: { up: "Completion", rev: "Incomplete cycle" },
}

export type SelectedCard = { name: string; rev: boolean; label: string }
