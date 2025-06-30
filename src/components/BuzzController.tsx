import React from 'react';
import { useRoom } from '../context/RoomContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Power,
  PowerOff,
  Settings,
  Users,
  Zap
} from 'lucide-react';

const BuzzController: React.FC = () => {
  const { isHost, isBuzzEnabled, enableBuzz, disableBuzz, playersList } = useRoom();

  if (!isHost) return null;

  const activePlayers = playersList.filter(player => !player.isHost);

  return (
    <Card className="w-full backdrop-blur-sm border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Controllo Buzz</CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestisci quando i giocatori possono premere il buzz
              </p>
            </div>
          </div>
          
          <Badge 
            variant={isBuzzEnabled ? "default" : "secondary"}
            className={`flex items-center gap-1 ${
              isBuzzEnabled 
                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}
          >
            {isBuzzEnabled ? (
              <>
                <Zap className="w-3 h-3" />
                ATTIVO
              </>
            ) : (
              <>
                <PowerOff className="w-3 h-3" />
                DISATTIVO
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="w-4 h-4" />
          <span>{activePlayers.length} giocatori in attesa</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={enableBuzz}
            disabled={isBuzzEnabled}
            className={`flex items-center gap-2 transition-all ${
              isBuzzEnabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
            }`}
            size="lg"
          >
            <Power className="w-4 h-4" />
            Attiva Buzz
          </Button>

          <Button
            onClick={disableBuzz}
            disabled={!isBuzzEnabled}
            variant="destructive"
            className={`flex items-center gap-2 transition-all ${
              !isBuzzEnabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
            size="lg"
          >
            <PowerOff className="w-4 h-4" />
            Disattiva Buzz
          </Button>
        </div>

        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>💡 <strong>Suggerimento:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Disattiva il buzz mentre prepari la prossima canzone</li>
              <li>Attivalo quando sei pronto per le risposte</li>
              <li>I giocatori vedranno lo stato del buzz in tempo reale</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuzzController; 