import React, { useState, useEffect, useRef } from 'react';
import { useRoom } from '../context/RoomContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User,
  Timer,
  Send,
  X,
  Star,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function PlayerAnswer() {
  const { 
    roomData, 
    isHost, 
    awardCorrectAnswer, 
    awardWrongAnswer, 
    awardSuperAnswer, 
    rejectAnswer, 
    gameTimer,
    currentGameMode 
  } = useRoom();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHostBar, setShowHostBar] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const winnerInfo = roomData?.winnerInfo;

  useEffect(() => {
    if (winnerInfo?.answer) {
      setShowAnswer(true);
      setShowHostBar(true);
      setIsExpanded(true); // Inizia sempre espansa per mostrare tutto subito
      
      // Auto-hide dopo 60 secondi se l'host non agisce
      const timeout = setTimeout(() => {
        setShowAnswer(false);
        setShowHostBar(false);
      }, 60000);
      
      return () => clearTimeout(timeout);
    } else {
      setShowAnswer(false);
      setShowHostBar(false);
      setIsExpanded(false);
    }
  }, [winnerInfo?.answer]);

  // Gestione click fuori dal modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // Solo i non-host possono chiudere cliccando fuori
        if (!isHost) {
          setShowAnswer(false);
        }
      }
    };

    if (showAnswer) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAnswer, isHost]);

  // Gestione tasto ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showAnswer) {
        if (!isHost) {
          setShowAnswer(false);
        } else {
          // Per l'host, ESC comprime/espande la barra
          setIsExpanded(!isExpanded);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showAnswer, isHost, isExpanded]);

  if (!winnerInfo || !winnerInfo.answer) {
    return null;
  }

  const responseTime = winnerInfo.timeLeft 
    ? (gameTimer?.totalTime || 30) - winnerInfo.timeLeft 
    : 0;

  const formatTime = (seconds: number) => {
    if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
    return `${seconds.toFixed(1)}s`;
  };

  const handleCorrect = async () => {
    await awardCorrectAnswer();
    setShowAnswer(false);
    setShowHostBar(false);
  };

  const handleWrong = async () => {
    await awardWrongAnswer();
    setShowAnswer(false);
    setShowHostBar(false);
  };

  const handleSuper = async () => {
    await awardSuperAnswer();
    setShowAnswer(false);
    setShowHostBar(false);
  };

  const handleIgnore = async () => {
    await rejectAnswer();
    setShowAnswer(false);
    setShowHostBar(false);
  };

  const handleClose = () => {
    if (!isHost) {
      setShowAnswer(false);
    } else {
      setShowHostBar(false);
      setShowAnswer(false);
    }
  };

  // Punti per ogni azione basati sulla modalità di gioco
  const correctPoints = currentGameMode?.settings?.pointsCorrect || 10;
  const wrongPoints = currentGameMode?.settings?.pointsWrong || 5;
  const superPoints = 20;

  return (
    <>
      {/* BARRA FISSA IN ALTO PER HOST - SEMPRE VISIBILE */}
      {isHost && showHostBar && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-xl border-b-4 border-white/20 animate-in slide-in-from-top duration-500">
          <div className="container mx-auto px-4">
            {/* Header con info giocatore - sempre visibile */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/20 animate-pulse">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {winnerInfo.playerName} ha risposto
                  </h3>
                  <p className="text-sm text-white/80">
                    Valuta la risposta qui sotto
                  </p>
                </div>
                {responseTime > 0 && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Timer className="h-3 w-3 mr-1" />
                    {formatTime(responseTime)}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 px-2"
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Contenuto sempre espanso */}
            {isExpanded && (
              <div className="pb-4 animate-in slide-in-from-top duration-300">
                {/* Risposta in evidenza */}
                <div className="mb-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-sm text-white/80 mb-2 font-medium">Risposta:</p>
                  <p className="text-xl font-bold text-white leading-relaxed break-words">
                    "{winnerInfo.answer}"
                  </p>
                </div>

                {/* Controlli completi - sempre visibili */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button
                    onClick={handleCorrect}
                    className="bg-green-500/80 hover:bg-green-500 text-white border border-white/30 font-semibold"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Corretta (+{correctPoints})
                  </Button>
                  <Button
                    onClick={handleSuper}
                    className="bg-gradient-to-r from-yellow-500/80 to-orange-500/80 hover:from-yellow-500 hover:to-orange-500 text-white border border-white/30 font-semibold"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    SUPER! (+{superPoints})
                  </Button>
                  <Button
                    onClick={handleWrong}
                    className="bg-red-500/80 hover:bg-red-500 text-white border border-white/30 font-semibold"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Sbagliata (-{wrongPoints})
                  </Button>
                  <Button
                    onClick={handleIgnore}
                    className="bg-gray-500/80 hover:bg-gray-500 text-white border border-white/30 font-semibold"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Ignora
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL ORIGINALE - Solo per non-host o come fallback */}
      {(!isHost || !showHostBar) && showAnswer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card 
            ref={modalRef}
            className="w-full max-w-2xl mx-auto shadow-2xl border-2 border-primary/20 animate-in slide-in-from-bottom-4 duration-500 relative"
          >
            {/* Pulsante di chiusura per i non-host */}
            {!isHost && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <CardContent className="p-8">
              {/* Header con info giocatore */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 animate-pulse">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {winnerInfo.playerName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ha inviato una risposta
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {responseTime > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      {formatTime(responseTime)}
                    </Badge>
                  )}
                  {currentGameMode && (
                    <Badge variant="outline" className="text-xs">
                      {currentGameMode.name}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Risposta in evidenza */}
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700/30 shadow-inner">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mt-1">
                    <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-600 dark:text-blue-300 mb-2 font-medium">
                      Risposta:
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed break-words">
                      "{winnerInfo.answer}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Azioni per l'host */}
              {isHost ? (
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Valuta la risposta di {winnerInfo.playerName}
                  </p>
                  
                  {/* Prima riga: Corretta e Super */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <Button
                      onClick={handleCorrect}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition-all hover:scale-105"
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Corretta (+{correctPoints})
                    </Button>
                    <Button
                      onClick={handleSuper}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white flex items-center gap-2 transition-all hover:scale-105"
                      size="lg"
                    >
                      <Star className="h-5 w-5" />
                      SUPER! (+{superPoints})
                    </Button>
                  </div>
                  
                  {/* Seconda riga: Sbagliata e Ignora */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleWrong}
                      variant="destructive"
                      className="flex items-center gap-2 transition-all hover:scale-105"
                      size="lg"
                    >
                      <XCircle className="h-5 w-5" />
                      Sbagliata (-{wrongPoints})
                    </Button>
                    <Button
                      onClick={handleIgnore}
                      variant="outline"
                      className="flex items-center gap-2 transition-all hover:scale-105"
                      size="lg"
                    >
                      <Clock className="h-5 w-5" />
                      Ignora
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 animate-pulse">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      In attesa della valutazione dell'host...
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Premi ESC o clicca fuori per chiudere
                  </p>
                </div>
              )}

              {/* Timestamp */}
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  Inviata alle {new Date(winnerInfo.timestamp).toLocaleTimeString('it-IT')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default PlayerAnswer; 