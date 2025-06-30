import React, { useState } from 'react';
import { toast } from 'sonner';
import { ref, get, set } from 'firebase/database';
import { database } from '../services/firebase';

interface RoomInfo {
  roomCode: string;
  hostName: string;
  playerCount: number;
  createdAt: number;
}

// Interfaccia per i dati delle stanze da Firebase
interface FirebaseRoomData {
  hostName?: string;
  players?: Record<string, unknown>;
  createdAt?: number;
  [key: string]: unknown;
}

// Interfaccia per gli errori Firebase
interface FirebaseError extends Error {
  code?: string;
  message: string;
}

const AdminPanel: React.FC = () => {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleListRooms = async () => {
    setIsLoading(true);
    try {
      console.log('🔍 Recupero lista stanze...');
      console.log('Database URL:', database.app.options.databaseURL);
      
      // Accesso diretto al database Firebase con gestione errori avanzata
      const roomsRef = ref(database, 'rooms');
      console.log('Ref creato:', roomsRef.toString());
      
      const snapshot = await get(roomsRef);
      console.log('Snapshot ottenuto:', snapshot.exists());
      
      if (snapshot.exists()) {
        const roomsData = snapshot.val();
        console.log('Dati ricevuti:', roomsData);
        
        const roomList = Object.entries(roomsData).map(([roomCode, roomData]: [string, FirebaseRoomData]) => ({
          roomCode,
          hostName: roomData.hostName || 'Host sconosciuto',
          playerCount: roomData.players ? Object.keys(roomData.players).length : 0,
          createdAt: roomData.createdAt || 0
        }));
        
        console.log(`📋 Trovate ${roomList.length} stanze attive`);
        setRooms(roomList);
        toast.success(`Trovate ${roomList.length} stanze attive`);
      } else {
        console.log('📭 Nessuna stanza trovata nel database');
        setRooms([]);
        toast.info('Nessuna stanza trovata');
      }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error('❌ Errore nel recuperare le stanze:', firebaseError);
      console.error('Error code:', firebaseError.code);
      console.error('Error message:', firebaseError.message);
      
      // Se c'è un errore di permessi, prova con dati mock per debug
      if (firebaseError.code === 'PERMISSION_DENIED') {
        console.log('🔧 Errore di permessi - usando dati di test per debug');
        toast.error('Errore di permessi Firebase - usando dati di test');
        
        // Mock data per il debug
        const mockRooms: RoomInfo[] = [
          {
            roomCode: 'TEST',
            hostName: 'Test Host',
            playerCount: 0,
            createdAt: Date.now()
          }
        ];
        setRooms(mockRooms);
      } else {
        toast.error(`Errore nel recuperare le stanze: ${firebaseError.message}`);
        setRooms([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllRooms = async () => {
    if (!window.confirm('Sei sicuro di voler eliminare TUTTE le stanze attive? Questa azione non può essere annullata.')) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('🗑️ Eliminazione di tutte le stanze...');
      
      // Prima ottieni la lista delle stanze per conferma
      const roomsRef = ref(database, 'rooms');
      const snapshot = await get(roomsRef);
      
      if (snapshot.exists()) {
        const roomsData = snapshot.val();
        const roomCodes = Object.keys(roomsData);
        console.log(`Eliminando ${roomCodes.length} stanze:`, roomCodes);
        
        // Elimina tutte le stanze
        await set(roomsRef, null);
        
        console.log('✅ Tutte le stanze eliminate con successo');
        setRooms([]);
        toast.success(`Eliminate con successo ${roomCodes.length} stanze!`);
      } else {
        console.log('📭 Nessuna stanza da eliminare');
        toast.info('Nessuna stanza da eliminare');
      }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error('❌ Errore nell\'eliminare le stanze:', firebaseError);
      if (firebaseError.code === 'PERMISSION_DENIED') {
        toast.error('Errore di permessi: non puoi eliminare le stanze');
      } else {
        toast.error(`Errore nell'eliminare le stanze: ${firebaseError.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSingleRoom = async (roomCode: string) => {
    if (!window.confirm(`Sei sicuro di voler eliminare la stanza ${roomCode}?`)) {
      return;
    }

    try {
      console.log(`🗑️ Eliminazione stanza ${roomCode}...`);
      
      const roomRef = ref(database, `rooms/${roomCode}`);
      await set(roomRef, null);
      
      // Rimuovi dalla lista locale
      setRooms(prev => prev.filter(room => room.roomCode !== roomCode));
      
      console.log(`✅ Stanza ${roomCode} eliminata con successo`);
      toast.success(`Stanza ${roomCode} eliminata con successo!`);
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error(`❌ Errore nell'eliminare la stanza ${roomCode}:`, firebaseError);
      if (firebaseError.code === 'PERMISSION_DENIED') {
        toast.error(`Errore di permessi: non puoi eliminare la stanza ${roomCode}`);
      } else {
        toast.error(`Errore nell'eliminare la stanza ${roomCode}: ${firebaseError.message}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">🔧 Pannello Amministrazione</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleListRooms}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors border border-blue-500/30 disabled:opacity-50"
        >
          📋 Lista Stanze Attive
        </button>
        
        <button
          onClick={handleDeleteAllRooms}
          disabled={isLoading || rooms.length === 0}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30 disabled:opacity-50"
        >
          🗑️ Elimina Tutte le Stanze
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="text-white">Caricamento...</div>
        </div>
      )}

      {rooms.length > 0 && (
        <div className="bg-white/5 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold text-white p-4 bg-white/10">
            📋 Stanze Attive ({rooms.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-3 text-left text-white">Codice Stanza</th>
                  <th className="p-3 text-left text-white">Host</th>
                  <th className="p-3 text-left text-white">Giocatori</th>
                  <th className="p-3 text-left text-white">Creata</th>
                  <th className="p-3 text-left text-white">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={room.roomCode} className={index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                    <td className="p-3 text-white font-mono">{room.roomCode}</td>
                    <td className="p-3 text-white">{room.hostName}</td>
                    <td className="p-3 text-white">{room.playerCount}</td>
                    <td className="p-3 text-white text-sm">
                      {new Date(room.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteSingleRoom(room.roomCode)}
                        className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors border border-red-500/30"
                      >
                        🗑️ Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rooms.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-400">
          📭 Nessuna stanza trovata. Clicca "Lista Stanze Attive" per aggiornare.
        </div>
      )}

      {/* Debug Info Avanzato */}
      <div className="mt-6 p-4 bg-gray-800/20 rounded-lg">
        <h4 className="text-white font-semibold mb-2">🔧 Debug Info</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p className="text-gray-300">
            <strong>Database URL:</strong> {database.app.options.databaseURL}
          </p>
          <p className="text-gray-300">
            <strong>Project ID:</strong> {database.app.options.projectId}
          </p>
          <p className="text-gray-300">
            <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleString()}
          </p>
          <p className="text-gray-300">
            <strong>Stanze caricate:</strong> {rooms.length}
          </p>
        </div>
        
        {/* Test di connessione */}
        <div className="mt-4">
          <button
            onClick={async () => {
              try {
                console.log('🔧 Test connessione Firebase...');
                const testRef = ref(database, '.info/connected');
                const snapshot = await get(testRef);
                const connected = snapshot.val();
                console.log('Connessione Firebase:', connected);
                toast.info(`Connessione Firebase: ${connected ? 'Attiva' : 'Non attiva'}`);
              } catch (error) {
                console.error('Errore test connessione:', error);
                toast.error('Errore nel test di connessione');
              }
            }}
            className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded text-sm transition-colors border border-yellow-500/30"
          >
            🔧 Test Connessione
          </button>
        </div>

        <span className="text-gray-600 dark:text-gray-400">
          L'host può resettare buzz, assegnare punti e controllare il game
        </span>
      </div>
    </div>
  );
};

export default AdminPanel; 