
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, MessageSquarePlus, Calendar, AlertCircle } from "lucide-react";
import { cn } from '@/lib/utils';

interface AgentCardProps {
  type: 'therapist' | 'closure' | 'routine' | 'honesty';
  content: string;
  isLoading: boolean;
}

const AgentCard = ({ type, content, isLoading }: AgentCardProps) => {
  const getAgentInfo = () => {
    switch (type) {
      case 'therapist':
        return {
          title: 'Emotional Support',
          description: 'Empathetic validation and comfort',
          icon: Heart,
          cardClass: 'agent-card-empathy',
          iconClass: 'text-empathy-dark',
        };
      case 'closure':
        return {
          title: 'Finding Closure',
          description: 'Express unspoken emotions',
          icon: MessageSquarePlus,
          cardClass: 'agent-card-heartbreak',
          iconClass: 'text-heartbreak-dark',
        };
      case 'routine':
        return {
          title: 'Your Recovery Plan',
          description: '7-day recovery challenge',
          icon: Calendar,
          cardClass: 'agent-card-healing',
          iconClass: 'text-healing-dark',
        };
      case 'honesty':
        return {
          title: 'Honest Perspective',
          description: 'Candid insights for growth',
          icon: AlertCircle,
          cardClass: 'agent-card-growth',
          iconClass: 'text-growth-dark',
        };
      default:
        return {
          title: 'Agent',
          description: 'AI Assistant',
          icon: Heart,
          cardClass: '',
          iconClass: '',
        };
    }
  };

  const info = getAgentInfo();
  const Icon = info.icon;

  return (
    <Card className={cn("agent-card animate-fade-in-up", info.cardClass)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-full bg-white shadow-sm", info.iconClass)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{info.title}</CardTitle>
            <CardDescription>{info.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none">
        {isLoading ? (
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </CardContent>
    </Card>
  );
};

export default AgentCard;
