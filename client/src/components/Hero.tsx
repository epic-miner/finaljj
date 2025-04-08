import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-lightblue overflow-hidden flex flex-col">
      {/* Header with "Bookings Now Available" */}
      <div className="w-full bg-[#e6d3a3] py-2">
        <div className="hidden lg:flex justify-between max-w-7xl mx-auto px-4">
          <div className="text-sm">Bookings Now Available</div>
          <div className="text-sm">Bookings Now Available</div>
          <div className="text-sm">Bookings Now Available</div>
          <div className="text-sm">Bookings Now Available</div>
        </div>
        <div className="lg:hidden text-center text-sm">
          Bookings Now Available
        </div>
      </div>
      
      {/* Mood categories */}
      <div className="max-w-7xl mx-auto w-full py-4 px-4">
        <div className="hidden md:flex justify-between items-center">
          <div className="text-handwriting text-lg">Cozy</div>
          <div className="text-handwriting text-lg">Quiet</div>
          <div className="text-center">
            <h1 className="text-handwriting text-4xl font-bold">Calm Corners</h1>
          </div>
          <div className="text-handwriting text-lg">Productivity</div>
          <div className="text-handwriting text-lg">Focused</div>
        </div>
        <div className="md:hidden text-center py-4">
          <h1 className="text-handwriting text-4xl font-bold">Calm Corners</h1>
        </div>
      </div>

      {/* Main hero content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-10 md:py-16">
        {/* Main Heading with Decorative Border */}
        <motion.div
          className="text-center relative max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#e6d3a3]"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#e6d3a3]"></div>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mx-auto px-12 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Find your own calm corner
          </motion.h2>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#e6d3a3]"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#e6d3a3]"></div>
        </motion.div>

        {/* Step indicator and Get Started button */}
        <motion.div 
          className="mt-8 flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="text-sm font-medium">Flow 1</div>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-primary"></div>
              <div className="absolute inset-2 rounded-full bg-primary"></div>
            </div>
          </div>
          <Link href="/study-spaces">
            <Button className="bg-[#e6d3a3] hover:bg-[#d6c393] text-black px-8 py-6 shadow-md transition-all duration-300 hover:shadow-lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom quote section */}
      <div className="w-full bg-[#e6d3a3] py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-handwriting text-xl md:text-2xl mb-8 px-4">
            "There are no shortcuts to any place worth going..."
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-white/50 py-3 px-2 rounded-lg shadow-sm">
              <div className="text-xl md:text-2xl font-bold">4.8/5</div>
              <div className="text-xs md:text-sm">Positive Reviews</div>
            </div>
            <div className="bg-white/50 py-3 px-2 rounded-lg shadow-sm">
              <div className="text-xl md:text-2xl font-bold">5k+</div>
              <div className="text-xs md:text-sm">Students</div>
            </div>
            <div className="bg-white/50 py-3 px-2 rounded-lg shadow-sm">
              <div className="text-xl md:text-2xl font-bold">24/7</div>
              <div className="text-xs md:text-sm">Support</div>
            </div>
            <div className="bg-white/50 py-3 px-2 rounded-lg shadow-sm">
              <div className="text-xl md:text-2xl font-bold">10k+</div>
              <div className="text-xs md:text-sm">Members</div>
            </div>
            <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white/50 py-3 px-2 rounded-lg shadow-sm">
              <div className="text-xl md:text-2xl font-bold">100%</div>
              <div className="text-xs md:text-sm">Reliable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
