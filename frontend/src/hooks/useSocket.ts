import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useStore } from '../store/useStore';
import { EpisodeData } from '../store/useStore';

const BACKEND = import.meta.env.VITE_BACKEND_URL ?? '/';
const socket = io(BACKEND, { transports: ['websocket', 'polling'] });

export function useSocket() {
  const { setEpisode, setConnected } = useStore();

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('episode:update', (data: EpisodeData) => setEpisode(data));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('episode:update');
    };
  }, [setEpisode, setConnected]);
}
