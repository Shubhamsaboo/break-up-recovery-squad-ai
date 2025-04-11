
import React from 'react';
import { Separator } from "@/components/ui/separator";

const PageFooter = () => {
  return (
    <>
      <Separator className="my-8" />
      <footer className="text-center text-sm text-muted-foreground">
        <p>Made with ❤️ by the Breakup Recovery Squad</p>
        <p className="mt-1">Share your recovery journey with #BreakupRecoverySquad</p>
      </footer>
    </>
  );
};

export default PageFooter;
