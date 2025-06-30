
import React from 'react';
import { useRoom } from '../context/RoomContext';
import { User, Crown, Award } from 'lucide-react';

const PlayerList: React.FC = () => {
  const { playersList, winnerName } = useRoom();

  // Ordina i giocatori: host in cima, poi vincitore, poi per punteggio
  const sortedPlayers = [...playersList].sort((a, b) => {
    if (a.isHost) return -1;
    if (b.isHost) return 1;
    if (a.name === winnerName) return -1;
    if (b.name === winnerName) return 1;
    return (b.points || 0) - (a.points || 0); // Ordina per punteggio decrescente
  });

  if (playersList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 rounded-xl glass-morphism animate-fade-in">
        <p className="text-muted-foreground">Nessun giocatore connesso</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-700/30 shadow-lg animate-fade-in">
      <h3 className="text-xl font-bold mb-3 text-center text-indigo-800 dark:text-indigo-300">Giocatori ({playersList.length})</h3>
      
      <div className="space-y-2">
        {sortedPlayers.map((player) => (
          <div
            key={player.id}
            className={`
              flex items-center justify-between p-3 rounded-lg transition-all duration-200
              ${player.name === winnerName 
                ? 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-700/30' 
                : player.isHost
                ? 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-700/30'
                : 'bg-white/80 dark:bg-white/5 border border-white/50 dark:border-white/10'}
              transform hover:scale-[1.01] hover:shadow-md
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${player.isHost 
                  ? 'bg-indigo-500/20 dark:bg-indigo-500/30' 
                  : player.name === winnerName 
                  ? 'bg-amber-500/20 dark:bg-amber-500/30' 
                  : 'bg-white/30 dark:bg-white/10'}
              `}>
                {player.isHost ? (
                  <Crown className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                ) : player.name === winnerName ? (
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <User className="w-5 h-5 text-foreground/70" />
                )}
              </div>
              
              <div className="flex flex-col">
                <span className={`font-medium ${player.name === winnerName ? 'text-amber-700 dark:text-amber-400' : player.isHost ? 'text-indigo-700 dark:text-indigo-300' : ''}`}>
                  {player.name} {player.isHost && <span className="text-xs text-indigo-500 dark:text-indigo-400 ml-1">(Host)</span>}
                </span>
                <span className="text-xs text-muted-foreground">
                  {player.points} punti
                </span>
              </div>
            </div>
            
            {player.name === winnerName && (
              <span className="px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/30">
                Primo!
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
