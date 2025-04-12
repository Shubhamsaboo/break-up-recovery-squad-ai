
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { callOpenAI, agentPrompts } from '@/services/openaiApi';
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
    // if (!apiKeySubmitted) {
    //   toast.error("Please submit your API key first");
    //   return;
    // }

    // if (!feelings.trim()) {
    //   toast.error("Please share your feelings before submitting");
    //   return;
    // }

    // setIsLoading(true);
    // setIsSubmitted(true);

    // try {
    //   const [therapistResponse, closureResponse, routineResponse, honestyResponse] = await Promise.allSettled([
    //     callOpenAI(apiKey, feelings, agentPrompts.therapist, images),
    //     callOpenAI(apiKey, feelings, agentPrompts.closure, images),
    //     callOpenAI(apiKey, feelings, agentPrompts.routine, images),
    //     callOpenAI(apiKey, feelings, agentPrompts.honesty, images)
    //   ]);

    //   if (therapistResponse.status === 'fulfilled' && therapistResponse.value) {
    //     setTherapistContent(therapistResponse.value);
    //   } else {
    //     setTherapistContent("I apologize, but I couldn't generate a therapeutic response at this time. Please try again later.");
    //   }

    //   if (closureResponse.status === 'fulfilled' && closureResponse.value) {
    //     setClosureContent(closureResponse.value);
    //   } else {
    //     setClosureContent("I apologize, but I couldn't generate a closure exercise at this time. Please try again later.");
    //   }

    //   if (routineResponse.status === 'fulfilled' && routineResponse.value) {
    //     setRoutineContent(routineResponse.value);
    //   } else {
    //     setRoutineContent("I apologize, but I couldn't generate a recovery routine at this time. Please try again later.");
    //   }

    //   if (honestyResponse.status === 'fulfilled' && honestyResponse.value) {
    //     setHonestyContent(honestyResponse.value);
    //   } else {
    //     setHonestyContent("I apologize, but I couldn't generate honest feedback at this time. Please try again later.");
    //   }
    // } catch (error) {
    //   toast.error("Error processing your request. Please check your API key and try again.");
    //   console.error("Error fetching responses:", error);
    // } finally {
    //   setIsLoading(false);
    // }
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
