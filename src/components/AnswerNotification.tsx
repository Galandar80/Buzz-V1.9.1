import React, { useEffect, useRef } from 'react';
import { useRoom } from '../context/RoomContext';
import { toast } from 'sonner';
import { MessageCircle, User, Timer, Zap } from 'lucide-react';

export function AnswerNotification() {
  const { roomData, isHost, gameTimer } = useRoom();
  const lastAnswerRef = useRef<string | null>(null);
  const winnerInfo = roomData?.winnerInfo;

  useEffect(() => {
    if (winnerInfo?.answer && winnerInfo.answer !== lastAnswerRef.current) {
      lastAnswerRef.current = winnerInfo.answer;
      
      // Calcola tempo di risposta
      const responseTime = winnerInfo.timeLeft 
        ? (gameTimer?.totalTime || 30) - winnerInfo.timeLeft 
        : 0;
      
      const formatTime = (seconds: number) => {
        if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
        return `${seconds.toFixed(1)}s`;
      };

      if (isHost) {
        // Notifica speciale per l'host - più prominente e informativa
        toast.success(
          `🎯 ${winnerInfo.playerName} ha risposto in ${formatTime(responseTime)}!`,
          {
            duration: 4000,
            description: 'Controlla la barra in alto per valutare la risposta',
            action: {
              label: '👆 Vai alla barra',
              onClick: () => {
                // Scrolla in alto per vedere la barra
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            },
            className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-white/20',
            style: {
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }
          }
        );

        // Suono di notifica aggiuntivo (se supportato)
        try {
          // Definizione tipizzata per webkit AudioContext
          interface WebkitWindow extends Window {
            webkitAudioContext?: typeof AudioContext;
          }
          
          // Crea un beep audio breve per attirare l'attenzione
          const audioContext = new (window.AudioContext || (window as WebkitWindow).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
          // Ignora errori audio - non critico
        }
      } else {
        // Notifica standard per gli altri giocatori
        toast.info(
          `${winnerInfo.playerName} ha inviato una risposta`,
          {
            duration: 3000,
            description: 'In attesa della valutazione dell\'host...',
            icon: <MessageCircle className="h-4 w-4" />
          }
        );
      }
    }
  }, [winnerInfo?.answer, winnerInfo?.playerName, winnerInfo?.timeLeft, isHost, gameTimer?.totalTime]);

  // Reset quando non c'è più una risposta attiva
  useEffect(() => {
    if (!winnerInfo?.answer) {
      lastAnswerRef.current = null;
    }
  }, [winnerInfo?.answer]);

  return null; // Questo componente non renderizza nulla visivamente
}

export default AnswerNotification; 