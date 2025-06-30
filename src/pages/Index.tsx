import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JoinRoomForm from '../components/JoinRoomForm';
import CreateRoomForm from '../components/CreateRoomForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Headphones, 
  Music, 
  Users, 
  Zap, 
  Star, 
  Gamepad2,
  Volume2,
  Trophy,
  Timer,
  Sparkles
} from 'lucide-react';
import QRCodeLink from '../components/QRCodeLink';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Effetti di sfondo animati */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 animate-pulse">
                <Headphones className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-8 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-300">
                <Sparkles className="w-4 h-4 text-yellow-900 m-1" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 text-transparent bg-clip-text">
              Indovina la Canzone
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              🎵 Connettiti con amici e metti alla prova la tua conoscenza musicale! 
              Premi il buzzer più velocemente e accumula punti per vincere! 🏆
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-sm text-blue-100 font-medium">Fino a 30+ Giocatori</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <p className="text-sm text-yellow-100 font-medium">Sistema Buzz Real-time</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Trophy className="w-8 h-8 text-green-300 mx-auto mb-2" />
                <p className="text-sm text-green-100 font-medium">Classifica & Punteggi</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Timer className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <p className="text-sm text-purple-100 font-medium">Modalità di Gioco</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Form Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-scale-in">
                <div className="text-center mb-6">
                  <Gamepad2 className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Inizia a Giocare</h2>
                  <p className="text-purple-100">Unisciti o crea una stanza per iniziare!</p>
                </div>

                <Tabs defaultValue="join" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20">
                    <TabsTrigger value="join" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      🚀 Entra
                    </TabsTrigger>
                    <TabsTrigger value="create" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      ⭐ Crea
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="join" className="mt-0">
                    <JoinRoomForm />
                  </TabsContent>
                  
                  <TabsContent value="create" className="mt-0">
                    <CreateRoomForm />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-6 text-center animate-fade-in">
                <p className="text-sm text-purple-200/80">
                  💡 <strong>Suggerimento:</strong> Scannerizza il QR code per un accesso rapido da mobile!
                </p>
              </div>
            </div>

            {/* Info & QR Section */}
            <div className="order-1 lg:order-2 space-y-6">
              
              {/* QR Code Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                  <Music className="w-6 h-6 text-purple-300" />
                  Accesso Rapido
                </h3>
                <div className="flex justify-center mb-4">
                  <QRCodeLink size="large" showLabel={true} />
                </div>
                <p className="text-purple-100 text-sm">
                  Scansiona per aprire l'app sul tuo dispositivo mobile
                </p>
              </div>

              {/* Come Funziona */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  Come Funziona
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p className="text-purple-100">L'host crea una stanza e carica la musica</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p className="text-blue-100">I giocatori si uniscono con il codice stanza</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p className="text-green-100">Ascolta la musica e premi BUZZ quando conosci la risposta!</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <p className="text-yellow-100">Accumula punti e scala la classifica! 🏆</p>
                  </div>
                </div>
              </div>

              {/* Caratteristiche Premium */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-300/30 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Volume2 className="w-6 h-6 text-purple-300" />
                  Caratteristiche Pro
                </h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-purple-100">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Audio streaming WebRTC per tutti i giocatori
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Sistema di punteggio avanzato con streak bonus
                  </div>
                  <div className="flex items-center gap-2 text-green-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Modalità di gioco multiple (Velocità, Squadre, Maratona)
                  </div>
                  <div className="flex items-center gap-2 text-yellow-100">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Comandi rapidi e controllo buzz host
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
