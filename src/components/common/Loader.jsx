import { Loader as LoaderIcon } from "lucide-react";

// Loader Component
export default function Loader() {
  return (
    <div className="flex justify-center py-12">
      <LoaderIcon className="animate-spin h-12 w-12 text-blue-500" />
    </div>
  );
} 
