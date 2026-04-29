import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { AlertCircle } from "lucide-react";

export const ErrorAlert = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle className="font-bold">Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later.
      </AlertDescription>
    </Alert>
  );
};
