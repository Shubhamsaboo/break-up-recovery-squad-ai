
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import PageHeader from '@/components/PageHeader';
import FormSidebar from '@/components/FormSidebar';
import ResponseDisplay from '@/components/ResponseDisplay';
import PageFooter from '@/components/PageFooter';

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
    if (!feelings.trim()) {
      toast.error("Please share your feelings before submitting");
      return;
    }

    setIsLoading(true)
    setIsSubmitted(true)

    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("user_input", feelings);

    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]); // optional
    }


    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      // Parsing and setting content based on status
      setTherapistContent(data.data.therapist.status === "success" ? data.data.therapist.data : "Error in therapist response");
      setClosureContent(data.data.closure.status === "success" ? data.data.closure.data : "Error in closure response");
      setRoutineContent(data.data.routine.status === "success" ? data.data.routine.data : "Error in routine response");
      setHonestyContent(data.data.honesty.status === "success" ? data.data.honesty.data : "Error in honesty response");
      setIsLoading(false)
    } else {
      toast.error("Error processing your request");
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <PageHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-1">
          <FormSidebar
            apiKey={apiKey}
            setApiKey={setApiKey}
            apiKeySubmitted={apiKeySubmitted}
            setApiKeySubmitted={setApiKeySubmitted}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="md:col-span-2">
          <ResponseDisplay
            isSubmitted={isSubmitted}
            isLoading={isLoading}
            therapistContent={therapistContent}
            closureContent={closureContent}
            routineContent={routineContent}
            honestyContent={honestyContent}
          />
        </div>
      </div>

      <PageFooter />
      <Toaster />
    </div>
  );
};

export default Index;
