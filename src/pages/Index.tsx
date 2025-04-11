
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

const Index = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [therapistContent, setTherapistContent] = useState('');
  const [closureContent, setClosureContent] = useState('');
  const [routineContent, setRoutineContent] = useState('');
  const [honestyContent, setHonestyContent] = useState('');
  
  const handleSubmit = (feelings: string, images: File[]) => {
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
    
    // Simulate API calls with timeouts for demo purposes
    // In a real app, these would be actual API calls to your Python backend
    
    setTimeout(() => {
      setTherapistContent(`
## I hear you and I'm here for you

I can see you're going through a really tough time right now. Breakups can shake us to our core, and those feelings of heartache and confusion are completely valid. Many of us have been exactly where you are - wondering what went wrong and how to move forward.

Remember that healing isn't linear, and it's okay to have good days and bad days. What you're experiencing - the hurt, the questions, maybe even some anger - is all part of the process.

When I went through my significant breakup, I found that allowing myself to feel everything without judgment helped tremendously. Don't rush yourself or set timelines for when you "should" be over this.

You have incredible strength within you, even if it doesn't feel like it right now. Each day that passes is building your resilience, and you'll eventually find yourself smiling again without it feeling forced.
      `);
    }, 2000);
    
    setTimeout(() => {
      setClosureContent(`
## Unsent Letter Template

### Dear [Their Name],

There's so much I never got to say to you, and maybe it's better this way. Our relationship changed me in ways I'm still discovering. I want you to know that despite how things ended, you taught me about my capacity to love and what I truly need in a partner.

Some days I'm angry about how things unfolded, other days I'm grateful for the time we shared. What I know for certain is that I deserve someone who chooses me completely, and you deserve to find whatever it is you're looking for.

I'm learning to release the expectations I had for us and the future I imagined. This letter isn't for you - it's for me to say goodbye to those dreams and make space for new ones.

I wish you well on your journey, as I begin mine.

### Closure Ritual
Tonight, read this letter aloud, then safely burn it or tear it up. As you watch it disappear, visualize releasing your attachment to the relationship.
      `);
    }, 3500);
    
    setTimeout(() => {
      setRoutineContent(`
## Your 7-Day Recovery Plan

### Day 1: Emotional Release
- **Morning**: 10-minute journaling about your feelings
- **Afternoon**: Go for a walk in nature without your phone
- **Evening**: Create a "feelings playlist" and let yourself cry if needed

### Day 2: Physical Reset
- **Morning**: 15-minute gentle yoga or stretching
- **Afternoon**: Prepare a nourishing meal for yourself
- **Evening**: Take a long shower or bath with calming scents

### Day 3: Social Connection
- **Morning**: Text a friend you trust about how you're feeling
- **Afternoon**: Meet that friend for coffee or a walk
- **Evening**: Join an online community related to a hobby you enjoy

### Day 4: Nostalgia Detox
- **Morning**: Move photos of your ex to a hidden folder (don't delete yet)
- **Afternoon**: Rearrange your living space or bedroom
- **Evening**: Write a list of lessons learned from the relationship

### Day 5: Joy Seeking
- **Morning**: Listen to upbeat music while getting ready
- **Afternoon**: Try something new that you've been curious about
- **Evening**: Watch a comedy or feel-good movie

### Day 6: Self-Discovery
- **Morning**: List 10 qualities you love about yourself
- **Afternoon**: Research a new skill you'd like to learn
- **Evening**: Create a vision board for your future

### Day 7: Forward Motion
- **Morning**: Set 3 small goals for the upcoming week
- **Afternoon**: Plan a solo date doing something you love
- **Evening**: Write a letter to your future self about the person you're becoming

### Recommended Playlist:
1. "Good as Hell" - Lizzo
2. "Rise Up" - Andra Day
3. "Better in Time" - Leona Lewis
4. "Survivor" - Destiny's Child
5. "thank u, next" - Ariana Grande
      `);
    }, 4500);
    
    setTimeout(() => {
      setHonestyContent(`
## The Unfiltered Truth

Let's be completely honest about your situation. Relationships end for real reasons, not mysterious ones. Based on what you've shared, here are some hard truths:

### Reality Check
1. **The relationship ended because it needed to end.** Something fundamental wasn't working, whether it was compatibility, timing, or effort levels.

2. **You're idealizing what you had.** Your mind is likely focusing on the good moments while minimizing the problems that existed.

3. **You cannot control their decisions.** No amount of analyzing, pleading, or changing yourself would have made them stay if they weren't fully committed.

4. **Moving on is a choice.** Continuing to dwell in pain is comfortable because it keeps you connected to them, but it's preventing your healing.

### Why You Need To Move Forward
This breakup is creating space for something better aligned with who you are and what you deserve. The longer you resist accepting the end of this relationship, the longer you delay your own happiness.

### Action Steps
1. Implement a strict no-contact policy for at least 30 days
2. Delete or archive your text history
3. When you catch yourself romanticizing the relationship, write down three problems that existed
4. Actively pursue one new interest that has nothing to do with your past relationship

Remember: This pain is temporary. What feels unbearable now will eventually become just a chapter in your story.
      `);
      setIsLoading(false);
    }, 5500);
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
