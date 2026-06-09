// lib/stockfish.ts
// Stockfish engine wrapper using Web Worker with CDN-hosted Stockfish WASM

export interface EvalResult {
  depth: number;
  score: number; // in centipawns, from white's perspective
  mate: number | null; // mate in N moves, null if not a mate
  pv: string; // principal variation (best line)
  multipv: number;
  nodes: number;
  nps: number;
}

export interface EngineMessage {
  type: 'eval' | 'bestmove' | 'info' | 'ready';
  data?: EvalResult;
  bestMove?: string;
  ponder?: string;
  raw?: string;
}

type MessageHandler = (msg: EngineMessage) => void;

export class StockfishEngine {
  private worker: Worker | null = null;
  private isReady = false;
  private messageHandlers: MessageHandler[] = [];
  private readyResolve: (() => void) | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Use Stockfish.js from CDN via a blob worker
        const workerCode = `
          importScripts('https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-16.1-lite-single.js');
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.worker = new Worker(URL.createObjectURL(blob));

        this.worker.onmessage = (e: MessageEvent) => {
          const line = typeof e.data === 'string' ? e.data : String(e.data);
          this.handleMessage(line);
        };

        this.worker.onerror = (e) => {
          console.error('Stockfish worker error:', e);
          // Fallback: try loading from a different CDN path
          this.tryFallbackInit(resolve, reject);
        };

        this.readyResolve = resolve;
        this.sendCommand('uci');
      } catch (err) {
        this.tryFallbackInit(resolve, reject);
      }
    });
  }

  private tryFallbackInit(resolve: () => void, reject: (err: Error) => void): void {
    try {
      // Fallback: try stockfish.js directly as a module worker
      const workerCode = `
        var Module = {
          locateFile: function(path) {
            return 'https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js';
          }
        };
        importScripts('https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js');
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));

      this.worker.onmessage = (e: MessageEvent) => {
        const line = typeof e.data === 'string' ? e.data : String(e.data);
        this.handleMessage(line);
      };

      this.worker.onerror = (e) => {
        console.error('Stockfish fallback worker error:', e);
        reject(new Error('Failed to initialize Stockfish engine'));
      };

      this.readyResolve = resolve;
      this.sendCommand('uci');
    } catch (err) {
      reject(new Error('Failed to initialize Stockfish engine'));
    }
  }

  private handleMessage(line: string): void {
    // Engine is ready
    if (line === 'uciok') {
      this.sendCommand('isready');
      return;
    }

    if (line === 'readyok') {
      this.isReady = true;
      if (this.readyResolve) {
        this.readyResolve();
        this.readyResolve = null;
      }
      this.notifyHandlers({ type: 'ready' });
      return;
    }

    // Parse info lines for evaluation
    if (line.startsWith('info') && line.includes('score')) {
      const evalResult = this.parseInfoLine(line);
      if (evalResult) {
        this.notifyHandlers({ type: 'eval', data: evalResult, raw: line });
      }
      return;
    }

    // Parse bestmove
    if (line.startsWith('bestmove')) {
      const parts = line.split(' ');
      const bestMove = parts[1];
      const ponder = parts[3] || undefined;
      this.notifyHandlers({ type: 'bestmove', bestMove, ponder, raw: line });
      return;
    }

    // Generic info
    this.notifyHandlers({ type: 'info', raw: line });
  }

  private parseInfoLine(line: string): EvalResult | null {
    try {
      const depthMatch = line.match(/depth (\d+)/);
      const scoreMatch = line.match(/score (cp|mate) (-?\d+)/);
      const pvMatch = line.match(/ pv (.+)/);
      const multipvMatch = line.match(/multipv (\d+)/);
      const nodesMatch = line.match(/nodes (\d+)/);
      const npsMatch = line.match(/nps (\d+)/);

      if (!depthMatch || !scoreMatch) return null;

      const isMate = scoreMatch[1] === 'mate';
      const scoreValue = parseInt(scoreMatch[2]);

      return {
        depth: parseInt(depthMatch[1]),
        score: isMate ? 0 : scoreValue,
        mate: isMate ? scoreValue : null,
        pv: pvMatch ? pvMatch[1] : '',
        multipv: multipvMatch ? parseInt(multipvMatch[1]) : 1,
        nodes: nodesMatch ? parseInt(nodesMatch[1]) : 0,
        nps: npsMatch ? parseInt(npsMatch[1]) : 0,
      };
    } catch {
      return null;
    }
  }

  sendCommand(cmd: string): void {
    if (this.worker) {
      this.worker.postMessage(cmd);
    }
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  private notifyHandlers(msg: EngineMessage): void {
    this.messageHandlers.forEach((h) => h(msg));
  }

  evaluate(fen: string, depth: number = 20, multiPv: number = 1): void {
    this.sendCommand('stop');
    this.sendCommand(`setoption name MultiPV value ${multiPv}`);
    this.sendCommand(`position fen ${fen}`);
    this.sendCommand(`go depth ${depth}`);
  }

  stop(): void {
    this.sendCommand('stop');
  }

  setOption(name: string, value: string | number): void {
    this.sendCommand(`setoption name ${name} value ${value}`);
  }

  newGame(): void {
    this.sendCommand('ucinewgame');
    this.sendCommand('isready');
  }

  destroy(): void {
    if (this.worker) {
      this.sendCommand('quit');
      this.worker.terminate();
      this.worker = null;
    }
    this.isReady = false;
    this.messageHandlers = [];
  }

  getIsReady(): boolean {
    return this.isReady;
  }
}
