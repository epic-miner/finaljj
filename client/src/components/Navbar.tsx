import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, BookOpen, Search } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add background blur
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.nav 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-lightblue/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <span className="text-handwriting font-bold text-xl md:text-2xl text-slate-800">
                  Calm Corners
                </span>
              </span>
            </Link>
          </motion.div>
          
          {isMobile ? (
            <div className="flex items-center gap-2">
              <Link href="/study-spaces">
                <Button variant="ghost" size="sm" className="mr-1 text-slate-800 hover:text-primary hover:bg-slate-100">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <MobileMenu currentPath={location} />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8">
              <NavLinks currentPath={location} />
              
              <div className="flex items-center">
                <Link href="/study-spaces">
                  <motion.button
                    whileHover={{ scale: 1.05, color: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-700 p-2 rounded-full hover:bg-white/50 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

interface NavLinksProps {
  currentPath: string;
}

function NavLinks({ currentPath }: NavLinksProps) {
  return (
    <div className="flex gap-8">
      <Link href="/">
        <motion.span 
          className={`text-sm font-medium cursor-pointer text-slate-800 border-b-2 pb-1 ${
            currentPath === "/" 
              ? "border-primary" 
              : "border-transparent hover:border-primary/50"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.span>
      </Link>
      <Link href="/study-spaces">
        <motion.span 
          className={`text-sm font-medium cursor-pointer text-slate-800 border-b-2 pb-1 ${
            currentPath.startsWith("/study-spaces") 
              ? "border-primary"
              : "border-transparent hover:border-primary/50"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.span>
      </Link>
      <Link href="/my-bookings">
        <motion.span 
          className={`text-sm font-medium cursor-pointer text-slate-800 border-b-2 pb-1 ${
            currentPath === "/my-bookings" 
              ? "border-primary" 
              : "border-transparent hover:border-primary/50"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          My Bookings
        </motion.span>
      </Link>
      <Link href="/about">
        <motion.span 
          className={`text-sm font-medium cursor-pointer text-slate-800 border-b-2 pb-1 ${
            currentPath === "/about" 
              ? "border-primary" 
              : "border-transparent hover:border-primary/50"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          About
        </motion.span>
      </Link>
    </div>
  );
}

function MobileMenu({ currentPath }: NavLinksProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button 
          type="button" 
          className="text-slate-800 p-2 rounded-full hover:bg-white/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </SheetTrigger>
      <SheetContent className="bg-lightblue border-l border-slate-200">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center text-slate-800">
            <span className="text-handwriting font-bold text-2xl">Calm Corners</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-10 flex flex-col space-y-6">
          <SheetClose asChild>
            <Link href="/">
              <motion.div 
                className={`px-4 py-3 rounded-lg text-sm font-medium block cursor-pointer ${
                  currentPath === "/" 
                    ? "text-primary bg-white/50 border-l-4 border-primary" 
                    : "text-slate-800 hover:bg-white/30 border-l-4 border-transparent"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Home
              </motion.div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/study-spaces">
              <motion.div 
                className={`px-4 py-3 rounded-lg text-sm font-medium block cursor-pointer ${
                  currentPath.startsWith("/study-spaces") 
                    ? "text-primary bg-white/50 border-l-4 border-primary" 
                    : "text-slate-800 hover:bg-white/30 border-l-4 border-transparent"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/my-bookings">
              <motion.div 
                className={`px-4 py-3 rounded-lg text-sm font-medium block cursor-pointer ${
                  currentPath === "/my-bookings" 
                    ? "text-primary bg-white/50 border-l-4 border-primary" 
                    : "text-slate-800 hover:bg-white/30 border-l-4 border-transparent"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                My Bookings
              </motion.div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about">
              <motion.div 
                className={`px-4 py-3 rounded-lg text-sm font-medium block cursor-pointer ${
                  currentPath === "/about" 
                    ? "text-primary bg-white/50 border-l-4 border-primary" 
                    : "text-slate-800 hover:bg-white/30 border-l-4 border-transparent"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.div>
            </Link>
          </SheetClose>

        </div>
      </SheetContent>
    </Sheet>
  );
}
