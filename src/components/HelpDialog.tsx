
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HelpDialog = () => {
  return (
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
  );
};

export default HelpDialog;
