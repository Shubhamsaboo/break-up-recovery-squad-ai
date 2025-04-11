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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  getTherapistResponse, 
  getClosureResponse, 
  getRoutineResponse, 
  getHonestyResponse 
} from '@/utils/geminiApi';

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
      // Make parallel API calls to get all responses faster
      const therapistPromise = getTherapistResponse(apiKey, feelings)
        .then(response => setTherapistContent(response))
        .catch(error => {
          console.error("Error getting therapist response:", error);
          toast.error("Failed to get emotional support response");
          setTherapistContent("**Error loading content**\n\nWe couldn't generate this response. Please check your API key or try again later.");
        });
      
      const closurePromise = getClosureResponse(apiKey, feelings)
        .then(response => setClosureContent(response))
        .catch(error => {
          console.error("Error getting closure response:", error);
          toast.error("Failed to get closure response");
          setClosureContent("**Error loading content**\n\nWe couldn't generate this response. Please check your API key or try again later.");
        });
      
      const routinePromise = getRoutineResponse(apiKey, feelings)
        .then(response => setRoutineContent(response))
        .catch(error => {
          console.error("Error getting routine response:", error);
          toast.error("Failed to get recovery plan");
          setRoutineContent("**Error loading content**\n\nWe couldn't generate this response. Please check your API key or try again later.");
        });
      
      const honestyPromise = getHonestyResponse(apiKey, feelings)
        .then(response => setHonestyContent(response))
        .catch(error => {
          console.error("Error getting honesty response:", error);
          toast.error("Failed to get honest perspective");
          setHonestyContent("**Error loading content**\n\nWe couldn't generate this response. Please check your API key or try again later.");
        });
      
      // Wait for all promises to resolve
      await Promise.all([therapistPromise, closurePromise, routinePromise, honestyPromise]);
    } catch (error) {
      console.error("Error processing responses:", error);
      toast.error("Something went wrong. Please check your API key and try again.");
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
                      The Breakup Recovery Squad uses advanced AI to provide you with a comprehensive recovery approach through four specialized agents:
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
                      Your data is private and processed securely through your own API key.
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
