
import React from 'react';
import { Heart } from 'lucide-react';

const PageHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="h-8 w-8 text-heartbreak animate-heart-beat" />
        <h1 className="text-4xl font-bold">Breakup Recovery Squad</h1>
      </div>
      <p className="text-lg text-center max-w-xl text-muted-foreground">
        Your AI-powered team of specialists to help you heal, find closure, and move forward after a breakup
      </p>
    </div>
  );
};

export default PageHeader;
