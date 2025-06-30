# 🎵 BuzzV1.5 - Indovina la Canzone ✨

Un'app web multiplayer **avanzata** per giocare a "Indovina la Canzone" con amici e familiari! Perfetta per feste, eventi e divertimento di gruppo con **sistema di punteggio intelligente** e **modalità di gioco multiple**.

## ✨ Caratteristiche Principali

### 🎮 **Gameplay Multiplayer Avanzato**
- **Stanze private** con codici unici
- **Fino a 30+ giocatori** contemporaneamente
- **Sistema Buzz intelligente** con controllo host
- **Punteggio dinamico** basato su velocità e streak
- **QR Code** per condivisione facile
- **Leaderboard in tempo reale** con statistiche dettagliate

### 🏆 **Sistema Punteggio Intelligente**
- **Calcolo dinamico** basato su velocità di risposta
- **Bonus streak** per risposte consecutive corrette
- **Statistiche avanzate** per ogni giocatore
- **Classifica live** con aggiornamenti istantanei
- **Cronologia punteggi** dettagliata

### 🎯 **Modalità di Gioco Multiple**
- **🎪 Classica**: Modalità tradizionale senza limiti di tempo
- **⚡ Velocità**: Rispondi entro il tempo limite per bonus extra!
- **🏃 Marathon**: Sessioni lunghe con punteggio progressivo
- **👥 Teams**: Gioco a squadre con strategia di gruppo

### 🎵 **Audio Player Professionale**
- **Dual-channel player** (Sinistro/Destro)
- **Streaming audio WebRTC** sincronizzato per tutti
- **Controlli volume** e seek bar avanzati
- **Modalità loop** per ogni canale
- **Reset audio intelligente** per problemi di connessione
- **Ricerca brani** integrata

### 🎨 **Interfaccia Moderna Glassmorphism**
- **Design responsive** ottimizzato per ogni dispositivo
- **UI glassmorphism** con effetti di sfocatura eleganti
- **Animazioni fluide** e feedback visivo coinvolgente
- **Toast notifications** per feedback immediato
- **Tema scuro premium** con gradients dinamici

### 🎛️ **Controlli Host Avanzati**
- **Controllo Buzz** - Attiva/disattiva il pulsante buzz
- **Timer di gioco** personalizzabile per modalità
- **Gestione punteggi** con assign/subtract punti
- **Reset completo** della stanza
- **Controlli audio** esclusivi per l'host

## 🚀 Installazione e Avvio

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- Account Firebase (per database)

### 1. Clona il Repository
```bash
git clone https://github.com/Galandar80/BuzzV1.5.git
cd BuzzV1.5
```

### 2. Installa le Dipendenze
```bash
npm install
```

### 3. Configurazione Firebase
1. Crea un progetto su [Firebase Console](https://console.firebase.google.com/)
2. Abilita **Realtime Database**
3. Copia la configurazione Firebase
4. Sostituisci la configurazione in `src/services/firebase.ts`

### 4. Avvia l'App
```bash
# Sviluppo
npm run dev

# Build di produzione
npm run build

# Preview build
npm run preview
```

L'app sarà disponibile su `http://localhost:5173`

## 🎯 Come Giocare

### Per l'Host (Creatore Stanza):
1. **Crea una stanza** con il tuo nome
2. **Scegli la modalità di gioco** (Classica, Velocità, Marathon, Teams)
3. **Condividi il codice** o QR code con i giocatori
4. **Carica i file audio** nei player Sinistro/Destro
5. **Gestisci il buzz** (attiva/disattiva quando necessario)
6. **Riproduci la musica** e avvia il timer se necessario
7. **Assegna punti** automaticamente o manualmente

### Per i Giocatori:
1. **Unisciti alla stanza** con il codice
2. **Visualizza la modalità attiva** e le regole
3. **Ascolta la musica** in streaming sincronizzato
4. **Premi BUZZ** quando conosci la risposta (se abilitato)
5. **Scrivi la tua risposta** quando sei il primo a buzzare
6. **Accumula punti** e scala la classifica!
7. **Controlla le tue statistiche** in tempo reale

## 🛠️ Tecnologie Utilizzate

- **React 18** + **TypeScript**
- **Vite** con code splitting ottimizzato
- **Firebase Realtime Database** per multiplayer
- **WebRTC** per streaming audio sincronizzato
- **Tailwind CSS** per styling moderno
- **Radix UI** per componenti accessibili
- **Lucide React** per icone
- **Sonner** per toast notifications eleganti
- **ESLint** configurazione ottimizzata

## 📱 Funzionalità Avanzate

### 🏆 Sistema Punteggio Intelligente
- **Calcolo dinamico**: Velocità + Accuratezza + Streak
- **Bonus velocità**: Più rapido = più punti
- **Moltiplicatore streak**: Risposte consecutive = bonus extra
- **Penalità controllate**: System bilanciato
- **Statistiche complete**: Tempi medi, precisione, migliori streak

### 🎮 Modalità di Gioco Avanzate
- **Timer personalizzabili** per ogni modalità
- **Regole dinamiche** visualizzate in tempo reale
- **Punteggi bilanciati** per ogni modalità
- **Auto-avanzamento** opzionale

### 🔄 Reset Player Audio
Funzionalità esclusiva per l'host per risolvere problemi audio:
- Resetta completamente lo stato del player
- Riavvia le connessioni WebRTC
- Pulisce la memoria da file corrotti
- Ripristina tutti i controlli

### 🎵 Gestione Audio Intelligente
- **Fade in/out** automatico
- **Prevenzione sovrapposizioni** audio
- **Gestione memoria** ottimizzata
- **Compatibilità multi-browser**
- **Sync perfetto** tra tutti i dispositivi

### 🎛️ Controlli Buzz Dinamici
- **Attivazione/Disattivazione** istantanea da parte dell'host
- **Feedback visivo** per stato buzz (abilitato/disabilitato)
- **Styling adattivo** del pulsante buzz
- **Messaggi informativi** per i giocatori

## 🔧 Comandi Disponibili

```bash
# Sviluppo con hot reload
npm run dev

# Build di produzione ottimizzata
npm run build

# Build di sviluppo
npm run build:dev

# Controllo qualità codice (0 errori!)
npm run lint

# Preview build locale
npm run preview
```

## 🌟 Caratteristiche Tecniche

- **PWA Ready** - Installabile come app nativa
- **Responsive Design** - Perfetto su tutti i dispositivi
- **Real-time Sync** - Aggiornamenti istantanei
- **Offline Resilience** - Gestione disconnessioni intelligente
- **Performance Optimized** - Code splitting + lazy loading
- **Zero Errors** - Codice ottimizzato senza warning
- **Bundle Optimized** - Chunks separati per performance massime

## 🚀 Performance & Ottimizzazioni

### Bundle Ottimizzato
```
✅ router.js      20.35 kB │ gzip:  7.57 kB
✅ ui.js          41.48 kB │ gzip: 11.93 kB  
✅ vendor.js     141.28 kB │ gzip: 45.44 kB
✅ firebase.js   226.78 kB │ gzip: 50.78 kB
✅ main.js       363.84 kB │ gzip: 92.35 kB
```

### Qualità Codice
- **ESLint**: 0 errori, 0 warning
- **TypeScript**: Tipizzazione completa
- **React Hooks**: Ottimizzazioni complete
- **Performance**: Caricamento < 2s

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

## 🎊 Divertiti!

Perfetto per:
- 🎉 Feste e compleanni
- 👨‍👩‍👧‍👦 Serate in famiglia
- 🏢 Team building aziendali
- 🎓 Eventi scolastici
- 🍻 Serate con amici
- 🏆 Tornei e competizioni

---

**Sviluppato con ❤️ per il divertimento di tutti!**

**🌐 Live Demo**: [buzz-v1-5.vercel.app](https://buzz-v1-5.vercel.app)
**📱 GitHub**: [BuzzV1.5 Repository](https://github.com/Galandar80/BuzzV1.5.git)

Per supporto o domande, apri una [Issue](https://github.com/Galandar80/BuzzV1.5/issues) su GitHub.
