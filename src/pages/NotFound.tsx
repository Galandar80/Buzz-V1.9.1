
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-2xl font-semibold">Pagina non trovata</h2>
          <p className="text-muted-foreground max-w-md">
            La pagina che stai cercando non esiste o è stata rimossa.
          </p>
          
          <div className="pt-6">
            <Button asChild>
              <Link to="/">Torna alla Home</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
