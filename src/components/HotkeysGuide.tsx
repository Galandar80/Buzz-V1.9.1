import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Keyboard, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Star, 
  X, 
  VolumeX, 
  Volume2, 
  Pause,
  Eye,
  EyeOff
} from 'lucide-react';

export const HotkeysGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const hotkeys = [
    {
      key: 'B',
      action: 'Attiva/Disattiva Buzz',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      description: 'Controlla l\'abilitazione del pulsante buzz'
    },
    {
      key: 'Q',
      action: 'Risposta Corretta',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      description: 'Assegna punti per risposta corretta'
    },
    {
      key: 'W',
      action: 'Risposta Sbagliata',
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      description: 'Sottrae punti per risposta sbagliata'
    },
    {
      key: 'E',
      action: 'Risposta SUPER',
      icon: <Star className="w-4 h-4 text-yellow-500" />,
      description: 'Assegna punti bonus per risposta eccellente'
    },
    {
      key: 'R',
      action: 'Rifiuta Risposta',
      icon: <X className="w-4 h-4 text-gray-500" />,
      description: 'Rifiuta la risposta senza assegnare punti'
    },
    {
      key: '↑',
      action: 'Volume Su',
      icon: <Volume2 className="w-4 h-4 text-blue-500" />,
      description: 'Aumenta il volume audio (+10%)'
    },
    {
      key: '↓',
      action: 'Volume Giù',
      icon: <VolumeX className="w-4 h-4 text-blue-500" />,
      description: 'Diminuisce il volume audio (-10%)'
    },
    {
      key: 'SPAZIO',
      action: 'Pausa Audio',
      icon: <Pause className="w-4 h-4 text-purple-500" />,
      description: 'Mette in pausa l\'audio in riproduzione'
    }
  ];

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-20 right-4 z-40 bg-white/90 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        Comandi Rapidi
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-primary" />
            Comandi Rapidi da Tastiera
          </CardTitle>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            <p className="font-medium text-foreground mb-2">💡 Come usare i comandi rapidi:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>I comandi funzionano solo per l'host della stanza</li>
              <li>Non funzionano quando stai scrivendo in un campo di testo</li>
              <li>Riceverai una notifica visiva per ogni comando eseguito</li>
            </ul>
          </div>

          <div className="grid gap-3">
            {hotkeys.map((hotkey, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border-2 border-muted-foreground/20 shadow-sm">
                    <span className="font-bold text-sm text-foreground">
                      {hotkey.key}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {hotkey.icon}
                    <div>
                      <div className="font-medium text-foreground">
                        {hotkey.action}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {hotkey.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                <Keyboard className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Suggerimento Pro:
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  Usa i comandi rapidi per gestire il gioco senza dover usare il mouse. 
                  Perfetto durante le sessioni di gioco intense!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsVisible(false)} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Ho capito
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotkeysGuide; 