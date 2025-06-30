import React, { useState } from 'react';
import { useRoom } from '../context/RoomContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Zap, 
  Clock, 
  RotateCcw, 
  Users, 
  Play, 
  Settings,
  Timer,
  Trophy
} from 'lucide-react';

interface GameMode {
  type: 'classic' | 'speed' | 'turnBased' | 'teams' | 'easy' | 'expert';
  name: string;
  description: string;
  settings: GameModeSettings;
}

interface GameModeSettings {
  timeLimit?: number;
  autoNext?: boolean;
  teamsEnabled?: boolean;
  pointsCorrect?: number;
  pointsWrong?: number;
  buzzDelaySeconds?: number;
  oneAttemptPerSong?: boolean;
  turnBasedEnabled?: boolean;
  turnAdvantageSeconds?: number;
}

const GameModeSelector: React.FC = () => {
  const { isHost, currentGameMode, setGameMode, startGameTimer, stopGameTimer, gameTimer } = useRoom();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(currentGameMode);
  const [customTimer, setCustomTimer] = useState(20);

  if (!isHost) return null;

  const gameModes: GameMode[] = [
    {
      type: 'classic',
      name: 'Classica',
      description: 'Modalità tradizionale senza limiti di tempo',
      settings: {
        pointsCorrect: 10,
        pointsWrong: 5
      }
    },
    {
      type: 'easy',
      name: 'Facile',
      description: 'Modalità Facile: Rispondi dopo aver ascoltato il tasto buzz si attiverà dopo 10 secondi di ascolto',
      settings: {
        pointsCorrect: 10,
        pointsWrong: 5,
        buzzDelaySeconds: 10
      }
    },
    {
      type: 'expert',
      name: 'Esperto',
      description: 'Modalità Esperto: Dopo aver provato a dare la risposta per un brano non potrai più prenotarti per quel brano',
      settings: {
        pointsCorrect: 10,
        pointsWrong: 5,
        oneAttemptPerSong: true
      }
    },
    {
      type: 'speed',
      name: 'Velocità',
      description: 'Rispondi entro il tempo limite!',
      settings: {
        timeLimit: 20,
        pointsCorrect: 15,
        pointsWrong: 5
      }
    },
    {
      type: 'turnBased',
      name: 'A Turni',
      description: 'A Turni: Il giocatore di turno può buzzare immediatamente, gli altri dopo 15 secondi.',
      settings: {
        turnBasedEnabled: true,
        turnAdvantageSeconds: 15,
        pointsCorrect: 10,
        pointsWrong: 5
      }
    },
    {
      type: 'teams',
      name: 'Squadre',
      description: 'Gioca in team contro team!',
      settings: {
        teamsEnabled: true,
        pointsCorrect: 12,
        pointsWrong: 4
      }
    }
  ];

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

  const handleSetGameMode = async (mode: GameMode) => {
    await setGameMode(mode);
    setSelectedMode(mode);
  };

  const handleStartTimer = async () => {
    if (currentGameMode?.settings.timeLimit) {
      await startGameTimer(currentGameMode.settings.timeLimit);
    } else {
      await startGameTimer(customTimer);
    }
  };

  const handleStopTimer = async () => {
    await stopGameTimer();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full bg-black/40 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Settings className="w-5 h-5" />
          Modalità di Gioco
        </CardTitle>
        <CardDescription className="text-gray-300">
          Scegli come vuoi giocare questa partita
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="modes" className="text-white">Modalità</TabsTrigger>
            <TabsTrigger value="timer" className="text-white">Timer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gameModes.map((mode) => (
                <div
                  key={mode.type}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    currentGameMode?.type === mode.type
                      ? getModeColor(mode.type)
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => handleSetGameMode(mode)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getModeColor(mode.type)}`}>
                      {getModeIcon(mode.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        {mode.name}
                        {currentGameMode?.type === mode.type && (
                          <Badge variant="secondary" className="text-xs">Attiva</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{mode.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          +{mode.settings.pointsCorrect}
                        </span>
                        {mode.settings.timeLimit && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mode.settings.timeLimit}s
                          </span>
                        )}
                        {mode.settings.teamsEnabled && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Team
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timer" className="space-y-4">
            <div className="space-y-4">
              <div className="text-center">
                {gameTimer?.isActive ? (
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-red-400">
                      {formatTime(gameTimer.timeLeft || 0)}
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-100"
                        style={{
                          width: `${((gameTimer.timeLeft || 0) / (gameTimer.totalTime || 1)) * 100}%`
                        }}
                      />
                    </div>
                    <Button 
                      onClick={handleStopTimer}
                      variant="outline"
                      className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                    >
                      <Timer className="w-4 h-4 mr-2" />
                      Ferma Timer
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="timer" className="text-white">Secondi:</Label>
                      <Input
                        id="timer"
                        type="number"
                        min="5"
                        max="300"
                        value={customTimer}
                        onChange={(e) => setCustomTimer(parseInt(e.target.value) || 20)}
                        className="w-20 bg-white/10 border-white/20 text-white"
                      />
                      <Button 
                        onClick={handleStartTimer}
                        className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Avvia Timer
                      </Button>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap justify-center">
                      {[10, 15, 20, 30, 45, 60].map((seconds) => (
                        <Button
                          key={seconds}
                          variant="outline"
                          size="sm"
                          onClick={() => setCustomTimer(seconds)}
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                        >
                          {seconds}s
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GameModeSelector; 