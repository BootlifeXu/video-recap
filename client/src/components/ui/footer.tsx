import { Link } from "wouter";
import { Reply, Code, BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/about">
              <a className="text-base text-gray-500 hover:text-gray-900">About</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/blog">
              <a className="text-base text-gray-500 hover:text-gray-900">Blog</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/pricing">
              <a className="text-base text-gray-500 hover:text-gray-900">Pricing</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/faq">
              <a className="text-base text-gray-500 hover:text-gray-900">FAQ</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact">
              <a className="text-base text-gray-500 hover:text-gray-900">Contact</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy">
              <a className="text-base text-gray-500 hover:text-gray-900">Privacy</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/terms">
              <a className="text-base text-gray-500 hover:text-gray-900">Terms</a>
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Reply className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <Code className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <BriefcaseBusiness className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 VideoRecap, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
