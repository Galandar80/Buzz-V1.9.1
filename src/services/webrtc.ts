import { database, ref, update } from './firebase';
import { onValue } from 'firebase/database';

export class AudioStreamManager {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private roomCode: string;
  private isHost: boolean;
  private audioElement: HTMLAudioElement | null = null;

  constructor(roomCode: string, isHost: boolean) {
    this.roomCode = roomCode;
    this.isHost = isHost;
  }

  async initialize() {
    if (this.isHost) {
      await this.initializeAsHost();
    } else {
      await this.initializeAsClient();
    }
  }

  private async initializeAsHost() {
    try {
      // Crea una connessione peer
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      // Crea un MediaStream per catturare l'audio del sistema
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // Aggiungi il track audio alla connessione peer
      this.localStream.getTracks().forEach(track => {
        if (this.peerConnection) {
          this.peerConnection.addTrack(track, this.localStream!);
        }
      });

      // Crea e invia l'offerta
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Salva l'offerta nel database
      await update(ref(database, `rooms/${this.roomCode}/webrtc`), {
        offer: offer
      });

      // Ascolta le risposte
      onValue(ref(database, `rooms/${this.roomCode}/webrtc/answer`), async (snapshot) => {
        const answer = snapshot.val();
        if (answer && this.peerConnection) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      // Gestisci i candidati ICE
      this.peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          await update(ref(database, `rooms/${this.roomCode}/webrtc/hostCandidate`), {
            candidate: event.candidate
          });
        }
      };

    } catch (error) {
      console.error('Errore durante l\'inizializzazione come host:', error);
      throw error;
    }
  }

  private async initializeAsClient() {
    try {
      // Crea una connessione peer
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      // Ascolta l'offerta
      onValue(ref(database, `rooms/${this.roomCode}/webrtc/offer`), async (snapshot) => {
        const offer = snapshot.val();
        if (offer && this.peerConnection) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          
          // Crea e invia la risposta
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          
          await update(ref(database, `rooms/${this.roomCode}/webrtc`), {
            answer: answer
          });
        }
      });

      // Gestisci i candidati ICE
      this.peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          await update(ref(database, `rooms/${this.roomCode}/webrtc/clientCandidate`), {
            candidate: event.candidate
          });
        }
      };

      // Ascolta i candidati ICE dell'host
      onValue(ref(database, `rooms/${this.roomCode}/webrtc/hostCandidate`), async (snapshot) => {
        const candidate = snapshot.val()?.candidate;
        if (candidate && this.peerConnection) {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      // Gestisci lo stream remoto
      this.peerConnection.ontrack = (event) => {
        const remoteAudio = document.getElementById('remote-audio') as HTMLAudioElement;
        if (remoteAudio) {
          remoteAudio.srcObject = event.streams[0];
          remoteAudio.play().catch(console.error);
        }
      };

    } catch (error) {
      console.error('Errore durante l\'inizializzazione come client:', error);
      throw error;
    }
  }

  stop() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }

  setAudioStream(stream: MediaStream) {
    if (this.peerConnection && this.isHost) {
      // Rimuovi i track esistenti
      this.peerConnection.getSenders().forEach(sender => {
        this.peerConnection?.removeTrack(sender);
      });

      // Aggiungi i nuovi track
      stream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, stream);
      });
    }
  }
} 