import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition, { childVariants } from "@/components/PageTransition";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import StudySpaceCard from "@/components/StudySpaceCard";
import HowItWorks from "@/components/HowItWorks";
import FeatureHighlights from "@/components/FeatureHighlights";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { StudySpaceWithAmenities } from "@shared/schema";

// Animation variants for staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data: studySpaces, isLoading, error } = useQuery<StudySpaceWithAmenities[]>({
    queryKey: ['/api/study-spaces'],
  });

  // Take only 6 study spaces for the preview
  const featuredStudySpaces = studySpaces?.slice(0, 6);

  return (
    <PageTransition>
      <Hero />
      
      {/* Search Section */}
      <motion.section 
        id="search" 
        className="py-16 bg-background/60 backdrop-blur-lg"
        variants={childVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-base text-primary font-semibold tracking-wide uppercase"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Find Study Spaces
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Search for your ideal study environment
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SearchForm />
          </motion.div>
        </div>
      </motion.section>
      
      {/* Study Spaces Preview Section */}
      <motion.section 
        className="py-16 bg-background/40"
        variants={childVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">Available Study Spaces</h2>
            <Link href="/study-spaces">
              <motion.span 
                className="text-primary hover:text-primary/80 font-medium flex items-center"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>

          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="bg-background/60 backdrop-blur-md rounded-xl p-4 h-80 animate-pulse"
                  variants={childVariants}
                >
                  <div className="h-48 w-full bg-primary/10 rounded-lg"></div>
                  <div className="h-4 bg-primary/20 rounded mt-4 w-3/4"></div>
                  <div className="h-4 bg-primary/10 rounded mt-2 w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-10"
              variants={childVariants}
            >
              <p className="text-red-400">Failed to load study spaces. Please try again later.</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredStudySpaces?.map((space) => (
                <motion.div key={space.id} variants={childVariants}>
                  <StudySpaceCard studySpace={space} />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/study-spaces">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg flex items-center gap-2">
                  <SearchIcon className="h-5 w-5" />
                  Browse More Study Spaces
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      <HowItWorks />
      <FeatureHighlights />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
