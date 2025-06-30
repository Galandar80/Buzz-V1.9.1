import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BuzzButton from '../components/BuzzButton';
import PlayerList from '../components/PlayerList';
import RoomInfo from '../components/RoomInfo';
import AudioPlayer from '../components/AudioPlayer';
import BackgroundMusic from '../components/BackgroundMusic';
import GameModeSelector from '../components/GameModeSelector';
import GameTimer from '../components/GameTimer';
import GameModeDisplay from '../components/GameModeDisplay';
import TurnDisplay from '../components/TurnDisplay';
import PlayerAnswer from '../components/PlayerAnswer';
import AnswerNotification from '../components/AnswerNotification';
import BuzzController from '../components/BuzzController';
import { MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Leaderboard } from '../components/Leaderboard';
import { PlayerStats } from '../components/PlayerStats';
import HotkeysManager from '../components/HotkeysManager';
import HotkeysGuide from '../components/HotkeysGuide';
import CountdownDisplay from '../components/CountdownDisplay';

const Room = () => {
  const { code } = useParams<{ code: string }>();
  const { roomCode, setRoomCode, roomData, playerName, isHost, error, isLoading, winnerName } = useRoom();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (code && code !== roomCode) {
      setRoomCode(code);
    }
  }, [code, roomCode, setRoomCode]);

  useEffect(() => {
    if (!playerName) {
      toast.error('Devi inserire un nome per entrare in una stanza');
      navigate('/');
      return;
    }
    
    if (error) {
      toast.error(error);
      navigate('/');
      return;
    }
    
    const timeout = setTimeout(() => {
      if (!roomData && !isLoading) {
        toast.error('La stanza non esiste o è scaduta');
        navigate('/');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [playerName, roomData, error, navigate, isLoading]);

  useEffect(() => {
    if (roomCode && !roomData && !isLoading) {
      console.log("Room data is null, room may have been deleted due to inactivity");
      toast.error('La stanza è stata chiusa per inattività');
      navigate('/');
    }
  }, [roomData, roomCode, navigate, isLoading]);

  useEffect(() => {
    if (roomData) {
      setIsInitializing(false);
    }
  }, [roomData]);

  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/50">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Caricamento stanza...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <Header />
      
      {/* Countdown sincronizzato - Visibile su tutti i dispositivi */}
      <CountdownDisplay />
      
      {/* Componente per visualizzare le risposte in modo prominente */}
      <PlayerAnswer />
      
      {/* Componente per le notifiche delle risposte */}
      <AnswerNotification />
      
      <main className={`flex-1 container mx-auto px-4 py-8 transition-all duration-300 ${
        isHost && roomData?.winnerInfo?.answer ? 'pt-32' : ''
      }`}>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-white" />
              <p className="text-white">Caricamento stanza...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-red-400 mb-2">Errore</h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Torna alla Home
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <RoomInfo />
            
            {/* Musica di Background - Solo per l'host */}
            {isHost && <BackgroundMusic />}
            
            {/* Game Mode Display - Visibile a tutti quando una modalità è attiva */}
            <GameModeDisplay />
            
            {/* Turn Display - Visibile a tutti in modalità A Turni */}
            <TurnDisplay />
            
            {/* Game Timer - Visibile a tutti quando attivo */}
            <GameTimer />
            
            {/* Game Mode Selector - Solo per l'host */}
            {isHost && (
              <div className="mb-6 space-y-6">
                <GameModeSelector />
                <BuzzController />
              </div>
            )}
            
            {isHost && <AudioPlayer />}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                <BuzzButton />
                {winnerName && !roomData?.winnerInfo?.answer && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <p className="text-green-300">
                      <span className="font-bold">{winnerName}</span> può rispondere!
                    </p>
                  </div>
                )}
                
                {/* Statistiche personali del giocatore */}
                <PlayerStats compact={true} />
              </div>
              
              <PlayerList />
              
              {/* Classifica dei punteggi */}
              <div className="space-y-6">
                <Leaderboard />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Gestione comandi rapidi da tastiera - Solo per l'host */}
      {isHost && (
        <>
          <HotkeysManager />
          <HotkeysGuide />
        </>
      )}
    </div>
  );
};

export default Room;
