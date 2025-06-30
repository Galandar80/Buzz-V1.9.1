import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, TrendingUp, Target, Zap } from 'lucide-react';

export function Leaderboard() {
  const { playersList, roomData } = useRoom();

  if (!roomData || playersList.length === 0) {
    return null;
  }

  // Ordina i giocatori per punteggio
  const sortedPlayers = [...playersList]
    .filter(player => (player.points || 0) > 0)
    .sort((a, b) => (b.points || 0) - (a.points || 0));

  if (sortedPlayers.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Classifica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Nessun punteggio ancora disponibile
          </p>
        </CardContent>
      </Card>
    );
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getPlayerStats = (playerId: string) => {
    const player = roomData.players[playerId];
    if (!player) return null;

    return {
      correctAnswers: player.correctAnswers || 0,
      wrongAnswers: player.wrongAnswers || 0,
      currentStreak: player.currentStreak || 0,
      bestStreak: player.bestStreak || 0,
      averageResponseTime: player.averageResponseTime || 0
    };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Classifica
          <Badge variant="secondary" className="ml-auto">
            {sortedPlayers.length} giocatori
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const position = index + 1;
          const stats = getPlayerStats(player.id);
          
          return (
            <div
              key={player.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${getPositionColor(position)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getPositionIcon(position)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        {player.name}
                      </span>
                      {player.isHost && (
                        <Badge variant="outline" className="text-xs">
                          HOST
                        </Badge>
                      )}
                      {player.team && (
                        <Badge 
                          variant={player.team === 'A' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          Team {player.team}
                        </Badge>
                      )}
                    </div>
                    {stats && (
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{stats.correctAnswers}✓ {stats.wrongAnswers}✗</span>
                        </div>
                        {stats.currentStreak > 0 && (
                          <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-orange-500" />
                            <span>{stats.currentStreak} streak</span>
                          </div>
                        )}
                        {stats.bestStreak > 1 && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span>Best: {stats.bestStreak}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {player.points || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    punti
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default Leaderboard; 