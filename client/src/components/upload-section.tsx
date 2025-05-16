import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { VideoResponse } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useDropzone } from "react-dropzone";
import { Upload, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";

interface UploadSectionProps {
  onUploadStart: (fileSize: number) => void;
  onUploadProgress: (progress: number, loadedBytes: number) => void;
  onUploadComplete: (video: VideoResponse) => void;
}

export default function UploadSection({
  onUploadStart,
  onUploadProgress,
  onUploadComplete
}: UploadSectionProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const maxSize = 1024 * 1024 * 1024; // 1GB
  const acceptedFormats = {
    'video/*': ['.mp4', '.avi', '.mov', '.wmv']
  };
  
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Create form data
    const formData = new FormData();
    formData.append('video', file);
    
    try {
      // Signal upload start
      onUploadStart(file.size);
      
      // Create abort controller
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      
      // Prepare upload with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/videos/upload');
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onUploadProgress(progress, event.loaded);
        }
      };
      
      // Handle completion with promise
      const uploadPromise = new Promise<VideoResponse>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch (e) {
              reject(new Error('Invalid server response'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.onabort = () => reject(new Error('Upload was cancelled'));
      });
      
      // Connect abort action
      signal.addEventListener('abort', () => xhr.abort());
      
      // Start upload
      xhr.send(formData);
      
      // Wait for upload to complete
      const response = await uploadPromise;
      
      // Invalidate videos cache
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      
      // Notify parent component
      onUploadComplete(response);
      
      // Show success toast
      toast({
        title: "Upload Successful",
        description: "Your video is now being processed."
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: error.message || "There was a problem uploading your video.",
          variant: "destructive"
        });
      }
    } finally {
      abortControllerRef.current = null;
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize,
    multiple: false
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
      <Card className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <CardContent className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Upload your video for a quick recap
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Supported formats: MP4, AVI, MOV, WMV (Max size: 1GB)
            </p>
          </div>
          
          {/* Upload zone */}
          <div className="mt-5">
            <div 
              {...getRootProps()} 
              className={`dropzone border-2 border-dashed rounded-lg p-12 text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition cursor-pointer bg-gray-50 ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-600">
                    <span>Upload a video</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  We'll automatically extract audio and generate a recap
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
