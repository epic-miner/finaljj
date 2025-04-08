import { Link } from "wouter";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-800 mt-auto">
      {/* Newsletter Section */}
      <div className="bg-[#e6d3a3] py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Stay Updated</h3>
              <p className="text-sm text-slate-700">
                Subscribe to our newsletter for the latest updates on new study spaces and special offers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 max-w-md">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 shadow-sm whitespace-nowrap">
                Subscribe <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center">
              <span className="text-handwriting font-bold text-xl md:text-2xl">Calm Corners</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Find your perfect study space with real-time availability information and embrace focused, productive study sessions.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a whileHover={{ y: -3, color: "#4267B2" }} href="#" className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#1DA1F2" }} href="#" className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#E1306C" }} href="#" className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#0077B5" }} href="#" className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#333333" }} href="#" className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Explore</h3>
              <ul className="mt-4 space-y-2.5">
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="/">
                    <span className="text-slate-600 hover:text-primary cursor-pointer">Home</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="/study-spaces">
                    <span className="text-slate-600 hover:text-primary cursor-pointer">Browse Spaces</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="/my-bookings">
                    <span className="text-slate-600 hover:text-primary cursor-pointer">My Bookings</span>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link href="/about">
                    <span className="text-slate-600 hover:text-primary cursor-pointer">About</span>
                  </Link>
                </motion.li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2.5">
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">Study Tips</span>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">FAQ</span>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">List Your Space</span>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">Support</span>
                </motion.li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2.5">
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">Privacy Policy</span>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">Terms of Service</span>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <span className="text-slate-600 hover:text-primary cursor-pointer">Cookie Policy</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-slate-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Calm Corners. All rights reserved. Created with ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
