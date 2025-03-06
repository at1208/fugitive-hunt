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
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-60"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        <motion.div
          className="absolute inset-0 bg-transparent pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2], x: [-50, 50, -50] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <div className="absolute top-20 left-1/4 w-20 h-20 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
        </motion.div>

        {/* Game UI Container */}
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

              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full pl-3 pr-3 pb-3"
              >
                {children}
              </motion.div>
            </Suspense>
          </Providers>
        </div>
      </body>
    </html>
  );
}
