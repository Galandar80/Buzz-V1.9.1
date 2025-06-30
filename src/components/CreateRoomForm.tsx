import React, { useState } from 'react';
import { useRoom } from '../context/RoomContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Crown, Sparkles } from 'lucide-react';

const CreateRoomForm: React.FC = () => {
  const [name, setName] = useState('');
  const { handleCreateRoom, isLoading } = useRoom();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    await handleCreateRoom(name.trim());
  };
  
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center justify-center gap-2">
          Diventa Host 
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </h2>
        <p className="text-purple-100">
          Crea una nuova stanza e gestisci il gioco come host
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="host-name" className="text-sm font-medium text-purple-100">
            Il tuo nome (Host)
          </label>
          <Input
            id="host-name"
            type="text"
            placeholder="Inserisci il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="bg-white/15 border-white/30 placeholder:text-purple-200/60 text-white focus:border-purple-300 focus:ring-purple-300/50 backdrop-blur-md"
            minLength={2}
            required
          />
          <p className="text-xs text-purple-200/70">
            👑 Come host potrai controllare la musica, i punteggi e le modalità di gioco
          </p>
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || name.trim().length < 2}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creazione Stanza...
            </>
          ) : (
            <>
              <Crown className="mr-2 h-5 w-5" />
              Crea Stanza Host
            </>
          )}
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-purple-200/80">
            ✨ Una volta creata, condividi il codice stanza con i tuoi amici!
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomForm;
