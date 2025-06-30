
import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';
import { useRoom } from '../context/RoomContext';

const Header: React.FC = () => {
  const { roomCode } = useRoom();

  return (
    <header className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary shadow-md group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-primary">Indovina la Canzone</span>
            <span className="text-xs text-muted-foreground">Connetti e Buzz!</span>
          </div>
        </Link>
        
        {roomCode && (
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-muted-foreground">Stanza:</div>
            <div className="px-3 py-1 bg-primary/10 rounded-md border border-primary/20 text-primary font-mono font-bold">
              {roomCode}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
