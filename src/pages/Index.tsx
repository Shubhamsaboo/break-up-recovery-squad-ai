
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Heart, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ApiKeyInput from '@/components/ApiKeyInput';
import UserInputForm from '@/components/UserInputForm';
import AgentCard from '@/components/AgentCard';
import ApiInfoLink from '@/components/ApiInfoLink';
import { callOpenAI, agentPrompts } from '@/services/openaiApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [therapistContent, setTherapistContent] = useState('');
  const [closureContent, setClosureContent] = useState('');
  const [routineContent, setRoutineContent] = useState('');
  const [honestyContent, setHonestyContent] = useState('');
  
  const handleSubmit = async (feelings: string, images: File[]) => {
    if (!apiKeySubmitted) {
      toast.error("Please submit your API key first");
      return;
    }
    
    if (!feelings.trim()) {
      toast.error("Please share your feelings before submitting");
      return;
    }
    
    setIsLoading(true);
    setIsSubmitted(true);
    
    try {
      const [therapistResponse, closureResponse, routineResponse, honestyResponse] = await Promise.allSettled([
        callOpenAI(apiKey, feelings, agentPrompts.therapist, images),
        callOpenAI(apiKey, feelings, agentPrompts.closure, images),
        callOpenAI(apiKey, feelings, agentPrompts.routine, images),
        callOpenAI(apiKey, feelings, agentPrompts.honesty, images)
      ]);
      
      if (therapistResponse.status === 'fulfilled' && therapistResponse.value) {
        setTherapistContent(therapistResponse.value);
      } else {
        setTherapistContent("I apologize, but I couldn't generate a therapeutic response at this time. Please try again later.");
      }
      
      if (closureResponse.status === 'fulfilled' && closureResponse.value) {
        setClosureContent(closureResponse.value);
      } else {
        setClosureContent("I apologize, but I couldn't generate a closure exercise at this time. Please try again later.");
      }
      
      if (routineResponse.status === 'fulfilled' && routineResponse.value) {
        setRoutineContent(routineResponse.value);
      } else {
        setRoutineContent("I apologize, but I couldn't generate a recovery routine at this time. Please try again later.");
      }
      
      if (honestyResponse.status === 'fulfilled' && honestyResponse.value) {
        setHonestyContent(honestyResponse.value);
      } else {
        setHonestyContent("I apologize, but I couldn't generate honest feedback at this time. Please try again later.");
      }
    } catch (error) {
      toast.error("Error processing your request. Please check your API key and try again.");
      console.error("Error fetching responses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-8 w-8 text-heartbreak animate-heart-beat" />
          <h1 className="text-4xl font-bold">Breakup Recovery Squad</h1>
        </div>
        <p className="text-lg text-center max-w-xl text-muted-foreground">
          Your AI-powered team of specialists to help you heal, find closure, and move forward after a breakup
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-1">
          <div className="space-y-6 sticky top-8">
            <ApiKeyInput 
              apiKey={apiKey}
              setApiKey={setApiKey}
              apiKeySubmitted={apiKeySubmitted}
              setApiKeySubmitted={setApiKeySubmitted}
            />
            
            {!apiKeySubmitted && <ApiInfoLink />}
            
            <UserInputForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              apiKeySubmitted={apiKeySubmitted}
            />
            
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                    <HelpCircle className="h-4 w-4" />
                    How does this work?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How the Breakup Recovery Squad Works</DialogTitle>
                    <DialogDescription>
                      Your personal AI support team to help you navigate through heartbreak
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm">
                      The Breakup Recovery Squad uses OpenAI's GPT-4o model to provide you with a comprehensive recovery approach through four specialized agents:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      <li><span className="font-medium text-empathy">Therapist Agent</span>: Provides empathetic emotional support and validation</li>
                      <li><span className="font-medium text-heartbreak">Closure Agent</span>: Helps you express unsent feelings for emotional release</li>
                      <li><span className="font-medium text-healing">Routine Planner</span>: Creates a customized 7-day recovery plan</li>
                      <li><span className="font-medium text-growth">Brutal Honesty Agent</span>: Offers direct, objective feedback for growth</li>
                    </ul>
                    <p className="text-sm">
                      Simply share your feelings, upload any relevant chat screenshots if you wish, and our AI agents will analyze your situation to provide personalized guidance.
                    </p>
                    <p className="text-sm font-medium">
                      Your data is private and processed securely through your own OpenAI API key.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {!isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-xl p-12 text-center space-y-4">
              <Heart className="h-16 w-16 text-muted stroke-[1.5px]" />
              <h3 className="text-xl font-medium">Share Your Story</h3>
              <p className="text-muted-foreground max-w-md">
                Tell us about your feelings and situation to get personalized support from our AI recovery team
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>Made with ❤️ by the Breakup Recovery Squad</p>
        <p className="mt-1">Share your recovery journey with #BreakupRecoverySquad</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Index;
