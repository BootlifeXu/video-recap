import { useState, useRef } from "react";
import { useToast } from "./use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { VideoResponse } from "@shared/schema";

interface UseVideoUploadOptions {
  onUploadStart?: (fileSize: number) => void;
  onUploadProgress?: (progress: number, loadedBytes: number) => void;
  onUploadComplete?: (videoData: VideoResponse) => void;
  onUploadError?: (error: Error) => void;
}

export function useVideoUpload(options: UseVideoUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();
  
  const upload = async (file: File) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv'];
    if (!validTypes.includes(file.type)) {
      const error = new Error(`Invalid file type. Please upload MP4, AVI, MOV, or WMV videos.`);
      options.onUploadError?.(error);
      toast({
        title: "Invalid File Type",
        description: "Please upload MP4, AVI, MOV, or WMV videos.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size
    const maxSize = 1024 * 1024 * 1024; // 1GB
    if (file.size > maxSize) {
      const error = new Error(`File is too large. Maximum size is 1GB.`);
      options.onUploadError?.(error);
      toast({
        title: "File Too Large",
        description: "Maximum file size is 1GB.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      setProgress(0);
      setUploadedBytes(0);
      setTotalBytes(file.size);
      
      options.onUploadStart?.(file.size);
      
      // Create form data
      const formData = new FormData();
      formData.append('video', file);
      
      // Create abort controller
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      
      // Prepare upload with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/videos/upload');
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round((event.loaded / event.total) * 100);
          setProgress(progressPercent);
          setUploadedBytes(event.loaded);
          options.onUploadProgress?.(progressPercent, event.loaded);
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
      
      // Call completion handler
      options.onUploadComplete?.(response);
      
      // Show success toast
      toast({
        title: "Upload Successful",
        description: "Your video is now being processed."
      });
      
      return response;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Upload error:', error);
        options.onUploadError?.(error);
        toast({
          title: "Upload Failed",
          description: error.message || "There was a problem uploading your video.",
          variant: "destructive"
        });
      }
    } finally {
      setIsUploading(false);
      abortControllerRef.current = null;
    }
  };
  
  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsUploading(false);
      setProgress(0);
      toast({
        title: "Upload Cancelled",
        description: "Your video upload was cancelled."
      });
    }
  };
  
  return {
    upload,
    cancelUpload,
    isUploading,
    progress,
    uploadedBytes,
    totalBytes
  };
}
