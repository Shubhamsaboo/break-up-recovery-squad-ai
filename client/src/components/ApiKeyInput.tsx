
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, CheckCircle2 } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  apiKeySubmitted: boolean;
  setApiKeySubmitted: (submitted: boolean) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey, apiKeySubmitted, setApiKeySubmitted }: ApiKeyInputProps) => {
  const [inputValue, setInputValue] = useState(apiKey);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputValue);
    setApiKeySubmitted(true);
  };

  const handleReset = () => {
    setApiKey('');
    setInputValue('');
    setApiKeySubmitted(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Gemini API Key
        </CardTitle>
        <CardDescription>
          Enter your Gemini API key to access the recovery agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={apiKeySubmitted}
              className="flex-1"
            />
            {!apiKeySubmitted ? (
              <Button type="submit" disabled={!inputValue}>Submit</Button>
            ) : (
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            )}
          </div>
        </form>
      </CardContent>
      {apiKeySubmitted && (
        <CardFooter className="flex justify-center text-sm text-green-600 font-medium">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>API Key connected successfully</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ApiKeyInput;
