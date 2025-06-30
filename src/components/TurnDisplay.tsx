import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RotateCcw, Clock, Users } from 'lucide-react';

const TurnDisplay: React.FC = () => {
  const { currentGameMode, roomData, getCurrentTurnPlayer, isCurrentPlayerTurn, turnAdvantageTimeLeft } = useRoom();

  // Mostra solo per modalità A Turni
  if (!currentGameMode || currentGameMode.type !== 'turnBased') return null;

  const currentTurnPlayer = getCurrentTurnPlayer ? getCurrentTurnPlayer() : null;
  const isMyTurn = isCurrentPlayerTurn || false;
  const advantageTimeLeft = turnAdvantageTimeLeft || 0;
  const isAdvantagePhase = roomData?.currentTurn?.advantagePhase && advantageTimeLeft > 0;

  // Usa l'ordine dei turni sincronizzato da Firebase
  const turnOrder = roomData?.currentTurn?.turnOrder || [];
  const nextPlayerIndex = roomData?.currentTurn?.nextPlayerIndex || 0;
  const nextTurnPlayer = turnOrder.length > 0 ? turnOrder[nextPlayerIndex] : null;

  // Lista giocatori non-host per fallback (se turnOrder non è disponibile)
  const playersList = roomData ? Object.entries(roomData.players || {}).map(([id, player]) => ({
    id,
    name: player.name,
    isHost: player.isHost,
    points: player.points || 0,
    team: player.team
  })) : [];
  
  const nonHostPlayers = playersList.filter(p => !p.isHost);
  const currentTurnNumber = roomData?.currentTurn?.turnNumber || 0;

  return (
    <Card className="w-full bg-purple-500/10 backdrop-blur-sm border-purple-500/30">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-purple-200">
                Modalità A Turni
              </h3>
              <p className="text-sm text-purple-300/80">
                Ogni giocatore può buzzare subito nel suo turno, gli altri dopo 15 secondi
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="bg-purple-500/20 text-purple-400 border-purple-500/30"
          >
            <Users className="w-3 h-3 mr-1" />
            {turnOrder.length > 0 ? turnOrder.length : nonHostPlayers.length} giocatori
          </Badge>
        </div>

        {currentTurnPlayer ? (
          <div className="space-y-3">
            {/* Turno corrente */}
            <div className={`p-3 rounded-lg border ${
              isMyTurn 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-purple-500/20 border-purple-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${
                    isMyTurn ? 'text-green-300' : 'text-purple-300'
                  }`}>
                    {isMyTurn ? '🎯 È il tuo turno!' : `Turno di ${currentTurnPlayer.name}`}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Turno #{currentTurnNumber} di {nonHostPlayers.length}
                  </p>
                </div>
                
                {isAdvantagePhase && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-mono text-sm">
                      {Math.ceil(advantageTimeLeft)}s
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Prossimi turni */}
            <div className="space-y-2">
              <p className="text-xs text-purple-300/60 font-medium">Prossimi turni:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {turnOrder.slice(0, 6).map((player, index) => {
                  const adjustedIndex = (nextPlayerIndex + index) % turnOrder.length;
                  const playerInOrder = turnOrder[adjustedIndex];
                  const isCurrent = currentTurnPlayer && playerInOrder.id === currentTurnPlayer.id;
                  
                  return (
                    <div 
                      key={playerInOrder.id}
                      className={`p-2 rounded text-xs ${
                        isCurrent 
                          ? 'bg-purple-400/20 text-purple-200 border border-purple-400/30' 
                          : 'bg-white/5 text-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4 text-center text-[10px] opacity-70">
                          {isCurrent ? '▶' : index + 1}
                        </span>
                        <span className="truncate">{playerInOrder.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : turnOrder.length > 0 ? (
          // Mostra il prossimo giocatore di turno quando non c'è un turno attivo
          <div className="space-y-3">
            <div className="p-3 rounded-lg border bg-blue-500/20 border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-300">
                    🎵 Prossimo turno: {nextTurnPlayer?.name || 'N/A'}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Quando inizierà una canzone, {nextTurnPlayer?.name} avrà il primo turno
                  </p>
                </div>
              </div>
            </div>

            {/* Ordine completo dei turni */}
            <div className="space-y-2">
              <p className="text-xs text-purple-300/60 font-medium">Ordine dei turni:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {turnOrder.slice(0, 6).map((player, index) => {
                  const adjustedIndex = (nextPlayerIndex + index) % turnOrder.length;
                  const playerInOrder = turnOrder[adjustedIndex];
                  const isNext = index === 0;
                  
                  return (
                    <div 
                      key={playerInOrder.id}
                      className={`p-2 rounded text-xs ${
                        isNext 
                          ? 'bg-blue-400/20 text-blue-200 border border-blue-400/30' 
                          : 'bg-white/5 text-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4 text-center text-[10px] opacity-70">
                          {isNext ? '🎯' : index + 1}
                        </span>
                        <span className="truncate">{playerInOrder.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : nonHostPlayers.length > 0 ? (
          <div className="text-center py-4">
            <p className="text-purple-300/80 text-sm">
              L'host deve selezionare nuovamente la modalità "A Turni" per inizializzare i turni
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-purple-300/80 text-sm">
              Nessun giocatore disponibile per i turni
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TurnDisplay; 