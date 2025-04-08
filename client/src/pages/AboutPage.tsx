import { motion } from "framer-motion";
import { BookOpen, Clock, Map, Users, CheckCircle, BarChart } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white relative">
      <ThreeBackground className="fixed inset-0 z-0" />
      
      {/* Hero Section */}
      <motion.section 
        className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-primary">Calm Corners</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the story behind the platform that's revolutionizing how students find and book study spaces.
          </motion.p>
        </div>
      </motion.section>
      
      {/* Our Mission */}
      <motion.section 
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-background/40 backdrop-blur-lg border border-primary/10 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              At Calm Corners, we're on a mission to eliminate the frustration of finding suitable study spaces. 
              We believe every student deserves a quiet, comfortable environment to focus and excel in their studies.
              By providing real-time availability information and an easy booking system, we're making study space 
              discovery effortless and stress-free.
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Features Grid */}
      <motion.section 
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="h-8 w-8 text-primary" />,
              title: "Real-Time Availability",
              description: "See the current occupancy of study spaces before you arrive, saving you time and frustration."
            },
            {
              icon: <Map className="h-8 w-8 text-primary" />,
              title: "Diverse Locations",
              description: "From quiet libraries to cozy cafés, find the perfect environment that matches your study style."
            },
            {
              icon: <Users className="h-8 w-8 text-primary" />,
              title: "Easy Booking",
              description: "Reserve your spot in advance with just a few clicks, guaranteeing your seat when you arrive."
            },
            {
              icon: <BookOpen className="h-8 w-8 text-primary" />,
              title: "Student-Focused",
              description: "Built by students, for students, addressing the unique needs of academic life."
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-primary" />,
              title: "Amenity Filters",
              description: "Filter spaces by amenities like Wi-Fi, power outlets, quiet zones, and refreshments."
            },
            {
              icon: <BarChart className="h-8 w-8 text-primary" />,
              title: "Peak Time Insights",
              description: "Understand busy periods and plan your study sessions during quieter times."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-background/40 backdrop-blur-lg border border-primary/10 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* How It Works */}
      <motion.section 
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">How Calm Corners Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Browse Study Spaces",
                description: "Explore a variety of study spaces with detailed information about amenities, photos, and user reviews."
              },
              {
                step: "02",
                title: "Check Availability",
                description: "View real-time seat availability to find a space that's not overcrowded and meets your needs."
              },
              {
                step: "03",
                title: "Book Your Spot",
                description: "Reserve your seat for your preferred time slot, ensuring you have a place to study when you arrive."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-7xl font-bold text-primary/20 absolute -top-10 left-0">{step.step}</div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Our Story */}
      <motion.section 
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-background/40 backdrop-blur-lg border border-primary/10 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            
            <div className="space-y-6 text-white/80">
              <p>
                Calm Corners was born out of frustration. As students ourselves, we experienced the daily challenge of finding quiet, comfortable places to study, especially during exam periods when libraries and study rooms were packed.
              </p>
              <p>
                We'd waste valuable time wandering between buildings, looking for available seats, only to find every space occupied. We knew there had to be a better way.
              </p>
              <p>
                In 2023, we launched Calm Corners with a simple goal: to help students find available study spaces in real-time. What started as a passion project quickly grew as students embraced the platform, grateful to reclaim the time they previously spent searching for places to study.
              </p>
              <p>
                Today, Calm Corners partners with libraries, universities, and local cafés to provide accurate, up-to-date information on study space availability. We're proud to have helped thousands of students find their perfect study environment and continue to improve our platform based on user feedback.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Join Us Banner */}
      <motion.section 
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-primary/30 to-purple-900/30 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Calm Corners Community</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Experience a better way to find and book study spaces. Sign up today and never struggle to find a seat again.
          </p>
          <motion.button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-700/10 rounded-full filter blur-3xl opacity-20 z-0"></div>
    </div>
  );
}