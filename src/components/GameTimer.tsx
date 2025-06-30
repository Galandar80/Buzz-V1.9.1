import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Zap, AlertTriangle } from 'lucide-react';

const GameTimer: React.FC = () => {
  const { gameTimer, currentGameMode } = useRoom();

  if (!gameTimer?.isActive || !currentGameMode) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const timeLeft = gameTimer.timeLeft || 0;
    const totalTime = gameTimer.totalTime || 1;
    const percentage = (timeLeft / totalTime) * 100;

    if (percentage > 50) return 'text-green-400 border-green-500/30 bg-green-500/10';
    if (percentage > 25) return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  const getProgressColor = () => {
    const timeLeft = gameTimer.timeLeft || 0;
    const totalTime = gameTimer.totalTime || 1;
    const percentage = (timeLeft / totalTime) * 100;

    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isUrgent = (gameTimer.timeLeft || 0) <= 10;

  return (
    <Card className={`w-full border-2 backdrop-blur-sm transition-all duration-300 ${getTimerColor()} ${
      isUrgent ? 'animate-pulse' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${getTimerColor()}`}>
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4" />
              ) : currentGameMode.type === 'speed' ? (
                <Zap className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                Modalità {currentGameMode.name}
              </h3>
              <p className="text-xs opacity-70">
                {isUrgent ? 'Tempo quasi scaduto!' : 'Tempo rimanente'}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className={`${getTimerColor()} border-current`}
          >
            {currentGameMode.type === 'speed' ? 'VELOCITÀ' : 'TIMER'}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className={`text-2xl font-bold text-center ${
            isUrgent ? 'text-red-400' : ''
          }`}>
            {formatTime(gameTimer.timeLeft || 0)}
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-100 ${getProgressColor()}`}
              style={{
                width: `${((gameTimer.timeLeft || 0) / (gameTimer.totalTime || 1)) * 100}%`
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs opacity-70">
            <span>0:00</span>
            <span>{formatTime(gameTimer.totalTime || 0)}</span>
          </div>
        </div>

        {isUrgent && (
          <div className="mt-3 text-center">
            <p className="text-xs text-red-400 font-medium animate-bounce">
              ⚡ Affrettati! ⚡
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameTimer; 