import React, { useState, useRef, useEffect } from 'react';
import { useRoom } from '../context/RoomContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Users, Play } from 'lucide-react';

const JoinRoomForm: React.FC = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { handleJoinRoom, isLoading, error } = useRoom();
  
  // Inizializza i riferimenti
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);
  
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Sposta il focus al campo successivo se è stato inserito un numero
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Se backspace e campo vuoto, torna al precedente
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) return;
    
    const roomCode = code.join('');
    if (roomCode.length !== 4) return;
    
    await handleJoinRoom(roomCode, name.trim());
  };
  
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center justify-center gap-2">
          Unisciti al Gioco
          <Play className="w-5 h-5 text-green-300" />
        </h2>
        <p className="text-purple-100">
          Inserisci il codice di 4 cifre per entrare nella stanza
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="player-name" className="text-sm font-medium text-purple-100">
            Il tuo nome
          </label>
          <Input
            id="player-name"
            type="text"
            placeholder="Inserisci il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="bg-white/15 border-white/30 placeholder:text-purple-200/60 text-white focus:border-blue-300 focus:ring-blue-300/50 backdrop-blur-md"
            minLength={2}
            required
          />
          <p className="text-xs text-purple-200/70">
            🎵 Entra come giocatore e sfida i tuoi amici!
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-100">
            Codice stanza
          </label>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-14 h-16 text-2xl font-bold text-center bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/30 focus:border-blue-400/50 text-white placeholder:text-purple-200/60"
                required
              />
            ))}
          </div>
          <p className="text-xs text-center text-purple-200/70 mt-2">
            💡 Chiedi all'host il codice di 4 cifre
          </p>
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
              <p className="text-sm text-red-200 text-center">{error}</p>
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || name.trim().length < 2 || code.some(digit => digit === '')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Entrando nella stanza...
            </>
          ) : (
            <>
              <Users className="mr-2 h-5 w-5" />
              Entra nella Stanza
            </>
          )}
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-purple-200/80">
            🎯 Una volta dentro, ascolta la musica e premi BUZZ per rispondere!
          </p>
        </div>
      </form>
    </div>
  );
};

export default JoinRoomForm;
