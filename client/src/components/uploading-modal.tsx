import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface UploadingModalProps {
  progress: number;
  uploadedBytes: number;
  totalBytes: number;
  onCancel: () => void;
}

export default function UploadingModal({
  progress,
  uploadedBytes,
  totalBytes,
  onCancel
}: UploadingModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  // Handle the modal close event
  const handleClose = () => {
    setIsOpen(false);
    onCancel();
  };
  
  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
            <Upload className="h-6 w-6 text-primary-600 animate-bounce" />
          </div>
          <DialogTitle className="text-center pt-4">Uploading Video</DialogTitle>
          <DialogDescription className="text-center">
            Please wait while we upload your video. This may take a few minutes depending on your connection speed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm mt-2 text-gray-500">
            <span>{formatBytes(uploadedBytes)} / {formatBytes(totalBytes)}</span>
            <span>{progress}%</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={handleClose}
          >
            Cancel Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
