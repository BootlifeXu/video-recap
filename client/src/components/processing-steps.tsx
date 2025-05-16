import { AudioWaveform, Upload, SpeakerIcon, FileText } from "lucide-react";

export default function ProcessingSteps() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          
          <div className="relative flex justify-between">
            {/* Step 1 */}
            <div className="bg-white px-4">
              <span className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center ring-8 ring-white">
                <Upload className="h-5 w-5 text-white" />
              </span>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white px-4">
              <span className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center ring-8 ring-white">
                <AudioWaveform className="h-5 w-5 text-white" />
              </span>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white px-4">
              <span className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center ring-8 ring-white">
                <SpeakerIcon className="h-5 w-5 text-white" />
              </span>
            </div>
            
            {/* Step 4 */}
            <div className="bg-white px-4">
              <span className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center ring-8 ring-white">
                <FileText className="h-5 w-5 text-white" />
              </span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <h3 className="font-medium text-gray-900">Upload</h3>
              <p className="text-gray-500">Submit your video file</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Extract</h3>
              <p className="text-gray-500">Audio separated from video</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Transcribe</h3>
              <p className="text-gray-500">Speech converted to text</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Summarize</h3>
              <p className="text-gray-500">AI generates recap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
