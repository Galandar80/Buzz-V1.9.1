import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Zap, 
  Clock, 
  RotateCcw, 
  Users, 
  Play, 
  Trophy,
  Target
} from 'lucide-react';

const GameModeDisplay: React.FC = () => {
  const { currentGameMode } = useRoom();

  if (!currentGameMode) return null;

  const getModeIcon = (type: string) => {
    switch (type) {
      case 'classic': return <Play className="w-4 h-4" />;
      case 'easy': return <Clock className="w-4 h-4" />;
      case 'expert': return <Trophy className="w-4 h-4" />;
      case 'speed': return <Zap className="w-4 h-4" />;
      case 'turnBased': return <RotateCcw className="w-4 h-4" />;
      case 'teams': return <Users className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const getModeColor = (type: string) => {
    switch (type) {
      case 'classic': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expert': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'speed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'turnBased': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'teams': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getModeRules = (mode: typeof currentGameMode) => {
    const rules = [];
    
    if (mode.settings.timeLimit) {
      rules.push(`⏱️ Tempo limite: ${mode.settings.timeLimit} secondi`);
    }
    
    if (mode.settings.autoNext) {
      rules.push('🔄 Prossima canzone automatica');
    }
    
    if (mode.settings.teamsEnabled) {
      rules.push('👥 Modalità squadre attiva');
    }
    
    if (mode.settings.pointsCorrect) {
      rules.push(`✅ Risposta corretta: +${mode.settings.pointsCorrect} punti`);
    }
    
    if (mode.settings.pointsWrong) {
      rules.push(`❌ Risposta sbagliata: -${mode.settings.pointsWrong} punti`);
    }
    
    rules.push('⭐ Risposta SUPER: +20 punti');
    
    return rules;
  };

  return (
    <Card className={`w-full border-2 backdrop-blur-sm ${getModeColor(currentGameMode.type)}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getModeColor(currentGameMode.type)}`}>
              {getModeIcon(currentGameMode.type)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Modalità: {currentGameMode.name}
              </h3>
              <p className="text-sm opacity-80">
                {currentGameMode.description}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className={`${getModeColor(currentGameMode.type)} border-current font-semibold`}
          >
            ATTIVA
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 opacity-70" />
            <span className="text-sm font-medium opacity-90">Regole di gioco:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getModeRules(currentGameMode).map((rule, index) => (
              <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                <div className="w-1 h-1 bg-current rounded-full" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {currentGameMode.type === 'speed' && (
          <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                Modalità Velocità: Rispondi velocemente per ottenere più punti!
              </span>
            </div>
          </div>
        )}

        {currentGameMode.type === 'teams' && (
          <div className="mt-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                Modalità Squadre: Collaborate con il vostro team!
              </span>
            </div>
          </div>
        )}

        {currentGameMode.type === 'turnBased' && (
          <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-400">
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">
                Modalità A Turni: Il giocatore di turno può buzzare immediatamente, gli altri dopo 15 secondi!
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameModeDisplay; 