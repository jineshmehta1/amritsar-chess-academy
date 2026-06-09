"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { StockfishEngine, EvalResult } from "@/lib/stockfish"
import {
  SkipBack,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  FlipVertical,
  Upload,
  Trash2,
  Cpu,
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Target,
  AlertTriangle,
} from "lucide-react"

function pvToSan(fen: string, pvString: string): string {
  if (!pvString) return ""
  const moves = pvString.trim().split(/\s+/)
  const tempGame = new Chess(fen)
  const sanMoves: string[] = []
  for (const uciMove of moves) {
    try {
      const from = uciMove.substring(0, 2) as Square
      const to = uciMove.substring(2, 4) as Square
      const promotion = uciMove.length > 4 ? uciMove[4] : undefined
      const move = tempGame.move({ from, to, promotion: promotion as any })
      if (move) sanMoves.push(move.san)
      else break
    } catch { break }
  }
  return sanMoves.join(" ")
}

function formatScore(evalResult: EvalResult | null, isBlack: boolean): string {
  if (!evalResult) return "0.0"
  if (evalResult.mate !== null) {
    const mateVal = isBlack ? -evalResult.mate : evalResult.mate
    return `M${mateVal}`
  }
  const score = isBlack ? -evalResult.score : evalResult.score
  return (score / 100).toFixed(1)
}

function getEvalBarPercent(evalResult: EvalResult | null): number {
  if (!evalResult) return 50
  if (evalResult.mate !== null) return evalResult.mate > 0 ? 95 : 5
  const score = evalResult.score / 100
  const percent = 50 + 50 * (2 / (1 + Math.exp(-0.5 * score)) - 1)
  return Math.max(2, Math.min(98, percent))
}

export default function AnalysisBoard() {
  const [game, setGame] = useState(new Chess())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1)
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white")
  const [engineRunning, setEngineRunning] = useState(false)
  const [engineReady, setEngineReady] = useState(false)
  const [engineLoading, setEngineLoading] = useState(false)
  const [currentEval, setCurrentEval] = useState<EvalResult | null>(null)
  const [engineDepth, setEngineDepth] = useState(20)
  const [multiPv, setMultiPv] = useState(1)
  const [multiPvResults, setMultiPvResults] = useState<EvalResult[]>([])
  const [pgnInput, setPgnInput] = useState("")
  const [fenInput, setFenInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [highlightSquares, setHighlightSquares] = useState<Record<string, React.CSSProperties>>({})
  const [arrows, setArrows] = useState<[string, string, string?][]>([])

  const engineRef = useRef<StockfishEngine | null>(null)
  const gameHistoryRef = useRef<{ fen: string; move: string }[]>([])
  const moveListRef = useRef<HTMLDivElement>(null)

  const initEngine = useCallback(async () => {
    if (engineRef.current) return
    setEngineLoading(true)
    try {
      const engine = new StockfishEngine()
      await engine.init()
      engineRef.current = engine
      setEngineReady(true)
      setEngineLoading(false)
      engine.onMessage((msg) => {
        if (msg.type === "eval" && msg.data) {
          if (msg.data.multipv === 1) {
            setCurrentEval(msg.data)
            if (msg.data.pv) {
              const moves = msg.data.pv.trim().split(/\s+/)
              if (moves.length > 0) {
                const bestUci = moves[0]
                setArrows([[bestUci.substring(0, 2), bestUci.substring(2, 4), "rgba(255,107,0,0.7)"]])
              }
            }
          }
          setMultiPvResults((prev) => {
            const updated = [...prev]
            updated[msg.data!.multipv - 1] = msg.data!
            return updated.slice(0, multiPv)
          })
        }
      })
    } catch (err) {
      console.error("Failed to init engine:", err)
      setEngineLoading(false)
    }
  }, [multiPv])

  useEffect(() => {
    return () => { engineRef.current?.destroy() }
  }, [])

  useEffect(() => {
    if (engineRunning && engineRef.current) {
      setMultiPvResults([])
      engineRef.current.evaluate(game.fen(), engineDepth, multiPv)
    }
  }, [game.fen(), engineRunning, engineDepth, multiPv])

  useEffect(() => {
    if (moveListRef.current) {
      const activeMove = moveListRef.current.querySelector(".active-move")
      if (activeMove) activeMove.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [currentMoveIndex])

  // ✅ v4 exact signature: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean
  function onDrop(sourceSquare: Square, targetSquare: Square, piece: string): boolean {
    try {
      const gameCopy = new Chess(game.fen())
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      })
      if (!move) return false

      if (currentMoveIndex < gameHistoryRef.current.length - 1) {
        gameHistoryRef.current = gameHistoryRef.current.slice(0, currentMoveIndex + 1)
      }

      gameHistoryRef.current.push({ fen: gameCopy.fen(), move: move.san })
      setGame(gameCopy)
      setMoveHistory(gameHistoryRef.current.map((h) => h.move))
      setCurrentMoveIndex(gameHistoryRef.current.length - 1)
      setHighlightSquares({
        [sourceSquare]: { backgroundColor: "rgba(255,107,0,0.25)" },
        [targetSquare]: { backgroundColor: "rgba(255,107,0,0.35)" },
      })
      return true
    } catch (err) {
      console.error("[onDrop] Exception:", err)
      return false
    }
  }

  const goToMove = useCallback((index: number) => {
    if (index < -1 || index >= gameHistoryRef.current.length) return
    if (index === -1) {
      setGame(new Chess())
      setCurrentMoveIndex(-1)
      setHighlightSquares({})
      setArrows([])
    } else {
      setGame(new Chess(gameHistoryRef.current[index].fen))
      setCurrentMoveIndex(index)
    }
  }, [])

  const goToStart = useCallback(() => goToMove(-1), [goToMove])
  const goBack = useCallback(() => goToMove(currentMoveIndex - 1), [goToMove, currentMoveIndex])
  const goForward = useCallback(() => goToMove(currentMoveIndex + 1), [goToMove, currentMoveIndex])
  const goToEnd = useCallback(() => goToMove(gameHistoryRef.current.length - 1), [goToMove])

  const resetBoard = () => {
    setGame(new Chess())
    gameHistoryRef.current = []
    setMoveHistory([])
    setCurrentMoveIndex(-1)
    setCurrentEval(null)
    setHighlightSquares({})
    setArrows([])
    setMultiPvResults([])
    if (engineRunning && engineRef.current) engineRef.current.newGame()
  }

  const toggleEngine = async () => {
    if (!engineReady) {
      await initEngine()
      setEngineRunning(true)
    } else if (engineRunning) {
      engineRef.current?.stop()
      setEngineRunning(false)
      setCurrentEval(null)
      setArrows([])
    } else {
      setEngineRunning(true)
    }
  }

  const importPgn = () => {
    try {
      const importGame = new Chess()
      importGame.loadPgn(pgnInput)
      const history = importGame.history()
      const replayGame = new Chess()
      gameHistoryRef.current = []
      for (const san of history) {
        replayGame.move(san)
        gameHistoryRef.current.push({ fen: replayGame.fen(), move: san })
      }
      setGame(replayGame)
      setMoveHistory(history)
      setCurrentMoveIndex(history.length - 1)
      setPgnInput("")
      setShowImport(false)
    } catch {
      alert("Invalid PGN format. Please check your input.")
    }
  }

  const importFen = () => {
    try {
      const newGame = new Chess(fenInput)
      setGame(newGame)
      gameHistoryRef.current = []
      setMoveHistory([])
      setCurrentMoveIndex(-1)
      setFenInput("")
      setShowImport(false)
    } catch {
      alert("Invalid FEN string. Please check your input.")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportPgn = () => {
    const pgn = moveHistory
      .map((move, i) => (i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ${move}` : move))
      .join(" ")
    copyToClipboard(pgn)
  }

  const getGameStatus = () => {
    if (game.isCheckmate()) return { text: "Checkmate!", color: "text-red-400" }
    if (game.isDraw()) return { text: "Draw", color: "text-yellow-400" }
    if (game.isStalemate()) return { text: "Stalemate", color: "text-yellow-400" }
    if (game.isCheck()) return { text: "Check!", color: "text-[#FF6B00]" }
    return null
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === "ArrowLeft") { e.preventDefault(); goBack() }
      if (e.key === "ArrowRight") { e.preventDefault(); goForward() }
      if (e.key === "Home") { e.preventDefault(); goToStart() }
      if (e.key === "End") { e.preventDefault(); goToEnd() }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goBack, goForward, goToStart, goToEnd])

  const status = getGameStatus()
  const evalBarPercent = getEvalBarPercent(currentEval)

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">

        {/* LEFT: Eval Bar + Board */}
        <div className="flex gap-3 justify-center lg:justify-start">

          {/* Eval Bar */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative w-8 rounded-full overflow-hidden border-2 border-slate-700" style={{ height: "min(70vw, 560px)" }}>
              <motion.div className="absolute bottom-0 left-0 right-0 bg-white" animate={{ height: `${evalBarPercent}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
              <motion.div className="absolute top-0 left-0 right-0 bg-[#12123D]" animate={{ height: `${100 - evalBarPercent}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-[10px] font-black text-[#12123D]/80">{currentEval ? formatScore(currentEval, false) : "0.0"}</span>
              </div>
            </div>
          </div>

          {/* Board */}
          <div className="relative" style={{ width: "min(70vw, 560px)", height: "min(70vw, 560px)" }}>
            <Chessboard
              id="analysis-board"
              position={game.fen()}
              onPieceDrop={onDrop}
              boardOrientation={boardOrientation}
              boardStyle={{
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(18, 18, 61, 0.4)",
              }}
              customDarkSquareStyle={{ backgroundColor: "#779556" }}
              customLightSquareStyle={{ backgroundColor: "#ebecd0" }}
              customSquareStyles={highlightSquares}
              customArrows={arrows}
              animationDurationInMs={200}
            />

            {/* Mobile eval bar */}
            <div className="md:hidden mt-3 h-6 rounded-full overflow-hidden border-2 border-slate-700 relative flex">
              <motion.div className="absolute left-0 top-0 bottom-0 bg-white" animate={{ width: `${evalBarPercent}%` }} transition={{ duration: 0.5 }} />
              <motion.div className="absolute right-0 top-0 bottom-0 bg-[#12123D]" animate={{ width: `${100 - evalBarPercent}%` }} transition={{ duration: 0.5 }} />
              <span className="relative z-10 text-[10px] font-black text-[#12123D] ml-2 self-center">
                {currentEval ? formatScore(currentEval, false) : "0.0"}
              </span>
            </div>

            <AnimatePresence>
              {status && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-12 left-0 right-0 flex justify-center">
                  <div className="bg-[#12123D] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF6B00]" />
                    <span className={`text-sm font-bold ${status.color}`}>{status.text}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Controls */}
        <div className="flex flex-col gap-4 min-w-0">

          {/* Engine Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#12123D] rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${engineRunning ? "bg-[#FF6B00]" : "bg-white/10"} transition-colors`}>
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Stockfish 16</p>
                  <p className="text-white/40 text-[10px] font-medium">
                    {engineLoading ? "Loading..." : engineRunning ? `Depth ${currentEval?.depth || 0}/${engineDepth}` : "Click to activate"}
                  </p>
                </div>
              </div>
              <Button onClick={toggleEngine} disabled={engineLoading} className={`rounded-xl px-4 h-9 text-xs font-bold transition-all ${engineRunning ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30" : "bg-[#FF6B00] text-white hover:bg-[#e66000]"}`}>
                {engineLoading ? (
                  <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Loading</span>
                ) : engineRunning ? "Stop" : <><Zap className="w-3 h-3 mr-1" />Analyze</>}
              </Button>
            </div>

            <AnimatePresence>
              {engineRunning && multiPvResults.length > 0 && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5">
                  {multiPvResults.map((result, i) => (
                    <div key={i} className="px-4 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`min-w-[52px] text-center py-1 px-2 rounded-lg text-xs font-black ${result.mate !== null ? (result.mate > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400") : result.score > 50 ? "bg-green-500/20 text-green-400" : result.score < -50 ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/60"}`}>
                          {result.mate !== null ? `M${result.mate}` : (result.score / 100).toFixed(1)}
                        </div>
                        <p className="text-white/70 text-xs font-mono truncate">{pvToSan(game.fen(), result.pv)}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Move List */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-[#12123D] rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5">
              <p className="text-white text-sm font-bold">Moves</p>
              <span className="text-white/40 text-[10px] font-medium">{Math.ceil(moveHistory.length / 2)} moves</span>
            </div>

            <div ref={moveListRef} className="max-h-[240px] overflow-y-auto p-3">
              {moveHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-white/30">
                  <Target className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Play a move to begin</p>
                  <p className="text-[10px] mt-1">Or import a game below</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  {moveHistory.map((_, i) => {
                    if (i % 2 !== 0) return null
                    const moveNum = Math.floor(i / 2) + 1
                    const whiteMove = moveHistory[i]
                    const blackMove = moveHistory[i + 1]
                    return (
                      <div key={i} className="contents">
                        <button onClick={() => goToMove(i)} className={`text-left px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${currentMoveIndex === i ? "bg-[#FF6B00] text-white active-move" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                          <span className="text-white/30 text-[10px] font-mono w-5">{moveNum}.</span>{whiteMove}
                        </button>
                        {blackMove ? (
                          <button onClick={() => goToMove(i + 1)} className={`text-left px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${currentMoveIndex === i + 1 ? "bg-[#FF6B00] text-white active-move" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                            {blackMove}
                          </button>
                        ) : <div />}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Nav Controls */}
            <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-white/5 bg-white/[0.02]">
              <Button onClick={goToStart} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><SkipBack className="w-4 h-4" /></Button>
              <Button onClick={goBack} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><ChevronLeft className="w-4 h-4" /></Button>
              <Button onClick={goForward} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><ChevronRight className="w-4 h-4" /></Button>
              <Button onClick={goToEnd} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><SkipForward className="w-4 h-4" /></Button>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <Button onClick={() => setBoardOrientation(o => o === "white" ? "black" : "white")} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-white hover:bg-white/10"><FlipVertical className="w-4 h-4" /></Button>
              <Button onClick={resetBoard} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </motion.div>

          {/* FEN Display */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-[#12123D] rounded-2xl border border-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Current FEN</p>
              <Button onClick={() => copyToClipboard(game.fen())} variant="ghost" className="h-7 px-2 rounded-lg text-white/40 hover:text-white text-[10px] font-bold">
                {copied ? <Check className="w-3 h-3 mr-1 text-green-400" /> : <Copy className="w-3 h-3 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-white/60 text-xs font-mono break-all bg-white/5 rounded-xl p-3">{game.fen()}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`w-3 h-3 rounded-full ${game.turn() === "w" ? "bg-white border border-white/30" : "bg-[#12123D] border-2 border-white/30"}`} />
              <p className="text-white/50 text-xs font-bold">{game.turn() === "w" ? "White" : "Black"} to move</p>
            </div>
          </motion.div>

          {/* Import/Export */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#12123D] rounded-2xl border border-white/5 overflow-hidden">
            <button onClick={() => setShowImport(!showImport)} className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#FF6B00]" />
                <p className="text-white text-sm font-bold">Import / Export</p>
              </div>
              {showImport ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>
            <AnimatePresence>
              {showImport && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-2">Import PGN</label>
                      <textarea value={pgnInput} onChange={(e) => setPgnInput(e.target.value)} placeholder="Paste PGN here... e.g. 1. e4 e5 2. Nf3 Nc6" className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 text-xs font-mono resize-none focus:outline-none focus:border-[#FF6B00]/50 placeholder:text-white/20" />
                      <Button onClick={importPgn} disabled={!pgnInput.trim()} className="w-full mt-2 bg-[#FF6B00] hover:bg-[#e66000] text-white font-bold rounded-xl h-9 text-xs disabled:opacity-30">
                        <Upload className="w-3 h-3 mr-2" />Import PGN
                      </Button>
                    </div>
                    <div className="border-t border-white/5" />
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-2">Import FEN</label>
                      <input type="text" value={fenInput} onChange={(e) => setFenInput(e.target.value)} placeholder="Paste FEN string..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 text-xs font-mono focus:outline-none focus:border-[#FF6B00]/50 placeholder:text-white/20" />
                      <Button onClick={importFen} disabled={!fenInput.trim()} className="w-full mt-2 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl h-9 text-xs border border-white/10 disabled:opacity-30">
                        <Upload className="w-3 h-3 mr-2" />Load Position
                      </Button>
                    </div>
                    <div className="border-t border-white/5" />
                    <div className="flex gap-2">
                      <Button onClick={exportPgn} className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl h-9 text-xs border border-white/10">
                        <Copy className="w-3 h-3 mr-2" />Copy PGN
                      </Button>
                      <Button onClick={() => copyToClipboard(game.fen())} className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl h-9 text-xs border border-white/10">
                        <Copy className="w-3 h-3 mr-2" />Copy FEN
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Engine Settings */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="bg-[#12123D] rounded-2xl border border-white/5 overflow-hidden">
            <button onClick={() => setShowSettings(!showSettings)} className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#FF6B00]" />
                <p className="text-white text-sm font-bold">Engine Settings</p>
              </div>
              {showSettings ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>
            <AnimatePresence>
              {showSettings && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Search Depth</label>
                        <span className="text-[#FF6B00] text-xs font-black">{engineDepth}</span>
                      </div>
                      <input type="range" min="10" max="30" value={engineDepth} onChange={(e) => setEngineDepth(parseInt(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF6B00]" />
                      <div className="flex justify-between text-white/20 text-[9px] font-bold mt-1">
                        <span>10 (Fast)</span><span>30 (Deep)</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Analysis Lines</label>
                        <span className="text-[#FF6B00] text-xs font-black">{multiPv}</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 5].map((n) => (
                          <button key={n} onClick={() => setMultiPv(n)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${multiPv === n ? "bg-[#FF6B00] text-white" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"}`}>{n}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="hidden lg:flex items-center gap-4 px-3 py-2 text-white/20 text-[10px] font-medium">
            <span>← → Navigate</span>
            <span>Home/End Jump</span>
          </div>
        </div>
      </div>
    </div>
  )
}