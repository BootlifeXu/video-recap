import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share, Play, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProcessingDemo() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Processing Example</h2>
          
          {/* Sample processing card */}
          <Card className="mb-8">
            <CardHeader className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Business Meeting.mp4
                </CardTitle>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Complete
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Uploaded 3 minutes ago · 28MB
              </p>
            </CardHeader>
            
            <CardContent className="px-4 py-5 sm:p-6 space-y-6">
              {/* Video preview */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-200 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                      alt="Business meeting video thumbnail" 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="bg-white bg-opacity-75 rounded-full text-gray-800 hover:bg-opacity-100">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="rounded-lg bg-gray-50 p-4 h-full">
                    <h4 className="font-medium text-gray-900 mb-2">Video Recap</h4>
                    <p className="text-gray-700 text-sm">
                      The meeting began with a Q3 performance review presented by Sarah, highlighting a 12% revenue increase. John discussed upcoming product launches for Q4, focusing on the mobile app redesign. The team agreed on prioritizing the customer portal update due to recent feedback. Action items were assigned: marketing to prepare press releases, development to finalize beta features, and sales to update client presentations. Next meeting scheduled for October 15th.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Processing timeline */}
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
              
              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Transcript
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Summary
                </Button>
                <Button size="sm" className="flex items-center">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Processing card */}
          <Card>
            <CardHeader className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Product Demo.mp4
                </CardTitle>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Processing
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Uploaded 1 minute ago · 86MB
              </p>
            </CardHeader>
            
            <CardContent className="px-4 py-5 sm:p-6 space-y-6">
              {/* Progress indicator */}
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
                          <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 w-2/3 relative">
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
                          <p className="font-medium text-green-600">Complete</p>
                        </div>
                        <div className="flex justify-between">
                          <p>Transcription</p>
                          <p className="font-medium text-primary-600">In progress (67%)</p>
                        </div>
                        <div className="flex justify-between">
                          <p>AI Summarization</p>
                          <p className="text-gray-500">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 italic">
                Estimated completion time: 1 minute 20 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
