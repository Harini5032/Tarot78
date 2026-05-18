
<script>
const suits=["C","W","S","P"];
const ranks=["A","2","3","4","5","6","7","8","9","10","Pg","Kn","Q","K"];
const major=["Fool","Magician","High Priestess","Empress","Emperor","Hierophant","Lovers","Chariot","Strength","Hermit","Wheel of Fortune","Justice","Hanged Man","Death","Temperance","Devil","Tower","Star","Moon","Sun","Judgement","World"];
let deck=[];
let selected=[];
const spreads = {
single: [
 {x:0,y:0,label:"Focus"}
],
three: [
 {x:-150,y:0,label:"Past"},
 {x:0,y:0,label:"Present"},
 {x:150,y:0,label:"Future"}
],
five: [
 {x:0,y:-100,label:"Situation"},
 {x:-150,y:0,label:"Challenge"},
 {x:0,y:0,label:"Core"},
 {x:150,y:0,label:"Advice"},
 {x:0,y:120,label:"Outcome"}
],
seven: [
 {x:-250,y:0,label:"Past"},
 {x:-150,y:0,label:"Present"},
 {x:-50,y:0,label:"Hidden"},
 {x:50,y:0,label:"Obstacle"},
 {x:150,y:0,label:"Advice"},
 {x:250,y:0,label:"External"},
 {x:350,y:0,label:"Outcome"}
],
celtic: [
 {x:0,y:0,label:"Present"},
 {x:0,y:0,label:"Challenge",rotate:90},
 {x:0,y:-150,label:"Above"},
 {x:0,y:150,label:"Below"},
 {x:-150,y:0,label:"Past"},
 {x:150,y:0,label:"Future"},
 {x:300,y:-150,label:"Self"},
 {x:300,y:-50,label:"Environment"},
 {x:300,y:50,label:"Hopes/Fears"},
 {x:300,y:150,label:"Outcome"}
],
modifiedCeltic: [
 {x:0,y:0,label:"You"},
 {x:120,y:0,label:"Partner"},
 {x:60,y:-120,label:"Connection"},
 {x:60,y:120,label:"Challenge"},
 {x:-120,y:0,label:"Past"},
 {x:240,y:0,label:"Future"}
],
daily: [
 {x:-120,y:0,label:"Energy"},
 {x:0,y:0,label:"Focus"},
 {x:120,y:0,label:"Advice"}
],
guidance: [
 {x:0,y:-150,label:"Guide Message"},
 {x:-120,y:-60,label:"Support"},
 {x:120,y:-60,label:"Challenge"},
 {x:-120,y:80,label:"Action"},
 {x:120,y:80,label:"Outcome"},
 {x:0,y:180,label:"Spiritual Advice"}
],
relationship: [
 {x:-120,y:0,label:"You"},
 {x:120,y:0,label:"Them"},
 {x:0,y:0,label:"Connection"},
 {x:-120,y:120,label:"Your Feelings"},
 {x:120,y:120,label:"Their Feelings"},
 {x:0,y:200,label:"Outcome"}
],
love: [
 {x:0,y:-120,label:"Current Love"},
 {x:-120,y:0,label:"Strength"},
 {x:120,y:0,label:"Weakness"},
 {x:0,y:120,label:"Outcome"}
],
decision: [
 {x:-150,y:0,label:"Option A"},
 {x:150,y:0,label:"Option B"},
 {x:0,y:-120,label:"Advice"},
 {x:0,y:120,label:"Outcome"}
],
career: [
 {x:0,y:-120,label:"Current"},
 {x:-120,y:0,label:"Challenge"},
 {x:120,y:0,label:"Opportunity"},
 {x:0,y:120,label:"Outcome"}
],
shadow: [
 {x:-120,y:0,label:"Shadow"},
 {x:0,y:0,label:"Trigger"},
 {x:120,y:0,label:"Lesson"},
 {x:0,y:120,label:"Healing"}
]
};
const meanings = {
/* 🌊 CUPS */
"AC": { up: "New emotional beginning, intuition, love energy", rev: "Emotional block, confusion, suppressed feelings" },
"2C": { up: "Connection, partnership, mutual attraction", rev: "Imbalance, miscommunication in relationship" },
"3C": { up: "Friendship, celebration, joy", rev: "Overindulgence, gossip, disconnection" },
"4C": { up: "Contemplation, emotional pause", rev: "New awareness, breaking boredom" },
"5C": { up: "Loss, grief, regret", rev: "Healing, moving forward" },
"6C": { up: "Nostalgia, comfort, memories", rev: "Stuck in past, needing growth" },
"7C": { up: "Choices, illusions, fantasy", rev: "Clarity, decision making" },
"8C": { up: "Walking away, emotional shift", rev: "Avoidance, fear of leaving" },
"9C": { up: "Wish fulfillment, satisfaction", rev: "Unfulfilled desires, dissatisfaction" },
"10C": { up: "Emotional happiness, harmony", rev: "Disconnection, broken harmony" },
"PgC": { up: "Curiosity, new feelings", rev: "Emotional immaturity, insecurity" },
"KnC": { up: "Romantic, following heart", rev: "Mood swings, unrealistic expectations" },
"QC": { up: "Compassion, emotional balance", rev: "Overwhelmed, emotional instability" },
"KC": { up: "Emotional control, wisdom", rev: "Manipulation, suppressed emotions" },
/* 🔥 WANDS */
"AW": { up: "New passion, inspiration", rev: "Lack of direction, delay" },
"2W": { up: "Planning, decisions", rev: "Fear of change, poor planning" },
"3W": { up: "Expansion, progress", rev: "Delays, setbacks" },
"4W": { up: "Celebration, stability", rev: "Instability, lack of support" },
"5W": { up: "Conflict, competition", rev: "Avoiding conflict, inner struggle" },
"6W": { up: "Victory, success", rev: "Self-doubt, lack of recognition" },
"7W": { up: "Defending position", rev: "Giving up, overwhelmed" },
"8W": { up: "Fast movement, action", rev: "Delays, frustration" },
"9W": { up: "Resilience, persistence", rev: "Exhaustion, burnout" },
"10W": { up: "Burden, responsibility", rev: "Overload, needing release" },
"PgW": { up: "Excitement, ideas", rev: "Lack of direction" },
"KnW": { up: "Action, adventure", rev: "Impulsiveness, recklessness" },
"QW": { up: "Confidence, charisma", rev: "Jealousy, insecurity" },
"KW": { up: "Leadership, vision", rev: "Control issues, ego" },
/* ⚔️ SWORDS */
"AS": { up: "Clarity, truth, breakthrough", rev: "Confusion, misjudgment" },
"2S": { up: "Difficult decision", rev: "Indecision, avoidance" },
"3S": { up: "Heartbreak, pain", rev: "Recovery, healing" },
"4S": { up: "Rest, recovery", rev: "Burnout, stress" },
"5S": { up: "Conflict, tension", rev: "Resolution, moving on" },
"6S": { up: "Transition, moving forward", rev: "Stuck, resistance" },
"7S": { up: "Deception, strategy", rev: "Truth revealed" },
"8S": { up: "Feeling trapped", rev: "Freedom, clarity" },
"9S": { up: "Anxiety, worry", rev: "Relief, facing fears" },
"10S": { up: "Painful ending", rev: "Recovery, new start" },
"PgS": { up: "Curiosity, observation", rev: "Gossip, immaturity" },
"KnS": { up: "Action, ambition", rev: "Aggression, rash actions" },
"QS": { up: "Clarity, independence", rev: "Coldness, isolation" },
"KS": { up: "Authority, logic", rev: "Manipulation, harshness" },
/* 💰 PENTACLES */
"AP": { up: "Opportunity, new venture", rev: "Missed chance" },
"2P": { up: "Balance, adaptability", rev: "Overwhelm, imbalance" },
"3P": { up: "Teamwork, growth", rev: "Lack of collaboration" },
"4P": { up: "Security, saving", rev: "Greed, fear of loss" },
"5P": { up: "Hardship, struggle", rev: "Recovery, support" },
"6P": { up: "Giving, sharing", rev: "Imbalance in giving" },
"7P": { up: "Patience, investment", rev: "Frustration, delays" },
"8P": { up: "Hard work, skill", rev: "Lack of focus" },
"9P": { up: "Independence, success", rev: "Dependence, insecurity" },
"10P": { up: "Wealth, stability", rev: "Family issues, instability" },
"PgP": { up: "Learning, new goal", rev: "Lack of progress" },
"KnP": { up: "Hard work, routine", rev: "Stagnation, laziness" },
"QP": { up: "Nurturing, stability", rev: "Neglect, imbalance" },
"KP": { up: "Success, abundance", rev: "Materialism, greed" },
/* 🌙 MAJOR ARCANA */
"Fool": { up: "New beginning, leap of faith", rev: "Recklessness, hesitation" },
"Magician": { up: "Manifestation, power", rev: "Manipulation, illusion" },
"High Priestess": { up: "Intuition, mystery", rev: "Hidden truths" },
"Empress": { up: "Nurturing, abundance", rev: "Dependence, imbalance" },
"Emperor": { up: "Authority, structure", rev: "Control, rigidity" },
"Hierophant": { up: "Tradition, guidance", rev: "Rebellion, new path" },
"Lovers": { up: "Love, union", rev: "Conflict, imbalance" },
"Chariot": { up: "Determination, victory", rev: "Lack of control" },
"Strength": { up: "Courage, patience", rev: "Self-doubt" },
"Hermit": { up: "Introspection, solitude", rev: "Isolation" },
"Wheel of Fortune": { up: "Change, fate", rev: "Bad luck, resistance" },
"Justice": { up: "Fairness, truth", rev: "Bias, dishonesty" },
"Hanged Man": { up: "Sacrifice, new view", rev: "Stalling" },
"Death": { up: "Transformation", rev: "Resistance to change" },
"Temperance": { up: "Balance, harmony", rev: "Imbalance" },
"Devil": { up: "Attachment, addiction", rev: "Breaking free" },
"Tower": { up: "Sudden change", rev: "Avoiding disaster" },
"Star": { up: "Hope, healing", rev: "Doubt" },
"Moon": { up: "Illusion, fear", rev: "Clarity" },
"Sun": { up: "Joy, success", rev: "Temporary sadness" },
"Judgement": { up: "Awakening", rev: "Self-doubt" },
"World": { up: "Completion", rev: "Incomplete cycle" }
};
function showShuffleAnimation(){
  const area = document.getElementById("shuffleArea");
  area.innerHTML = "";
  const total = deck.length;
  const half = Math.floor(total / 2);
  let leftStack = [];
  let rightStack = [];
  // LEFT STACK
  for(let i=0;i<half;i++){
    const card = document.createElement("div");
    card.className="stack-card";
    card.style.left="38%";
    card.style.top=(i*0.6)+"px";
    area.appendChild(card);
    leftStack.push(card);
  }
  // RIGHT STACK
  for(let i=0;i<half;i++){
    const card = document.createElement("div");
    card.className="stack-card";
    card.style.left="58%";
    card.style.top=(i*0.6)+"px";
    area.appendChild(card);
    rightStack.push(card);
  }
  let mergedIndex = 0;
  function dropNext(){
    if(mergedIndex >= total){
      area.style.transition="opacity 0.6s ease";
      area.style.opacity="0";
      setTimeout(()=>{
        area.innerHTML="";
        area.style.opacity="1";
        spreadCards(); // 🔥 auto spread after shuffle
      },600);
      return;
    }
    let sourceStack = (mergedIndex % 2 === 0) ? leftStack : rightStack;
    let card = sourceStack.shift();
    if(card){
      card.style.left="50%";
      card.style.transform="translateX(-50%)";
      card.style.top=(mergedIndex*0.4)+"px";
    }
    mergedIndex++;
    setTimeout(dropNext,40);
  }
  setTimeout(dropNext,400);
}
function buildDeck(){
  deck=[];
  ranks.forEach(r=>{suits.forEach(s=>deck.push(r+s));});
  major.forEach(m=>deck.push(m));
}
function shuffleDeck(){
  buildDeck();
  deck.sort(()=>Math.random()-0.5);
  selected=[];
  document.getElementById("ribbon").innerHTML="";
  document.getElementById("mat").innerHTML="";
  document.getElementById("result").innerHTML="";
  showShuffleAnimation(); // 🔥 important
}
function showShuffle(){
  const area=document.getElementById("shuffleArea");
  area.innerHTML="";
  for(let i=0;i<10;i++){
    let c=document.createElement("div");
    c.className="stack-card";
    c.style.top=(i*2)+"px";
    area.appendChild(c);
  }
  setTimeout(()=>{
    area.innerHTML="";
    spreadCards();
  },1200);
}
function spreadCards(){
  const ribbon=document.getElementById("ribbon");
  ribbon.innerHTML="";
  const total=deck.length;
  const radius=450;
  const centerX=window.innerWidth/2-50;
  const centerY=350;
  deck.forEach((card,i)=>{
    let angle=(-60+(120/(total-1))*i)*(Math.PI/180);
    let x=centerX+radius*Math.sin(angle);
    let y=centerY-radius*Math.cos(angle);
    let div=document.createElement("div");
    div.className="ribbon-card";
    div.style.left=centerX+"px";
    div.style.top=centerY+"px";
    div.onclick=()=>pickCard(card,div);
    ribbon.appendChild(div);
    setTimeout(()=>{
      div.style.left=x+"px";
      div.style.top=y+"px";
    },50);
  });
}
function pickCard(cardName,element){
  let spreadType = document.getElementById("spreadType").value;
  let layout = spreads[spreadType];
  if(selected.length >= layout.length) return;
  let reversed = Math.random() < 0.5;
  let pos = layout[selected.length];
  selected.push({
    name: cardName,
    rev: reversed,
    label: pos.label
  });
  element.style.visibility="hidden";
  let mat=document.getElementById("mat");
  let card=document.createElement("div");
  card.className="mat-card";
  card.style.position="absolute";
  card.style.left=`calc(50% + ${pos.x}px)`;
  card.style.top=`calc(50% + ${pos.y}px)`;
  card.style.transform="translate(-50%, -50%)";
  card.innerHTML=`
  <div class="card-inner">
    <div class="card-back"></div>
    <div class="card-front">
      <img src="${cardName}.png" style="transform:${reversed?'rotate(180deg)':'none'}">
    </div>
  </div>
  <div style="font-size:12px;margin-top:4px;">${pos.label}</div>
  `;
  mat.appendChild(card);
}
function interpret(){
  let cards=document.querySelectorAll(".mat-card");
  cards.forEach((c,i)=>setTimeout(()=>c.classList.add("flip"),i*400));
  let result=document.getElementById("result");
  result.innerHTML="<b>Your Reading:</b><br><br>";
  selected.forEach(c=>{
    let cardData = meanings[c.name];
let text = cardData 
  ? (c.rev ? cardData.rev : cardData.up)
  : "Meaning missing";  
    result.innerHTML+=`<b>${c.name} ${c.rev?'(Reversed)':''}</b><br>${text}<br><br>`;
  });
}
buildDeck();
</script>