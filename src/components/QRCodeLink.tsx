import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeLinkProps {
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const QRCodeLink: React.FC<QRCodeLinkProps> = ({ 
  size = 'small', 
  showLabel = true 
}) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`bg-white p-2 rounded-lg shadow-md ${
          size === 'large' ? 'w-60 h-60' : 
          size === 'medium' ? 'w-32 h-32' : 
          'w-20 h-20'
        }`}
      >
        <img 
          src="/images/qr-code.png" 
          alt="QR Code per Indovina la Canzone" 
          className="w-full h-full object-contain"
        />
      </div>
      {showLabel && (
        <span className={`mt-1 font-medium text-center ${
          size === 'large' ? 'text-lg' : 
          size === 'medium' ? 'text-sm' : 
          'text-xs'
        }`}>
          SCAN ME
        </span>
      )}
    </div>
  );
};

export default QRCodeLink;
