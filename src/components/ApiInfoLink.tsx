
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ApiInfoLink = () => {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">
        Don't have an OpenAI API key?
      </p>
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center text-xs gap-1"
        onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}
      >
        Get OpenAI API Key
        <ExternalLink className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default ApiInfoLink;
