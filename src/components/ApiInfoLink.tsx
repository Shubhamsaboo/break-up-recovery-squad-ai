
import React from 'react';
import { ExternalLink } from 'lucide-react';

const ApiInfoLink = () => {
  return (
    <div className="text-sm text-muted-foreground mt-4 space-y-2">
      <p>To get your API key:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li className="flex items-start">
          <span>Go to </span>
          <a 
            href="https://makersuite.google.com/app/apikey" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center ml-1 hover:underline"
          >
            Google AI Studio
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </li>
        <li className="flex items-start">
          <span>Enable the Generative Language API in your </span>
          <a 
            href="https://console.developers.google.com/apis/api/generativelanguage.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center ml-1 hover:underline"
          >
            Google Cloud Console
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ApiInfoLink;
