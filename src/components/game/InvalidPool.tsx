"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function InvalidPool() {
  return (
    <div className="h-[calc(100vh-88px)] bg-[#FDFCF5] overflow-hidden flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-sm border border-gray-100 p-7 text-center">
          <div className="mb-5 flex justify-center">
            <div className="bg-amber-50 p-5 rounded-full border border-amber-100">
              <AlertTriangle
                className="h-12 w-12 text-amber-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Invalid Pool Link
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            The link does not contain a valid contract address. Check the URL
            and try again.
          </p>

          <Link
            href="/app"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#BAD8B6] to-[#9CC499] hover:from-[#9CC499] hover:to-[#8AB886] text-gray-900 font-bold text-xs rounded-lg transition-all shadow-sm"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Markets
          </Link>
        </div>
      </div>
    </div>
  );
}
