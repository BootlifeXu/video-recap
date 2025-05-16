import { Image, Zap, Brain } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Powerful video processing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get more from your videos with our AI-powered analysis tools
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Image className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">High Quality Transcription</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Advanced speech recognition accurately captures dialogue, even with background noise and multiple speakers.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Processing</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our optimized pipeline handles videos quickly, providing recaps in minutes, not hours.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Brain className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Summaries</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Advanced language models extract key points and insights, creating concise, accurate recaps.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
