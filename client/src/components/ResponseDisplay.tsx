
import React from 'react';
import { Heart } from 'lucide-react';
import AgentCard from '@/components/AgentCard';

interface ResponseDisplayProps {
  isSubmitted: boolean;
  isLoading: boolean;
  therapistContent: string;
  closureContent: string;
  routineContent: string;
  honestyContent: string;
}

const ResponseDisplay = ({ 
  isSubmitted, 
  isLoading, 
  therapistContent, 
  closureContent, 
  routineContent, 
  honestyContent 
}: ResponseDisplayProps) => {
  if (!isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-xl p-12 text-center space-y-4">
        <Heart className="h-16 w-16 text-muted stroke-[1.5px]" />
        <h3 className="text-xl font-medium">Share Your Story</h3>
        <p className="text-muted-foreground max-w-md">
          Tell us about your feelings and situation to get personalized support from our AI recovery team
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AgentCard 
        type="therapist"
        content={therapistContent}
        isLoading={isLoading}
      />
      <AgentCard 
        type="closure"
        content={closureContent}
        isLoading={isLoading}
      />
      <AgentCard 
        type="routine"
        content={routineContent}
        isLoading={isLoading}
      />
      <AgentCard 
        type="honesty"
        content={honestyContent}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ResponseDisplay;
