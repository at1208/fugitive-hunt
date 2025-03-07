"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { motion } from "framer-motion";
import Providers from "../components/Providers";
import { BackButton } from "../components/BackButton";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`page-root ${inter.className} transition-colors duration-300 text-white bg-black overflow-hidden`}
      >
        <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-60" />

        <div className="relative flex flex-col items-center justify-center min-h-screen w-full z-10">
          <Providers>
            <Suspense
              fallback={
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div className="text-xl text-gray-400">Loading...</div>
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="top-5 left-5"
              >
                <BackButton />
              </motion.div>

              <motion.div className="flex flex-col items-center justify-center w-full pl-3 pr-3 pb-3">
                {children}
              </motion.div>
            </Suspense>
          </Providers>
        </div>
      </body>
    </html>
  );
}
