"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#19A4C6] backdrop-blur-sm h-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Katrin Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white font-medium hover:text-white/80 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#"
            className="text-white font-medium hover:text-white/80 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#"
            className="text-white font-medium hover:text-white/80 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#"
            className="text-white font-medium hover:text-white/80 transition-colors"
          >
            Bookings
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-white text-[#0ABED5] hover:bg-white/90 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
          <Button
            variant="ghost"
            className="rounded-full bg-white text-[#0ABED5] hover:bg-white/90 p-2"
          >
            Profile
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0ABED5] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/bookings"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={() => setIsOpen(false)}
              >
                Bookings
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:text-white/80 hover:bg-white/10"
                >
                  Login
                </Button>
                <Button className="bg-white text-[#0ABED5] hover:bg-white/90">
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:text-white/80 hover:bg-white/10"
                >
                  Profile
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
