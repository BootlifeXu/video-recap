import { useState } from "react";
import UploadSection from "@/components/upload-section";
import ProcessingSteps from "@/components/processing-steps";
import ProcessingDemo from "@/components/processing-demo";
import FeaturesSection from "@/components/features-section";
import CallToAction from "@/components/call-to-action";
import UploadingModal from "@/components/uploading-modal";
import { VideoResponse } from "@shared/schema";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingVideo, setProcessingVideo] = useState<VideoResponse | null>(null);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  
  // Handle when a new video upload begins
  const handleUploadStart = (fileSize: number) => {
    setIsUploading(true);
    setUploadProgress(0);
    setTotalBytes(fileSize);
    setUploadedBytes(0);
  };
  
  // Update progress during upload
  const handleUploadProgress = (progress: number, loadedBytes: number) => {
    setUploadProgress(progress);
    setUploadedBytes(loadedBytes);
  };
  
  // Handle when upload completes and processing begins
  const handleUploadComplete = (video: VideoResponse) => {
    setIsUploading(false);
    setProcessingVideo(video);
  };
  
  // Handle when the user cancels an upload
  const handleUploadCancel = () => {
    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="bg-gray-50 pt-12 sm:pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Instantly Recap Your Videos with AI
            </h1>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Upload your video, and our AI will automatically transcribe and summarize the content, saving you time and helping you extract key insights.
            </p>
          </div>
        </div>
        <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
              alt="AI-powered video processing visualization" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Upload section */}
      <UploadSection 
        onUploadStart={handleUploadStart}
        onUploadComplete={handleUploadComplete}
        onUploadProgress={handleUploadProgress}
      />

      {/* Processing steps */}
      <ProcessingSteps />

      {/* Processing demo */}
      <ProcessingDemo />

      {/* Features */}
      <FeaturesSection />

      {/* Call to action */}
      <CallToAction />

      {/* Uploading modal */}
      {isUploading && (
        <UploadingModal
          progress={uploadProgress}
          uploadedBytes={uploadedBytes}
          totalBytes={totalBytes}
          onCancel={handleUploadCancel}
        />
      )}
    </div>
  );
}
