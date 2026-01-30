"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter,usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Get access token from sessionStorage after component mounts (client-side)
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("maria_access_token"));
  }, []);
  //scroll
  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  // Function to handle navigation with scrolling to sections
const handleNavigation = (
  e: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string
) => {
  e.preventDefault();

  // Change URL with hash
  router.push(`/#${sectionId}`);

  // Remove hash from URL after navigation
  setTimeout(() => {
    window.history.replaceState(null, "", "/");

    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
  }, 50);

  setIsOpen(false);
};



  return (
      <header
        className={`fixed px-4 top-0 left-0 right-0 z-50  backdrop-blur-sm transition-colors duration-300
        ${
          isScrolled
            ? "bg-white"
            : "bg-[linear-gradient(90deg,#FAFAF9_50%,#17A5C60D_50%)]"
        }`}
      >
      <div className="container mx-auto md:px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/footerlogo.png"
              alt="Katrin Logo"
              width={150}
              height={60}
              className="h-12 md:h-14 w-auto"
            />
          </Link>
        </motion.div>


        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-12"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href="/"
            className="relative text-[#808080] font-medium transition-colors
            hover:text-[#111]
            after:absolute after:left-0 after:-bottom-0.5
            after:h-0.5 after:w-0 after:bg-[#17A5C6]
            after:transition-all after:duration-500
            hover:after:w-full"
            onClick={(e) => handleNavigation(e, "services")}
          >
            Services
          </Link>
          <Link
            href="/"
            className="relative text-[#808080] font-medium transition-colors
            hover:text-[#111]
            after:absolute after:left-0 after:-bottom-0.5
            after:h-0.5 after:w-0 after:bg-[#17A5C6]
            after:transition-all after:duration-500
            hover:after:w-full"
            onClick={(e) => handleNavigation(e, "process")}
          >
            Process
          </Link>
          <Link
            href="/"
            className="relative text-[#808080] font-medium transition-colors
            hover:text-[#111]
            after:absolute after:left-0 after:-bottom-0.5
            after:h-0.5 after:w-0 after:bg-[#17A5C6]
            after:transition-all after:duration-500
            hover:after:w-full"
            onClick={(e) => handleNavigation(e, "pricing")}
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="relative text-[#808080] font-medium transition-colors
            hover:text-[#111]
            after:absolute after:left-0 after:-bottom-0.5
            after:h-0.5 after:w-0 after:bg-[#17A5C6]
            after:transition-all after:duration-500
            hover:after:w-full"
            onClick={(e) => handleNavigation(e, "about")}
          >
            About
          </Link>

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
              className=" hover:text-white/80 hover:bg-#17A5C6/10 cursor-pointer bg-[#17A5C6] text-white rounded-full"
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

        </motion.nav>

        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#17A5C6]"
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
                onClick={(e) => handleNavigation(e, "services")}
              >
                Services
              </Link>
              <Link
                href="/"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={(e) => handleNavigation(e, "process")}
              >
                Process
              </Link>
              <Link
                href="/"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={(e) => handleNavigation(e, "pricing")}
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="text-white font-medium py-2 hover:bg-white/10 rounded-md px-3"
                onClick={(e) => handleNavigation(e, "about")}
              >
                About
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
