import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fetchArabicHeadlines, ArabicHeadline } from './services/arabic-news';
import { breakdownHeadline, LessonData } from './services/breakdown';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' }, allowEIO3: true });

app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

let headlines: ArabicHeadline[] = [];
let currentLesson: LessonData | null = null;
let headlineIndex = 0;
let isProcessing = false;

async function loadHeadlines() {
  try {
    const fresh = await fetchArabicHeadlines();
    if (fresh.length > 0) headlines = fresh;
    console.log(`[News] ${headlines.length} Arabic headlines loaded`);
  } catch (e) {
    console.error('[News] Error:', e);
  }
}

async function nextLesson() {
  if (isProcessing || headlines.length === 0) return;
  isProcessing = true;

  try {
    const h = headlines[headlineIndex % headlines.length];
    headlineIndex++;
    console.log(`[Lesson] Breaking down: ${h.title}`);

    const lesson = await breakdownHeadline(h.title, h.source);
    currentLesson = lesson;
    io.emit('lesson:update', lesson);
    console.log(`[Lesson] Sent: ${lesson.difficulty} — ${lesson.translation_de}`);
  } catch (e) {
    console.error('[Lesson] Error:', e);
  } finally {
    isProcessing = false;
  }
}

io.on('connection', (socket) => {
  console.log('[WS] Connected:', socket.id);
  if (currentLesson) socket.emit('lesson:update', currentLesson);
  socket.on('disconnect', () => console.log('[WS] Disconnected:', socket.id));
});

async function start() {
  await loadHeadlines();
  await nextLesson();

  // New headline every 5 minutes
  setInterval(nextLesson, 5 * 60 * 1000);
  // Refresh headlines every 30 minutes
  setInterval(loadHeadlines, 30 * 60 * 1000);

  const PORT = process.env.PORT || 3002;
  httpServer.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));
}

start();
