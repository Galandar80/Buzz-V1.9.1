
import React from 'react';
import { useRoom } from '../context/RoomContext';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RoomInfo: React.FC = () => {
  const { roomCode, isHost, playersList, handleLeaveRoom } = useRoom();
  const navigate = useNavigate();
  
  const leaveRoom = async () => {
    await handleLeaveRoom();
    navigate('/');
  };

  if (!roomCode) return null;

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl glass-morphism animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Stanza</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{roomCode}</span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-full">
              <Users className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-xs font-medium text-primary/90">{playersList.length}</span>
            </div>
          </div>
        </div>
        
        <div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={leaveRoom}
            className="flex items-center gap-1.5 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Esci
          </Button>
        </div>
      </div>
      
      <div className="text-center px-3 py-2 bg-secondary rounded-lg">
        <span className="text-sm text-secondary-foreground">
          {isHost 
            ? "Sei l'host di questa stanza. Solo tu puoi resettare il buzzer." 
            : "Premi il pulsante BUZZ quando vuoi rispondere!"}
        </span>
      </div>
    </div>
  );
};

export default RoomInfo;
