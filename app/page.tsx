"use client"

import { useEffect, useRef, useState } from "react"
import { TAROT_STYLES } from "@/components/tarot/styles"
import { CARD_IMAGES } from "@/components/tarot/card-images"
import {
  buildDeck,
  shuffle,
  spreads,
  meanings,
  fmt,
  type SpreadKey,
  type SelectedCard,
} from "@/components/tarot/data"

export default function Page() {
  const [spreadType, setSpreadType] = useState<SpreadKey>("single")
  const spreadRef = useRef<SpreadKey>("single")
  spreadRef.current = spreadType

  const [status, setStatus] = useState("Shuffle the deck to begin your reading")
  const [moonText, setMoonText] = useState("")

  const shuffleAreaRef = useRef<HTMLDivElement>(null)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const matRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const starfieldRef = useRef<HTMLDivElement>(null)

  const deckRef = useRef<string[]>([])
  const selectedRef = useRef<SelectedCard[]>([])

  // ── Starfield + cursor sparks + moon phase ──
  useEffect(() => {
    const sf = starfieldRef.current
    if (sf && sf.childElementCount === 0) {
      for (let i = 0; i < 160; i++) {
        const s = document.createElement("div")
        s.className = "star"
        const sz = Math.random() * 2.5 + 0.4
        s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--op:${Math.random() * 0.4 + 0.1};--dur:${Math.random() * 4 + 2}s;animation-delay:${Math.random() * 6}s;`
        sf.appendChild(s)
      }
    }

    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.82) {
        const sp = document.createElement("div")
        sp.className = "cursor-spark"
        const a = Math.random() * Math.PI * 2
        const d = 18 + Math.random() * 32
        const colors = ["#2eb8a0", "#a8e8df", "#c9a84c", "#1a7a6e", "#7fffd4"]
        sp.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${colors[Math.floor(Math.random() * colors.length)]};`
        document.body.appendChild(sp)
        setTimeout(() => sp.remove(), 900)
      }
    }
    document.addEventListener("mousemove", onMove)

    const phases = [
      "🌑 New Moon",
      "🌒 Waxing Crescent",
      "🌓 First Quarter",
      "🌔 Waxing Gibbous",
      "🌕 Full Moon",
      "🌖 Waning Gibbous",
      "🌗 Last Quarter",
      "🌘 Waning Crescent",
    ]
    const idx = Math.floor((((Date.now() / 1000 / 60 / 60 / 24 / 29.53) % 1) * 8 + 8) % 8)
    setMoonText(`${phases[idx]} · The veil is thin`)

    deckRef.current = buildDeck()

    return () => document.removeEventListener("mousemove", onMove)
  }, [])

  // ── Reset selected cards when spread type changes ──
  useEffect(() => {
    selectedRef.current = []
    if (matRef.current) matRef.current.innerHTML = ""
    if (resultRef.current) resultRef.current.innerHTML = ""
  }, [spreadType])

  // ── Shuffle ──
  const onShuffle = () => {
    deckRef.current = shuffle(buildDeck())
    selectedRef.current = []
    if (ribbonRef.current) ribbonRef.current.innerHTML = ""
    if (matRef.current) matRef.current.innerHTML = ""
    if (resultRef.current) resultRef.current.innerHTML = ""
    setStatus("Shuffling the sacred deck…")
    showShuffleAnimation()
  }

  const showShuffleAnimation = () => {
    const area = shuffleAreaRef.current
    if (!area) return
    area.innerHTML = ""
    area.style.opacity = "1"

    const deck = deckRef.current
    const half = Math.floor(deck.length / 2)
    const leftStack: HTMLDivElement[] = []
    const rightStack: HTMLDivElement[] = []
    for (let i = 0; i < half; i++) {
      const c = document.createElement("div")
      c.className = "stack-card"
      c.style.cssText = `left:36%;top:${i * 0.5}px;`
      area.appendChild(c)
      leftStack.push(c)
    }
    for (let i = 0; i < half; i++) {
      const c = document.createElement("div")
      c.className = "stack-card"
      c.style.cssText = `left:60%;top:${i * 0.5}px;`
      area.appendChild(c)
      rightStack.push(c)
    }

    let idx = 0
    const dropNext = () => {
      if (idx >= deck.length) {
        area.style.transition = "opacity 0.6s"
        area.style.opacity = "0"
        setTimeout(() => {
          area.innerHTML = ""
          area.style.opacity = "1"
          setStatus("Choose your cards from the arc below")
          spreadCards()
        }, 600)
        return
      }
      const src = idx % 2 === 0 ? leftStack : rightStack
      const card = src.shift()
      if (card) {
        card.style.left = "50%"
        card.style.transform = "translateX(-50%)"
        card.style.top = `${idx * 0.38}px`
      }
      idx++
      setTimeout(dropNext, 36)
    }
    setTimeout(dropNext, 350)
  }

  const spreadCards = () => {
    const ribbon = ribbonRef.current
    if (!ribbon) return
    ribbon.innerHTML = ""
    const deck = deckRef.current
    const total = deck.length
    const radius = 510
    const cx = Math.min(window.innerWidth, 1020) / 2 - 52
    const cy = 350
    deck.forEach((card, i) => {
      const angleDeg = -55 + (110 / (total - 1)) * i
      const angle = angleDeg * (Math.PI / 180)
      const x = cx + radius * Math.sin(angle)
      const y = cy - radius * Math.cos(angle)
      const rot = angleDeg * 0.72
      const div = document.createElement("div")
      div.className = "ribbon-card"
      div.style.cssText = `left:${cx}px;top:${cy}px;transform:rotate(${rot}deg);opacity:0;`
      div.onclick = () => pickCard(card, div)
      ribbon.appendChild(div)
      setTimeout(() => {
        div.style.transition = "all 0.5s cubic-bezier(0.34,1.4,0.64,1)"
        div.style.left = `${x}px`
        div.style.top = `${y}px`
        div.style.opacity = "1"
      }, i * 5 + 60)
    })
  }

  const pickCard = (cardName: string, element: HTMLDivElement) => {
    const layout = spreads[spreadRef.current]
    if (selectedRef.current.length >= layout.length) return
    const reversed = Math.random() < 0.5
    const pos = layout[selectedRef.current.length]
    selectedRef.current.push({ name: cardName, rev: reversed, label: pos.label })
    element.classList.add("picked")

    const mat = matRef.current
    if (!mat) return
    const card = document.createElement("div")
    card.className = "mat-card"
    card.style.left = `calc(50% + ${pos.x}px)`
    card.style.top = `calc(50% + ${pos.y}px)`
    if (pos.rotate) card.style.transform = `translate(-50%,-50%) rotate(${pos.rotate}deg)`

    const imgUrl = CARD_IMAGES[cardName]
    const front = imgUrl
      ? `<img src="${imgUrl}" alt="${fmt(cardName)}" style="transform:${reversed ? "rotate(180deg)" : "none"}" />`
      : `<div class="card-placeholder" style="transform:${reversed ? "rotate(180deg)" : "none"}">
           <span class="cp-sym">✦</span>
           <span class="cp-name">${fmt(cardName)}</span>
         </div>`

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front">${front}</div>
      </div>
      <div class="card-label">${pos.label}</div>
    `

    mat.appendChild(card)
    const needed = layout.length
    const picked = selectedRef.current.length
    setStatus(
      `${picked} of ${needed} card${needed > 1 ? "s" : ""} chosen${
        needed - picked > 0 ? ` — ${needed - picked} remaining` : " · reveal your reading"
      }`,
    )
  }

  const onInterpret = () => {
    if (!selectedRef.current.length) {
      setStatus("Shuffle and select cards first")
      return
    }
    const cards = matRef.current?.querySelectorAll(".mat-card")
    cards?.forEach((c, i) => setTimeout(() => c.classList.add("flip"), i * 360))
    const result = resultRef.current
    if (!result) return
    result.innerHTML = `<div class="result-header">✦ Your Sacred Reading ✦</div>`
    selectedRef.current.forEach((c, i) => {
      const d = meanings[c.name]
      const text = d ? (c.rev ? d.rev : d.up) : "The meaning remains veiled…"
      const div = document.createElement("div")
      div.className = "reading-card"
      div.style.animationDelay = `${i * 0.14}s`
      div.innerHTML = `
        <div class="rc-position">${c.label}</div>
        <div class="rc-name">${fmt(c.name)}${c.rev ? '<span class="rev-badge">Reversed</span>' : ""}</div>
        <div class="rc-text">${text}</div>
      `
      result.appendChild(div)
    })
    setTimeout(
      () => result.scrollIntoView({ behavior: "smooth", block: "start" }),
      selectedRef.current.length * 360 + 500,
    )
    setStatus("The cards have spoken — your reading is revealed below")
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TAROT_STYLES }} />

      <div id="starfield" ref={starfieldRef} aria-hidden="true" />

      <main className="page">
        <header>
          <div className="eyebrow">✦ &nbsp; The Sacred Oracle &nbsp; ✦</div>
          <div className="hline" />
          <h1>Tarot R78</h1>
          <p className="tagline">Seek what the cards reveal in silence</p>
          <div className="moon-badge">{moonText}</div>
        </header>

        <div className="controls">
          <select
            value={spreadType}
            onChange={(e) => setSpreadType(e.target.value as SpreadKey)}
            aria-label="Select a spread"
          >
            <option value="single">✦ Single Card</option>
            <option value="three">✦ Past · Present · Future</option>
            <option value="five">✦ Five Card Cross</option>
            <option value="seven">✦ Seven Card Horseshoe</option>
            <option value="celtic">✦ Celtic Cross</option>
            <option value="modifiedCeltic">✦ Modified Celtic</option>
            <option value="daily">✦ Daily Reflection</option>
            <option value="guidance">✦ Spirit Guide Circle</option>
            <option value="relationship">✦ Relationship Dynamic</option>
            <option value="love">✦ Love Spread</option>
            <option value="decision">✦ Decision Making</option>
            <option value="career">✦ Career Path</option>
            <option value="shadow">✦ Shadow Work</option>
          </select>
          <button className="btn" onClick={onShuffle} type="button">
            ✦ Shuffle Deck
          </button>
          <button className="btn btn-reveal" onClick={onInterpret} type="button">
            ◈ Reveal Reading
          </button>
        </div>

        <div className="divider" aria-hidden="true">
          <div className="divider-line" />
          <span className="divider-sym">⬡</span>
          <div className="divider-line" />
        </div>

        <div id="statusBar" role="status" aria-live="polite">
          {status}
        </div>
        <div id="shuffleArea" ref={shuffleAreaRef} />
        <div id="ribbon" ref={ribbonRef} />
        <div id="mat" ref={matRef} />
        <div id="result" ref={resultRef} />

        <div className="scroll-hint">✦ &nbsp; scroll to explore your reading &nbsp; ✦</div>
      </main>
    </>
  )
}
