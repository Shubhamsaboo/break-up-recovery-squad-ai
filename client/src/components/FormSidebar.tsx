
import React from 'react';
import ApiKeyInput from '@/components/ApiKeyInput';
import UserInputForm from '@/components/UserInputForm';
import ApiInfoLink from '@/components/ApiInfoLink';
import HelpDialog from '@/components/HelpDialog';

interface FormSidebarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  apiKeySubmitted: boolean;
  setApiKeySubmitted: (submitted: boolean) => void;
  onSubmit: (feelings: string, images: File[]) => void;
  isLoading: boolean;
}

const FormSidebar = ({
  apiKey,
  setApiKey,
  apiKeySubmitted,
  setApiKeySubmitted,
  onSubmit,
  isLoading
}: FormSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-8">
      <ApiKeyInput 
        apiKey={apiKey}
        setApiKey={setApiKey}
        apiKeySubmitted={apiKeySubmitted}
        setApiKeySubmitted={setApiKeySubmitted}
      />
      
      {!apiKeySubmitted && <ApiInfoLink />}
      
      <UserInputForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        apiKeySubmitted={apiKeySubmitted}
      />
      
      <div className="flex justify-center">
        <HelpDialog />
      </div>
    </div>
  );
};

export default FormSidebar;
