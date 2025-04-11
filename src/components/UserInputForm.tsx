
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareText, ImagePlus, X } from "lucide-react";

interface UserInputFormProps {
  onSubmit: (feelings: string, images: File[]) => void;
  isLoading: boolean;
  apiKeySubmitted: boolean;
}

const UserInputForm = ({ onSubmit, isLoading, apiKeySubmitted }: UserInputFormProps) => {
  const [feelings, setFeelings] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => {
        const isImage = file.type.startsWith('image/');
        return isImage;
      });
      
      setImages(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(feelings, images);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="h-5 w-5" />
          Share Your Feelings
        </CardTitle>
        <CardDescription>
          Tell us about your breakup and how you're feeling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            placeholder="How are you feeling? What happened in your relationship? Share as much as you'd like..."
            className="min-h-32 resize-y"
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
          />
          
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={triggerFileInput}
              className="flex items-center gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              Upload Chat Screenshots
            </Button>
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-heartbreak hover:bg-heartbreak-dark"
            disabled={!feelings.trim() || isLoading || !apiKeySubmitted}
          >
            {isLoading ? 'Processing...' : 'Get Recovery Plan 💝'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserInputForm;
