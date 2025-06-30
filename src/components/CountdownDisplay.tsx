import React from 'react';
import { useRoom } from '../context/RoomContext';

const CountdownDisplay: React.FC = () => {
  const { countdownState } = useRoom();

  if (!countdownState.isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="text-center space-y-8 animate-scale-in">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🎵 Partenza tra...
          </h2>
        </div>
        
        <div className="relative">
          <div className={`
            text-8xl md:text-9xl font-bold text-white 
            animate-pulse-buzz shadow-text
            ${countdownState.value <= 1 ? 'text-red-400' : countdownState.value <= 2 ? 'text-yellow-400' : 'text-green-400'}
          `}>
            {countdownState.value}
          </div>
          
          {/* Cerchio animato intorno al numero */}
          <div className={`
            absolute inset-0 rounded-full border-4 animate-ping
            ${countdownState.value <= 1 ? 'border-red-400' : countdownState.value <= 2 ? 'border-yellow-400' : 'border-green-400'}
          `} style={{ 
            width: '200px', 
            height: '200px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
        </div>
        
        <div className="space-y-2">
          <p className="text-white/60 text-sm">
            Preparatevi! La canzone inizierà tra pochissimo...
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
            <span>🎯</span>
            <span>Ascoltate attentamente e premete BUZZ quando sapete la risposta</span>
            <span>🎯</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownDisplay; 