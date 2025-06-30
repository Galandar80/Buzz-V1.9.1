
import React from 'react';
import QRCodeLink from './QRCodeLink';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-white/20 bg-white/5 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} Indovina la Canzone. Tutti i diritti riservati.
        </div>
        
        <div className="hidden md:block">
          <QRCodeLink size="large" />
        </div>
        
        <div className="text-sm text-muted-foreground">
          Creato con passione da <span className="font-medium text-primary">Dario Germanà</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
