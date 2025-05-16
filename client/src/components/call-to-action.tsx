import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CallToAction() {
  return (
    <div className="bg-primary-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to save time on video reviews?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-primary-200">
          Get started now and see how our AI can transform your video content into actionable insights.
        </p>
        <Button size="lg" variant="secondary" className="mt-8 bg-white text-primary-700 hover:bg-primary-50" asChild>
          <Link href="/">
            <a>Try it free</a>
          </Link>
        </Button>
      </div>
    </div>
  );
}
