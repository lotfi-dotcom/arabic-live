import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useStore } from '../store/useStore';
const BACKEND = import.meta.env.VITE_BACKEND_URL ?? '/';
const socket = io(BACKEND, { transports: ['websocket', 'polling'] });
export function useSocket() {
    const { setLesson, setConnected } = useStore();
    useEffect(() => {
        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));
        socket.on('lesson:update', (data) => setLesson(data));
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('lesson:update');
        };
    }, [setLesson, setConnected]);
}
