import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { VideoResponse, ProcessingStatus } from "@shared/schema";
import { Download, Share, PlayCircle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const { data: videos, isLoading, error } = useQuery<VideoResponse[]>({
    queryKey: ["/api/videos"],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Video History</h1>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="h-40 w-full md:w-1/3 rounded-md" />
                  <div className="w-full md:w-2/3">
                    <Skeleton className="h-24 w-full rounded-md mb-4" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-red-700">Error Loading Videos</h2>
            <p className="text-red-600 mt-2">
              There was a problem loading your video history. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Your Video History</h1>
      
      {videos && videos.length > 0 ? (
        <div className="space-y-6">
          {videos.map((video) => (
            <Card key={video.id} className="w-full">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle>{video.originalName}</CardTitle>
                  <StatusBadge status={video.status as ProcessingStatus} />
                </div>
                <CardDescription>
                  Uploaded {format(new Date(video.createdAt), "PPP")} · {formatFileSize(video.fileSize)}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6 space-y-6">
                {video.status === ProcessingStatus.COMPLETED ? (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-200 overflow-hidden relative">
                        <img 
                          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                          alt="Video thumbnail" 
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white bg-opacity-75 rounded-full p-2 text-gray-800 hover:bg-opacity-100 focus:outline-none">
                            <PlayCircle className="h-8 w-8" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="rounded-lg bg-gray-50 p-4 h-full">
                        <h4 className="font-medium text-gray-900 mb-2">Video Recap</h4>
                        <p className="text-gray-700 text-sm">
                          {video.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProcessingIndicator video={video} />
                )}
                
                {video.status === ProcessingStatus.COMPLETED && (
                  <div className="border border-green-200 rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Processing complete</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <p>Audio extraction</p>
                              <p>Complete</p>
                            </div>
                            <div className="flex justify-between">
                              <p>Transcription</p>
                              <p>Complete</p>
                            </div>
                            <div className="flex justify-between">
                              <p>AI Summarization</p>
                              <p>Complete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 py-3">
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" disabled={video.status !== ProcessingStatus.COMPLETED}>
                    <Download className="h-4 w-4 mr-2" />
                    Transcript
                  </Button>
                  <Button variant="outline" size="sm" disabled={video.status !== ProcessingStatus.COMPLETED}>
                    <Download className="h-4 w-4 mr-2" />
                    Summary
                  </Button>
                  <Button disabled={video.status !== ProcessingStatus.COMPLETED}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No videos yet</h3>
            <p className="mt-1 text-gray-500 text-center">
              When you upload videos, they'll appear here for you to review.
            </p>
            <Button className="mt-6" asChild>
              <a href="/">Upload your first video</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ProcessingStatus }) {
  const statusConfig = {
    [ProcessingStatus.UPLOADING]: {
      className: "bg-blue-100 text-blue-800",
      label: "Uploading"
    },
    [ProcessingStatus.PROCESSING]: {
      className: "bg-yellow-100 text-yellow-800",
      label: "Processing"
    },
    [ProcessingStatus.COMPLETED]: {
      className: "bg-green-100 text-green-800",
      label: "Complete"
    },
    [ProcessingStatus.FAILED]: {
      className: "bg-red-100 text-red-800",
      label: "Failed"
    }
  };

  const config = statusConfig[status] || statusConfig[ProcessingStatus.PROCESSING];
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}

function ProcessingIndicator({ video }: { video: VideoResponse }) {
  const getStepStatus = (step: string) => {
    if (video.processingStep === null) return "pending";
    
    const steps = ["audio_extraction", "transcription", "summarization"];
    const currentStepIndex = steps.indexOf(video.processingStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentStepIndex) return "complete";
    if (stepIndex === currentStepIndex) return "in-progress";
    return "pending";
  };
  
  const getStepLabel = (step: string) => {
    switch (getStepStatus(step)) {
      case "complete":
        return <span className="font-medium text-green-600">Complete</span>;
      case "in-progress":
        return <span className="font-medium text-primary-600">In progress ({video.processingProgress}%)</span>;
      default:
        return <span className="text-gray-500">Pending</span>;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-md bg-gray-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Clock className="h-5 w-5 text-primary-500 animate-pulse" />
        </div>
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-gray-800">Processing in progress</h3>
          <div className="mt-4">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 relative overflow-hidden"
                  style={{ width: `${video.processingProgress}%` }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="processing-indicator" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Audio extraction</p>
                {getStepLabel("audio_extraction")}
              </div>
              <div className="flex justify-between">
                <p>Transcription</p>
                {getStepLabel("transcription")}
              </div>
              <div className="flex justify-between">
                <p>AI Summarization</p>
                {getStepLabel("summarization")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
}
