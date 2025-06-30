import React, { useEffect, useCallback } from 'react';
import { useRoom } from '../context/RoomContext';
import { toast } from 'sonner';

interface HotkeysManagerProps {
  audioRef?: React.RefObject<HTMLAudioElement>;
}

export const HotkeysManager: React.FC<HotkeysManagerProps> = ({ audioRef }) => {
  const { 
    isHost, 
    roomData,
    enableBuzz,
    disableBuzz,
    isBuzzEnabled,
    awardCorrectAnswer,
    awardWrongAnswer,
    awardSuperAnswer,
    rejectAnswer
  } = useRoom();

  const handleVolumeUp = useCallback(() => {
    const audioElements = document.querySelectorAll('audio');
    const volumeSliders = document.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;
    
    audioElements.forEach(audio => {
      if (audio.volume < 1) {
        audio.volume = Math.min(1, audio.volume + 0.1);
      }
    });

    // Aggiorna anche gli slider del volume
    volumeSliders.forEach(slider => {
      if (slider.min === '0' && slider.max === '1') {
        const currentValue = parseFloat(slider.value);
        if (currentValue < 1) {
          slider.value = Math.min(1, currentValue + 0.1).toString();
          slider.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });

    const currentVolume = Math.round((audioElements[0]?.volume || 0) * 100);
    toast.success(`Volume: ${currentVolume}%`, { duration: 1000 });
  }, []);

  const handleVolumeDown = useCallback(() => {
    const audioElements = document.querySelectorAll('audio');
    const volumeSliders = document.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;
    
    audioElements.forEach(audio => {
      if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - 0.1);
      }
    });

    // Aggiorna anche gli slider del volume
    volumeSliders.forEach(slider => {
      if (slider.min === '0' && slider.max === '1') {
        const currentValue = parseFloat(slider.value);
        if (currentValue > 0) {
          slider.value = Math.max(0, currentValue - 0.1).toString();
          slider.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });

    const currentVolume = Math.round((audioElements[0]?.volume || 0) * 100);
    toast.success(`Volume: ${currentVolume}%`, { duration: 1000 });
  }, []);

  const handlePauseAudio = useCallback(() => {
    // Usa la funzione globale del player se disponibile
    if (window.pauseAudioPlayer) {
      window.pauseAudioPlayer();
      toast.success('Audio in pausa', { duration: 1000 });
    } else {
      // Fallback: pausa tutti gli elementi audio
      const audioElements = document.querySelectorAll('audio');
      let paused = false;
      
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
          paused = true;
        }
      });
      
      if (paused) {
        toast.success('Audio in pausa', { duration: 1000 });
      } else {
        toast.info('Nessun audio in riproduzione', { duration: 1000 });
      }
    }
  }, []);

  const handleToggleBuzz = useCallback(async () => {
    try {
      if (isBuzzEnabled) {
        await disableBuzz();
        toast.success('Buzz DISATTIVATO', { duration: 1500 });
      } else {
        await enableBuzz();
        toast.success('Buzz ATTIVATO', { duration: 1500 });
      }
    } catch (error) {
      console.error('Errore nel toggle buzz:', error);
      toast.error('Errore nel toggle buzz');
    }
  }, [isBuzzEnabled, enableBuzz, disableBuzz]);

  const handleCorrectAnswer = useCallback(async () => {
    if (roomData?.winnerInfo) {
      try {
        await awardCorrectAnswer();
        toast.success('Risposta corretta assegnata!', { duration: 1500 });
      } catch (error) {
        console.error('Errore nell\'assegnare risposta corretta:', error);
        toast.error('Errore nell\'assegnare risposta corretta');
      }
    } else {
      toast.error('Nessun giocatore ha buzzato', { duration: 1000 });
    }
  }, [roomData?.winnerInfo, awardCorrectAnswer]);

  const handleWrongAnswer = useCallback(async () => {
    if (roomData?.winnerInfo) {
      try {
        await awardWrongAnswer();
        toast.success('Risposta sbagliata assegnata!', { duration: 1500 });
      } catch (error) {
        console.error('Errore nell\'assegnare risposta sbagliata:', error);
        toast.error('Errore nell\'assegnare risposta sbagliata');
      }
    } else {
      toast.error('Nessun giocatore ha buzzato', { duration: 1000 });
    }
  }, [roomData?.winnerInfo, awardWrongAnswer]);

  const handleSuperAnswer = useCallback(async () => {
    if (roomData?.winnerInfo) {
      try {
        await awardSuperAnswer();
        toast.success('Risposta SUPER assegnata!', { duration: 1500 });
      } catch (error) {
        console.error('Errore nell\'assegnare risposta SUPER:', error);
        toast.error('Errore nell\'assegnare risposta SUPER');
      }
    } else {
      toast.error('Nessun giocatore ha buzzato', { duration: 1000 });
    }
  }, [roomData?.winnerInfo, awardSuperAnswer]);

  const handleRejectAnswer = useCallback(async () => {
    if (roomData?.winnerInfo) {
      try {
        await rejectAnswer();
        toast.success('Risposta rifiutata', { duration: 1500 });
      } catch (error) {
        console.error('Errore nel rifiutare la risposta:', error);
        toast.error('Errore nel rifiutare la risposta');
      }
    } else {
      toast.error('Nessun giocatore ha buzzato', { duration: 1000 });
    }
  }, [roomData?.winnerInfo, rejectAnswer]);

  useEffect(() => {
    if (!isHost) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora se l'utente sta scrivendo in un input
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      // Previeni il comportamento default per i nostri hotkeys
      const hotkeys = ['b', 'q', 'w', 'e', 'r', 'ArrowUp', 'ArrowDown', ' '];
      if (hotkeys.includes(event.key.toLowerCase()) || hotkeys.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key.toLowerCase()) {
        case 'b': // Toggle Buzz
          handleToggleBuzz();
          break;
        
        case 'q': // Risposta corretta
          handleCorrectAnswer();
          break;
        
        case 'w': // Risposta sbagliata
          handleWrongAnswer();
          break;
        
        case 'e': // Risposta super
          handleSuperAnswer();
          break;
        
        case 'r': // Rifiuta risposta
          handleRejectAnswer();
          break;
        
        case 'arrowup': // Volume su
          handleVolumeUp();
          break;
        
        case 'arrowdown': // Volume giù
          handleVolumeDown();
          break;
        
        case ' ': // Spazio - Pausa audio
          handlePauseAudio();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isHost,
    handleToggleBuzz,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleSuperAnswer,
    handleRejectAnswer,
    handleVolumeUp,
    handleVolumeDown,
    handlePauseAudio
  ]);

  // Questo componente non renderizza nulla, gestisce solo gli eventi
  return null;
};

export default HotkeysManager; 