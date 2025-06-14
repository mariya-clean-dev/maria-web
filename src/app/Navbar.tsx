"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Get access token from sessionStorage after component mounts (client-side)
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("maria_access_token"));
  }, []);

  // Function to handle navigation with scrolling to sections
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // If we're already on the home page, just scroll to the section
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      router.push(`/#${sectionId}`);
    }

    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#19A4C6] backdrop-blur-sm h-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Katrin Logo"
            width={150}
            height={60}
            className="h-14 w-auto"
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
            href="/#features-section"
            className="text-white font-medium hover:text-white/80 transition-colors cursor-pointer"
            onClick={(e) => handleNavigation(e, "features-section")}
          >
            About
          </Link>
          <Link
            href="/#services-section"
            className="text-white font-medium hover:text-white/80 transition-colors cursor-pointer"
            onClick={(e) => handleNavigation(e, "services-section")}
          >
            Services
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {accessToken ? (
            <Link href={"/subscription-details"}>
              <Button className="bg-white text-[#0ABED5] hover:bg-white/90">
                Subscription
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              className=" hover:text-white/80 hover:bg-white/10 cursor-pointer bg-white text-primary"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          {/* <Button
            variant="ghost"
            className="rounded-full bg-white text-[#0ABED5] hover:bg-white/90 p-2"
          >
            Profile
          </Button> */}
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
                href="/#features-section"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={(e) => handleNavigation(e, "features-section")}
              >
                About
              </Link>
              <Link
                href="/#services-section"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={(e) => handleNavigation(e, "services-section")}
              >
                Services
              </Link>

              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                {accessToken ? (
                  <Link href={"/subscription-details"}>
                    <Button className="bg-white text-[#0ABED5] hover:bg-white/90">
                      Subscription
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    className="justify-start text-white hover:text-white/80 hover:bg-white/10"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
