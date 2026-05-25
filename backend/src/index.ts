import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { generateEpisode, EpisodeData } from './services/episode';
import { CURRICULUM } from './services/curriculum';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' }, allowEIO3: true });

app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

let currentEpisode: EpisodeData | null = null;
let themeIndex = 0;
let isGenerating = false;

const EPISODE_INTERVAL_MS = 7 * 60 * 1000; // 7 minutes matches segment cycle

async function nextEpisode() {
  if (isGenerating) return;
  isGenerating = true;
  try {
    const theme = CURRICULUM[themeIndex % CURRICULUM.length];
    themeIndex++;
    console.log(`[Episode] Generating: ${theme.name_de} (${theme.difficulty})`);
    const episode = await generateEpisode(theme);
    currentEpisode = episode;
    io.emit('episode:update', episode);
    console.log(`[Episode] Live: ${episode.theme} — ${episode.words.length} Wörter`);
  } catch (e) {
    console.error('[Episode] Error:', e);
  } finally {
    isGenerating = false;
  }
}

io.on('connection', (socket) => {
  console.log('[WS] Connected:', socket.id);
  if (currentEpisode) socket.emit('episode:update', currentEpisode);
  socket.on('disconnect', () => console.log('[WS] Disconnected:', socket.id));
});

async function start() {
  await nextEpisode();
  setInterval(nextEpisode, EPISODE_INTERVAL_MS);
  const PORT = process.env.PORT || 3002;
  httpServer.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));
}

start();
