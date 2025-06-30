import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  User, 
  Target, 
  Zap, 
  TrendingUp, 
  Clock, 
  Trophy,
  BarChart3,
  Percent
} from 'lucide-react';

interface PlayerStatsProps {
  playerId?: string;
  compact?: boolean;
}

export function PlayerStats({ playerId, compact = false }: PlayerStatsProps) {
  const { roomData, playerId: currentPlayerId, playersList } = useRoom();

  // Usa il playerId passato come prop o quello corrente
  const targetPlayerId = playerId || currentPlayerId;
  
  if (!roomData || !targetPlayerId) {
    return null;
  }

  const player = roomData.players[targetPlayerId];
  const playerInfo = playersList.find(p => p.id === targetPlayerId);
  
  if (!player || !playerInfo) {
    return null;
  }

  const stats = {
    totalScore: player.points || 0,
    correctAnswers: player.correctAnswers || 0,
    wrongAnswers: player.wrongAnswers || 0,
    currentStreak: player.currentStreak || 0,
    bestStreak: player.bestStreak || 0,
    averageResponseTime: player.averageResponseTime || 0,
    totalAnswers: (player.correctAnswers || 0) + (player.wrongAnswers || 0)
  };

  const accuracy = stats.totalAnswers > 0 
    ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) 
    : 0;

  const formatTime = (seconds: number) => {
    if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
    return `${seconds.toFixed(1)}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 5) return 'text-purple-600';
    if (streak >= 3) return 'text-blue-600';
    if (streak >= 1) return 'text-green-600';
    return 'text-muted-foreground';
  };

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">{playerInfo.name}</h3>
              <p className="text-sm text-muted-foreground">Le tue statistiche</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalScore}</div>
              <div className="text-xs text-muted-foreground">Punti</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
                {accuracy}%
              </div>
              <div className="text-xs text-muted-foreground">Precisione</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Statistiche di {playerInfo.name}
          {playerInfo.isHost && (
            <Badge variant="outline" className="ml-auto">HOST</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Punteggio totale */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-primary">{stats.totalScore}</div>
          <div className="text-sm text-muted-foreground">Punti Totali</div>
        </div>

        {/* Statistiche principali */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 border rounded-lg">
            <Target className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <div className="text-xl font-semibold text-green-600">{stats.correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Corrette</div>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <Target className="h-5 w-5 text-red-500 mx-auto mb-1" />
            <div className="text-xl font-semibold text-red-600">{stats.wrongAnswers}</div>
            <div className="text-xs text-muted-foreground">Sbagliate</div>
          </div>
        </div>

        {/* Precisione */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Precisione</span>
            </div>
            <span className={`text-sm font-semibold ${getAccuracyColor(accuracy)}`}>
              {accuracy}%
            </span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>

        {/* Streak */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 border rounded-lg">
            <Zap className={`h-5 w-5 mx-auto mb-1 ${getStreakColor(stats.currentStreak)}`} />
            <div className={`text-xl font-semibold ${getStreakColor(stats.currentStreak)}`}>
              {stats.currentStreak}
            </div>
            <div className="text-xs text-muted-foreground">Streak Attuale</div>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xl font-semibold text-purple-600">{stats.bestStreak}</div>
            <div className="text-xs text-muted-foreground">Miglior Streak</div>
          </div>
        </div>

        {/* Tempo di risposta */}
        {stats.averageResponseTime > 0 && (
          <div className="text-center p-3 border rounded-lg">
            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xl font-semibold text-blue-600">
              {formatTime(stats.averageResponseTime)}
            </div>
            <div className="text-xs text-muted-foreground">Tempo Medio di Risposta</div>
          </div>
        )}

        {/* Riepilogo */}
        <div className="p-3 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Riepilogo Partita</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Risposte totali: {stats.totalAnswers}</div>
            <div>• Precisione: {accuracy}% ({stats.correctAnswers}/{stats.totalAnswers})</div>
            {stats.currentStreak > 0 && (
              <div>• Streak attiva di {stats.currentStreak} risposte corrette</div>
            )}
            {stats.bestStreak > 1 && (
              <div>• Record personale: {stats.bestStreak} risposte consecutive</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerStats; 