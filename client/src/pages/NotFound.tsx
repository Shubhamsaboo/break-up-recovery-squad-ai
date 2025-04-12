
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-heartbreak" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page has gone missing
        </p>
        <p className="mb-8 max-w-md mx-auto text-muted-foreground">
          Just like some relationships, sometimes pages disappear too. Let's get you back to a place of healing.
        </p>
        <Button asChild>
          <a href="/">Return to Recovery</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
